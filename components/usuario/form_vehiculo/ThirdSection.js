import React from 'react'
import { Form, Input, Select, Checkbox, Dropdown, } from "semantic-ui-react";
  
export default function ThirdSection({estado_vehiculo , data}) {
    const optionsCondicion = [
        { key: "Nuevo", value: "Nuevo", text: "Nuevo" },
        { key: "Usado", value: "Usado", text: "Usado" },
    ];

    const optionsBlindado = [
        { key: 2, value: 2, text: "NO" },
        { key: 1, value: 1, text: "SI" },
    ];
    return (
        <>
            <Form.Field>
                <label>TÍTULO *</label>
                <Form.Input
                    name="titulo_vehiculo"
                    fluid
                    placeholder="Ej: Mazda 3 Gran Touring LX 2017"
                />
            </Form.Field>
            <Form.Field>
                <label>DESCRIPCIÓN *</label>
                <Form.TextArea
                    name="descripcion_vehiculo"
                    fluid
                    placeholder="Descripción"
                ></Form.TextArea>
            </Form.Field>
            <Form.Field>
                <label>CONTACTO *</label>
                <Form.Input
                    name="contacto_vehiculo"
                    type="text"
                    placeholder="Número de contacto"
                />
            </Form.Field>
            <Form.Field>
                <label>CONDICIÓN *</label>
                <Select
                    name="estado_vehiculo"
                    options={optionsCondicion}
                    placeholder="Condición"
                />
            </Form.Field>
            <Form.Field style={{ marginBottom: 10 }}>
                <label>PRECIO *</label>
                <Input type="text" action>
                    <Input
                        name="precio_vehiculo"
                        type="text"
                        placeholder="$"
                    />
                    <Select
                        name="tipo_precio_vehiculo"
                        options={data.tipoPrecio}
                        placeholder="Tipo precio"
                    />
                </Input>
            </Form.Field>

            <Form.Field>
                <Checkbox
                    name="promocion"
                    label="Promoción"
                    style={{ marginRight: 15 }}
                />
                <Checkbox
                    name="permuta"
                    label="Acepta Permuta"
                    style={{ marginRight: 15 }}
                />
                <Checkbox
                    name="financiacion"
                    label="Financiación"
                />
                <p style={{ color: "#828282" }}>
                    Si marcas que el carro está en promoción, pasará por la
                    aprobación del administrador que determinará si el precio
                    está dentro de los rangos de promoción determinados por la
                    plataforma.
                </p>
            </Form.Field>
            <Form.Field>
                <label>KILOMETRAJE *</label>
                <Input
                    name="kilometraje_vehiculo"
                    type="text"
                    placeholder="Km"
                />
            </Form.Field>
            <Form.Field>
                <label>CILINDRAJE *</label>
                <Input
                    name="cilindraje_vehiculo"
                    type="text"
                    placeholder="Cilindraje"
                />
            </Form.Field>
            <Form.Field>
                <label>COMBUSTIBLE *</label>
                <Select
                    name="combustible_vehiculo"
                    search
                    options={data.combustibles}
                    placeholder="Selecciona combustible"
                />
            </Form.Field>
            <Form.Field>
                <label>COLOR *</label>
                <Dropdown
                    name="color_vehiculo"
                    fluid
                    search
                    selection
                    options={data.colores}
                    placeholder="Selecciona color"
                />
            </Form.Field>
            <Form.Field>
                <label>TRANSMISIÓN *</label>
                <Select
                    name="transmision_vehiculo"
                    search
                    options={data.transmision}
                    placeholder="Selecciona transmisión"
                />
            </Form.Field>
            <Form.Field>
                <label>BLINDADO *</label>
                <Select
                    name="blindado_vehiculo"
                    options={optionsBlindado}
                    placeholder="Selecciona blindaje"
                />
            </Form.Field>
            {estado_vehiculo !== "Nuevo" && (
                <Form.Field>
                    <label>ÚLTIMO DÍGITO DE LA PLACA *</label>
                    <Input
                        name="placa_vehiculo"
                        disabled={true}
                        max={9}
                        min={0}
                        placeholder="Placa"
                        id="placa_vehiculo"
                    />
                </Form.Field>
            )}
            <Form.Field style={{ marginBottom: 10 }}>
                <label>UBICACIÓN *</label>
                <Input type="text" action>
                    <Select
                        search
                        name="departamento_vehiculo"
                        options={data.departamentos}
                        fluid
                        placeholder="DEPARTAMENTO"
                    />
                    <Select
                        search
                        name="ciudad_vehiculo"
                        options={[]}
                        fluid
                        placeholder="MUNICIPIO"
                    />
                </Input>
            </Form.Field>
        </>
    )
}
