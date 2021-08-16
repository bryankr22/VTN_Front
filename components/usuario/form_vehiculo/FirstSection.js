import React, { Component, Fragment } from 'react'
import { Form, Input, Select } from "semantic-ui-react";

export default function FirstSection({tipo_vehiculo, data}) {
    return (
        <Form.Field>
            <label>CATEGORÍAS *</label>
            <Input type="text" action>
                <Select
                    name="tipo_vehiculo"
                    search
                    options={data.categories}
                    fluid
                    placeholder="Tipo"
                />
                <Fragment>
                    {tipo_vehiculo != 5 && (
                        <Select
                            name="marca_vehiculo"
                            search
                            options={data.marcas}
                            fluid
                            placeholder="Marca"
                        />
                    )}
                    {tipo_vehiculo == 5 && (
                        <Fragment>
                            <Select
                                name="tipo_moto_select"
                                search
                                options={data.tipoMotos}
                                fluid
                                placeholder="Tipo Moto"
                            />
                            <Select
                                name="marca_vehiculo"
                                search
                                options={data.marcas}
                                fluid
                                placeholder="Marca"
                            />
                        </Fragment>
                    )}
                    <Select
                        name="modelo_vehiculo"
                        search
                        options={[]}
                        fluid
                        placeholder="Modelo"
                    />
                </Fragment>
                <Form.Input
                    name="anio_vehiculo"
                    type="number"
                    id="group-input"
                    fluid
                    placeholder="Año"
                />
            </Input>
        </Form.Field>
    )
}
