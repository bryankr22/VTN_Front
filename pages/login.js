import React from 'react'
import PublicLayout from '../layouts/PublicLayout';
import { Divider, Grid, Input, Segment, Button, Checkbox, Form, Header, Responsive} from "semantic-ui-react";
export default function login() {
    return (
        <PublicLayout>
        <Responsive {...Responsive.onlyComputer}>
          <Segment style={{ marginTop: 40, marginBottom: 70 }}>
            <Grid
              columns={2}
              relaxed="very"
              style={{ paddingLeft: 100, paddingRight: 100 }}
            >
              <Grid.Column className="column-login">
                <Form>
                  <Form.Field>
                    <Header as="h2">INICIAR SESIÓN</Header>
                    <label>Correo electrónico</label>
                    <input
                      
                      placeholder="Correo electrónico"
                    />
                  </Form.Field>
                  <Form.Field>
                    <label>Contraseña</label>
                    <input
                      type="password"
                      
                      placeholder="Contraseña"
                    />
                  </Form.Field>
                  <Form.Field>
                    <Header style={{ fontSize: 14 }} href="/restablecer" as="a">
                      ¿Olvidaste la contraseña?
                    </Header>
                  </Form.Field>
                  <Button  secondary>
                    INICIAR SESIÓN
                  </Button>
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
            <Form>
              <Form.Field>
                <Header as="h2">INICIAR SESIÓN</Header>
                <label>Correo electrónico</label>
                <input
                  
                  placeholder="Correo electrónico"
                />
              </Form.Field>
              <Form.Field>
                <label>Contraseña</label>
                <input
                  type="password"
                  
                  placeholder="Contraseña"
                />
              </Form.Field>
              <Form.Field>
                <Header style={{ fontSize: 14 }} href="/restablecer" as="a">
                  ¿Olvidaste la contraseña?
                </Header>
              </Form.Field>
              <Button secondary>
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
            <Form>
              <Form.Field>
                <Header as="h2">INICIAR SESIÓN</Header>
                <label>Correo electrónico</label>
                <input
                  
                  placeholder="Correo electrónico"
                />
              </Form.Field>
              <Form.Field>
                <label>Contraseña</label>
                <input
                  type="password"
                  
                  placeholder="Contraseña"
                />
              </Form.Field>
              <Form.Field>
                <Header style={{ fontSize: 14 }} href="/restablecer" as="a">
                  ¿Olvidaste la contraseña?
                </Header>
              </Form.Field>
              <Button  secondary>
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
