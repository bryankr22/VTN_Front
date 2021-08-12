import React, {useState} from 'react'
import { Container, List, Modal, Grid, Header, Icon, Accordion, Input, Button } from "semantic-ui-react";
import * as R from 'ramda'
export default function ModalFiltersMobile({showModal, onClose, filtros}) {
    const mapping_contador = (contador) => {
        var mapItems = Object.keys(contador).map((item, index) => {
            return {
                label: item,
                slug: item,
                qty: index
            }
        });
        var size = 5;
        var sliceItems = mapItems.slice(0, size)
        sliceItems.push({
            label: 'Ver Todos',
            slug: '',
            qty: 0
        })
        return sliceItems;
    }
    const mapping_anios = (contador) => {
        var mapItems = Object.keys(contador).map((item, index) => {
            return {
                label: parseInt(item),
                slug: parseInt(item),
                qty: index
            }
        });
        var byLabel = R.descend(R.prop('label'));
        var aniosByLabel = R.sort(byLabel, mapItems);
        var size = 5;
        var sliceItems = aniosByLabel.slice(0, size);
        return sliceItems;
    }
    const kilometraje_filter = [
        { label: "De 0 a 5.000", slug: '0:5000' },
        { label: "De 5.000 a 10.000", slug: '5000:10000' },
        { label: "De 10.000 a 20.000", slug: '10000:20000' },
        { label: "De 20.000 a 30.000", slug: '20000:30000' },
        { label: "De 30.000 a 45.000", slug: '30000:45000' },
    ];
    const precios_filter = [
        { label: "Hasta $10.000.000", slug: '0:10000000' },
        { label: "$10.000.000 a $20.000.000", slug: '10000000:20000000' },
        { label: "$20.000.000 a $35.000.000", slug: '20000000:35000000' },
        { label: "$35.000.000 a $50.000.000", slug: '35000000:50000000' },
        { label: "$50.000.000 a $100.000.000", slug: '50000000:100000000' },
    ];
    const categorias_filter = [
        { label: "CARROS Y CAMIONETAS", slug: 'carros' },
        { label: "CAMIONES", slug: 'camiones' },
        { label: "CARROS DE COLECCION", slug: 'carros_coleccion' },
        { label: "MOTOS", slug: 'motos' },
        { label: "OTROS", slug: 'otros' },
    ];
    const [filtrosLocal, setFiltrosLocal] = useState(
        [
            {
                text: "Categorias",
                open: false,
                values: categorias_filter,
                slug: 'categoria'
            },
            {
                text: "Ubicacion",
                open: false,
                values: mapping_contador(filtros.ubicacion),
                slug: 'ubicacion'
            },
            {
                text: "Marcas",
                open: false,
                values: mapping_contador(filtros.marcas),
                slug: 'marca'
            },
            {
                text: "Año",
                open: false,
                values: mapping_anios(filtros.anios),
                slug: 'ano'
            },
            {
                text: "Tipo de motor",
                open: false,
                values: mapping_contador(filtros.combustible),
                slug: 'combustible'
            },
            {
                text: "Transmision",
                open: false,
                values: mapping_contador(filtros.caja),
                slug: 'transmision'
            },
            {
                text: "Estado",
                open: false,
                slug: 'estado',
                values: [
                    {
                        label: "Nuevo",
                        slug: "Nuevo"
                    },
                    {
                        label: "Usado",
                        slug: "Usado"
                    }
                ]
            },
            {
                text: "Precio",
                slug: 'precio',
                open: false,
                values: precios_filter,
                minimo: 0,
                maximo: 0
            },
            {
                text: "Kilometraje",
                slug: 'kilometraje',
                open: false,
                values: kilometraje_filter,
                minimo: 0,
                maximo: 0
            }
        ]
    )
    const activeDropDown = (index) => {
        var openDrop = filtrosLocal[index].open;
        filtrosLocal[index].open = !openDrop;
        setFiltrosLocal([...filtrosLocal]);
    }
    const changeInputFiltro = (value, index, input) => {
        filtrosLocal[index][input] = value;
        setFiltrosLocal([...filtrosLocal]);
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
        <Modal
        size="tiny"
        open={showModal}
        onClose={onClose}
        closeIcon
        >
            <Modal.Header>Filtros</Modal.Header>
            <Container style={{ padding: "20px 20px" }}>
                <Grid>
                    <Grid.Row
                    columns={1}
                    style={{ paddingTop: 0, paddingBottom: 0 }}
                    >
                    {filtrosLocal.map((item, index) => (
                        <Accordion 
                        key={index}
                        style={{ width: "100%", marginBottom: 15 }}>
                            <Accordion.Title
                            style={{
                                width: "100%",
                                border: "1px solid black",
                                padding: "10px 20px",
                                borderRadius: 20,
                            }}
                            active={item.open}
                            index={0}
                            onClick={() => activeDropDown(index)}
                            >
                            <Header as="h5">
                                {item.text}
                                <Icon name="dropdown" style={{ float: "right" }} />
                            </Header>
                            </Accordion.Title>
                            <Accordion.Content active={item.open}>
                                <Grid.Column>
                                    <List link>
                                        <List.Item>
                                            <List.Content>
                                                <List.List style={{ paddingLeft: 15 }}>
                                                    {item.values.map((itemSecond, indexSecond) => ( 
                                                    <List.Item
                                                        key={item.text + indexSecond}
                                                        as="a"
                                                        style={{
                                                            padding: "7px 0px",
                                                            borderBottom: "1px solid #cccccc",
                                                            color: "#2185d0",
                                                        }}
                                                        onClick={()=> insertParam(item.slug, itemSecond.slug)}
                                                    >
                                                        {itemSecond.label}
                                                    </List.Item>
                                                    ))}
                                                </List.List>
                                            </List.Content>
                                        </List.Item>
                                    </List>
                                    {item.slug === 'precio' || item.slug === 'kilometraje' ?
                                    <Grid id="grid-range-price" style={{ marginBottom: 8 }}>
                                        <Grid.Column width={6}>
                                            <Input
                                            type="number"
                                            fluid
                                            value={item.minimo}
                                            onChange={(e, { value }) => changeInputFiltro(value, index, 'minimo')}
                                            placeholder="Mínimo"
                                            />
                                        </Grid.Column>
                                        <Grid.Column
                                            width={1}
                                            style={{
                                            textAlign: "center",
                                            marginTop: 3,
                                            fontSize: 16,
                                            }}
                                        >
                                            -
                                        </Grid.Column>
                                        <Grid.Column width={6}>
                                            <Input
                                            type="number"
                                            fluid
                                            placeholder="Máximo"
                                            value={item.maximo}
                                            onChange={(e, { value }) => changeInputFiltro(value, index, 'maximo')}
                                            />
                                        </Grid.Column>
                                        <Grid.Column width={3}>
                                            <Button
                                            onClick={()=> insertParam(item.slug, item.minimo+':'+item.maximo)}
                                            style={{ marginLeft: 6 }}
                                            circular
                                            icon="angle right"
                                            />
                                        </Grid.Column>
                                    </Grid>
                                    : null}
                                </Grid.Column>
                            </Accordion.Content>
                        </Accordion>
                        )
                    )}
                    </Grid.Row>
                </Grid>
            </Container>
        </Modal>
    )
}
