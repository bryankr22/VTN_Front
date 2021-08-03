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
            <Responsive {...Responsive.onlyMobile}>
                <SidebarMobile vehiculos={data.vehicles} />
                <ListadoVehiculosMobile vehiculos={data.vehicles} />
            </Responsive>
            <Responsive {...Responsive.onlyTablet}>
                <SidebarMobile vehiculos={data.vehicles} />
                <ListadoVehiculosMobile vehiculos={data.vehicles} />
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
            combustible: query.combustible,
            modelo: query.modelo,
            ano: query.ano,
            estado: query.estado,
            precio: query.precio,
            kilometraje: query.kilometraje,
            orden: query.orden
        }
    });
    const data = await res.data;
    return {
        props: {
            data
        },
    }
}