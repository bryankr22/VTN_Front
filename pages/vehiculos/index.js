import React, {useEffect, useState} from 'react'
import PublicLayout from '../../layouts/PublicLayout';
import SidebarVehiculos from '../../components/vehiculos/SidebarVehiculos';
import ListadoVehiculos from '../../components/vehiculos/ListadoVehiculos';

import SidebarMobile from '../../components/vehiculos/SidebarMobile';
import ListadoVehiculosMobile from '../../components/vehiculos/ListadoVehiculosMobile';

import { Grid, Responsive } from "semantic-ui-react";
import { useRouter } from 'next/router';

import axios from 'axios';
export default function index({ data }) {
    const router = useRouter();
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
                        border-bottom: 1px solid black;
                        border-left: none;
                        border-radius: 0;
                    }

                    #search-responsive::placeholder {
                        color: black !important;
                        text-align: center;
                        letter-spacing: 3px;
                        }
                        
                        #search-responsive + i {
                        color: black;
                        opacity: 1;
                        }
                `}
                </style>
                <SidebarMobile 
                params={router.query} 
                contadores={{...data.contadores, total_records: data.total_records}}
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
                contadores={{...data.contadores, total_records: data.total_records}}
                vehiculos={data.vehicles} />
                <ListadoVehiculosMobile 
                params={router.query} 
                vehiculos={data.vehicles}
                page={data.page}
                totalRecords={data.total_records} />
            </Responsive>
            <Responsive {...Responsive.onlyComputer}>
                <Grid style={{ paddingTop: 15 }}>
                    <SidebarVehiculos 
                    params={router.query} 
                    contadores={{...data.contadores, total_records: data.total_records}}
                    vehiculos={data.vehicles}
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
export async function getServerSideProps({query}) {
    const res = await axios.get('https://api.vendetunave.co/api/vehiculos', {
        params: {
            categoria: query.categoria,
            page: query.page,
            ubicacion: query.ubicacion,
            marca: query.marca,
            motor: query.combustible,
            modelo: query.modelo,
            ano: query.ano,
            anio: query.anio,
            estado: query.estado,
            precio: query.precio,
            kilometraje: query.kilometraje,
            orden: query.orden,
            promocion: query.promocion,
            permuta: query.permuta,
            blindaje: query.blindaje,
            transmision: query.transmision
        }
    });
    const data = await res.data;
    return {
        props: {
            data
        },
    }
}