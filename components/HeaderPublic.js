import React, { Component, Fragment } from "react";
import { Dropdown, Input, Icon, Responsive, Button } from "semantic-ui-react";
import Link from 'next/link';
import Image from 'next/image';
const tagOptions = [
  {
    key: "/mis-busquedas",
    text: "Mis Búsquedas",
  },
  {
    key: "/favoritos",
    text: "Lista de deseos",
  },
  {
    key: "/mis-publicaciones/vehiculos/Pagina_1",
    text: "Mis Publicaciones",
  },
  {
    key: "/crear-producto",
    text: "Vender mi vehículo",
  },
  {
    key: "/perfil",
    text: "Perfil",
  },
  {
    key: "/cerrar-sesion",
    text: "Cerrar Sesión",
  },
];

export default class HeaderPublic extends Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleKeyDown = this.handleKeyDown.bind(this);
    this.state = {
      logged: 0,
      search: "",
    };
  }

  handleClick(keyHandler) {
    if (keyHandler !== "/cerrar-sesion") {
      location.replace(keyHandler);
    } else {
      localStorage.removeItem("token");
      location.replace("/");
    }
  }

  handleSearch() {
    if (
      document.getElementById("dropSearchInput").classList.contains("visible")
    ) {
      document.getElementById("dropSearchInput").classList.remove("visible");
    } else {
      document.getElementById("dropSearchInput").classList.add("visible");
    }
  }

  handleSubmit() {
    if (this.state.search != "") {
      location.replace(
        "/vehiculos/Carros-y-camionetas_1/Marca/Modelo/Estilo/Ubicacion/Ciudad/Anio/Combustible/Estado/Desde_0-Hasta_0/Desde_0-Hasta_0/Pagina_1/Promo_0/Permu_0/Buscar_" +
          this.state.search +
          "/Orden_0"
      );
    }
  }

  handleKeyDown(event) {
    if (event.keyCode === 13) {
      this.handleSubmit();
    }
  }

  componentDidMount() {
    this.setState({
      logged: localStorage.getItem("token") == null? 0: 1,
    });
  }

  render() {
    return (
      <>
        <div
          className="nativeHeader"
          style={{ zIndex: 1001, background: "#000" }}
        >
          <nav className="navbar navbar-expand-lg navbar-dark navbar-native-second">
            <button
              className="navbar-toggler"
              type="button"
              data-toggle="collapse"
              data-target="#navbarSupportedContent"
              aria-controls="navbarSupportedContent"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <Icon color="grey" inverted name="bars" size="big" />
            </button>

            <Responsive
              {...Responsive.onlyMobile}
              style={{ display: "contents" }}
            >
              <div style={{ textAlign: "center", margin: "0 auto" }}>
                  <Image
                    src="/images/VTN_logo_white.png"
                    style={{ height: "auto", width: "55px", margin: "0 auto" }}
                    layout={'fill'}
                  />
              </div>
              {this.state.logged === 0 && (
                <Link id="link-login" href="/login">
                  <h6 className="text-native">LOGIN</h6>
                </Link>
              )}
              {this.state.logged === 1 && (
                <Dropdown
                  text="MI CUENTA"
                  floating
                  direction="left"
                  labeled
                  button
                  style={{ marginTop: "-9px", color: "white" }}
                >
                  <Dropdown.Menu>
                    <Dropdown.Menu scrolling>
                      {tagOptions.map((option, index) => (
                        <Fragment key={index}>
                          <Dropdown.Item
                            onClick={this.handleClick.bind(this, option.key)}
                            key={option.value}
                            {...option}
                          />
                          {index + 1 !== tagOptions.length && (
                            <Dropdown.Divider />
                          )}
                        </Fragment>
                      ))}
                    </Dropdown.Menu>
                  </Dropdown.Menu>
                </Dropdown>
              )}
            </Responsive>
            <Responsive
              {...Responsive.onlyTablet}
              style={{ display: "contents" }}
            >
              <div style={{ textAlign: "center", margin: "0 auto" }}>
                  <Image
                    src="/images/VTN_logo_white.png"
                    style={{ height: "auto", width: "70px", margin: "0 auto" }}
                    layout={'fill'}
                  />
              </div>
              {this.state.logged === 0 && (
                <Link id="link-login" href="/login">
                  <h6 className="text-native">LOGIN</h6>
                </Link>
              )}
              {this.state.logged === 1 && (
                <Dropdown
                  text="MI CUENTA"
                  floating
                  direction="left"
                  labeled
                  button
                  style={{ marginTop: "-9px", color: "white" }}
                >
                  <Dropdown.Menu>
                    <Dropdown.Menu scrolling>
                      {tagOptions.map((option, index) => (
                        <Fragment key={index}>
                          <Dropdown.Item
                            onClick={this.handleClick.bind(this, option.key)}
                            key={option.value}
                            {...option}
                          />
                          {index + 1 !== tagOptions.length && (
                            <Dropdown.Divider />
                          )}
                        </Fragment>
                      ))}
                    </Dropdown.Menu>
                  </Dropdown.Menu>
                </Dropdown>
              )}
            </Responsive>

            <div
              className="collapse navbar-collapse"
              id="navbarSupportedContent"
              style={{ marginTop: 10 }}
            >
              <ul
                className="navbar-nav mr-auto"
                style={{ width: "auto", margin: "0 auto" }}
              >
                <li className="nav-item deleteMobile">

                    <Image
                      src="/images/VTN_logo_white.png"
                      style={{
                        height: "auto",
                        width: "70px",
                        margin: "0 auto",
                      }}
                      layout={'fill'}
                    />
                </li>
                <li
                  className="nav-item"
                  data-toggle="collapse"
                  data-target="#navbarSupportedContent"
                >
                  <span
                    className="nav-link"
                    style={{ letterSpacing: 2 }}
                  >
                    HOME
                    <Icon name="angle right" size="big" />
                  </span>
                </li>
                <li
                  className="nav-item"
                  data-toggle="collapse"
                  data-target="#navbarSupportedContent"
                >
                  <Link
                    className="nav-link"
                    style={{ letterSpacing: 2 }}
                    href="/vehiculos"
                  >
                    <>
                        VEH&Iacute;CULOS
                        <Icon name="angle right" size="big" />
                    </>
                  </Link>
                </li>
                <li
                  className="nav-item"
                  data-toggle="collapse"
                  data-target="#navbarSupportedContent"
                >
                  <Link
                    className="nav-link"
                    style={{ letterSpacing: 2 }}
                    href="/servicios"
                  >
                    <>
                    SERVICIOS
                    <Icon name="angle right" size="big" /></>
                  </Link>
                </li>

                <li
                  className="nav-item"
                  data-toggle="collapse"
                  data-target="#navbarSupportedContent"
                >
                  <Link
                    className="nav-link"
                    style={{ letterSpacing: 2 }}
                    href="/comunidad/Buscar_/Pagina_1"
                  >
                      <>
                    COMUNIDAD
                    <Icon name="angle right" size="big" /></>
                  </Link>
                </li>

                <li
                  className="nav-item"
                  data-toggle="collapse"
                  data-target="#navbarSupportedContent"
                >
                  <Link
                    className="nav-link"
                    style={{ letterSpacing: 2 }}
                    href={this.state.logged === 1 ? "/crear-producto": '/login'}
                  >
                      <>
                    VENDER
                    <Icon name="angle right" size="big" /></>
                  </Link>
                </li>

                <li
                  id="input-nav"
                  style={{ margin: "0 7%", textAlign: "center" }}
                >
                  <Icon
                    onClick={this.handleSearch}
                    name="search"
                    size="large"
                    style={{ color: "#fff", marginTop: 10 }}
                  />
                  <Dropdown id="dropSearch" floating direction="left">
                    <Dropdown.Menu id="dropSearchInput">
                      <Input
                        onChange={(e) =>
                          this.setState({ search: e.target.value })
                        }
                        onKeyDown={this.handleKeyDown}
                        placeholder="Buscar..."
                      />
                      <Button
                        color="black"
                        onClick={this.handleSubmit}
                        style={{ paddingRight: 10 }}
                      >
                        <Icon style={{ opacity: 1 }} name="search" />
                      </Button>
                    </Dropdown.Menu>
                  </Dropdown>
                </li>
                <li className="nav-item deleteMobile" style={{ width: 250 }}>
                  {this.state.logged === 0 && (
                    <Link
                      id="link-login"
                      href="/login"
                      style={{ textDecoration: "none" }}
                    >
                      <h6 className="text-native" style={{ marginTop: 9 }}>
                        LOGIN
                      </h6>
                    </Link>
                  )}
                  {this.state.logged === 1 && (
                    <Dropdown
                      text="MI CUENTA"
                      floating
                      direction="left"
                      labeled
                      button
                      style={{ marginTop: 9, color: "white" }}
                    >
                      <Dropdown.Menu>
                        <Dropdown.Menu scrolling>
                          {tagOptions.map((option, index) => (
                            <Fragment key={index}>
                              <Dropdown.Item
                                onClick={this.handleClick.bind(
                                  this,
                                  option.key
                                )}
                                key={option.value}
                                {...option}
                              />
                              {index + 1 !== tagOptions.length && (
                                <Dropdown.Divider />
                              )}
                            </Fragment>
                          ))}
                        </Dropdown.Menu>
                      </Dropdown.Menu>
                    </Dropdown>
                  )}
                </li>
              </ul>
            </div>
          </nav>
        </div>
      </>
    );
  }
}
