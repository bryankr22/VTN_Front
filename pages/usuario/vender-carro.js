import React from 'react';
import Head from "next/head";
import { NextSeo } from "next-seo";
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
            <NextSeo
                title="VendeTuNave -  Vende tu carro 100% gratis"
                description="Vende tu carro, camioneta o moto completamente gratis, de manera simple y rápida. Publica tu vehículo en nuestro portal."
                openGraph={{
                    title: "VendeTuNave -  Vende tu carro 100% gratis",
                    locale: "es_ES",
                    type: "website",
                    description: "Vende tu carro, camioneta o moto completamente gratis, de manera simple y rápida. Publica tu vehículo en nuestro portal."
                }}
            />
            <Head>
                <meta property="keywords" content="venta de carros, venta de motos, vender carro, venta de carros, compra y venta de carros, tu carro ya, tu carro Colombia" />
            </Head>
            <Container style={{ paddingTop: 25 }} text id="crear-producto">
                <Tab panes={panes(data)} />
            </Container>
        </PublicLayout>
    )
}
export async function getServerSideProps(context) {
    const auth = validateAuth(context);
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
    const res = await axios.get('https://api.vendetunave.co/auth/form_producto', config);
    const data = await res.data;
    //
    let optionsCategories = [];
    let optionsCombustibles = [];
    let optionsColores = [];
    let optionsTransmision = [];
    let optionsTipoPrecio = [];
    let optionsTipoAccesorios = [];
    let optionsDepartamentos = [];
    let optionsTipoMoto = [];
    //
    data.categories.forEach(function (item) {
        optionsCategories.push({
            key: item.id,
            value: item.id,
            text: item.nombre,
        });
    });
    data.combustibles.forEach(function (item) {
        optionsCombustibles.push({
            key: item.id,
            value: item.id,
            text: item.nombre,
        });
    });
    data.colores.forEach(function (item) {
        optionsColores.push({
            key: item.id,
            value: item.id,
            text: item.nombre,
        });
    });
    data.transmisiones.forEach(function (item) {
        optionsTransmision.push({
            key: item.id,
            value: item.id,
            text: item.nombre,
        });
    });
    data.tipoPrecio.forEach(function (item) {
        optionsTipoPrecio.push({
            key: item.id,
            value: item.id,
            text: item.nombre,
        });
    });
    data.tipoAccesorio.forEach(function (item) {
        optionsTipoAccesorios.push({
            key: item.id,
            value: item.id,
            text: item.nombre,
        });
    });
    data.departamentos.forEach(function (item) {
        optionsDepartamentos.push({
            key: item.id,
            value: item.id,
            text: item.nombre,
        });
    });
    data.tipoMoto.forEach(function (item) {
        optionsTipoMoto.push({
            key: item.id,
            value: item.id,
            text: item.nombre,
        });
    });
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