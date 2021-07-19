import React from 'react'
import PublicLayout from '../layouts/PublicLayout';
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
                <style>
                    {`
                        .ui.text.container {
                            max-width: 900px!important;
                        }
                    `}
                </style>
                <Grid columns={3}>
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
                {/**<Responsive {...Responsive.onlyComputer}>
                    
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
                            <Grid.Column>
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
                            <Grid.Column>
                                <Select
                                    fluid
                                    search
                                />
                            </Grid.Column>
                        </Grid.Row>
                    </Grid>
                </Responsive>**/}

                <Item.Group divided>
                    {(concesionarios_res).map((item) =>
                    <Item>
                        <Item.Image size='small' src={item.image} />
                        <Item.Content>
                            <Item.Header>{item.name}</Item.Header>
                            <Item.Meta>{item.description}</Item.Meta>
                            <Item.Meta>{item.address}</Item.Meta>
                            <Item.Meta>Tel: {item.phone}</Item.Meta>
                            <Item.Extra style={{ float: 'right', marginTop: '-11%', width: '20%' }}>
                                <Button
                                secondary
                                floated='right'
                                >
                                    VER
                                </Button>
                            </Item.Extra>
                        </Item.Content>
                    </Item>
                    )}
                </Item.Group>
                {/**Math.ceil((this.state.servicesTotal) / 10) > 1 &&
                    <Container fluid style={{ textAlign: 'center', margin: 25 }}>
                        <Pagination
                            pointing
                            secondary
                            boundaryRange={0}
                            activePage={this.state.activePage}
                            ellipsisItem={null}
                            firstItem={null}
                            lastItem={null}
                            siblingRange={2}
                            onPageChange={this.handlePaginationChange}
                            totalPages={Math.ceil((this.state.servicesTotal) / 10)}
                        />
                    </Container>
                **/}
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