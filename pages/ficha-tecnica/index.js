import React, {useEffect, useState} from 'react'
import PublicLayout from '../../layouts/PublicLayout';
import SidebarFichas from '../../components/vehiculos/SidebarFichas';
import ListadoFichas from '../../components/vehiculos/ListadoFichas';
import SidebarMobile from '../../components/vehiculos/SidebarMobile';
import ListadoFichasMobile from '../../components/vehiculos/ListadoFichasMobile';

import { Grid, Responsive } from "semantic-ui-react";
import { useRouter } from 'next/router';

import axios from 'axios';
export default function index({ data }) {
    const router = useRouter();
    return (
        <PublicLayout>
            <Responsive {...Responsive.onlyMobile}>
                <SidebarMobile
                isFicha 
                params={router.query} 
                contadores={{...data.contadores, total_records: data.total_records}}
                vehiculos={data.vehicles} />
                <ListadoFichasMobile vehiculos={data.vehicles} />
            </Responsive>
            <Responsive {...Responsive.onlyTablet}>
                <SidebarMobile 
                isFicha
                params={router.query} 
                contadores={{...data.contadores, total_records: data.total_records}}
                vehiculos={data.vehicles} />
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
            ...query
        }
    });
    const data = await res.data;
    return {
        props: {
            data
        },
    }
}