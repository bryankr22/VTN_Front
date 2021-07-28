import React from 'react'
import PublicLayout from '../../layouts/PublicLayout';
import { Header, Container } from "semantic-ui-react";
import { authInitialProps } from '../../helpers/auth';
export default function crear_pregunta() {
    return (
        <PublicLayout>
            <Container style={{ paddingTop: 25 }} text>
                <Header as="h2">CREAR PREGUNTA</Header>
            </Container>
        </PublicLayout>
    )
}

crear_pregunta.getInitialProps = authInitialProps()
