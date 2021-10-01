import React, {Fragment, useState} from 'react'
import Link from 'next/link';
import PublicLayout from '../../layouts/PublicLayout';
import { Container, Header, Grid, Input, Item, Label, Button, Responsive, Pagination } from 'semantic-ui-react';
import axios from 'axios';
import { API_URL, comunidad_api } from '../../helpers/constants';
export default function index({q, page, preguntas, tags, total_records}) {
    const [query, setQuery] = useState(q);

    const insertParam = (key, value) => {
        key = encodeURIComponent(key);
        value = encodeURIComponent(value);
        var kvp = document.location.search.substr(1).split('&');
        let i=0;
        for(; i<kvp.length; i++){
            if (kvp[i].startsWith(key + '=')) {
                let pair = kvp[i].split('=');
                pair[1] = value;
                kvp[i] = pair.join('=');
                break;
            }
        }
        if(i >= kvp.length){
            kvp[kvp.length] = [key,value].join('=');
        }
        let params = kvp.join('&');
        if (key === 'q') params = params.replace(`page=${page}`, "page=1")
        document.location.search = params;
    }
    const handlePaginationChange = (e, { activePage }) => {
        insertParam('page', activePage);
    }

    const handleKeyDown = (e) => {
        if (e.keyCode === 13) {
            handleSearch();
        }      
    };

    const handleSearch = () => {
        insertParam('q', query);
    }

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
                <Responsive {...Responsive.onlyMobile}>
                    <Grid columns={1}>
                        <Grid.Row>
                            <Grid.Column>
                                <Button color='blue' fluid className="mt-2">
                                    <Link href={'/crear-pregunta'}>
                                        <a style={{ textDecoration: 'none', color: 'white' }}>
                                            PREGUNTALE A LA COMUNIDAD
                                        </a>
                                    </Link>
                                </Button>
                            </Grid.Column>
                            <Grid.Column>
                                <span className="text-center d-block mt-4 mb-4">
                                    &oacute; busca lo que necesites aquí:
                                </span>
                            </Grid.Column>
                            <Grid.Column>
                                <Input 
                                style={{ width: '100%' }} 
                                onChange={(e, {value})=> setQuery(value)}
                                onKeyDown={(e) => handleKeyDown(e)}
                                action={{ icon: 'search', onClick: () => handleSearch() }}
                                value={query}
                                placeholder='Buscar...' />
                            </Grid.Column>
                        </Grid.Row>
                    </Grid>
                </Responsive>
                <Responsive {...Responsive.onlyTablet}>
                    <Grid columns={1}>
                        <Grid.Row>
                            <Grid.Column>
                                <Button color='blue' fluid>
                                    <Link href={'/crear-pregunta'}>
                                        <a style={{ textDecoration: 'none', color: 'white' }}>
                                            PREGUNTALE A LA COMUNIDAD
                                        </a>
                                    </Link>
                                </Button>
                            </Grid.Column>
                            <Grid.Column>
                                <span className="text-center d-block mt-4 mb-4">
                                    &oacute; busca lo que necesites aquí:
                                </span>
                            </Grid.Column>
                            <Grid.Column>
                                <Input
                                style={{ width: '100%' }} 
                                onChange={(e, {value})=> setQuery(value)}
                                onKeyDown={(e) => handleKeyDown(e)}
                                action={{ icon: 'search', onClick: () => handleSearch() }}
                                value={query}
                                placeholder='Buscar...' />
                            </Grid.Column>
                        </Grid.Row>
                    </Grid>
                </Responsive>
                <Responsive {...Responsive.onlyComputer}>
                    <Grid columns={2}>
                        <Grid.Row>
                            <Grid.Column>
                                <Input 
                                style={{ width: '100%' }} 
                                onChange={(e, {value})=> setQuery(value)}
                                onKeyDown={(e) => handleKeyDown(e)}
                                action={{ icon: 'search', onClick: () => handleSearch() }}
                                value={query}
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
                </Responsive>
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
                                <a href={'/comunidad/detalle/'+ (item.titulo.split(' ').join('-')).split('?').join('') + '-' + item.id}>
                                    {item.titulo}
                                </a>
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
                                    cssFloat: 'right', 
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
                {Math.ceil((total_records) / 10) > 1 &&
                    <Container fluid style={{ textAlign: 'center', margin: 25 }}>
                        <Pagination
                            pointing
                            secondary
                            boundaryRange={0}
                            activePage={parseInt(page)}
                            ellipsisItem={null}
                            firstItem={null}
                            lastItem={null}
                            siblingRange={2}
                            onPageChange={handlePaginationChange}
                            totalPages={Math.ceil((total_records) / 10)}
                        />
                    </Container>
                }
            </Container>
        </PublicLayout>
    )
}
export async function getServerSideProps({query}) {
    const res = await axios.get(API_URL + comunidad_api, {
        params: {
            ...query
        }
    });
    const q = await res.data.q;
    const page = await res.data.page;
    const preguntas = await res.data.preguntas;
    const tags = await res.data.tags;
    const total_records = await res.data.total_records;
    return {
        props: {
            q,
            page,
            preguntas,
            tags,
            total_records
        }
    }
}
