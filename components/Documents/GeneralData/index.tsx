import Collapse from "../Collapse";
import { useForm } from "react-hook-form";

import {
  Button,
  Card,
  Grid,
  Input,
  Row,
  Spacer,
  Text,
  Textarea,
} from "@nextui-org/react";
import { BuySellingFields } from "./types";
import { toCurrency } from "../../../helpers/format";

import {
  getStatusError,
  guardOptional,
  required,
  SERVICES,
  TYPE_ARMOR,
  validateAsNumber,
  VEHICLE_CLASS,
} from "./constants";
import Select from "../../Select";
import axios from "axios";
import { API_URL, AUTH_URL } from "../../../helpers/constants";
import { useEffect, useState } from "react";
import { useEffectOnce } from "react-use";
import { verify } from "jsonwebtoken";
import { useCookies } from "react-cookie";

export default function GeneralData() {
  const { register, handleSubmit, formState, watch, setValue } =
    useForm<BuySellingFields>({
      mode: "all",
    });
  const vehicleClass = watch("clase_vehiculo");
  const [cookies] = useCookies(["vtn_token"]);
  const [brands, setBrands] = useState<{ label: string; key: string }[]>([]);
  const [isSending, setIsSending] = useState(false);
  const [message, setMessage] = useState({ type: "", txt: "" });
  const [bodywork, setBodyWork] = useState<string[]>([]);
  const onSubmit = handleSubmit((data) => {
    setIsSending(true);
    const cookie = cookies.vtn_token;
    const decoded: any = verify(cookie, "vendetunave2021");
    const user_id = decoded?.user?.id;
    const config = {
      headers: {
        Authorization: `Bearer ${decoded.token_server.access_token}`,
      },
    };
    axios
      .post(`${AUTH_URL}/documento-compra-venta`, { ...data, user_id }, config)
      .then((res) => {
        if (!res.data.status) {
          setMessage({
            type: "error",
            txt: "Ha ocurrido un problema, intenta mas tarde",
          });
        } else {
          setMessage({
            type: "success",
            txt: "Datos enviados satisfactoriamente",
          });
        }
        setIsSending(false);
      })
      .catch((err) => console.warn(err));
  });

  const changeTipoVehiculo = (value = 1) => {
    if (value !== 5) {
      axios.get(`${API_URL}/marcas/${value}`).then((res) => {
        const optionsMarcas = [{ value: "", label: "" }];
        res.data.marcas.forEach(function (item: { id: any; nombre: any }) {
          optionsMarcas.push({
            value: item.nombre,
            label: item.nombre,
          });
        });
        setBrands(optionsMarcas as any);
      });
    }
  };

  useEffectOnce(() => {
    changeTipoVehiculo();
  });

  useEffect(() => {
    const list = TYPE_ARMOR[vehicleClass] || [];
    setBodyWork(["", ...list]);
    setValue("tipo_carroceria", "");
  }, [vehicleClass]);

  return (
    <form onSubmit={onSubmit}>
      <Collapse>
        <Grid.Container gap={2}>
          <Grid xs={12} md={12}>
            {message.type && (
              <Card
                color={message.type}
                textColor="white"
                clickable
                onClick={() => setMessage({ type: "", txt: "" })}
              >
                <Text h5 transform="capitalize">
                  {message.txt}
                </Text>
              </Card>
            )}
          </Grid>
          <Grid xs={12} md={6} direction="column">
            <Input
              underlined
              shadow={false}
              label="* Nombre del Vendedor"
              fullWidth
              required
              {...register("nombre_vendedor", { required })}
              {...getStatusError(formState.errors.nombre_vendedor?.message)}
            />
            <Spacer />
            <Input
              underlined
              shadow={false}
              label="* Número de Identidad"
              fullWidth
              {...register("documento_vendedor", {
                required,
                validate: validateAsNumber,
              })}
              {...getStatusError(formState.errors.documento_vendedor?.message)}
            />
            <Spacer />
            <Input
              underlined
              shadow={false}
              label="* Domicilio y Residencia"
              fullWidth
              required
              {...register("direccion_vendedor", {
                required,
              })}
              {...getStatusError(formState.errors.direccion_vendedor?.message)}
            />
            <Spacer />
            <Input
              underlined
              shadow={false}
              label="* Teléfonos"
              fullWidth
              type="tel"
              required
              {...register("tel_vendedor", {
                required,
                validate: validateAsNumber,
              })}
              {...getStatusError(formState.errors.tel_vendedor?.message)}
            />
          </Grid>
          <Grid xs={12} md={6} direction="column">
            <Input
              underlined
              shadow={false}
              label="Nombre del comprador"
              fullWidth
              {...register("nombre_comprador")}
              {...getStatusError(formState.errors.nombre_comprador?.message)}
            />
            <Spacer />
            <Input
              underlined
              shadow={false}
              label="Número de Identidad"
              fullWidth
              {...register("documento_comprador", {
                validate: guardOptional(validateAsNumber),
              })}
              {...getStatusError(formState.errors.documento_comprador?.message)}
            />
            <Spacer />
            <Input
              underlined
              shadow={false}
              label="Domicilio y Residencia"
              fullWidth
              {...register("direccion_comprador")}
              {...getStatusError(formState.errors.direccion_comprador?.message)}
            />
            <Spacer />
            <Input
              underlined
              shadow={false}
              label="Teléfonos"
              fullWidth
              type="tel"
              {...register("tel_comprador", {
                validate: guardOptional(validateAsNumber),
              })}
              {...getStatusError(formState.errors.tel_comprador?.message)}
            />
          </Grid>
          <Grid xs={12} md={12} direction="column">
            <Spacer />
            <Text h4 weight="bolder">
              Datos del vehículo
            </Text>
            <Spacer />
          </Grid>
          <Grid xs={12} md={6} direction="column">
            <Select
              label={"Clase de vehiculo"}
              options={VEHICLE_CLASS}
              inputProps={{ ...register("clase_vehiculo", { required }) }}
              error={formState.errors.clase_vehiculo?.message}
            />
            <Spacer y={2.05} />
            <Select
              label="Marca"
              options={brands as any}
              inputProps={{ ...register("marca", { required }) }}
              error={formState.errors.marca?.message}
            />
            <Spacer y={2.16} />
            <Input
              underlined
              shadow={false}
              fullWidth
              type="number"
              label="Año"
              {...register("ano", {
                required,
                validate: validateAsNumber,
              })}
              {...getStatusError(formState.errors.ano?.message)}
            />
            <Spacer />
            <Select
              label="Tipo de carrocería"
              options={bodywork as any}
              inputProps={{ ...register("tipo_carroceria", { required }) }}
              error={formState.errors.tipo_carroceria?.message}
            />
            <Spacer y={2} />
            <Input
              underlined
              shadow={false}
              fullWidth
              label="Color"
              {...register("color", {
                required,
              })}
              {...getStatusError(formState.errors.color?.message)}
            />
            <Spacer />
            <Select
              label="Servicio"
              options={SERVICES}
              inputProps={{ ...register("servicio") }}
              error={formState.errors.servicio?.message}
            />
            <Spacer />
          </Grid>
          <Grid xs={12} md={6} direction="column">
            <Input
              underlined
              shadow={false}
              fullWidth
              label="Número de motor"
              {...register("numero_motor", {
                required,
              })}
              {...getStatusError(formState.errors.numero_motor?.message)}
            />
            <Spacer />
            <Input
              underlined
              shadow={false}
              fullWidth
              label="Número de chasis"
              {...register("numero_chasis", {
                required,
              })}
              {...getStatusError(formState.errors.numero_chasis?.message)}
            />
            <Spacer />
            <Input
              underlined
              shadow={false}
              fullWidth
              label="Número de serie"
              {...register("numero_serie")}
              {...getStatusError(formState.errors.numero_serie?.message)}
            />
            <Spacer />
            <Input
              underlined
              shadow={false}
              fullWidth
              label="Número de puertas"
              type="number"
              {...register("numero_puertas", {
                validate: guardOptional(validateAsNumber),
              })}
              {...getStatusError(formState.errors.numero_puertas?.message)}
            />
            <Spacer />
            <Input
              underlined
              shadow={false}
              fullWidth
              label="Capacidad"
              type="number"
              {...register("capacidad", {
                validate: guardOptional(validateAsNumber),
              })}
              {...getStatusError(formState.errors.capacidad?.message)}
            />
            <Spacer />
            <Input
              underlined
              shadow={false}
              fullWidth
              label="Placa"
              {...register("placa", { required })}
              {...getStatusError(formState.errors.placa?.message)}
            />
          </Grid>
          <Grid xs={12} md={12} direction="column">
            <Spacer />
            <Text h4 weight="bolder">
              Negocio
            </Text>
            <Spacer />
          </Grid>
          <Grid xs={12} md={6} direction="column">
            <Input
              underlined
              shadow={false}
              fullWidth
              label="Precio"
              {...register("precio", {
                required,
                onChange(e) {
                  toCurrency(e);
                },
              })}
              {...getStatusError(formState.errors.numero_chasis?.message)}
            />
          </Grid>
          <Grid md={12} xs={12} direction="column">
            <Spacer></Spacer>
            <Textarea
              shadow={false}
              underlined
              fullWidth
              width="100%"
              label="Clausulas adicionales"
              minRows={1}
              {...register("clausulas", {
                maxLength: {
                  message: "Max 200",
                  value: 200,
                },
              })}
              {...getStatusError(formState.errors.clausulas?.message)}
            />
            <Spacer></Spacer>
          </Grid>
        </Grid.Container>
      </Collapse>
      <Spacer />
      <Row justify="center">
        <Button type="submit" disabled={isSending}>
          Generar Documento
        </Button>
        <Spacer />
        <Button>Documento Vacío</Button>
      </Row>
    </form>
  );
}
