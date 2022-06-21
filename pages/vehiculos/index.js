import React from 'react';
import Head from "next/head";
import { NextSeo } from "next-seo";
import axios from 'axios';
import { useSelector } from "react-redux";
import PublicLayout from '../../layouts/PublicLayout';
import SidebarVehiculos from '../../components/vehiculos/SidebarVehiculos';
import ListadoVehiculos from '../../components/vehiculos/ListadoVehiculos';

import Custom404 from '../../pages/404';

import SidebarMobile from '../../components/vehiculos/SidebarMobile';
import ListadoVehiculosMobile from '../../components/vehiculos/ListadoVehiculosMobile';

import { Grid, Responsive } from "semantic-ui-react";
import { useRouter } from 'next/router';

import { API_URL } from '../../helpers/constants';
import { dark, light } from '../../helpers/colors';

const CDN = "https://d3bmp4azzreq60.cloudfront.net/fit-in/300x200/"
const REPLACE = "https://vendetunave.s3.amazonaws.com/"

const getMetaUrl = (str = '') => `${CDN}vendetunave/images/usuarios/${str}`;

export default function index({ data }) {
    const router = useRouter();
    const darkMode = useSelector(({ darkMode }) => darkMode.status);
    const colorText = darkMode === light ? dark : light;

    if(router.query.vendedor && !data.vendedor) return <Custom404 />;

    return (
        <PublicLayout>
            <style>
                {`
                    .image > img {
                        object-fit: cover;
                    }
                    .ui.horizontal.list:not(.celled)>.item:first-child {
                        margin-left: 1em !important;
                    }
                    .ui.link.list .item, .ui.link.list .item a:not(.ui), .ui.link.list a.item {
                        margin-right: 20px !important;
                        margin: 0.8em 1em;
                    }
                    #grid-range-price > div {
                        padding: 0px !important;
                    }
                    #grid-range-km > div {
                        padding: 0px !important;
                    }

                    .image-compare > img {
                        width: 55px !important;
                        height: 55px !important;
                    }
                `}
            </style>
            <NextSeo
                title={data.vendedor !== null ? `Tienda ${data.vendedor.nombre} | VendeTuNave` : "VendeTuNave - Carros en Venta"}
                description={
                    data.vendedor ? 
                    `Carros / motos nuevos y usados en venta disponibles en ${data.vendedor.nombre} / ${data?.vehicles[0]?.title}${data.vehicles[1] ? ', ' + data?.vehicles[1]?.title : ''}${data.vehicles[2] ? ', ' + data?.vehicles[2]?.title : ''}.` : 
                    "Encuentra carros, camionetas y motos en venta desde 3 millones en Vende Tu Nave. Compara versiones, busca vehículos que permuten y mucho más."}
                openGraph={{
                    title: data.vendedor !== null ? `Tienda ${data.vendedor.nombre} | VendeTuNave` : "VendeTuNave - Carros en Venta",
                    images: data.vendedor !== null && data.vendedor.image != 0 && [
                        {
                            url: `${getMetaUrl(data.vendedor.image)}`,
                            alt: data?.vendedor?.nombre,
                            width: 300,
                            height: 200,
                        },
                    ],
                    locale: "es_ES",
                    type: "website",
                    description: data.vendedor !== null ?
                        `Carros / motos nuevos y usados en venta disponibles en ${data.vendedor.nombre} / ${data?.vehicles[0]?.title}${data.vehicles[1] ? ', ' + data?.vehicles[1]?.title : ''}${data.vehicles[2] ? ', ' + data?.vehicles[2]?.title : ''}.` :
                        "Encuentra carros, camionetas y motos en venta desde 3 millones en Vende Tu Nave. Compara versiones, busca vehículos que permuten y mucho más."
                }}
            />
            <Head>
                {data.vendedor && data.vendedor.image != 0 && 
                    <meta property="og:image:secure_url" content={`${getMetaUrl(data.vendedor.image)}`} />
                }
                <meta 
                    property="keywords" 
                    content={
                        data.vendedor ?
                            `vende tu nave, inventario, catalogo, vendedor ${data.vendedor.nombre}, tienda ${data.vendedor.nombre}` :
                            "carros usados, venta de carros, carros de segunda, compra y venta de motos, venta de carros usados, carros baratos, carros usados bogota, carros usados medellin"
                    }
                />
            </Head>
            <Responsive {...Responsive.onlyMobile}>
                <style>
                    {`
                    .ui.grid>.column:not(.row), .ui.grid>.row>.column {
                        padding-left: 1rem !important;
                        padding-right: 1rem !important;
                    }

                    #search-responsive {
                        border-top: none;
                        border-right: none;
                        border-bottom: 1px solid ${colorText} !important;
                        border-left: none;
                        border-radius: 0;
                        background-color: transparent;
                    }

                    #search-responsive::placeholder {
                        color: ${colorText} !important;
                        text-align: center;
                        letter-spacing: 3px;
                    }
                        
                    #search-responsive + i {
                        color: ${colorText};
                        opacity: 1;
                    }
                `}
                </style>
                <SidebarMobile
                    colorText={colorText}
                    params={router.query}
                    contadores={{ ...data.contadores, total_records: data.total_records }}
                    vendedor={data.vendedor}
                    vehiculos={data.vehicles} />
                <ListadoVehiculosMobile
                    params={router.query}
                    vehiculos={data.vehicles}
                    page={data.page}
                    totalRecords={data.total_records} />
            </Responsive>
            <Responsive {...Responsive.onlyTablet}>
                <SidebarMobile
                    params={router.query}
                    contadores={{ ...data.contadores, total_records: data.total_records }}
                    vendedor={data.vendedor}
                    vehiculos={data.vehicles} />
                <ListadoVehiculosMobile
                    params={router.query}
                    vehiculos={data.vehicles}
                    page={data.page}
                    totalRecords={data.total_records} />
            </Responsive>
            <Responsive {...Responsive.onlyComputer}>
                <Grid style={{ paddingTop: 15, backgroundColor: darkMode }}>
                    <SidebarVehiculos
                        params={router.query}
                        contadores={{ ...data.contadores, total_records: data.total_records }}
                        vehiculos={data.vehicles}
                        vendedor={data.vendedor}
                    />
                    <ListadoVehiculos
                        params={router.query}
                        vehiculos={data.vehicles}
                        page={data.page}
                        totalRecords={data.total_records}
                    />
                </Grid>
            </Responsive>
        </PublicLayout>
    )
}
export async function getServerSideProps({ query }) {
    const res = await axios.get(`${API_URL}/vehiculos`, {
        params: {
            vendedor: query.vendedor,
            placa: query.placa,
            categoria: query.categoria,
            page: query.page,
            ubicacion: query.ubicacion,
            ciudad: query.ciudad,
            marca: query.marca,
            motor: query.combustible,
            modelo: query.modelo,
            tipo: query.tipo,
            ano: query.ano,
            anio: query.anio,
            estado: query.estado,
            precio: query.precio,
            kilometraje: query.kilometraje,
            orden: query.orden,
            promocion: query.promocion,
            permuta: query.permuta,
            blindaje: query.blindaje,
            transmision: query.transmision,
            q: query.q
        }
    });
    const data = await res.data;
    return {
        props: {
            data
        },
    }
}