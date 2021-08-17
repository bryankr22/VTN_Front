import React from 'react'
import { Grid, Header, Icon, Container, Form, Button, Modal } from "semantic-ui-react";
export default function ModalContacto({showModal, onClose}) {
    return (
        <Modal
            size="tiny"
            open={showModal}
            onClose={onClose}
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
    )
}
