import React from 'react'
import PublicLayout from '../../layouts/PublicLayout';
import { Header, Container } from "semantic-ui-react";
import { authInitialProps } from '../../helpers/auth';
export default function mis_busquedas() {
    return (
        <PublicLayout>
            <Container style={{ paddingTop: 25 }} text>
                <Header as="h2">MIS BÚSQUEDAS</Header>
                <Header as="h4">Aún no cuentas con publicaciones.</Header>
            </Container>
        </PublicLayout>
    )
}
mis_busquedas.getInitialProps = authInitialProps()