import React from 'react';
import { Navbar, Nav } from 'react-bootstrap';

function Header({ handleCategoryClick }) {
  return (
    <Navbar bg="dark" variant="dark" expand="lg">
      <Navbar.Brand href="#">Antakya Gezi Rehberi</Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="mr-auto">
          <Nav.Link onClick={() => handleCategoryClick("Anasayfa")}>Anasayfa</Nav.Link>
          {/* Categories will be dynamically added here */}
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
}

export default Header;
