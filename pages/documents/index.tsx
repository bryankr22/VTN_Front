import { Button, Container, Row, Spacer, Text } from "@nextui-org/react";
import { GetServerSideProps } from "next";
import { GeneralData, RequestForm } from "../../components/Documents";
import PublicLayout from "../../layouts/PublicLayout";
import { validateAuth } from "../../helpers/auth";
import axios, { AxiosResponse } from "axios";
import jwt from "jsonwebtoken";

export default function Documents() {
  return (
    <PublicLayout nextUi>
      <Container>
        <Spacer y={2} />
        <Text h4 weight="bolder">
          Documentos
        </Text>
        <Spacer y={1} />
        <Text h5 weight="bolder">
          ¿Cómo hacer el trámite de traspaso de un vehículo?
        </Text>
        <Spacer y={0.5} />
        <Text p className="text-justify">
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aspernatur
          cumque corporis impedit temporibus distinctio totam, tempore nesciunt
          eaque officiis voluptate sit porro consequuntur quisquam voluptas
          illum aut, aliquam sunt ullam! Voluptatem, voluptate! Repellat nihil
          suscipit et rem cumque. Corporis fugiat quasi, magni, ipsum deleniti
          illum delectus ut et dignissimos, quod nulla omnis. Laboriosam et
          nesciunt suscipit placeat, laborum sit molestiae.
        </Text>
        <Spacer y={1} />
        <Text h5 weight="bolder">
          Promesa de compra-venta
        </Text>
        <Spacer y={0.5} />
        <Text p className="text-justify">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Nihil
          sapiente dolorum inventore, libero repellat a accusantium officiis hic
          qui praesentium eos, consequatur unde veniam. Cumque earum distinctio
          odio omnis dicta?
        </Text>
        <GeneralData />
        <Spacer y={1} />
        <Text h5 weight="bolder">
          Formato de mandato
        </Text>
        <Spacer y={0.5} />
        <Text p className="text-justify">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Nihil
          sapiente dolorum inventore, libero repellat a accusantium officiis hic
          qui praesentium eos, consequatur unde veniam. Cumque earum distinctio
          odio omnis dicta?
        </Text>
        <RequestForm />
        <Spacer y={1} />
        <Text h5 weight="bolder">
          Formulario de solicitud de tramite
        </Text>
        <Spacer y={0.5} />
        <Text p className="text-justify">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Nihil
          sapiente dolorum inventore, libero repellat a accusantium officiis hic
          qui praesentium eos, consequatur unde veniam. Cumque earum distinctio
          odio omnis dicta?
        </Text>
        <Spacer y={1} />
        <Row justify="center">
          <Button>Documento Vacío</Button>
        </Row>
      </Container>
    </PublicLayout>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const auth = validateAuth(context);

  if (!auth.vtn_token) {
    context.res.writeHead(301, {
      Location: "/401",
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
    const res = await axios.get(
      "https://api.vendetunave.co/auth/form_producto",
      config
    );
    data = res.data;
  } catch (err: any) {
    const { response } = err as any;
    if (response.status === 401) {
      context.res.writeHead(301, {
        Location: "/401",
      });
      context.res.end();
    }

    return {
      props: {
        data,
      },
    };
  }


  console.log(data)
  return {
    props: {},
  };
};
