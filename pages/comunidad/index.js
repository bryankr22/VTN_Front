import React, {Fragment} from 'react'
import Link from 'next/link';
import PublicLayout from '../../layouts/PublicLayout';
import { Container, Header, Grid, Input, Item, Label, Button, Responsive } from 'semantic-ui-react';
import axios from 'axios';
import { API_URL, comunidad_api } from '../../helpers/constants';
export default function index({preguntas, tags}) {
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
                    { (preguntas).map((item) =>
                    <Item
                    key={item.id}
                    id={'pregunta_' + item.id}
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
                            <Header as='h1' style={{ color: '#2185d0' }}>{item.repuestas}</Header> Respuestas
                        </div>

                        <Item.Content>
                            <Item.Header as='a'>
                                <Link href={'/comunidad/detalle/'+ (item.titulo.split(' ').join('-')).split('?').join('') + '-' + item.id} style={{ color: 'black' }}>
                                    {item.titulo}
                                </Link>
                            </Item.Header>
                            <Item.Meta style={{ marginTop: '20px' }}>
                                {(tags).map((itemTags) =>
                                    {
                                        if(itemTags.pregunta_id == item.id){
                                            return <Label as='a' tag>{itemTags.tag}</Label>;
                                        }
                                    }
                                )}
                                <div 
                                style={{ 
                                    display: 'inline-block', 
                                    float: 'right', 
                                    color: 'black',
                                    margin: '10px 0'
                                }}>
                                    { item.repuestas != 0 &&
                                        <Fragment>Última respuesta: {item.ult_respuesta}</Fragment>
                                    }
                                </div>
                            </Item.Meta>
                        </Item.Content>
                    </Item>
                    )}
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
export async function getStaticProps() {
    const res = await axios.get(API_URL + comunidad_api);
    const preguntas = await res.data.preguntas;
    const tags = await res.data.tags;
    return {
        props: {
            preguntas,
            tags
        }
    }
}
