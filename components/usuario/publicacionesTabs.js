/* eslint-disable jsx-a11y/alt-text */
import React, { Fragment, useState, useEffect } from 'react';
import { Container, Header, Table, Button, Image, Responsive, Tab, Pagination, Message, Modal, Grid, Input } from 'semantic-ui-react';
import { useCookies } from "react-cookie";
import { useSelector } from 'react-redux';
import jwt from 'jsonwebtoken';
import axios from 'axios';
import { AUTH_URL } from '../../helpers/constants';
import { dark, light } from '../../helpers/colors';

const pathS3_vehiculos = "https://d3bmp4azzreq60.cloudfront.net/fit-in/300x300/vendetunave/images/vehiculos/";
const pathS3_acc = "https://d3bmp4azzreq60.cloudfront.net/fit-in/300x300/vendetunave/images/accesorios/";



export const panes = (dataVehicles, resultTotalV, accesorios, resultTotalA) => {
  const vehicles = dataVehicles.vehiculos;
  const total_records = dataVehicles.total_records;
  const page = dataVehicles.filtros?.page;
  const q = dataVehicles.filtros?.q;
  const [cookies, setCookie] = useCookies(['vtn_token']);
  const [idVehicle, setIdVehicle] = useState();
  const [action, setAction] = useState('');
  const [modal, setModal] = useState(false);
  const [modalMessage, setModalMessage] = useState(false);
  const [message, setMessage] = useState('');
  const [status, setStatus] = useState({
    error: false,
    success: false
  });

  const insertParam = (key, value) => {
    key = encodeURIComponent(key);
    value = encodeURIComponent(value);
    var kvp = document.location.search.substr(1).split("&");
    let i = 0;
    for (; i < kvp.length; i++) {
      if (kvp[i].startsWith(key + "=")) {
        let pair = kvp[i].split("=");
        pair[1] = value;
        kvp[i] = pair.join("=");
        break;
      }
    }
    if (i >= kvp.length) {
      kvp[kvp.length] = [key, value].join("=");
    }
    let params = kvp.join("&");
    document.location.search = params;
  };

  const handlePaginationChange = (e, { activePage }) => {
    insertParam("page", activePage);
  };

  const [query, setQuery] = useState(dataVehicles.filtros?.q);
  const handleKeyDown = (e) => {
    if (e.keyCode === 13) {
      handleSubmit();
    }
  };
  const handleSubmit = () => {
    window.location.href = "/usuario/mis_publicaciones?q=" + query;
  };
  useEffect(() => {
    setQuery(q);
  }, [q]);

  const confirmAction = (id, action) => {
    setIdVehicle(id);
    setAction(action);
    setModalMessage(action === 'remove' ? '¿Estas seguro de eliminar este anuncio?' : '¿Estas seguro de marcar este anuncio como vendido?')
    setModal(true);
  }

  const removeVehicle = (id) => {
    const cookie = cookies.vtn_token;
    const decoded = jwt.verify(cookie, 'vendetunave2021');
    const user_id = decoded.user.id;
    const config = {
      headers: { Authorization: `Bearer ${decoded.token_server.access_token}` }
    };
    const data = { user_id, id };
    setModal(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
    axios.post(`${AUTH_URL}/vehicle_remove`, data, config).then((res) => {
      if (res.data.status) {
        setMessage("Proceso exitoso.");
        setStatus({
          error: false,
          success: true
        });

        location.reload();
      } else {
        setMessage("Ocurrió un error inesperado. Intente nuevamente más tarde.");
        setStatus({
          error: true,
          success: false
        });
      }
    })
      .catch(() => {
        setMessage("Ocurrió un error inesperado. Intente nuevamente más tarde.");
        setStatus({
          error: true,
          success: false
        });
      });
  }

  const soldVehicle = (id) => {
    const cookie = cookies.vtn_token;
    const decoded = jwt.verify(cookie, 'vendetunave2021');
    const user_id = decoded.user.id;
    const config = {
      headers: { Authorization: `Bearer ${decoded.token_server.access_token}` }
    };
    const data = { user_id, id };
    window.scrollTo({ top: 0, behavior: "smooth" });
    axios.post(`${AUTH_URL}/vehicle_sold`, data, config).then((res) => {
      if (res.data.status) {
        setMessage("Proceso exitoso.");
        setStatus({
          error: false,
          success: true
        });

        location.reload();
      } else {
        setMessage("Ocurrió un error inesperado. Intente nuevamente más tarde.");
        setStatus({
          error: true,
          success: false
        });
      }
    })
      .catch((error) => {
        setMessage("Ocurrió un error inesperado. Intente nuevamente más tarde.");
        setStatus({
          error: true,
          success: false
        });
      });
  }

  const darkMode = useSelector(({ darkMode }) => darkMode.status);
  const colorText = darkMode === light ? dark : light;

  return [
    {
      menuItem: "VEHÍCULOS",
      render: () => (
        <Tab.Pane inverted={darkMode === dark} color={colorText}>
          <Modal
            size="mini"
            open={modal}
            onClose={() => setModal(false)}
          >
            <Modal.Header>¿Estas seguro?</Modal.Header>
            <Modal.Content>
              <p>{modalMessage}</p>
            </Modal.Content>
            <Modal.Actions>
              <Button onClick={() => setModal(false)}>
                No
              </Button>
              <Button secondary onClick={() => action === 'remove' ? removeVehicle(idVehicle) : soldVehicle(idVehicle)}>
                Si
              </Button>
            </Modal.Actions>
          </Modal>
          {(status.error || status.success) &&
            <Message
              error={status.error}
              positive={status.success}
              content={message}
            />
          }
          <Container fluid style={{ textAlign: "center", margin: 10 }}>
            <Grid>
              <Grid.Column width={16}>
                  <Input
                    style={{ width: "100%" }}
                    onChange={(e, { value }) => setQuery(value)}
                    defaultValue={query}
                    onKeyDown={(e) => handleKeyDown(e)}
                    action={{
                      icon: "search",
                      onClick: () => handleSubmit(),
                    }}
                    placeholder="Buscar..."
                  />
              </Grid.Column>
            </Grid>
          </Container>
          {vehicles.length > 0 && (
            <Fragment>
              <Table inverted={darkMode === dark} color={colorText}>
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
                            alt={item.title}
                          />
                          <Header.Content style={{ width: "75%" }}>
                            {item.activo == 0 && item.vendido == 0 && (
                              <Header.Subheader
                                style={{ fontSize: 13, color: "orange" }}
                                as="h3"
                              >
                                Pendiente de aprobación
                              </Header.Subheader>
                            )}
                            {item.vendido == 1 && (
                              <Header.Subheader
                                style={{ fontSize: 13, color: "green" }}
                                as="h3"
                              >
                                Vendido
                              </Header.Subheader>
                            )}
                            {item.activo == 2 && (
                              <Header.Subheader
                                style={{ fontSize: 13, color: "red" }}
                                as="h3"
                              >
                                Rechazado
                              </Header.Subheader>
                            )}
                            <h2 style={{ color: colorText }} className="fnt-size-inherit">
                              {item.title.substr(0, 15)}
                            </h2>
                            <Header.Subheader style={{ fontSize: 10, color: colorText }} as="h3">
                              SKU: {item.sku}
                            </Header.Subheader>
                            <Header.Subheader style={{ fontSize: 10, color: colorText }} as="h3">
                              {item.labelCiudad}
                            </Header.Subheader>
                            <Header.Subheader style={{ fontSize: 10, color: colorText }} as="h3">
                              {item.ano}
                            </Header.Subheader>
                            <Header.Subheader style={{ fontSize: 10, color: colorText }} as="h3">
                              {item.modeloLabel}
                            </Header.Subheader>
                          </Header.Content>
                        </Header>
                      </Table.Cell>
                      <Table.Cell>
                        <h3 className="fnt-size-inherit">
                          ${" "}
                          {new Intl.NumberFormat("de-DE").format(item.precio)}
                        </h3>
                      </Table.Cell>
                      <Table.Cell>{item.fecha_creacion}</Table.Cell>
                      <Table.Cell>
                        {item.activo == 1 && item.vendido == 0 && (
                          <Button
                            onClick={() => confirmAction(item.id, 'sold')}
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
                          onClick={() => confirmAction(item.id, 'remove')}
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
              {Math.ceil(total_records / 20) > 1 && (
                <Container
                  fluid
                  style={{ textAlign: "center", margin: 25 }}
                >
                  {darkMode === dark &&
                    <style>{`
                      .ui.secondary.pointing.menu .active.item {
                          color: ${colorText}
                      }
                      .ui.secondary.pointing.menu .item {
                          border-color: ${colorText};
                          color: ${colorText}
                      }
                      `}</style>
                  }
                  <Pagination
                    style={{ color: colorText }}
                    pointing
                    secondary
                    boundaryRange={0}
                    activePage={parseInt(page)}
                    ellipsisItem={null}
                    firstItem={null}
                    lastItem={null}
                    siblingRange={2}
                    onPageChange={handlePaginationChange}
                    totalPages={Math.ceil(total_records / 20)}
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
