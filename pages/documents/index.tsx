import { Button, Container, Row, Spacer, Text } from "@nextui-org/react";
import { GeneralData, RequestForm } from '../../components/Documents';
import PublicLayout from "../../layouts/PublicLayout";

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
