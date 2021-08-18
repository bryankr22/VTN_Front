import React, { Fragment, useEffect } from 'react'
import { useRouter } from 'next/router'
import PublicLayout from '../../../layouts/PublicLayout';
import SliderPrincipal from '../../../components/vehiculo/SliderPrincipal';
import SidebarDetalle from '../../../components/vehiculo/SidebarDetalle';
import SidebarDetalleDesk from '../../../components/vehiculo/SidebarDetalleDesk';
import TableCaracteristicasDesk from '../../../components/vehiculo/TableCaracteristicasDesk';
import CarruselHome from '../../../components/carrusel/CarruselHome';
import CarruselRelacionados from '../../../components/carrusel/CarruselRelacionados';
import axios from 'axios';
import { Responsive, Icon, Breadcrumb, Grid, Header, Container } from "semantic-ui-react";
export default function detalle({ data }) {
    useEffect(() => {
        if (typeof window !== 'undefined') {
            /**$('.thumbs > .thumb > img').removeAttr("id");
            $('#image_vehicle_4').removeAttr("id");
            $('#image_vehicle_0').ezPlus({
                scrollZoom: true,
                zoomWindowWidth: 500,
                zoomWindowHeight: 500
            });
            $('#image_vehicle_1').ezPlus({
                scrollZoom: true,
                zoomWindowWidth: 500,
                zoomWindowHeight: 500
            });
            $('#image_vehicle_2').ezPlus({
                scrollZoom: true,
                zoomWindowWidth: 500,
                zoomWindowHeight: 500
            });
            $('#image_vehicle_3').ezPlus({
                scrollZoom: true,
                zoomWindowWidth: 500,
                zoomWindowHeight: 500
            });
            $('#image_vehicle_4').ezPlus({
                scrollZoom: true,
                zoomWindowWidth: 500,
                zoomWindowHeight: 500
            });
            setTimeout(function() {
                let primerElemento = document.getElementById('image_vehicle_0').getAttribute('data-zoom-image').replace('https://vendetunave.s3.amazonaws.com/vendetunave/images/vehiculos/', '').replace('.', '-')
                $('.zoomContainer').css("display", 'none');
                $('#' + primerElemento).css("display", 'block');
            }, 4000);

            const observer = new MutationObserver((mutationList) => {
                mutationList.forEach((mutation) => {
                    if (mutation.addedNodes.length) {
                        console.log('Añadido', mutation.addedNodes[0]);
                    }
                    if (mutation.removedNodes.length) {
                        console.log('Eliminado', mutation.removedNodes[0]);
                    }

                    let slideParent = document.getElementsByClassName('slide selected')[0];
                    let divSlide = slideParent.firstElementChild;
                    let imageElement = divSlide.firstElementChild;

                    let atributo = ((imageElement.getAttribute('data-zoom-image')).replace('https://vendetunave.s3.amazonaws.com/vendetunave/images/vehiculos/', '')).replace('.', '-');
                    $('.zoomContainer').css("display", 'none');
                    $('#' + atributo).css("display", 'block');
                })
            });
            const equipos = document.querySelector('ul.slider');
            // Opcions para el observer
            const observerOptions = {
                attributes: true,
                childList: true,
                subtree: true,
                characterData: false,
                attributeOldValue: false,
                characterDataOldValue: false
            };
            observer.observe(equipos, observerOptions);**/
        }
    }, [])
    return (
        <PublicLayout>
            <style>
            {`
                .image > img {
                    object-fit: cover;
                }
                .slider-wrapper {
                    height: 65vh !important;
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

            <div style={{ margin: 10, padding: '15px 15px 5px 15px', display: 'flex', alignItems: 'center' }}>
                <Breadcrumb style={{ background: 'transparent', padding: 15, position: 'absolute', zIndex: 1000, width: '100%' }}>
                    <Breadcrumb.Section 
                    link 
                    href={"/vehiculos/"}>{data.vehiculo.tipoLabel}</Breadcrumb.Section>
                    <Breadcrumb.Divider icon='right angle' />

                    {data.vehiculo.tipoMotoLabel &&
                        <Fragment>
                            <Breadcrumb.Section 
                            link 
                            href={"/vehiculos/"}>{data.vehiculo.tipoMotoLabel}</Breadcrumb.Section>
                            <Breadcrumb.Divider icon='right angle' />
                        </Fragment>
                    }
                    <Breadcrumb.Section 
                    link 
                    href={"/vehiculos/"}>{data.vehiculo.marcaLabel}</Breadcrumb.Section>
                    <Breadcrumb.Divider icon='right angle' />
                    <Breadcrumb.Section 
                    link 
                    href={"/vehiculos/"}>{data.vehiculo.modeloLabel}</Breadcrumb.Section>
                    <Responsive {...Responsive.onlyComputer} style={{ display: "inline", marginLeft: 'auto' }}>
                        <div style={{ display: 'inline-block', float: 'right', marginRight: 40, fontSize: 18, color: '#5c5c5c' }}>
                            <Icon name="eye" style={{ marginRight: 5 }} />
                            <p style={{ display: 'inline' }}>{new Intl.NumberFormat("de-DE").format(data.vehiculo.views)}</p>
                        </div>
                    </Responsive>
                </Breadcrumb>
                
            </div>
            <Responsive minWidth={100} maxWidth={320}>
                <SliderPrincipal imagenes={data.imagenes} />
                <SidebarDetalle vehiculo={data.vehiculo} />
            </Responsive>
            <Responsive {...Responsive.onlyTablet}>
                <Container style={{ marginTop: 20 }}>
                    <SliderPrincipal imagenes={data.imagenes} />
                    <SidebarDetalle vehiculo={data.vehiculo} />
                    <Grid columns={1} divided="vertically">
                        <Grid.Row style={{ marginTop: 30 }}>
                            <Grid.Column>
                                <Grid>
                                    <Grid.Row columns={2} style={{ paddingBottom: 8 }}>
                                        <Grid.Column>
                                            <Header as="h5">
                                                Publicado hace:
                                                {" " + data.diasPublicado} días
                                            </Header>
                                        </Grid.Column>
                                        <Grid.Column>
                                            <Header as="h5">
                                                {" " + data.vehiculo.ciudadLabel},
                                                {" " + data.vehiculo.departamentoLabel}
                                            </Header>
                                        </Grid.Column>
                                    </Grid.Row>
                                    <Grid.Row columns={2} style={{ paddingBottom: 8 }}>
                                        <Grid.Column>
                                            <Header as="h5">
                                                Teléfono:
                                                {" " + data.vehiculo.contacto}
                                            </Header>
                                        </Grid.Column>
                                    </Grid.Row>
                                </Grid>
                            </Grid.Column>
                        </Grid.Row>
                        <Grid.Row>
                            <Header as="h5" style={{ marginTop: 20 }}>
                                CARACTERÍSTICAS
                            </Header>
                            <TableCaracteristicasDesk vehiculo={data.vehiculo} />
                        </Grid.Row>
                        <Grid.Row>
                            <Grid.Column>
                                <Header as="h5" icon>
                                    DESCRIPCIÓN
                                </Header>
                                <p style={{ fontSize: 14 }}>
                                    {data.vehiculo.descripcion}
                                </p>
                            </Grid.Column>
                        </Grid.Row>
                    </Grid>
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
                </Container>
            </Responsive>
            <Responsive {...Responsive.onlyMobile}>
                <Container style={{ marginTop: 20 }}>
                    <SliderPrincipal imagenes={data.imagenes} />
                    <SidebarDetalle vehiculo={data.vehiculo} />
                    <Grid columns={1} divided="vertically">
                        <Grid.Row style={{ marginTop: 30 }}>
                            <Grid.Column>
                                <Grid>
                                    <Grid.Row columns={2} style={{ paddingBottom: 8 }}>
                                        <Grid.Column>
                                            <Header as="h5">
                                                Publicado hace:
                                                {" " + data.diasPublicado} días
                                            </Header>
                                        </Grid.Column>
                                        <Grid.Column>
                                            <Header as="h5">
                                                {" " + data.vehiculo.ciudadLabel},
                                                {" " + data.vehiculo.departamentoLabel}
                                            </Header>
                                        </Grid.Column>
                                    </Grid.Row>
                                    <Grid.Row columns={2} style={{ paddingBottom: 8 }}>
                                        <Grid.Column>
                                            <Header as="h5">
                                                Teléfono:
                                                {" " + data.vehiculo.contacto}
                                            </Header>
                                        </Grid.Column>
                                    </Grid.Row>
                                </Grid>
                            </Grid.Column>
                        </Grid.Row>
                        <Grid.Row>
                            <Header as="h5" style={{ marginTop: 20 }}>
                                CARACTERÍSTICAS
                            </Header>
                            <TableCaracteristicasDesk vehiculo={data.vehiculo} />
                        </Grid.Row>
                        <Grid.Row>
                            <Grid.Column>
                                <Header as="h5" icon>
                                    DESCRIPCIÓN
                                </Header>
                                <p style={{ fontSize: 14 }}>
                                    {data.vehiculo.descripcion}
                                </p>
                            </Grid.Column>
                        </Grid.Row>
                    </Grid>
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
                </Container>
            </Responsive>
            <Responsive {...Responsive.onlyComputer}>
                <Grid columns="equal">
                    <Grid.Column width={10} style={{ padding: "30px 10px 15px 30px" }}>
                        <CarruselHome
                            seccion="desc"
                            showThumbs
                            data={data.imagenes}
                            description={''}
                        />
                        <Header as="h5" style={{ marginTop: 20 }}>
                            CARACTERÍSTICAS
                        </Header>
                        <TableCaracteristicasDesk vehiculo={data.vehiculo} />
                        <hr />
                        <Header as="h5" icon>
                            DESCRIPCIÓN
                        </Header>
                        <p style={{ fontSize: 14 }}>{data.vehiculo.descripcion}</p>
                        <hr />
                    </Grid.Column>
                    <SidebarDetalleDesk
                        diasPublicado={data.diasPublicado}
                        vehiculo={data.vehiculo} />
                </Grid>
                {data.vehiculosRelacionados.length > 0 && (
                <Container fluid id="cont-inf">
                    <Header as="h4" style={{ marginTop: 20, marginLeft: 15 }}>
                        PRODUCTOS RELACIONADOS
                    </Header>
                    <CarruselRelacionados 
                        type='products'
                        data={data.vehiculosRelacionados}
                        numberCards={4}
                    />
                </Container>
                )}
            </Responsive>
        </PublicLayout>
    )
}
export async function getServerSideProps({ params }) {
    const res = await axios.get('https://api.vendetunave.co/api/vehiculo/' + params.slug);
    const data = await res.data;
    //const imagenes = await res.data.imagenes;
    return {
        props: {
            data
        },
    }
}