import React from 'react'
import PublicLayout from '../layouts/PublicLayout'
import { Container, Header, Form, Select, Button, Input, Dimmer, Loader } from 'semantic-ui-react'
export default function restablecer() {
    return (
        <PublicLayout>
            <Container style={{ paddingTop: 66, minHeight: 482 }} text>
                <p>
                    ¿Perdiste tu contraseña? Por favor, introduce tu nombre de usuario o correo electrónico.
                    Recibirás un enlace para crear una contraseña nueva por correo electrónico.
                </p>
                <Form>
                    <Form.Field>
                        <label>Correo electrónico</label>
                        <Input fluid placeholder='E-mail' />
                    </Form.Field>
                    <Button color='red'>RESTABLECER CONTRASEÑA</Button>
                </Form>
            </Container>
        </PublicLayout>
    )
}
