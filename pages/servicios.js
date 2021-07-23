import React from 'react'
import PublicLayout from '../layouts/PublicLayout';
import ListaServicios from '../components/servicios/ListaServicios';
import { Container, Header, Select, Button, Responsive, Grid, Item, Segment, Pagination } from 'semantic-ui-react'
import axios from 'axios';
import { API_URL, servicios_api } from '../helpers/constants';
export default function servicios({servicios_res}) {
    
    return (
        <PublicLayout>
            <div>
            <Container style={{ paddingTop: 25 }} text>
                <Header as='h2' style={{ textTransform: 'uppercase' }}>RECOMENDACIONES DE SERVICIOS PARA TU CARRO</Header>
                <p style={{ textAlign: 'justify' }}>
                    En esta sección hemos escogido en las principales ciudades los mejores servicios para tú vehículos como: mecánica, tunning, latonería y pintura, polarizado, cambios de aceite, performance, porcelanizado, lavado, entre otros.
                </p>
                <style>
                    {`
                        .ui.text.container {
                            max-width: 900px!important;
                        }
                    `}
                </style>
                <Responsive {...Responsive.onlyComputer}>
                    <div className="ui two column grid" style={{ marginBottom: 15 }}>
                        <div className="row">
                            <div className="column">
                                <Select
                                    fluid
                                    placeholder='SELECCIONE LA CIUDAD'
                                    search
                                    options={[]}
                                />
                            </div>
                            <div className="column">
                                <Select
                                    fluid
                                    placeholder='SELECCIONE SERVICIO'
                                    search
                                    options={[]}
                                />
                            </div>
                        </div>
                    </div>
                </Responsive>
                <Responsive {...Responsive.onlyTablet}>
                    <Grid columns={1}>
                        <Grid.Row>
                            <Grid.Column style={{ marginBottom: 15 }}>
                                <Select
                                    fluid
                                    placeholder='SELECCIONE LA CIUDAD'
                                    search
                                />
                            </Grid.Column>
                            <Grid.Column style={{ marginBottom: 15 }}>
                                <Select
                                    fluid
                                    placeholder='SELECCIONE UN SERVICIO'
                                    search
                                />
                            </Grid.Column>
                        </Grid.Row>
                    </Grid>
                </Responsive>
                <Responsive {...Responsive.onlyMobile}>
                    <Grid columns={1}>
                        <Grid.Row>
                            <Grid.Column style={{ marginBottom: 15 }}>
                                <Select
                                    fluid
                                    placeholder='SELECCIONE LA CIUDAD'
                                    search
                                />
                            </Grid.Column>
                            <Grid.Column style={{ marginBottom: 15 }}>
                                <Select
                                    fluid
                                    placeholder='SELECCIONE UN SERVICIO'
                                    search
                                />
                            </Grid.Column>
                        </Grid.Row>
                    </Grid>
                </Responsive>
                <Responsive {...Responsive.onlyComputer}>
                    <ListaServicios 
                    servicios_res={servicios_res}/>
                </Responsive>
                <Responsive {...Responsive.onlyTablet}>
                    <ListaServicios 
                    servicios_res={servicios_res}/>
                </Responsive>
                <Responsive {...Responsive.onlyMobile}>
                    <ListaServicios 
                    servicios_res={servicios_res}/>
                </Responsive>
            </Container>
            </div>
        </PublicLayout>
    )
}
export async function getStaticProps() {
    const res = await axios.get(API_URL + servicios_api);
    const servicios_res = await res.data.servicios;
    return {
        props: {
            servicios_res
        }
    }
}
