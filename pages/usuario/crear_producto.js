import React from 'react'
import PublicLayout from '../../layouts/PublicLayout';
import { Header, Container } from "semantic-ui-react";
import { authInitialProps } from '../../helpers/auth';
export default function crear_producto() {
    return (
        <PublicLayout>
            <Container style={{ paddingTop: 25 }} text>
                <Header as="h2">CREAR VEHICULO</Header>
            </Container>
        </PublicLayout>
    )
}
crear_producto.getInitialProps = authInitialProps()