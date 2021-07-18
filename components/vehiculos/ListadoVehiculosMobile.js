import React from 'react'
import { Image, Card } from "semantic-ui-react";
export default function ListadoVehiculosMobile({vehiculos}) {
    const pathS3 = "https://d3bmp4azzreq60.cloudfront.net/fit-in/200x200/vendetunave/images/vehiculos/";
    return (
        <div>
            <Card.Group
            itemsPerRow={2}
            left="true"
            style={{ width: "100%", marginRight: 0, marginLeft: 0 }}
          >
            {vehiculos.map((item, index) => (
              <Card
                key={"vehiculo2" + index}
                as='a'
                style={{
                  width: "calc(50% - 1em)",
                  marginRight: 6,
                  marginLeft: 6,
                  textDecoration: "none",
                }}
              >
                <Image
                    src={pathS3 + item.nameImage + "." + item.extension}
                    wrapped
                    ui={false}
                />
                <Card.Content>
                  <Card.Description
                    style={{
                      whiteSpace: "nowrap",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      marginBottom: 7,
                    }}
                  >
                    {item.title}
                  </Card.Description>
                  <Card.Header>
                    $ {new Intl.NumberFormat("de-DE").format(item.precio)} COP
                  </Card.Header>
                  <Card.Description>
                    {item.ano} -{" "}
                    {new Intl.NumberFormat("de-DE").format(item.kilometraje)} KM
                  </Card.Description>
                  <Card.Description>
                    {(item.labelCiudad).toLowerCase().charAt(0).toUpperCase() + (item.labelCiudad).toLowerCase().slice(1)}
                  </Card.Description>
                </Card.Content>
              </Card>
            ))}
          </Card.Group>
          
          {/**this.state.vehicles.length === 0 && this.state.dimmer == false && (
            <p
              style={{
                textAlign: "center",
                margin: "25px 0",
                fontSize: 24,
              }}
            >
              No encontramos resultados
            </p>
        )**/}

          {/**Math.ceil(this.state.resultTotal / 20) > 1 && (
            <Container fluid style={{ textAlign: "center", margin: 25 }}>
              <Pagination
                pointing
                secondary
                boundaryRange={0}
                activePage={this.state.activePage}
                ellipsisItem={null}
                firstItem={null}
                lastItem={null}
                siblingRange={2}
                onPageChange={this.handlePaginationChange}
                totalPages={Math.ceil(this.state.resultTotal / 20)}
              />
            </Container>
          )**/}
        </div>
    )
}
