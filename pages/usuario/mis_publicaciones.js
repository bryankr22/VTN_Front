import React, {useState, useEffect} from 'react'
import PublicLayout from '../../layouts/PublicLayout';
import { Header, Container, Tab } from "semantic-ui-react";
import { authInitialProps } from '../../helpers/auth';
import { panes } from '../../components/usuario/publicacionesTabs';

import { AUTH_URL, publicaciones_api } from '../../helpers/constants';
import { useCookies } from "react-cookie"
import jwt from 'jsonwebtoken';
import axios from 'axios';

export default function mis_publicaciones() {
    const [activeIndex, setActiveIndex] = useState(0);
    const handleTabChange = (e, {activeIndex}) => {
        setActiveIndex(activeIndex);
    };
    const [cookies, setCookie] = useCookies(['vtn_token']);
    const [publicaciones, setPublicaciones] = useState({
        vehiculos: [],
        accesorios: []
    })
    useEffect(() => {
        const cookie = cookies.vtn_token;
        const decoded = jwt.verify(cookie, 'vendetunave2021');
        const user_id = decoded.user.id;
        const config = {
            headers: { Authorization: `Bearer ${decoded.token_server.access_token}` }
        };
        axios.get(AUTH_URL + publicaciones_api + user_id, config).then((res) => {
            setPublicaciones({...publicaciones, ...res.data});
        })
    }, [])
    return (
        <PublicLayout>
            <Container style={{ paddingTop: 25 }} text>
                <Header as="h2">MIS PUBLICACIONES</Header>
                <Tab
                    panes={panes(publicaciones.vehiculos, 0, publicaciones.accesorios, 0)}
                    activeIndex={activeIndex}
                    onTabChange={handleTabChange}
                />
            </Container>
        </PublicLayout>
    )
}
mis_publicaciones.getInitialProps = authInitialProps()