import React, { useState } from 'react'
import { Grid, Header, Container, Icon, Button, Form, Dimmer, Loader, Message } from "semantic-ui-react";
import { useCookies } from "react-cookie"
import { useSelector, useDispatch } from 'react-redux';
import { addVehiculo } from '../../store/comparadorSlice';

import axios from 'axios';
import { API_URL, AUTH_URL, favoritos_add_vehiculo } from '../../helpers/constants';
import jwt from 'jsonwebtoken';
import { useRouter } from 'next/router'

export default function SidebarDetalleDesk({ imagenPrincipal, vehiculo, vehicleFav, diasPublicado, accesorio, id }) {
    const dispatch = useDispatch()
    const router = useRouter();
    const [cookies, setCookie] = useCookies(['vtn_token']);
    const compareList = useSelector(({ comparador }) => comparador.vehiculos);
    const isOnStorage = (item) => {
        return compareList.some((element) => element.id === item.id);
    }
    const addComparar = (item) => {
        //console.log(">>>>>", item);
        if (compareList.length < 3) {
            dispatch(addVehiculo(item))
        } else {
            //setCompare('0');
        }
        localStorage.setItem('compareVehiculos', '1')
        window.location.href = '/vehiculos';
        return;
    }
    const [loading, setLoading] = useState(false);
    const [loadingMessage, setLoadingMessage] = useState('');
    const [telContactoForm, setTelContactoForm] = useState("");
    const [msjContactoForm, setMsjContactoForm] = useState("");
    const [checked, setChecked] = useState(false);
    const [alert, setAlert] = useState({});
    const addFavoritos = () => {
        setLoading(true);
        setLoadingMessage("Agregando a favoritos...");
        const cookie = cookies.vtn_token;
        const decoded = jwt.verify(cookie, 'vendetunave2021');
        const config = {
            headers: { Authorization: `Bearer ${decoded.token_server.access_token}` }
        };
        const user_id = decoded.user.id;
        const dataSend = {
            idUser: user_id,
            idVehicle: vehiculo.id,
            state: true
        };
        axios.post(AUTH_URL + favoritos_add_vehiculo, dataSend, config).then((res) => {
            setLoading(false);
            router.push('/usuario/favoritos');
        })
    }

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

        setLoading(true);
        setLoadingMessage("");
        const data = { telContactoForm, msjContactoForm, id }
        axios.post(API_URL + '/form_contact', data).then((res) => {
            const status = res.data.status
            setAlert({
                error: !status,
                success: status,
                message: res.data.message
            });
            setLoading(false);
        });
    }
    return (
        <Grid.Column style={{ padding: "30px 10px 15px 30px" }}>
            <Dimmer style={{ position: "fixed" }} active={loading}>
                <Loader>{loadingMessage}</Loader>
            </Dimmer>
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
                    {cookies.vtn_token && vehicleFav && (
                        <Icon
                            id={"icon-fav-" + vehiculo.id}
                            name={vehicleFav.length > 0 ? "heart" : "heart outline"}
                            color="blue"
                            style={{ marginLeft: 80 }}
                            onClick={() => addFavoritos()}

                        />
                    )}
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
                    {compareList.length < 3 && !isOnStorage(vehiculo) &&
                        <Button
                            onClick={() => addComparar(vehiculo)}
                            fluid
                            primary
                            style={{ borderRadius: 20 }}>Comparar</Button>
                    }
                </>
            )}
            <Container
                style={{ marginTop: 30, background: "gray", padding: 25 }}
            >
                {(alert.success || alert.error) && (
                    <Message
                        positive={alert.success}
                        negative={alert.error}
                        content={alert.message}
                    />
                )}
                <Header as="h5" style={{ color: "#fff" }}>
                    CONTACTA AL VENDEDOR
                </Header>
                <Form inverted>
                    <Form.Input
                        fluid
                        label="* Teléfono contacto"
                        placeholder="Comprador"
                        onChange={(e, { value }) => setTelContactoForm(value)}
                    />
                    <Form.TextArea
                        label="* Mensaje"
                        onChange={(e, { value }) => setMsjContactoForm(value)}
                    />
                    <Form.Checkbox
                        onChange={() => setChecked(!checked)}
                        label="Aceptar los TyC"
                    />
                    <Form.Button
                        color="blue"
                        onClick={sendFormContact}
                    >
                        ENVIAR MENSAJE
                    </Form.Button>
                </Form>
            </Container>
        </Grid.Column>
    )
}
