import React from 'react'
import { Grid, Header, Container, Icon, Button, Form } from "semantic-ui-react";
export default function SidebarDetalleDesk({ vehiculo, diasPublicado, accesorio }) {
    return (
        <Grid.Column style={{ padding: "30px 10px 15px 30px" }}>
            <Header as="h1" textAlign="left">
                {vehiculo.title}
            </Header>
            <Header
                textAlign="left"
                as="h1"
                style={{ marginBottom: 20, marginTop: 20 }}
            >
                <Header.Content>
                    ${" "}
                    {new Intl.NumberFormat("de-DE").format(
                        vehiculo.precio
                    )}{" "}
                    COP
                </Header.Content>
            </Header>
            <Header as="h6" style={{ marginTop: 8 }}>
                Este vehículo cuenta con:
            </Header>
            <Container style={{ marginTop: 20 }}>
                <Grid centered divided="vertically">
                    <Grid.Row columns={3} style={{ paddingBottom: 0 }}>
                        {vehiculo.permuta == 1 && (
                            <Grid.Column
                                style={{ textAlign: "center", marginBottom: 0 }}
                            >
                                <Header as="h6" icon style={{ marginBottom: 0 }}>
                                    <Icon name="exchange" style={{ marginBottom: 0 }} />
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
            </Container>
            <Header as="h5" style={{ marginBottom: 0 }}>
                Publicado hace: {diasPublicado} días
            </Header>
            <Header as="h5" style={{ marginbottom: 0, marginTop: 10 }}>
                {vehiculo.ciudadLabel},{" "}
                {vehiculo.departamentoLabel}
            </Header>
            <Header as="h5" style={{ marginTop: 10 }}>
                Teléfono:{" "}
                <b style={{ fontSize: 20 }}>{vehiculo.contacto}</b>
            </Header>
            {accesorio ?? (
            <>
                <br />
                <Button
                    as='a'
                    color="green"
                    fluid
                    href={"https://api.whatsapp.com/send?phone=57" + vehiculo.contacto + "&text=Hola,%20estoy%20interesado.&source=vendetunave.co&data="}
                    target='_blank'
                    style={{ borderRadius: 20 }}
                >
                    WhatsApp
                </Button>
                <br />
                <Button 
                fluid  
                primary 
                style={{ borderRadius: 20 }}>Comparar</Button>
            </>
            )}
            <Container
            style={{ marginTop: 30, background: "gray", padding: 25 }}
            >
                <Header as="h5" style={{ color: "#fff" }}>
                    CONTACTA AL VENDEDOR
                </Header>
                <Form inverted>
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
            </Container>
        </Grid.Column>
    )
}
