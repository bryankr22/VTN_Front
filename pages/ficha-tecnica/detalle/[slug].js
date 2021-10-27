import React, { useState } from 'react';
import Head from "next/head";
import { NextSeo } from "next-seo";
import { useRouter } from 'next/router'
import PublicLayout from '../../../layouts/PublicLayout';
import TableDescription from '../../../components/fichatecnica/TableDescription';
import CarruselHome from '../../../components/carrusel/CarruselHome';
import CarruselRelacionados from '../../../components/carrusel/CarruselRelacionados';
import axios from 'axios';
import { Responsive, Icon, Header, Container, Button, Dimmer, Loader } from "semantic-ui-react";
import { useCookies } from "react-cookie"

import { useSelector, useDispatch } from 'react-redux';
import { addFicha } from '../../../store/comparadorSlice';
import { AUTH_URL, favoritos_add } from '../../../helpers/constants';
import jwt from 'jsonwebtoken';
export default function detalle({ data }) {
    const [loading, setLoading] = useState(false);
    const dispatch = useDispatch();
    const router = useRouter();
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
        localStorage.setItem("compareFichatecnica", "1")
        window.location.href = '/ficha-tecnica';
        return;
    }
    const addFavoritos = () => {
        setLoading(true);
        const cookie = cookies.vtn_token;
        const decoded = jwt.verify(cookie, 'vendetunave2021');
        const config = {
            headers: { Authorization: `Bearer ${decoded.token_server.access_token}` }
        };
        const user_id = decoded.user.id;
        const dataSend = {
            idUser: user_id,
            idVehicle: data.vehicle.id
        };
        axios.post(AUTH_URL + favoritos_add, dataSend, config).then((res) => {
            setLoading(false);
            router.push('/usuario/favoritos');
        })
    }
    return (
        <PublicLayout>
            <NextSeo
                title={data.vehicle.title}
                description={`Conoce todas las características, equipamiento y novedades del nuevo ${data.vehicle.title} como seguridad, autonomía, potencia y mucho más.`}
                openGraph={{
                    title: data.vehicle.title,
                    locale: "es_ES",
                    type: "website",
                    description: `Conoce todas las características, equipamiento y novedades del nuevo ${data.vehicle.title} como seguridad, autonomía, potencia y mucho más.`
                }}
            />
            <Head>
                <meta property="keywords" content={`Ficha técnica, ${data.vehicle.marcaLabel}, ${data.vehicle.marcaLabel} ${data.vehicle.modeloLabel}, ${data.vehicle.title}, ${data.vehicle.modeloLabel}`} />
            </Head>
            <Dimmer style={{ position: "fixed" }} active={loading}>
                <Loader>Agregando a favoritos...</Loader>
            </Dimmer>  
            <style>
            {`
                .image > img {
                    object-fit: cover;
                }
                .thumb > img {
                    height: 80px !important;
                }
                .carousel .thumbs-wrapper {
                    margin-left: 0 !important;
                    margin: 5px 20px 5px 0 !important;
                }
                .carousel .thumbs {
                    z-index: 1000;
                    padding: 0 !important;
                    margin: 0;
                }
                .carousel .thumb {
                    width: 100px !important;
                    margin-right: 0 !important;
                    padding: 0 !important;
                }
                #cont-inf {
                    margin-left: -1em !important;
                    margin-right: 0em !important;
                }
                .carousel .slider-wrapper.axis-horizontal .slider {
                    height: 100% !important;
                }
            
                .carousel .slide {
                    background: #fff;
                    height: 100%;
                }
                .carousel.carousel-slider .control-arrow {
                    z-index: 1000;
                }

                .carousel .control-dots {
                    z-index: 1000;
                }

                .dimmer .carousel .slide {
                    background: transparent !important;
                    height: 100%;
                }
            `}
            </style>
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
                            onClick={(e) => { addFavoritos(); }} 
                            primary 
                            style={{ borderRadius: 20, padding: '11px 40px' }}>Agregar a favoritos</Button>
                        </div>
                    }
                    { compareList.length < 3 && !isOnStorage(data.vehicle) &&
                        <div style={{ margin: '20px auto', textAlign: 'center' }}>
                            <Button 
                            onClick={(e) => { e.preventDefault();addComparar(data.vehicle) }} 
                            primary style={{ borderRadius: 20, padding: '11px 40px' }}>Comparar</Button>
                        </div> 
                    }
                    {data.vehiculosRelacionados.length > 0 && (
                    <Container fluid id="cont-inf">
                        <Header as="h4" style={{ marginTop: 20, marginLeft: 15 }}>
                            PRODUCTOS RELACIONADOS
                        </Header>
                        <CarruselRelacionados 
                            type='products'
                            data={data.vehiculosRelacionados}
                            numberCards={1}
                        />
                    </Container>
                    )}
                </div>
            )}

        </PublicLayout>
    )
}
export async function getServerSideProps({ params }) {
    const res = await axios.get('https://api.vendetunave.co/api/ficha_tecnica/' + params.slug);
    const data = await res.data;
    console.log(data);
    //const imagenes = await res.data.imagenes;
    return {
        props: {
            data
        },
    }
}