import React, { useEffect, useState } from "react";
import FirstSection from "./FirstSection";
import SecondSection from "./SecondSection";
import ThirdSection from "./ThirdSection";
import {
  Form,
  Responsive,
  Button,
  Dimmer,
  Loader,
  Message,
} from "semantic-ui-react";
import { useSelector, useDispatch } from "react-redux";
import { useCookies } from "react-cookie";
import jwt from "jsonwebtoken";
import axios from "axios";

import { clearForm } from "../../../store/productoSlice";
import { AUTH_URL } from "../../../helpers/constants";

export default function VehiculoContainer({ data: dataProp, isEdit }) {
  const dispatch = useDispatch();
  const [cookies] = useCookies(["vtn_token"]);
  const [loading, setLoading] = useState(false);
  const [alert, setAlert] = useState({});
  const vehiculoRedux = useSelector(({ producto }) => producto.vehiculo);
  const imagesVehiculoRedux = useSelector(({ producto }) => producto.images, () => true);
  const isValidForm = (data) => {
    for (let key in data) {
      if (data.hasOwnProperty(key)) {
        if ((data[key] == undefined || data[key] === '')|| data[key].length === 0) {
          console.log(key);
          return false;
        }
      }
    }

    return true;
  };

  const publicVehicle = () => {
    let images = [];
    Object.keys(imagesVehiculoRedux).map((item) => {
      images.push(imagesVehiculoRedux[item]);
    });

    console.log({images, imagesVehiculoRedux});

    if (images.length < 5) {
      setAlert({
        message: "Debes subir 5 imágenes.",
        success: false,
        error: true,
      });
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }

    const {
      tipo_vehiculo,
      marca,
      modelo,
      anio,
      titulo_vehiculo,
      contacto_vehiculo,
      descripcion_vehiculo,
      estado_vehiculo,
      precio_vehiculo,
      tipo_precio_vehiculo,
      cilindraje_vehiculo,
      promocion,
      permuta,
      financiacion,
      kilometraje_vehiculo,
      combustible_vehiculo,
      color_vehiculo,
      transmision_vehiculo,
      blindado_vehiculo,
      placa_vehiculo,
      departamento_vehiculo,
      ciudad_vehiculo,
      tipo_moto_select,
      id
    } = vehiculoRedux;

    const dataValid = {
      tipo_vehiculo,
      marca,
      modelo,
      anio,
      titulo_vehiculo,
      descripcion_vehiculo,
      estado_vehiculo,
      precio_vehiculo,
      tipo_precio_vehiculo,
      kilometraje_vehiculo,
      combustible_vehiculo,
      blindado_vehiculo,
      color_vehiculo,
      transmision_vehiculo,
      departamento_vehiculo,
      ciudad_vehiculo,
      contacto_vehiculo,
      cilindraje_vehiculo,
    };

    if (isValidForm(dataValid)) {
      setLoading(true);
      const cookie = cookies.vtn_token;
      const decoded = jwt.verify(cookie, "vendetunave2021");
      const user_id = decoded.user.id;
      const config = {
        headers: {
          Authorization: `Bearer ${decoded.token_server.access_token}`,
        },
      };

      const data = {
        ...vehiculoRedux,
        tipo_vehiculo,
        marca,
        modelo,
        anio,
        titulo_vehiculo,
        contacto_vehiculo,
        descripcion_vehiculo,
        estado_vehiculo,
        precio_vehiculo,
        tipo_precio_vehiculo,
        cilindraje_vehiculo,
        promocion,
        permuta,
        financiacion,
        kilometraje_vehiculo,
        combustible_vehiculo,
        color_vehiculo,
        transmision_vehiculo,
        blindado_vehiculo,
        placa_vehiculo:
          estado_vehiculo === "Usado" ? placa_vehiculo : "Sin Matricular",
        departamento_vehiculo,
        ciudad_vehiculo,
        tipo_moto_select,
        images,
        user_id,
        id
      };

      const url = `${AUTH_URL}/vehicle_${isEdit ? 'update' : 'insert'}`

      axios
        .post(url, data, config)
        .then((res) => {
            if(res.data.status) {
                setAlert({
                    message: `Vehículo ${isEdit ? 'actualizado' : 'creado'} correctamente`,
                    error: false,
                    info: false,
                    success: true,
                  });
                  window.scrollTo({ top: 0, behavior: "smooth" });
                  setLoading(false);
                  setTimeout(() => {
                    location.replace("/usuario/mis_publicaciones");
                  }, 2000);
            }else {
                throw {error: true}
            }
        })
        .catch(() => {
          setLoading(false);
          setAlert({
            message: "Ha ocurrido un error, intenta más tarde",
            success: false,
            info: false,
            error: true,
          });
          window.scrollTo({ top: 0, behavior: "smooth" });
        });
    } else {
      setAlert({
        message: "Por favor ingrese todos los campos obligatorios",
        success: false,
        error: true,
      });
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  useEffect(() => {
    dispatch(clearForm());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Form>
      <Dimmer style={{ position: "fixed" }} active={loading}>
        <Loader>Creando vehículo...</Loader>
      </Dimmer>
      {(alert.success || alert.error) && (
        <Message
          positive={alert.success}
          negative={alert.error}
          content={alert.message}
        />
      )}

      <Responsive {...Responsive.onlyComputer}>
        <FirstSection data={dataProp} />
          <Form.Field style={{ marginTop: 20 }}>
            <label>Agrega una o más fotos (Mínimo 5 fotos)*</label>
            <SecondSection data={dataProp} />
          </Form.Field>
        <ThirdSection data={dataProp} />
        <Button
          style={{ marginBottom: 10 }}
          color="blue"
          type="submit"
          onClick={publicVehicle}
        >
          {!dataProp.edit ? 'PUBLICAR' : 'GUARDAR'}
        </Button>
        <br />
        <a
          href="/terminos-y-condiciones"
          target="_blank"
          style={{ color: "#828282" }}
        >
          Al publicar un aviso, admites y aceptas los Términos y Condiciones de
          VENDETUNAVE.CO
        </a>
      </Responsive>
      <Responsive {...Responsive.onlyMobile}>
        <FirstSection data={dataProp} isMobile />
          <Form.Field style={{ marginTop: 20 }}>
            <label>Agrega una o más fotos (Mínimo 5 fotos)*</label>
            <SecondSection data={dataProp} isMobile />
          </Form.Field>
        <ThirdSection data={dataProp} isMobile />
        <Button
          style={{ marginBottom: 10 }}
          color="blue"
          type="submit"
          onClick={publicVehicle}
        >
          {!dataProp.edit ? 'PUBLICAR' : 'GUARDAR'}
        </Button>
        <br />
        <a
          href="/terminos-y-condiciones"
          target="_blank"
          style={{ color: "#828282" }}
        >
          Al publicar un aviso, admites y aceptas los Términos y Condiciones de
          VENDETUNAVE.CO
        </a>
      </Responsive>
      <Responsive {...Responsive.onlyTablet}>
        <FirstSection data={dataProp} isMobile />
          <Form.Field style={{ marginTop: 20 }}>
            <label>Agrega una o más fotos (Mínimo 5 fotos)*</label>
            <SecondSection data={dataProp} isMobile />
          </Form.Field>
        <ThirdSection data={dataProp} isMobile />
        <Button
          style={{ marginBottom: 10 }}
          color="blue"
          type="submit"
          onClick={publicVehicle}
        >
          {!dataProp.edit ? 'PUBLICAR' : 'GUARDAR'}
        </Button>
        <br />
        <a
          href="/terminos-y-condiciones"
          target="_blank"
          style={{ color: "#828282" }}
        >
          Al publicar un aviso, admites y aceptas los Términos y Condiciones de
          VENDETUNAVE.CO
        </a>
      </Responsive>
    </Form>
  );
}
