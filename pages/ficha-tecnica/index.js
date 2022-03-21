import React from "react";
import Head from "next/head";
import { useSelector } from "react-redux";
import { NextSeo } from "next-seo";
import PublicLayout from "../../layouts/PublicLayout";
import SidebarFichas from "../../components/vehiculos/SidebarFichas";
import ListadoFichas from "../../components/vehiculos/ListadoFichas";
import SidebarMobile from "../../components/vehiculos/SidebarMobile";
import ListadoFichasMobile from "../../components/vehiculos/ListadoFichasMobile";

import { Grid, Responsive } from "semantic-ui-react";
import { useRouter } from "next/router";

import axios from "axios";
import { API_URL } from "../../helpers/constants";
import { light } from "../../helpers/colors";

export default function index({ data }) {
  const router = useRouter();
  const darkMode = useSelector(({ darkMode }) => darkMode.status);
  const colorText = darkMode === light ? undefined : light;
  return (
    <PublicLayout>
      <style>
        {`
            #grid-range-price > div {
                padding: 0px !important;
            }
        `}
      </style>
      <NextSeo
        title="Características de Carros 2022 | Ficha Técnica | VendeTuNave"
        description="Conoce las características y equipamiento de carros nuevos: Chevrolet, Renault, Mazda, Toyota y muchos más último modelo."
        openGraph={{
          title: "Características de Carros 2022 | Ficha Técnica | VendeTuNave",
          locale: "es_ES",
          type: "website",
          description: "Conoce las características y equipamiento de carros nuevos: Chevrolet, Renault, Mazda, Toyota y muchos más último modelo."
        }}
      />
      <Head>
        <meta property="keywords" content="Autonomía, ficha técnica, rendimiento, torque, velocidad máxima, latin ncap" />
      </Head>
      <Responsive {...Responsive.onlyMobile}>
        <SidebarMobile
          colorText={colorText}
          isFicha
          params={router.query}
          contadores={{
            ...data.contadores,
            total_records: data.total_records,
          }}
          vehiculos={data.vehicles}
        />
        <ListadoFichasMobile
          params={router.query}
          vehiculos={data.vehicles}
          page={data.page}
          totalRecords={data.total_records}
        />
      </Responsive>
      <Responsive {...Responsive.onlyTablet}>
        <SidebarMobile
          isFicha
          params={router.query}
          contadores={{
            ...data.contadores,
            total_records: data.total_records,
          }}
          vehiculos={data.vehicles}
        />
        <ListadoFichasMobile
          params={router.query}
          vehiculos={data.vehicles}
          page={data.page}
          totalRecords={data.total_records}
        />
      </Responsive>
      <Responsive {...Responsive.onlyComputer}>
        <Grid style={{ paddingTop: 15 }}>
          <SidebarFichas
            params={router.query}
            contadores={{
              ...data.contadores,
              total_records: data.total_records,
            }}
            vehiculos={data.vehicles}
          />
          <ListadoFichas
            params={router.query}
            vehiculos={data.vehicles}
            page={data.page}
            totalRecords={data.total_records}
          />
        </Grid>
      </Responsive>
    </PublicLayout>
  );
}
export async function getServerSideProps({ query }) {
  const res = await axios.get(`${API_URL}/fichas_tecnicas`, {
    params: {
      ...query,
    },
  });
  const data = await res.data;
  return {
    props: {
      data,
    },
  };
}
