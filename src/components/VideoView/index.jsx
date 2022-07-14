import React from "react";
import VideoViewStyles from "./VideoView.module.css";
import format from "date-fns/format";

export const VideoView = (props) => {
  const getId = (url) => {
    const regExp =
      /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = url.match(regExp);

    return match && match[2].length === 11 ? match[2] : null;
  };

  return (
    <div>
      <iframe
        className={VideoViewStyles.video__iframe}
        src={`//www.youtube.com/embed/${getId(
          props.data.links.video_link
        )}?autoplay=1`}
      ></iframe>
      <div className={VideoViewStyles.content__container}>
        <div className="row mb-4">
          <div className="col-lg-8 col-md-6">
            <h5 className={VideoViewStyles.title}>
              {props.data.mission_name} | {props.data.rocket.rocket_name}
            </h5>
            <p className={`${VideoViewStyles.date} mb-0 text-black-50`}>
              {format(new Date(props.data.launch_date_local), "do MMM yyyy")}
            </p>
          </div>
        </div>
        <p className={`${VideoViewStyles.details} mb-0`}>
          {props.data.details}
        </p>

        <p className={`${VideoViewStyles.link} mt-4 mb-0`}>
          Read full article{" "}
          <a
            href={props.data.links.article_link}
            target="_blank"
            rel="noopener noreferrer"
          >
            here
          </a>
        </p>
      </div>
    </div>
  );
};
