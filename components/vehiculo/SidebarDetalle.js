import React, {useState} from 'react'
import { Grid, Header, Icon, Container, Form, Button, Modal, Dimmer, Loader } from "semantic-ui-react";
import { useCookies } from "react-cookie"
import { useSelector, useDispatch } from 'react-redux';
import { addVehiculo } from '../../store/comparadorSlice';
import ModalContacto from './ModalContacto';

import axios from 'axios';
import { AUTH_URL, favoritos_add_vehiculo } from '../../helpers/constants';
import jwt from 'jsonwebtoken';
import { useRouter } from 'next/router'

export default function SidebarDetalle({ vehiculo, vehicleFav }) {
    const dispatch = useDispatch()
    const router = useRouter()
    const [cookies, setCookie] = useCookies(['vtn_token']);
    const vehiculoFav = [];
    const compareList = useSelector(({ comparador }) => comparador.vehiculos);
    const [modalContacto, setModalContacto] = useState(false);
    const isOnStorage = (item) => {
        return compareList.some((element) => element.id === item.id);
    }
    const addComparar = (item) => {
        //console.log(">>>>>", item);
        if(compareList.length < 3){
            dispatch(addVehiculo(item))
        }else{
            //setCompare('0');
        }
        window.location.href = '/vehiculos';
        return;
    }
    const [loading, setLoading] = useState(false);
    const addFavoritos = () => {
        setLoading(true);
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
    return (
        <Container style={{ marginTop: 20 }}>
            <Dimmer style={{ position: "fixed" }} active={loading}>
                <Loader>Agregando a favoritos...</Loader>
            </Dimmer>
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
            {cookies.vtn_token && (
                <Header
                    as="h4"
                    textAlign="center"
                    onClick={() => addFavoritos()}
                    style={{ marginTop: 8, marginBottom: 30 }}
                >
                    <Icon
                    id={"icon-fav-" + vehiculo.id}
                    name={ vehicleFav.length > 0 ? "heart" : "heart outline" }
                    color="blue"
                    />
                    Agregar a favoritos
                </Header>
            )}
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
                                onClick={() => setModalContacto(true)}
                            >
                                Contactar al vendedor
                            </Button>
                            <ModalContacto 
                            showModal={modalContacto}
                            onClose={() => setModalContacto(!modalContacto)}
                            />
                        </Grid.Column>
                        <Grid.Column>
                            <Button
                                color="blue"
                                fluid
                                as="a"
                                href={"tel:" + vehiculo.contacto}
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
                    href={"https://api.whatsapp.com/send?phone=57" + vehiculo.contacto + "&text=Hola,%20estoy%20interesado.&source=vendetunave.co&data="}
                >
                    WhatsApp
                </Button>
                <br />
                { compareList.length < 3 && !isOnStorage(vehiculo) &&
                    <Button
                    onClick={() => addComparar(vehiculo)}
                    fluid  
                    primary 
                    style={{ borderRadius: 20 }}>Comparar</Button> 
                }
            </Container>
        </Container>
    )
}
