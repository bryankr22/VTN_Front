import { useRouter } from "next/router";
import React, { useState, useEffect } from "react";
import { Input, Header, Button, Container } from "semantic-ui-react";
import ActiveTagsVehiculos from "./ActiveTagsVehiculos";
import ModalFiltersMobile from "./modals/ModalFiltersMobile";
import ModalOrderMobile from "./modals/ModalOrderMobile";
import ModalTechCardFilter from "./modals/ModalTechCardFilter";
export default function SidebarMobile({
  colorText,
  params,
  contadores,
  vehiculos,
  isFicha,
}) {
  const [modalOrder, setModalOrder] = useState(false);
  const [modalFilter, setModalFilter] = useState(false);
  const [query, setQuery] = useState("");
  const router = useRouter();
  const handleKeyDown = (e) => {
    if (e.keyCode === 13) {
      handleSubmit();
    }
  };

  const handleSubmit = () => {
    if (!isFicha) {
      router.push("/vehiculos?q=" + query);
    } else {
      router.push("/ficha-tecnica?q=" + query);
    }
  };

  useEffect(() => {
    setQuery(params.q)
  }, [])

  return (
    <>
      <style>
        {`
          
          #search-responsive {
              color: ${colorText};
              border-top: none;
              border-right: none;
              border-bottom: 1px solid ${colorText} !important;
              border-left: none;
              border-radius: 0;
              background-color: transparent;
          }
          #search-responsive::placeholder {
              color: ${colorText} !important;
              text-align: center;
              letter-spacing: 3px;
          }
          #search-responsive + i {
              color: ${colorText};
              opacity: 1;
          }
        `}
      </style>
      <Input
        action={{
          icon: "search",
          style: {
            background: "transparent",
            borderBottom: `1px solid ${colorText}`,
            color: colorText,
            height: 47,
            paddingTop: 10,
          },
          onClick: () => handleSubmit(),
        }}
        onChange={(e, { value }) => setQuery(value)}
        onKeyDown={(e) => handleKeyDown(e)}
        fluid
        value={query}
        id="search-responsive"
        style={{ margin: "10px 20px 0 20px" }}
        className="search-input"
        placeholder="¿Qué estas buscando?"
      />
      <Header style={{ margin: 10 }} as="h3">
        {contadores.total_records} resultados
        <Button
          style={{
            border: "1px solid #2185d0",
            padding: ".78571429em 10px",
          }}
          floated="right"
          color="blue"
          onClick={() => setModalFilter(true)}
        >
          FILTRAR
        </Button>
        {!isFicha ? (
          <ModalFiltersMobile
            params={params}
            filtros={contadores}
            showModal={modalFilter}
            onClose={() => setModalFilter(!modalFilter)}
          />
        ) : (
          <ModalTechCardFilter
            params={params}
            filtros={contadores}
            showModal={modalFilter}
            onClose={() => setModalFilter(!modalFilter)}
          />
        )}
        <Button
          style={{
            border: "1px solid",
            background: "transparent",
            color: "#2185d0",
            padding: ".78571429em 5px",
          }}
          floated="right"
          color="blue"
          onClick={() => setModalOrder(true)}
        >
          Ordenar
        </Button>
        <ModalOrderMobile
          isFicha={isFicha}
          showModal={modalOrder}
          onClose={() => setModalOrder(!modalOrder)}
        />
      </Header>
      <Container style={{ marginBottom: 10 }}>
        <ActiveTagsVehiculos tags={params} />
      </Container>
    </>
  );
}
