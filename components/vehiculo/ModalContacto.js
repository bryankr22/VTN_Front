import React, { useState } from 'react';
import { Grid, Header, Icon, Container, Form, Button, Modal, Message } from "semantic-ui-react";
import axios from 'axios';
import { API_URL } from '../../helpers/constants';

export default function ModalContacto({showModal, onClose, id}) {

    const [telContactoForm, setTelContactoForm] = useState("");
    const [msjContactoForm, setMsjContactoForm] = useState("");
    const [checked, setChecked] = useState(false);
    const [alert, setAlert] = useState({});


    const sendFormContact = () => {
        if (!checked) {
            setAlert({
                error: true,
                success: false,
                message: 'Acepta los términos y condiciones.'
            });
            return;
        }
        if (telContactoForm === '' || msjContactoForm === '') {
            setAlert({
                error: true,
                success: false,
                message: 'Por favor llena todos los campos.'
            });
            return;
        }

        const data = { telContactoForm, msjContactoForm, id }
        axios.post(API_URL + '/form_contact', data).then((res) => {
            const status = res.data.status
            setAlert({
                error: !status,
                success: status,
                message: res.data.message
            });
        });
    }

    return (
        <Modal
            size="tiny"
            open={showModal}
            onClose={onClose}
            closeIcon
        >
            <Modal.Content>
                <Header as="h5">CONTACTA AL VENDEDOR</Header>
                {(alert.success || alert.error) && (
                    <Message
                        positive={alert.success}
                        negative={alert.error}
                        content={alert.message}
                    />
                )}
                <Form>
                    <Form.Input
                        fluid
                        label="* Teléfono contacto"
                        onChange={(e, { value }) => setTelContactoForm(value)}
                        placeholder="Comprador"
                    />
                    <Form.TextArea
                        label="* Mensaje"
                        onChange={(e, { value }) => setMsjContactoForm(value)}
                    />
                    <Form.Checkbox
                        label="Aceptar los TyC"
                        onChange={() => setChecked(!checked)}
                    />
                    <Form.Button
                        color="blue"
                        onClick={sendFormContact}
                    >
                        ENVIAR MENSAJE
                    </Form.Button>
                </Form>
            </Modal.Content>
        </Modal>
    )
}
