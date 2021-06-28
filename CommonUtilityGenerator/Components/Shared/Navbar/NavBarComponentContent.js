const V = require("voca");

const NavBarComponentContent = entities => {
  const links = entities
    .map(a => {
      return ` 
      
      <NavDropdown.Item className="text-uppercase small" href='/${V.lowerCase(
        a.name
      )}'>
        ${V.titleCase(a.name)}
      </NavDropdown.Item>
    `;
    })
    .join("");

  return `
    
    import React from "react";
import { Navbar, Nav, NavDropdown } from "react-bootstrap";

export default function MenuBar() {
  return (
    <Navbar bg="dark" variant="dark" expand="lg">
      <Navbar.Brand href="#home">React-Bootstrap</Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="mr-auto">
        <Nav.Link href="/">Home</Nav.Link>
        <NavDropdown title="Master" class="small" id="basic-nav-dropdown">
            ${links}
        </NavDropdown> 
         
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
}
`;
};

module.exports = { NavBarComponentContent };
