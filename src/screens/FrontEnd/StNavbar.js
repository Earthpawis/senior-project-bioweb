import React from 'react'
import { Button, Nav, NavDropdown, Navbar, NavItem, Container, ContainerFluid } from 'react-bootstrap';
import { useState, useEffect, useMemo } from 'react'
import axios from 'axios'
import '../FrontEnd/css/home.css'


const StNavbar = () => {
  return (

    <Navbar collapseOnSelect expand="lg" bg="light" variant="light" fixed="top" >
      <Container fluid>
        <Navbar.Brand href="#home">
          <img
            alt=""
            src="/logo.svg"
            width="30"
            height="30"
            className="d-inline-block align-top"
          />{' '}
        BioRmutt
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto ">
            <Nav.Link href="#">หน้าแรก</Nav.Link>
            <Nav.Link href="#">สารเคมี</Nav.Link>
            <Nav.Link href="#">อุปกรณ์</Nav.Link>
            <Nav.Link href="#">รายการเบิกสารเคมี</Nav.Link>
            <Nav.Link href="#">รายการเบิกอุปกรณ์</Nav.Link>
            <NavDropdown title="ตะกร้าสารเคมีและอุปกรณ์" id="collasible-nav-dropdown">
              <NavDropdown.Item href="#action/3.1">เบิกสารเคมี</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.2">ยืมอุปกรณ์</NavDropdown.Item>
            </NavDropdown>
          </Nav>
          <Nav>
            <Nav.Link href="#deets">More deets</Nav.Link>
            <Nav.Link eventKey={2} href="#memes">
              Dank memes
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>

    /* <div>
      <nav
        className="navbar navbar-expand-lg navbar-light  fixed-top"
        style={{
          backgroundColor: "#fff",
          boxShadow: "0px 10px 11px 0px rgba(0, 0, 0, 0.24)",
        }}
      >
        <div className="container-fluid">
          <a className="navbar-brand" href="#">
            <img
              src="/src/screens/FrontEnd/img/connection.png"
              alt
              width={30}
              height={24}
              className="d-inline-block align-text-top"
            />
            <span className="BioName">| BioRmutt</span>
          </a>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation">
            <span className="navbar-toggler-icon" />
          </button>
          <div className="row collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0 namehome">
              <li className="nav-item">
                <a
                  className="nav-link  NavBarName"
                  aria-current="page"
                  href="#"
                >
                  หน้าแรก
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link NavBarName" href="#">
                  สารเคมี
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link NavBarName" href="#">
                  อุปกรณ์
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link NavBarName" href="#">
                  รายการเบิกสารเคมี
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link NavBarName" href="#">
                  รายการยืมอุปกรณ์
                </a>
              </li>
              <li className="nav-item dropdown">
                <a
                  className="nav-link NavBarName dropdown-toggle"
                  href="#"
                  id="navbarDropdownMenuLink"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  ตะกร้าอุปกรณ์และสารเคมี
                </a>
                <ul
                  className="dropdown-menu"
                  aria-labelledby="navbarDropdownMenuLink"
                >
                  <li>
                    <a className="dropdown-item" href="#">
                      สารเคมี
                    </a>
                  </li>
                  <li>
                    <a className="dropdown-item" href="#">
                      อุปกรณ์
                    </a>
                  </li>
                </ul>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </div> */
  );
}

export default StNavbar
