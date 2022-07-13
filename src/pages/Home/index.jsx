import React, { useState, useEffect } from "react";
import { LaunchCard } from "../../components/LaunchCard";
import { useQuery } from "@apollo/client";
import { GET_ROCKET_LAUNCHES } from "../../queries/index.gql";
import { Form } from "react-bootstrap";
import HomeStyles from "./Home.module.css";

export const Home = () => {
  //   const [value, setValue] = useState("");
  const [searchResult, setSearchResult] = useState([]);
  const { data, error, loading } = useQuery(GET_ROCKET_LAUNCHES);

  useEffect(() => {
    if (!loading && !error) {
      setSearchResult(data.launches);
    }
  }, [data, error, loading]);

  if (loading) return "";

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

    const statusfilter = value === "success" ? true : false;

    const filtered = data.launches.filter((launch) => {
      return launch.launch_success === statusfilter;
    });

    setSearchResult(filtered);
  };

  const handleSorting = (event) => {
    const value = event.target.value;

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

    const raw_data = data.launches.map((data) => {
      return {
        ...data,
        rocket_name: data.rocket.rocket_name,
        launch_site: data.launch_site.site_name,
      };
    });

    const groupedData = raw_data.reduce((result, currentValue) => {
      (result[currentValue[value]] = result[currentValue[value]] || []).push(
        currentValue
      );

      return result;
    }, []);

    console.log(Object.entries(groupedData));
  };

  const resetFilter = () => setSearchResult(data.launches);

  return (
    <div>
      <div className={HomeStyles.search__container}>
        <Form.Control
          className="shadow-sm"
          size="lg"
          type="text"
          placeholder="Search mission name, rocket name, and launch site"
          onChange={(e) => handleSearch(e)}
        />
      </div>

      <div className={`${HomeStyles.home__card} card`}>
        <div className={`${HomeStyles.header__section} row`}>
          <div className="col-lg-6 col-md-12 col-12">
            <h3 className={`${HomeStyles.title} mb-0`}>
              Space X Rocket Launches{" "}
            </h3>
          </div>
          <div className="col-lg-2 col-md-3 col-4 mt-4 mt-lg-0">
            <Form.Select
              aria-label="launch status"
              className={HomeStyles.select__field}
              onChange={(e) => handleLaunchStatus(e)}
            >
              <option disabled>Launch status</option>
              <option value="success">Success</option>
              <option value="failed">Failed</option>
            </Form.Select>
          </div>

          <div className="col-lg-2 col-md-3 col-4 mt-4 mt-lg-0">
            <Form.Select
              aria-label="launch status"
              className={HomeStyles.select__field}
              onChange={(e) => handleGrouping(e)}
            >
              <option disabled>Group by</option>
              <option value="mission_name">Mission name</option>
              <option value="rocket_name">Rocket name</option>
              <option value="launch_site">Launch site</option>
            </Form.Select>
          </div>

          <div className="col-lg-2 col-md-3 col-4 mt-4 mt-lg-0">
            <Form.Select
              aria-label="launch status"
              className={HomeStyles.select__field}
              onChange={(e) => handleSorting(e)}
            >
              <option disabled>Sort by</option>
              <option value="recent">Most recent launch</option>
              <option value="oldest">Oldest launch</option>
            </Form.Select>
          </div>
        </div>

        <section className={`${HomeStyles.responsive__row} row`}>
          {searchResult.map((rocket_launch_detail, index) => {
            return (
              <div className="col-lg-12 col-12" key={index}>
                <LaunchCard
                  numbering={index}
                  launchDetails={rocket_launch_detail}
                />
              </div>
            );
          })}
        </section>
      </div>
    </div>
  );
};
