import React, { useEffect, useState, Fragment } from 'react'
import { Container, Header, Grid, Image, Button, Divider, Icon } from 'semantic-ui-react';

export default function CompareFicha({ vehiclesCompare }) {
    const [listado, setListado] = useState([]);
    const pathS3 = "https://d3bmp4azzreq60.cloudfront.net/fit-in/300x300/vendetunave/images/ficha-tecnica/";
    useEffect(() => {
        if (vehiclesCompare.length == 0) {
            setListado([{ id: 0 }, { id: 0 }, { id: 0 }]);
        } else {
            setListado(vehiclesCompare)
        }
    }, [])
    return (
        <Grid columns={3} divided id="grid-compare">
            <Grid.Row style={{ textAlign: 'left' }}>
                {listado.map((vehicle, index) => {
                    if (vehicle.id !== 0) {
                        return (
                            <Grid.Column
                                key={index}
                            >
                                <Button
                                    primary
                                    floated='right'
                                    style={{ marginBottom: 10 }}
                                >
                                    Remover
                                </Button>
                                <Image
                                    centered
                                    style={{ height: 200, objectFit: 'none', width: '100%' }}
                                    src={pathS3 + vehicle.nameImage + "." + vehicle.extension}
                                />
                                {index === 0 &&
                                    <Header as='h2'>Características</Header>
                                }
                                {index !== 0 &&
                                    <Header as='h2' style={{ color: 'transparent' }}>.</Header>
                                }

                                {index === 0 &&
                                    <Header as='h3'>Nombre</Header>
                                }
                                {index !== 0 &&
                                    <Header as='h3' style={{ color: 'transparent' }}>.</Header>
                                }

                                <p
                                    style={{
                                        fontWeight: 700,
                                        fontSize: 14,
                                        marginLeft: 15,
                                        color: 'gray',
                                        height: 35
                                    }}
                                >
                                    {vehicle.title}
                                </p>

                                {index === 0 &&
                                    <Header as='h3'>Precio</Header>
                                }
                                {index !== 0 &&
                                    <Header as='h3' style={{ color: 'transparent' }}>.</Header>
                                }

                                <p
                                    style={{
                                        fontWeight: 700,
                                        fontSize: 14,
                                        marginLeft: 15,
                                        color: 'gray'
                                    }}
                                >
                                    ${new Intl.NumberFormat("de-DE").format(vehicle.price)} COP
                                </p>

                                {index === 0 &&
                                    <Header as='h3'>Potencia</Header>
                                }
                                {index !== 0 &&
                                    <Header as='h3' style={{ color: 'transparent' }}>.</Header>
                                }

                                <p
                                    style={{
                                        fontWeight: 700,
                                        fontSize: 14,
                                        marginLeft: 15,
                                        color: 'gray'
                                    }}
                                >
                                    {new Intl.NumberFormat("de-DE").format(vehicle.power)} HP
                                </p>

                                {index === 0 &&
                                    <Header as='h3'>Marca</Header>
                                }
                                {index !== 0 &&
                                    <Header as='h3' style={{ color: 'transparent' }}>.</Header>
                                }

                                <p
                                    style={{
                                        fontWeight: 700,
                                        fontSize: 14,
                                        marginLeft: 15,
                                        color: 'gray'
                                    }}
                                >
                                    {vehicle.marcaLabel}
                                </p>

                                {index === 0 &&
                                    <Header as='h3'>Año</Header>
                                }
                                {index !== 0 &&
                                    <Header as='h3' style={{ color: 'transparent' }}>.</Header>
                                }

                                <p
                                    style={{
                                        fontWeight: 700,
                                        fontSize: 14,
                                        marginLeft: 15,
                                        color: 'gray'
                                    }}
                                >
                                    {vehicle.year}
                                </p>

                                {index === 0 &&
                                    <Header as='h3'>Modelo</Header>
                                }
                                {index !== 0 &&
                                    <Header as='h3' style={{ color: 'transparent' }}>.</Header>
                                }

                                <p
                                    style={{
                                        fontWeight: 700,
                                        fontSize: 14,
                                        marginLeft: 15,
                                        color: 'gray'
                                    }}
                                >
                                    {vehicle.modeloLabel}
                                </p>

                                {index === 0 &&
                                    <Header as='h3'>Torque</Header>
                                }
                                {index !== 0 &&
                                    <Header as='h3' style={{ color: 'transparent' }}>.</Header>
                                }

                                <p
                                    style={{
                                        fontWeight: 700,
                                        fontSize: 14,
                                        marginLeft: 15,
                                        color: 'gray'
                                    }}
                                >
                                    {new Intl.NumberFormat("de-DE").format(vehicle.torque)} NM
                                </p>

                                {index === 0 &&
                                    <Header as='h3'>Motor</Header>
                                }
                                {index !== 0 &&
                                    <Header as='h3' style={{ color: 'transparent' }}>.</Header>
                                }

                                <p
                                    style={{
                                        fontWeight: 700,
                                        fontSize: 14,
                                        marginLeft: 15,
                                        color: 'gray'
                                    }}
                                >
                                    {new Intl.NumberFormat("de-DE").format(vehicle.engine)} C.C.
                                </p>

                                {index === 0 &&
                                    <Header as='h3'>Tipo de motor</Header>
                                }
                                {index !== 0 &&
                                    <Header as='h3' style={{ color: 'transparent' }}>.</Header>
                                }

                                <p
                                    style={{
                                        fontWeight: 700,
                                        fontSize: 14,
                                        marginLeft: 15,
                                        color: 'gray'
                                    }}
                                >
                                    {vehicle.combustibleLabel}
                                </p>

                                {index === 0 &&
                                    <Header as='h3'>Tipo de gasolina:</Header>
                                }
                                {index !== 0 &&
                                    <Header as='h3' style={{ color: 'transparent' }}>.</Header>
                                }

                                <p
                                    style={{
                                        fontWeight: 700,
                                        fontSize: 14,
                                        marginLeft: 15,
                                        color: 'gray'
                                    }}
                                >
                                    {vehicle.fuel_type}
                                </p>

                                {index === 0 &&
                                    <Header as='h3'>Capacidad del baúl</Header>
                                }
                                {index !== 0 &&
                                    <Header as='h3' style={{ color: 'transparent' }}>Capacidad del baúl</Header>
                                }

                                <p
                                    style={{
                                        fontWeight: 700,
                                        fontSize: 14,
                                        marginLeft: 15,
                                        color: 'gray'
                                    }}
                                >
                                    {new Intl.NumberFormat("de-DE").format(vehicle.trunk)} L
                                </p>

                                {index === 0 &&
                                    <Header as='h3'>Transmisión</Header>
                                }
                                {index !== 0 &&
                                    <Header as='h3' style={{ color: 'transparent' }}>.</Header>
                                }

                                <p
                                    style={{
                                        fontWeight: 700,
                                        fontSize: 14,
                                        marginLeft: 15,
                                        color: 'gray'
                                    }}
                                >
                                    {vehicle.transmisionLabel}
                                </p>

                                {index === 0 &&
                                    <Header as='h3'>Tracción</Header>
                                }
                                {index !== 0 &&
                                    <Header as='h3' style={{ color: 'transparent' }}>.</Header>
                                }

                                <p
                                    style={{
                                        fontWeight: 700,
                                        fontSize: 14,
                                        marginLeft: 15,
                                        color: 'gray'
                                    }}
                                >
                                    {vehicle.traction}
                                </p>

                                {index === 0 &&
                                    <Header as='h3'>Autonomía</Header>
                                }
                                {index !== 0 &&
                                    <Header as='h3' style={{ color: 'transparent' }}>.</Header>
                                }

                                <p
                                    style={{
                                        fontWeight: 700,
                                        fontSize: 14,
                                        marginLeft: 15,
                                        color: 'gray'
                                    }}
                                >
                                    {new Intl.NumberFormat("de-DE").format(vehicle.autonomy)} Km
                                </p>

                                {index === 0 &&
                                    <Header as='h3'>Rendimiento</Header>
                                }
                                {index !== 0 &&
                                    <Header as='h3' style={{ color: 'transparent' }}>.</Header>
                                }

                                <p
                                    style={{
                                        fontWeight: 700,
                                        fontSize: 14,
                                        marginLeft: 15,
                                        color: 'gray'
                                    }}
                                >
                                    {new Intl.NumberFormat("de-DE").format(vehicle.performance)}Km por Galón
                                </p>

                                {index === 0 &&
                                    <Header as='h3'>Seguridad en estrellas</Header>
                                }
                                {index !== 0 &&
                                    <Header as='h3' style={{ color: 'transparent' }}>Seguridad en estrellas</Header>
                                }

                                <p
                                    style={{
                                        display: "inline-block",
                                        fontWeight: 700,
                                        fontSize: 14,
                                        marginLeft: 15,
                                        color: 'gray'
                                    }}
                                >
                                    {vehicle.security === 0 &&
                                        <Fragment>
                                            <Icon name='star outline' />
                                            <Icon name='star outline' />
                                            <Icon name='star outline' />
                                            <Icon name='star outline' />
                                            <Icon name='star outline' />
                                        </Fragment>
                                    }
                                    {vehicle.security === 1 &&
                                        <Fragment>
                                            <Icon name='star' color="yellow" />
                                            <Icon name='star outline' />
                                            <Icon name='star outline' />
                                            <Icon name='star outline' />
                                            <Icon name='star outline' />
                                        </Fragment>
                                    }
                                    {vehicle.security === 2 &&
                                        <Fragment>
                                            <Icon name='star' color="yellow" />
                                            <Icon name='star' color="yellow" />
                                            <Icon name='star outline' />
                                            <Icon name='star outline' />
                                            <Icon name='star outline' />
                                        </Fragment>
                                    }
                                    {vehicle.security === 3 &&
                                        <Fragment>
                                            <Icon name='star' color="yellow" />
                                            <Icon name='star' color="yellow" />
                                            <Icon name='star' color="yellow" />
                                            <Icon name='star outline' />
                                            <Icon name='star outline' />
                                        </Fragment>
                                    }
                                    {vehicle.security === 4 &&
                                        <Fragment>
                                            <Icon name='star' color="yellow" />
                                            <Icon name='star' color="yellow" />
                                            <Icon name='star' color="yellow" />
                                            <Icon name='star' color="yellow" />
                                            <Icon name='star outline' />
                                        </Fragment>
                                    }
                                    {vehicle.security === 5 &&
                                        <Fragment>
                                            <Icon name='star' color="yellow" />
                                            <Icon name='star' color="yellow" />
                                            <Icon name='star' color="yellow" />
                                            <Icon name='star' color="yellow" />
                                            <Icon name='star' color="yellow" />
                                        </Fragment>
                                    }
                                </p>

                                {index === 0 &&
                                    <Header as='h3'>Número de AirBags</Header>
                                }
                                {index !== 0 &&
                                    <Header as='h3' style={{ color: 'transparent' }}>Número de AirBags</Header>
                                }

                                <p
                                    style={{
                                        fontWeight: 700,
                                        fontSize: 14,
                                        marginLeft: 15,
                                        color: 'gray'
                                    }}
                                >
                                    {vehicle.airbags}
                                </p>

                                {index === 0 &&
                                    <Header as='h3'>Rines</Header>
                                }
                                {index !== 0 &&
                                    <Header as='h3' style={{ color: 'transparent' }}>.</Header>
                                }

                                <p
                                    style={{
                                        fontWeight: 700,
                                        fontSize: 14,
                                        marginLeft: 15,
                                        color: 'gray'
                                    }}
                                >
                                    {vehicle.wheels}
                                </p>

                                {index === 0 &&
                                    <Header as='h3'>Cojinería</Header>
                                }
                                {index !== 0 &&
                                    <Header as='h3' style={{ color: 'transparent' }}>.</Header>
                                }

                                <p
                                    style={{
                                        fontWeight: 700,
                                        fontSize: 14,
                                        marginLeft: 15,
                                        color: 'gray'
                                    }}
                                >
                                    {vehicle.cushions}
                                </p>

                                {index === 0 &&
                                    <Header as='h3'>Peso</Header>
                                }
                                {index !== 0 &&
                                    <Header as='h3' style={{ color: 'transparent' }}>.</Header>
                                }

                                <p
                                    style={{
                                        fontWeight: 700,
                                        fontSize: 14,
                                        marginLeft: 15,
                                        color: 'gray'
                                    }}
                                >
                                    {new Intl.NumberFormat("de-DE").format(vehicle.weight)} K
                                </p>

                                <Divider />

                                {index === 0 &&
                                    <Header as='h2'>Descripción</Header>
                                }
                                {index !== 0 &&
                                    <Header as='h2' style={{ color: 'transparent' }}>.</Header>
                                }

                                <p
                                    style={{
                                        fontWeight: 700,
                                        fontSize: 14,
                                        marginLeft: 15,
                                        color: 'gray'
                                    }}
                                >
                                    {vehicle.description}
                                </p>

                            </Grid.Column>

                        )
                    } else {
                        return (
                            <Grid.Column
                                key={index}
                            >
                                <Button as="a"
                                    onClick={() => localStorage.setItem("historyVehicles", "1")}
                                    href="/vehiculos"
                                    floated='right' style={{ marginBottom: 10 }}>Agregar</Button>
                                <Image
                                    centered
                                    onClick={() => { localStorage.setItem("historyVehicles", "1"); location.href = '/vehiculos' }}
                                    style={{ height: 200, objectFit: 'cover', width: '100%', cursor: 'pointer' }}
                                    src='/images/plus-compare.png'
                                />
                                {index === 0 &&
                                    <Header as='h2'>Características</Header>
                                }
                                {index !== 0 &&
                                    <Header as='h2' style={{ color: 'transparent' }}>.</Header>
                                }

                                {index === 0 &&
                                    <Header as='h3'>Nombre</Header>
                                }
                                {index !== 0 &&
                                    <Header as='h3' style={{ color: 'transparent' }}>.</Header>
                                }

                                <p
                                    style={{
                                        fontWeight: 700,
                                        fontSize: 14,
                                        marginLeft: 15,
                                        color: 'transparent'
                                    }}
                                >
                                    .
                                </p>

                                {index === 0 &&
                                    <Header as='h3'>Precio</Header>
                                }
                                {index !== 0 &&
                                    <Header as='h3' style={{ color: 'transparent' }}>.</Header>
                                }

                                <p
                                    style={{
                                        fontWeight: 700,
                                        fontSize: 14,
                                        marginLeft: 15,
                                        color: 'transparent'
                                    }}
                                >
                                    .
                                </p>

                                {index === 0 &&
                                    <Header as='h3'>Potencia</Header>
                                }
                                {index !== 0 &&
                                    <Header as='h3' style={{ color: 'transparent' }}>.</Header>
                                }

                                <p
                                    style={{
                                        fontWeight: 700,
                                        fontSize: 14,
                                        marginLeft: 15,
                                        color: 'transparent'
                                    }}
                                >
                                    .
                                </p>

                                {index === 0 &&
                                    <Header as='h3'>Marca</Header>
                                }
                                {index !== 0 &&
                                    <Header as='h3' style={{ color: 'transparent' }}>.</Header>
                                }

                                <p
                                    style={{
                                        fontWeight: 700,
                                        fontSize: 14,
                                        marginLeft: 15,
                                        color: 'transparent'
                                    }}
                                >
                                    .
                                </p>

                                {index === 0 &&
                                    <Header as='h3'>Año</Header>
                                }
                                {index !== 0 &&
                                    <Header as='h3' style={{ color: 'transparent' }}>.</Header>
                                }

                                <p
                                    style={{
                                        fontWeight: 700,
                                        fontSize: 14,
                                        marginLeft: 15,
                                        color: 'transparent'
                                    }}
                                >
                                    .
                                </p>

                                {index === 0 &&
                                    <Header as='h3'>Modelo</Header>
                                }
                                {index !== 0 &&
                                    <Header as='h3' style={{ color: 'transparent' }}>.</Header>
                                }

                                <p
                                    style={{
                                        fontWeight: 700,
                                        fontSize: 14,
                                        marginLeft: 15,
                                        color: 'transparent'
                                    }}
                                >
                                    .
                                </p>

                                {index === 0 &&
                                    <Header as='h3'>Torque</Header>
                                }
                                {index !== 0 &&
                                    <Header as='h3' style={{ color: 'transparent' }}>.</Header>
                                }

                                <p
                                    style={{
                                        fontWeight: 700,
                                        fontSize: 14,
                                        marginLeft: 15,
                                        color: 'transparent'
                                    }}
                                >
                                    .
                                </p>

                                {index === 0 &&
                                    <Header as='h3'>Motor</Header>
                                }
                                {index !== 0 &&
                                    <Header as='h3' style={{ color: 'transparent' }}>.</Header>
                                }

                                <p
                                    style={{
                                        fontWeight: 700,
                                        fontSize: 14,
                                        marginLeft: 15,
                                        color: 'transparent'
                                    }}
                                >
                                    .
                                </p>

                                {index === 0 &&
                                    <Header as='h3'>Tipo de motor</Header>
                                }
                                {index !== 0 &&
                                    <Header as='h3' style={{ color: 'transparent' }}>.</Header>
                                }

                                <p
                                    style={{
                                        fontWeight: 700,
                                        fontSize: 14,
                                        marginLeft: 15,
                                        color: 'transparent'
                                    }}
                                >
                                    .
                                </p>

                                {index === 0 &&
                                    <Header as='h3'>Tipo de gasolina</Header>
                                }
                                {index !== 0 &&
                                    <Header as='h3' style={{ color: 'transparent' }}>.</Header>
                                }

                                <p
                                    style={{
                                        fontWeight: 700,
                                        fontSize: 14,
                                        marginLeft: 15,
                                        color: 'transparent'
                                    }}
                                >
                                    .
                                </p>

                                {index === 0 &&
                                    <Header as='h3'>Capacidad del baúl</Header>
                                }
                                {index !== 0 &&
                                    <Header as='h3' style={{ color: 'transparent' }}>Capacidad del baúl</Header>
                                }

                                <p
                                    style={{
                                        fontWeight: 700,
                                        fontSize: 14,
                                        marginLeft: 15,
                                        color: 'transparent'
                                    }}
                                >
                                    .
                                </p>

                                {index === 0 &&
                                    <Header as='h3'>Transmisión</Header>
                                }
                                {index !== 0 &&
                                    <Header as='h3' style={{ color: 'transparent' }}>.</Header>
                                }

                                <p
                                    style={{
                                        fontWeight: 700,
                                        fontSize: 14,
                                        marginLeft: 15,
                                        color: 'transparent'
                                    }}
                                >
                                    .
                                </p>

                                {index === 0 &&
                                    <Header as='h3'>Tracción</Header>
                                }
                                {index !== 0 &&
                                    <Header as='h3' style={{ color: 'transparent' }}>.</Header>
                                }

                                <p
                                    style={{
                                        fontWeight: 700,
                                        fontSize: 14,
                                        marginLeft: 15,
                                        color: 'transparent'
                                    }}
                                >
                                    .
                                </p>

                                {index === 0 &&
                                    <Header as='h3'>Autonomía</Header>
                                }
                                {index !== 0 &&
                                    <Header as='h3' style={{ color: 'transparent' }}>.</Header>
                                }

                                <p
                                    style={{
                                        fontWeight: 700,
                                        fontSize: 14,
                                        marginLeft: 15,
                                        color: 'transparent'
                                    }}
                                >
                                    .
                                </p>

                                {index === 0 &&
                                    <Header as='h3'>Rendimiento</Header>
                                }
                                {index !== 0 &&
                                    <Header as='h3' style={{ color: 'transparent' }}>.</Header>
                                }

                                <p
                                    style={{
                                        fontWeight: 700,
                                        fontSize: 14,
                                        marginLeft: 15,
                                        color: 'transparent'
                                    }}
                                >
                                    .
                                </p>

                                {index === 0 &&
                                    <Header as='h3'>Seguridad en estrellas</Header>
                                }
                                {index !== 0 &&
                                    <Header as='h3' style={{ color: 'transparent' }}>Seguridad en estrellas</Header>
                                }

                                <p
                                    style={{
                                        fontWeight: 700,
                                        fontSize: 14,
                                        marginLeft: 15,
                                        color: 'transparent'
                                    }}
                                >
                                    .
                                </p>

                                {index === 0 &&
                                    <Header as='h3'>Número de AirBags</Header>
                                }
                                {index !== 0 &&
                                    <Header as='h3' style={{ color: 'transparent' }}>Número de AirBags</Header>
                                }

                                <p
                                    style={{
                                        fontWeight: 700,
                                        fontSize: 14,
                                        marginLeft: 15,
                                        color: 'transparent'
                                    }}
                                >
                                    .
                                </p>

                                {index === 0 &&
                                    <Header as='h3'>Rines</Header>
                                }
                                {index !== 0 &&
                                    <Header as='h3' style={{ color: 'transparent' }}>.</Header>
                                }

                                <p
                                    style={{
                                        fontWeight: 700,
                                        fontSize: 14,
                                        marginLeft: 15,
                                        color: 'transparent'
                                    }}
                                >
                                    .
                                </p>

                                {index === 0 &&
                                    <Header as='h3'>Cojinería</Header>
                                }
                                {index !== 0 &&
                                    <Header as='h3' style={{ color: 'transparent' }}>.</Header>
                                }

                                <p
                                    style={{
                                        fontWeight: 700,
                                        fontSize: 14,
                                        marginLeft: 15,
                                        color: 'transparent'
                                    }}
                                >
                                    .
                                </p>

                                {index === 0 &&
                                    <Header as='h3'>Peso</Header>
                                }
                                {index !== 0 &&
                                    <Header as='h3' style={{ color: 'transparent' }}>.</Header>
                                }

                                <p
                                    style={{
                                        fontWeight: 700,
                                        fontSize: 14,
                                        marginLeft: 15,
                                        color: 'transparent'
                                    }}
                                >
                                    .
                                </p>

                                <Divider />

                                {index === 0 &&
                                    <Header as='h2'>Descripción</Header>
                                }
                                {index !== 0 &&
                                    <Header as='h2' style={{ color: 'transparent' }}>.</Header>
                                }

                                <p
                                    style={{
                                        fontWeight: 700,
                                        fontSize: 14,
                                        marginLeft: 15,
                                        color: 'transparent'
                                    }}
                                >
                                    .
                                </p>
                            </Grid.Column>
                        )
                    }
                })}
            </Grid.Row>
        </Grid>
    )
}