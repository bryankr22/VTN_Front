import React, { useState, useEffect } from 'react'
import PublicLayout from '../layouts/PublicLayout';
import { Container, Header, Form, Select, Button, Dimmer, Loader } from 'semantic-ui-react'
import axios from 'axios';
import { API_URL, config } from '../helpers/constants';
export default function terminosycondiciones() {
    const [tyc, setTyc] = useState('');
    useEffect(() => {
        axios.get(API_URL + config).then(res => {
            setTyc(res.data.configuraciones.tyc)
        }).catch(error => {
            console.log(error)
        })
    }, [])
    return (
        <PublicLayout>
            <Container style={{ paddingTop: 66, minHeight: 482 }} text>
                <Header as="h1">TÉRMINOS Y CONDICIONES</Header>
                <p>
                    {tyc}
                </p>
            </Container>
        </PublicLayout>
    )
}
