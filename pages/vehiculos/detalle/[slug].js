import React, { Fragment, useEffect, useState } from "react";
import { useRouter } from "next/router";
import PublicLayout from "../../../layouts/PublicLayout";
import SliderPrincipal from "../../../components/vehiculo/SliderPrincipal";
import SidebarDetalle from "../../../components/vehiculo/SidebarDetalle";
import SidebarDetalleDesk from "../../../components/vehiculo/SidebarDetalleDesk";
import TableCaracteristicasDesk from "../../../components/vehiculo/TableCaracteristicasDesk";
import CarruselHome from "../../../components/carrusel/CarruselHome";
import VehicleCarousel from '../../../components/VehicleCarousel'
import CarruselRelacionados from "../../../components/carrusel/CarruselRelacionados";
import { validateAuth } from "../../../helpers/auth";
import jwt from "jsonwebtoken";
import axios from "axios";
import {
  Responsive,
  Icon,
  Breadcrumb,
  Grid,
  Header,
  Container,
  Input,
} from "semantic-ui-react";

import Head from "next/head";
import { NextSeo } from "next-seo";
import { API_URL } from "../../../helpers/constants";

const CDN = "https://d3bmp4azzreq60.cloudfront.net/fit-in/300x200/"
const REPLACE = "https://vendetunave.s3.amazonaws.com/"

const getMetaUrl = (str = '') => {
  return str.replace(REPLACE, CDN)
}

const normalize = (function () {
  var from = "ÃÀÁÄÂÈÉËÊÌÍÏÎÒÓÖÔÙÚÜÛãàáäâèéëêìíïîòóöôùúüûÑñÇç",
    to = "AAAAAEEEEIIIIOOOOUUUUaaaaaeeeeiiiioooouuuunncc",
    mapping = {};

  for (var i = 0, j = from.length; i < j; i++)
    mapping[from.charAt(i)] = to.charAt(i);

  return function (str) {
    var ret = [];
    for (var i = 0, j = str.length; i < j; i++) {
      var c = str.charAt(i);
      if (mapping.hasOwnProperty(str.charAt(i))) ret.push(mapping[c]);
      else ret.push(c);
    }
    return ret.join("").split(" ").join("-").split("%").join("").split("?").join("").split("/").join("");
  };
})();

export default function detalle({ data }) {
  const { imagenes } = data;
  const router = useRouter();
  const [query, setQuery] = useState();
  const handleKeyDown = (e) => {
    if ((!e || e.keyCode === 13) && query) {
      router.push("/vehiculos?q=" + query);
    }
  };

  return (
    <>
      <NextSeo
        title={`${data.vehiculo.title}`}
        description={`${data.vehiculo.title} en venta en ${data.vehiculo.ciudadLabel} ${data.vehiculo.departamentoLabel} por ${data.vehiculo.precio}. Compra o vende tu vehículo gratis en Vende Tu Nave`}
        openGraph={{
          images: [
            {
              url: `${getMetaUrl(imagenes?.[0]?.url)}${imagenes?.[0]?.extension}`,
              alt: data.vehiculo.title,
              width: 300,
              height: 200,
            },
          ],
          url: `https://vendetunave.co/vehiculos/detalle/${normalize(data.vehiculo.title)}-${data.vehiculo.id}`,
          title: data.vehiculo.title,
          locale: "es_ES",
          type: "website",
          description: `${data.vehiculo.title} en venta en ${data.vehiculo.ciudadLabel} ${data.vehiculo.departamentoLabel} por ${data.vehiculo.precio}. Compra o vende tu vehículo gratis en Vende Tu Nave`,
          site_name: "VendeTuNave - Vehiculo",
        }}
      />
      <Head>
        <meta property="og:image:secure_url" content={`${getMetaUrl(imagenes?.[0]?.url)}${imagenes?.[0]?.extension}`} />
        <meta property="keywords" content={`${data.vehiculo.title}, ${data.vehiculo.modeloLabel}, ${data.vehiculo.marcaLabel}, ${data.vehiculo.title} en venta, carros usados, carro en venta, vehículo.`} />
      </Head>
      <PublicLayout>
        <style>
          {`
                .image > img {
                    object-fit: cover;
                }
                .slider-wrapper {
                    height: 65vh !important;
                }
                .thumb > img {
                    height: 80px !important;
                }
                .carousel .thumbs-wrapper {
                    margin-left: 0 !important;
                    margin: 5px 20px 5px 0 !important;
                }
                .carousel .thumbs {
                    z-index: 1000;
                    padding: 0 !important;
                    margin: 0;
                }
                .carousel .thumb {
                    width: 100px !important;
                    margin-right: 0 !important;
                    padding: 0 !important;
                }
                #cont-inf {
                    margin-left: -1em !important;
                    margin-right: 0em !important;
                }
                .carousel .slider-wrapper.axis-horizontal .slider {
                    height: 100% !important;
                }
            
                .carousel .slide {
                    background: #fff;
                    height: 100%;
                }
                .carousel.carousel-slider .control-arrow {
                    z-index: 1000;
                }

                .carousel .control-dots {
                    z-index: 1000;
                }

                .dimmer .carousel .slide {
                    background: transparent !important;
                    height: 100%;
                }
                .ui.grid{
                    margin: unset !important;
                }
                .slider-wrapper, .slide {
                    height: calc(55vh - 75px) !important;
                }
                #desc-desk  h3 {
                  font-size: 1rem !important;
                }
            `}
        </style>

        <Responsive maxWidth={768}>
          <Input
            action={{
              icon: "search",
              style: {
                background: "transparent",
                color: "black",
                borderBottom: "1px solid black",
                height: 47,
                paddingTop: 10,
              },
              onClick: () => handleKeyDown(),
            }}
            onChange={(e, { value }) => setQuery(value)}
            onKeyDown={(e) => handleKeyDown(e)}
            fluid
            id="search-responsive"
            style={{ margin: "10px 20px 0 20px" }}
            className="search-input"
            placeholder="¿Qué estas buscando?"
          />
        </Responsive>
        <div
          style={{
            margin: 10,
            padding: "15px 15px 5px 15px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Breadcrumb
            style={{
              background: "transparent",
              padding: 15,
              position: "absolute",
              zIndex: 1000,
            }}
          >
            <Breadcrumb.Section link href={"/vehiculos/"}>
              {data.vehiculo.tipoLabel}
            </Breadcrumb.Section>
            <Breadcrumb.Divider icon="right angle" />

            {data.vehiculo.tipoMotoLabel && (
              <Fragment>
                <Breadcrumb.Section link href={"/vehiculos/"}>
                  {data.vehiculo.tipoMotoLabel}
                </Breadcrumb.Section>
                <Breadcrumb.Divider icon="right angle" />
              </Fragment>
            )}
            <Breadcrumb.Section link href={"/vehiculos/"}>
              {data.vehiculo.marcaLabel}
            </Breadcrumb.Section>
            <Breadcrumb.Divider icon="right angle" />
            <Breadcrumb.Section link href={"/vehiculos/"}>
              {data.vehiculo.modeloLabel}
            </Breadcrumb.Section>
          </Breadcrumb>
          <Responsive
            {...Responsive.onlyComputer}
            style={{ display: "inline", marginLeft: "auto" }}
          >
            <div
              style={{
                display: "inline-block",
                cssFloat: "right",
                fontSize: 18,
                color: "#5c5c5c"
              }}
            >
              <Icon name="eye" style={{ marginRight: 5 }} />
              <p style={{ display: "inline" }}>
                {new Intl.NumberFormat("de-DE").format(data.vehiculo.views)}
              </p>
            </div>
          </Responsive>
        </div>

        <Responsive maxWidth={1023}>
          <Container style={{ marginTop: 20 }}>
            <VehicleCarousel images={data.imagenes} alt={data.vehiculo.title} mobile />
            <SidebarDetalle
              vehicleFav={data.vehicleFav}
              vehiculo={data.vehiculo}
              id={normalize(data.vehiculo.title) + '-' + data.vehiculo.id}
            />
            <Grid columns={1} divided="vertically">
              <Grid.Row style={{ marginTop: 30 }}>
                <div className="p-3">
                  <Grid>
                    <Grid.Row columns={2} style={{ paddingBottom: 8 }}>
                      <Grid.Column>
                        <Header as="h5">
                          Publicado hace:
                          {" " + data.diasPublicado} días
                        </Header>
                      </Grid.Column>
                      <Grid.Column>
                        <Header as="h5">
                          {" " + data.vehiculo.ciudadLabel},
                          {" " + data.vehiculo.departamentoLabel}
                        </Header>
                      </Grid.Column>
                    </Grid.Row>
                    <Grid.Row columns={2} style={{ paddingBottom: 8 }}>
                      <Grid.Column>
                        <Header as="h5">
                          Teléfono:
                          {" " + data.vehiculo.contacto}
                        </Header>
                      </Grid.Column>
                    </Grid.Row>
                  </Grid>
                </div>
              </Grid.Row>
              <Grid.Row className="p-3">
                <Header as="h5" style={{ marginTop: 20 }}>
                  CARACTERÍSTICAS
                </Header>
                <TableCaracteristicasDesk vehiculo={data.vehiculo} />
              </Grid.Row>
              <Grid.Row>
                <div className="p-3">
                  <Header as="h5" icon>
                    DESCRIPCIÓN
                  </Header>
                  <p style={{ fontSize: 14 }}>{data.vehiculo.descripcion}</p>
                </div>
              </Grid.Row>
            </Grid>
            {data.vehiculosRelacionados.length > 0 && (
              <Container fluid id="cont-inf">
                <Header as="h4" style={{ marginTop: 20, marginLeft: 15 }}>
                  PRODUCTOS RELACIONADOS
                </Header>
                <CarruselRelacionados
                  type="products"
                  data={data.vehiculosRelacionados}
                  numberCards={1}
                />
              </Container>
            )}
          </Container>
        </Responsive>
        {/* <Responsive {...Responsive.onlyMobile}>
          <Container style={{ marginTop: 20 }}>
            <VehicleCarousel images={data.imagenes} alt={data.vehiculo.title} mobile />
            <SidebarDetalle
              vehicleFav={data.vehicleFav}
              vehiculo={data.vehiculo}
              id={normalize(data.vehiculo.title) + '-' + data.vehiculo.id}
            />
            <Grid columns={1} divided="vertically">
              <Grid.Row style={{ marginTop: 30 }}>
                <div className="p-3">
                  <Grid>
                    <Grid.Row columns={2} style={{ paddingBottom: 8 }}>
                      <Grid.Column>
                        <Header as="h5">
                          Publicado hace:
                          {" " + data.diasPublicado} días
                        </Header>
                      </Grid.Column>
                      <Grid.Column>
                        <Header as="h5">
                          {" " + data.vehiculo.ciudadLabel},
                          {" " + data.vehiculo.departamentoLabel}
                        </Header>
                      </Grid.Column>
                    </Grid.Row>
                    <Grid.Row columns={2} style={{ paddingBottom: 8 }}>
                      <Grid.Column>
                        <Header as="h5">
                          Teléfono:
                          {" " + data.vehiculo.contacto}
                        </Header>
                      </Grid.Column>
                    </Grid.Row>
                  </Grid>
                </div>
              </Grid.Row>
              <Grid.Row className="p-3">
                <Header as="h5" style={{ marginTop: 20 }}>
                  CARACTERÍSTICAS
                </Header>
                <TableCaracteristicasDesk vehiculo={data.vehiculo} />
              </Grid.Row>
              <Grid.Row>
                <div className="p-3">
                  <Header as="h5" icon>
                    DESCRIPCIÓN
                  </Header>
                  <p style={{ fontSize: 14 }}>{data.vehiculo.descripcion}</p>
                </div>
              </Grid.Row>
            </Grid>
            {data.vehiculosRelacionados.length > 0 && (
              <Container fluid id="cont-inf">
                <Header as="h4" style={{ marginTop: 20, marginLeft: 15 }}>
                  PRODUCTOS RELACIONADOS
                </Header>
                <CarruselRelacionados
                  type="products"
                  data={data.vehiculosRelacionados}
                  numberCards={1}
                />
              </Container>
            )}
          </Container>
        </Responsive> */}
        {/* <Responsive maxWidth={319}>
          <Container style={{ marginTop: 20 }}>
            <VehicleCarousel images={data.imagenes} alt={data.vehiculo.title} mobile/>
            <SidebarDetalle
              vehicleFav={data.vehicleFav}
              vehiculo={data.vehiculo}
              id={normalize(data.vehiculo.title) + '-' + data.vehiculo.id}
            />
            <Grid columns={1} divided="vertically">
              <Grid.Row style={{ marginTop: 30 }}>
                <div className="p-3">
                  <Grid>
                    <Grid.Row columns={2} style={{ paddingBottom: 8 }}>
                      <Grid.Column>
                        <Header as="h5">
                          Publicado hace:
                          {" " + data.diasPublicado} días
                        </Header>
                      </Grid.Column>
                      <Grid.Column>
                        <Header as="h5">
                          {" " + data.vehiculo.ciudadLabel},
                          {" " + data.vehiculo.departamentoLabel}
                        </Header>
                      </Grid.Column>
                    </Grid.Row>
                    <Grid.Row columns={2} style={{ paddingBottom: 8 }}>
                      <Grid.Column>
                        <Header as="h5">
                          Teléfono:
                          {" " + data.vehiculo.contacto}
                        </Header>
                      </Grid.Column>
                    </Grid.Row>
                  </Grid>
                </div>
              </Grid.Row>
              <Grid.Row className="p-3">
                <Header as="h3" style={{ marginTop: 20 }}>
                  CARACTERÍSTICAS
                </Header>
                <TableCaracteristicasDesk vehiculo={data.vehiculo} />
              </Grid.Row>
              <Grid.Row>
                <div className="p-3">
                  <Header as="h3" icon>
                    DESCRIPCIÓN
                  </Header>
                  <p style={{ fontSize: 14 }}>{data.vehiculo.descripcion}</p>
                </div>
              </Grid.Row>
            </Grid>
            {data.vehiculosRelacionados.length > 0 && (
              <Container fluid id="cont-inf">
                <Header as="h4" style={{ marginTop: 20, marginLeft: 15 }}>
                  PRODUCTOS RELACIONADOS
                </Header>
                <CarruselRelacionados
                  type="products"
                  data={data.vehiculosRelacionados}
                  numberCards={1}
                />
              </Container>
            )}
          </Container>
        </Responsive> */}
        <Responsive {...Responsive.onlyComputer}>
          <Grid columns="equal">
            <Grid.Column width={10} style={{ padding: "30px 10px 15px 30px" }}>
              <VehicleCarousel images={data.imagenes} alt={data.vehiculo.title} />
              <Header as="h3" style={{ marginTop: 20 }}>
                CARACTERÍSTICAS
              </Header>
              <TableCaracteristicasDesk vehiculo={data.vehiculo} />
              <hr />
              <Header as="h3" icon>
                DESCRIPCIÓN
              </Header>
              <p style={{ fontSize: 14 }}>{data.vehiculo.descripcion}</p>
              <hr />
            </Grid.Column>
            <SidebarDetalleDesk
              diasPublicado={data.diasPublicado}
              vehicleFav={data.vehicleFav}
              vehiculo={data.vehiculo}
              id={normalize(data.vehiculo.title) + '-' + data.vehiculo.id}
            />
          </Grid>
          {data.vehiculosRelacionados.length > 0 && (
            <Container fluid id="cont-inf">
              <Header as="h4" style={{ marginTop: 20, marginLeft: 15 }}>
                PRODUCTOS RELACIONADOS
              </Header>
              <CarruselRelacionados
                type="products"
                data={data.vehiculosRelacionados}
                numberCards={4}
              />
            </Container>
          )}
        </Responsive>
      </PublicLayout>
    </>
  );
}
export async function getServerSideProps(context) {
  const auth = validateAuth(context);
  var config = {};
  if (auth.vtn_token) {
    const decoded = jwt.verify(auth.vtn_token, "vendetunave2021");
    config = {
      headers: { Authorization: `Bearer ${decoded.token_server.access_token}` },
    };
  }

  const idNormalize = normalize(context.params.slug);
  const res = await axios.get(`${API_URL}/vehiculo/${idNormalize}`,
    config
  );
  const data = await res.data;
  return {
    props: {
      data,
    },
  };
}
