import VehiculoContainer from "../../components/usuario/form_vehiculo/VehiculoContainer";
import { validateAuth } from "../../helpers/auth";
import PublicLayout from "../../layouts/PublicLayout";
import jwt from "jsonwebtoken";
import axios from "axios";
import { Container } from "semantic-ui-react";
import { API_URL, AUTH_URL } from '../../helpers/constants';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { setVehicle } from '../../store/productoSlice';

export default function EditVehicle({ data }) {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setVehicle(data.edit.vehiculo))
  }, []);

  return (
    <PublicLayout>
      <Container style={{ paddingTop: 25 }}>
        <VehiculoContainer data={data} isEdit />
      </Container>
    </PublicLayout>
  );
}

export async function getServerSideProps(context) {
  const auth = validateAuth(context);
  if (!auth.vtn_token) {
    context.res.writeHead(301, {
      Location: "/",
    });
    context.res.end();
  }
  const cookie = auth.vtn_token;
  const decoded = jwt.verify(cookie, "vendetunave2021");
  const config = {
    headers: { Authorization: `Bearer ${decoded.token_server.access_token}` },
  };
  const res = await axios.get(
    "https://api.vendetunave.co/auth/form_producto",
    config
  );
  const data = await res.data;
  //
  let optionsCategories = [];
  let optionsCombustibles = [];
  let optionsColores = [];
  let optionsTransmision = [];
  let optionsTipoPrecio = [];
  let optionsTipoAccesorios = [];
  let optionsDepartamentos = [];
  let optionsTipoMoto = [];
  //
  data.categories.forEach(function (item) {
    optionsCategories.push({
      key: item.id,
      value: item.id,
      text: item.nombre,
    });
  });
  data.combustibles.forEach(function (item) {
    optionsCombustibles.push({
      key: item.id,
      value: item.id,
      text: item.nombre,
    });
  });
  data.colores.forEach(function (item) {
    optionsColores.push({
      key: item.id,
      value: item.id,
      text: item.nombre,
    });
  });
  data.transmisiones.forEach(function (item) {
    optionsTransmision.push({
      key: item.id,
      value: item.id,
      text: item.nombre,
    });
  });
  data.tipoPrecio.forEach(function (item) {
    optionsTipoPrecio.push({
      key: item.id,
      value: item.id,
      text: item.nombre,
    });
  });
  data.tipoAccesorio.forEach(function (item) {
    optionsTipoAccesorios.push({
      key: item.id,
      value: item.id,
      text: item.nombre,
    });
  });
  data.departamentos.forEach(function (item) {
    optionsDepartamentos.push({
      key: item.id,
      value: item.id,
      text: item.nombre,
    });
  });
  data.tipoMoto.forEach(function (item) {
    optionsTipoMoto.push({
      key: item.id,
      value: item.id,
      text: item.nombre,
    });
  });
  let edit;
  if(context.params.id) {
      const result = await axios.post(`${AUTH_URL}/vehicle_edit`, {
          id: context.params.id,
          user_id: decoded.user.id
      }, config)
      edit = result.data;
  }

  if(edit) {
    console.log(edit);
    edit.marcas = edit.marcas.map(item => ({
      key: item.id,
      value: item.id,
      text: item.nombre,
    }));
    edit.modelos = edit.modelos.map(item => ({
      key: item.id,
      value: item.id,
      text: item.nombre,
    }))
    edit.ciudades = edit.ciudades.map(item => ({
      key: item.id,
      value: item.id,
      text: item.nombre,
    }))
  }
  return {
    props: {
      data: {
        categories: optionsCategories,
        combustibles: optionsCombustibles,
        colores: optionsColores,
        transmision: optionsTransmision,
        tipoPrecio: optionsTipoPrecio,
        tipoAccesorio: optionsTipoAccesorios,
        departamentos: optionsDepartamentos,
        tipoMotos: optionsTipoMoto,
        edit
      },
    },
  };
}
