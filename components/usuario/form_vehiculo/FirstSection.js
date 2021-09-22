import React, { Component, Fragment, useEffect, useState } from "react";
import axios from "axios";
import { Form, FormField, Input, Select } from "semantic-ui-react";
import { useDispatch, useSelector } from "react-redux";
import { updateVehiculo } from "../../../store/productoSlice";
import { API_URL, GET_BRANDS } from "../../../helpers/constants";

export default function FirstSection({ tipo_vehiculo, data, isMobile }) {
  const dispatch = useDispatch();
  const vehiculoRedux = useSelector(({ producto }) => producto.vehiculo);
  const [marcas, setMarcas] = useState([]);
  const [marcasMotos, setMarcasMotos] = useState([]);
  const [modelos, setModelos] = useState([]);
  const changeTipoVehiculo = (value) => {
    if (value !== 5) {
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
    dispatch(updateVehiculo({ input: "tipo_vehiculo", value }));
  };
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
    dispatch(updateVehiculo({ input: "marca", value }));
  };

  const fetchBike = async () => {
    const res = await axios.get(GET_BRANDS.replace(':id', 5)).catch(() => []);
    const optionsMarcas = [{ key: "", value: "", text: "Marca" }];
    res?.data?.marcas?.forEach?.(function (item) {
        optionsMarcas.push({
            key: item.id,
            value: item.id,
            text: item.nombre,
        });
    });

    setMarcasMotos(optionsMarcas)

  }

  useEffect(() => {
    fetchBike()
  }, [])

  return isMobile ? (
    <>
      <Form.Field>
        <label>CATEGORÍAS *</label>
        <Select
          name="tipo_vehiculo"
          search
          options={data.categories}
          fluid
          placeholder="Tipo"
          onChange={(e, { value }) => changeTipoVehiculo(value)}
        />
      </Form.Field>
      {vehiculoRedux?.tipo_vehiculo != 5 && (
        <Form.Field>
          <label>Marca</label>
          <Select
            name="marca_vehiculo"
            search
            options={marcas}
            fluid
            placeholder="Marca"
            onChange={(e, { value }) => changeMarca(value)}
          />
        </Form.Field>
      )}
      {vehiculoRedux?.tipo_vehiculo == 5 && (
        <>
          <Form.Field>
            <label>Tipo Moto</label>
            <Select
              name="tipo_moto_select"
              search
              options={data.tipoMotos}
              fluid
              placeholder="Tipo Moto"
              onChange={(e, { value }) =>
                dispatch(updateVehiculo({ input: "tipo_moto", value }))
              }
            />
          </Form.Field>
          <Form.Field>
            <label>Marca</label>
            <Select
              name="marca_vehiculo"
              search
              options={marcasMotos}
              fluid
              placeholder="Marca"
              onChange={(e, { value }) => changeMarca(value)}
            />
          </Form.Field>
        </>
      )}
      {vehiculoRedux?.marca != 0 && (
        <Form.Field>
          <label>Modelo</label>
          <Select
            name="modelo_vehiculo"
            search
            options={modelos}
            fluid
            placeholder="Modelo"
            onChange={(e, { value }) =>
              dispatch(updateVehiculo({ input: "modelo", value }))
            }
          />
        </Form.Field>
      )}
      <Form.Field>
        <label>Año</label>
        <Form.Input
          name="anio_vehiculo"
          type="number"
          id="group-input"
          fluid
          placeholder="Año"
          onChange={(e, { value }) =>
            dispatch(updateVehiculo({ input: "anio", value }))
          }
        />
      </Form.Field>
    </>
  ) : (
    <Form.Field>
      <label>CATEGORÍAS *</label>
      <Input type="text" action>
        <Select
          name="tipo_vehiculo"
          search
          options={data.categories}
          fluid
          placeholder="Tipo"
          onChange={(e, { value }) => changeTipoVehiculo(value)}
        />
        <Fragment>
          {vehiculoRedux?.tipo_vehiculo != 5 && (
            <Select
              name="marca_vehiculo"
              search
              options={marcas}
              fluid
              placeholder="Marca"
              onChange={(e, { value }) => changeMarca(value)}
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
                onChange={(e, { value }) =>
                  dispatch(updateVehiculo({ input: "tipo_moto", value }))
                }
              />
              <Select
                name="marca_vehiculo"
                search
                options={marcasMotos}
                fluid
                placeholder="Marca"
                onChange={(e, { value }) => changeMarca(value)}
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
              onChange={(e, { value }) =>
                dispatch(updateVehiculo({ input: "modelo", value }))
              }
            />
          )}
        </Fragment>
        <Form.Input
          name="anio_vehiculo"
          type="number"
          id="group-input"
          fluid
          placeholder="Año"
          onChange={(e, { value }) =>
            dispatch(updateVehiculo({ input: "anio", value }))
          }
        />
      </Input>
    </Form.Field>
  );
}
