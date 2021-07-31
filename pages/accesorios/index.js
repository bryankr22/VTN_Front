import React, {useEffect, useState} from 'react'
import PublicLayout from '../../layouts/PublicLayout';
import SidebarAccesorios from '../../components/vehiculos/SidebarAccesorios';
import ListadoAccesorios from '../../components/vehiculos/ListadoAccesorios';

import SidebarMobile from '../../components/vehiculos/SidebarMobile';
import ListadoAccesoriosMobile from '../../components/vehiculos/ListadoAccesoriosMobile';

import { Grid, Responsive } from "semantic-ui-react";
import { useRouter } from 'next/router';

import axios from 'axios';
export default function index({ data }) {
    const router = useRouter();
    return (
        <PublicLayout>
            <Responsive {...Responsive.onlyMobile}>
                <SidebarMobile vehiculos={data.vehicles} />
                <ListadoAccesoriosMobile vehiculos={data.vehicles} />
            </Responsive>
            <Responsive {...Responsive.onlyTablet}>
                <SidebarMobile vehiculos={data.vehicles} />
                <ListadoAccesoriosMobile vehiculos={data.vehicles} />
            </Responsive>
            <Responsive {...Responsive.onlyComputer}>
                <Grid style={{ paddingTop: 15 }}>
                    <SidebarAccesorios 
                    params={router.query} 
                    contadores={data.contadores}
                    vehiculos={data.vehicles}
                    />
                    <ListadoAccesorios 
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
    const res = await axios.get('https://api.vendetunave.co/api/accesorios', {
        params: {
            page: query.page,
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