import React, { useEffect, useState } from "react";
import {
  Form,
  Responsive,
  Button,
  Select,
  Message,
  Dimmer,
  Loader,
} from "semantic-ui-react";
import { useDispatch, useSelector } from "react-redux";
import { useCookies } from "react-cookie";
import jwt from "jsonwebtoken";
import axios from "axios";

import { updateAccesorio, clearForm } from "../../../store/accesorioSlice";
import FotosContainer from "./FotosContainer";
import FormContainer from "./FormContainer";
import { AUTH_URL } from "../../../helpers/constants";

export default function AccesorioContainer({ data }) {
  const dispatch = useDispatch();
  const [cookies] = useCookies(["vtn_token"]);
  const [loading, setLoading] = useState(false);
  const [alert, setAlert] = useState({});

  const accesorioRedux = useSelector(({ accesorio }) => accesorio.accesorio);
  const imagesAccesorioRedux = useSelector(({ accesorio }) => accesorio.images);

  const isValidForm = (data) => {
    for (let key in data) {
      if (data.hasOwnProperty(key)) {
        if (!data[key] || data[key].length === 0) {
          return false;
        }
      }
    }

    return true;
  };

  const publicAccesorio = () => {
    let images = [];
    Object.keys(imagesAccesorioRedux).map((item) => {
      images.push(imagesAccesorioRedux[item]);
    });

    if (images.length < 1) {
      setAlert({
        message: "Debes subir 1 imagen.",
        success: false,
        error: true,
      });
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }

    const {
      categoria,
      ciudad,
      descripcion,
      estado,
      precio,
      tipo_precio,
      titulo,
    } = accesorioRedux;

    let data = {
      categoria,
      ciudad,
      descripcion,
      estado,
      precio,
      tipo_precio,
      titulo,
      images,
    };

    if (isValidForm(data)) {
      setLoading(true);
      const cookie = cookies.vtn_token;
      const decoded = jwt.verify(cookie, "vendetunave2021");
      const user_id = decoded.user.id;
      const config = {
        headers: {
          Authorization: `Bearer ${decoded.token_server.access_token}`,
        },
      };

      data = { ...data, user_id };

      axios
        .post(`${AUTH_URL}/accessory_insert`, data, config)
        .then((res) => {
          setAlert({
            message: "Accesorio creado correctamente",
            error: false,
            info: false,
            success: true,
          });
          window.scrollTo({ top: 0, behavior: "smooth" });
          setLoading(false);
          setTimeout(() => {
            location.replace("/usuario/mis_publicaciones");
          }, 2000);
        })
        .catch((error) => {
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
    <Form >
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
        <Form.Field>
          <label>CATEGORÍAS*</label>
          <Select
            name="categoriaAccesorio"
            options={data.tipoAccesorio}
            placeholder="Tipo de producto"
            onChange={(e, { value }) =>
              dispatch(updateAccesorio({ input: "categoria", value }))
            }
          />
        </Form.Field>
        <Form.Field style={{ marginTop: 20 }}>
          <label>Agrega una o más fotos (mínimo 5 en el orden que desees que se muestren en la plataforma)*</label>
          <FotosContainer />
        </Form.Field>
        <FormContainer data={data} />
        <Button
          style={{ marginBottom: 10 }}
          color="blue"
          type="submit"
          onClick={publicAccesorio}
        >
          PUBLICAR
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
        <Form.Field>
          <label>CATEGORÍAS*</label>
          <Select
            name="categoriaAccesorio"
            options={data.tipoAccesorio}
            placeholder="Tipo de producto"
            onChange={(e, { value }) =>
              dispatch(updateAccesorio({ input: "categoria", value }))
            }
          />
        </Form.Field>
        <Form.Field style={{ marginTop: 20 }}>
          <label>Agrega una o más fotos (mínimo 5 en el orden que desees que se muestren en la plataforma)*</label>
          <FotosContainer isMobile />
        </Form.Field>
        <FormContainer data={data} />
        <Button style={{ marginBottom: 10 }} color="blue" type="submit" onClick={publicAccesorio}>
          PUBLICAR
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
        <Form.Field>
          <label>CATEGORÍAS*</label>
          <Select
            name="categoriaAccesorio"
            options={data.tipoAccesorio}
            placeholder="Tipo de producto"
            onChange={(e, { value }) =>
              dispatch(updateAccesorio({ input: "categoria", value }))
            }
          />
        </Form.Field>
        <Form.Field style={{ marginTop: 20 }}>
          <label>Agrega una o más fotos (mínimo 5 en el orden que desees que se muestren en la plataforma)*</label>
          <FotosContainer isMobile />
        </Form.Field>
        <FormContainer data={data} />

        <Button style={{ marginBottom: 10 }} color="blue" type="submit" onClick={publicAccesorio}>
          PUBLICAR
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
