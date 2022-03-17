import React from 'react'
import { Grid, Header } from "semantic-ui-react";
import { useSelector } from "react-redux";
import { light } from '../../helpers/colors';

export default function TableCaracteristicasDesk({ vehiculo }) {
    const darkMode = useSelector(({ darkMode }) => darkMode.status);
    const colorText = darkMode === light ? "gray" : light;

    return (
        <Grid divided="vertically" id="desc-desk">
            <Grid.Row columns={2} style={{ paddingBottom: 0 }}>
                <Grid.Column>
                    <Header as="h3" style={{ color: colorText, marginBottom: 5 }}>
                        Marca:
                    </Header>
                    <p
                        style={{
                            display: "inline-block",
                            fontWeight: 700,
                            fontSize: 14,
                            color: colorText
                        }}
                    >
                        {vehiculo.marcaLabel}
                    </p>
                </Grid.Column>
                <Grid.Column>
                    <Header as="h3" style={{ color: colorText, marginBottom: 5 }}>
                        Modelo:
                    </Header>
                    <p
                        style={{
                            display: "inline-block",
                            fontWeight: 700,
                            fontSize: 14,
                            color: colorText
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
                    <Header as="h3" style={{ color: colorText, marginBottom: 5 }}>
                        Año:
                    </Header>
                    <p
                        style={{
                            display: "inline-block",
                            fontWeight: 700,
                            fontSize: 14,
                            color: colorText
                        }}
                    >
                        {vehiculo.ano}
                    </p>
                </Grid.Column>
                <Grid.Column>
                    <Header as="h3" style={{ color: colorText, marginBottom: 5 }}>
                        Estado:
                    </Header>
                    <p
                        style={{
                            display: "inline-block",
                            fontWeight: 700,
                            fontSize: 14,
                            color: colorText
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
                    <Header as="h3" style={{ color: colorText, marginBottom: 5 }}>
                        Tipo precio:
                    </Header>
                    <p
                        style={{
                            display: "inline-block",
                            fontWeight: 700,
                            fontSize: 14,
                            color: colorText
                        }}
                    >
                        {vehiculo.tipoPrecioLabel}
                    </p>
                </Grid.Column>
                <Grid.Column>
                    <Header as="h3" style={{ color: colorText, marginBottom: 5 }}>
                        Cilindraje:
                    </Header>
                    <p
                        style={{
                            display: "inline-block",
                            fontWeight: 700,
                            fontSize: 14,
                            color: colorText
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
                    <Header as="h3" style={{ color: colorText, marginBottom: 5 }}>
                        Kilometraje:
                    </Header>
                    <p
                        style={{
                            display: "inline-block",
                            fontWeight: 700,
                            fontSize: 14,
                            color: colorText
                        }}
                    >
                        {new Intl.NumberFormat("de-DE").format(
                            vehiculo.kilometraje
                        )}{" "}
                        km
                    </p>
                </Grid.Column>
                <Grid.Column>
                    <Header as="h3" style={{ color: colorText, marginBottom: 5 }}>
                        Combustible:
                    </Header>
                    <p
                        style={{
                            display: "inline-block",
                            fontWeight: 700,
                            fontSize: 14,
                            color: colorText
                        }}
                    >
                        {vehiculo.combustibleLabel}
                    </p>
                </Grid.Column>
            </Grid.Row>
            <Grid.Row columns={2} style={{ paddingTop: 0 }}>
                <Grid.Column>
                    <Header as="h3" style={{ color: colorText, marginBottom: 5 }}>
                        Transmisión:
                    </Header>
                    <p
                        style={{
                            display: "inline-block",
                            fontWeight: 700,
                            fontSize: 14,
                            color: colorText
                        }}
                    >
                        {vehiculo.transmisionLabel}
                    </p>
                </Grid.Column>
                <Grid.Column>
                    <Header as="h3" style={{ color: colorText, marginBottom: 5 }}>
                        Color:
                    </Header>
                    <p
                        style={{
                            display: "inline-block",
                            fontWeight: 700,
                            fontSize: 14,
                            color: colorText
                        }}
                    >
                        {vehiculo.colorLabel}
                    </p>
                </Grid.Column>
            </Grid.Row>
            <Grid.Row columns={2} style={{ paddingTop: 0 }}>
                <Grid.Column>
                    <Header as="h3" style={{ color: colorText, marginBottom: 5 }}>
                        Último dígito de placa:
                    </Header>
                    <p
                        style={{
                            display: "inline-block",
                            fontWeight: 700,
                            fontSize: 14,
                            color: colorText
                        }}
                    >
                        {vehiculo.placa}
                    </p>
                </Grid.Column>
                <Grid.Column>
                    <Header as="h3" style={{ color: colorText, marginBottom: 5 }}>
                        Blindaje:
                    </Header>
                    <p
                        style={{
                            display: "inline-block",
                            fontWeight: 700,
                            fontSize: 14,
                            color: colorText
                        }}
                    >
                        {vehiculo.blindado ? 'SI' : 'NO'}
                    </p>
                </Grid.Column>
            </Grid.Row>
            <Grid.Row columns={2} style={{ paddingTop: 0 }}>
                <Grid.Column>
                    <Header as="h3" style={{ color: colorText, marginBottom: 5 }}>
                        Peritaje:
                    </Header>
                    <p
                        style={{
                            display: "inline-block",
                            fontWeight: 700,
                            fontSize: 14,
                            color: colorText
                        }}
                    >
                        <a href={vehiculo.peritaje == '0' ? undefined : vehiculo.peritaje} target="_blank" rel="noreferrer">
                            {vehiculo.peritaje == '0' ? 'No' : 'Si'}
                        </a>
                    </p>
                </Grid.Column>
            </Grid.Row>
        </Grid>
    )
}
