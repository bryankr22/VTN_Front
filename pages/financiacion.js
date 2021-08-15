import React from 'react';
import PublicLayout from '../layouts/PublicLayout';
import { Container, Header, Form, Select, Button, Input, Dimmer, Loader } from 'semantic-ui-react'
export default function financiacion() {
    const optionsCuotas = [
        { key: '12', text: '12', value: '12' },
        { key: '24', text: '24', value: '24' },
        { key: '36', text: '36', value: '36' },
        { key: '48', text: '48', value: '48' },
        { key: '72', text: '72', value: '72' },
    ]
    const optionsDataCredito = [
        { key: 'SI', text: 'SI', value: '1' },
        { key: 'NO', text: 'NO', value: '0' },
    ]
    const optionsRangos = [
        { key: '1', text: '1.600.000 - 2.500.000', value: '1' },
        { key: '2', text: '2.500.000 - 5.000.000', value: '2' },
        { key: '3', text: '5.000.000 en adelante', value: '3' },
    ]
    return (
        <PublicLayout>
            <Container style={{ paddingTop: 25 }} text>
                    <Header as='h2'>FINANCIACIÓN</Header>
                    <p style={{ textAlign: 'justify' }}>
                        Para acceder a nuestros recomendados en financiación de vehículos, se requiere diligenciar el siguiente formulario.
                        Posteriormente, un asesor te contactará para resolver todas las inquietudes y colaborarte en el proceso.
                        El servicio de financiación prestado por VENDETUNAVE es tramitado a través de financieras tales como
                        SUFI, Banco de Occidente, FINANDINA, entre otros. Al diligenciar el formulario aceptas el tratamiento de los datos
                        suministrados en nuestro portal, con el compromiso de ser utilizados únicamente para este fin.
                    </p>

                    <Form>
                        <Form.Field>
                            <label>Nombre</label>
                            <Form.Input
                                id="field-nombre"
                                placeholder='Nombre'
                            />
                        </Form.Field>
                        <Form.Field>
                            <label>Apellido</label>
                            <input id="field-apellido"  placeholder='Apellido' />
                        </Form.Field>
                        <Form.Field>
                            <label>Fecha de nacimiento</label>
                            <input id="field-fecha_nacimiento" type='date'  placeholder='Fecha de nacimiento' />
                        </Form.Field>
                        <Form.Field>
                            <label>Correo electrónico</label>
                            <input id="field-email"  placeholder='Email' />
                        </Form.Field>
                        <Form.Field>
                            <label>WhatsApp</label>
                            <input id="field-whatsapp" type='number'  placeholder='WhatsApp' />
                        </Form.Field>
                        <Form.Field>
                            <label>¿Cuánto cuesta el carro que quieres?</label>
                            <Input id="field-cuanto" name="cuanto_cuesta" type="text"  />
                        </Form.Field>
                        <Form.Field>
                            <label>¿Cuánto dinero tienes para la cuota inicial?</label>
                            <Input id="field-inicial" name="cuota_inicial" type="text"  />
                        </Form.Field>
                        <Form.Field
                            id="field-cuotas"
                            control={Select}
                            label='Selecciona el número de cuotas en las que quieres pagarlo'
                            options={optionsCuotas}
                            placeholder='Seleccione número de cuotas'
                        />
                        <Form.Field
                            id="field-datacredito"
                            control={Select}
                            label='¿Está reportado en Datacrédito?'
                            options={optionsDataCredito}
                            placeholder='Seleccione...'
                        />
                        <Form.Field
                            id="field-salario"
                            control={Select}
                            label='Indique el rango salaríal al que pertenece'
                            options={optionsRangos}
                            placeholder='Seleccione...'
                        />
                        <div style={{ marginBottom: '25px', fontWeight: 'bold', }}>
                            NOTA: Si usted gana menos de 2 salarios mínimos no podemos procesar
                            su solicitud de financiación.
                        </div>
                        <Button color='blue'>ENVIAR</Button>
                    </Form>
                </Container>
        </PublicLayout>
    )
}
