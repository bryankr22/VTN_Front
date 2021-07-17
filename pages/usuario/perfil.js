import React from 'react'
import { Container, Header, Form, Select, Button, Label, Item, Image, Grid, Segment, Responsive, Input, Dimmer, Loader } from 'semantic-ui-react'
import AdminLayout from '../../layouts/AdminLayout';
export default function perfil() {
    return (
        <AdminLayout>
            <Container style={{ paddingTop: 25 }} text>
                <Header as='h2'>DATOS DE LA CUENTA</Header>

                <Responsive {...Responsive.onlyComputer}>
                    <Grid columns='equal'>
                        <Grid.Column style={{ textAlign: 'center' }}>
                            <Image
                                src={''}
                                size='medium'
                                circular
                                bordered
                                style={{ height: 210, marginBottom: 20 }}
                            />
                            <input type="file" className="form-control-file" />
                        </Grid.Column>
                        <Grid.Column width={10}>
                            <Form>
                                <Form.Field>
                                    <label>Nombre y Apellido *</label>
                                    <Input name="name" />
                                </Form.Field>
                                <Form.Field>
                                    <label>Teléfono</label>
                                    <Input type="number" name="tel" />
                                </Form.Field>
                                <Form.Field>
                                    <label>Correo Electrónico</label>
                                    <Input name="email" disabled style={{ opacity: 1 }}/>
                                </Form.Field>
                                <Form.Field>
                                <Form.Select
                                    fluid
                                    label='Género'
                                    options={[]}
                                    placeholder='Seleccione...'
                                    name="genero"
                                />
                                </Form.Field>
                                <Form.Field>
                                    <label>Fecha de nacimiento</label>
                                    <Input name="fecha" type="date" placeholder='Fecha de nacimiento' />
                                </Form.Field>
                            </Form>
                        </Grid.Column>
                    </Grid>
                </Responsive>

                <Responsive {...Responsive.onlyMobile}>
                    <Grid columns='equal'>
                        <Grid.Column width={16}>
                            <Image
                                src={''}
                                size='medium'
                                circular
                                bordered
                                style={{ height: 290, marginBottom: 20 }}
                            />
                            <input type="file" style={{ marginBottom: 20 }} className="form-control-file" />
                            <Form>
                                <Form.Field>
                                    <label>Nombre y Apellido *</label>
                                    <Input name="name" />
                                </Form.Field>
                                <Form.Field>
                                    <label>Teléfono</label>
                                    <Input type="number" name="tel" />
                                </Form.Field>
                                <Form.Field>
                                    <label>Correo Electrónico</label>
                                    <Input name="email" disabled style={{ opacity: 1 }} />
                                </Form.Field>
                                <Form.Field>
                                <Form.Select
                                    fluid
                                    label='Género'
                                    options={[]}
                                    placeholder='Seleccione...'
                                    name="genero"
                                />
                                </Form.Field>
                                <Form.Field>
                                    <label>Fecha de nacimiento</label>
                                    <Input name="fecha" type="date" placeholder='Fecha de nacimiento' />
                                </Form.Field>
                            </Form>
                        </Grid.Column>
                    </Grid>
                </Responsive>
                <Responsive {...Responsive.onlyTablet}>
                    <Grid columns='equal'>
                        <Grid.Column width={16}>
                            <Image
                                src={''}
                                size='medium'
                                circular
                                bordered
                                style={{ height: 290, marginBottom: 20 }}
                            />
                            <input type="file" style={{ marginBottom: 20 }} className="form-control-file" />
                            <Form>
                                <Form.Field>
                                    <label>Nombre y Apellido *</label>
                                    <Input name="name" />
                                </Form.Field>
                                <Form.Field>
                                    <label>Teléfono</label>
                                    <Input type="number" name="tel" />
                                </Form.Field>
                                <Form.Field>
                                    <label>Correo Electrónico</label>
                                    <Input name="email" disabled style={{ opacity: 1 }} />
                                </Form.Field>
                                <Form.Field>
                                <Form.Select
                                    fluid
                                    label='Género'
                                    options={[]}
                                    placeholder='Seleccione...'
                                    name="genero"
                                />
                                </Form.Field>
                                <Form.Field>
                                    <label>Fecha de nacimiento</label>
                                    <Input name="fecha" type="date" placeholder='Fecha de nacimiento' />
                                </Form.Field>
                            </Form>
                        </Grid.Column>
                    </Grid>
                </Responsive>
                <Header as='h2'>CAMBIO DE CONTRASEÑA</Header>
                <Form>
                    <Form.Field>
                        <label>Contraseña actual (déjala en blanco para que no haya cambios)</label>
                        <Input type="password" name="passAct" />
                    </Form.Field>
                    <Form.Field>
                        <label>Nueva contraseña (déjala en blanco para que no haya cambios)</label>
                        <Input type="password" name="passNew" />
                    </Form.Field>
                    <Form.Field>
                        <label>Confirmar nueva contraseña</label>
                        <Input type="password" name="confirmPassNew" />
                    </Form.Field>
                </Form>
                <Button color='blue' style={{ marginTop: 15 }}>GUARDAR CAMBIOS</Button>
            </Container>
        </AdminLayout>
    )
}
