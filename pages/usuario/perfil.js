import { useState, useEffect } from "react";
import Head from "next/head";
import { NextSeo } from "next-seo";
import {
  Container,
  Grid,
  Responsive,
  Form,
  Header,
  Button,
  Image,
  Input,
  Dimmer,
  Loader,
  Message,
} from "semantic-ui-react";
import loadable from "@loadable/component";
import AdminLayout from "../../layouts/AdminLayout";
import { authInitialProps } from "../../helpers/auth";

import axios from "axios";
import { AUTH_URL, perfil_api, perfil_update } from "../../helpers/constants";
import { useCookies } from "react-cookie";
import jwt from "jsonwebtoken";
import { useSelector } from 'react-redux';

import { IMAGE_DEFAULT as DEFAULT } from "../../helpers/h-constants";
import { light } from "../../helpers/colors";
import PublicLayout from "../../layouts/PublicLayout";

const toBase64 = (file) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });

export default function perfil() {
  const [cookies] = useCookies(["vtn_token"]);
  const [alert, setAlert] = useState({});
  const [loading, setLoading] = useState(false);
  const [usuario, setUsuario] = useState({
    nombre: "",
    telefono: "",
    email: "",
    fecha_nacimiento: "",
    image: "",
    imagePredeter: DEFAULT,
    facebook: "",
    instagram: "",
    tiktok: "",
    status: true,
  });
  const [password, setPassword] = useState({
    old_password: "",
    new_password: "",
    confirm_password: "",
  });
  const options_sex = [
    { key: 1, text: "Masculino", value: 1 },
    { key: 2, text: "Femenino", value: 2 },
    { key: 3, text: "No especificar", value: 3 },
  ];
  useEffect(() => {
    const cookie = cookies.vtn_token;
    const decoded = jwt.verify(cookie, "vendetunave2021");
    const user_id = decoded.user.id;
    const config = {
      headers: { Authorization: `Bearer ${decoded.token_server.access_token}` },
    };
    axios.get(AUTH_URL + perfil_api + user_id, config).then((res) => {
      if (res.status === 401) {
        window.location = "/401";
      }
      setUsuario({ ...usuario, ...res.data });
    });
  }, []);

  const handleChangeFile = (e) => {
    if (e.target?.files?.length > 0) {
      const file = e.target.files[0];
      setUsuario({ ...usuario, file, cambiarImage: 1 });
      toBase64(file).then((res) =>
        setUsuario((prev) => ({ ...prev, newImage: res }))
      );
      return;
    }
    setUsuario({
      ...usuario,
      cambiarImage: 0,
      file: undefined,
      newImage: undefined,
    });
  };
  const updateProfile = () => {
    if (password.confirm_password !== password.new_password) {
      setAlert({
        message: "Nueva contraseña y confirmar contraseña no coinciden",
        error: true,
        success: false,
      });
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }
    setLoading(true);
    const cookie = cookies.vtn_token;
    const decoded = jwt.verify(cookie, "vendetunave2021");
    const user_id = decoded.user.id;
    const config = {
      headers: {
        Authorization: `Bearer ${decoded.token_server.access_token}`,
        "Content-Type": "multipart/form-data",
      },
    };
    const { imagePredeter, status, ...data } = usuario;
    const dataForm = {
      ...data,
      ...password,
    };
    const form = new FormData();

    Object.keys(dataForm).forEach((key) => form.append(key, dataForm[key]));
    form.append("user_id", user_id);

    axios
      .post(AUTH_URL + perfil_update, form, config)
      .then(({ data }) => {
        // location.reload();
        const { message, state } = data;
        setAlert({
          message: message,
          error: !state,
          success: state,
        });
        window.scrollTo({ top: 0, behavior: "smooth" });
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
        setAlert({
          message: "Ha ocurrido un error, intenta más tarde",
          success: false,
          error: true,
        });
        window.scrollTo({ top: 0, behavior: "smooth" });
      });
  };

  const darkMode = useSelector(({ darkMode }) => darkMode.status);
  const colorText = darkMode === light ? undefined : light;
  return (
    <PublicLayout>
      <NextSeo
        title="VendeTuNave - Mi cuenta"
        description="Administra tu información personal como usuario de Vende Tu Nave. La cual será utilizada a la hora de publicar o interactuar en la comunidad."
        openGraph={{
          title: "VendeTuNave - Mi cuenta",
          locale: "es_ES",
          type: "website",
          description:
            "Administra tu información personal como usuario de Vende Tu Nave. La cual será utilizada a la hora de publicar o interactuar en la comunidad.",
        }}
      />
      <Head>
        <meta
          property="keywords"
          content="Vende tu nave, vendetunave, venta de carros,carros deportivos, carros antiguos, camionetas"
        />
      </Head>
      <Dimmer style={{ position: "fixed" }} active={loading}>
        <Loader>Actualizando...</Loader>
      </Dimmer>
      <Container style={{ paddingTop: 25 }} text>
        <Header as="h1" style={{ color: colorText }}>DATOS DE LA CUENTA</Header>
        <style>{`
          .field > label {
              color: ${colorText} !important;
          }
      `}</style>
        {(alert.success || alert.error) && (
          <Message
            success={!!alert.success}
            error={!!alert.error}
            content={alert.message}
          />
        )}
        <Responsive {...Responsive?.onlyComputer}>
          <Grid columns="equal">
            <Grid.Column style={{ textAlign: "center" }}>
              <Image
                src={
                  usuario.newImage ||
                  (usuario.image == 0
                    ? usuario.imagePredeter
                    : "https://vendetunave.s3.amazonaws.com/vendetunave/images/usuarios/" +
                    usuario.image)
                }
                size="medium"
                circular
                bordered
                style={{ height: 210, marginBottom: 20, backgroundColor: colorText }}
                alt="Imagen de perfil"
              />
              <input
                type="file"
                className="form-control-file"
                onChange={handleChangeFile}
                accept="image/*"
              />
            </Grid.Column>
            <Grid.Column width={10}>
              <Form>
                <Form.Field>
                  <label style={{ color: colorText }}>Nombre y Apellido *</label>
                  <Input
                    name="name"
                    value={usuario.nombre}
                    onChange={(e, { value }) =>
                      setUsuario({ ...usuario, nombre: value })
                    }
                  />
                </Form.Field>
                <Form.Field>
                  <label style={{ color: colorText }}>Teléfono</label>
                  <Input
                    type="number"
                    name="tel"
                    value={usuario.telefono}
                    onChange={(e, { value }) =>
                      setUsuario({ ...usuario, telefono: value })
                    }
                  />
                </Form.Field>
                <Form.Field>
                  <label style={{ color: colorText }}>Correo Electrónico</label>
                  <Input
                    name="email"
                    disabled
                    style={{ opacity: 1 }}
                    value={usuario.email}
                  />
                </Form.Field>
                <Form.Field>
                  {usuario.genero && (
                    <Form.Select
                      fluid
                      label="Género"
                      defaultValue={usuario.genero}
                      options={options_sex}
                      placeholder="Seleccione..."
                      name="genero"
                      onChange={(e, { value }) =>
                        setUsuario({ ...usuario, genero: value })
                      }
                    />
                  )}
                </Form.Field>
                <Form.Field>
                  <label style={{ color: colorText }}>Fecha de nacimiento</label>
                  <Input
                    value={usuario.fecha_nacimiento}
                    name="fecha"
                    type="date"
                    placeholder="Fecha de nacimiento"
                    onChange={(e, { value }) =>
                      setUsuario({ ...usuario, fecha_nacimiento: value })
                    }
                  />
                </Form.Field>
              </Form>
            </Grid.Column>
          </Grid>

          <Grid columns="equal">
            <Grid.Column>
              <Form>
                <Form.Field>
                  <label style={{ color: colorText }}>Facebook</label>
                  <Input
                    name="name"
                    value={usuario.facebook}
                    onChange={(e, { value }) =>
                      setUsuario({ ...usuario, facebook: value })
                    }
                  />
                </Form.Field>
              </Form>
            </Grid.Column>
            <Grid.Column>
              <Form>
                <Form.Field>
                  <label style={{ color: colorText }}>Instagram</label>
                  <Input
                    name="name"
                    value={usuario.instagram}
                    onChange={(e, { value }) =>
                      setUsuario({ ...usuario, instagram: value })
                    }
                  />
                </Form.Field>
              </Form>
            </Grid.Column>
            <Grid.Column>
              <Form>
                <Form.Field>
                  <label style={{ color: colorText }}>Tiktok</label>
                  <Input
                    name="name"
                    value={usuario.tiktok}
                    onChange={(e, { value }) =>
                      setUsuario({ ...usuario, tiktok: value })
                    }
                  />
                </Form.Field>
              </Form>
            </Grid.Column>
          </Grid>
        </Responsive>

        <Responsive {...Responsive?.onlyMobile}>
          <Grid columns="equal">
            <Grid.Column width={16}>
              <Image
                src={
                  usuario.image == 0
                    ? usuario.imagePredeter
                    : "https://vendetunave.s3.amazonaws.com/vendetunave/images/usuarios/" +
                    usuario.image
                }
                size="medium"
                circular
                bordered
                style={{ height: 290, marginBottom: 20, backgroundColor: colorText }}
                alt="Imagen de perfil"
              />
              <input
                type="file"
                style={{ marginBottom: 20 }}
                className="form-control-file"
                onChange={handleChangeFile}
                accept="image/*"
              />
              <Form>
                <Form.Field>
                  <label style={{ color: colorText }}>Nombre y Apellido *</label>
                  <Input
                    value={usuario.nombre}
                    name="name"
                    onChange={(e, { value }) =>
                      setUsuario({ ...usuario, nombre: value })
                    }
                  />
                </Form.Field>
                <Form.Field>
                  <label style={{ color: colorText }}>Teléfono</label>
                  <Input
                    value={usuario.telefono}
                    type="number"
                    name="tel"
                    onChange={(e, { value }) =>
                      setUsuario({ ...usuario, telefono: value })
                    }
                  />
                </Form.Field>
                <Form.Field>
                  <label style={{ color: colorText }}>Correo Electrónico</label>
                  <Input
                    value={usuario.email}
                    name="email"
                    disabled
                    style={{ opacity: 1 }}
                  />
                </Form.Field>
                <Form.Field>
                  {usuario.genero && (
                    <Form.Select
                      fluid
                      label="Género"
                      defaultValue={usuario.genero}
                      options={options_sex}
                      placeholder="Seleccione..."
                      name="genero"
                      onChange={(e, { value }) =>
                        setUsuario({ ...usuario, genero: value })
                      }
                    />
                  )}
                </Form.Field>
                <Form.Field>
                  <label style={{ color: colorText }}>Fecha de nacimiento</label>
                  <Input
                    value={usuario.fecha_nacimiento}
                    onChange={(e, { value }) =>
                      setUsuario({ ...usuario, fecha_nacimiento: value })
                    }
                    name="fecha"
                    type="date"
                    placeholder="Fecha de nacimiento"
                  />
                </Form.Field>
                <Form.Field>
                  <label style={{ color: colorText }}>Facebook</label>
                  <Input
                    name="name"
                    value={usuario.facebook}
                    onChange={(e, { value }) =>
                      setUsuario({ ...usuario, facebook: value })
                    }
                  />
                </Form.Field>
                <Form.Field>
                  <label style={{ color: colorText }}>Instagram</label>
                  <Input
                    name="name"
                    value={usuario.instagram}
                    onChange={(e, { value }) =>
                      setUsuario({ ...usuario, instagram: value })
                    }
                  />
                </Form.Field>
                <Form.Field>
                  <label style={{ color: colorText }}>Tiktok</label>
                  <Input
                    name="name"
                    value={usuario.tiktok}
                    onChange={(e, { value }) =>
                      setUsuario({ ...usuario, tiktok: value })
                    }
                  />
                </Form.Field>
              </Form>
            </Grid.Column>
          </Grid>
        </Responsive>
        <Responsive {...Responsive?.onlyTablet}>
          <Grid columns="equal">
            <Grid.Column width={16}>
              <Image
                src={
                  usuario.image == 0
                    ? usuario.imagePredeter
                    : "https://vendetunave.s3.amazonaws.com/vendetunave/images/usuarios/" +
                    usuario.image
                }
                size="medium"
                circular
                bordered
                style={{ height: 290, marginBottom: 20, backgroundColor: colorText }}
                alt="Imagen de perfil"
              />
              <input
                type="file"
                style={{ marginBottom: 20 }}
                className="form-control-file"
                onChange={handleChangeFile}
                accept="image/*"
              />
              <Form>
                <Form.Field>
                  <label style={{ color: colorText }}>Nombre y Apellido *</label>
                  <Input
                    value={usuario.nombre}
                    name="name"
                    onChange={(e, { value }) =>
                      setUsuario({ ...usuario, nombre: value })
                    }
                  />
                </Form.Field>
                <Form.Field>
                  <label style={{ color: colorText }}>Teléfono</label>
                  <Input
                    value={usuario.telefono}
                    type="number"
                    name="tel"
                    onChange={(e, { value }) =>
                      setUsuario({ ...usuario, telefono: value })
                    }
                  />
                </Form.Field>
                <Form.Field>
                  <label style={{ color: colorText }}>Correo Electrónico</label>
                  <Input
                    value={usuario.email}
                    name="email"
                    disabled
                    style={{ opacity: 1 }}
                  />
                </Form.Field>
                <Form.Field>
                  {usuario.genero && (
                    <Form.Select
                      fluid
                      label="Género"
                      defaultValue={usuario.genero}
                      options={options_sex}
                      placeholder="Seleccione..."
                      name="genero"
                      onChange={(e, { value }) =>
                        setUsuario({ ...usuario, genero: value })
                      }
                    />
                  )}
                </Form.Field>
                <Form.Field>
                  <label style={{ color: colorText }}>Fecha de nacimiento</label>
                  <Input
                    onChange={(e, { value }) =>
                      setUsuario({ ...usuario, fecha_nacimiento: value })
                    }
                    value={usuario.fecha_nacimiento}
                    name="fecha"
                    type="date"
                    placeholder="Fecha de nacimiento"
                  />
                </Form.Field>
                <Form.Field>
                  <label style={{ color: colorText }}>Facebook</label>
                  <Input
                    name="name"
                    value={usuario.facebook}
                    onChange={(e, { value }) =>
                      setUsuario({ ...usuario, facebook: value })
                    }
                  />
                </Form.Field>
                <Form.Field>
                  <label style={{ color: colorText }}>Instagram</label>
                  <Input
                    name="name"
                    value={usuario.instagram}
                    onChange={(e, { value }) =>
                      setUsuario({ ...usuario, instagram: value })
                    }
                  />
                </Form.Field>
                <Form.Field>
                  <label style={{ color: colorText }}>Tiktok</label>
                  <Input
                    name="name"
                    value={usuario.tiktok}
                    onChange={(e, { value }) =>
                      setUsuario({ ...usuario, tiktok: value })
                    }
                  />
                </Form.Field>
              </Form>
            </Grid.Column>
          </Grid>
        </Responsive>
        <Header as="h2" style={{ color: colorText }}>CAMBIO DE CONTRASEÑA</Header>
        <Form>
          <Form.Field>
            <label style={{ color: colorText }}>
              Contraseña actual (déjala en blanco para que no haya cambios)
            </label>
            <Input
              type="password"
              name="passAct"
              onChange={(e, { value }) =>
                setPassword({ ...password, old_password: value })
              }
            />
          </Form.Field>
          <Form.Field>
            <label style={{ color: colorText }}>
              Nueva contraseña (déjala en blanco para que no haya cambios)
            </label>
            <Input
              type="password"
              name="passNew"
              onChange={(e, { value }) =>
                setPassword({ ...password, new_password: value })
              }
            />
          </Form.Field>
          <Form.Field>
            <label style={{ color: colorText }}>Confirmar nueva contraseña</label>
            <Input
              type="password"
              name="confirmPassNew"
              onChange={(e, { value }) =>
                setPassword({ ...password, confirm_password: value })
              }
            />
          </Form.Field>
        </Form>
        <Button
          onClick={() => updateProfile()}
          color="blue"
          style={{ marginTop: 15 }}
        >
          GUARDAR CAMBIOS
        </Button>
      </Container>
    </PublicLayout>
  );
}
perfil.getInitialProps = authInitialProps();
