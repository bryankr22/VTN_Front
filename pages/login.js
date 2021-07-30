import React, {useState} from 'react'
import PublicLayout from '../layouts/PublicLayout';
import { Divider, Grid, Input, Segment, Button, Checkbox, Form, Header, Responsive, Dimmer, Loader} from "semantic-ui-react";
import axios from 'axios';
import { useCookies } from "react-cookie"
import { AUTH_URL, login_api } from '../helpers/constants';
import jwt from 'jsonwebtoken';
import { useRouter } from 'next/router'
export default function login(props) {
    const router = useRouter();
    const [cookie, setCookie] = useCookies(["vtn_token"])
    const [login, setLogin] = useState({
        email: '',
        password: ''
    })
    const [loading, setLoading] = useState(false);
    const sendLogin = () => {
        setLoading(true);
        const {email, password} = login;
        axios.post(AUTH_URL + login_api, { email, password }).then((res) => {
            const token = jwt.sign(res.data, 'vendetunave2021');
            setCookie('vtn_token', token, {
                path: "/",
                maxAge: 3600,
                sameSite: true
            });
            router.push('/usuario/perfil');
            //console.log(">>>>", res.data);
            setLoading(false);
        }).catch(error => {
            setLoading(false);
        });
    }
    const updateForm = (field, value) => {
        setLogin({
            ...login,
            [field] : value
        })
    }
    return (
        <PublicLayout {...props}>
        <Dimmer style={{ position: "fixed" }} active={loading}>
            <Loader>Cargando...</Loader>
        </Dimmer>        
        <Responsive {...Responsive.onlyComputer}>
          <Segment style={{ marginTop: 40, marginBottom: 70 }}>
            <Grid
              columns={2}
              relaxed="very"
              style={{ paddingLeft: 100, paddingRight: 100 }}
            >
              <Grid.Column className="column-login">
                <Form onSubmit={ () => sendLogin() }>
                  <Form.Field>
                    <Header as="h2">INICIAR SESIÓN</Header>
                    <label>Correo electrónico</label>
                    <input
                      placeholder="Correo electrónico"
                      value={login.email} 
                      onChange={(e) => updateForm('email', e.target.value) }
                    />
                  </Form.Field>
                  <Form.Field>
                    <label>Contraseña</label>
                    <input
                      type="password"
                      placeholder="Contraseña"
                      value={login.password} 
                      onChange={(e) => updateForm('password', e.target.value) }
                    />
                  </Form.Field>
                  <Form.Field>
                    <Header style={{ fontSize: 14 }} href="/restablecer" as="a">
                      ¿Olvidaste la contraseña?
                    </Header>
                  </Form.Field>
                  <Form.Button 
                  content='Submit'
                  secondary>
                    INICIAR SESIÓN
                  </Form.Button>
                </Form>
              </Grid.Column>
              <Grid.Column className="column-login">
                <Form>
                  <Form.Field>
                    <Header as="h2">REGISTRARSE</Header>
                    <label>Nombre</label>
                    <Input
                      name="nombre_register"
                      placeholder="Nombre"
                      
                    />
                  </Form.Field>
                  <Form.Field>
                    <label>Correo electrónico</label>
                    <Input
                      name="email_register"
                      placeholder="Correo electrónico"
                      
                      id="email_register"
                    />
                  </Form.Field>
                  <Form.Field>
                    <label>Contraseña</label>
                    <Input
                      name="pass_register"
                      type="password"
                      placeholder="Contraseña"
                      
                    />
                  </Form.Field>
                  <Form.Field>
                    <Checkbox
                      label="Subscribirse al newsletter"
                    />
                  </Form.Field>
                  <Button secondary>
                    REGISTRARSE
                  </Button>
                </Form>
              </Grid.Column>
            </Grid>

            <Divider vertical></Divider>
          </Segment>
        </Responsive>

        <Responsive {...Responsive.onlyMobile}>
          <Segment style={{ marginTop: 20 }} basic textAlign="center">
            <Form onSubmit={ () => sendLogin() }>
              <Form.Field>
                <Header as="h2">INICIAR SESIÓN</Header>
                <label>Correo electrónico</label>
                <input
                    placeholder="Correo electrónico"
                    value={login.email} 
                    onChange={(e) => updateForm('email', e.target.value) }
                />
              </Form.Field>
              <Form.Field>
                <label>Contraseña</label>
                <input
                    type="password"
                    placeholder="Contraseña"
                    value={login.password} 
                    onChange={(e) => updateForm('password', e.target.value) }
                />
              </Form.Field>
              <Form.Field>
                <Header style={{ fontSize: 14 }} href="/restablecer" as="a">
                  ¿Olvidaste la contraseña?
                </Header>
              </Form.Field>
              <Button 
              content='submit'
              secondary>
                INICIAR SESIÓN
              </Button>
            </Form>

            <Divider horizontal>Ó</Divider>

            <Form>
              <Form.Field>
                <Header as="h2">REGISTRARSE</Header>
                <label>Nombre</label>
                <Input
                  name="nombre_register"
                  placeholder="Nombre"
                  
                />
              </Form.Field>
              <Form.Field>
                <label>Correo electrónico</label>
                <Input
                  name="email_register"
                  placeholder="Correo electrónico"
                 
                  id="email_register"
                />
              </Form.Field>
              <Form.Field>
                <label>Contraseña</label>
                <Input
                  name="pass_register"
                  type="password"
                  placeholder="Contraseña"
                  
                />
              </Form.Field>
              <Form.Field>
                <Checkbox
                  
                  label="Subscribirse al newsletter"
                />
              </Form.Field>
              <Button  secondary>
                REGISTRARSE
              </Button>
            </Form>
          </Segment>
        </Responsive>
        <Responsive {...Responsive.onlyTablet}>
          <Segment style={{ marginTop: 20 }} basic textAlign="center">
            <Form onSubmit={ () => sendLogin() }>
              <Form.Field>
                <Header as="h2">INICIAR SESIÓN</Header>
                <label>Correo electrónico</label>
                <input
                      placeholder="Correo electrónico"
                      value={login.email} 
                      onChange={(e) => updateForm('email', e.target.value) }
                    />
              </Form.Field>
              <Form.Field>
                <label>Contraseña</label>
                <input
                      type="password"
                      placeholder="Contraseña"
                      value={login.password} 
                      onChange={(e) => updateForm('password', e.target.value) }
                    />
              </Form.Field>
              <Form.Field>
                <Header style={{ fontSize: 14 }} href="/restablecer" as="a">
                  ¿Olvidaste la contraseña?
                </Header>
              </Form.Field>
              <Button  
              content='submit'
              secondary>
                INICIAR SESIÓN
              </Button>
            </Form>

            <Divider horizontal>Ó</Divider>

            <Form>
              <Form.Field>
                <Header as="h2">REGISTRARSE</Header>
                <label>Nombre</label>
                <Input
                  name="nombre_register"
                  placeholder="Nombre"
                  
                />
              </Form.Field>
              <Form.Field>
                <label>Correo electrónico</label>
                <Input
                  name="email_register"
                  placeholder="Correo electrónico"
                  
                  id="email_register"
                />
              </Form.Field>
              <Form.Field>
                <label>Contraseña</label>
                <Input
                  name="pass_register"
                  type="password"
                  placeholder="Contraseña"
                  
                />
              </Form.Field>
              <Form.Field>
                <Checkbox
                  
                  label="Subscribirse al newsletter"
                />
              </Form.Field>
              <Button secondary>
                REGISTRARSE
              </Button>
            </Form>
          </Segment>
        </Responsive>
        </PublicLayout>
    )
}