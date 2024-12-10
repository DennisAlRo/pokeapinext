'use client';

import { Navbar, Nav, NavDropdown } from 'react-bootstrap';
import Link from 'next/link';

export default function NavBar() {
  return (
    <Navbar bg="light" expand="lg">
      <Navbar.Brand>
        <Link href="/" passHref>
          <span style={{ cursor: 'pointer', textDecoration: 'none' }}>PokeAPI</span>
        </Link>
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="me-auto">
          <NavDropdown title="Generaciones" id="basic-nav-dropdown">
            <NavDropdown.Item as="div">
              <Link href="/generacion/1">
                <span style={{ cursor: 'pointer' }}>Generación 1</span>
              </Link>
            </NavDropdown.Item>
            <NavDropdown.Item as="div">
              <Link href="/generacion/2">
                <span style={{ cursor: 'pointer' }}>Generación 2</span>
              </Link>
            </NavDropdown.Item>
            <NavDropdown.Item as="div">
              <Link href="/generacion/3">
                <span style={{ cursor: 'pointer' }}>Generación 3</span>
              </Link>
            </NavDropdown.Item>
            <NavDropdown.Item as="div">
              <Link href="/generacion/4">
                <span style={{ cursor: 'pointer' }}>Generación 4</span>
              </Link>
            </NavDropdown.Item>
          </NavDropdown>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
}
