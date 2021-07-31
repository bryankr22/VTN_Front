import React, { Fragment } from 'react'
import { useRouter } from 'next/router'
import PublicLayout from '../../../layouts/PublicLayout';
import SliderPrincipal from '../../../components/vehiculo/SliderPrincipal';
import SidebarDetalle from '../../../components/vehiculo/SidebarDetalle';
import SidebarDetalleDesk from '../../../components/vehiculo/SidebarDetalleDesk';
import TableCaracteristicasDesk from '../../../components/vehiculo/TableCaracteristicasDesk';
import CarruselHome from '../../../components/carrusel/CarruselHome';
import axios from 'axios';
import { Responsive, Icon, Breadcrumb, Grid, Header, Container } from "semantic-ui-react";

export default function detalle({ data }) {
    return (
        <PublicLayout>
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
            </Responsive>
        </PublicLayout>
    )
}
export async function getServerSideProps({ params }) {
    const res = await axios.get('https://api.vendetunave.co/api/accesorio/' + params.slug);
    const data = await res.data;
    return {
        props: {
            data
        },
    }
}