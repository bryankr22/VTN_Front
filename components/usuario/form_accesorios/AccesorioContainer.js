import React from 'react'
import { Form, Responsive, Button, Select } from "semantic-ui-react";
import FotosContainer from './FotosContainer';
import FormContainer from './FormContainer';
export default function AccesorioContainer({data}) {
    return (
        <Form>
            <Responsive {...Responsive.onlyComputer}>
                <Form.Field>
                    <label>CATEGORÍAS</label>
                    <Select
                        name="categoriaAccesorio"
                        options={data.tipoAccesorio}
                        placeholder="Tipo de producto"
                    />
                </Form.Field>
                <Form.Field style={{ marginTop: 20 }}>
                    <label>Agrega una o más fotos (Máximo 5 fotos)*</label>
                    <FotosContainer />
                </Form.Field>
                <FormContainer data={data} />
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
                <Form.Field>
                    <label>CATEGORÍAS</label>
                    <Select
                        name="categoriaAccesorio"
                        options={[]}
                        placeholder="Tipo de producto"
                    />
                </Form.Field>
                <Form.Field style={{ marginTop: 20 }}>
                    <label>Agrega una o más fotos (Máximo 5 fotos)*</label>
                    <FotosContainer />
                </Form.Field>
                <FormContainer data={data} />
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
            <Responsive {...Responsive.onlyTablet}>
                <Form.Field>
                    <label>CATEGORÍAS</label>
                    <Select
                        name="categoriaAccesorio"
                        options={[]}
                        placeholder="Tipo de producto"
                    />
                </Form.Field>
                <Form.Field style={{ marginTop: 20 }}>
                    <label>Agrega una o más fotos (Máximo 5 fotos)*</label>
                    <FotosContainer />
                </Form.Field>
                <FormContainer data={data} />

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
        </Form>
    )
}
