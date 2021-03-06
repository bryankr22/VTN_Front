import React, { useState } from "react";
import {
  Header,
  Form,
  Container,
  Input,
  Responsive,
  Message,
} from "semantic-ui-react";
import { useSelector } from 'react-redux';
import loadable from '@loadable/component';

import axios from "axios";
import { API_URL, newsletter_api } from "../../helpers/constants";
import { light, dark } from "../../helpers/colors";

const VideoPlayer = loadable(() => import('./VideoPlayer'));

const ContentHome = ({ config }) => {
  const [form, setForm] = useState({
    nombreNewsletter: "",
    emailNewsletter: "",
    disabledNews: true,
    link_video: "https://www.youtube.com/embed/Z97oTgtn_VU",
    ...config,
  });
  const [response, setResponse] = useState({
    mensaje: "",
    show: false,
  });
  const setValueForm = (object) => {
    setForm({ ...form, ...object });
  };
  const handleCheckBoxNews = () => {
    setForm({ ...form, disabledNews: !form.disabledNews });
  };
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
    axios
      .post(API_URL + newsletter_api, data)
      .then((res) => {
        if (res.data.state) {
          setForm({ ...form, emailNewsletter: "", nombreNewsletter: "" });
          setResponse({ ...response, mensaje: res.data.message, show: true });
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const darkMode = useSelector(({ darkMode }) => darkMode.status);
  const colorText = darkMode === light ? dark : light;

  return (
    <div>
      <Responsive {...Responsive.onlyMobile}>
        {form.link_video != "" && (
          <VideoPlayer link={form.link_video} />
        )}
        <Container
          style={{
            paddingTop: 40,
            paddingBottom: 40,
          }}
        >
          {response.show ? (
            <Message
              success
              onDismiss={() => setResponse({ ...response, show: false })}
              header="Completado"
              content={response.mensaje}
            />
          ) : null}
          <Header as="h3" style={{ fontSize: "1.4rem", color: colorText }} textAlign="left">
            REGISTRARSE AL NEWSLETTER
          </Header>
          <Header
            as="p"
            textAlign="left"
            style={{ marginBottom: 20, fontWeight: 500, color: colorText }}
          >
            Suscr??bete a nuestro newsletter y recibe notificaciones del mejor
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
              onClick={() => handleCheckBoxNews()}
              style={{ marginTop: 10 }}
              label="ACEPTAR T??RMINOS Y CONDICIONES"
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
        {form.link_video != "" && (
          <VideoPlayer link={form.link_video} />
        )}
        <Container
          style={{
            paddingTop: 40,
            paddingBottom: 40,
          }}
        >
          {response.show ? (
            <Message
              success
              onDismiss={() => setResponse({ ...response, show: false })}
              header="Completado"
              content={response.mensaje}
            />
          ) : null}
          <Header as="h3" style={{ fontSize: "1.4rem", color: colorText }} textAlign="left">
            REGISTRARSE AL NEWSLETTER
          </Header>
          <Header
            as="p"
            textAlign="left"
            style={{ marginBottom: 20, fontWeight: 500, color: colorText }}
          >
            Suscr??bete a nuestro newsletter y recibe notificaciones del mejor
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
              onClick={() => handleCheckBoxNews()}
              style={{ marginTop: 10 }}
              label="ACEPTAR T??RMINOS Y CONDICIONES"
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
        {form.link_video != "" && (
          <VideoPlayer link={form.link_video} />
        )}
        <Container
          style={{
            paddingTop: 40,
            paddingBottom: 40,
            textAlign: "center",
            paddingLeft: 230,
            paddingRight: 230,
          }}
        >
          {response.show ? (
            <Message
              success
              onDismiss={() => setResponse({ ...response, show: false })}
              header="Completado"
              content={response.mensaje}
            />
          ) : null}
          <Header as="h3" style={{ fontSize: "1.4rem", color: colorText }}>
            REGISTRARSE AL NEWSLETTER
          </Header>
          <Header as="p" style={{ marginBottom: 20, fontWeight: 500, color: colorText }}>
            Suscr??bete a nuestro newsletter y recibe notificaciones del mejor
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
              onClick={() => handleCheckBoxNews()}
              style={{ marginTop: 10 }}
              label="ACEPTAR T??RMINOS Y CONDICIONES"
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
};
export default ContentHome;
