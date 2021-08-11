import React from 'react'
import { Container, List, Modal, Grid, Header, Icon, Accordion } from "semantic-ui-react";
export default function ModalFiltersMobile({showModal, onClose, filtros}) {
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
    const filtrosLocal = [
        {
            text: "Ubicacion",
            open: false,
            values: mapping_contador(filtros.ubicacion)
        },
        {
            text: "Marcas",
            open: false,
            values: mapping_contador(filtros.marcas)
        },
        {
            text: "Año",
            open: false,
            values: mapping_contador(filtros.anios)
        },
        {
            text: "Tipo de motor",
            open: false,
            values: mapping_contador(filtros.combustible)
        }
    ];
    const activeDropDown = (index) => {
        var val_drop = filtrosLocal[index].open;
        filtrosLocal[index] = !val_drop;
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
                                                        
                                                    >
                                                        {itemSecond.label}
                                                    </List.Item>
                                                    ))}
                                                </List.List>
                                            </List.Content>
                                        </List.Item>
                                    </List>
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
