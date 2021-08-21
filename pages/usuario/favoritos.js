import React, {useState, useEffect} from 'react'
import PublicLayout from '../../layouts/PublicLayout';
import { authInitialProps } from '../../helpers/auth';
import { Container, Header, Table, Button, Image, Responsive, Dimmer, Loader, Tab } from 'semantic-ui-react'
import { panes } from '../../components/usuario/favoritosTabs';

import { AUTH_URL, favoritos_api, favoritos_remove_vehiculo, favoritos_remove_ficha } from '../../helpers/constants';
import { useCookies } from "react-cookie"
import jwt from 'jsonwebtoken';
import axios from 'axios';

export default function favoritos() {
    const [activeIndex, setActiveIndex] = useState(0);
    const handleTabChange = (e, {activeIndex}) => {
        setActiveIndex(activeIndex);
    };
    const [cookies, setCookie] = useCookies(['vtn_token']);
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
            setFavoritos({...favoritos, ...res.data});
        })
    }, [])
    const eliminarVehiculo = (vehicle_id) => {
        const cookie = cookies.vtn_token;
        const decoded = jwt.verify(cookie, 'vendetunave2021');
        const user_id = decoded.user.id;
        const config = {
            headers: { Authorization: `Bearer ${decoded.token_server.access_token}` }
        };
        const data = { user_id, vehicle_id }; 
        axios.post(AUTH_URL + favoritos_remove_vehiculo, data, config).then((res) => {
            location.reload();
        })
        .catch((error) => {
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
        axios.post(AUTH_URL + favoritos_remove_ficha, data, config).then((res) => {
            location.reload();
        })
        .catch((error) => {
            //console.log(error);
        });
    }
    return (
        <PublicLayout>
            <Container style={{ paddingTop: 25 }} text>
                <Header as="h2" style={{ textTransform: 'uppercase' }}>Favoritos</Header>
                <Tab
                    panes={panes(favoritos.vehiculos, 0, favoritos.fichas_tecnicas, 0, eliminarVehiculo, eliminarFicha)}
                    activeIndex={activeIndex}
                    onTabChange={handleTabChange}
                />
            </Container>
        </PublicLayout>
    )
}
favoritos.getInitialProps = authInitialProps()