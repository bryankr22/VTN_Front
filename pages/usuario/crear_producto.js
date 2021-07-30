import React from 'react'
import PublicLayout from '../../layouts/PublicLayout';
import { Header, Container, Tab } from "semantic-ui-react";
import { authInitialProps } from '../../helpers/auth';
import { panes } from '../../components/usuario/productoTabs';
export default function crear_producto() {
    return (
        <PublicLayout>
            <Container style={{ paddingTop: 25 }} text>
                <Tab panes={panes()} />
            </Container>
        </PublicLayout>
    )
}
crear_producto.getInitialProps = authInitialProps()