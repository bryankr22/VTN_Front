import React from 'react'
import { Grid, Header } from "semantic-ui-react";
export default function TableCaracteristicasDesk({ vehiculo }) {
    return (
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
                        {vehiculo.marcaLabel}
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
                        {vehiculo.modeloLabel}
                    </p>
                </Grid.Column>
            </Grid.Row>
            <Grid.Row
                columns={2}
                style={{ paddingTop: 0, paddingBottom: 0 }}
            >
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
                        {vehiculo.ano}
                    </p>
                </Grid.Column>
                <Grid.Column>
                    <Header as="h5" style={{ color: "gray", marginBottom: 5 }}>
                        Estado:
                    </Header>
                    <p
                        style={{
                            display: "inline-block",
                            fontWeight: 700,
                            fontSize: 14,
                        }}
                    >
                        {vehiculo.condicion}
                    </p>
                </Grid.Column>
            </Grid.Row>
            <Grid.Row
                columns={2}
                style={{ paddingTop: 0, paddingBottom: 0 }}
            >
                <Grid.Column>
                    <Header as="h5" style={{ color: "gray", marginBottom: 5 }}>
                        Tipo precio:
                    </Header>
                    <p
                        style={{
                            display: "inline-block",
                            fontWeight: 700,
                            fontSize: 14,
                        }}
                    >
                        {vehiculo.tipoPrecioLabel}
                    </p>
                </Grid.Column>
                <Grid.Column>
                    <Header as="h5" style={{ color: "gray", marginBottom: 5 }}>
                        Cilindraje:
                    </Header>
                    <p
                        style={{
                            display: "inline-block",
                            fontWeight: 700,
                            fontSize: 14,
                        }}
                    >
                        {vehiculo.cilindraje} cc
                    </p>
                </Grid.Column>
            </Grid.Row>
            <Grid.Row
                columns={2}
                style={{ paddingTop: 0, paddingBottom: 0 }}
            >
                <Grid.Column>
                    <Header as="h5" style={{ color: "gray", marginBottom: 5 }}>
                        Kilometraje:
                    </Header>
                    <p
                        style={{
                            display: "inline-block",
                            fontWeight: 700,
                            fontSize: 14,
                        }}
                    >
                        {new Intl.NumberFormat("de-DE").format(
                            vehiculo.kilometraje
                        )}{" "}
                        km
                    </p>
                </Grid.Column>
                <Grid.Column>
                    <Header as="h5" style={{ color: "gray", marginBottom: 5 }}>
                        Combustible:
                    </Header>
                    <p
                        style={{
                            display: "inline-block",
                            fontWeight: 700,
                            fontSize: 14,
                        }}
                    >
                        {vehiculo.combustibleLabel}
                    </p>
                </Grid.Column>
            </Grid.Row>
            <Grid.Row columns={2} style={{ paddingTop: 0 }}>
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
                        {vehiculo.transmisionLabel}
                    </p>
                </Grid.Column>
                <Grid.Column>
                    <Header as="h5" style={{ color: "gray", marginBottom: 5 }}>
                        Color:
                    </Header>
                    <p
                        style={{
                            display: "inline-block",
                            fontWeight: 700,
                            fontSize: 14,
                        }}
                    >
                        {vehiculo.colorLabel}
                    </p>
                </Grid.Column>
            </Grid.Row>
            <Grid.Row columns={2} style={{ paddingTop: 0 }}>
                <Grid.Column>
                    <Header as="h5" style={{ color: "gray", marginBottom: 5 }}>
                        Último dígito de placa:
                    </Header>
                    <p
                        style={{
                            display: "inline-block",
                            fontWeight: 700,
                            fontSize: 14,
                        }}
                    >
                        {vehiculo.placa}
                    </p>
                </Grid.Column>
                <Grid.Column>
                    <Header as="h5" style={{ color: "gray", marginBottom: 5 }}>
                        Blindaje:
                    </Header>
                    <p
                        style={{
                            display: "inline-block",
                            fontWeight: 700,
                            fontSize: 14,
                        }}
                    >
                        {vehiculo.blindado ? 'SI' : 'NO'}
                    </p>
                </Grid.Column>
            </Grid.Row>
        </Grid>
    )
}
