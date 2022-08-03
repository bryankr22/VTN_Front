import { useState, useEffect } from 'react'
import PublicLayout from '../layouts/PublicLayout';
import { Container, Header } from 'semantic-ui-react'
import axios from 'axios';
import { API_URL, config } from '../helpers/constants';
import { useSelector } from 'react-redux';
import { light } from '../helpers/colors';

export default function terminosycondiciones() {
    const [tyc, setTyc] = useState('');
    useEffect(() => {
        axios.get(API_URL + config).then(res => {
            setTyc(res.data.configuraciones.tyc)
        }).catch(error => {
        })
    }, [])

    const darkMode = useSelector(({ darkMode }) => darkMode.status);
    const colorText = darkMode === light ? undefined : light;
    return (
        <PublicLayout>
            <Container style={{ paddingTop: 66, minHeight: 482 }} text>
                <Header as="h1" style={{ color: colorText }}>TÉRMINOS Y CONDICIONES</Header>
                <p style={{ color: colorText }}>
                    {tyc}
                </p>
            </Container>
        </PublicLayout>
    )
}
