import { useState } from 'react';
import Head from "next/head";
import { NextSeo } from "next-seo";
import PublicLayout from '../../layouts/PublicLayout';
import { Header, Container, Tab } from "semantic-ui-react";
import { panes } from '../../components/usuario/publicacionesTabs';
import { validateAuth } from '../../helpers/auth';
import { AUTH_URL, publicaciones_api } from '../../helpers/constants';
import jwt from 'jsonwebtoken';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { dark } from '../../helpers/colors';

export default function mis_publicaciones({ data }) {
    const [activeIndex, setActiveIndex] = useState(data.filtros.tab);
    const handleTabChange = (e, { activeIndex }) => {
        setActiveIndex(activeIndex);
    };
    const [publicaciones, setPublicaciones] = useState({
        vehiculos: data.vehiculos,
        total_records: data.total_records,
        vehiculos_inactivos: data.vehiculos,
        total_records_inactive: data.total_records,
        filtros: data.filtros
    });

    const darkMode = useSelector(({ darkMode }) => darkMode.status);
    return (
        <PublicLayout>
            <NextSeo
                title="VendeTuNave - Mis publicaciones"
                description="Mira las publicaciones de vehiculos que hayas hecho. Publica tu carro, camioneta o moto completamente gratis, sin límite alguno."
                openGraph={{
                    title: "VendeTuNave - Mis publicaciones",
                    locale: "es_ES",
                    type: "website",
                    description: "Mira las publicaciones de vehiculos que hayas hecho. Publica tu carro, camioneta o moto completamente gratis, sin límite alguno."
                }}
            />
            <Head>
                <meta property="keywords" content="moto deportiva, camiones, camioneta, automóvil, moto enduro, marcas de motos, automotriz" />
            </Head>
            <Container style={{ paddingTop: 25 }} text>
                <Header as="h1">MIS PUBLICACIONES</Header>
                <Tab
                    menu={{ inverted: darkMode === dark, color: darkMode }}
                    panes={panes(publicaciones, 0, publicaciones.accesorios, 0)}
                    activeIndex={activeIndex}
                    onTabChange={handleTabChange}
                />
            </Container>
        </PublicLayout>
    )
}

export async function getServerSideProps(context) {
    const { query } = context;
    const auth = validateAuth(context);

    if (!auth.vtn_token) {
        context.res.writeHead(301, {
            Location: '/401'
        });
        context.res.end();
        return {
            props: {}
        }
    }
    const cookie = auth.vtn_token;
    const decoded = jwt.verify(cookie, 'vendetunave2021');
    const user_id = decoded.user.id;
    const config = {
        headers: { Authorization: `Bearer ${decoded.token_server.access_token}` }
    };

    const res = await axios.get(AUTH_URL + publicaciones_api + user_id, {
        params: {
            tab: query.tab,
            page: query.page,
            q: query.q,
            page_inactive: query.page_inactive,
            q_inactive: query.q_inactive
        },
        ...config
    });
    const data = await res.data;
    return {
        props: {
            data
        },
    }
}