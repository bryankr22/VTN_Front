import React from 'react'
import { useRouter } from 'next/router'
import PublicLayout from '../../../layouts/PublicLayout';
import SliderPrincipal from '../../../components/vehiculo/SliderPrincipal';
import SidebarDetalle from '../../../components/vehiculo/SidebarDetalle';
import CarruselHome from '../../../components/carrusel/CarruselHome';
import axios from 'axios';
import { Responsive, Icon, Breadcrumb, Grid, Header } from "semantic-ui-react";
  
export default function detalle({data}) {
    return (
        <PublicLayout>
            <div style={{ margin: 10, padding: '15px 15px 5px 15px', display: 'flex', alignItems: 'center' }}>
                <Breadcrumb style={{ background: 'transparent', padding: 15, position: 'absolute', zIndex: 1000, width: '100%' }}>
                    <Breadcrumb.Section link href={"/vehiculos/" + data.urlCategory + "/Marca/Modelo/Estilo/Ubicacion/Ciudad/Anio/Combustible/Blindaje_0/Transmision/Estado/Desde_0-Hasta_0/Desde_0-Hasta_0/Pagina_1/Promo_0/Permu_0/Buscar_/Orden_0"}>{data.vehiculo.tipoLabel}</Breadcrumb.Section>
                    <Breadcrumb.Divider icon='right angle' />

                    {data.vehiculo.tipoMotoLabel &&
                        <Fragment>
                        <Breadcrumb.Section link href={"/vehiculos/" + data.urlCategory + "/Marca/Modelo/" + data.urlTypeMoto + "/Ubicacion/Ciudad/Anio/Combustible/Blindaje_0/Transmision/Estado/Desde_0-Hasta_0/Desde_0-Hasta_0/Pagina_1/Promo_0/Permu_0/Buscar_/Orden_0"}>{data.vehiculo.tipoMotoLabel}</Breadcrumb.Section>
                        <Breadcrumb.Divider icon='right angle' />
                        </Fragment>
                    }
                    <Breadcrumb.Section link href={"/vehiculos/" + data.urlCategory + "/" + data.urlMarca + "/Modelo/" + ((data.vehiculo.tipoMotoLabel) ? data.urlTypeMoto : 'Estilo') + "/Ubicacion/Ciudad/Anio/Combustible/Blindaje_0/Transmision/Estado/Desde_0-Hasta_0/Desde_0-Hasta_0/Pagina_1/Promo_0/Permu_0/Buscar_/Orden_0"}>{data.vehiculo.marcaLabel}</Breadcrumb.Section>
                    <Breadcrumb.Divider icon='right angle' />
                    <Breadcrumb.Section link href={"/vehiculos/" + data.urlCategory + "/" + data.urlMarca + "/" + data.urlModelo + "/" + ((data.vehiculo.tipoMotoLabel) ? data.urlTypeMoto : 'Estilo') + "/Ubicacion/Ciudad/Anio/Combustible/Blindaje_0/Transmision/Estado/Desde_0-Hasta_0/Desde_0-Hasta_0/Pagina_1/Promo_0/Permu_0/Buscar_/Orden_0"}>{data.vehiculo.modeloLabel}</Breadcrumb.Section>

                    <Responsive {...Responsive.onlyComputer} style={{ display: 'inline' }}>
                        <div style={{ display: 'inline-block', float: 'right', marginRight: 40, fontSize: 18, color: '#5c5c5c' }}>
                        <Icon name="eye" style={{ marginRight: 5 }} />
                        <p style={{ display: 'inline' }}>{new Intl.NumberFormat("de-DE").format(data.vehiculo.views)}</p>
                        </div>
                    </Responsive>
                </Breadcrumb>
            </div>
            <Responsive minWidth={100} maxWidth={320}>
                <SliderPrincipal imagenes={data.imagenes}/>
                <SidebarDetalle vehiculo={data.vehiculo} />
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
                    </Grid.Column>
                    <Grid.Column style={{ padding: "30px 10px 15px 30px" }}>
                        <Header as="h1" textAlign="left">
                            {data.vehiculo.title}
                        </Header>
                        <Header
                        textAlign="left"
                        as="h1"
                        style={{ marginBottom: 20, marginTop: 20 }}
                        >
                            <Header.Content>
                            ${" "}
                            {new Intl.NumberFormat("de-DE").format(
                               data.vehiculo.precio
                            )}{" "}
                            COP
                            </Header.Content>
                        </Header>
                        <Header as="h6" style={{ marginTop: 8 }}>
                            Este vehículo cuenta con:
                        </Header>
                    </Grid.Column>
                </Grid>
            </Responsive>
        </PublicLayout>
    )
}
export async function getServerSideProps({ params }) {
    const res = await axios.get('https://api.vendetunave.co/api/vehiculo/'+params.slug);
    const data = await res.data;
    //const imagenes = await res.data.imagenes;
    return {
        props: {
            data
        },
    }
}