import React from 'react'
import PublicLayout from '../layouts/PublicLayout';
import ListaServicios from '../components/servicios/ListaServicios';
import { Container, Header, Select, Button, Responsive, Grid, Item, Segment, Pagination } from 'semantic-ui-react'
import axios from 'axios';
import { useRouter } from 'next/router';
export default function servicios({data}) {
    const router = useRouter();
    const mapping_filters = (array) => {
        var mapItems = Object.keys(array).map((item, index) => {
            return {
                key: index,
                value: item,
                text: item
            }
        });
        return mapItems;
    }
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
        document.location.search = params;
    }
    const handleFilterCiudadChange = (e, { value }) => {
        insertParam('ciudad', value);
    }
    const handleFilterServicioChange = (e, { value }) => {
        insertParam('servicio', value);
    }
    return (
        <PublicLayout>
            <div>
            <Container style={{ paddingTop: 25 }} text>
                <Header as='h2' style={{ textTransform: 'uppercase' }}>RECOMENDACIONES DE SERVICIOS PARA TU CARRO</Header>
                <p style={{ textAlign: 'justify' }}>
                    En esta sección hemos escogido en las principales ciudades los mejores servicios para tú vehículos como: mecánica, tunning, latonería y pintura, polarizado, cambios de aceite, performance, porcelanizado, lavado, entre otros.
                </p>
                <style>
                    {`
                        .ui.text.container {
                            max-width: 900px!important;
                        }
                    `}
                </style>
                <Responsive {...Responsive.onlyComputer}>
                    <div className="ui two column grid" style={{ marginBottom: 15 }}>
                        <div className="row">
                            <div className="column">
                                <Select
                                    fluid
                                    placeholder='SELECCIONE LA CIUDAD'
                                    value={router.query.ciudad}
                                    onChange={handleFilterCiudadChange}
                                    search
                                    options={mapping_filters(data.contadores.ciudades)}
                                />
                            </div>
                            <div className="column">
                                <Select
                                    fluid
                                    placeholder='SELECCIONE SERVICIO'
                                    value={router.query.servicio}
                                    onChange={handleFilterServicioChange}
                                    search
                                    options={mapping_filters(data.contadores.servicios)}
                                />
                            </div>
                        </div>
                    </div>
                </Responsive>
                <Responsive {...Responsive.onlyTablet}>
                    <Grid columns={1}>
                        <Grid.Row>
                            <Grid.Column style={{ marginBottom: 15 }}>
                                <Select
                                    fluid
                                    placeholder='SELECCIONE LA CIUDAD'
                                    value={router.query.ciudad}
                                    onChange={handleFilterCiudadChange}
                                    search
                                    options={mapping_filters(data.contadores.ciudades)}
                                />
                            </Grid.Column>
                            <Grid.Column style={{ marginBottom: 15 }}>
                                <Select
                                    fluid
                                    placeholder='SELECCIONE UN SERVICIO'
                                    value={router.query.servicio}
                                    onChange={handleFilterServicioChange}
                                    search
                                    options={mapping_filters(data.contadores.servicios)}
                                />
                            </Grid.Column>
                        </Grid.Row>
                    </Grid>
                </Responsive>
                <Responsive {...Responsive.onlyMobile}>
                    <Grid columns={1}>
                        <Grid.Row>
                            <Grid.Column style={{ marginBottom: 15 }}>
                                <Select
                                    fluid
                                    placeholder='SELECCIONE LA CIUDAD'
                                    value={router.query.ciudad}
                                    onChange={handleFilterCiudadChange}
                                    search
                                    options={mapping_filters(data.contadores.ciudades)}
                                />
                            </Grid.Column>
                            <Grid.Column style={{ marginBottom: 15 }}>
                                <Select
                                    fluid
                                    placeholder='SELECCIONE UN SERVICIO'
                                    value={router.query.servicio}
                                    onChange={handleFilterServicioChange}
                                    search
                                    options={mapping_filters(data.contadores.servicios)}
                                />
                            </Grid.Column>
                        </Grid.Row>
                    </Grid>
                </Responsive>
                <Responsive {...Responsive.onlyComputer}>
                    <ListaServicios 
                    servicios_res={data.servicios}
                    pagina={data.pagina}
                    total={data.total_records}/>
                </Responsive>
                <Responsive {...Responsive.onlyTablet}>
                    <ListaServicios 
                    servicios_res={data.servicios}
                    pagina={data.pagina}
                    total={data.total_records}/>
                </Responsive>
                <Responsive {...Responsive.onlyMobile}>
                    <ListaServicios 
                    servicios_res={data.servicios}
                    pagina={data.pagina}
                    total={data.total_records}/>
                </Responsive>
            </Container>
            </div>
        </PublicLayout>
    )
}
export async function getServerSideProps({query}) {
    const res = await axios.get('https://api.vendetunave.co/api/servicios', {
        params: {
            ciudad: query.ciudad,
            servicio: query.servicio,
            page: query.page
        }
    });
    const data = await res.data;
    return {
        props: {
            data
        },
    }
}