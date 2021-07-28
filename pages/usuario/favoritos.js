import React from 'react'
import PublicLayout from '../../layouts/PublicLayout';
import { Header, Container } from "semantic-ui-react";
import { authInitialProps } from '../../helpers/auth';
export default function favoritos() {
    return (
        <PublicLayout>
            <Container style={{ paddingTop: 25 }} text>
                <Header as="h2">FAVORITOS</Header>
                <Header as="h4">Aún no cuentas con favoritos.</Header>
            </Container>
        </PublicLayout>
    )
}
favoritos.getInitialProps = authInitialProps()