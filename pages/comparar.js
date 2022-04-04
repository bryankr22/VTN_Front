import React from 'react';
import { useSelector } from 'react-redux';
import Head from "next/head";
import { NextSeo } from "next-seo";
import PublicLayout from '../layouts/PublicLayout';
import {
    Image,
    Grid,
    Header,
    Responsive,
    Segment,
    Container
} from 'semantic-ui-react'
import Link from 'next/link'
import { dark, light } from '../helpers/colors';
export default function comparar() {
    const darkMode = useSelector(({ darkMode }) => darkMode.status);
    const colorText = darkMode === light ? dark : light;
    return (
        <PublicLayout>
            <NextSeo
                title="VendeTuNave - Comparar Carros"
                description="Compara todas las características de carros, camionetas y motos en Vende Tu Nave. Compara entre ellos y escoge la mejor opción."
                openGraph={{
                    title: "VendeTuNave - Comparar Carros",
                    locale: "es_ES",
                    type: "website",
                    description: "Compara todas las características de carros, camionetas y motos en Vende Tu Nave. Compara entre ellos y escoge la mejor opción."
                }}
            />
            <Head>
                <meta property="keywords" content="comparar carros, comparar motos, características de un carro, comparar moto, camionetas 4x4, pickup, 4x4" />
            </Head>
            <Container style={{ paddingTop: 25, marginBottom: 75 }} text>
                <Header as='h1'>Comparar Carros o Motos</Header>
                {/* <p style={{ textAlign: 'justify' }}>
                El compromiso con nuestra comunidad va más allá de la venta de vehículos,
                hemos creado un sector de servicios en donde podrá encontrar accesorios,
                servicios (mecánica, latonería y pintura, polarizado, blindaje entre otros) y
                financiación para compra de vehículo (ayuda para tramite de crédito de vehículo nuevo o usado).
            </p> */}
                <style>
                    {`
                        .ui.placeholder.segment > img {
                            height: auto !important;
                            ${darkMode === dark && 'filter: invert(1);'}
                        }

                        .ui.placeholder, .ui.placeholder .image.header:after, .ui.placeholder .line, .ui.placeholder .line:after, .ui.placeholder>:before {
                            background-color: transparent;
                        }
                    `}
                </style>
                <Responsive {...Responsive.onlyMobile}>
                    <Grid columns={1} divided style={{ marginTop: 25 }}>
                        <Grid.Row>
                            <Grid.Column>
                                <Link href="/comparar-vehiculos" style={{ textDecoration: 'none', color: colorText }} passHref>
                                    <Segment placeholder style={{ alignItems: 'center', border: 'none', background: 'transparent' }}>
                                        <Image size='small' style={{ zIndex: 1, width: 215 }} src='https://vendetunave.s3.amazonaws.com/vendetunave/images/utils/Comparar_Vehiculos.png' alt="comparar vehiculo" />
                                        <Header style={{ margin: 0, marginTop: -15, color: colorText }}>
                                            Comparar vehículos en venta
                                        </Header>
                                    </Segment>
                                </Link>
                            </Grid.Column>
                            <Grid.Column>
                                <Link href="/comparar-fichas" style={{ textDecoration: 'none', color: colorText }} passHref>
                                    <Segment placeholder style={{ alignItems: 'center', border: 'none', background: 'transparent' }}>
                                        <Image size='small' style={{ zIndex: 1, width: 200 }} src='https://vendetunave.s3.amazonaws.com/vendetunave/images/utils/Comparar_Ficha_tecnica.png' alt="comparar ficha técnica" />
                                        <Header style={{ margin: 0, marginTop: -15, color: colorText }}>
                                            Comparar fichas técnicas (nuevos)
                                        </Header>
                                    </Segment>
                                </Link>
                            </Grid.Column>
                        </Grid.Row>
                    </Grid>
                </Responsive>
                <Responsive {...Responsive.onlyTablet}>
                    <Grid columns={1} divided style={{ marginTop: 25 }}>
                        <Grid.Row>
                            <Grid.Column>
                                <Link href="/comparar-vehiculos" style={{ textDecoration: 'none', color: colorText }} passHref>
                                    <Segment placeholder style={{ alignItems: 'center', border: 'none', background: 'transparent' }}>
                                        <Image size='small' style={{ zIndex: 1, width: 200 }} src='https://vendetunave.s3.amazonaws.com/vendetunave/images/utils/Comparar_Vehiculos.png' alt="comparar vehiculo" />
                                        <Header style={{ margin: 0, marginTop: -15 }}>
                                            Comparar vehículos en venta
                                        </Header>
                                    </Segment>
                                </Link>
                            </Grid.Column>
                            <Grid.Column>
                                <Link href="/comparar-fichas" style={{ textDecoration: 'none', color: colorText }} passHref>
                                    <Segment placeholder style={{ alignItems: 'center', border: 'none', background: 'transparent' }}>
                                        <Image size='small' style={{ zIndex: 1, width: 215 }} src='https://vendetunave.s3.amazonaws.com/vendetunave/images/utils/Comparar_Ficha_tecnica.png' alt="comparar ficha técnica" />
                                        <Header style={{ margin: 0, marginTop: -15, color: colorText }}>
                                            Comparar fichas técnicas (nuevos)
                                        </Header>
                                    </Segment>
                                </Link>
                            </Grid.Column>
                        </Grid.Row>
                    </Grid>
                </Responsive>

                <Responsive {...Responsive.onlyComputer} >
                    <Grid columns={2} divided style={{ marginTop: 25 }}>
                        <Grid.Row>
                            <Grid.Column>
                                <Link href="/comparar-vehiculos" style={{ textDecoration: 'none', color: colorText }} passHref>
                                    <Segment placeholder style={{ alignItems: 'center', height: '100%', background: 'transparent', border: `1px solid ${colorText}` }}>
                                        <Image size='small' style={{ zIndex: 1, width: 200 }} src='https://vendetunave.s3.amazonaws.com/vendetunave/images/utils/Comparar_Vehiculos.png' alt="comparar vehiculo" />
                                        <Header style={{ margin: 0, marginTop: -15, color: colorText }}>
                                            Comparar vehículos en venta
                                        </Header>
                                    </Segment>
                                </Link>
                            </Grid.Column>
                            <Grid.Column>
                                <Link href="/comparar-fichas" style={{ textDecoration: 'none', color: colorText }} passHref>
                                    <Segment placeholder style={{ alignItems: 'center', background: 'transparent', border: `1px solid ${colorText}` }}>
                                        <Image size='small' style={{ zIndex: 1, width: 215 }} src='https://vendetunave.s3.amazonaws.com/vendetunave/images/utils/Comparar_Ficha_tecnica.png' alt="comparar ficha técnica" />
                                        <Header style={{ margin: 0, marginTop: -15, color: colorText }}>
                                            Comparar fichas técnicas (nuevos)
                                        </Header>
                                    </Segment>
                                </Link>
                            </Grid.Column>
                        </Grid.Row>
                    </Grid>
                </Responsive>
            </Container>
        </PublicLayout>
    )
}
