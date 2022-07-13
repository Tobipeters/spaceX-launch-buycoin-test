import React from "react";
import LaunchCardStyle from "./LaunchCard.module.css";
import { format } from "date-fns";
import { FiCheck, FiX } from "react-icons/fi";

export const LaunchCard = (props) => {
  return (
    <section className={`${LaunchCardStyle.launch__card} card`}>
      <div className={LaunchCardStyle.numbering}>{props.numbering + 1}</div>
      <div className={LaunchCardStyle.ver__line__separator}></div>
      <div className="row w-100 mx-0">
        <div
          className={`${LaunchCardStyle.name__details} col-lg-1 col-md-2 col-3 ps-3 ps-md-4 ps-lg-0`}
        >
          <img
            src={
              props.launchDetails.links.flickr_images[0]
                ? props.launchDetails.links.flickr_images[0]
                : props.launchDetails.links.flickr_images[1]
            }
          />
        </div>

        <div
          className={`${LaunchCardStyle.name__details} col-lg-2 col-md-10 col-9`}
        >
          <h5 className={LaunchCardStyle.name}>Mission Name</h5>
          <h5 className={`${LaunchCardStyle.detail} mb-0`}>
            {props.launchDetails.mission_name}
          </h5>
        </div>

        <div
          className={`${LaunchCardStyle.name__details} col-lg-2 col-4 ps-3 ps-md-4 ps-lg-0`}
        >
          <h5 className={LaunchCardStyle.name}>Rocket Name</h5>
          <h5 className={`${LaunchCardStyle.detail} mb-0`}>
            {props.launchDetails.rocket.rocket_name}
          </h5>
        </div>

        <div
          className={`${LaunchCardStyle.name__details} col-lg-2 col-4`}
        >
          <h5 className={LaunchCardStyle.name}>Launch Site</h5>
          <h5 className={`${LaunchCardStyle.detail} mb-0`}>
            {props.launchDetails.launch_site.site_name}
          </h5>
        </div>

        <div
          className={`${LaunchCardStyle.name__details} ${LaunchCardStyle.mobile__footer}  col-lg-2 col-6 order-2 order-lg-1`}
        >
          <h5 className={LaunchCardStyle.name}> Status</h5>
          <h5 className={`${LaunchCardStyle.detail} mb-0`}>
            {props.launchDetails.launch_success && (
              <div className={LaunchCardStyle.success__status}>
                <FiCheck />
                <span>Success</span>
              </div>
            )}

            {!props.launchDetails.launch_success && (
              <div className={LaunchCardStyle.failed__status}>
                <FiX />
                <span>Failed</span>
              </div>
            )}
          </h5>
        </div>

        <div
          className={`${LaunchCardStyle.name__details}  col-lg-2  order-1 order-lg-2 col-4`}
        >
          <h5 className={LaunchCardStyle.name}> Date</h5>
          <h5 className={`${LaunchCardStyle.detail} mb-0`}>
            {format(
              new Date(props?.launchDetails?.launch_date_local),
              "do MMM yyyy"
            )}
          </h5>
        </div>

        <div
          className={`${LaunchCardStyle.name__details} ${LaunchCardStyle.mobile__footer} border-right-0 col-lg-1  col-6 order-3 order-lg-3`}
        >
          <div className={LaunchCardStyle.learn__more__link}>
            <a>Learn more</a>
          </div>
        </div>
      </div>
    </section>
  );
};
