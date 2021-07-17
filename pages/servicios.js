import React from 'react'
import PublicLayout from '../layouts/PublicLayout';
import { Container, Header, Select, Button, Responsive, Grid, Item } from 'semantic-ui-react'
export default function servicios() {
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
                <Grid columns={2}>
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
                    <Item>
                        <Item.Image size='small' src={'https://via.placeholder.com/150'} />
                        <Item.Content>
                            <Item.Header>Titulo</Item.Header>
                            <Item.Meta>DATA1</Item.Meta>
                            <Item.Meta>DATA1</Item.Meta>
                            <Item.Meta>Tel: 000 0000 000</Item.Meta>
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
                    <Item>
                        <Item.Image size='small' src={'https://via.placeholder.com/150'} />
                        <Item.Content>
                            <Item.Header>Titulo</Item.Header>
                            <Item.Meta>DATA1</Item.Meta>
                            <Item.Meta>DATA1</Item.Meta>
                            <Item.Meta>Tel: 000 0000 000</Item.Meta>
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
