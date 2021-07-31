import React from 'react'
import PublicLayout from '../layouts/PublicLayout';
import { Container, Header, Form, Select, Button, Dropdown, Dimmer, Loader, } from "semantic-ui-react";
export default function crear_pregunta() {
    return (
        <PublicLayout>
            <Container style={{ paddingTop: 25 }} text>
                <Header as="h2">COMUNIDAD</Header>
                <Header as="h3" dividing>
                    Crear una pregunta
                </Header>
                <p style={{ textAlign: "justify" }}>
                    Ejemplo: ¿Con 35 millones que vehículo podría comprar, que sea
                    familiar 4 puertas y económico? Después de encender mi vehículo, 10
                    minutos luego, sigue botando humo blanco. ¿Cuál será el motivo?
                </p>

                <Form>
                    <Form.Field>
                        <label>TÍTULO</label>
                        <input
                            id="titulo"
                        />
                    </Form.Field>
                    <Form.TextArea
                        id="descripcion"
                        label="DESCRIPCIÓN"
                    />
                    <Form.Field>
                        <label>ETIQUETAS</label>
                        <Dropdown
                        id="tags"
                        search
                        selection
                        fluid
                        multiple
                        allowAdditions
                        />
                    </Form.Field>
                    <Button
                    color="blue"
                    type="submit"
                    floated="right"
                    >
                        PUBLICAR
                    </Button>
                </Form>
            </Container>
        </PublicLayout>
    )
}
