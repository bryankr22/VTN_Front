import React, {useState} from 'react'
import { Container, Input, List, Modal, Grid, Checkbox, Header, Button, Label, Icon } from "semantic-ui-react";
import ActiveTagsVehiculos from './ActiveTagsVehiculos';
export default function SidebarAccesorios({ params, contadores, vehiculos }) {
    //console.log(">>>>", contadores);
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
    return (
        <Grid.Column style={{ paddingLeft: "3%" }} width={3}>
            <Header style={{ marginTop: 15 }} as="h3">
               { vehiculos.length } resultados
            </Header>
            <Container>
                <ActiveTagsVehiculos tags={params}/>
            </Container>
            <Container style={{ padding: "20px 20px" }}>
                { !params.tipo && ( 
                <List link>
                    <List.Item>
                        <List.Content>
                            <List.Header>
                                <Header as="h5">Categoria</Header>
                            </List.Header>
                            <List.List style={{ paddingLeft: 15 }}>
                                {mapping_contador(contadores.tipo).map((item, index) => (
                                    <List.Item 
                                    key={index}
                                    as="a"
                                    onClick={() => insertParam('tipo', item.label) }>
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
                { !params.ubicacion && ( 
                <List link>
                    <List.Item>
                        <List.Content>
                            <List.Header>
                                <Header as="h5">Ubicacion</Header>
                            </List.Header>
                            <List.List style={{ paddingLeft: 15 }}>
                                {mapping_contador(contadores.ciudad).map((item, index) => (
                                    <List.Item 
                                    key={index}
                                    as="a"
                                    onClick={() => insertParam('ubicacion', item.label) }>
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
                { !params.estado && ( 
                <List link>
                    <List.Item>
                        <List.Content>
                            <List.Header>
                                <Header as="h5">Estado</Header>
                            </List.Header>
                            <List.List style={{ paddingLeft: 15 }}>
                                {mapping_contador(contadores.estado).map((item, index) => (
                                    <List.Item 
                                    key={index}
                                    as="a"
                                    onClick={() => insertParam('estado', item.label) }>
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
            </Container>
        </Grid.Column>
    )
}
