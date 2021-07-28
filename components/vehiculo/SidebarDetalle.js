import React from 'react'
import { Grid, Header, Icon, Container, Form, Button, Modal } from "semantic-ui-react";
export default function SidebarDetalle({ vehiculo }) {
    return (
        <Container style={{ marginTop: 20 }}>
            <Header as="h6" disabled>
                <div style={{ display: 'inline-block', width: '50%' }}>
                    {vehiculo.ano} - {" " + new Intl.NumberFormat("de-DE").format(vehiculo.kilometraje)}{" "}Km
                </div>
                <div style={{ display: 'inline-block', fontSize: 18, color: '#5c5c5c', width: '50%', textAlign: 'end' }}>
                    <Icon name="eye" style={{ marginRight: 5 }} />
                    <p style={{ display: 'inline' }}>{new Intl.NumberFormat("de-DE").format(vehiculo.views)}</p>
                </div>
            </Header>
            <Header as="h2" style={{ marginTop: 8 }}>
                {vehiculo.title}
            </Header>
            <Header as="h2" style={{ marginTop: 8 }}>
                ${" "}
                {new Intl.NumberFormat("de-DE").format(vehiculo.precio)}{" "}
                COP
            </Header>
            <Header as="h6" style={{ marginTop: 8 }}>
                SKU:
                <p
                    style={{
                        display: "inline-block",
                        fontWeight: "normal",
                        marginLeft: 5,
                    }}
                >
                    {vehiculo.sku}
                </p>
            </Header>
            {/**this.state.mostrar && (
                <Header as="h6" style={{ marginTop: 8 }}>
                    Este vehículo cuenta con:
                </Header>
            )**/}
            <Grid centered divided="vertically" style={{ marginTop: 20 }}>
                <Grid.Row columns={3}>
                    {vehiculo.permuta == 1 && (
                        <Grid.Column style={{ textAlign: "center" }}>
                            <Header as="h6" icon>
                                <Icon name="exchange" />
                                Permuta
                            </Header>
                        </Grid.Column>
                    )}
                    {vehiculo.financiacion == 1 && (
                        <Grid.Column style={{ textAlign: "center" }}>
                            <Header as="h6" icon>
                                <Icon name="wpforms" />
                                Financiación
                            </Header>
                        </Grid.Column>
                    )}
                    {vehiculo.confiable == 1 && (
                        <Grid.Column style={{ textAlign: "center" }}>
                            <Header as="h6" icon>
                                <Icon name="check" />
                                Verificado
                            </Header>
                        </Grid.Column>
                    )}
                </Grid.Row>
            </Grid>
            <Container
                fluid
                style={{ margin: "0 !important", textAlign: "center" }}
            >
                <Grid>
                    <Grid.Row columns={2} style={{ maxHeight: 78 }}>
                        <Grid.Column>
                            <Button
                                color="blue"
                                fluid
                                style={{ borderRadius: 20, height: 64 }}
                            >
                                Contactar al vendedor
                            </Button>
                            <Modal
                                closeIcon
                            >
                                <Modal.Content>
                                    <Header as="h5">CONTACTA AL VENDEDOR</Header>
                                    <Form>
                                        <Form.Input
                                            fluid
                                            label="* Teléfono contacto"
                                            placeholder="Comprador"
                                        />
                                        <Form.TextArea
                                            label="* Mensaje"
                                        />
                                        <Form.Checkbox
                                            label="Aceptar los TyC"
                                        />
                                        <Form.Button
                                            color="blue"
                                        >
                                            ENVIAR MENSAJE
                                        </Form.Button>
                                    </Form>
                                </Modal.Content>
                            </Modal>
                        </Grid.Column>
                        <Grid.Column>
                            <Button
                                color="blue"
                                fluid
                                as="a"
                                style={{ borderRadius: 20, height: 64, display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                            >
                                Llamar
                            </Button>
                        </Grid.Column>
                    </Grid.Row>
                </Grid>
                <br />
                <Button
                    as='a'
                    color="green"
                    fluid
                    target='_blank'
                    style={{ borderRadius: 20 }}
                >
                    WhatsApp
                </Button>
                <br />
                <Button fluid primary style={{ borderRadius: 20 }}>Comparar</Button>
            </Container>
        </Container>
    )
}