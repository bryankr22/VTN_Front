import React from 'react'
import PublicLayout from '../layouts/PublicLayout';
import ListaConcesionarios from '../components/servicios/ListaConcesionarios';
import { Container, Header, Select, Button, Responsive, Grid, Item } from 'semantic-ui-react'
import axios from 'axios';
import { API_URL, concesionarios_api } from '../helpers/constants';
export default function concesionarios({concesionarios_res}) {
    return (
        <PublicLayout>
            <div>
            <Container style={{ paddingTop: 25 }} text>
                <Header as='h2' style={{ textTransform: 'uppercase' }}>Concesionarios</Header>
                <p style={{ textAlign: 'justify' }}>
                    En esta sección hemos escogido en las principales ciudades
                    los mejores servicios para tú vehículos como:
                    mecánica, tunning, latonería y pintura, polarizado, cambios de aceite, performance, porcelanizado, lavado, entre otros.
                </p>
                <Responsive {...Responsive.onlyComputer}>
                    <style>
                        {`
                            .ui.text.container {
                                max-width: 900px!important;
                            }
                        `}
                    </style>
                    <Grid columns={3} style={{ marginBottom: 15 }}>
                        <Grid.Row>
                            <Grid.Column>
                                <Select
                                    fluid
                                    placeholder='SELECCIONE LA CIUDAD'
                                    search
                                    options={[]}
                                />
                            </Grid.Column>
                            <Grid.Column>
                                <Select
                                    fluid
                                    placeholder='SELECCIONE SERVICIO'
                                    search
                                    options={[]}
                                />
                            </Grid.Column>
                            <Grid.Column>
                                <Select
                                    fluid
                                    placeholder='SELECCIONE LA CIUDAD'
                                    search
                                    options={[]}
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
                            <Grid.Column style={{ marginBottom: 15 }}>
                                <Select
                                    fluid
                                    search
                                />
                            </Grid.Column>
                        </Grid.Row>
                    </Grid>
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
                            <Grid.Column style={{ marginBottom: 15 }}>
                                <Select
                                    fluid
                                    search
                                />
                            </Grid.Column>
                        </Grid.Row>
                    </Grid>
                </Responsive>

                <Responsive {...Responsive.onlyComputer}>
                    <ListaConcesionarios 
                    concesionarios_res={concesionarios_res}/>
                </Responsive>
                <Responsive {...Responsive.onlyTablet}>
                    <ListaConcesionarios 
                    concesionarios_res={concesionarios_res}/>
                </Responsive>
                <Responsive {...Responsive.onlyMobile}>
                    <ListaConcesionarios 
                    concesionarios_res={concesionarios_res}/>
                </Responsive>
            </Container>
            </div>
        </PublicLayout>
    )
}
export async function getStaticProps() {
    const res = await axios.get(API_URL + concesionarios_api);
    const concesionarios_res = await res.data.servicios;
    return {
        props: {
            concesionarios_res
        }
    }
}