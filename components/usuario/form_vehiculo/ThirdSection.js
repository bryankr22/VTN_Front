import React, { useState } from 'react'
import axios from 'axios';
import { Form, Input, Select, Checkbox, Dropdown, } from "semantic-ui-react";
import { useDispatch, useSelector } from 'react-redux';

import { updateVehiculo } from '../../../store/productoSlice';
import { API_URL } from '../../../helpers/constants';
import { toCurrency } from '../../../helpers/format';

export default function ThirdSection({ estado_vehiculo, data }) {
    const dispatch = useDispatch();
    const [cities, setCities] = useState([]);
    const [stateVehicle, setStateVehicle] = useState('Nuevo');
    const [checkPromotion, setCheckPromotion] = useState(false);
    const [chechPermuta, setChechPermuta] = useState(false);
    const [checkFinanciacion, setCheckFinanciacion] = useState(false);

    const optionsCondicion = [
        { key: "Nuevo", value: "Nuevo", text: "Nuevo" },
        { key: "Usado", value: "Usado", text: "Usado" },
    ];

    const optionsBlindado = [
        { key: 2, value: 2, text: "NO" },
        { key: 1, value: 1, text: "SI" },
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
        dispatch(updateVehiculo({ input: 'departamento_vehiculo', value }))
    }

    const changeState = (value) => {
        setStateVehicle(value)
        dispatch(updateVehiculo({ input: 'estado_vehiculo', value }))
    }

    return (
        <>
            <Form.Field>
                <label>TÍTULO *</label>
                <Form.Input
                    name="titulo_vehiculo"
                    fluid
                    placeholder="Ej: Mazda 3 Gran Touring LX 2017"
                    onChange={(e, { value }) => dispatch(updateVehiculo({ input: 'titulo_vehiculo', value }))}
                />
            </Form.Field>
            <Form.Field>
                <label>DESCRIPCIÓN *</label>
                <Form.TextArea
                    name="descripcion_vehiculo"
                    fluid
                    placeholder="Descripción"
                    onChange={(e, { value }) => dispatch(updateVehiculo({ input: 'descripcion_vehiculo', value }))}
                ></Form.TextArea>
            </Form.Field>
            <Form.Field>
                <label>CONTACTO *</label>
                <Form.Input
                    name="contacto_vehiculo"
                    type="number"
                    min="0"
                    placeholder="Número de contacto"
                    onChange={(e, { value }) => dispatch(updateVehiculo({ input: 'contacto_vehiculo', value }))}
                />
            </Form.Field>
            <Form.Field>
                <label>CONDICIÓN *</label>
                <Select
                    name="estado_vehiculo"
                    options={optionsCondicion}
                    placeholder="Condición"
                    onChange={(e, { value }) => changeState(value)}
                />
            </Form.Field>
            <Form.Field style={{ marginBottom: 10 }}>
                <label>PRECIO *</label>
                <Input type="text" action>
                    <Input
                        name="precio_vehiculo"
                        type="text"
                        placeholder="$"
                        onChange={(e, { value }) => {
                            value = toCurrency(e)
                            dispatch(updateVehiculo({ input: 'precio_vehiculo', value }))
                        }}
                    />
                    <Select
                        name="tipo_precio_vehiculo"
                        options={data.tipoPrecio}
                        placeholder="Tipo precio"
                        onChange={(e, { value }) => dispatch(updateVehiculo({ input: 'tipo_precio_vehiculo', value }))}
                    />
                </Input>
            </Form.Field>

            <Form.Field>
                <Checkbox
                    name="promocion"
                    label="Promoción"
                    style={{ marginRight: 15 }}
                    onChange={() => {
                        const value = !checkPromotion;
                        setCheckPromotion(value);
                        dispatch(updateVehiculo({ input: 'promocion', value }));

                    }}
                />
                <Checkbox
                    name="permuta"
                    label="Acepta Permuta"
                    style={{ marginRight: 15 }}
                    onChange={() => { 
                        const value = !chechPermuta;
                        setChechPermuta(!value); 
                        dispatch(updateVehiculo({ input: 'permuta', value }));
                    }}
                />
                <Checkbox
                    name="financiacion"
                    label="Financiación"
                    onChange={() => { 
                        const value = !checkFinanciacion;
                        setCheckFinanciacion(value); 
                        dispatch(updateVehiculo({ input: 'financiacion', value }));
                    }}
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
                    min="0"
                    placeholder="Km"
                    onChange={(e, { value }) => {
                        value = toCurrency(e)
                        console.log(value)
                        dispatch(updateVehiculo({ input: 'kilometraje_vehiculo', value }))
                    }}
                />
            </Form.Field>
            <Form.Field>
                <label>CILINDRAJE *</label>
                <Input
                    name="cilindraje_vehiculo"
                    min="0"
                    placeholder="Cilindraje"
                    onChange={(e, { value }) => {
                        value = toCurrency(e)
                        dispatch(updateVehiculo({ input: 'cilindraje_vehiculo', value }))
                    }}
                />
            </Form.Field>
            <Form.Field>
                <label>COMBUSTIBLE *</label>
                <Select
                    name="combustible_vehiculo"
                    search
                    options={data.combustibles}
                    placeholder="Selecciona combustible"
                    onChange={(e, { value }) => dispatch(updateVehiculo({ input: 'combustible_vehiculo', value }))}
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
                    onChange={(e, { value }) => dispatch(updateVehiculo({ input: 'color_vehiculo', value }))}
                />
            </Form.Field>
            <Form.Field>
                <label>TRANSMISIÓN *</label>
                <Select
                    name="transmision_vehiculo"
                    search
                    options={data.transmision}
                    placeholder="Selecciona transmisión"
                    onChange={(e, { value }) => dispatch(updateVehiculo({ input: 'transmision_vehiculo', value }))}
                />
            </Form.Field>
            <Form.Field>
                <label>BLINDADO *</label>
                <Select
                    name="blindado_vehiculo"
                    options={optionsBlindado}
                    placeholder="Selecciona blindaje"
                    onChange={(e, { value }) => dispatch(updateVehiculo({ input: 'blindado_vehiculo', value }))}
                />
            </Form.Field>
            {stateVehicle !== "Nuevo" && (
                <Form.Field>
                    <label>ÚLTIMO DÍGITO DE LA PLACA *</label>
                    <Input
                        name="placa_vehiculo"
                        max={9}
                        min={0}
                        placeholder="Placa"
                        id="placa_vehiculo"
                        onChange={(e, { value }) => dispatch(updateVehiculo({ input: 'placa_vehiculo', value }))}
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
                        onChange={(e, { value }) => changeDeparment(value)}
                    />
                    <Select
                        search
                        name="ciudad_vehiculo"
                        options={cities}
                        fluid
                        placeholder="MUNICIPIO"
                        onChange={(e, { value }) => dispatch(updateVehiculo({ input: 'ciudad_vehiculo', value }))}
                    />
                </Input>
            </Form.Field>
        </>
    )
}
