import React from "react";
import Head from "next/head";
import { useSelector } from 'react-redux';
import { NextSeo } from "next-seo";
import PublicLayout from "../layouts/PublicLayout";
import ListaConcesionarios from "../components/servicios/ListaConcesionarios";
import {
  Container,
  Header,
  Select,
  Responsive,
  Grid,
} from "semantic-ui-react";
import axios from "axios";
//import { API_URL, concesionarios_api } from '../helpers/constants';
import { useRouter } from "next/router";
import { light } from "../helpers/colors";
export default function concesionarios({
  params,
  data,
  tiposServices,
  ciudades,
}) {
  const router = useRouter();
  const tipoVehiculo = [
    { key: 0, value: 0, text: "TODOS LOS TIPOS" },
    { key: 1, value: "NUEVO", text: "NUEVO" },
    { key: 2, value: "USADO", text: "USADO" },
  ];
  const insertParam = (key, value) => {
    key = encodeURIComponent(key);
    value = encodeURIComponent(value);
    var kvp = document.location.search.substr(1).split("&");
    let i = 0;
    for (; i < kvp.length; i++) {
      if (kvp[i].startsWith(key + "=")) {
        let pair = kvp[i].split("=");
        pair[1] = value;
        kvp[i] = pair.join("=");
        break;
      }
    }
    if (i >= kvp.length) {
      kvp[kvp.length] = [key, value].join("=");
    }
    let params = kvp.join("&");
    document.location.search = params;
  };
  const onChangeFilter = (input, value) => {
    insertParam(input, value);
  };

  const darkMode = useSelector(({ darkMode }) => darkMode.status);
  const colorText = darkMode === light ? undefined : light;

  return (
    <PublicLayout>
      <NextSeo
        title="Concesionarios Bogotá, Medellín, Cali y más"
        description="Conoce todos los concesionarios de carros o moto Renault, Mazda, Chevrolet, Kia, Ford y más, cercanos a ti en Vende Tu Nave."
        openGraph={{
          title: "Concesionarios Bogotá, Medellín, Cali y más",
          locale: "es_ES",
          type: "website",
          description: "Conoce todos los concesionarios de carros o moto Renault, Mazda, Chevrolet, Kia, Ford y más, cercanos a ti en Vende Tu Nave."
        }}
      />
      <Head>
        <meta property="keywords" content="concesionario, concesionario Chevrolet, compra y venta de carros, concesionarios usados, concesionario Renault, venta de carros usados, concesionario Mazda" />
      </Head>
      <div>
        <Container style={{ paddingTop: 25 }} text>
          <Header as="h1" style={{ textTransform: "uppercase", color: colorText }}>
            Concesionarios
          </Header>
          <p style={{ textAlign: "justify", color: colorText }}>
            En esta sección hemos escogido en las principales ciudades los
            mejores servicios para tú vehículos como: mecánica, tunning,
            latonería y pintura, polarizado, cambios de aceite, performance,
            porcelanizado, lavado, entre otros.
          </p>
          <Responsive {...Responsive.onlyComputer}>
            <style>
              {`
                            .ui.text.container {
                                max-width: 900px!important;
                            }
                        `}
            </style>
            <Grid columns={3} style={{ marginBottom: 15 }}>
              <Grid.Row>
                <Grid.Column>
                  <Select
                    onChange={(e, { value }) => onChangeFilter("ciudad", value)}
                    fluid
                    search
                    options={ciudades}
                    defaultValue={
                      router.query.ciudad
                        ? router.query.ciudad
                        : ciudades[0].value
                    }
                  />
                </Grid.Column>
                <Grid.Column>
                  <Select
                    fluid
                    search
                    options={tipoVehiculo}
                    onChange={(e, { value }) => onChangeFilter("tipo", value)}
                    defaultValue={
                      router.query.tipo
                        ? router.query.tipo
                        : tipoVehiculo[0].value
                    }
                  />
                </Grid.Column>
                <Grid.Column>
                  {router.query.tipo !== "USADO" && (
                    <Select
                      fluid
                      search
                      options={tiposServices}
                      onChange={(e, { value }) => onChangeFilter("marca", value)}
                      defaultValue={
                        router.query.marca
                          ? router.query.marca
                          : tiposServices[0].value
                      }
                    />)}
                </Grid.Column>
              </Grid.Row>
            </Grid>
          </Responsive>
          <Responsive {...Responsive.onlyMobile}>
            <Grid columns={1}>
              <Grid.Row>
                <Grid.Column style={{ marginBottom: 15 }}>
                  <Select
                    fluid
                    search
                    options={ciudades}
                    onChange={(e, { value }) => onChangeFilter("ciudad", value)}
                    defaultValue={
                      router.query.ciudad
                        ? router.query.ciudad
                        : ciudades[0].value
                    }
                  />
                </Grid.Column>
                <Grid.Column style={{ marginBottom: 15 }}>
                  <Select
                    fluid
                    search
                    options={tipoVehiculo}
                    onChange={(e, { value }) => onChangeFilter("tipo", value)}
                    defaultValue={
                      router.query.tipo
                        ? router.query.tipo
                        : tipoVehiculo[0].value
                    }
                  />
                </Grid.Column>
                <Grid.Column style={{ marginBottom: 15 }}>
                  {router.query.tipo !== "USADO" && (
                    <Select
                      fluid
                      search
                      options={tiposServices}
                      onChange={(e, { value }) => onChangeFilter("marca", value)}
                      defaultValue={
                        router.query.marca
                          ? router.query.marca
                          : tiposServices[0].value
                      }
                    />
                  )}
                </Grid.Column>
              </Grid.Row>
            </Grid>
          </Responsive>
          <Responsive {...Responsive.onlyTablet}>
            <Grid columns={1}>
              <Grid.Row>
                <Grid.Column style={{ marginBottom: 15 }}>
                  <Select
                    fluid
                    search
                    options={ciudades}
                    onChange={(e, { value }) => onChangeFilter("ciudad", value)}
                    defaultValue={
                      router.query.ciudad
                        ? router.query.ciudad
                        : ciudades[0].value
                    }
                  />
                </Grid.Column>
                <Grid.Column style={{ marginBottom: 15 }}>
                  <Select
                    fluid
                    search
                    options={tipoVehiculo}
                    onChange={(e, { value }) => onChangeFilter("tipo", value)}
                    defaultValue={
                      router.query.tipo
                        ? router.query.tipo
                        : tipoVehiculo[0].value
                    }
                  />
                </Grid.Column>
                <Grid.Column style={{ marginBottom: 15 }}>
                  {router.query.tipo !== "USADO" && (
                    <Select
                      fluid
                      search
                      options={tiposServices}
                      onChange={(e, { value }) =>
                        onChangeFilter("marca", value)
                      }
                      defaultValue={
                        router.query.marca
                          ? router.query.marca
                          : tiposServices[0].value
                      }
                    />
                  )}
                </Grid.Column>
              </Grid.Row>
            </Grid>
          </Responsive>
          <ListaConcesionarios concesionarios_res={data.servicios} />
        </Container>
      </div>
    </PublicLayout>
  );
}
export async function getServerSideProps({ query }) {
  const res = await axios.get("https://api.vendetunave.co/api/concesionarios", {
    params: {
      ciudad: query.ciudad,
      tipo: query.tipo,
      marca: query.marca,
    },
  });
  const data = await res.data;
  const tiposServices = [{ key: 0, value: 0, text: "TODAS LAS MARCAS" }];
  const ciudades = [{ key: 0, value: 0, text: "TODAS LAS CIUDADES" }];
  data.tiposServicios.map((item) => {
    tiposServices.push({ key: item.id, value: item.nombre, text: item.nombre });
  });
  data.ciudades.map((item) => {
    ciudades.push({ key: item.id, value: item.nombre, text: item.nombre });
  });
  return {
    props: {
      data,
      tiposServices,
      ciudades,
    },
  };
}
