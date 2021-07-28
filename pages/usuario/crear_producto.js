import React from 'react'
import PublicLayout from '../../layouts/PublicLayout';
import { Header, Container } from "semantic-ui-react";
export default function crear_producto() {
    return (
        <PublicLayout>
            <Container style={{ paddingTop: 25 }} text>
                <Header as="h2">CREAR VEHICULO</Header>
            </Container>
        </PublicLayout>
    )
}
import { authInitialProps } from '../../helpers/auth';

crear_pregunta.getInitialProps = authInitialProps()