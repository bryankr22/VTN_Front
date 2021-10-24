import { Button, Container, Link, Row, Spacer, Text } from "@nextui-org/react";
import { GetServerSideProps } from "next";
import Head from "next/head";
import { GeneralData, RequestForm } from "../../components/Documents";
import PublicLayout from "../../layouts/PublicLayout";
import { validateAuth } from "../../helpers/auth";
import axios from "axios";
import jwt, { verify } from "jsonwebtoken";
import { API_URL, AUTH_URL } from "../../helpers/constants";
import { useCookies } from "react-cookie";
import { useState } from "react";
import { NextSeo } from "next-seo";

const desc =
  "Genera o descarga gratuitamente los documentos para hacer el traspaso de tu carro o moto (contrato de compraventa, contrato de mandato y documento para solicitar el trámite) Validos por el RUNT y secretaria de tránsito.";
const keyWords =
  "runt por placa, contrato de mandato, contrato de compraventa, promesa de compraventa, traspaso de moto, contrato de compraventa vehículo, runt por cedula";
export default function Documents({ data }: any) {
  const [isSending, setIsSending] = useState(false);
  const [cookies] = useCookies(["vtn_token"]);

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

  const downLoadEmptyFile = () => {
    const { config, user_id } = getSession();
    axios
      .post(`${AUTH_URL}/documento-tramite`, { user_id }, config)
      .then((res) => {
        const url = window.URL.createObjectURL(new Blob([res.data]));
        const link = document.createElement("a");
        link.href = url;
        link.setAttribute("download", `doc_compraventa_${Date.now()}.pdf`); //or any other extension
        document.body.appendChild(link);
        link.click();
        setIsSending(false);
      })
      .catch((err) => {
        console.warn(err);
        setIsSending(false);
      });
  };

  return (
    <>
      <style>{`
        h1 {
          font-size: 1.4rem;
        }
        h2 {
          font-size: 1.2rem;
        }
      `}</style>
      <NextSeo
        title="Como hacer el traspaso de un vehículo (carro o moto) en Colombia"
        description={desc}
      />
      <Head>
        <meta property="keywords" content={keyWords} />
      </Head>
      <PublicLayout nextUi>
        <Container>
          <Spacer y={2} />
          <Text h3 weight="bolder">
            Documentos
          </Text>
          <Spacer y={1} />
          <Text h1 weight="bolder">
            3 pasos para hacer el traspaso de tu vehículo en Colombia
          </Text>
          <Spacer y={0.5} />
          <Text p className="text-justify">
            En Vende Tu Nave nuestro servicio va más allá de la simple venta,
            por eso, te enseñamos{" "}
            <Text span weight="bolder">
              como hacer la documentación gratuitamente
            </Text>
            a la hora de comprar o vender tu vehículo, sea carro, camioneta,
            moto etc. Para realizar el traspaso de propietario de un vehículo,
            necesitaremos llenar estos 3 documentos:{" "}
            <Text span weight="bolder">
              Contrato de Compra Venta, Contrato de Mandato y Formulario de
              Solicitud de Tramite.
            </Text>
          </Text>
          <Spacer y={1} />
          <Text h2 weight="bolder">
            Contrato de Compraventa
          </Text>
          <Spacer y={0.5} />
          <Text p className="text-justify">
            El contrato de compra venta o promesa de compraventa, es el
            documento en donde el{" "}
            <Text span weight="bolder">
              Vendedor (Propietario) y Comprador
            </Text>{" "}
            acuerdan la venta del vehículo, con sus condiciones, precio,
            acuerdos etc. Para llenar este documento necesitaremos toda la
            información del vehículo la cual se encuentra en el RUNT{" "}
            <Text span weight="bolder">
              (Consultar RUNT por placa{" "}
              <Link color>
                https://www.runt.com.co/ciudadano/consulta-placa
              </Link>
              )
            </Text>{" "}
            o en la tarjeta de propiedad.
          </Text>
          <GeneralData data={data} />
          <Spacer y={1} />
          <Text h2 weight="bolder">
            Contrato de Mandato
          </Text>
          <Spacer y={0.5} />
          <Text p className="text-justify">
            Por otro lado, tenemos el Contrato de Mandato, en donde el Vendedor
            (Propietario del vehículo){" "}
            <Text weight="bolder" span>
              autoriza para que otra persona (Mandatario)
            </Text>{" "}
            haga el trámite de venta por él (lleve los papeles al tránsito).
            Este{" "}
            <Text weight="bolder" span>
              documento únicamente aplica
            </Text>{" "}
            en el caso de que el propietario del vehículo (Vendedor/ Mandante){" "}
            <Text weight="bolder" span>
              no desee él mismo realizar la radicación del tramite
            </Text>{" "}
            en la secretaria de tránsito, y sea realizado por un tercero
            Tramitador (Mandatario).
          </Text>
          <RequestForm data={data} />
          <Spacer y={1} />
          <Text h2 weight="bolder">
            Formulario de Solicitud de Tramite Del Registro Nacional Automotor
          </Text>
          <Spacer y={0.5} />
          <Text p className="text-justify">
            Finalmente, El documento de Solicitud de Tramite debe ser impreso,
            diligenciado correctamente (puede{" "}
            <Text weight="bolder" span>
              ayudarse con la información del RUNT
            </Text>{" "}
            o tarjeta de propiedad) y firmado por vendedor y el comprador.
            Posteriormente,{" "}
            <Text weight="bolder" span>
              ser radicado ante la secretaria de tránsito por el propietario o
              mandatario.
            </Text>{" "}
            Este documento sirve para realizar cualquier tipo de tramite como:
            traspaso, cambio de color, duplicados etc.
          </Text>
          <Spacer y={0.5} />
          <Text p className="text-justify">
            Nota: Se recomiendan autenticar estos 3 documentos en una notaría,
            deben ir acompañados de las improntas del vehículo y las fotocopias
            de las cedulas del vendedor como el comprador.
          </Text>
          <Spacer y={0.5} />
          <Text p className="text-justify">
            Es importante que el vehículo se encuentre al día de multas e
            impuestos para realizar cualquier tipo de trámite.
          </Text>
          <Spacer y={0.5} />
          <Text p className="text-justify">
            Consulta acá el estado: Estado del vehículo (Runt por placa):
          </Text>
          <Text p className="text-justify">
            <Link color style={{ wordBreak: "break-all" }}>
              https://www.runt.com.co/consultaCiudadana/#/consultaVehiculo
            </Link>
          </Text>
          <Spacer y={0.5} />
          <Text p className="text-justify">
            Estado de la persona (Runt por cedula):
          </Text>
          <Text p className="text-justify">
            <Link color style={{ wordBreak: "break-all" }}>
              https://www.runt.com.co/consultaCiudadana/#/consultaPersona
            </Link>
          </Text>
          <Spacer y={0.5} />
          <Text p className="text-justify">
            Consulta multas por Placa o Cedula:
          </Text>
          <Text p className="text-justify">
            <Link color style={{ wordBreak: "break-all" }}>
              https://fcm.org.co/simit/#/home-public
            </Link>
          </Text>
          <Spacer y={1} />
          <Row justify="center">
            <Button onClick={downLoadEmptyFile}>Documento Vacío</Button>
          </Row>
        </Container>
      </PublicLayout>
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const auth = validateAuth(context);

  if (!auth.vtn_token) {
    context.res.writeHead(301, {
      Location: "/401?path=/documents",
    });
    context.res.end();
    return {
      props: {},
    };
  }
  const cookie = auth.vtn_token;
  const decoded = jwt.verify(cookie, "vendetunave2021");
  const config = {
    headers: {
      Authorization: `Bearer ${(decoded as any).token_server.access_token}`,
    },
  };
  let data;
  try {
    const res = await axios.get(`${API_URL}/informacion-documentos`, config);
    data = res.data;
  } catch (err: any) {
    const { response } = err as any;
    if (response.status === 401) {
      context.res.writeHead(301, {
        Location: "/401?path=/documents",
      });
      context.res.end();
    }

    return {
      props: {
        data,
      },
    };
  }
  return {
    props: {
      data,
    },
  };
};
