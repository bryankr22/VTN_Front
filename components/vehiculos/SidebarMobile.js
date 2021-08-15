import React, {useState} from 'react'
import { Input, Header, Button, Container } from "semantic-ui-react";
import ActiveTagsVehiculos from './ActiveTagsVehiculos';
import ModalFiltersMobile from './modals/ModalFiltersMobile';
import ModalOrderMobile from './modals/ModalOrderMobile';
export default function SidebarMobile({ params, contadores, vehiculos, isFicha }) {
    const [modalOrder, setModalOrder] = useState(false);
    const [modalFilter, setModalFilter] = useState(false);
    return (
        <div>
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
            }}
            fluid
            id="search-responsive"
            style={{ margin: "10px 20px 0 20px" }}
            placeholder="¿Qué estas buscando?"
          />
          <Header style={{ margin: 10 }} as="h3">
            { contadores.total_records } resultados
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
            {!isFicha ? 
                <ModalFiltersMobile 
                params={params}
                filtros={contadores}
                showModal={modalFilter}
                onClose={() => setModalFilter(!modalFilter)}/>
            : null}
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
            showModal={modalOrder}
            onClose={() => setModalOrder(!modalOrder)}
            />
            </Header>  
            <Container style={{ marginBottom: 10 }}>
                <ActiveTagsVehiculos tags={params}/>
            </Container>
        </div>
    )
}
