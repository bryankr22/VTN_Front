import React from 'react'
import PublicLayout from '../layouts/PublicLayout'
import {
    Button,
    Image,
    Grid,
    Header,
    Icon,
    Responsive,
    Segment,
    Container
} from 'semantic-ui-react'
import Link from 'next/link'
export default function comparar() {
    return (
        <PublicLayout>
            <Container style={{ paddingTop: 25, marginBottom: 75 }} text>
            <Header as='h2'>Comparar</Header>
            {/* <p style={{ textAlign: 'justify' }}>
                El compromiso con nuestra comunidad va más allá de la venta de vehículos,
                hemos creado un sector de servicios en donde podrá encontrar accesorios,
                servicios (mecánica, latonería y pintura, polarizado, blindaje entre otros) y
                financiación para compra de vehículo (ayuda para tramite de crédito de vehículo nuevo o usado).
            </p> */}
            <Responsive {...Responsive.onlyMobile}>
                <Grid columns={1} divided style={{ marginTop: 25 }}>
                    <Grid.Row>
                        <Grid.Column>
                            <Link href="/comparar-vehiculos" style={{ textDecoration: 'none', color: 'black' }}>
                                <Segment placeholder style={{ alignItems: 'center', border: 'none', background: 'transparent' }}>
                                    <Image size='small' style={{ zIndex: 1, width: 215 }} src='https://vendetunave.s3.amazonaws.com/vendetunave/images/utils/Comparar_Vehiculos.png' />
                                    <Header style={{ margin: 0, marginTop: -15 }}>
                                        Comparar vehículos en venta
                                    </Header>
                                </Segment>
                            </Link>
                        </Grid.Column>
                        <Grid.Column>
                            <Link href="/comparar-fichas" style={{ textDecoration: 'none', color: 'black' }}>
                                <Segment placeholder style={{ alignItems: 'center', border: 'none', background: 'transparent' }}>
                                    <Image size='small' style={{ zIndex: 1, width: 200 }} src='https://vendetunave.s3.amazonaws.com/vendetunave/images/utils/Comparar_Ficha_tecnica.png' />
                                    <Header style={{ margin: 0, marginTop: -15 }}>
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
                            <Link href="/comparar-vehiculos" style={{ textDecoration: 'none', color: 'black' }}>
                                <Segment placeholder style={{ alignItems: 'center', border: 'none', background: 'transparent' }}>
                                    <Image size='small' style={{ zIndex: 1, width: 200 }} src='https://vendetunave.s3.amazonaws.com/vendetunave/images/utils/Comparar_Vehiculos.png' />
                                    <Header style={{ margin: 0, marginTop: -15 }}>
                                        Comparar vehículos en venta
                                    </Header>
                                </Segment>
                            </Link>
                        </Grid.Column>
                        <Grid.Column>
                            <Link href="/comparar-fichas" style={{ textDecoration: 'none', color: 'black' }}>
                                <Segment placeholder style={{ alignItems: 'center', border: 'none', background: 'transparent' }}>
                                    <Image size='small' style={{ zIndex: 1, width: 215 }} src='https://vendetunave.s3.amazonaws.com/vendetunave/images/utils/Comparar_Ficha_tecnica.png' />
                                    <Header style={{ margin: 0, marginTop: -15 }}>
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
                            <Link href="/comparar-vehiculos" style={{ textDecoration: 'none', color: 'black' }}>
                                <Segment placeholder style={{ alignItems: 'center', height: '100%' }}>
                                    <Image size='small' style={{ zIndex: 1, width: 200 }} src='https://vendetunave.s3.amazonaws.com/vendetunave/images/utils/Comparar_Vehiculos.png' />
                                    <Header style={{ margin: 0, marginTop: -15 }}>
                                        Comparar vehículos en venta
                                    </Header>
                                </Segment>
                            </Link>
                        </Grid.Column>
                        <Grid.Column>
                            <Link href="/comparar-fichas" style={{ textDecoration: 'none', color: 'black' }}>
                                <Segment placeholder style={{ alignItems: 'center' }}>
                                    <Image size='small' style={{ zIndex: 1, width: 215 }} src='https://vendetunave.s3.amazonaws.com/vendetunave/images/utils/Comparar_Ficha_tecnica.png' />
                                    <Header style={{ margin: 0, marginTop: -15 }}>
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
