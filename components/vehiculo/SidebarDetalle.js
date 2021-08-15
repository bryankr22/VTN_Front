import React from 'react'
import { Grid, Header, Icon, Container, Form, Button, Modal } from "semantic-ui-react";
import { useCookies } from "react-cookie"
import { useSelector, useDispatch } from 'react-redux';
import { addVehiculo } from '../../store/comparadorSlice';
export default function SidebarDetalle({ vehiculo }) {
    const dispatch = useDispatch()
    const [cookies, setCookie] = useCookies(['vtn_token']);
    const vehiculoFav = [];
    const compareList = useSelector(({ comparador }) => comparador.vehiculos);
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
    return (
        <Container style={{ marginTop: 20 }}>
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
                    style={{ marginTop: 8, marginBottom: 30 }}
                >
                    <Icon
                    id={"icon-fav-" + vehiculo.id}
                    name={ vehiculoFav.length > 0 ? "heart" : "heart outline" }
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
                            >
                                Contactar al vendedor
                            </Button>
                            <Modal
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
                        </Grid.Column>
                        <Grid.Column>
                            <Button
                                color="blue"
                                fluid
                                as="a"
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
