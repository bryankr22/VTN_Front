import { useState, useEffect } from 'react';
import Head from "next/head";
import { NextSeo } from "next-seo";
import { useSelector } from 'react-redux';
import PublicLayout from '../../layouts/PublicLayout';
import { authInitialProps } from '../../helpers/auth';
import { Container, Header, Tab } from 'semantic-ui-react';
import { panes } from '../../components/usuario/favoritosTabs';

import { AUTH_URL, favoritos_api, favoritos_remove_vehiculo, favoritos_remove_ficha } from '../../helpers/constants';
import { useCookies } from "react-cookie"
import jwt from 'jsonwebtoken';
import axios from 'axios';
import { dark, light } from '../../helpers/colors';

export default function favoritos() {
    const [activeIndex, setActiveIndex] = useState(0);
    const handleTabChange = (e, { activeIndex }) => {
        setActiveIndex(activeIndex);
    };
    const [cookies] = useCookies(['vtn_token']);
    const [favoritos, setFavoritos] = useState({
        vehiculos: [],
        fichas_tecnicas: []
    })
    useEffect(() => {
        const cookie = cookies.vtn_token;
        const decoded = jwt.verify(cookie, 'vendetunave2021');
        const user_id = decoded.user.id;
        const config = {
            headers: { Authorization: `Bearer ${decoded.token_server.access_token}` }
        };
        axios.get(AUTH_URL + favoritos_api + user_id, config).then((res) => {
            setFavoritos({ ...favoritos, ...res.data });
        })
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
    const eliminarVehiculo = (vehicle_id) => {
        const cookie = cookies.vtn_token;
        const decoded = jwt.verify(cookie, 'vendetunave2021');
        const user_id = decoded.user.id;
        const config = {
            headers: { Authorization: `Bearer ${decoded.token_server.access_token}` }
        };
        const data = { user_id, vehicle_id };
        axios.post(AUTH_URL + favoritos_remove_vehiculo, data, config).then(() => {
            location.reload();
        })
            .catch(() => {
                //console.log(error);
            });
    }
    const eliminarFicha = (ficha_id) => {
        const cookie = cookies.vtn_token;
        const decoded = jwt.verify(cookie, 'vendetunave2021');
        const user_id = decoded.user.id;
        const config = {
            headers: { Authorization: `Bearer ${decoded.token_server.access_token}` }
        };
        const data = { user_id, ficha_id };
        axios.post(AUTH_URL + favoritos_remove_ficha, data, config).then(() => {
            location.reload();
        })
            .catch(() => {
                //console.log(error);
            });
    }

    const darkMode = useSelector(({ darkMode }) => darkMode.status);
    return (
        <PublicLayout>
            <NextSeo
                title="VendeTuNave - Vehículos favoritos"
                description="Guarda tus carros favoritos en Vende Tu Nave y míralos cuando quieras."
                openGraph={{
                    title: "VendeTuNave - Vehículos favoritos",
                    locale: "es_ES",
                    type: "website",
                    description: "Guarda tus carros favoritos en Vende Tu Nave y míralos cuando quieras."
                }}
            />
            <Head>
                <meta property="keywords" content="los mejores carros del mundo, carros de segunda baratos, carros de venta usados, motos usadas, usados autos, carros último modelo" />
            </Head>
            <Container style={{ paddingTop: 25 }} text>
                <Header as="h1" style={{ textTransform: 'uppercase' }}>Favoritos</Header>
                <Tab
                    menu={{ inverted: darkMode === dark, color: darkMode }}
                    panes={panes(favoritos.vehiculos, 0, favoritos.fichas_tecnicas, 0, eliminarVehiculo, eliminarFicha)}
                    activeIndex={activeIndex}
                    onTabChange={handleTabChange}
                />
            </Container>
        </PublicLayout>
    )
}
favoritos.getInitialProps = authInitialProps()