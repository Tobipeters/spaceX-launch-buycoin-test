import React, { useState, useEffect } from "react";
import { LaunchCard } from "../../components/LaunchCard";
import { useQuery } from "@apollo/client";
import { GET_ROCKET_LAUNCHES } from "../../queries/index.gql";
import { Form, Accordion } from "react-bootstrap";
import HomeStyles from "./Home.module.css";
import { FiX } from "react-icons/fi";
import { Loader } from "../../components/Loader";

export const Home = () => {
  const [groupName, setGroupName] = useState("");
  const [isGrouping, setIsGrouping] = useState(false);
  const [searchResult, setSearchResult] = useState([]);
  const { data, error, loading } = useQuery(GET_ROCKET_LAUNCHES);

  useEffect(() => {
    if (!loading && !error) {
      setSearchResult(data.launches);
    }
  }, [data, error, loading]);

  if (loading) return <Loader />

  if (error) console.log(error);

  //   const { launches: rocketLanches } = data && data;

  const handleSearch = (event) => {
    const value = event.target.value.toLowerCase();

    let filtered = data.launches.filter((launch) => {
      return (
        launch.mission_name.toLowerCase().includes(value) ||
        launch.launch_site.site_name.toLowerCase().includes(value) ||
        launch.rocket.rocket_name.toLowerCase().includes(value)
      );
    });
    setSearchResult(filtered);
  };

  const handleLaunchStatus = (event) => {
    const value = event.target.value;

    if (value === "all") {
      resetFilter();
      return;
    }

    const statusfilter = value === "success" ? true : false;

    const filtered = data.launches.filter((launch) => {
      return launch.launch_success === statusfilter;
    });

    setSearchResult(filtered);
  };

  const handleSorting = (event) => {
    const value = event.target.value;

    if (value === "none") {
      resetFilter();
      return;
    }

    const sortedData = searchResult.slice().sort((a, b) => {
      const x = new Date(a.launch_date_local);
      const y = new Date(b.launch_date_local);

      const sortCommand = value === "recent" ? y - x : x - y;

      return sortCommand;
    });

    setSearchResult(sortedData);
  };

  const handleGrouping = (event) => {
    const value = event.target.value;

    switch (value) {
      case "mission_name":
        setGroupName("Mission name");
        break;

      case "rocket_name":
        setGroupName("Rocket name");
        break;

      case "site":
        setGroupName("Launch site");
        break;

      default:
        break;
    }

    if (value === "none") {
      resetFilter();
      return;
    }

    const raw_data = data.launches.map((data) => {
      return {
        ...data,
        rocket_name: data.rocket.rocket_name,
        site: data.launch_site.site_name,
      };
    });

    const groupedData = raw_data.reduce((result, currentValue) => {
      (result[currentValue[value]] = result[currentValue[value]] || []).push(
        currentValue
      );

      return result;
    }, []);

    setIsGrouping(true);

    setSearchResult(Object.entries(groupedData));
  };

  const resetFilter = () => {
    setIsGrouping(false);
    setSearchResult(data.launches);
  };

  const renderLaunches = (data) => {
    return data.map((rocket_launch_detail, index) => {
      return (
        <div className="col-lg-12 col-12" key={index}>
          <LaunchCard numbering={index} launchDetails={rocket_launch_detail} />
        </div>
      );
    });
  };

  return (
    <div>
      <div className={HomeStyles.search__container}>
        <Form.Control
          className="shadow-sm"
          size="lg"
          type="text"
          placeholder="Search mission name, rocket name, and launch site"
          onChange={(e) => handleSearch(e)}
          disabled={isGrouping ? true : false}
        />
      </div>

      <div className={`${HomeStyles.home__card} card`}>
        <div className={`${HomeStyles.header__section} row`}>
          <div className="col-lg-6 col-md-12 col-12">
            <h3 className={`${HomeStyles.title} mb-0`}>
              Space X Rocket Launches{" "}
            </h3>
          </div>

          <div className="col-md-3 d-lg-none"></div>
          {!isGrouping && (
            <div className="col-lg-2 col-md-3 col-4 mt-4 mt-lg-0">
              <Form.Select
                aria-label="launch status"
                className={HomeStyles.select__field}
                onChange={(e) => handleLaunchStatus(e)}
                defaultValue={"DEFAULT"}
              >
                <option value="DEFAULT" disabled="disabled">
                  Launch status
                </option>
                <option value="all">All</option>
                <option value="success">Success</option>
                <option value="failed">Failed</option>
              </Form.Select>
            </div>
          )}

          <div className="col-lg-2 col-md-3 col-4 px-0 px-md-1 mt-4 mt-lg-0">
            <Form.Select
              aria-label="launch status"
              className={HomeStyles.select__field}
              onChange={(e) => handleGrouping(e)}
              defaultValue={"DEFAULT"}
            >
              <option value="DEFAULT" disabled="disabled">
                Group by
              </option>
              <option value="none">None</option>
              <option value="mission_name">Mission name</option>
              <option value="rocket_name">Rocket name</option>
              <option value="site">Launch site</option>
            </Form.Select>
          </div>

          {isGrouping && (
            <div className="col-lg-2 col-md-3 col-6 mt-4 mt-lg-0 d-flex align-items-center">
              <div className="text-danger pointer" onClick={resetFilter}>
                Clear Grouping <FiX />
              </div>
            </div>
          )}

          {!isGrouping && (
            <div className="col-lg-2 col-md-3 col-4 mt-4 mt-lg-0">
              <Form.Select
                aria-label="launch status"
                className={HomeStyles.select__field}
                onChange={(e) => handleSorting(e)}
                defaultValue={"DEFAULT"}
              >
                <option value="DEFAULT" disabled="disabled">
                  Sort by
                </option>
                <option value="none">None</option>
                <option value="recent">Most recent launch</option>
                <option value="oldest">Oldest launch</option>
              </Form.Select>
            </div>
          )}
        </div>

        {!isGrouping ? (
          <section className={`${HomeStyles.responsive__row} row`}>
            {renderLaunches(searchResult)}
          </section>
        ) : (
          <section>
            {isGrouping && (
              <h5 className={HomeStyles.groupedby__header}>
                Grouped by: <span> {groupName} </span>
              </h5>
            )}

            <Accordion defaultActiveKey={0}>
              {searchResult.map((data, index) => {
                return (
                  <Accordion.Item eventKey={index} key={index}>
                    <Accordion.Header>{data[0]}</Accordion.Header>
                    <Accordion.Body>{renderLaunches(data[1])}</Accordion.Body>
                  </Accordion.Item>
                );
              })}
            </Accordion>
          </section>
        )}
      </div>
    </div>
  );
};
