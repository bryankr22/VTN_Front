import React, {useState} from 'react'
import { Container, Input, List, Modal, Grid, Checkbox, Header, Button, Label, Icon } from "semantic-ui-react";
import ActiveTagsVehiculos from './ActiveTagsVehiculos';
export default function SidebarFichas({ params, contadores, vehiculos }) {
    console.log(">>>>", contadores);
    const title_page = (slug) => {
        switch (slug) {
            case 'motos':
                return 'Motos'
            case 'camiones':
                return 'Camiones'
            case 'carros_coleccion':
                return 'Carros de coleccion'
            case 'otros':
                return 'Otros'
            case 'accesorios':
                return 'Accesorios'
            default:
                return 'Carros y camionetas'
        }
    }
    const mapping_contador = (contador) => {
        var mapItems = Object.keys(contador).map((item, index) => {
            return {
                label: item,
                qty: index
            }
        });
        var size = 5;
        var sliceItems = mapItems.slice(0, size)
        return sliceItems;
    }
    const kilometraje_filter = [
        { text: "De 0 a 5.000" },
        { text: "De 5.000 a 10.000" },
        { text: "De 10.000 a 20.000" },
        { text: "De 20.000 a 30.000" },
        { text: "De 30.000 a 45.000" },
    ];
    const precios_filter = [
        { text: "Hasta $10.000.000" },
        { text: "$10.000.000 a $20.000.000" },
        { text: "$20.000.000 a $35.000.000" },
        { text: "$35.000.000 a $50.000.000" },
        { text: "$50.000.000 a $100.000.000" },
    ];
    const categorias_filter = [
        { text: "CARROS Y CAMIONETAS", slug: 'carros' },
        { text: "CAMIONES", slug: 'camiones' },
        { text: "CARROS DE COLECCION", slug: 'carros_coleccion' },
        { text: "MOTOS", slug: 'motos' },
        { text: "OTROS", slug: 'otros' },
    ];
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
    };
    const tipos_vehList = [
        { id: 'Carro', nombre: 'Carro' },
        { id: 'Camioneta', nombre: 'Camioneta' },
        { id: 'SUV', nombre: 'SUV' },
        { id: 'Deportivo', nombre: 'Deportivo' },
        { id: 'Convertible', nombre: 'Convertible' },
        { id: 'Pick-Up', nombre: 'Pick-Up' }
    ];

    return (
        <Grid.Column style={{ paddingLeft: "3%" }} width={3}>
            <Header style={{ margin: 0 }} as="h3">
                {title_page(params.categoria)}
            </Header>
            <Header style={{ marginTop: 15 }} as="h3">
               { contadores.total_records } resultados
            </Header>
            <Container>
                <ActiveTagsVehiculos tags={params}/>
            </Container>
            <Container style={{ padding: "20px 20px" }}>
                <List link>
                    <List.Item>
                        <List.Content>
                            <List.Header>
                                <Header as="h5">Categorias</Header>
                            </List.Header>
                            <List.List style={{ paddingLeft: 15 }}>
                                <List.Item as="a"> {title_page(params.categoria)} </List.Item>
                            </List.List>
                        </List.Content>
                    </List.Item>
                </List>
                { !params.tipo && ( 
                <List link>
                    <List.Item>
                        <List.Content>
                            <List.Header>
                                <Header as="h5">Tipo de vehiculo</Header>
                            </List.Header>
                            <List.List style={{ paddingLeft: 15 }}>
                                {tipos_vehList.map((item, index) => (
                                    <List.Item 
                                    key={index}
                                    as="a"
                                    onClick={() => insertParam('tipo', item.id) }>
                                        {item.nombre}
                                    </List.Item>
                                )
                                )}
                                <List.Item as="a">
                                    Ver Todos
                                </List.Item>
                            </List.List>
                        </List.Content>
                    </List.Item>
                </List>
                )}
                { !params.marca && ( 
                <List link>
                    <List.Item>
                        <List.Content>
                            <List.Header>
                                <Header as="h5">Marca</Header>
                            </List.Header>
                            <List.List style={{ paddingLeft: 15 }}>
                                {mapping_contador(contadores.marca).map((item, index) => (
                                    <List.Item 
                                    key={index}
                                    as="a"
                                    onClick={() => insertParam('marca', item.label) }>
                                        {item.label}
                                    </List.Item>
                                )
                                )}
                                <List.Item as="a">
                                    Ver Todos
                                </List.Item>
                            </List.List>
                        </List.Content>
                    </List.Item>
                </List>
                )}
                { !params.combustible && ( 
                <List link>
                    <List.Item>
                        <List.Content>
                            <List.Header>
                                <Header as="h5">Tipo de Motor</Header>
                            </List.Header>
                            <List.List style={{ paddingLeft: 15 }}>
                                {mapping_contador(contadores.combustible).map((item, index) => (
                                    <List.Item 
                                    key={index}
                                    as="a"
                                    onClick={() => insertParam('combustible', item.label) }>
                                        {item.label}
                                    </List.Item>
                                )
                                )}
                                <List.Item as="a">
                                    Ver Todos
                                </List.Item>
                            </List.List>
                        </List.Content>
                    </List.Item>
                </List>
                )}
                { !params.caja && ( 
                <List link>
                    <List.Item>
                        <List.Content>
                            <List.Header>
                                <Header as="h5">Transmision</Header>
                            </List.Header>
                            <List.List style={{ paddingLeft: 15 }}>
                                {mapping_contador(contadores.caja).map((item, index) => (
                                    <List.Item 
                                    key={index}
                                    as="a"
                                    onClick={() => insertParam('caja', item.label) }>
                                        {item.label}
                                    </List.Item>
                                )
                                )}
                                <List.Item as="a">
                                    Ver Todos
                                </List.Item>
                            </List.List>
                        </List.Content>
                    </List.Item>
                </List>
                )}
                { !params.kilometraje && (<>
                <List link style={{ marginBottom: 0 }}>
                    <List.Item style={{ marginBottom: 0 }}>
                        <List.Content>
                            <List.Header>
                                <Header as="h5">Kilometraje</Header>
                            </List.Header>
                            <List.List>
                                {kilometraje_filter.map((item, index) => (
                                    <List.Item 
                                    key={index}
                                    as="a">
                                        {item.text}
                                    </List.Item>
                                )
                                )}
                                <List.Item
                                    as="a"
                                    style={{ padding: "7px 0px" }}
                                >
                                    Ver Todos
                                </List.Item>
                            </List.List>
                        </List.Content>
                    </List.Item>
                </List>
                <Grid id="grid-range-km" style={{ marginBottom: 8 }}>
                    <Grid.Column width={6}>
                        <Input
                            type="number"
                            fluid
                            placeholder="Mínimo"
                        />
                    </Grid.Column>
                    <Grid.Column
                        width={1}
                        style={{ textAlign: "center", marginTop: 3, fontSize: 16 }}
                    >
                        -
                    </Grid.Column>
                    <Grid.Column width={6}>
                        <Input
                            type="number"
                            fluid
                            placeholder="Máximo"
                        />
                    </Grid.Column>
                    <Grid.Column width={3}>
                        <Button
                            style={{ marginLeft: 6 }}
                            circular
                            icon="angle right"
                        />
                    </Grid.Column>
                </Grid>
                </>)}
                { !params.precio && (<>
                <List link style={{ marginBottom: 0 }}>
                    <List.Item style={{ marginBottom: 0 }}>
                        <List.Content>
                            <List.Header>
                                <Header as="h5">Precio</Header>
                            </List.Header>
                            <List.List>
                                {precios_filter.map((item, index) => (
                                    <List.Item 
                                    key={index}
                                    as="a">
                                        {item.text}
                                    </List.Item>
                                )
                                )}
                                <List.Item
                                    as="a"
                                    style={{ padding: "7px 0px" }}
                                >
                                    Ver Todos
                                </List.Item>
                            </List.List>
                        </List.Content>
                    </List.Item>
                </List>
                <Grid id="grid-range-km" style={{ marginBottom: 8 }}>
                    <Grid.Column width={6}>
                        <Input
                            type="number"
                            fluid
                            placeholder="Mínimo"
                        />
                    </Grid.Column>
                    <Grid.Column
                        width={1}
                        style={{ textAlign: "center", marginTop: 3, fontSize: 16 }}
                    >
                        -
                    </Grid.Column>
                    <Grid.Column width={6}>
                        <Input
                            type="number"
                            fluid
                            placeholder="Máximo"
                        />
                    </Grid.Column>
                    <Grid.Column width={3}>
                        <Button
                            style={{ marginLeft: 6 }}
                            circular
                            icon="angle right"
                        />
                    </Grid.Column>
                </Grid>
                </>)}
            </Container>
        </Grid.Column>
    )
}
