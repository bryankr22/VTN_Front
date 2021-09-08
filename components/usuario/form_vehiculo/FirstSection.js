import React, { Component, Fragment, useState } from 'react'
import axios from 'axios';
import { Form, Input, Select } from "semantic-ui-react";
import { useDispatch, useSelector } from 'react-redux';
import { updateVehiculo } from '../../../store/productoSlice';
import { API_URL } from '../../../helpers/constants';

export default function FirstSection({tipo_vehiculo, data}) {
    const dispatch = useDispatch();
    const vehiculoRedux = useSelector(({ producto }) => producto.vehiculo);
    const [marcas, setMarcas] = useState([])
    const [modelos, setModelos] = useState([])
    const changeTipoVehiculo = (value) => {
        if(value !== 5){
            axios.get(`${API_URL}/marcas/${value}`).then((res) => {
                let optionsMarcas = [
                    { key: "", value: 0, text: "Seleccione marca..." },
                ];
                res.data.marcas.forEach(function (item) {
                    optionsMarcas.push({
                        key: item.id,
                        value: item.id,
                        text: item.nombre,
                    });
                });
                setMarcas(optionsMarcas);
            });
        }
        dispatch(updateVehiculo({input: 'tipo_vehiculo', value}))
    }
    const changeMarca = (value) => {
        axios.get(`${API_URL}/modelos/${value}`).then((res) => {
            let optionsModelos = [
                { key: "", value: 0, text: "Seleccione modelo..." },
            ];
            res.data.modelos.forEach(function (item) {
                optionsModelos.push({
                    key: item.id,
                    value: item.id,
                    text: item.nombre,
                });
            });
            setModelos(optionsModelos);
        });
        dispatch(updateVehiculo({input: 'marca', value}))
    }
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
                    onChange={(e, {value}) => changeTipoVehiculo(value)}
                />
                <Fragment>
                    {vehiculoRedux?.tipo_vehiculo != 5 && (
                        <Select
                            name="marca_vehiculo"
                            search
                            options={marcas}
                            fluid
                            placeholder="Marca"
                            onChange={(e, {value}) => changeMarca(value)}
                        />
                    )}
                    {vehiculoRedux?.tipo_vehiculo == 5 && (
                        <Fragment>
                            <Select
                                name="tipo_moto_select"
                                search
                                options={data.tipoMotos}
                                fluid
                                placeholder="Tipo Moto"
                                onChange={(e, {value}) => dispatch(updateVehiculo({input : 'tipo_moto', value}))}
                            />
                            <Select
                                name="marca_vehiculo"
                                search
                                options={marcas}
                                fluid
                                placeholder="Marca"
                                onChange={(e, {value}) => changeMarca(value)}
                            />
                        </Fragment>
                    )}
                    {vehiculoRedux?.marca != 0 && (
                    <Select
                        name="modelo_vehiculo"
                        search
                        options={modelos}
                        fluid
                        placeholder="Modelo"
                        onChange={(e, {value}) => dispatch(updateVehiculo({input: 'modelo', value}))}
                    />
                    )}
                </Fragment>
                <Form.Input
                    name="anio_vehiculo"
                    type="number"
                    id="group-input"
                    fluid
                    placeholder="Año"
                    onChange={(e, {value}) => dispatch(updateVehiculo({input: 'anio', value}))}
                />
            </Input>
        </Form.Field>
    )
}
