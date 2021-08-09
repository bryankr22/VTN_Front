import React, { Fragment } from 'react'
import { useRouter } from 'next/router'
import PublicLayout from '../../../layouts/PublicLayout';
import TableDescription from '../../../components/fichatecnica/TableDescription';
import CarruselHome from '../../../components/carrusel/CarruselHome';
import axios from 'axios';
import { Responsive, Icon, Breadcrumb, Grid, Header, Container, Button } from "semantic-ui-react";
import { useCookies } from "react-cookie"

import { useSelector, useDispatch } from 'react-redux';
import { addFicha } from '../../../store/comparadorSlice';
export default function detalle({ data }) {
    const dispatch = useDispatch();
    const compareList = useSelector(({ comparador }) => comparador.fichas);
    const [cookies, setCookie] = useCookies(['vtn_token']);
    const isOnStorage = (item) => {
        return compareList.some((element) => element.id === item.id);
    }
    const addComparar = (item) => {
        if(compareList.length < 3){
            dispatch(addFicha(item))
        }else{
            //setCompare('0');
        }
        window.location.href = '/ficha-tecnica';
        return;
    }
    return (
        <PublicLayout>
            <div style={{ display: 'inline-block', float: 'right', marginRight: 40, fontSize: 18, color: '#5c5c5c', marginBottom: 10 }}>
                <Icon name="eye" style={{ marginRight: 5 }} />
                <p style={{ display: 'inline' }}>{new Intl.NumberFormat("de-DE").format(data.views)}</p>
            </div>
            {data.imagenes.length > 0 && (
                <div style={{ marginTop: 20 }}>
                    <Responsive minWidth={100} maxWidth={320}>
                        <style>
                            {`
                            .slider-wrapper {
                                height: 28vh !important;
                            }
                            `}
                        </style>
                        <CarruselHome
                            seccion="desc"
                            showThumbs
                            data={data.imagenes}
                            description={''}
                        />
                    </Responsive>
                    <Responsive {...Responsive.onlyMobile}>
                        <style>
                            {`
                            .slider-wrapper {
                                height: 28vh !important;
                            }
                            `}
                        </style>
                        <CarruselHome
                            seccion="desc"
                            showThumbs
                            data={data.imagenes}
                            description={''}
                        />
                    </Responsive>
                    <Responsive {...Responsive.onlyTablet}>
                        <style>
                            {`
                                .slider-wrapper {
                                    height: 28vh !important;
                                }
                            `}
                        </style>
                        <CarruselHome
                            seccion="desc"
                            showThumbs
                            data={data.imagenes}
                            description={''}
                        />
                    </Responsive>
                    <Responsive {...Responsive.onlyComputer}>
                        <style>
                            {`
                            .slider-wrapper {
                                height: 60vh !important;
                            }
                            `}
                        </style>
                        <Container>
                            <CarruselHome
                                seccion="desc"
                                showThumbs
                                data={data.imagenes}
                                description={''}
                            />
                        </Container>
                    </Responsive>
                    <Header as="h1" textAlign="left" style={{ marginTop: 25, marginBottom: 10, marginLeft: 10 }}>
                        {data.vehicle.title}
                    </Header>
                    <Responsive {...Responsive.onlyMobile}>
                        <TableDescription data={data} />
                    </Responsive>
                    <Responsive {...Responsive.onlyTablet}>
                        <TableDescription data={data} />
                    </Responsive>
                    <Responsive {...Responsive.onlyComputer} style={{display: 'content'}}>
                        <TableDescription data={data} />
                    </Responsive>
                    {cookies.vtn_token &&
                        <div style={{ margin: '20px auto', textAlign: 'center' }}>
                            <Button 
                            onClick={(e) => { e.preventDefault(); }} 
                            primary style={{ borderRadius: 20, padding: '11px 40px' }}>Agregar a favoritos</Button>
                        </div>
                    }
                    { compareList.length < 3 && !isOnStorage(data.vehicle) &&
                        <div style={{ margin: '20px auto', textAlign: 'center' }}>
                            <Button 
                            onClick={(e) => { e.preventDefault();addComparar(data.vehicle) }} 
                            primary style={{ borderRadius: 20, padding: '11px 40px' }}>Comparar</Button>
                        </div> 
                    }
                </div>
            )}

        </PublicLayout>
    )
}
export async function getServerSideProps({ params }) {
    const res = await axios.get('https://api.vendetunave.co/api/ficha_tecnica/' + params.slug);
    const data = await res.data;
    //const imagenes = await res.data.imagenes;
    return {
        props: {
            data
        },
    }
}