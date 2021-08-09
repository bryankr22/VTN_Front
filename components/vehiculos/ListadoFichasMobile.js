import React from 'react'
import { Image, Card, Grid, Header, Button } from "semantic-ui-react";
export default function ListadoFichasMobile({vehiculos}) {
    const pathS3 = "https://d3bmp4azzreq60.cloudfront.net/fit-in/200x200/vendetunave/images/ficha-tecnica/";
    const normalize = (function() {
        var from = "ÃÀÁÄÂÈÉËÊÌÍÏÎÒÓÖÔÙÚÜÛãàáäâèéëêìíïîòóöôùúüûÑñÇç",
          to = "AAAAAEEEEIIIIOOOOUUUUaaaaaeeeeiiiioooouuuunncc",
          mapping = {};
      
        for (var i = 0, j = from.length; i < j; i++)
          mapping[from.charAt(i)] = to.charAt(i);
      
        return function(str) {
          var ret = [];
          for (var i = 0, j = str.length; i < j; i++) {
            var c = str.charAt(i);
            if (mapping.hasOwnProperty(str.charAt(i))) ret.push(mapping[c]);
            else ret.push(c);
          }
          return ret.join("");
        };
    })();
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
              as="a"
              href={ "/ficha-tecnica/detalle/" + normalize(item.title) .split(" ") .join("-") .split("%") .join("") .split("?") .join("") .split("/") .join("") + "-" + item.id }
              style={{ width: '100%', boxShadow: '0 4px 2px -4px grey', margin: 3 }}>
                  <Card.Content style={{ paddingBottom: 20 }}>
                      <Image
                          style={{ marginRight: 10 }}
                          className="image-ficha"
                          floated='left'
                          size='small'
                          src={pathS3 + item.nameImage + "." + item.extension}
                          wrapped
                          ui={false}
                      />
                      <Card.Content>
                          <Card.Header as='a' style={{ marginBottom: 10, marginTop: 10, fontSize: 14, color: 'black', fontWeight: 'bold' }}>{item.title}</Card.Header>
                          <Grid.Row>
                              <Grid.Column>
                                  <Grid>
                                      <Grid.Row columns={2} style={{ paddingBottom: 0 }}>
                                          <Grid.Column>
                                              <Header
                                                  as="h5"
                                                  style={{ color: "gray", marginBottom: 0, fontSize: 12 }}
                                              >
                                                  Precio:
                                              </Header>
                                              <p
                                              style={{
                                                  display: "inline-block",
                                                  fontWeight: 700,
                                                  fontSize: 12,
                                                  textDecoration: 'none',
                                                  color: 'black'
                                              }}
                                              >
                                                  $ {new Intl.NumberFormat("de-DE").format(item.price)} COP
                                              </p>
                                          </Grid.Column>
                                          <Grid.Column>
                                              <Header
                                                  as="h5"
                                                  style={{ color: "gray", marginBottom: 0, fontSize: 12 }}
                                              >
                                                  Tipo de Motor:
                                              </Header>
                                              <p
                                                  style={{
                                                      display: "inline-block",
                                                      fontWeight: 700,
                                                      fontSize: 12,
                                                      textDecoration: 'none',
                                                      color: 'black'
                                                  }}
                                              >
                                                  {item.combustibleLabel}
                                              </p>
                                          </Grid.Column>
                                      </Grid.Row>
                                      <Grid.Row
                                          columns={2}
                                          style={{ paddingTop: 0, paddingBottom: 0 }}
                                      >
                                          <Grid.Column>
                                              <Header
                                                  as="h5"
                                                  style={{ color: "gray", marginBottom: 0, fontSize: 12 }}
                                              >
                                                  Año:
                                              </Header>
                                              <p
                                                  style={{
                                                      display: "inline-block",
                                                      fontWeight: 700,
                                                      fontSize: 12,
                                                      textDecoration: 'none',
                                                      color: 'black'
                                                  }}
                                              >
                                                  {item.year}
                                              </p>
                                          </Grid.Column>
                                          <Grid.Column>
                                              <Header
                                                  as="h5"
                                                  style={{ color: "gray", marginBottom: 0, fontSize: 12 }}
                                              >
                                                  Autonomía:
                                              </Header>
                                              <p
                                                  style={{
                                                      display: "inline-block",
                                                      fontWeight: 700,
                                                      fontSize: 12,
                                                      textDecoration: 'none',
                                                      color: 'black'
                                                  }}
                                              >
                                                  {new Intl.NumberFormat("de-DE").format(item.autonomy)} Km
                                              </p>
                                          </Grid.Column>
                                      </Grid.Row>
                                      <Grid.Row
                                          columns={2}
                                          style={{ paddingTop: 0, paddingBottom: 0 }}
                                      >
                                          <Grid.Column>
                                              <Header
                                                  as="h5"
                                                  style={{ color: "gray", marginBottom: 0, fontSize: 12 }}
                                              >
                                                  Motor:
                                              </Header>
                                              <p
                                                  style={{
                                                      display: "inline-block",
                                                      fontWeight: 700,
                                                      fontSize: 12,
                                                      textDecoration: 'none',
                                                      color: 'black'
                                                  }}
                                              >
                                                  {new Intl.NumberFormat("de-DE").format(item.engine)} C.C.
                                              </p>
                                          </Grid.Column>
                                          <Grid.Column>
                                              <Header
                                                  as="h5"
                                                  style={{ color: "gray", marginBottom: 0, fontSize: 12 }}
                                              >
                                                  Transmisión:
                                              </Header>
                                              <p
                                                  style={{
                                                      display: "inline-block",
                                                      fontWeight: 700,
                                                      fontSize: 12,
                                                      textDecoration: 'none',
                                                      color: 'black'
                                                  }}
                                              >
                                                  {item.transmisionLabel}
                                              </p>
                                          </Grid.Column>
                                      </Grid.Row>
                                      <Grid.Row
                                      columns={2}
                                      style={{ paddingTop: 0, paddingBottom: 0 }}
                                      >
                                          <Grid.Column>
                                              <Header
                                              as="h5"
                                              style={{ color: "gray", marginBottom: 0, fontSize: 12 }}
                                              >
                                                  Potencia:
                                              </Header>
                                              <p
                                              style={{
                                                  display: "inline-block",
                                                  fontWeight: 700,
                                                  fontSize: 12,
                                                  textDecoration: 'none',
                                                  color: 'black'
                                              }}
                                              >
                                                  {new Intl.NumberFormat("de-DE").format(item.power)} HP
                                              </p>
                                          </Grid.Column>
                                          <Grid.Column>
                                            { localStorage.getItem('compareFichatecnica') === '1' &&
                                                <Button onClick={(e) => { e.preventDefault(); }} 
                                                primary floated='left' compact style={{ fontSize: 13 }}>Comparar</Button>   
                                            }
                                          </Grid.Column>
                                      </Grid.Row>
                                  </Grid>
                              </Grid.Column>
                          </Grid.Row>
                      </Card.Content>
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
