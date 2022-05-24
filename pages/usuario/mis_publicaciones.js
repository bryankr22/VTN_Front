import { useState, useEffect } from 'react';
import Head from "next/head";
import { NextSeo } from "next-seo";
import PublicLayout from '../../layouts/PublicLayout';
import { Header, Container, Tab } from "semantic-ui-react";
import { authInitialProps } from '../../helpers/auth';
import { panes } from '../../components/usuario/publicacionesTabs';

import { AUTH_URL, publicaciones_api } from '../../helpers/constants';
import { useCookies } from "react-cookie"
import jwt from 'jsonwebtoken';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { dark } from '../../helpers/colors';

export default function mis_publicaciones() {
    const [activeIndex, setActiveIndex] = useState(0);
    const handleTabChange = (e, { activeIndex }) => {
        setActiveIndex(activeIndex);
    };
    const [cookies] = useCookies(['vtn_token']);
    const [publicaciones, setPublicaciones] = useState({
        vehiculos: [],
        filtros: { page: 1, q: '' },
        accesorios: []
    })
    useEffect(() => {
        const cookie = cookies.vtn_token;
        const decoded = jwt.verify(cookie, 'vendetunave2021');
        const user_id = decoded.user.id;
        const config = {
            headers: { Authorization: `Bearer ${decoded.token_server.access_token}` }
        };
        const urlParams = new URLSearchParams(window.location.search);
        const page = urlParams.get('page') ?? 1;
        const q = urlParams.get('q') ?? '';
        axios.get(AUTH_URL + publicaciones_api + user_id + `?page=${page}&q=${q}`, config).then((res) => {
            setPublicaciones({ ...publicaciones, ...res.data });
        })
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

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
mis_publicaciones.getInitialProps = authInitialProps()