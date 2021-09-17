import { useRouter } from "next/router";
import React, { useState, useEffect } from "react";
import { Input, Header, Button, Container } from "semantic-ui-react";
import ActiveTagsVehiculos from "./ActiveTagsVehiculos";
import ModalFiltersMobile from "./modals/ModalFiltersMobile";
import ModalOrderMobile from "./modals/ModalOrderMobile";
import ModalTechCardFilter from "./modals/ModalTechCardFilter";
export default function SidebarMobile({
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

  const insertParam = (key, value) => {
    key = encodeURIComponent(key);
    value = encodeURIComponent(value);
    var kvp = document.location.search.substr(1).split('&');
    let i=0;
    for(; i<kvp.length; i++){
        if (kvp[i].startsWith(key + '=')) {
            let pair = kvp[i].split('=');
            pair[1] = value;
            kvp[i] = pair.join('=');
            break;
        }
    }
    if(i >= kvp.length){
        kvp[kvp.length] = [key,value].join('=');
    }
    let params = kvp.join('&');
    document.location.search = params;
}

  const handleSubmit = () => {
    insertParam('q', query)
  };

  useEffect(() => {
    setQuery(params.q)
  }, [])

  return (
    <>
      <Input
        action={{
          icon: "search",
          style: {
            background: "transparent",
            color: "black",
            borderBottom: "1px solid black",
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
