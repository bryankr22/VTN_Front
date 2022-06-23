import React, { useEffect, useState } from "react";
import axios from "axios";
import { Form, Input, Select, Checkbox, Dropdown } from "semantic-ui-react";
import { useSelector, useDispatch } from "react-redux";

import InputFile from "../../../components/InputFile";
import { updateVehiculo } from "../../../store/productoSlice";
import { API_URL, AUTH_URL } from "../../../helpers/constants";
import { toCurrency } from "../../../helpers/format";
import { dark, light } from "../../../helpers/colors";

const optionsCondicion = [
  { key: "Nuevo", value: "Nuevo", text: "Nuevo" },
  { key: "Usado", value: "Usado", text: "Usado" },
];

const optionsGeneric = [
  { key: 0, value: 0, text: "NO" },
  { key: 1, value: 1, text: "SI" },
];

export default function ThirdSection({ data: { edit, ...data }, isMobile, darkMode }) {
  const dispatch = useDispatch();
  const vehiculoRedux = useSelector(({ producto }) => producto.vehiculo);
  console.log(vehiculoRedux);
  const [cities, setCities] = useState(() => edit?.ciudades || []);
  const [examination, setExamination] = useState(() =>
    edit ? (edit?.vehiculo?.peritaje !== null && edit?.vehiculo?.peritaje !== '' && edit?.vehiculo?.peritaje != 0 ? 1 : 0) : ''
  );
  const [stateVehicle, setStateVehicle] = useState(edit?.vehiculo.condicion ? edit.vehiculo.condicion : "Nuevo");

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
    dispatch(updateVehiculo({ input: "departamento_vehiculo", value }));
  };

  const changeState = (value) => {
    setStateVehicle(value);
    dispatch(updateVehiculo({ input: "estado_vehiculo", value }));
  };

  useEffect(() => {
    dispatch(updateVehiculo({ input: "peritaje_vehiculo", value: examination }));
  }, [examination]);

  const colorText = darkMode === light ? dark : light;
  return (
    <>
      <Form.Field>
        <label style={{ color: colorText }}>TÍTULO *</label>
        <Form.Input
          name="titulo_vehiculo"
          fluid
          defaultValue={edit?.vehiculo?.title}
          placeholder="Ej: Mazda 3 Gran Touring LX 2017"
          onChange={(e, { value }) =>
            dispatch(updateVehiculo({ input: "titulo_vehiculo", value }))
          }
        />
      </Form.Field>
      <Form.Field>
        <label style={{ color: colorText }}>DESCRIPCIÓN *</label>
        <Form.TextArea
          name="descripcion_vehiculo"
          fluid
          placeholder="Descripción"
          defaultValue={edit?.vehiculo?.descripcion}
          onChange={(e, { value }) =>
            dispatch(updateVehiculo({ input: "descripcion_vehiculo", value }))
          }
        ></Form.TextArea>
      </Form.Field>

      <Form.Field>
        <label style={{ color: colorText }}>CONTACTO *</label>
        <Form.Input
          name="contacto_vehiculo"
          type="number"
          min="0"
          inputmode="numeric"
          pattern="[0-9]*"
          placeholder="Número de contacto"
          defaultValue={edit?.vehiculo?.contacto}
          onChange={(e, { value }) => {
            value = isNaN(value) ? value.slice(0, -1) : value;
            e.target.value = value;
            dispatch(updateVehiculo({ input: "contacto_vehiculo", value }));
          }}
        />
      </Form.Field>
      <Form.Field>
        <label style={{ color: colorText }}>CONDICIÓN *</label>
        <Select
          name="estado_vehiculo"
          options={optionsCondicion}
          placeholder="Condición"
          defaultValue={
            optionsCondicion.find(
              (item) => edit?.vehiculo?.condicion == item.value
            )?.value
          }
          onChange={(e, { value }) => changeState(value)}
        />
      </Form.Field>

      <Form.Field style={{ marginBottom: 10 }}>
        <label style={{ color: colorText }}>PRECIO *</label>
        <Input
          name="precio_vehiculo"
          type="text"
          placeholder="$"
          defaultValue={
            edit &&
            toCurrency({ target: { value: "" + edit?.vehiculo?.precio } })
          }
          onChange={(e, { value }) => {
            value = toCurrency(e);
            dispatch(updateVehiculo({ input: "precio_vehiculo", value }));
          }}
        />
      </Form.Field>
      <Form.Field style={{ marginBottom: 10 }}>
        <Select
          name="tipo_precio_vehiculo"
          options={data.tipoPrecio}
          placeholder="Tipo precio"
          defaultValue={
            data.tipoPrecio?.find(
              (item) => item.value == edit?.vehiculo.tipo_precio
            )?.value
          }
          onChange={(e, { value }) =>
            dispatch(updateVehiculo({ input: "tipo_precio_vehiculo", value }))
          }
        />
      </Form.Field>

      <style>{`
        .ui.checkbox > label {
          color: ${colorText}
        }
      `}</style>
      <Form.Field>
        <Checkbox
          name="promocion"
          label="Promoción"
          style={{ marginRight: 15 }}
          defaultChecked={!!edit?.vehiculo?.promocion}
          onChange={(_, { checked }) => {
            dispatch(updateVehiculo({ input: "promocion", value: checked }));
          }}
        />
        <Checkbox
          name="permuta"
          label="Acepta Permuta"
          style={{ marginRight: 15 }}
          defaultChecked={!!edit?.vehiculo?.permuta}
          onChange={(_, { checked }) => {
            dispatch(updateVehiculo({ input: "permuta", value: checked }));
          }}
        />
        <Checkbox
          name="financiacion"
          label="Financiación"
          defaultChecked={!!edit?.vehiculo?.financiacion}
          onChange={(_, { checked }) => {
            dispatch(updateVehiculo({ input: "financiacion", value: checked }));
          }}
        />
        <p style={{ color: darkMode === light ? "#828282" : light }}>
          Si marcas que el carro está en promoción, pasará por la aprobación del
          administrador que determinará si el precio está dentro de los rangos
          de promoción determinados por la plataforma.
        </p>
      </Form.Field>
      <Form.Field>
        <label style={{ color: colorText }}>KILOMETRAJE *</label>
        <Input
          name="kilometraje_vehiculo"
          min="0"
          placeholder="Km"
          defaultValue={
            edit &&
            toCurrency({ target: { value: "" + edit?.vehiculo?.kilometraje } })
          }
          onChange={(e, { value }) => {
            value = toCurrency(e);
            dispatch(updateVehiculo({ input: "kilometraje_vehiculo", value }));
          }}
        />
      </Form.Field>
      <Form.Field>
        <label style={{ color: colorText }}>CILINDRAJE *</label>
        <Input
          name="cilindraje_vehiculo"
          min="0"
          placeholder="Cilindraje"
          defaultValue={
            edit &&
            toCurrency({ target: { value: "" + edit?.vehiculo?.cilindraje } })
          }
          onChange={(e, { value }) => {
            value = toCurrency(e);
            dispatch(updateVehiculo({ input: "cilindraje_vehiculo", value }));
          }}
        />
      </Form.Field>
      <Form.Field>
        <label style={{ color: colorText }}>COMBUSTIBLE *</label>
        <Select
          name="combustible_vehiculo"
          search
          options={data.combustibles}
          defaultValue={edit?.vehiculo?.combustible}
          placeholder="Selecciona combustible"
          onChange={(e, { value }) =>
            dispatch(updateVehiculo({ input: "combustible_vehiculo", value }))
          }
        />
      </Form.Field>
      <Form.Field>
        <label style={{ color: colorText }}>COLOR *</label>
        <Dropdown
          name="color_vehiculo"
          fluid
          search
          selection
          options={data.colores}
          defaultValue={edit?.vehiculo?.color}
          placeholder="Selecciona color"
          onChange={(e, { value }) =>
            dispatch(updateVehiculo({ input: "color_vehiculo", value }))
          }
        />
      </Form.Field>
      <Form.Field>
        <label style={{ color: colorText }}>TRANSMISIÓN *</label>
        <Select
          name="transmision_vehiculo"
          search
          options={data.transmision}
          defaultValue={edit?.vehiculo?.transmision}
          placeholder="Selecciona transmisión"
          onChange={(e, { value }) =>
            dispatch(updateVehiculo({ input: "transmision_vehiculo", value }))
          }
        />
      </Form.Field>
      <Form.Field>
        <label style={{ color: colorText }}>BLINDADO *</label>
        <Select
          name="blindado_vehiculo"
          options={optionsGeneric}
          placeholder="Selecciona blindaje"
          defaultValue={edit?.vehiculo?.blindado}
          onChange={(e, { value }) =>
            dispatch(updateVehiculo({ input: "blindado_vehiculo", value }))
          }
        />
      </Form.Field>
      {stateVehicle !== "Nuevo" && (
        <Form.Field>
          <label style={{ color: colorText }}>ÚLTIMO DÍGITO DE LA PLACA *</label>
          {vehiculoRedux.tipo_vehiculo !== 5 &&
            <Input
              name="placa_vehiculo"
              max={9}
              min={0}
              maxLength="1"
              placeholder="Placa"
              id="placa_vehiculo"
              defaultValue={edit?.vehiculo?.placa}
              onChange={(e, { value }) => {
                value = isNaN(value[0]) ? "" : value[0];
                e.target.value = value;
                dispatch(updateVehiculo({ input: "placa_vehiculo", value }));
              }}
            />
          }
          {vehiculoRedux.tipo_vehiculo === 5 &&
            <Input
              name="placa_vehiculo"
              maxLength="1"
              placeholder="Placa"
              id="placa_vehiculo"
              defaultValue={edit?.vehiculo?.placa}
              onChange={(e, { value }) => {
                e.target.value = value;
                dispatch(updateVehiculo({ input: "placa_vehiculo", value }));
              }}
            />
          }
        </Form.Field>
      )}
      <Form.Field>
        <label style={{ color: colorText }}>PERITAJE</label>
        <Select
          name="peritaje_vehiculo"
          options={optionsGeneric}
          placeholder="Selecciona peritaje"
          defaultValue={edit ? (edit?.vehiculo?.peritaje !== null && edit?.vehiculo?.peritaje !== '' && edit?.vehiculo?.peritaje != 0  ? 1 : 0) : ''}
          onChange={(e, { value }) => {
            setExamination(value);
          }}
        />
      </Form.Field>
      {!!examination && (
        <div className="d-flex mb-4" style={{ flexWrap: "wrap" }}>
          <InputFile
            label="Cargar peritaje"
            name="peritaje"
            onChange={(res) => {
              dispatch(
                updateVehiculo({ input: "peritaje", value: res?.file_name })
              );
            }}
            required={!!examination}
            request={`${AUTH_URL}/upload_vehicle_peritaje`}
          />
          {edit?.vehiculo?.peritaje !== null && edit?.vehiculo?.peritaje !== '' && edit?.vehiculo?.peritaje != 0 && (
            <a
              href={edit?.vehiculo?.peritaje}
              target="_blank"
              className="ml-2 mt-2"
              style={{ whiteSpace: "nowrap" }}
              rel="noreferrer"
            >
              Descargar peritaje
            </a>
          )}
        </div>
      )}
      {isMobile ? (
        <>
          <Form.Field style={{ marginBottom: 10 }}>
            <label style={{ color: colorText }}>UBICACIÓN *</label>
            <Select
              search
              name="departamento_vehiculo"
              options={data.departamentos}
              fluid
              placeholder="DEPARTAMENTO"
              defaultValue={edit?.vehiculo?.departamento}
              onChange={(e, { value }) => changeDeparment(value)}
            />
          </Form.Field>
          <Form.Field style={{ marginBottom: 10 }}>
            <Select
              search
              name="ciudad_vehiculo"
              options={cities}
              fluid
              placeholder="MUNICIPIO"
              defaultValue={edit?.vehiculo?.ciudad_id}
              onChange={(e, { value }) =>
                dispatch(updateVehiculo({ input: "ciudad_vehiculo", value }))
              }
            />
          </Form.Field>
        </>
      ) : (
        <Form.Field style={{ marginBottom: 10 }}>
          <label style={{ color: colorText }}>UBICACIÓN *</label>
          <Input type="text" action>
            <Select
              search
              name="departamento_vehiculo"
              options={data.departamentos}
              fluid
              placeholder="DEPARTAMENTO"
              defaultValue={edit?.vehiculo?.departamento}
              onChange={(e, { value }) => changeDeparment(value)}
            />
            <Select
              search
              name="ciudad_vehiculo"
              options={cities}
              fluid
              placeholder="MUNICIPIO"
              defaultValue={edit?.vehiculo?.ciudad_id}
              onChange={(e, { value }) =>
                dispatch(updateVehiculo({ input: "ciudad_vehiculo", value }))
              }
            />
          </Input>
        </Form.Field>
      )}
    </>
  );
}
