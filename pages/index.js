import Head from 'next/head'
import React, { Component } from "react";
import Link from 'next/link';
import {
  Image,
  Divider,
  Header,
  Form,
  Container,
  Grid,
  Button,
  Input,
  Select,
  Dimmer,
  Loader,
  Responsive,
} from "semantic-ui-react";
import Iframe from "react-iframe";
import axios from "axios";

import CarouselHome from "../components/carruselHome";
import CarruselCards from "../components/carruselCards";
import HeaderPublic from "../components/HeaderPublic";

const optionsPrice = [
  { key: 0, text: "Precio", value: 0 },
  { key: 1, text: "Hasta $10.000.000", value: 1 },
  { key: 2, text: "$10.000.000 a $20.000.000", value: 2 },
  { key: 3, text: "$20.000.000 a $35.000.000", value: 3 },
  { key: 4, text: "$35.000.000 a $50.000.000", value: 4 },
  { key: 5, text: "$50.000.000 a $100.000.000", value: 5 },
  { key: 6, text: "$100.000.000 a $125.000.000", value: 6 },
  { key: 7, text: "$125.000.000 a $150.000.000", value: 7 },
  { key: 8, text: "$150.000.000 a $175.000.000", value: 8 },
  { key: 9, text: "$175.000.000 a $200.000.000", value: 9 },
  { key: 10, text: "$200.000.000 a $250.000.000", value: 10 },
  { key: 11, text: "$250.000.000 a $300.000.000", value: 11 },
  { key: 12, text: "$300.000.000 a $350.000.000", value: 12 },
  { key: 13, text: "$350.000.000 a $400.000.000", value: 13 },
  { key: 14, text: "Más de $400.000.000", value: 14 },
];

export default class Home extends Component {
  constructor(props) {
    super(props);
    this.handleChangeCategory = this.handleChangeCategory.bind(this);
    this.handleChangeMarcas = this.handleChangeMarcas.bind(this);
    this.handleChangeModelos = this.handleChangeModelos.bind(this);
    this.onClickFav = this.onClickFav.bind(this);
    this.onClickFilter = this.onClickFilter.bind(this);
    this.handleCheckBox = this.handleCheckBox.bind(this);
    this.handleCheckBoxNews = this.handleCheckBoxNews.bind(this);
    this.onNewsletter = this.onNewsletter.bind(this);
    this.handleSearch = this.handleSearch.bind(this);
    this.handleKeyDown = this.handleKeyDown.bind(this);
    this.handleChangePrice = this.handleChangePrice.bind(this);
    this.handleAnioDesde = this.handleAnioDesde.bind(this);
    this.handleAnioHasta = this.handleAnioHasta.bind(this);
    this.state = {
      dimmer: false,
      categories: [],
      vehiculosPromocion: [],
      optionsCategories: [],
      optionsMarcas: [],
      optionsModelos: [],
      optionsAnios: [],
      optionsAniosDesde: [],
      optionsAniosHasta: [],
      banners: [],
      bannersMobile: [],
      noticias: [],
      marcas: [],
      link_video: "",
      selectCategory: "Carros-y-camionetas_1",
      selectMarca: 0,
      selectModelo: 0,
      desdePrecio: 0,
      hastaPrecio: 0,
      desdeAnio: 0,
      hastaAnio: 0,
      promocion: 0,
      permuta: 0,
      disabledNews: true,
      nombreNewsletter: "",
      emailNewsletter: "",
      search: "",
    };
  }

  componentDidMount() {
    this.setState({
      dimmer: true,
    });
    axios
      .get("api/home/index")
      .then((res) => {
        let optionsCategories = [];
        res.data.categories.forEach(function(item) {
          optionsCategories.push({
            key:
              item.nombre
                .split(" ")
                .join("-")
                .split("?")
                .join("") +
              "_" +
              item.id,
            value:
              item.nombre
                .split(" ")
                .join("-")
                .split("?")
                .join("") +
              "_" +
              item.id,
            text: item.nombre,
          });
        });

        let optionsAnios = [{ key: "", value: "", text: "Años" }];
        res.data.anios.forEach(function(item) {
          optionsAnios.push({ key: item.ano, value: item.ano, text: item.ano });
        });

        let optionsAniosDesde = [{ key: "", value: "", text: "Desde" }];
        res.data.anios.forEach(function(item) {
          optionsAniosDesde.push({
            key: item.ano,
            value: item.ano,
            text: item.ano,
          });
        });

        let optionsAniosHasta = [{ key: "", value: "", text: "Hasta" }];
        res.data.anios.forEach(function(item) {
          optionsAniosHasta.push({
            key: item.ano,
            value: item.ano,
            text: item.ano,
          });
        });

        let optionsMarcas = [{ key: "", value: "", text: "Marca" }];

        res.data.marcasFil.forEach(function(item) {
          optionsMarcas.push({
            key:
              item.nombre
                .split(" ")
                .join("-")
                .split("?")
                .join("") +
              "_" +
              item.id,
            value:
              item.nombre
                .split(" ")
                .join("-")
                .split("?")
                .join("") +
              "_" +
              item.id,
            text: item.nombre,
          });
        });

        this.setState({
          optionsMarcas,
          categories: res.data.categories,
          vehiculosPromocion: res.data.vehiculosPromocion,
          banners: res.data.banners,
          bannersMobile: res.data.bannersMobile,
          marcas: res.data.marcas,
          noticias: res.data.noticias,
          link_video: res.data.config.link_video,
          optionsCategories,
          optionsAnios,
          optionsAniosDesde,
          optionsAniosHasta,
          dimmer: false,
        });

        let rightButtonCarousel = document.getElementsByClassName(
          "control-next"
        );
        let leftButtonCarousel = document.getElementsByClassName(
          "control-prev"
        );
        rightButtonCarousel[0].innerHTML +=
          '<i aria-hidden="true" class="white angle right large icon"></i>';
        leftButtonCarousel[0].innerHTML +=
          '<i aria-hidden="true" class="white angle left large icon"></i>';
      })
      .catch((error) => {
        console.log(error);
      });
  }

  onNewsletter() {
    const { nombreNewsletter, emailNewsletter } = this.state;
    const reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (emailNewsletter === "" || reg.test(emailNewsletter) !== true) {
      alert("Correo invalido");
      return;
    }
    if (nombreNewsletter.length < 3) {
      alert("nombre mayor o igual a 3 caracteres");
      return;
    }
    this.setState({
      dimmer: true,
    });
    let data = {
      nombreNewsletter,
      emailNewsletter,
    };
    axios
      .post("api/home/newsletter", data)
      .then((res) => {
        if (res.data.state) {
          this.setState(
            {
              dimmer: false,
              emailNewsletter: "",
              nombreNewsletter: "",
            },
            function() {
              alert(res.data.message);
            }
          );
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }

  handleCheckBox(e, { name, value }) {
    value = name === "promocion" ? this.state.promocion : this.state.permuta;
    this.setState({
      [name]: value == 0 ? 1 : 0,
    });
  }

  handleChangePrice(e, { value }) {
    if (value == 1) {
      this.setState({
        desdePrecio: 0,
        hastaPrecio: 10000000,
      });
    } else if (value == 2) {
      this.setState({
        desdePrecio: 10000000,
        hastaPrecio: 20000000,
      });
    } else if (value == 3) {
      this.setState({
        desdePrecio: 20000000,
        hastaPrecio: 35000000,
      });
    } else if (value == 4) {
      this.setState({
        desdePrecio: 35000000,
        hastaPrecio: 50000000,
      });
    } else if (value == 5) {
      this.setState({
        desdePrecio: 50000000,
        hastaPrecio: 100000000,
      });
    } else if (value == 6) {
      this.setState({
        desdePrecio: 100000000,
        hastaPrecio: 125000000,
      });
    } else if (value == 7) {
      this.setState({
        desdePrecio: 125000000,
        hastaPrecio: 150000000,
      });
    } else if (value == 8) {
      this.setState({
        desdePrecio: 150000000,
        hastaPrecio: 175000000,
      });
    } else if (value == 9) {
      this.setState({
        desdePrecio: 175000000,
        hastaPrecio: 200000000,
      });
    } else if (value == 10) {
      this.setState({
        desdePrecio: 200000000,
        hastaPrecio: 250000000,
      });
    } else if (value == 11) {
      this.setState({
        desdePrecio: 250000000,
        hastaPrecio: 300000000,
      });
    } else if (value == 12) {
      this.setState({
        desdePrecio: 300000000,
        hastaPrecio: 350000000,
      });
    } else if (value == 13) {
      this.setState({
        desdePrecio: 350000000,
        hastaPrecio: 400000000,
      });
    } else if (value == 14) {
      this.setState({
        desdePrecio: 400000000,
        hastaPrecio: 0,
      });
    }
  }

  handleCheckBoxNews(e, { name, value }) {
    var a = document.createElement("a");
    a.target = "_blank";
    a.href = "http://www.vendetunave.co:8080/terminos-y-condiciones";
    a.click();
    this.setState({
      disabledNews: !this.state.disabledNews,
    });
  }

  handleChangeCategory(e, { value }) {
    this.setState({
      dimmer: true,
      selectCategory: value,
    });

    value = value.split("_");

    axios
      .get("api/marcas/getById/" + value[1])
      .then((res) => {
        let optionsMarcas = [{ key: "", value: "", text: "Marca" }];

        res.data.marcas.forEach(function(item) {
          optionsMarcas.push({
            key:
              item.nombre
                .split(" ")
                .join("-")
                .split("?")
                .join("") +
              "_" +
              item.id,
            value:
              item.nombre
                .split(" ")
                .join("-")
                .split("?")
                .join("") +
              "_" +
              item.id,
            text: item.nombre,
          });
        });

        this.setState({
          optionsMarcas,
          dimmer: false,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  handleChangeMarcas(e, { value }) {
    this.setState({
      dimmer: true,
      selectMarca: value,
    });

    value = value.split("_");

    axios
      .get("api/modelos/getById/" + value[1])
      .then((res) => {
        let optionsModelos = [
          { key: "", value: "", text: "Seleccione modelo..." },
        ];

        res.data.modelos.forEach(function(item) {
          optionsModelos.push({
            key:
              item.nombre
                .split(" ")
                .join("-")
                .split("?")
                .join("") +
              "_" +
              item.id,
            value:
              item.nombre
                .split(" ")
                .join("-")
                .split("?")
                .join("") +
              "_" +
              item.id,
            text: item.nombre,
          });
        });

        this.setState({
          optionsModelos,
          dimmer: false,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  handleChangeModelos(e, { value }) {
    this.setState({
      selectModelo: value,
    });
  }

  handleAnioDesde(e, { value }) {
    let optionsAniosHasta = [{ key: "", value: "", text: "Hasta" }];
    this.state.optionsAnios.forEach(function(item) {
      if (item.value >= value) {
        optionsAniosHasta.push({
          key: item.key,
          value: item.value,
          text: item.text,
        });
      }
    });

    this.setState({
      desdeAnio: value,
      optionsAniosHasta,
    });
  }

  handleAnioHasta(e, { value }) {
    let optionsAniosDesde = [{ key: "", value: "", text: "Desde" }];
    this.state.optionsAnios.forEach(function(item) {
      if (item.value <= value) {
        optionsAniosDesde.push({
          key: item.key,
          value: item.value,
          text: item.text,
        });
      }
    });

    this.setState({
      hastaAnio: value,
      optionsAniosDesde,
    });
  }

  onClickFav(id) {
    let element = document.getElementById("icon-fav-" + id);

    if (element.classList.contains("outline")) {
      element.classList.remove("outline");
    } else {
      element.classList.add("outline");
    }
  }

  onClickFilter() {
    let {
      selectCategory,
      selectMarca,
      selectModelo,
      desdePrecio,
      hastaPrecio,
      desdeAnio,
      hastaAnio,
      promocion,
      permuta,
    } = this.state;
    selectCategory = selectCategory == 0 ? "Categoria" : selectCategory;
    selectMarca = selectMarca == 0 ? "Marca" : selectMarca;
    selectModelo = selectModelo == 0 ? "Modelo" : selectModelo;

    let dataNew = {
      category: selectCategory,
      marca: selectMarca,
      modelo: selectModelo,
      tipoMotoSelect: "Estilo",
      ubicacion: "Ubicacion",
      ciudad: "Ciudad",
      anio:
        desdeAnio == 0 && hastaAnio == 0
          ? "Anio"
          : "Desde_" + desdeAnio + "-Hasta_" + hastaAnio,
      combustible: "Combustible",
      blindaje: "Blindaje_0",
      transmision: "Transmision",
      estado: "Estado",
      price: "Desde_" + desdePrecio + "-Hasta_" + hastaPrecio,
      km: "Desde_0-Hasta_0",
      page: "Pagina_1",
      promocion: "Promo_" + promocion,
      permuta: "Permu_" + permuta,
      search: "Buscar_",
      filter: "Orden_0",
    };

    let newUrl = Object.keys(dataNew)
      .map((k) => dataNew[k])
      .join("/");
    window.location.href =
      window.location.protocol +
      "//" +
      window.location.hostname +
      ":" +
      window.location.port +
      "/vehiculos/" +
      newUrl;
  }

  handleSearch() {
    if (this.state.search != "") {
      location.replace("/vehiculos-busqueda/" + this.state.search);
    }
  }

  handleKeyDown(event) {
    if (event.keyCode === 13) {
      this.handleSearch();
    }
  }

  render() {
    return (
        <>
        <Head>
            <meta name="title" content="VendeTuNave" />
            <meta name="image" content="https://www.vendetunave.co/images/logo_VTN.png" />
            <meta name="name" content="VendeTuNave" />
            <meta name="description" content="Vende tu vehículo completamente gratis en VendeTuNave. Encuentra carros, camionetas, motos, servicios y recomendaciones en un solo sitio." />
            <meta name="type" content="website" />
            <meta name="og:image" content="https://www.vendetunave.co/images/logo_VTN.png" />
            <meta name="og:title" content="VendeTuNave" />
            <meta name="og:description" content="Vende tu vehículo completamente gratis en VendeTuNave. Encuentra carros, camionetas, motos, servicios y recomendaciones en un solo sitio." />
            <meta name="og:type" content="website" />
            <link href="https://fonts.googleapis.com/css?family=Raleway:100,600" rel="stylesheet" type="text/css" />
        </Head>
        <HeaderPublic />
        <div className="row">
        <div
        className="col-md-12"
        style={{ paddingRight: 0, paddingLeft: 0 }}
        >
        {/**<Dimmer style={{ position: "fixed" }} active={this.state.dimmer}>
          <Loader>Cargando...</Loader>
        </Dimmer>**/}
        <Responsive className="banner-home" {...Responsive.onlyComputer}>
          {this.state.banners.length > 0 && (
            <CarouselHome seccion="home" data={this.state.banners} />
          )}
        </Responsive>

        <Responsive className="banner-home" {...Responsive.onlyMobile}>
          {this.state.bannersMobile.length > 0 && (
            <CarouselHome seccion="home" data={this.state.bannersMobile} />
          )}
        </Responsive>
        <Responsive className="banner-home" {...Responsive.onlyTablet}>
          {this.state.bannersMobile.length > 0 && (
            <CarouselHome seccion="home" data={this.state.bannersMobile} />
          )}
        </Responsive>

        <Responsive {...Responsive.onlyMobile}>
          <Input
            action={{
              icon: "search",
              onClick: this.handleSearch,
              style: {
                background: "transparent",
                color: "white",
                borderBottom: "1px solid white",
                height: 47,
                paddingTop: 22,
              },
            }}
            id="input-search-home"
            style={{
              borderRadius: 0,
              width: "100%",
              paddingLeft: "40px",
              paddingRight: "40px",
              background: "#000",
            }}
            onChange={(e) => this.setState({ search: e.target.value })}
            onKeyDown={this.handleKeyDown}
            placeholder="¿Qué estas buscando?"
          />
        </Responsive>
        <Responsive {...Responsive.onlyTablet}>
          <Input
            action={{
              icon: "search",
              onClick: this.handleSearch,
              style: {
                background: "transparent",
                color: "white",
                borderBottom: "1px solid white",
                height: 47,
                paddingTop: 22,
              },
            }}
            id="input-search-home"
            style={{
              borderRadius: 0,
              width: "100%",
              paddingLeft: "40px",
              paddingRight: "40px",
              background: "#000",
            }}
            onChange={(e) => this.setState({ search: e.target.value })}
            onKeyDown={this.handleKeyDown}
            placeholder="¿Qué estas buscando?"
          />
        </Responsive>
        <Container
          text
          style={{ textAlign: "center", marginTop: 20, marginBottom: 20 }}
        >
          <Header className="centered" as="h1" style={{ fontSize: "1.4rem" }}>
            ¿QUÉ VEHÍCULO ESTÁS BUSCANDO?
          </Header>
          <Responsive {...Responsive.onlyMobile}>
            <Form>
              <Form.Field>
                <Select
                  search
                  options={this.state.optionsCategories}
                  defaultValue={this.state.selectCategory}
                  onChange={this.handleChangeCategory}
                  placeholder="Tipo"
                  style={{ borderRadius: 18 }}
                />
              </Form.Field>
              <Form.Field>
                <label style={{ textAlign: "center", fontSize: 16 }}>
                  Selecciona marca y modelo
                </label>
                <Input type="text" action>
                  <Select
                    search
                    options={this.state.optionsMarcas}
                    onChange={this.handleChangeMarcas}
                    fluid
                    placeholder="Marca"
                    style={{
                      borderTopLeftRadius: 18,
                      borderBottomLeftRadius: 18,
                      borderTopRightRadius: 0,
                      borderBottomRightRadius: 0,
                      borderRightWidth: 0,
                    }}
                  />
                  <Select
                    search
                    id="combo-input-derecha"
                    options={this.state.optionsModelos}
                    onChange={this.handleChangeModelos}
                    fluid
                    placeholder="Modelo"
                    style={{
                      borderTopRightRadius: 18,
                      borderBottomRightRadius: 18,
                    }}
                  />
                </Input>
              </Form.Field>
              <Form.Field style={{ width: "100%" }}>
                <label style={{ textAlign: "center", fontSize: 16 }}>
                  Precios
                </label>
                <Select
                  search
                  options={optionsPrice}
                  onChange={this.handleChangePrice}
                  fluid
                  placeholder="Precio"
                  style={{ borderRadius: 18, marginTop: 10 }}
                />
              </Form.Field>
              <Form.Field>
                <label style={{ textAlign: "center", fontSize: 16 }}>Año</label>
                <Input type="text" action>
                  <Select
                    search
                    options={this.state.optionsAniosDesde}
                    onChange={this.handleAnioDesde}
                    fluid
                    placeholder="Desde"
                    style={{ borderRadius: 18, marginRight: 10 }}
                  />
                  <Select
                    search
                    id="combo-input-derecha"
                    options={this.state.optionsAniosHasta}
                    onChange={this.handleAnioHasta}
                    fluid
                    placeholder="Hasta"
                    style={{ borderRadius: 18 }}
                  />
                </Input>
              </Form.Field>
              <Form.Field>
                <Form.Group id="field-checks">
                  <Form.Checkbox
                    name="promocion"
                    onClick={this.handleCheckBox}
                    label="Promoción"
                  />
                  <Form.Checkbox
                    name="permuta"
                    onClick={this.handleCheckBox}
                    label="Permuta"
                  />
                </Form.Group>
              </Form.Field>
              <Button onClick={this.onClickFilter} color="blue" type="submit">
                BUSCAR VEHÍCULO
              </Button>
            </Form>
          </Responsive>
          <Responsive {...Responsive.onlyTablet}>
            <Form>
              <Form.Field>
                <Select
                  search
                  options={this.state.optionsCategories}
                  defaultValue={this.state.selectCategory}
                  onChange={this.handleChangeCategory}
                  placeholder="Tipo"
                  style={{ borderRadius: 18 }}
                />
              </Form.Field>
              <Form.Field>
                <label style={{ textAlign: "center", fontSize: 16 }}>
                  Selecciona marca y modelo
                </label>
                <Input type="text" action>
                  <Select
                    search
                    options={this.state.optionsMarcas}
                    onChange={this.handleChangeMarcas}
                    fluid
                    placeholder="Marca"
                    style={{
                      borderTopLeftRadius: 18,
                      borderBottomLeftRadius: 18,
                      borderTopRightRadius: 0,
                      borderBottomRightRadius: 0,
                      borderRightWidth: 0,
                    }}
                  />
                  <Select
                    search
                    id="combo-input-derecha"
                    options={this.state.optionsModelos}
                    onChange={this.handleChangeModelos}
                    fluid
                    placeholder="Modelo"
                    style={{
                      borderTopRightRadius: 18,
                      borderBottomRightRadius: 18,
                    }}
                  />
                </Input>
              </Form.Field>
              <Form.Field style={{ width: "100%" }}>
                <label style={{ textAlign: "center", fontSize: 16 }}>
                  Precios
                </label>
                <Select
                  search
                  options={optionsPrice}
                  onChange={this.handleChangePrice}
                  fluid
                  placeholder="Precio"
                  style={{ borderRadius: 18, marginTop: 10 }}
                />
              </Form.Field>
              <Form.Field>
                <label style={{ textAlign: "center", fontSize: 16 }}>Año</label>
                <Input type="text" action>
                  <Select
                    search
                    options={this.state.optionsAniosDesde}
                    onChange={this.handleAnioDesde}
                    fluid
                    placeholder="Desde"
                    style={{ borderRadius: 18, marginRight: 10 }}
                  />
                  <Select
                    search
                    id="combo-input-derecha"
                    options={this.state.optionsAniosHasta}
                    onChange={this.handleAnioHasta}
                    fluid
                    placeholder="Hasta"
                    style={{ borderRadius: 18 }}
                  />
                </Input>
              </Form.Field>
              <Form.Field>
                <Form.Group id="field-checks">
                  <Form.Checkbox
                    name="promocion"
                    onClick={this.handleCheckBox}
                    label="Promoción"
                  />
                  <Form.Checkbox
                    name="permuta"
                    onClick={this.handleCheckBox}
                    label="Permuta"
                  />
                </Form.Group>
              </Form.Field>
              <Button onClick={this.onClickFilter} color="blue" type="submit">
                BUSCAR VEHÍCULO
              </Button>
            </Form>
          </Responsive>
          <Responsive {...Responsive.onlyComputer}>
            <Form style={{ marginTop: 50, marginBottom: 50 }}>
              <Form.Group>
                <Form.Field>
                  <label style={{ textAlign: "center", fontSize: 16 }}>
                    TIPO
                  </label>
                  <Select
                    search
                    options={this.state.optionsCategories}
                    defaultValue={this.state.selectCategory}
                    onChange={this.handleChangeCategory}
                    placeholder="Tipo"
                    style={{ borderRadius: 18 }}
                  />
                </Form.Field>
                <Form.Field style={{ width: "100%" }}>
                  <label style={{ textAlign: "center", fontSize: 16 }}>
                    SELECCIONA MARCA Y MODELO
                  </label>
                  <Input type="text" action>
                    <Select
                      search
                      options={this.state.optionsMarcas}
                      onChange={this.handleChangeMarcas}
                      fluid
                      placeholder="Marca"
                      style={{ borderRadius: 18, marginRight: 10 }}
                    />
                    <Select
                      search
                      id="combo-input-derecha"
                      options={this.state.optionsModelos}
                      onChange={this.handleChangeModelos}
                      fluid
                      placeholder="Modelo"
                      style={{ borderRadius: 18 }}
                    />
                  </Input>
                </Form.Field>
              </Form.Group>
              <Form.Group style={{ marginTop: 40, marginBottom: 40 }}>
                <Form.Field style={{ width: "100%" }}>
                  <label style={{ textAlign: "center", fontSize: 16 }}>
                    PRECIOS
                  </label>
                  <Select
                    search
                    options={optionsPrice}
                    onChange={this.handleChangePrice}
                    fluid
                    placeholder="Precio"
                    style={{ borderRadius: 18 }}
                  />
                </Form.Field>
                <Form.Field style={{ width: "74%" }}>
                  <label style={{ textAlign: "center", fontSize: 16 }}>
                    AÑO
                  </label>
                  <Input type="text" action>
                    <Select
                      search
                      options={this.state.optionsAniosDesde}
                      onChange={this.handleAnioDesde}
                      fluid
                      placeholder="Desde"
                      style={{ borderRadius: 18, marginRight: 10 }}
                    />
                    <Select
                      search
                      id="combo-input-derecha"
                      options={this.state.optionsAniosHasta}
                      onChange={this.handleAnioHasta}
                      fluid
                      placeholder="Hasta"
                      style={{ borderRadius: 18 }}
                    />
                  </Input>
                </Form.Field>
              </Form.Group>
              <Form.Field>
                <Form.Group id="field-checks">
                  <Form.Checkbox
                    name="promocion"
                    onClick={this.handleCheckBox}
                    label="Promoción"
                  />
                  <Form.Checkbox
                    name="permuta"
                    onClick={this.handleCheckBox}
                    label="Permuta"
                  />
                </Form.Group>
              </Form.Field>
              <Button onClick={this.onClickFilter} color="blue">
                BUSCAR VEHÍCULO
              </Button>
            </Form>
          </Responsive>
        </Container>
        <Divider style={{ marginLeft: 20, marginRight: 20 }} />

        <Header
          as="h1"
          textAlign="left"
          style={{ marginLeft: 16, fontSize: "1.4rem" }}
        >
          CATEGORÍAS
        </Header>
        <CarruselCards
          type="categories"
          numberCards={5}
          data={this.state.categories}
        />

        <div
          style={{
            padding: "40px 0",
            margin: "10px 0",
            background: "rgb(242, 244, 246)",
          }}
        >
          <Header
            as="h1"
            textAlign="left"
            style={{ marginLeft: 20, marginBottom: 15, fontSize: "1.4rem" }}
          >
            ACCEDE POR MARCAS
          </Header>
          <Responsive {...Responsive.onlyMobile}>
            <CarruselCards
              type="marcas"
              numberCards={2}
              data={this.state.marcas}
            />
          </Responsive>
          <Responsive {...Responsive.onlyTablet}>
            <CarruselCards
              type="marcas"
              numberCards={2}
              data={this.state.marcas}
            />
          </Responsive>

          <Responsive {...Responsive.onlyComputer}>
            <CarruselCards
              type="marcas"
              numberCards={10}
              data={this.state.marcas}
            />
          </Responsive>
        </div>

        <Responsive {...Responsive.onlyMobile}>
          <Header
            as="h1"
            textAlign="left"
            style={{ marginLeft: 16, fontSize: "1.4rem" }}
          >
            PRODUCTOS EN PROMOCIÓN
          </Header>
          <CarruselCards
            add="plus"
            type="products"
            noFav={true}
            onClickFav={this.onClickFav}
            numberCards={5}
            data={this.state.vehiculosPromocion}
          />
        </Responsive>
        <Responsive {...Responsive.onlyTablet}>
          <Header
            as="h1"
            textAlign="left"
            style={{ marginLeft: 16, fontSize: "1.4rem" }}
          >
            PRODUCTOS EN PROMOCIÓN
          </Header>
          <CarruselCards
            add="plus"
            type="products"
            noFav={true}
            onClickFav={this.onClickFav}
            numberCards={5}
            data={this.state.vehiculosPromocion}
          />
        </Responsive>

        <Responsive {...Responsive.onlyComputer}>
          <Header
            as="h1"
            textAlign="center"
            style={{ marginLeft: 16, marginBottom: 40, fontSize: "1.4rem" }}
          >
            PRODUCTOS EN PROMOCIÓN
          </Header>
          <CarruselCards
            add="plus"
            type="products-desktop"
            noFav={true}
            onClickFav={this.onClickFav}
            numberCards={5}
            data={this.state.vehiculosPromocion}
          />
        </Responsive>

        <Container
          fluid
          style={{
            padding: "70px 40px",
            margin: "40px 0",
            background: "rgb(242, 244, 246)",
          }}
        >
          <Responsive {...Responsive.onlyComputer}>
            <Grid columns="equal">
              <Grid.Row>
                <Grid.Column>
                  <Header
                    as="h1"
                    style={{ fontSize: "1.4rem" }}
                    textAlign="center"
                  >
                    NOTICIAS
                  </Header>
                </Grid.Column>
              </Grid.Row>
              <Grid.Row>
                {this.state.noticias.map((item, index) => (
                  <Grid.Column key={index}>
                    <Header
                      as="h4"
                      textAlign="left"
                      style={{ fontSize: "1.2rem" }}
                    >
                      {item.title}
                    </Header>

                    <p style={{ fontWeight: 500, margin: 0 }}>
                      {item.description}
                    </p>
                    <Button
                      as="a"
                      href={item.link}
                      target="_blank"
                      style={{
                        float: "right",
                        background: "transparent",
                        color: "#000",
                      }}
                    >
                      VER MÁS
                    </Button>
                  </Grid.Column>
                ))}
              </Grid.Row>
            </Grid>
          </Responsive>

          <Responsive {...Responsive.onlyMobile}>
            <Grid columns="equal">
              <Grid.Row>
                <Grid.Column>
                  <Header
                    as="h1"
                    style={{ fontSize: "1.4rem" }}
                    textAlign="left"
                  >
                    NOTICIAS
                  </Header>
                </Grid.Column>
              </Grid.Row>
              {this.state.noticias.map((item, index) => (
                <Grid.Row key={index}>
                  <Grid.Column>
                    <Header
                      as="h4"
                      textAlign="left"
                      style={{ fontSize: "1.2rem" }}
                    >
                      {item.title}
                    </Header>

                    <p style={{ fontWeight: 500, margin: 0 }}>
                      {item.description}
                    </p>
                    <Button
                      as="a"
                      href={item.link}
                      target="_blank"
                      style={{
                        float: "right",
                        background: "transparent",
                        color: "#000",
                      }}
                    >
                      VER MÁS
                    </Button>
                  </Grid.Column>
                </Grid.Row>
              ))}
            </Grid>
          </Responsive>
          <Responsive {...Responsive.onlyTablet}>
            <Grid columns="equal">
              <Grid.Row>
                <Grid.Column>
                  <Header
                    as="h1"
                    style={{ fontSize: "1.4rem" }}
                    textAlign="left"
                  >
                    NOTICIAS
                  </Header>
                </Grid.Column>
              </Grid.Row>
              {this.state.noticias.map((item, index) => (
                <Grid.Row key={index}>
                  <Grid.Column>
                    <Header
                      as="h4"
                      textAlign="left"
                      style={{ fontSize: "1.2rem" }}
                    >
                      {item.title}
                    </Header>

                    <p style={{ fontWeight: 500, margin: 0 }}>
                      {item.description}
                    </p>
                    <Button
                      as="a"
                      href={item.link}
                      target="_blank"
                      style={{
                        float: "right",
                        background: "transparent",
                        color: "#000",
                      }}
                    >
                      VER MÁS
                    </Button>
                  </Grid.Column>
                </Grid.Row>
              ))}
            </Grid>
          </Responsive>
        </Container>
        { this.state.link_video != '' &&
          <Iframe
            url={this.state.link_video}
            width="100%"
            height="500px"
            id="videoId"
            display="initial"
            position="relative"
          />
        }
        <Responsive {...Responsive.onlyMobile}>
          <Container
            style={{
              paddingTop: 40,
              paddingBottom: 40,
            }}
          >
            <Header as="h1" style={{ fontSize: "1.4rem" }} textAlign="left">
              REGISTRARSE AL NEWSLETTER
            </Header>
            <Header
              as="h6"
              textAlign="left"
              style={{ marginBottom: 20, fontWeight: 500 }}
            >
              Suscríbete a nuestro newsletter y recibe notificaciones del mejor
              contenido de VendeTuNave.
            </Header>
            <Form id="form-newsletter" style={{ textAlign: "center" }}>
              <Form.Group widths="equal">
                <Form.Input
                  className="input-news-letter"
                  onChange={(e) =>
                    this.setState({ nombreNewsletter: e.target.value })
                  }
                  value={this.state.nombreNewsletter}
                  fluid
                  placeholder="Nombre"
                />
                <Form.Input
                  className="input-news-letter"
                  onChange={(e) =>
                    this.setState({ emailNewsletter: e.target.value })
                  }
                  value={this.state.emailNewsletter}
                  fluid
                  placeholder="E-mail"
                />
              </Form.Group>
              <Form.Checkbox
                onClick={this.handleCheckBoxNews}
                style={{ marginTop: 10 }}
                label="ACEPTAR TÉRMINOS Y CONDICIONES"
              />
              <Form.Button
                primary
                disabled={this.state.disabledNews}
                onClick={this.onNewsletter}
              >
                REGISTRARME
              </Form.Button>
            </Form>
          </Container>
        </Responsive>
        <Responsive {...Responsive.onlyTablet}>
          <Container
            style={{
              paddingTop: 40,
              paddingBottom: 40,
            }}
          >
            <Header as="h1" style={{ fontSize: "1.4rem" }} textAlign="left">
              REGISTRARSE AL NEWSLETTER
            </Header>
            <Header
              as="h6"
              textAlign="left"
              style={{ marginBottom: 20, fontWeight: 500 }}
            >
              Suscríbete a nuestro newsletter y recibe notificaciones del mejor
              contenido de VendeTuNave.
            </Header>
            <Form id="form-newsletter" style={{ textAlign: "center" }}>
              <Form.Group widths="equal">
                <Form.Input
                  className="input-news-letter"
                  onChange={(e) =>
                    this.setState({ nombreNewsletter: e.target.value })
                  }
                  value={this.state.nombreNewsletter}
                  fluid
                  placeholder="Nombre"
                />
                <Form.Input
                  className="input-news-letter"
                  onChange={(e) =>
                    this.setState({ emailNewsletter: e.target.value })
                  }
                  value={this.state.emailNewsletter}
                  fluid
                  placeholder="E-mail"
                />
              </Form.Group>
              <Form.Checkbox
                onClick={this.handleCheckBoxNews}
                style={{ marginTop: 10 }}
                label="ACEPTAR TÉRMINOS Y CONDICIONES"
              />
              <Form.Button
                primary
                disabled={this.state.disabledNews}
                onClick={this.onNewsletter}
              >
                REGISTRARME
              </Form.Button>
            </Form>
          </Container>
        </Responsive>

        <Responsive {...Responsive.onlyComputer}>
          <Container
            style={{
              paddingTop: 40,
              paddingBottom: 40,
              textAlign: "center",
              paddingLeft: 230,
              paddingRight: 230,
            }}
          >
            <Header as="h1" style={{ fontSize: "1.4rem" }}>
              REGISTRARSE AL NEWSLETTER
            </Header>
            <Header as="h6" style={{ marginBottom: 20, fontWeight: 500 }}>
              Suscríbete a nuestro newsletter y recibe notificaciones del mejor
              contenido de VendeTuNave.
            </Header>
            <Form style={{ textAlign: "center" }}>
              <Form.Field className="input-news-letter">
                <Input
                  onChange={(e) =>
                    this.setState({ nombreNewsletter: e.target.value })
                  }
                  value={this.state.nombreNewsletter}
                  fluid
                  placeholder="Nombre"
                />
              </Form.Field>
              <Form.Field className="input-news-letter">
                <Input
                  onChange={(e) =>
                    this.setState({ emailNewsletter: e.target.value })
                  }
                  value={this.state.emailNewsletter}
                  fluid
                  placeholder="E-mail"
                />
              </Form.Field>
              <Form.Checkbox
                onClick={this.handleCheckBoxNews}
                style={{ marginTop: 10 }}
                label="ACEPTAR TÉRMINOS Y CONDICIONES"
              />
              <Form.Button
                primary
                disabled={this.state.disabledNews}
                onClick={this.onNewsletter}
              >
                REGISTRARME
              </Form.Button>
            </Form>
          </Container>
        </Responsive>
        </div>
        </div>
        </>
    );
  }
}
