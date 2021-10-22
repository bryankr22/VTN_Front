import Collapse from "../Collapse";
import { useForm } from "react-hook-form";
import styles from "./styles.module.css";
import { Button, Grid, Input, Row, Spacer, Text } from "@nextui-org/react";
import { BuySellingFields } from "./types";

import {
  getStatusError,
  guardOptional,
  required,
  validateAsNumber,
  VEHICLE_CLASS,
} from "./constants";
import Select from "../../Select";
import axios from "axios";
import { API_URL } from "../../../helpers/constants";
import { useEffect, useState } from "react";
import { useEffectOnce } from "react-use";

export default function GeneralData() {
  const { register, handleSubmit, formState } = useForm<BuySellingFields>({
    mode: "all",
  });

  const [marcas, setMarcas] = useState<{ label: string; key: string }[]>([]);

  const onSubmit = handleSubmit((data) => {
    console.log(data);
  });
  const changeTipoVehiculo = (value = 1) => {
    if (value !== 5) {
      axios.get(`${API_URL}/marcas/${value}`).then((res) => {
        const optionsMarcas = [{ value: "0", label: "Seleccione marca..." }];
        res.data.marcas.forEach(function (item: { id: any; nombre: any }) {
          optionsMarcas.push({
            value: item.nombre,
            label: item.nombre,
          });
        });
        setMarcas(optionsMarcas as any);
      });
    }
  };

  useEffectOnce(() => {
    changeTipoVehiculo();
  });

  return (
    <form onSubmit={onSubmit}>
      <Collapse>
        <Grid.Container gap={2}>
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
          <Grid xs={12} md={6} direction="column">
            <Spacer />
            <Text h4 weight="bolder">
              Datos del vehículo
            </Text>
            <Spacer />
            <Select
              label={"Clase de vehiculo"}
              options={VEHICLE_CLASS}
              inputProps={{ ...register("clase_vehiculo", { required }) }}
              error={formState.errors.clase_vehiculo?.message}
            />
            <Spacer y={2}/>
            <Select
              label="Marca"
              options={marcas as any}
              inputProps={{ ...register("marca", { required }) }}
              error={formState.errors.marca?.message}
            />
            <Spacer />
            <Spacer />
            <Spacer />
            <Spacer />
            <Spacer />
            <Spacer />
          </Grid>
          <Grid xs={12} md={6} direction="column"></Grid>
          <Grid xs={12} md={6} direction="column"></Grid>
        </Grid.Container>
      </Collapse>
      <Spacer />
      <Row justify="center">
        <Button type="submit">Generar Documento</Button>
        <Spacer />
        <Button type="submit">Documento Vacío</Button>
      </Row>
    </form>
  );
}
