import React, {useState} from 'react'
import PublicLayout from '../layouts/PublicLayout';
import { Divider, Grid, Input, Segment, Button, Checkbox, Form, Header, Responsive, Dimmer, Loader, Message} from "semantic-ui-react";
import axios from 'axios';
import { useCookies } from "react-cookie"
import { AUTH_URL, login_api, register_api } from '../helpers/constants';
import jwt from 'jsonwebtoken';
import { useRouter } from 'next/router'
export default function login(props) {
    const router = useRouter();
    const [cookie, setCookie] = useCookies(["vtn_token"])
    const [login, setLogin] = useState({
        email: '',
        password: ''
    })
    const [register, setRegister] = useState({
        email: '',
        password: '',
        nombre: '',
        remember: false
    })
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    const [errorRegister, setErrorRegister] = useState(false);
    
    const sendLogin = (register = false, email = login.email, password = login.password) => {
        setLoading(true);
        axios.post(AUTH_URL + login_api, { email, password }).then((res) => {
            const token = jwt.sign(res.data, 'vendetunave2021');
            setCookie('vtn_token', token, {
                path: "/",
                maxAge: 3600,
                sameSite: true
            });
            router.push(register ? '/usuario/perfil' : '/');
            //console.log(">>>>", res.data);
            setLoading(false);
        }).catch(error => {
            setError(true);
            setLoading(false);
        });
    }
    const sendRegister = () => {
        setLoading(true);

        axios.post(AUTH_URL + register_api, { ...register }).then((res) => {
            sendLogin(true, register.email, register.password);
        }).catch(error => {
            setErrorRegister(true);
            setLoading(false);
        });
    }
    const updateForm = (field, value) => {
        setLogin({
            ...login,
            [field] : value
        })
    }
    const updateRegistro = (field, value) => {
        setRegister({
            ...register,
            [field] : value
        })
    }
    return (
      <PublicLayout {...props}>
        <style>
          {`
          .field input {
            border: 1px solid rgba(34,36,38,.15);
          }

          `}
        </style>
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
                <Form onSubmit={() => sendLogin()} error={error}>
                  <Message
                    error
                    header="Error Login"
                    content="Credenciales incorrectas, intentelo de nuevo."
                  />
                  <Form.Field>
                    <Header as="h2">INICIAR SESIÓN</Header>
                    <label>Correo electrónico</label>
                    <input
                      placeholder="Correo electrónico"
                      value={login.email}
                      onChange={(e) => updateForm("email", e.target.value)}
                    />
                  </Form.Field>
                  <Form.Field>
                    <label>Contraseña</label>
                    <input
                      type="password"
                      placeholder="Contraseña"
                      value={login.password}
                      onChange={(e) => updateForm("password", e.target.value)}
                    />
                  </Form.Field>
                  <Form.Field>
                    <Header style={{ fontSize: 14 }} href="/restablecer" as="a">
                      ¿Olvidaste la contraseña?
                    </Header>
                  </Form.Field>
                  <Form.Button content="Submit" secondary>
                    INICIAR SESIÓN
                  </Form.Button>
                </Form>
              </Grid.Column>
              <Grid.Column className="column-login">
                <Form onSubmit={() => sendRegister()} error={errorRegister}>
                  <Message
                    error
                    header="Error Registro"
                    content="El correo ya existe o Falta algun dato, intentelo de nuevo."
                  />
                  <Form.Field>
                    <Header as="h2">REGISTRARSE</Header>
                    <label>Nombre</label>
                    <Input
                      name="nombre_register"
                      placeholder="Nombre"
                      value={register.nombre}
                      onChange={(e) => updateRegistro("nombre", e.target.value)}
                    />
                  </Form.Field>
                  <Form.Field>
                    <label>Correo electrónico</label>
                    <Input
                      name="email_register"
                      placeholder="Correo electrónico"
                      value={register.email}
                      onChange={(e) => updateRegistro("email", e.target.value)}
                      id="email_register"
                    />
                  </Form.Field>
                  <Form.Field>
                    <label>Contraseña</label>
                    <Input
                      name="pass_register"
                      type="password"
                      placeholder="Contraseña"
                      value={register.password}
                      onChange={(e) =>
                        updateRegistro("password", e.target.value)
                      }
                    />
                  </Form.Field>
                  <Form.Field>
                    <Checkbox
                      label="Subscribirse al newsletter"
                      value={register.remember}
                      onChange={(e) =>
                        updateRegistro("remember", !register.remember)
                      }
                    />
                  </Form.Field>
                  <Button secondary>REGISTRARSE</Button>
                </Form>
              </Grid.Column>
            </Grid>

            <Divider vertical></Divider>
          </Segment>
        </Responsive>

        <Responsive {...Responsive.onlyMobile}>
          <Segment style={{ marginTop: 20 }} basic textAlign="center">
            <Form onSubmit={() => sendLogin()} error={error}>
              <Message
                error
                header="Error Login"
                content="Credenciales incorrectas, intentelo de nuevo."
              />
              <Form.Field>
                <Header as="h2">INICIAR SESIÓN</Header>
                <label>Correo electrónico</label>
                <input
                  placeholder="Correo electrónico"
                  value={login.email}
                  onChange={(e) => updateForm("email", e.target.value)}
                />
              </Form.Field>
              <Form.Field>
                <label>Contraseña</label>
                <input
                  type="password"
                  placeholder="Contraseña"
                  value={login.password}
                  onChange={(e) => updateForm("password", e.target.value)}
                />
              </Form.Field>
              <Form.Field>
                <Header style={{ fontSize: 14 }} href="/restablecer" as="a">
                  ¿Olvidaste la contraseña?
                </Header>
              </Form.Field>
              <Button content="submit" secondary>
                INICIAR SESIÓN
              </Button>
            </Form>

            <Divider horizontal>Ó</Divider>

            <Form onSubmit={() => sendRegister()} error={errorRegister}>
              <Message
                error
                header="Error Registro"
                content="El correo ya existe o Falta algun dato, intentelo de nuevo."
              />
              <Form.Field>
                <Header as="h2">REGISTRARSE</Header>
                <label>Nombre</label>
                <Input 
                  name="nombre_register" 
                  placeholder="Nombre" 
                  onChange={(e) => updateRegistro("nombre", e.target.value)}  
                />
              </Form.Field>
              <Form.Field>
                <label>Correo electrónico</label>
                <Input
                  name="email_register"
                  placeholder="Correo electrónico"
                  id="email_register"
                  onChange={(e) => updateRegistro("email", e.target.value)}
                  
                />
              </Form.Field>
              <Form.Field>
                <label>Contraseña</label>
                <Input
                  name="pass_register"
                  type="password"
                  placeholder="Contraseña"
                  onChange={(e) =>
                    updateRegistro("password", e.target.value)
                  }
                />
              </Form.Field>
              <Form.Field>
                <Checkbox 
                  label="Subscribirse al newsletter" 
                  onChange={(e) =>
                    updateRegistro("remember", !register.remember)
                  }  
                />
              </Form.Field>
              <Button secondary>REGISTRARSE</Button>
            </Form>
          </Segment>
        </Responsive>
        <Responsive {...Responsive.onlyTablet}>
          <Segment style={{ marginTop: 20 }} basic textAlign="center">
            <Form onSubmit={() => sendLogin()} error={error}>
              <Message
                error
                header="Error Login"
                content="Credenciales incorrectas, intentelo de nuevo."
              />
              <Form.Field>
                <Header as="h2">INICIAR SESIÓN</Header>
                <label>Correo electrónico</label>
                <input
                  placeholder="Correo electrónico"
                  value={login.email}
                  onChange={(e) => updateForm("email", e.target.value)}
                />
              </Form.Field>
              <Form.Field>
                <label>Contraseña</label>
                <input
                  type="password"
                  placeholder="Contraseña"
                  value={login.password}
                  onChange={(e) => updateForm("password", e.target.value)}
                />
              </Form.Field>
              <Form.Field>
                <Header style={{ fontSize: 14 }} href="/restablecer" as="a">
                  ¿Olvidaste la contraseña?
                </Header>
              </Form.Field>
              <Button content="submit" secondary>
                INICIAR SESIÓN
              </Button>
            </Form>

            <Divider horizontal>Ó</Divider>

            <Form onSubmit={() => sendRegister()} error={errorRegister}>
              <Message
                error
                header="Error Registro"
                content="El correo ya existe o Falta algun dato, intentelo de nuevo."
              />
              <Form.Field>
                <Header as="h2">REGISTRARSE</Header>
                <label>Nombre</label>
                <Input 
                  name="nombre_register" 
                  placeholder="Nombre" 
                  onChange={(e) => updateRegistro("nombre", e.target.value)}  
                />
              </Form.Field>
              <Form.Field>
                <label>Correo electrónico</label>
                <Input
                  name="email_register"
                  placeholder="Correo electrónico"
                  id="email_register"
                  onChange={(e) => updateRegistro("email", e.target.value)}
                />
              </Form.Field>
              <Form.Field>
                <label>Contraseña</label>
                <Input
                  name="pass_register"
                  type="password"
                  placeholder="Contraseña"
                  onChange={(e) =>
                    updateRegistro("password", e.target.value)
                  }
                />
              </Form.Field>
              <Form.Field>
                <Checkbox 
                  label="Subscribirse al newsletter" 
                  onChange={(e) =>
                    updateRegistro("remember", !register.remember)
                  }
                />
              </Form.Field>
              <Button secondary>REGISTRARSE</Button>
            </Form>
          </Segment>
        </Responsive>
      </PublicLayout>
    );
}