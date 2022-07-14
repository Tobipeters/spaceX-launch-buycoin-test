import React from "react";
import { Modal } from "react-bootstrap";
import { VideoView } from "../VideoView";
import DisplayModalStyles from "./DisplayModal.module.css";

export const DisplayModal = (props) => {
  return (
    <Modal show={props.show} onHide={props.handleCLose} size="lg">
      <Modal.Header closeButton>
        <Modal.Title
          className={DisplayModalStyles.modal__title}
        >{`${props.data.mission_name} | ${props.data.rocket.rocket_name} launch`}</Modal.Title>
      </Modal.Header>
      <Modal.Body className="show-grid">
        <VideoView data={props.data} />
      </Modal.Body>
    </Modal>
  );
};
