import React, { useState } from 'react'
import PublicLayout from '../layouts/PublicLayout';
import { Container, Header, Form, Button, Dropdown, Dimmer, Loader } from "semantic-ui-react";
import axios from 'axios';
import { useCookies } from "react-cookie";
import jwt from "jsonwebtoken";
import { useRouter } from 'next/router';

import { API_URL, AUTH_URL } from '../helpers/constants';

export default function crear_pregunta({ data }) {
    const router = useRouter();
    const [cookies] = useCookies(["vtn_token"]);
    const [loading, setLoading] = useState(false);
    const [options, setOptions] = useState(data.tags);
    const [question, setQuestion] = useState({
        title: '',
        description: '',
        tags: [],
    });

    const updateForm = (field, value) => {
        setQuestion({
            ...question,
            [field]: value
        })
    }

    const handleAddition = (e, { value }) => {
        setOptions([{ text: value, value }, ...options])
    }


    const submitForm = () => {
        try {
            setLoading(true);
            const cookie = cookies.vtn_token;
            const decoded = jwt.verify(cookie, "vendetunave2021");
            const user_id = decoded.user.id;
            const data = {
                ...question,
                user_id
            }
            const config = {
                headers: {
                    Authorization: `Bearer ${decoded.token_server.access_token}`,
                },
            };
            axios.post(`${AUTH_URL}/crear_pregunta`, data, config).then((res) => {
                setLoading(false);
                if (res.data.status) {
                    router.push('/comunidad')
                }
            }).catch(error => {
                setLoading(false);
            });
        } catch (error) {

        }

    }

    return (
        <PublicLayout>
            <Dimmer style={{ position: "fixed" }} active={loading}>
                <Loader>Cargando...</Loader>
            </Dimmer>
            <Container style={{ paddingTop: 25 }} text>
                <Header as="h2">COMUNIDAD</Header>
                <Header as="h3" dividing>
                    Crear una pregunta
                </Header>
                <p style={{ textAlign: "justify" }}>
                    Ejemplo: ¿Con 35 millones que vehículo podría comprar, que sea
                    familiar 4 puertas y económico? Después de encender mi vehículo, 10
                    minutos luego, sigue botando humo blanco. ¿Cuál será el motivo?
                </p>

                <Form>
                    <Form.Field>
                        <label>TÍTULO</label>
                        <input
                            id="titulo"
                            onChange={(e) => updateForm("title", e.target.value)}
                        />
                    </Form.Field>
                    <Form.TextArea
                        id="descripcion"
                        label="DESCRIPCIÓN"
                        onChange={(e) => updateForm("description", e.target.value)}
                    />
                    <Form.Field>
                        <label>ETIQUETAS</label>
                        <Dropdown
                            id="tags"
                            search
                            selection
                            fluid
                            multiple
                            allowAdditions
                            options={options}
                            value={question.tags}
                            onAddItem={handleAddition}
                            onChange={(e, { value }) => updateForm("tags", value)}
                        />
                    </Form.Field>
                    <Button
                        color="blue"
                        type="button"
                        floated="right"
                        onClick={submitForm}
                    >
                        PUBLICAR
                    </Button>
                </Form>
            </Container>
        </PublicLayout>
    )
}
export async function getServerSideProps() {
    const res = await axios.get(`${API_URL}/tags`);
    const data = await res.data;

    let optionsTags = [];

    data.tags.forEach(function (item) {
        optionsTags.push({
            key: item.id,
            value: item.tag,
            text: item.tag,
        });
    });

    return {
        props: {
            data: {
                tags: optionsTags,
            }
        }
    }
}