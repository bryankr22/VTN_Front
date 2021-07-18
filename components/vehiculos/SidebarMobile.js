import React from 'react'
import { Input, Header, Button } from "semantic-ui-react";
export default function SidebarMobile({vehiculos}) {
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
            {vehiculos.length} resultados
            <Button
              style={{
                border: "1px solid #2185d0",
                padding: ".78571429em 10px",
              }}
              floated="right"
              color="blue"
            >
              FILTRAR
            </Button>
            <Button
              style={{
                border: "1px solid",
                background: "transparent",
                color: "#2185d0",
                padding: ".78571429em 5px",
              }}
              floated="right"
              color="blue"
            >
              Ordenar
            </Button>
            </Header>  
        </div>
    )
}
