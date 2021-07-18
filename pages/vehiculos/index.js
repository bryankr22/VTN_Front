import React, {useEffect, useState} from 'react'
import PublicLayout from '../../layouts/PublicLayout';
import SidebarVehiculos from '../../components/vehiculos/SidebarVehiculos';
import ListadoVehiculos from '../../components/vehiculos/ListadoVehiculos';
import { Grid, Responsive } from "semantic-ui-react";
import { useRouter } from 'next/router';

import axios from 'axios';
//import { API_URL, vehiculos } from '../../helpers/constants';

export default function index({ vehiculos, contadores }) {
    const router = useRouter();
    return (
        <PublicLayout>
            <Responsive {...Responsive.onlyComputer}>
                <Grid style={{ paddingTop: 15 }}>
                    <SidebarVehiculos 
                    params={router.query} 
                    contadores={contadores}
                    vehiculos={vehiculos}
                    />
                    <ListadoVehiculos 
                    params={router.query} 
                    vehiculos={vehiculos}
                    />
                </Grid>
            </Responsive>
        </PublicLayout>
    )
}
export async function getServerSideProps({query}) {
    const res = await axios.get('https://api.vendetunave.co/api/vehiculos', {
        params: {
            categoria: query.categoria
        }
    });
    const vehiculos = await res.data.vehicles;
    const contadores = await res.data.contadores;
    return {
        props: {
            vehiculos,
            contadores
        },
    }
}