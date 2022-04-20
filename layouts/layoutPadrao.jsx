import Head from "next/head";
import {
  Container,
  Row,
  Col,
  Offcanvas,
  Navbar,
  Nav,
  NavDropdown,
  Image,
  Card,
  Button,
} from "react-bootstrap";

import MenuSecundario from "../components/menuSecundario";
import UltimasTraducoes  from "../components/ultimasTraducoes";
import UltimosHacks  from "../components/ultimosHacks";
import UltimosTutoriais from '../components/ultimosTutoriais';
import UltimosUtilitarios from '../components/ultimosUtiliarios';
import UltimasForum from '../components/ultimasForum';

import Setup from "../config/setup";
import Menu from "../config/menu";

export default function LayoutPadrao({ children }) {
  return (
    <>
      <Head>
        <title>{Setup.title}</title>
        <link rel="icon" href="/favicon-32x32.png" />
      </Head>
      <Container fluid>
        <Row>
          <Navbar bg="dark" variant="dark" expand={false} fixed="top">
            <Container fluid>
              <Col>
                <Navbar.Toggle
                  className="bg-primary text-dark"
                  aria-controls="offcanvasNavbar"
                />
              </Col>
              <Col xs={9} lg="auto" className="text-center">
                <Navbar.Brand href="#">
                  <Image src={Setup.logo} width={300} thumbnail></Image>
                </Navbar.Brand>
              </Col>
              <Col xs className="d-none d-lg-inline-block"></Col>
              <Navbar.Offcanvas
                id="offcanvasNavbar"
                aria-labelledby="offcanvasNavbarLabel"
                placement="start"
              >
                <Offcanvas.Header closeButton>
                  <Offcanvas.Title id="offcanvasNavbarLabel">
                    <Image src={Setup.logo}></Image>
                  </Offcanvas.Title>
                </Offcanvas.Header>
                <Offcanvas.Body>
                  <Nav className="justify-content-end flex-grow-1 pe-3">
                    {Menu.map((item, i) => (
                      <Nav.Link key={i} href={item.url}>
                        {item.title}
                      </Nav.Link>
                    ))}
                  </Nav>
                </Offcanvas.Body>
              </Navbar.Offcanvas>
            </Container>
          </Navbar>
        </Row>
        <Row className="py-4"></Row>
        <Row className="py-4">
          <MenuSecundario menu={Menu}></MenuSecundario>
        </Row>
        <Row>
          <Container>
            <Row>
              <Col xs lg={10}>
                {children}
              </Col>
              <Col xs={12} className="py-4 d-lg-none"></Col>
              <Col xs lg={2}>
                <UltimasTraducoes></UltimasTraducoes>
                <UltimosHacks></UltimosHacks>
                <UltimosTutoriais></UltimosTutoriais>
                <UltimosUtilitarios></UltimosUtilitarios>
                <UltimasForum></UltimasForum>
              </Col>
            </Row>
          </Container>
        </Row>
      </Container>
    </>
  );
}
