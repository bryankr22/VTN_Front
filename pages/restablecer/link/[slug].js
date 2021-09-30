import React, { useState, useEffect } from 'react';
import { Container, Form, Button, Input, Dimmer, Loader, Message } from 'semantic-ui-react';
import axios from 'axios';
import { useRouter } from 'next/router';

import PublicLayout from '../../../layouts/PublicLayout';
import { API_URL } from '../../../helpers/constants';

export default function restablecer({ data, token }) {
    const router = useRouter();
    const [password, setPassword] = useState('');
    const [confirmPass, setConfirmPass] = useState('');
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState('');
    const [status, setStatus] = useState({
        error: false,
        success: false
    });

    const { status: state } = data;

    const sendForm = () => {
        if (password.length < 8) {
            setMessage("La contraseña debe ser mayor o igual a 8 caracteres.");
            setStatus({
                error: true,
                success: false
            });
            return;
        }

        if (password === confirmPass) {
            setLoading(true);
            const data = {
                pass: password,
                token: token,
            };

            axios.post(`${API_URL}/restablecer-contrasena`, data)
                .then((res) => {
                    setLoading(false);
                    setMessage("Proceso exitoso.");
                    setStatus({
                        error: false,
                        success: true
                    });

                    router.push('/login')
                })
                .catch(() => {
                    setLoading(false);
                    setMessage("No se pudo cambiar la contraseña, intentelo más tarde.");
                    setStatus({
                        error: true,
                        success: false
                    });
                });
        } else {
            setLoading(false);
            setMessage("Las contraseñas deben ser iguales.");
            setStatus({
                error: true,
                success: false
            });
        }

    }

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
                {state &&
                    <Form>
                        <Form.Field>
                            <label>Nueva contraseña</label>
                            <Input
                                type="password"
                                onChange={(e) => setPassword(e.target.value)}
                                fluid
                                placeholder="Contraseña"
                            />
                        </Form.Field>
                        <Form.Field>
                            <label>Confirmar contraseña</label>
                            <Input
                                type="password"
                                onChange={(e) => setConfirmPass(e.target.value)}
                                fluid
                                placeholder="Confirmar contraseña"
                            />
                        </Form.Field>
                        <Button color="red" onClick={sendForm}>
                            RESTABLECER CONTRASEÑA
                        </Button>
                    </Form>
                }
                {!state &&
                    <>
                        <p>Lo sentimos, este link ha caducado o ya no es valido.</p>
                        <Button color="red" onClick={() => router.push('/restablecer')}>
                            IR RESTABLECER CONTRASEÑA
                        </Button>
                    </>
                }
            </Container>

        </PublicLayout>
    )
}
export async function getServerSideProps(context) {
    const res = await axios.get(`${API_URL}/validar-token/${context.params.slug}`);
    const data = await res.data;
    return {
        props: {
            data,
            token: context.params.slug
        },
    }
}