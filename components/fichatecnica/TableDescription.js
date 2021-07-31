import React, {Fragment} from 'react'
import { Grid, Header, Responsive, Dimmer, Loader, Icon, Container, Form, Button, Modal, Image, Breadcrumb } from "semantic-ui-react";
  
export default function TableDescription({data}) {
    return (
        <Grid columns="equal">
            <Grid.Column width={16} style={{ padding: "30px 10px 15px 30px" }}>
                <Header as="h3" style={{ marginTop: 20, textAlign: 'left' }}>
                    CARACTERÍSTICAS
                </Header>
                <Grid divided="vertically">
                    <Grid.Row columns={2} style={{ paddingBottom: 0 }}>
                        <Grid.Column>
                            <Header as="h5" style={{ color: "gray", marginBottom: 5 }}>
                                Marca:
                            </Header>
                            <p
                                style={{
                                    display: "inline-block",
                                    fontWeight: 700,
                                    fontSize: 14,
                                }}
                            >
                                {data.vehicle.marcaLabel}
                            </p>
                        </Grid.Column>
                        <Grid.Column>
                            <Header as="h5" style={{ color: "gray", marginBottom: 5 }}>
                                Modelo:
                            </Header>
                            <p
                                style={{
                                    display: "inline-block",
                                    fontWeight: 700,
                                    fontSize: 14,
                                }}
                            >
                                {data.vehicle.modeloLabel}
                            </p>
                        </Grid.Column>
                    </Grid.Row>
                    <Grid.Row columns={2} style={{ paddingTop: 0 }}>
                        <Grid.Column>
                            <Header as="h5" style={{ color: "gray", marginBottom: 5 }}>
                                Tipo de vehículo:
                            </Header>
                            <p
                                style={{
                                    display: "inline-block",
                                    fontWeight: 700,
                                    fontSize: 14,
                                }}
                            >
                                {data.vehicle.type}
                            </p>
                        </Grid.Column>
                        <Grid.Column>
                            <Header as="h5" style={{ color: "gray", marginBottom: 5 }}>
                                Título:
                            </Header>
                            <p
                                style={{
                                    display: "inline-block",
                                    fontWeight: 700,
                                    fontSize: 14,
                                }}
                            >
                                {data.vehicle.title}
                            </p>
                        </Grid.Column>
                    </Grid.Row>
                    <Grid.Row columns={2} style={{ paddingTop: 0 }}>
                        <Grid.Column>
                            <Header as="h5" style={{ color: "gray", marginBottom: 5 }}>
                                Precio:
                            </Header>
                            <p
                                style={{
                                    display: "inline-block",
                                    fontWeight: 700,
                                    fontSize: 14,
                                }}
                            >
                                $ {new Intl.NumberFormat("de-DE").format(data.vehicle.price)} COP
                            </p>
                        </Grid.Column>
                        <Grid.Column>
                            <Header as="h5" style={{ color: "gray", marginBottom: 5 }}>
                                Año:
                            </Header>
                            <p
                                style={{
                                    display: "inline-block",
                                    fontWeight: 700,
                                    fontSize: 14,
                                }}
                            >
                                {data.vehicle.year}
                            </p>
                        </Grid.Column>
                    </Grid.Row>
                    <Grid.Row columns={2} style={{ paddingTop: 0 }}>
                        <Grid.Column>
                            <Header as="h5" style={{ color: "gray", marginBottom: 5 }}>
                                Motor:
                            </Header>
                            <p
                                style={{
                                    display: "inline-block",
                                    fontWeight: 700,
                                    fontSize: 14,
                                }}
                            >
                                {new Intl.NumberFormat("de-DE").format(data.vehicle.engine)} C.C.
                            </p>
                        </Grid.Column>
                        <Grid.Column>
                            <Header as="h5" style={{ color: "gray", marginBottom: 5 }}>
                                Potencia:
                            </Header>
                            <p
                                style={{
                                    display: "inline-block",
                                    fontWeight: 700,
                                    fontSize: 14,
                                }}
                            >
                                {new Intl.NumberFormat("de-DE").format(data.vehicle.power)} HP
                            </p>
                        </Grid.Column>
                    </Grid.Row>
                    <Grid.Row columns={2} style={{ paddingTop: 0 }}>
                        <Grid.Column>
                            <Header as="h5" style={{ color: "gray", marginBottom: 5 }}>
                                Torque:
                            </Header>
                            <p
                                style={{
                                    display: "inline-block",
                                    fontWeight: 700,
                                    fontSize: 14,
                                }}
                            >
                                {new Intl.NumberFormat("de-DE").format(data.vehicle.torque)} NM
                            </p>
                        </Grid.Column>
                        <Grid.Column>
                            <Header as="h5" style={{ color: "gray", marginBottom: 5 }}>
                                Tracción:
                            </Header>
                            <p
                                style={{
                                    display: "inline-block",
                                    fontWeight: 700,
                                    fontSize: 14,
                                }}
                            >
                                {data.vehicle.traction}
                            </p>
                        </Grid.Column>
                    </Grid.Row>
                    <Grid.Row columns={2} style={{ paddingTop: 0 }}>
                        <Grid.Column>
                            <Header as="h5" style={{ color: "gray", marginBottom: 5 }}>
                                Tipo de motor:
                            </Header>
                            <p
                                style={{
                                    display: "inline-block",
                                    fontWeight: 700,
                                    fontSize: 14,
                                }}
                            >
                                {data.vehicle.combustibleLabel}
                            </p>
                        </Grid.Column>
                        <Grid.Column>
                            <Header as="h5" style={{ color: "gray", marginBottom: 5 }}>
                                Transmisión:
                            </Header>
                            <p
                                style={{
                                    display: "inline-block",
                                    fontWeight: 700,
                                    fontSize: 14,
                                }}
                            >
                                {data.vehicle.transmisionLabel}
                            </p>
                        </Grid.Column>
                    </Grid.Row>
                    <Grid.Row columns={2} style={{ paddingTop: 0 }}>
                        <Grid.Column>
                            <Header as="h5" style={{ color: "gray", marginBottom: 5 }}>
                                Autonomía:
                            </Header>
                            <p
                                style={{
                                    display: "inline-block",
                                    fontWeight: 700,
                                    fontSize: 14,
                                }}
                            >
                                {new Intl.NumberFormat("de-DE").format(data.vehicle.autonomy)} Km
                            </p>
                        </Grid.Column>
                        <Grid.Column>
                            <Header as="h5" style={{ color: "gray", marginBottom: 5 }}>
                                Rendimiento:
                            </Header>
                            <p
                                style={{
                                    display: "inline-block",
                                    fontWeight: 700,
                                    fontSize: 14,
                                }}
                            >
                                {data.vehicle.performance} Km por Galón
                            </p>
                        </Grid.Column>
                    </Grid.Row>
                    <Grid.Row columns={2} style={{ paddingTop: 0 }}>
                        <Grid.Column>
                            <Header as="h5" style={{ color: "gray", marginBottom: 5 }}>
                                Seguridad en estrellas:
                            </Header>
                            <p
                                style={{
                                    display: "inline-block",
                                    fontWeight: 700,
                                    fontSize: 14,
                                }}
                            >
                                {data.vehicle.security === 0 &&
                                    <Fragment>
                                        <Icon name='star outline' />
                                        <Icon name='star outline' />
                                        <Icon name='star outline' />
                                        <Icon name='star outline' />
                                        <Icon name='star outline' />
                                    </Fragment>
                                }
                                {data.vehicle.security === 1 &&
                                    <Fragment>
                                        <Icon name='star' color="yellow" />
                                        <Icon name='star outline' />
                                        <Icon name='star outline' />
                                        <Icon name='star outline' />
                                        <Icon name='star outline' />
                                    </Fragment>
                                }
                                {data.vehicle.security === 2 &&
                                    <Fragment>
                                        <Icon name='star' color="yellow" />
                                        <Icon name='star' color="yellow" />
                                        <Icon name='star outline' />
                                        <Icon name='star outline' />
                                        <Icon name='star outline' />
                                    </Fragment>
                                }
                                {data.vehicle.security === 3 &&
                                    <Fragment>
                                        <Icon name='star' color="yellow" />
                                        <Icon name='star' color="yellow" />
                                        <Icon name='star' color="yellow" />
                                        <Icon name='star outline' />
                                        <Icon name='star outline' />
                                    </Fragment>
                                }
                                {data.vehicle.security === 4 &&
                                    <Fragment>
                                        <Icon name='star' color="yellow" />
                                        <Icon name='star' color="yellow" />
                                        <Icon name='star' color="yellow" />
                                        <Icon name='star' color="yellow" />
                                        <Icon name='star outline' />
                                    </Fragment>
                                }
                                {data.vehicle.security === 5 &&
                                    <Fragment>
                                        <Icon name='star' color="yellow" />
                                        <Icon name='star' color="yellow" />
                                        <Icon name='star' color="yellow" />
                                        <Icon name='star' color="yellow" />
                                        <Icon name='star' color="yellow" />
                                    </Fragment>
                                }
                            </p>
                        </Grid.Column>
                        <Grid.Column>
                            <Header as="h5" style={{ color: "gray", marginBottom: 5 }}>
                                Número de AirBags:
                            </Header>
                            <p
                                style={{
                                    display: "inline-block",
                                    fontWeight: 700,
                                    fontSize: 14,
                                }}
                            >
                                {data.vehicle.airbags}
                            </p>
                        </Grid.Column>
                    </Grid.Row>
                    <Grid.Row columns={2} style={{ paddingTop: 0 }}>
                        <Grid.Column>
                            <Header as="h5" style={{ color: "gray", marginBottom: 5 }}>
                                Rines:
                            </Header>
                            <p
                                style={{
                                    display: "inline-block",
                                    fontWeight: 700,
                                    fontSize: 14,
                                }}
                            >
                                {data.vehicle.wheels}
                            </p>
                        </Grid.Column>
                        <Grid.Column>
                            <Header as="h5" style={{ color: "gray", marginBottom: 5 }}>
                                Cojinería:
                            </Header>
                            <p
                                style={{
                                    display: "inline-block",
                                    fontWeight: 700,
                                    fontSize: 14,
                                }}
                            >
                                {data.vehicle.cushions}
                            </p>
                        </Grid.Column>
                    </Grid.Row>
                    <Grid.Row columns={2} style={{ paddingTop: 0 }}>
                        <Grid.Column>
                            <Header as="h5" style={{ color: "gray", marginBottom: 5 }}>
                                Capacidad del baúl:
                            </Header>
                            <p
                                style={{
                                    display: "inline-block",
                                    fontWeight: 700,
                                    fontSize: 14,
                                }}
                            >
                                {new Intl.NumberFormat("de-DE").format(data.vehicle.trunk)} L
                            </p>
                        </Grid.Column>
                        <Grid.Column>
                            <Header as="h5" style={{ color: "gray", marginBottom: 5 }}>
                                Peso:
                            </Header>
                            <p
                                style={{
                                    display: "inline-block",
                                    fontWeight: 700,
                                    fontSize: 14,
                                }}
                            >
                                {new Intl.NumberFormat("de-DE").format(data.vehicle.weight)} K
                            </p>
                        </Grid.Column>
                    </Grid.Row>
                    <Grid.Row columns={2} style={{ paddingTop: 0 }}>
                        {data.vehicle.fuel_type &&
                            <Grid.Column>
                                <Header as="h5" style={{ color: "gray", marginBottom: 5 }}>
                                    Tipo de gasolina:
                                </Header>
                                <p
                                    style={{
                                        display: "inline-block",
                                        fontWeight: 700,
                                        fontSize: 14,
                                    }}
                                >
                                    {data.vehicle.fuel_type}
                                </p>
                            </Grid.Column>
                        }
                    </Grid.Row>
                </Grid>
                <Header as="h3" icon>
                    DESCRIPCIÓN
                </Header>
                <p style={{ fontSize: 14 }}>{data.vehicle.description}</p>
            </Grid.Column>
        </Grid>
    )
}
