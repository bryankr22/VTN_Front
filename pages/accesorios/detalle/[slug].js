import React from 'react'
import PublicLayout from '../../../layouts/PublicLayout';
import SliderPrincipal from '../../../components/vehiculo/SliderPrincipal';
import SidebarDetalle from '../../../components/vehiculo/SidebarDetalle';
import SidebarDetalleDesk from '../../../components/vehiculo/SidebarDetalleDesk';
import TableCaracteristicasAccDesk from '../../../components/vehiculo/TableCaracteristicasAccDesk';
import CarruselHome from '../../../components/carrusel/CarruselHome';
import axios from 'axios';
import { Responsive, Grid, Header, Container } from "semantic-ui-react";

export default function detalle({ data }) {
    return (
        <PublicLayout>
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
                            <TableCaracteristicasAccDesk vehiculo={data.vehiculo} />
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
                            <TableCaracteristicasAccDesk vehiculo={data.vehiculo} />
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
                        <TableCaracteristicasAccDesk vehiculo={data.vehiculo} />
                        <hr />
                        <Header as="h5" icon>
                            DESCRIPCIÓN
                        </Header>
                        <p style={{ fontSize: 14 }}>{data.vehiculo.descripcion}</p>
                        <hr />
                    </Grid.Column>
                    <SidebarDetalleDesk
                        accesorio={true}
                        diasPublicado={data.diasPublicado}
                        vehiculo={data.vehiculo} />
                </Grid>
            </Responsive>
        </PublicLayout>
    )
}
export async function getServerSideProps({ params, res }) {
    try {
        const res = await axios.get(
            "https://api.vendetunave.co/api/accesorio/" + params.slug
        );
        const data = await res.data;
        /**if(!data.status){
          statusCode = 404;
      }**/
        return {
            props: {
                data,
            },
        };
    } catch ({ response }) {
        res.writeHead(301, {
            Location: `/${response.status}`,
        });
        res.end();
        return { props: {} };
    }
}