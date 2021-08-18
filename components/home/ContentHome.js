import React, {useState} from 'react';
import { Header, Form, Container, Input, Responsive, Message } from "semantic-ui-react";
import Iframe from "react-iframe";

import axios from 'axios';
import { API_URL, newsletter_api } from '../../helpers/constants';

const ContentHome = () => {
    const [form, setForm] = useState({
        nombreNewsletter: "",
        emailNewsletter: "",
        disabledNews: true,
        link_video: "https://www.youtube.com/embed/Z97oTgtn_VU"
    });
    const [response, setResponse] = useState({
        mensaje: "",
        show: false
    });
    const setValueForm = (object) => {
        setForm({...form, ...object});
    }
    const handleCheckBoxNews = () => {
        setForm({...form, disabledNews: !form.disabledNews});
    }
    const onNewsletter = () => {
        const { nombreNewsletter, emailNewsletter } = form;
        const reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        if (emailNewsletter === "" || reg.test(emailNewsletter) !== true) {
            //alert("Correo invalido");
            return;
        }
        if (nombreNewsletter.length < 3) {
            //alert("nombre mayor o igual a 3 caracteres");
            return;
        }
        let data = {
            nombreNewsletter,
            emailNewsletter,
        };
        axios.post(API_URL + newsletter_api, data).then((res) => {
            if (res.data.state) {
                setForm({...form, 
                    emailNewsletter: "",
                    nombreNewsletter: ""
                });
                setResponse({...response, 
                    mensaje: res.data.message,
                    show: true
                });
            }
        }).catch((error) => {
            console.log(error);
        });
    }
    return(
        <div>
        {form.link_video != '' &&
            <Iframe
                url={form.link_video}
                width="100%"
                height="500px"
                id="videoId"
                display="initial"
                position="relative"
            />
        }
        <Responsive {...Responsive.onlyMobile}>
            <Container
            style={{
                paddingTop: 40,
                paddingBottom: 40,
            }}
            >
            {response.show ?
                <Message
                success
                onDismiss={()=> setResponse({...response, show: false })}
                header='Completado'
                content={response.mensaje}
                />
            : null}
            <Header as="h1" style={{ fontSize: "1.4rem" }} textAlign="left">
                REGISTRARSE AL NEWSLETTER
            </Header>
            <Header
                as="h6"
                textAlign="left"
                style={{ marginBottom: 20, fontWeight: 500 }}
            >
                Suscríbete a nuestro newsletter y recibe notificaciones del mejor
                contenido de VendeTuNave.
            </Header>
            <Form id="form-newsletter" style={{ textAlign: "center" }}>
                <Form.Group widths="equal">
                <Form.Input
                    className="input-news-letter"
                    onChange={(e) => setValueForm({ nombreNewsletter: e.target.value }) }
                    value={form.nombreNewsletter}
                    fluid
                    placeholder="Nombre"
                />
                <Form.Input
                    className="input-news-letter"
                    onChange={(e) => setValueForm({ emailNewsletter: e.target.value }) }
                    value={form.emailNewsletter}
                    fluid
                    placeholder="E-mail"
                />
                </Form.Group>
                <Form.Checkbox
                onClick={ () => handleCheckBoxNews() }
                style={{ marginTop: 10 }}
                label="ACEPTAR TÉRMINOS Y CONDICIONES"
                />
                <Form.Button
                primary
                disabled={form.disabledNews}
                onClick={() => onNewsletter()}
                >
                REGISTRARME
                </Form.Button>
            </Form>
            </Container>
            </Responsive>
            <Responsive {...Responsive.onlyTablet}>
            <Container
            style={{
                paddingTop: 40,
                paddingBottom: 40,
            }}
            >
            {response.show ?
                <Message
                success
                onDismiss={()=> setResponse({...response, show: false })}
                header='Completado'
                content={response.mensaje}
                />
            : null}
            <Header as="h1" style={{ fontSize: "1.4rem" }} textAlign="left">
                REGISTRARSE AL NEWSLETTER
            </Header>
            <Header
                as="h6"
                textAlign="left"
                style={{ marginBottom: 20, fontWeight: 500 }}
            >
                Suscríbete a nuestro newsletter y recibe notificaciones del mejor
                contenido de VendeTuNave.
            </Header>
            <Form id="form-newsletter" style={{ textAlign: "center" }}>
                <Form.Group widths="equal">
                <Form.Input
                    className="input-news-letter"
                    onChange={(e) =>
                    setValueForm({ nombreNewsletter: e.target.value })
                    }
                    value={form.nombreNewsletter}
                    fluid
                    placeholder="Nombre"
                />
                <Form.Input
                    className="input-news-letter"
                    onChange={(e) =>
                    setValueForm({ emailNewsletter: e.target.value })
                    }
                    value={form.emailNewsletter}
                    fluid
                    placeholder="E-mail"
                />
                </Form.Group>
                <Form.Checkbox
                onClick={ () => handleCheckBoxNews() }
                style={{ marginTop: 10 }}
                label="ACEPTAR TÉRMINOS Y CONDICIONES"
                />
                <Form.Button
                primary
                disabled={form.disabledNews}
                onClick={() => onNewsletter()}
                >
                REGISTRARME
                </Form.Button>
            </Form>
            </Container>
            </Responsive>

            <Responsive {...Responsive.onlyComputer}>
            <Container
            style={{
                paddingTop: 40,
                paddingBottom: 40,
                textAlign: "center",
                paddingLeft: 230,
                paddingRight: 230,
            }}
            >
            {response.show ?
                <Message
                success
                onDismiss={()=> setResponse({...response, show: false })}
                header='Completado'
                content={response.mensaje}
                />
            : null}
            <Header as="h1" style={{ fontSize: "1.4rem" }}>
                REGISTRARSE AL NEWSLETTER
            </Header>
            <Header as="h6" style={{ marginBottom: 20, fontWeight: 500 }}>
                Suscríbete a nuestro newsletter y recibe notificaciones del mejor
                contenido de VendeTuNave.
            </Header>
            <Form style={{ textAlign: "center" }}>
                <Form.Field className="input-news-letter">
                <Input
                    onChange={(e) =>
                    setValueForm({ nombreNewsletter: e.target.value })
                    }
                    value={form.nombreNewsletter}
                    fluid
                    placeholder="Nombre"
                />
                </Form.Field>
                <Form.Field className="input-news-letter">
                <Input
                    onChange={(e) =>
                    setValueForm({ emailNewsletter: e.target.value })
                    }
                    value={form.emailNewsletter}
                    fluid
                    placeholder="E-mail"
                />
                </Form.Field>
                <Form.Checkbox
                onClick={ () => handleCheckBoxNews() }
                style={{ marginTop: 10 }}
                label="ACEPTAR TÉRMINOS Y CONDICIONES"
                />
                <Form.Button
                primary
                disabled={form.disabledNews}
                onClick={() => onNewsletter()}
                >
                REGISTRARME
                </Form.Button>
            </Form>
            </Container>
            </Responsive>
        </div>
    );
}
export default ContentHome;
