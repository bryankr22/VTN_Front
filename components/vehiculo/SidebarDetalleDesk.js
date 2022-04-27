import React, { useState } from 'react'
import { Grid, Header, Container, Icon, Button, Form, Dimmer, Loader, Message } from "semantic-ui-react";
import { useCookies } from "react-cookie"
import { useSelector, useDispatch } from 'react-redux';
import { addVehiculo } from '../../store/comparadorSlice';

import axios from 'axios';
import { API_URL, AUTH_URL, favoritos_add_vehiculo } from '../../helpers/constants';
import jwt from 'jsonwebtoken';
import { useRouter } from 'next/router'
import { dark, light } from '../../helpers/colors';
import { normalize } from '../../helpers/dataStructure';

export default function SidebarDetalleDesk({ vehiculo, vehicleFav, diasPublicado, accesorio, id }) {
    const dispatch = useDispatch()
    const router = useRouter();
    const [cookies] = useCookies(['vtn_token']);
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
        axios.post(AUTH_URL + favoritos_add_vehiculo, dataSend, config).then(() => {
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

    const darkMode = useSelector(({ darkMode }) => darkMode.status);
    const colorText = darkMode === light ? dark : light;
    const colorIcon = darkMode === light ? "blue" : light;

    return (
        <Grid.Column style={{ padding: "30px 10px 15px 30px" }}>
            <Dimmer style={{ position: "fixed" }} active={loading}>
                <Loader>{loadingMessage}</Loader>
            </Dimmer>
            <Header as="h1" textAlign="left" style={{ color: colorText, marginBottom: 0 }}>
                {vehiculo.title}
            </Header>
            <Header as='h6' color='grey' style={{ marginTop: 0 }}>Publicado por:{" "}
                <a href={`/vehiculos?vendedor=${normalize(vehiculo.sellerName)}-${vehiculo.sellerId}`}>{vehiculo.sellerName}</a>
            </Header>
            <Header
                textAlign="left"
                as="h2"
                style={{ marginBottom: 20, marginTop: 20 }}
            >
                <Header.Content style={{ color: colorText }}>
                    ${" "}
                    {new Intl.NumberFormat("de-DE").format(
                        vehiculo.precio
                    )}{" "}
                    COP
                    {cookies.vtn_token && vehicleFav && (
                        <Icon
                            id={"icon-fav-" + vehiculo.id}
                            name={vehicleFav.length > 0 ? "heart" : "heart outline"}
                            color={colorIcon}
                            style={{ marginLeft: 80 }}
                            onClick={() => addFavoritos()}

                        />
                    )}
                </Header.Content>
            </Header>
            <Header as="p" style={{ marginTop: 8, color: colorText }}>
                Este vehículo cuenta con:
            </Header>
            <Container style={{ marginTop: 20 }}>
                <Grid centered divided="vertically">
                    <Grid.Row columns={3} style={{ paddingBottom: 0 }}>
                        {vehiculo.permuta == 1 && (
                            <Grid.Column
                                style={{ textAlign: "center", marginBottom: 0 }}
                            >
                                <Header as="h4" icon style={{ fontSize: '1rem', marginBottom: 0, color: colorText }} >
                                    <Icon name="exchange" style={{ marginBottom: 0, color: colorText }} />
                                    Permuta
                                </Header>
                            </Grid.Column>
                        )}
                        {vehiculo.financiacion == 1 && (
                            <Grid.Column style={{ textAlign: "center" }}>
                                <Header as="h4" icon style={{ fontSize: '1rem', color: colorText }}>
                                    <Icon name="wpforms" style={{ color: colorText }} />
                                    Financiación
                                </Header>
                            </Grid.Column>
                        )}
                        {vehiculo.confiable == 1 && (
                            <Grid.Column style={{ textAlign: "center" }}>
                                <Header as="h4" icon style={{ fontSize: '1rem', color: colorText }}>
                                    <Icon name="check" style={{ color: colorText }} />
                                    Verificado
                                </Header>
                            </Grid.Column>
                        )}
                        {vehiculo.blindado == 1 && (
                            <Grid.Column style={{ textAlign: "center" }}>
                                <Header as="h4" icon style={{ fontSize: '1rem', color: colorText }}>
                                    <Icon name="shield" style={{ color: colorText }} />
                                    Blindado
                                </Header>
                            </Grid.Column>
                        )}
                        {vehiculo.peritaje != '0' && (
                            <Grid.Column style={{ textAlign: "center" }}>
                                <Header as="h4" icon style={{ fontSize: '1rem', color: colorText }}>
                                    <Icon name="clipboard check" style={{ color: colorText }} />
                                    Peritaje
                                </Header>
                            </Grid.Column>
                        )}
                    </Grid.Row>
                </Grid>
            </Container>
            <Header as="h3" style={{ fontSize: '1.1rem', marginBottom: 0, color: colorText }}>
                Publicado hace: {diasPublicado} días
            </Header>
            <Header as="h3" style={{ fontSize: '1.1rem', marginbottom: 0, marginTop: 10, color: colorText }}>
                {vehiculo.ciudadLabel},{" "}
                {vehiculo.departamentoLabel}
            </Header>
            <Header as="h3" style={{ fontSize: '1.1rem', marginTop: 10, color: colorText }}>
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
                <Header as="h4" style={{ color: "#fff" }}>
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
