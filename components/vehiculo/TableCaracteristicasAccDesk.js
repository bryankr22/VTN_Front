import React from 'react'
import { Grid, Header } from "semantic-ui-react";
export default function TableCaracteristicasAccDesk({ vehiculo }) {
    return (
        <Grid divided="vertically">
            <Grid.Row columns={2} style={{ paddingBottom: 0 }}>
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
                <Grid.Column>
                    <Header as="h5" style={{ color: "gray", marginBottom: 5 }}>
                        Tipo Precio:
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
            </Grid.Row>
        </Grid>
    )
}
