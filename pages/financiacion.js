import React, { useState } from "react";
import dayjs from "dayjs";
import {
  Container,
  Header,
  Form,
  Select,
  Button,
  Input,
  Dimmer,
  Message,
} from "semantic-ui-react";
import Loader from "../components/Loader";

import PublicLayout from "../layouts/PublicLayout";
import axios from "axios";
import { API_URL } from "../helpers/constants";

const optionsCuotas = [
  { key: "", text: "", value: "" },
  { key: "12", text: "12", value: "12" },
  { key: "24", text: "24", value: "24" },
  { key: "36", text: "36", value: "36" },
  { key: "48", text: "48", value: "48" },
  { key: "72", text: "72", value: "72" },
];
const optionsDataCredito = [
  { key: "", text: "", value: "" },
  { key: "SI", text: "SI", value: "1" },
  { key: "NO", text: "NO", value: "0" },
];
const optionsRangos = [
  { key: "", text: "", value: "" },
  { key: "1", text: "1.600.000 - 2.500.000", value: "1" },
  { key: "2", text: "2.500.000 - 5.000.000", value: "2" },
  { key: "3", text: "5.000.000 en adelante", value: "3" },
];

function parseLocaleNumber(stringNumber, locale) {
    var thousandSeparator = Intl.NumberFormat(locale).format(11111).replace(/\p{Number}/gu, '');
    var decimalSeparator = Intl.NumberFormat(locale).format(1.1).replace(/\p{Number}/gu, '');

    return parseFloat(stringNumber
        .replace(new RegExp('\\' + thousandSeparator, 'g'), '')
        .replace(new RegExp('\\' + decimalSeparator), '.')
    );
}

export default function financiacion() {
  const [selectValues, setSelectValues] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState();
  const [statusMsg, setStatusMsg] = useState(true);
  const handleValues =
    (param) =>
    (e, { value }) => {
      const values = { ...selectValues };
      if (!!value) {
        values[param] = value;
      } else {
        delete values[param];
      }
      setSelectValues(values);
    };

  const handleSubmit = (e) => {
    e.preventDefault();
    const {
      apellido,
      cuanto_cuesta,
      cuota_inicial,
      email,
      fecha_nacimiento,
      nombre,
      whatsapp,
    } = e.target.elements;

    const selectKeysLen = Object.keys(selectValues).length;

    if (selectKeysLen < 3) {
       setStatusMsg(false)
       setMessage("Debes llenar todo el formulario para continuar");
       return
    }

    setMessage(undefined);

    const form = {
      apellido: apellido.value,
      cuota_inicial: cuota_inicial.value,
      email: email.value,
      cuanto_cuesta: cuanto_cuesta.value,
      fecha_nacimiento: fecha_nacimiento.value,
      nombre: nombre.value,
      whatsapp: whatsapp.value,
      ...selectValues,
    };
    setIsLoading(true);
    axios
      .post(`${API_URL}/financiacion`, form)
      .then((result) => {
        if (result.data.status) {
          setStatusMsg(true);
          setMessage("Datos enviados exitosamente");
          setIsLoading(false);
          e.target?.reset?.()
          setSelectValues({
            cuotas: '',
            datacredito: '',
            salario: ''
          })
          setSelectValues({})
          window.scrollTo({ top: 0, behavior: 'smooth' })
        }
      })
      .catch(() => {
        setMessage("Ha ocurrido un problema, intenta mas tarde");
        setStatusMsg(false);
        setIsLoading(false);
      });
  };

  const handleChangeCurrency = (e) => {
    let dollarUSLocale = Intl.NumberFormat('en-US');
    const value = parseLocaleNumber(e.target.value, dollarUSLocale)
    let valueFormat = dollarUSLocale.format(value)

    if(valueFormat === 'NaN') {
        const chars = e.target.value.split('');
        e.target.value = chars.slice(0, chars.length - 1);
        return
    }

    e.target.value = valueFormat
}

  return (
    <PublicLayout>
      <Container style={{ paddingTop: 25 }} text>
        <Header as="h2">FINANCIACIÓN DE TU VEHICULO</Header>
        <p style={{ textAlign: "justify" }}>
          Para acceder a nuestros recomendados en financiación de vehículos, se
          requiere diligenciar el siguiente formulario. Posteriormente, un
          asesor te contactará para resolver todas las inquietudes y colaborarte
          en el proceso. El servicio de financiación prestado por VENDETUNAVE es
          tramitado a través de financieras tales como SUFI, Banco de Occidente,
          FINANDINA, entre otros. Al diligenciar el formulario aceptas el
          tratamiento de los datos suministrados en nuestro portal, con el
          compromiso de ser utilizados únicamente para este fin.
        </p>
        {!!message && <Message error={!statusMsg} success={statusMsg} content={message} />}

        <Form onSubmit={handleSubmit}>
          <Form.Field>
            <label>Nombre</label>
            <Form.Input placeholder="Nombre" name="nombre" required />
          </Form.Field>
          <Form.Field>
            <label>Apellido</label>
            <input placeholder="Apellido" name="apellido" required />
          </Form.Field>
          <Form.Field>
            <label>Fecha de nacimiento</label>
            <input
              type="date"
              placeholder="Fecha de nacimiento"
              name="fecha_nacimiento"
              required
              max={dayjs().subtract(18, "years").format("YYYY-MM-DD")}
            />
          </Form.Field>
          <Form.Field>
            <label>Correo electrónico</label>
            <input placeholder="Email" name="email" type="email" required />
          </Form.Field>
          <Form.Field>
            <label>WhatsApp</label>
            <input
              type="number"
              placeholder="WhatsApp"
              name="whatsapp"
              required
            />
          </Form.Field>
          <Form.Field>
            <label>¿Cuánto cuesta el carro que quieres?</label>
            <Input name="cuanto_cuesta" type="text" required onChange={handleChangeCurrency} />
          </Form.Field>
          <Form.Field>
            <label>¿Cuánto dinero tienes para la cuota inicial?</label>
            <Input name="cuota_inicial" type="text" required onChange={handleChangeCurrency}/>
          </Form.Field>
          <Form.Select
            label="Selecciona el número de cuotas en las que quieres pagarlo"
            options={optionsCuotas}
            placeholder="Seleccione número de cuotas"
            name="cuotas"
            onChange={handleValues("cuotas")}
            value={selectValues?.cuotas}
            required
          />
          <Form.Select
            name="datacredito"
            label="¿Está reportado en Datacrédito?"
            placeholder="Seleccione..."
            options={optionsDataCredito}
            onChange={handleValues("datacredito")}
            value={selectValues?.datacredito}
            required
          />
          <Form.Select
            name="salario"
            label="Indique el rango salaríal al que pertenece"
            options={optionsRangos}
            placeholder="Seleccione..."
            onChange={handleValues("salario")}
            value={selectValues?.salario}
            required
          />
          <div style={{ marginBottom: "25px", fontWeight: "bold" }}>
            NOTA: Si usted gana menos de 2 salarios mínimos no podemos procesar
            su solicitud de financiación.
          </div>
          <Button color="blue">ENVIAR</Button>
        </Form>
      </Container>
      <Loader isLoading={isLoading} />
    </PublicLayout>
  );
}
