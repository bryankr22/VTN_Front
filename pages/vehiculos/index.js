import React, { useState } from 'react';
import Head from "next/head";
import { NextSeo } from "next-seo";
import axios from 'axios';
import { useSelector } from "react-redux";
import PublicLayout from '../../layouts/PublicLayout';
import SidebarVehiculos from '../../components/vehiculos/SidebarVehiculos';
import ListadoVehiculos from '../../components/vehiculos/ListadoVehiculos';

import SidebarMobile from '../../components/vehiculos/SidebarMobile';
import ListadoVehiculosMobile from '../../components/vehiculos/ListadoVehiculosMobile';

import { Grid, Responsive, Button } from "semantic-ui-react";
import { useRouter } from 'next/router';

import { API_URL } from '../../helpers/constants';
import { dark, light } from '../../helpers/colors';

const CDN = "https://d3bmp4azzreq60.cloudfront.net/fit-in/300x200/"
const REPLACE = "https://vendetunave.s3.amazonaws.com/"

const getMetaUrl = (str = '') => `${CDN}vendetunave/images/usuarios/${str}`;

export default function index({ data }) {
    const router = useRouter();
    const darkMode = useSelector(({ darkMode }) => darkMode.status);
    const [listView, setListView] = useState(data.filtros.view === "listView");
    const colorText = darkMode === light ? dark : light;
    const metaVendedor = !!data.vendedor;
    const buttonColor = darkMode === dark ? light : '#484848';
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

    return (
        <>
            <NextSeo
                title={metaVendedor === true ? `Tienda ${data.vendedor?.nombre} | VendeTuNave` : "VendeTuNave - Carros en Venta"}
                description={
                    metaVendedor === true ?
                        `Carros / motos nuevos y usados en venta disponibles en ${data.vendedor?.nombre} / ${data?.vehicles[0]?.title}${data.vehicles[1] ? ', ' + data?.vehicles[1]?.title : ''}${data.vehicles[2] ? ', ' + data?.vehicles[2]?.title : ''}.` :
                        "Encuentra carros, camionetas y motos en venta desde 3 millones en Vende Tu Nave. Compara versiones, busca vehículos que permuten y mucho más."}
                openGraph={{
                    images: [
                        {
                            url: metaVendedor === true && data.vendedor?.image != 0 ? `${getMetaUrl(data.vendedor?.image)}` : "https://vendetunave.co/images/logo_VTN.png",
                            alt: metaVendedor === true ? data?.vendedor?.nombre : "VendeTuNave",
                            width: 300,
                            height: 200,
                        },
                    ],
                    url: `https://vendetunave.co${router.asPath}`,
                    title: metaVendedor === true ? `Tienda ${data.vendedor?.nombre} | VendeTuNave` : "VendeTuNave - Carros en Venta",
                    locale: "es_ES",
                    type: "website",
                    description: metaVendedor === true ?
                        `Carros / motos nuevos y usados en venta disponibles en ${data.vendedor?.nombre} / ${data?.vehicles[0]?.title}${data.vehicles[1] ? ', ' + data?.vehicles[1]?.title : ''}${data.vehicles[2] ? ', ' + data?.vehicles[2]?.title : ''}.` :
                        "Encuentra carros, camionetas y motos en venta desde 3 millones en Vende Tu Nave. Compara versiones, busca vehículos que permuten y mucho más.",
                    site_name: "VendeTuNave - Vehiculo",
                }}
            />
            <Head>
                <meta property="og:image:secure_url" content={metaVendedor === true && data.vendedor?.image != 0 ? `${getMetaUrl(data.vendedor?.image)}` : "https://vendetunave.co/images/logo_VTN.png"} />
                <meta
                    property="keywords"
                    content={
                        metaVendedor === true ?
                            `vende tu nave, inventario, catalogo, vendedor ${data.vendedor?.nombre}, tienda ${data.vendedor?.nombre}` :
                            "carros usados, venta de carros, carros de segunda, compra y venta de motos, venta de carros usados, carros baratos, carros usados bogota, carros usados medellin"
                    }
                />
            </Head>
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
                    <Button
                        onClick={() => insertParam('view', !listView ? 'listView' : 'gridView')}
                        style={{
                            position: 'fixed',
                            right: -6,
                            zIndex: 10,
                            cursor: 'pointer',
                            top: '38%',
                            backgroundColor: buttonColor,
                            color: darkMode
                        }}
                        size='small'
                        icon={!listView ? 'list' : 'grid layout'}
                    />
                    <SidebarMobile
                        colorText={colorText}
                        params={router.query}
                        contadores={{ ...data.contadores, total_records: data.total_records }}
                        vendedor={data.vendedor}
                        vehiculos={data.vehicles} />
                    <ListadoVehiculosMobile
                        params={router.query}
                        listView={listView}
                        vehiculos={data.vehicles}
                        page={data.page}
                        totalRecords={data.total_records} />
                </Responsive>
                <Responsive {...Responsive.onlyTablet}>
                    <Button
                        onClick={() => insertParam('view', !listView ? 'listView' : 'gridView')}
                        style={{
                            position: 'fixed',
                            right: -6,
                            zIndex: 10,
                            cursor: 'pointer',
                            top: '38%',
                            backgroundColor: buttonColor,
                            color: darkMode
                        }}
                        size='small'
                        icon={!listView ? 'list' : 'grid layout'}
                    />
                    <SidebarMobile
                        params={router.query}
                        contadores={{ ...data.contadores, total_records: data.total_records }}
                        vendedor={data.vendedor}
                        vehiculos={data.vehicles} />
                    <ListadoVehiculosMobile
                        params={router.query}
                        listView={listView}
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
                            listView={listView}
                            vehiculos={data.vehicles}
                            page={data.page}
                            totalRecords={data.total_records}
                        />
                    </Grid>
                </Responsive>
            </PublicLayout>
        </>
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
            peritaje: query.peritaje,
            transmision: query.transmision,
            view: query.view,
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