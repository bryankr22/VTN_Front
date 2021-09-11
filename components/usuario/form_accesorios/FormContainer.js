import React, { useState } from 'react'
import { Form, Input, Select, } from "semantic-ui-react";
import { useDispatch } from 'react-redux';
import axios from 'axios';

import { updateAccesorio } from '../../../store/accesorioSlice';
import { API_URL } from '../../../helpers/constants';

export default function FormContainer({ data }) {
  const dispatch = useDispatch();
  const [cities, setCities] = useState([]);

  const optionsCondicion = [
    { key: "Nuevo", value: "Nuevo", text: "Nuevo" },
    { key: "Usado", value: "Usado", text: "Usado" },
  ];

  const changeDeparment = (value) => {
    axios.get(`${API_URL}/ciudades/${value}`).then((res) => {
        let optionsCities = [
            { key: "", value: 0, text: "Seleccione municipio..." },
        ];
        res.data.ciudades.forEach(function (item) {
            optionsCities.push({
                key: item.id,
                value: item.id,
                text: item.nombre,
            });
        });
        setCities(optionsCities);
    });
}

  return (
    <>
      <Form.Field>
        <label>TÍTULO*</label>
        <Form.Input
          name="title_acc"
          fluid
          placeholder="Título"
          onChange={(e, { value }) => dispatch(updateAccesorio({ input: 'titulo', value }))}
        />
      </Form.Field>
      <Form.Field>
        <label>DESCRIPCIÓN*</label>
        <Form.TextArea
          name="desc_acc"
          fluid
          placeholder="Descripción"
          onChange={(e, { value }) => dispatch(updateAccesorio({ input: 'descripcion', value }))}
        ></Form.TextArea>
      </Form.Field>
      <Form.Field>
        <label>CONDICIÓN*</label>
        <Select
          name="condicionAcc"
          onChange={(e, { value }) => dispatch(updateAccesorio({ input: 'estado', value }))}
          options={optionsCondicion}
        />
      </Form.Field>
      <Form.Field>
        <label>PRECIO*</label>
        <Input type="text" action>
          <Input
            name="precio_acc"
            type="text"
            placeholder="$"
            onChange={(e, { value }) => dispatch(updateAccesorio({ input: 'precio', value }))}
          />
          <Select
            name="tipoPrecioAcc"
            options={data.tipoPrecio}
            placeholder="Tipo precio"
            onChange={(e, { value }) => dispatch(updateAccesorio({ input: 'tipo_precio', value }))}
          />
        </Input>
      </Form.Field>
      <Form.Field style={{ marginBottom: 10 }}>
        <label>UBICACIÓN*</label>
        <Input type="text" action>
          <Select
            search
            options={data.departamentos}
            fluid
            placeholder="DEPARTAMENTO"
            onChange={(e, { value }) => changeDeparment(value)}
          />
          <Select
            search
            options={cities}
            fluid
            name="ciudad_acc"
            placeholder="MUNICIPIO"
            onChange={(e, { value }) => dispatch(updateAccesorio({ input: 'ciudad', value }))}
          />
        </Input>
      </Form.Field>
    </>
  )
}
