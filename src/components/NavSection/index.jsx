import React from "react";
import { Navbar, Container, Nav } from "react-bootstrap";
import NavStyle from "./NavSection.module.css";
import MyAvatar from "../../assets/images/MyAvatar.jpg"

export const NavSection = () => {
  return (
    <Navbar bg="light" expand="lg">
      <Container>
        <Navbar.Brand href="#home">SpaceX</Navbar.Brand>

        <Nav className="ms-auto">
          <Nav.Link href="#link" className={NavStyle.user__link}>
            <div className={NavStyle.avatar__container}>
              <img src={MyAvatar} alt="my_avatar" className="rounded-circle" />
            </div>
            <h3 className={NavStyle.name}>Oluwatobi Taiwo</h3>
          </Nav.Link>
        </Nav>
      </Container>
    </Navbar>
  );
};
