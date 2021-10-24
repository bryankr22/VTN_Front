import {
  Button,
  Card,
  Grid,
  Input,
  Row,
  Spacer,
  Text,
} from "@nextui-org/react";
import axios from "axios";
import { verify } from "jsonwebtoken";
import { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { useForm } from "react-hook-form";
import { AUTH_URL } from "../../../helpers/constants";
import Select from "../../Select";
import Collapse from "../Collapse";
import {
  getStatusError,
  guardOptional,
  required,
  validateAsNumber,
} from "../GeneralData/constants";
import { FORMALITIES } from "./constants";
import { MandateFields } from "./types";
import { ResponseLists } from "../GeneralData/types";

interface Props {
  data: ResponseLists;
}

export default function MandateForm({ data }: Props) {
  const [cookies] = useCookies(["vtn_token"]);
  const { register, formState, handleSubmit, watch, setValue, reset } =
    useForm<MandateFields>({
      mode: "all",
    });
  const vehicleBrand = watch("marca");
  const [message, setMessage] = useState({ type: "", txt: "" });
  const [isSending, setIsSending] = useState(false);
  const [brands] = useState<{ label: string; key: string }[]>(() => {
    return [
      { key: "", label: "" },
      ...data.marcas.map(({ nombre }) => ({ key: nombre, label: nombre })),
    ];
  });
  const [models, setModels] = useState([""]);

  const getSession = () => {
    const cookie = cookies.vtn_token;
    const decoded: any = verify(cookie, "vendetunave2021");
    const user_id = decoded?.user?.id;
    const config: any = {
      headers: {
        Authorization: `Bearer ${decoded.token_server.access_token}`,
        Accept: "application/pdf",
      },
      responseType: "blob",
    };
    return { config, user_id };
  };
  const request = (data = {}) => {
    setIsSending(true);
    const { user_id, config } = getSession();
    return axios
      .post(`${AUTH_URL}/documento-mandato`, { ...data, user_id }, config)
      .then((res) => {
        const url = window.URL.createObjectURL(new Blob([res.data]));
        const link = document.createElement("a");
        link.href = url;
        link.setAttribute("download", `doc_mandato_${Date.now()}.pdf`); //or any other extension
        document.body.appendChild(link);
        link.click();
        setIsSending(false);
        reset()
        if (res.data.status == false) {
          setMessage({
            type: "error",
            txt: "Datos enviados satisfactoriamente",
          });
        }
      })
      .catch((err) => {
        console.warn(err);
        setIsSending(false);
      });
  };

  const downLoadEmptyFile = () => request();

  const onSubmit = handleSubmit((data) => request(data));

  useEffect(() => {
    const id = data.marcas.find((item) => item.nombre === vehicleBrand)?.id;
    const list = data.modelos
      .filter((item) => item.marca_id === id)
      .map((item) => item.nombre);
    setModels(["", ...list]);
    setValue("modelo", "", { shouldValidate: true });
  }, [vehicleBrand]);

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
              label="* Nombre Mandante (propietario)"
              fullWidth
              required
              {...register("nombre_mandate", { required })}
              {...getStatusError(formState.errors.nombre_mandate?.message)}
            />
            <Spacer />
            <Input
              underlined
              shadow={false}
              label="* Número de identidad"
              fullWidth
              required
              type="number"
              {...register("documento_mandate", {
                required,
                validate: validateAsNumber,
              })}
              {...getStatusError(formState.errors.documento_mandate?.message)}
            />
            <Spacer />
            <Input
              underlined
              shadow={false}
              label="* Fecha"
              fullWidth
              required
              type="date"
              {...register("fecha", { required })}
              {...getStatusError(formState.errors.fecha?.message)}
            />
            <Spacer />
            <Select
              label="Tramite a realizar"
              options={FORMALITIES}
              inputProps={{ ...register("tramite", { required }) }}
              error={formState.errors.tramite?.message}
            />
            <Spacer y={2} />
          </Grid>
          <Grid xs={12} md={6} direction="column">
            <Input
              underlined
              shadow={false}
              label="* Nombre Mandatario (tramitador)"
              fullWidth
              {...register("nombre_mandatario")}
              {...getStatusError(formState.errors.nombre_mandatario?.message)}
            />
            <Spacer />
            <Input
              underlined
              shadow={false}
              label="* Número de identidad"
              fullWidth
              type="number"
              {...register("documento_mandatario", {
                validate: guardOptional(validateAsNumber),
              })}
              {...getStatusError(formState.errors.documento_mandate?.message)}
            />
            <Spacer />
            <Input
              underlined
              shadow={false}
              label="* Ciudad"
              fullWidth
              required
              {...register("ciudad", { required })}
              {...getStatusError(formState.errors.ciudad?.message)}
            />
            <Spacer />
          </Grid>
          <Grid xs={12} md={12}>
            <Text h4>Datos del vehículo</Text>
          </Grid>
          <Grid xs={12} md={6} direction="column">
            <Input
              underlined
              shadow={false}
              fullWidth
              label="Placa"
              {...register("placa", { required })}
              {...getStatusError(formState.errors.placa?.message)}
            />
            <Spacer />
            <Select
              label="Marca"
              options={brands as any}
              inputProps={{ ...register("marca", { required }) }}
              error={formState.errors.marca?.message}
            />
            <Spacer y={2.05} />
            <Select
              label="Modelo"
              options={models as any}
              inputProps={{ ...register("modelo", { required }) }}
              error={formState.errors.modelo?.message}
            />
            <Spacer y={2.05} />
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
          </Grid>
          <Grid xs={12} md={6} direction="column">
            <Input
              underlined
              shadow={false}
              fullWidth
              type="number"
              label="Cilindraje"
              {...register("cilindraje", {
                required,
                validate: validateAsNumber,
              })}
              {...getStatusError(formState.errors.cilindraje?.message)}
            />
            <Spacer />
            <Select
              label="Motor"
              options={["", ...data.combustibles.map((item) => item.nombre)]}
              inputProps={{ ...register("motor", { required }) }}
              error={formState.errors.motor?.message}
            />
            <Spacer y={2.1} />
            <Input
              underlined
              shadow={false}
              fullWidth
              label="Chasis"
              {...register("chasis", {
                required,
              })}
              {...getStatusError(formState.errors.chasis?.message)}
            />
          </Grid>
        </Grid.Container>
      </Collapse>
      <Spacer />
      <Row justify="center">
        <Button type="submit" disabled={isSending}>
          Generar Documento
        </Button>
        <Spacer />
        <Button disabled={isSending} onClick={downLoadEmptyFile}>
          Documento Vacío
        </Button>
      </Row>
    </form>
  );
}
