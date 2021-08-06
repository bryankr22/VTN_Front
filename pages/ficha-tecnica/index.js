import React, {useEffect, useState} from 'react'
import dynamic from 'next/dynamic'

const PublicLayout = dynamic(() => import('../../layouts/PublicLayout'));
const SidebarFichas = dynamic(() => import('../../components/vehiculos/SidebarFichas'));
const ListadoFichas = dynamic(() => import('../../components/vehiculos/ListadoFichas'));
const SidebarMobile = dynamic(() => import('../../components/vehiculos/SidebarMobile'));
const ListadoFichasMobile = dynamic(() => import('../../components/vehiculos/ListadoFichasMobile'));

import { Grid, Responsive } from "semantic-ui-react";
import { useRouter } from 'next/router';

import axios from 'axios';
export default function index({ data }) {
    const router = useRouter();
    return (
        <PublicLayout>
            <Responsive {...Responsive.onlyMobile}>
                <SidebarMobile vehiculos={data.vehicles} />
                <ListadoFichasMobile vehiculos={data.vehicles} />
            </Responsive>
            <Responsive {...Responsive.onlyTablet}>
                <SidebarMobile vehiculos={data.vehicles} />
                <ListadoFichasMobile vehiculos={data.vehicles} />
            </Responsive>
            <Responsive {...Responsive.onlyComputer}>
                <Grid style={{ paddingTop: 15 }}>
                    <SidebarFichas 
                    params={router.query} 
                    contadores={{...data.contadores, total_records: data.total_records}}
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
    )
}
export async function getServerSideProps({query}) {
    const res = await axios.get('https://api.vendetunave.co/api/fichas_tecnicas', {
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