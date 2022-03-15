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
import { useState } from "react";
import { useForm } from "react-hook-form";
import { API_URL } from "../../../helpers/constants";
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
import dayjs from "dayjs";
import { iOS } from "@helpers/responsive.helper";

interface Props {
  data: ResponseLists;
}

export default function MandateForm({ data }: Props) {
  const { register, formState, handleSubmit, reset } = useForm<MandateFields>({
    mode: "all",
    defaultValues: {
      fecha: dayjs().format("YYYY-M-D"),
    },
  });
  const [message, setMessage] = useState({ type: "", txt: "" });
  const [isSending, setIsSending] = useState(false);
  const [brands] = useState<{ label: string; key: string }[]>(() => {
    return [
      { key: "", label: "" },
      ...data.marcas.map(({ nombre }) => ({ key: nombre, label: nombre })),
    ];
  });
  const request = (data = {}) => {
    setIsSending(true);
    let winRef = window.open("", "_blank");

    return axios
      .post(
        `${API_URL}/documento-mandato`,
        { ...data, isIos: iOS() },
        {
          headers: {
            Accept: iOS() ? "application/json" : "application/pdf",
          },
          responseType: iOS() ? "json" : "blob",
        }
      )
      .then((res) => {
        if (iOS()) {
          winRef.location = `https://vendetunave.s3.amazonaws.com/${res.data.path}`;
          return;
        }
        const url = window.URL.createObjectURL(new Blob([res.data]));
        const link = document.createElement("a");
        link.href = url;
        link.setAttribute("download", `doc_mandato_${Date.now()}.pdf`); //or any other extension
        document.body.appendChild(link);
        link.click();
        setIsSending(false);
        reset();
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
              {...register("documento_mandate", {
                required,
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
              defaultValue="01-01-2021"
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
              {...register("documento_mandatario")}
              {...getStatusError(
                formState.errors.documento_mandatario?.message
              )}
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
            <Input
              underlined
              shadow={false}
              fullWidth
              label="Línea"
              {...register("modelo", { required })}
              {...getStatusError(formState.errors.modelo?.message)}
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
      <Row justify="center" wrap="wrap" align="center">
        <Button type="submit" disabled={isSending} className="mt-2 mr-2">
          Generar Documento
        </Button>
        <Button
          disabled={isSending}
          onClick={downLoadEmptyFile}
          className="mt-2 mr-2"
        >
          Documento Vacío
        </Button>
      </Row>
    </form>
  );
}
