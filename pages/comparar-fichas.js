import React from 'react'
import PublicLayout from '../layouts/PublicLayout'
import { Container, Header, Responsive, Segment, Button } from 'semantic-ui-react';
import CompareFicha from '../components/comparadores/CompareFicha'
export default function comparar_fichas() {
    return (
        <PublicLayout>
            <Container style={{ paddingTop: 25, paddingLeft: 20, paddingRight: 20 }} fluid>
                <Header as='h1'>Resultados de comparación</Header>
                <Responsive {...Responsive.onlyMobile}>
                    <Container style={{ paddingLeft: 0, paddingRight: 0, overflowX: 'auto', overflowY: 'hidden' }} fluid>
                        <CompareFicha vehiclesCompare={[]} />
                    </Container>
                </Responsive>
                <Responsive {...Responsive.onlyTablet}>
                    <Container style={{ paddingLeft: 0, paddingRight: 0 }} fluid>
                        <CompareFicha vehiclesCompare={[]} />
                    </Container>
                </Responsive>
                <Responsive {...Responsive.onlyComputer}>
                    <CompareFicha vehiclesCompare={[]} />
                </Responsive>
                <Segment vertical style={{ textAlign: 'center' }}>
                    <Button style={{ marginTop: 15 }} primary>Descargar PDF</Button>
                    <br />
                    <Button style={{ marginTop: 15 }} >Comparar más versiones</Button>
                </Segment>
            </Container>
        </PublicLayout>
    )
}
