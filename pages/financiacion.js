import React, { useState } from "react";
import Head from "next/head";
import { NextSeo } from "next-seo";
import dayjs from "dayjs";
import {
  Container,
  Header,
  Form,
  Button,
  Input,
  Message,
} from "semantic-ui-react";
import { useSelector } from 'react-redux';
import Loader from "../components/Loader";
import * as Format from './../helpers/format';

import PublicLayout from "../layouts/PublicLayout";
import axios from "axios";
import { API_URL } from "../helpers/constants";
import { light } from "../helpers/colors";

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
      setStatusMsg(false);
      setMessage("Debes llenar todo el formulario para continuar");
      return;
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
          e.target?.reset?.();
          setSelectValues({
            cuotas: "",
            datacredito: "",
            salario: "",
          });
          setSelectValues({});
          window.scrollTo({ top: 0, behavior: "smooth" });
        }
        setIsLoading(false);
      })
      .catch(() => {
        setMessage("Ha ocurrido un problema, intenta mas tarde");
        setStatusMsg(false);
        setIsLoading(false);
      });
  };

  const darkMode = useSelector(({ darkMode }) => darkMode.status);
  const colorText = darkMode === light ? undefined : light;

  return (
    <PublicLayout>
      <NextSeo
        title="VendeTuNave – Opciones de crédito para tu carro"
        description="Te ayudamos con la financiación de tu carro. Ayudándote cumplir tu sueño de comprar carro."
        openGraph={{
          title: "VendeTuNave – Opciones de crédito para tu carro",
          locale: "es_ES",
          type: "website",
          description: "Te ayudamos con la financiación de tu carro. Ayudándote cumplir tu sueño de comprar carro."
        }}
      />
      <Head>
        <meta property="keywords" content="sufi, occiauto, simuladores de crédito vehiculos, simulador de crédito, prestamos, financiaciones" />
      </Head>
      <style>{`
        .required.field > label {
          color: ${colorText} !important;
        }
      `}</style>
      <Container style={{ paddingTop: 25 }} text>
        <Header as="h1" style={{ color: colorText }}>FINANCIACIÓN DE TU VEHICULO</Header>
        <p style={{ textAlign: "justify", color: colorText }}>
          Para acceder a nuestros recomendados en financiación de vehículos, se
          requiere diligenciar el siguiente formulario. Posteriormente, un
          asesor te contactará para resolver todas las inquietudes y colaborarte
          en el proceso. El servicio de financiación prestado por VENDETUNAVE es
          tramitado a través de financieras tales como SUFI, Banco de Occidente,
          FINANDINA, entre otros. Al diligenciar el formulario aceptas el
          tratamiento de los datos suministrados en nuestro portal, con el
          compromiso de ser utilizados únicamente para este fin.
        </p>
        {!!message && (
          <Message error={!statusMsg} success={statusMsg} content={message} />
        )}

        <Form onSubmit={handleSubmit}>
          <Form.Field>
            <label style={{ color: colorText }}>Nombre</label>
            <Form.Input placeholder="Nombre" name="nombre" required />
          </Form.Field>
          <Form.Field>
            <label style={{ color: colorText }}>Apellido</label>
            <input placeholder="Apellido" name="apellido" required />
          </Form.Field>
          <Form.Field>
            <label style={{ color: colorText }}>Fecha de nacimiento</label>
            <input
              type="date"
              placeholder="Fecha de nacimiento"
              name="fecha_nacimiento"
              required
              max={dayjs().subtract(18, "years").format("YYYY-MM-DD")}
            />
          </Form.Field>
          <Form.Field>
            <label style={{ color: colorText }}>Correo electrónico</label>
            <input placeholder="Email" name="email" type="email" required />
          </Form.Field>
          <Form.Field>
            <label style={{ color: colorText }}>WhatsApp</label>
            <input
              type="number"
              placeholder="WhatsApp"
              name="whatsapp"
              required
            />
          </Form.Field>
          <Form.Field>
            <label style={{ color: colorText }}>¿Cuánto cuesta el carro que quieres?</label>
            <Input
              name="cuanto_cuesta"
              type="text"
              required
              onChange={Format.toCurrency}
            />
          </Form.Field>
          <Form.Field>
            <label style={{ color: colorText }}>¿Cuánto dinero tienes para la cuota inicial?</label>
            <Input
              name="cuota_inicial"
              type="text"
              required
              onChange={Format.toCurrency}
            />
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
          <div style={{ marginBottom: "25px", fontWeight: "bold", color: colorText }}>
            NOTA: Si usted gana menos de 2 salarios mínimos no podemos procesar
            su solicitud de financiación.
          </div>
          <Button color="blue" type="submit">
            ENVIAR
          </Button>
        </Form>
      </Container>
      <Loader isLoading={isLoading} />
    </PublicLayout>
  );
}
