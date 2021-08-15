import React from 'react'
import PublicLayout from '../layouts/PublicLayout'
import { Container, Header, Responsive, Segment, Button } from 'semantic-ui-react';
import CompareVehiculo from '../components/comparadores/CompareVehiculo'
import CompareVehiculoMobile from '../components/comparadores/CompareVehiculoMobile'
import { useSelector, useDispatch } from 'react-redux';
import { restartVehiculo } from '../store/comparadorSlice';
export default function comparar_vehiculos() {
    const dispatch = useDispatch();
    const cleanSelector = () => {
        dispatch(restartVehiculo());
        localStorage.setItem("compareVehiculos", "1")
        window.location.href = '/vehiculos';
    }
    return (
        <PublicLayout>
            <Container style={{ paddingTop: 25, paddingLeft: 20, paddingRight: 20 }} fluid>
                <Header as='h1'>Resultados de comparación</Header>
                <Responsive {...Responsive.onlyMobile}>
                    <Container style={{ paddingLeft: 0, paddingRight: 0, overflowX: 'auto', overflowY: 'hidden' }} fluid>
                        <CompareVehiculoMobile vehiclesCompare={[]} />
                    </Container>
                </Responsive>
                <Responsive {...Responsive.onlyTablet}>
                    <Container style={{ paddingLeft: 0, paddingRight: 0 }} fluid>
                        <CompareVehiculoMobile vehiclesCompare={[]} />
                    </Container>
                </Responsive>
                <Responsive {...Responsive.onlyComputer}>
                    <CompareVehiculo vehiclesCompare={[]} />
                </Responsive>
                <Segment vertical style={{ textAlign: 'center' }}>
                    <Button style={{ marginTop: 15 }} primary>Descargar PDF</Button>
                    <br />
                    <Button 
                    onClick={()=> cleanSelector()}
                    style={{ marginTop: 15 }} >Comparar más versiones</Button>
                </Segment>
            </Container>
        </PublicLayout>
    )
}
