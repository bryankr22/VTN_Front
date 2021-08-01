import React from 'react'
import { Form, Input, Select, } from "semantic-ui-react";
  
export default function FormContainer() {
    return (
        <>
          <Form.Field>
                <label>TÍTULO</label>
                <Form.Input
                name="title_acc"
                fluid
                placeholder="Título"
                />
            </Form.Field>
            <Form.Field>
                <label>DESCRIPCIÓN</label>
                <Form.TextArea
                name="desc_acc"
                fluid
                placeholder="Descripción"
                ></Form.TextArea>
            </Form.Field>
            <Form.Field>
                <label>CONDICIÓN</label>
                <Select
                name="condicionAcc"
                options={[]}
                />
            </Form.Field>
            <Form.Field>
                <label>PRECIO</label>
                <Input type="text" action>
                    <Input
                    name="precio_acc"
                    type="text"
                    placeholder="$"
                    />
                    <Select
                    name="tipoPrecioAcc"
                    options={[]}
                    placeholder="Tipo precio"
                    />
                </Input>
            </Form.Field>
            <Form.Field style={{ marginBottom: 10 }}>
                <label>UBICACIÓN</label>
                <Input type="text" action>
                    <Select
                    search
                    options={[]}
                    fluid
                    placeholder="DEPARTAMENTO"
                    />
                    <Select
                    search
                    options={[]}
                    fluid
                    name="ciudad_acc"
                    placeholder="MUNICIPIO"
                    />
                </Input>
            </Form.Field>
        </>
    )
}
