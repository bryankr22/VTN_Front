import React, { useState } from 'react';
import { Container, Form, Button, Input, Dimmer, Loader, Message } from 'semantic-ui-react';
import { useSelector } from 'react-redux';
import axios from 'axios';

import PublicLayout from '../../layouts/PublicLayout';
import { API_URL } from '../../helpers/constants';
import { light } from '../../helpers/colors';

export default function restablecer() {
    const [email, setEmail] = useState('');
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState('');
    const [status, setStatus] = useState({
        error: false,
        success: false
    })

    const sendForm = () => {
        const reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        if (email !== '' && reg.test(email) === true) {
            setLoading(true);

            axios.post(`${API_URL}/generar-restablecer-contrasena`, { email })
                .then(res => {
                    setLoading(false);

                    if (!res.data.status) {
                        setMessage(res.data.message);
                        setStatus({
                            error: true,
                            success: false
                        });
                    } else {
                        setMessage('Hemos enviado un correo a tu email con información para restablecer tu contraseña.');
                        setStatus({
                            error: false,
                            success: true
                        });
                    }

                }).catch(error => {
                })
        } else {
            setMessage('Ingrese un email valido.');
            setStatus({
                error: true,
                success: false
            });
        }

    }

    const darkMode = useSelector(({ darkMode }) => darkMode.status);
    const colorText = darkMode === light ? undefined : light;

    return (
        <PublicLayout>
            <Dimmer style={{ position: "fixed" }} active={loading}>
                <Loader>Cargando...</Loader>
            </Dimmer>
            <Container style={{ paddingTop: 66, minHeight: 482 }} text>
                {(status.error || status.success) &&
                    <Message
                        error={status.error}
                        positive={status.success}
                        content={message}
                    />
                }
                <p style={{ color: colorText }}>
                    ¿Perdiste tu contraseña? Por favor, introduce tu nombre de usuario o correo electrónico.
                    Recibirás un enlace para crear una contraseña nueva por correo electrónico.
                </p>
                <Form>
                    <Form.Field>
                        <label>Correo electrónico</label>
                        <Input fluid placeholder='E-mail' onChange={(e) => setEmail(e.target.value)} />
                    </Form.Field>
                    <Button color='red' onClick={sendForm}>RESTABLECER CONTRASEÑA</Button>
                </Form>
            </Container>
        </PublicLayout>
    )
}
