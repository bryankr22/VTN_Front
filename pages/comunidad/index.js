import React from 'react'
import Link from 'next/link';
import PublicLayout from '../../layouts/PublicLayout';
import { Container, Header, Grid, Input, Item, Label, Button, Responsive } from 'semantic-ui-react';
export default function index() {
    return (
        <PublicLayout>
            <Container style={{ paddingTop: 25 }} text>
                <Header as='h2' style={{ textTransform: 'uppercase' }}>Comunidad - Vende Tu Nave</Header>
                <p style={{ textAlign: 'justify' }}>
                    Nuestro compromiso con nuestra comunidad transciende de una simple plataforma digital de comercio de vehículos, 
                    es por esto que hemos creado esta sección en donde podrás compartir con los usuarios tus inquietudes, opiniones, 
                    recomendaciones, comentarios y todo lo relacionado con el mundo automotor, y a las cuales serán tratadas por la misma comunidad 
                    o por VENDETUNAVE.
                </p>
                {/**<Responsive {...Responsive.onlyMobile}>
                <Grid columns={1}>
                    <Grid.Row>
                        <Grid.Column style={{ marginBottom: 15 }}>
                            <Button color='blue' floated='right' fluid>
                                <Link href={'/crear-pregunta'} style={{ textDecoration: 'none', color: 'white' }}>
                                    PREGUNTALE A LA COMUNIDAD
                                </Link>
                            </Button>
                        </Grid.Column>
                        <Grid.Column style={{ marginBottom: 15, textAlign: 'center' }}>
                            o<br />
                            busca lo que necesites aquí:
                        </Grid.Column>
                        <Grid.Column>
                        <Input placeholder='Buscar...' />
                        </Grid.Column>
                    </Grid.Row>
                </Grid>
                </Responsive>
                <Responsive {...Responsive.onlyComputer}>
                </Responsive>**/}
                <Grid columns={2}>
                    <Grid.Row>
                        <Grid.Column>
                            <Input 
                            style={{ width: '100%' }} 
                            action={{ icon: 'search', onClick: () => console.log("") }}
                            placeholder='Buscar...' />
                        </Grid.Column>
                        <Grid.Column>
                            <Button color='blue' floated='right'>
                                <Link href={'/crear-pregunta'}>
                                    <a style={{ textDecoration: 'none', color: 'white' }}>
                                        PREGUNTALE A LA COMUNIDAD
                                    </a>
                                </Link>
                            </Button>
                        </Grid.Column>
                    </Grid.Row>
                </Grid>
                <Item.Group>
                    <Item
                    style={{
                        paddingTop: '15px',
                        paddingBottom: '15px',
                        borderBottom: '1px solid black',
                        borderTop: '1px solid black',
                        marginBottom: '0px',
                        marginTop: '-1px'
                    }}
                    >
                        <div 
                            style={{ 
                                fontWeight: 'bold', 
                                fontSize: '16px', 
                                textAlign: 'center',
                                color: '#2185d0'
                            }} 
                            className="ui tiny image">
                            <Header as='h1' style={{ color: '#2185d0' }}>DATA</Header> Respuestas
                        </div>

                        <Item.Content>
                            <Item.Header as='a'>
                                <Link href={'/pregunta'} style={{ color: 'black' }}>
                                    TITULO
                                </Link>
                            </Item.Header>
                            <Item.Meta style={{ marginTop: '20px' }}>
                                <Label as='a' tag>TAG 1</Label>
                                <Label as='a' tag>TAG 2</Label>
                            </Item.Meta>
                        </Item.Content>
                    </Item>
                </Item.Group>
                {/**Math.ceil((this.state.questionsTotal) / 10) > 1 &&
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
                            totalPages={Math.ceil((this.state.questionsTotal) / 10)}
                        />
                    </Container>
                **/}
            </Container>
        </PublicLayout>
    )
}
