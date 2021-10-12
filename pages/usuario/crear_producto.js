import React from 'react'
import PublicLayout from '../../layouts/PublicLayout';
import { Container, Tab } from "semantic-ui-react";
import { validateAuth } from '../../helpers/auth';
import { panes } from '../../components/usuario/productoTabs';
import axios from 'axios';
import jwt from 'jsonwebtoken';
import { API_URL } from '../../helpers/constants';

export default function crear_producto({ data }) {
    return (
        <PublicLayout>
            <Container style={{ paddingTop: 25 }} text id="crear-producto">
                <Tab panes={panes(data)} />
            </Container>
        </PublicLayout>
    )
}
export async function getServerSideProps(context) {
    console.log(context);
    const auth = validateAuth(context);
    console.log(auth);

    if (!auth.vtn_token) {
        context.res.writeHead(301, {
            Location: '/'
        });
        context.res.end();
    }
    const cookie = auth.vtn_token;
    const decoded = jwt.verify(cookie, 'vendetunave2021');
    const config = {
        headers: { Authorization: `Bearer ${decoded.token_server.access_token}` }
    };
   
    //
    let optionsCategories = [];
    let optionsCombustibles = [];
    let optionsColores = [];
    let optionsTransmision = [];
    let optionsTipoPrecio = [];
    let optionsTipoAccesorios = [];
    let optionsDepartamentos = [];
    let optionsTipoMoto = [];
    
    return {
        props: {
            data : {
                categories: optionsCategories,
                combustibles: optionsCombustibles,
                colores: optionsColores,
                transmision: optionsTransmision,
                tipoPrecio: optionsTipoPrecio,
                tipoAccesorio: optionsTipoAccesorios,
                departamentos: optionsDepartamentos,
                tipoMotos: optionsTipoMoto
            }
        }
    }
}