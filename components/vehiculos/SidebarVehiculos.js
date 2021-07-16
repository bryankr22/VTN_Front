import React, {useState} from 'react'
import { Container, Input, List, Modal, Grid, Checkbox, Header, Button, Label, Icon } from "semantic-ui-react";
export default function SidebarVehiculos() {
    return (
        <Grid.Column style={{ paddingLeft: "3%" }} width={3}>
            <Header style={{ margin: 0 }} as="h3">
                {'Filtros seleccionados...'}
            </Header>
            <Header style={{ margin: 0 }} as="h3">
               DATA resultados
            </Header>
            <Container>
                <Label as="a" style={{ marginBottom: 5 }}>
                    {'FiltroDATA'}
                    <Icon
                        name="delete"
                        onClick={() => console.log("Eliminar") }
                    />
                </Label>
            </Container>
            <Container style={{ padding: "20px 20px" }}>
                <List link>
                    <List.Item>
                        <List.Content>
                            <List.Header>
                                <Header as="h5">Filtro1</Header>
                            </List.Header>
                            <List.List style={{ paddingLeft: 15 }}>
                                <List.Item as="a">
                                    {'Filtro1'}
                                </List.Item>
                                <List.Item as="a">
                                    Ver Todos
                                </List.Item>
                            </List.List>
                        </List.Content>
                    </List.Item>
                </List>

                <List link>
                    <List.Item>
                        <List.Content>
                            <List.Header>
                                <Header as="h5">Categoría</Header>
                            </List.Header>
                            <List.List style={{ paddingLeft: 15 }}>
                                <List.Item as="a">
                                    {'Filtro1'}
                                </List.Item>
                            </List.List>
                        </List.Content>
                    </List.Item>
                </List>
                <List link>
                    <List.Item>
                        <List.Content>
                            <List.Header>
                                <Header as="h5">Marcas</Header>
                            </List.Header>
                            <List.List style={{ paddingLeft: 15 }}>
                                <List.Item as="a">
                                    {'Filtro1'}
                                </List.Item>
                                <List.Item as="a">
                                    Ver Todos
                                </List.Item>
                            </List.List>
                        </List.Content>
                    </List.Item>
                </List>
                <List link>
                    <List.Item>
                        <List.Content>
                            <List.Header>
                                <Header as="h5">Tipo de Motor</Header>
                            </List.Header>
                            <List.List style={{ paddingLeft: 15 }}>
                                <List.Item as="a">
                                    {'Filtro1'}
                                </List.Item>
                            </List.List>
                        </List.Content>
                    </List.Item>
                </List>
                <List link>
                    <List.Item>
                        <List.Content>
                            <List.Header>
                                <Header as="h5">Año</Header>
                            </List.Header>
                            <List.List style={{ paddingLeft: 15 }}>
                                <List.Item as="a">
                                    {'Filtro1'}
                                </List.Item>
                                <List.Item as="a">
                                    Ver Todos
                                </List.Item>
                            </List.List>
                        </List.Content>
                    </List.Item>
                </List>

                <List link>
                    <List.Item>
                        <List.Content>
                            <List.Header>
                                <Header as="h5">Estado</Header>
                            </List.Header>
                            <List.List style={{ paddingLeft: 15 }}>
                                <List.Item
                                    as="a"
                                >
                                    Nuevo
                                </List.Item>
                                <List.Item
                                    as="a"
                                >
                                    Usado
                                </List.Item>
                            </List.List>
                        </List.Content>
                    </List.Item>
                </List>
                <List link>
                    <List.Item>
                        <List.Content>
                            <List.Header>
                                <Header as="h5">Transmision</Header>
                            </List.Header>
                            <List.List style={{ paddingLeft: 15 }}>
                                <List.Item
                                    as="a"
                                >
                                    Automatica
                                </List.Item>
                                <List.Item
                                    as="a"
                                >
                                    Mecanica
                                </List.Item>
                            </List.List>
                        </List.Content>
                    </List.Item>
                </List>
                <Checkbox
                    name="promocion"
                    label="Promoción"
                />
                <Checkbox
                    name="permuta"
                    label="Permuta"
                />
                <Checkbox
                    name="blindaje"
                    label="Blindaje"
                />

                <List link style={{ marginBottom: 0 }}>
                    <List.Item style={{ marginBottom: 0 }}>
                        <List.Content>
                            <List.Header>
                                <Header as="h5">Kilometraje</Header>
                            </List.Header>
                            <List.List>
                                <List.Item
                                    as="a"
                                >
                                    De DATA
                                </List.Item>
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
                <List link style={{ marginBottom: 0 }}>
                    <List.Item style={{ marginBottom: 0 }}>
                        <List.Content>
                            <List.Header>
                                <Header as="h5">Precio</Header>
                            </List.Header>
                            <List.List>
                                <List.Item
                                    as="a"
                                >
                                    De DATA
                                </List.Item>
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
            </Container>
        </Grid.Column>
    )
}
