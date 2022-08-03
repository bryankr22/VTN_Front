import React, { useState } from "react";
import Head from "next/head";
import { NextSeo } from "next-seo";
import PublicLayout from "../layouts/PublicLayout";
import {
  Container,
  Header,
  Responsive,
  Segment,
  Button,
  Dimmer,
  Loader,
} from "semantic-ui-react";
import CompareVehiculo from "../components/comparadores/CompareVehiculo";
import CompareVehiculoMobile from "../components/comparadores/CompareVehiculoMobile";
import { useSelector, useDispatch } from "react-redux";
import { restartVehiculo } from "../store/comparadorSlice";

import { API_URL, download_vehiculo } from "../helpers/constants";
import axios from "axios";
export default function comparar_vehiculos() {
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const cleanSelector = () => {
    const message =
      "¿Estas seguro?, se quitaran todos los vehículos que estas comparando actualmente.";
    if (confirm(message)) {
      dispatch(restartVehiculo());
      localStorage.setItem("compareVehiculos", "1");
      localStorage.setItem("isComparing", "1");
      window.location.href = "/vehiculos";
    }
  };
  const compareList = useSelector(({ comparador }) => comparador.vehiculos);
  const downloadAction = () => {
    setLoading(true);
    var data = [];
    compareList.forEach((elemt) => {
      data.push(elemt.id);
    });
    axios
      .post(
        API_URL + download_vehiculo,
        { data },
        {
          headers: {
            Accept: "application/pdf",
          },
          responseType: "blob",
        }
      )
      .then((res) => {
        setLoading(false);
        const url = window.URL.createObjectURL(new Blob([res.data]));
        const link = document.createElement("a");
        link.href = url;
        let f = new Date();
        link.setAttribute(
          "download",
          `VendeTuNave_${
            f.getDate() + "-" + (f.getMonth() + 1) + "-" + f.getFullYear()
          }.pdf`
        );
        document.body.appendChild(link);
        link.click();
      })
      .catch((error) => {
      });
  };
  return (
    <PublicLayout>
      <NextSeo
          title="VendeTuNave - Comparar Carros"
          description="Compara todas las características de carros, camionetas y motos en Vende Tu Nave. Compara entre ellos y escoge la mejor opción."
          openGraph={{
              title: "VendeTuNave - Comparar Carros",
              locale: "es_ES",
              type: "website",
              description: "Compara todas las características de carros, camionetas y motos en Vende Tu Nave. Compara entre ellos y escoge la mejor opción."
          }}
      />
      <Head>
          <meta property="keywords" content="comparar carros, comparar motos, características de un carro, comparar moto, camionetas 4x4, pickup, 4x4" />
      </Head>
      <Dimmer style={{ position: "fixed" }} active={loading}>
        <Loader>Descargando...</Loader>
      </Dimmer>
      <Container
        style={{ paddingTop: 25, paddingLeft: 20, paddingRight: 20 }}
        fluid
      >
        <Header as="h1">Resultados de comparación</Header>
        <Responsive {...Responsive.onlyMobile}>
          <Container
            style={{
              paddingLeft: 0,
              paddingRight: 0,
              overflowX: "auto",
              overflowY: "hidden",
            }}
            fluid
          >
            <CompareVehiculoMobile vehiclesCompare={[]} />
          </Container>
        </Responsive>
        <Responsive {...Responsive.onlyTablet}>
          <Container style={{ paddingLeft: 0, paddingRight: 0 }} fluid>
            <CompareVehiculoMobile vehiclesCompare={[]} />
          </Container>
        </Responsive>
        <Responsive {...Responsive.onlyComputer}>
          <CompareVehiculo vehiclesCompare={[]} />
        </Responsive>
        <Segment vertical style={{ textAlign: "center" }}>
          {compareList.length > 0 ? (
            <Button
              onClick={() => downloadAction()}
              style={{ marginTop: 15 }}
              primary
            >
              Descargar PDF
            </Button>
          ) : null}
          <br />
          <Button onClick={() => cleanSelector()} style={{ marginTop: 15 }}>
            Comparar más versiones
          </Button>
        </Segment>
      </Container>
    </PublicLayout>
  );
}
