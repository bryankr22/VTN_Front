import React from 'react'
import PublicLayout from '../../layouts/PublicLayout';
import SidebarVehiculos from '../../components/vehiculos/SidebarVehiculos';
import ListadoVehiculos from '../../components/vehiculos/ListadoVehiculos';
import { Grid, Responsive } from "semantic-ui-react";
export default function index() {
    return (
        <PublicLayout>
            <Responsive {...Responsive.onlyComputer}>
                <Grid style={{ paddingTop: 15 }}>
                    <SidebarVehiculos />
                    <ListadoVehiculos />
                </Grid>
            </Responsive>
        </PublicLayout>
    )
}
