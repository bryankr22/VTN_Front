import React, {Fragment} from 'react';
import { Container, Header, Table, Button, Image, Responsive, Tab, Pagination } from 'semantic-ui-react'
const pathS3_vehiculos = "https://d3bmp4azzreq60.cloudfront.net/fit-in/300x300/vendetunave/images/vehiculos/";
const pathS3_acc = "https://d3bmp4azzreq60.cloudfront.net/fit-in/300x300/vendetunave/images/accesorios/";
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
export const panes = (vehicles, resultTotalV, accesorios, resultTotalA) => { 
return [
    {
      menuItem: "VEHÍCULOS",
      render: () => (
        <Tab.Pane>
          {vehicles.length > 0 && (
            <Fragment>
              <Table>
                <Responsive
                  {...Responsive.onlyComputer}
                  {...Responsive.onlyLargeScreen}
                  style={{ display: "contents" }}
                >
                  <Table.Header>
                    <Table.Row>
                      <Table.HeaderCell></Table.HeaderCell>
                      <Table.HeaderCell>PRODUCTO</Table.HeaderCell>
                      <Table.HeaderCell>PRECIO</Table.HeaderCell>
                      <Table.HeaderCell>FECHA</Table.HeaderCell>
                      <Table.HeaderCell></Table.HeaderCell>
                    </Table.Row>
                  </Table.Header>
                </Responsive>
                <Table.Body>
                  {vehicles.map((item, index) => (
                    <Table.Row key={index}>
                      <Table.Cell>
                        <Responsive
                          {...Responsive.onlyComputer}
                          {...Responsive.onlyLargeScreen}
                        >
                          <Button
                            onClick={() => this.removeVehicle(item.id)}
                            circular
                            size="mini"
                            icon="remove"
                          />
                        </Responsive>
                      </Table.Cell>
                      <Table.Cell>
                        <Header
                          as="h4"
                          image
                          style={{ margin: 0, display: "flex" }}
                        >
                          <Image
                            src={
                            pathS3_vehiculos +
                              item.nameImage +
                              "." +
                              item.extension
                            }
                            style={{
                              height: 60,
                              width: "25%",
                              objectFit: "cover",
                              objectPosition: "center",
                            }}
                            rounded
                            size="massive"
                          />
                          <Header.Content style={{ width: "75%" }}>
                            {item.activo == 0 && item.vendido == 0 && (
                              <Header.Subheader
                                style={{ fontSize: 13, color: "orange" }}
                              >
                                Pendiente de aprobación
                              </Header.Subheader>
                            )}
                            {item.vendido == 1 && (
                              <Header.Subheader
                                style={{ fontSize: 13, color: "green" }}
                              >
                                Vendido
                              </Header.Subheader>
                            )}
                            {item.activo == 2 && (
                              <Header.Subheader
                                style={{ fontSize: 13, color: "red" }}
                              >
                                Rechazado
                              </Header.Subheader>
                            )}
                            {item.title.substr(0, 15)}
                            <Header.Subheader style={{ fontSize: 10 }}>
                              SKU: {item.sku}
                            </Header.Subheader>
                            <Header.Subheader style={{ fontSize: 10 }}>
                              {item.labelCiudad}
                            </Header.Subheader>
                            <Header.Subheader style={{ fontSize: 10 }}>
                              {item.ano}
                            </Header.Subheader>
                            <Header.Subheader style={{ fontSize: 10 }}>
                              {item.modeloLabel}
                            </Header.Subheader>
                          </Header.Content>
                        </Header>
                      </Table.Cell>
                      <Table.Cell>
                        ${" "}
                        {new Intl.NumberFormat("de-DE").format(item.precio)}
                      </Table.Cell>
                      <Table.Cell>{item.fecha_creacion}</Table.Cell>
                      <Table.Cell>
                        {item.activo == 1 && item.vendido == 0 && (
                          <Button
                            onClick={() => this.vendido(item.id)}
                            fluid
                          >
                            VENDIDO
                          </Button>
                        )}
                        {item.vendido == 0 && (
                          <Button
                            as="a"
                            href={"/editar-vehiculo/" + item.id}
                            fluid
                            style={{ marginTop: 7 }}
                          >
                            EDITAR ANUNCIO
                          </Button>
                        )}
                        <Button
                          onClick={() => this.removeVehicle(item.id)}
                          color="red"
                          fluid
                          style={{ marginTop: 7 }}
                        >
                          ELIMINAR ANUNCIO
                        </Button>
                      </Table.Cell>
                    </Table.Row>
                  ))}
                </Table.Body>
              </Table>
              {Math.ceil(resultTotalV / 20) > 1 && (
                <Container
                  fluid
                  style={{ textAlign: "center", margin: 25 }}
                >
                  <Pagination
                    pointing
                    secondary
                    boundaryRange={0}
                    activePage={1}
                    ellipsisItem={null}
                    firstItem={null}
                    lastItem={null}
                    siblingRange={2}
                    onPageChange={() => console.log(">>>>")}
                    totalPages={Math.ceil(resultTotalV / 20)}
                  />
                </Container>
              )}
            </Fragment>
          )}
          {vehicles.length == 0 && (
            <Header as="h4">Aún no cuentas con publicaciones.</Header>
            )}
        </Tab.Pane>
      ),
    },
    // {
    //   menuItem: "ACCESORIOS",
    //   render: () => (
    //     <Tab.Pane>
    //       {accesorios.length > 0 && (
    //         <Fragment>
    //           <Table>
    //             <Responsive
    //               {...Responsive.onlyComputer}
    //               style={{ display: "contents" }}
    //             >
    //               <Table.Header>
    //                 <Table.Row>
    //                   <Table.HeaderCell></Table.HeaderCell>
    //                   <Table.HeaderCell>PRODUCTO</Table.HeaderCell>
    //                   <Table.HeaderCell>PRECIO</Table.HeaderCell>
    //                   <Table.HeaderCell>FECHA</Table.HeaderCell>
    //                   <Table.HeaderCell></Table.HeaderCell>
    //                 </Table.Row>
    //               </Table.Header>
    //             </Responsive>
    //             <Table.Body>
    //               {accesorios.map((item, index) => (
    //                 <Table.Row key={index}>
    //                   <Table.Cell>
    //                     <Responsive
    //                       {...Responsive.onlyComputer}
    //                       {...Responsive.onlyLargeScreen}
    //                     >
    //                       <Button
    //                         onClick={() => this.removeAcc(item.id)}
    //                         circular
    //                         size="mini"
    //                         icon="remove"
    //                       />
    //                     </Responsive>
    //                   </Table.Cell>
    //                   <Table.Cell>
    //                     <Header
    //                       as="h4"
    //                       image
    //                       style={{ margin: 0, display: "flex" }}
    //                     >
    //                       <Image
    //                         src={
    //                           pathS3_acc +
    //                           item.nameImage +
    //                           "." +
    //                           item.extension
    //                         }
    //                         style={{
    //                           height: 60,
    //                           width: "25%",
    //                           objectFit: "cover",
    //                           objectPosition: "center",
    //                         }}
    //                         rounded
    //                         size="massive"
    //                       />
    //                       <Header.Content
    //                         style={{
    //                           width: "70%",
    //                           whiteSpace: "nowrap",
    //                           textOverflow: "ellipsis",
    //                           overflow: "hidden",
    //                           width: "75%",
    //                         }}
    //                       >
    //                         {item.activo == 0 && item.vendido == 0 && (
    //                           <Header.Subheader
    //                             style={{ fontSize: 13, color: "orange" }}
    //                           >
    //                             Pendiente de aprobación
    //                           </Header.Subheader>
    //                         )}
    //                         {item.vendido == 1 && (
    //                           <Header.Subheader
    //                             style={{ fontSize: 13, color: "green" }}
    //                           >
    //                             Vendido
    //                           </Header.Subheader>
    //                         )}
    //                         {item.activo == 2 && (
    //                           <Header.Subheader
    //                             style={{ fontSize: 13, color: "red" }}
    //                           >
    //                             Rechazado
    //                           </Header.Subheader>
    //                         )}
    //                         {item.title.substr(0, 15)}
    //                         <Header.Subheader style={{ fontSize: 10 }}>
    //                           {item.labelCiudad}
    //                         </Header.Subheader>
    //                         <Responsive {...Responsive.onlyMobile}>
    //                           <Header.Subheader
    //                             style={{
    //                               fontSize: 12,
    //                               color: "black",
    //                               marginTop: 5,
    //                             }}
    //                           >
    //                             ${" "}
    //                             {new Intl.NumberFormat("de-DE").format(
    //                               item.precio
    //                             )}
    //                           </Header.Subheader>
    //                           <Header.Subheader
    //                             style={{ fontSize: 12, color: "black" }}
    //                           >
    //                             {item.fecha_creacion}
    //                           </Header.Subheader>
    //                         </Responsive>
    //                       </Header.Content>
    //                     </Header>
    //                   </Table.Cell>
    //                   <Table.Cell>
    //                     <Responsive
    //                       {...Responsive.onlyComputer}
    //                       {...Responsive.onlyLargeScreen}
    //                     >
    //                       ${" "}
    //                       {new Intl.NumberFormat("de-DE").format(
    //                         item.precio
    //                       )}
    //                     </Responsive>
    //                   </Table.Cell>
    //                   <Table.Cell>
    //                     <Responsive
    //                       {...Responsive.onlyComputer}
    //                       {...Responsive.onlyLargeScreen}
    //                     >
    //                       {item.fecha_creacion}
    //                     </Responsive>
    //                   </Table.Cell>
    //                   <Table.Cell>
    //                     {item.activo == 1 && item.vendido == 0 && (
    //                       <Button
    //                         onClick={() => this.vendidoAcc(item.id)}
    //                         fluid
    //                       >
    //                         VENDIDO
    //                       </Button>
    //                     )}
    //                     {item.vendido == 0 && (
    //                       <Button
    //                         as="a"
    //                         href={"/editar-accesorio/" + item.id}
    //                         fluid
    //                         style={{ marginTop: 7 }}
    //                       >
    //                         EDITAR ANUNCIO
    //                       </Button>
    //                     )}
    //                     <Button
    //                       onClick={() => this.removeAcc(item.id)}
    //                       color="red"
    //                       fluid
    //                       style={{ marginTop: 7 }}
    //                     >
    //                       ELIMINAR ANUNCIO
    //                     </Button>
    //                   </Table.Cell>
    //                 </Table.Row>
    //               ))}
    //             </Table.Body>
    //           </Table>
    //           {Math.ceil(resultTotalA / 20) > 1 && (
    //             <Container
    //               fluid
    //               style={{ textAlign: "center", margin: 25 }}
    //             >
    //               <Pagination
    //                 pointing
    //                 secondary
    //                 boundaryRange={0}
    //                 activePage={1}
    //                 ellipsisItem={null}
    //                 firstItem={null}
    //                 lastItem={null}
    //                 siblingRange={2}
    //                 onPageChange={() => console.log(">>>>")}
    //                 totalPages={Math.ceil(resultTotalA / 20)}
    //               />
    //             </Container>
    //           )}
    //         </Fragment>
    //       )}
    //       {accesorios.length == 0 && (
    //         <Header as="h4">Aún no cuentas con publicaciones.</Header>
    //         )}
    //     </Tab.Pane>
    //   ),
    // },
  ];
}
