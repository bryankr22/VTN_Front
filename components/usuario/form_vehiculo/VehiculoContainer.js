import React, { Component, Fragment } from 'react'
import FirstSection from './FirstSection'
import SecondSection from './SecondSection'
import ThirdSection from './ThirdSection'
import { Form, Responsive, Button } from "semantic-ui-react";

export default function VehiculoContainer() {
    return (
        <Form>
            <Responsive {...Responsive.onlyComputer}>
                <FirstSection />
                <Form.Field style={{ marginTop: 20 }}>
                    <label>Agrega una o más fotos (Mínimo 5 fotos)*</label>
                    <SecondSection />
                </Form.Field>
                <ThirdSection />
                <Button
                style={{ marginBottom: 10 }}
                color="blue"
                type="submit"
                >
                    PUBLICAR
                </Button>
                <br />
                <a
                href="/terminos-y-condiciones"
                target="_blank"
                style={{ color: "#828282" }}
                >
                    Al publicar un aviso, admites y aceptas los Términos y
                    Condiciones de VENDETUNAVE.CO
                </a>
            </Responsive>
            <Responsive {...Responsive.onlyMobile}>
                <FirstSection />
                <Form.Field style={{ marginTop: 20 }}>
                    <label>Agrega una o más fotos (Mínimo 5 fotos)*</label>
                </Form.Field>
            </Responsive>
            <Responsive {...Responsive.onlyTablet}>
                <FirstSection />
                <Form.Field style={{ marginTop: 20 }}>
                    <label>Agrega una o más fotos (Mínimo 5 fotos)*</label>
                </Form.Field>
            </Responsive>
        </Form>
    )
}
