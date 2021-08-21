import React, {Fragment} from 'react';
import { Container, Header, Table, Button, Image, Responsive, Dimmer, Loader, Tab, Pagination } from 'semantic-ui-react'
const pathS3_favoritos = "https://d3bmp4azzreq60.cloudfront.net/fit-in/300x300/vendetunave/images/vehiculos/";
const pathS3_fichas = "https://d3bmp4azzreq60.cloudfront.net/fit-in/300x300/vendetunave/images/ficha-tecnica/";
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
export const panes = (favoritos, resultTotalV, accesorios, resultTotalA, removeFicha, removeVehicle) => {
    return [
    {
        menuItem: "VEHÍCULOS",
        render: () => (
            <Tab.Pane>
                {(favoritos).length > 0 &&
                    <Fragment>
                        <Table>
                            <Responsive  {...Responsive.onlyComputer} style={{ display: 'contents' }}>
                                <Table.Header>
                                    <Table.Row>
                                        <Table.HeaderCell>PRODUCTO</Table.HeaderCell>
                                        <Table.HeaderCell>PRECIO</Table.HeaderCell>
                                        <Table.HeaderCell></Table.HeaderCell>
                                    </Table.Row>
                                </Table.Header>
                            </Responsive>
                            <Table.Body>
                                {(favoritos).map((item, index) =>
                                    <Table.Row key={index}>
                                        <Table.Cell style={{ verticalAlign: 'inherit' }}>
                                            <Header as='h4' image style={{ margin: 0, width: '85%' }}>
                                                <Image src={pathS3_favoritos + item.nameImage + '.' + item.extension} rounded size='massive' />
                                                <Header.Content style={{ width: '70%', whiteSpace: 'nowrap', textOverflow: 'ellipsis', overflow: 'hidden' }}>
                                                    {(item.title.substr(0, 22))}
                                                    <Header.Subheader style={{ fontSize: 10 }}>{item.labelCiudad}</Header.Subheader>
                                                    <Responsive  {...Responsive.onlyMobile}>
                                                        $ {new Intl.NumberFormat("de-DE").format(item.precio)}
                                                    </Responsive>
                                                </Header.Content>
                                            </Header>
                                        </Table.Cell>
                                        <Table.Cell style={{ verticalAlign: 'inherit' }}>
                                            <Responsive  {...Responsive.onlyComputer}>
                                                $ {new Intl.NumberFormat("de-DE").format(item.precio)}
                                            </Responsive>
                                        </Table.Cell>
                                        <Table.Cell>
                                            <Button href={'/vehiculos/detalle/' + normalize(item.title)
                                                .split(" ")
                                                .join("-")
                                                .split("%")
                                                .join("")
                                                .split("?")
                                                .join("")
                                                .split("/")
                                                .join("") +
                                                "-" +
                                                item.vehiculo_id
                                            } style={{ textTransform: 'uppercase' }} fluid>contactar vendedor</Button>
                                            <Button fluid onClick={() => removeFicha(item.vehiculo_id)} style={{ marginTop: 7, textTransform: 'uppercase' }}>eliminar de favoritos</Button>
                                        </Table.Cell>
                                    </Table.Row>
                                )}
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
                                    onPageChange={() => console.log()}
                                    totalPages={Math.ceil(resultTotalV / 20)}
                                />
                            </Container>
                        )}
                    </Fragment>
                }
                {favoritos.length == 0 && (
                    <Header as="h4">Aún no cuentas con favoritos.</Header>
                )}
            </Tab.Pane>
        ),
    },
    {
        menuItem: "FICHAS TÉCNICAS",
        render: () => (
            <Tab.Pane>
                {accesorios.length > 0 && (
                    <Fragment>
                        <Table>
                            <Responsive
                            {...Responsive.onlyComputer}
                            style={{ display: "contents" }}
                            >
                                <Table.Header>
                                    <Table.Row>
                                        <Table.HeaderCell>PRODUCTO</Table.HeaderCell>
                                        <Table.HeaderCell>PRECIO</Table.HeaderCell>
                                        <Table.HeaderCell></Table.HeaderCell>
                                    </Table.Row>
                                </Table.Header>
                            </Responsive>
                            <Table.Body>
                                {accesorios.map((item, index) => (
                                    <Table.Row key={index}>
                                        <Table.Cell style={{ verticalAlign: 'inherit' }}>
                                            <Header as='h4' image style={{ margin: 0, width: '85%' }}>
                                                <Image src={pathS3_fichas + item.name + '.' + item.ext} rounded size='massive' />
                                                <Header.Content style={{ width: '70%', whiteSpace: 'nowrap', textOverflow: 'ellipsis', overflow: 'hidden' }}>
                                                    {(item.title.substr(0, 22))}
                                                    <Header.Subheader style={{ fontSize: 10 }}>{item.year}</Header.Subheader>
                                                    <Responsive  {...Responsive.onlyMobile}>
                                                        $ {new Intl.NumberFormat("de-DE").format(item.price)}
                                                    </Responsive>
                                                </Header.Content>
                                            </Header>
                                        </Table.Cell>
                                        <Table.Cell>
                                            <Responsive
                                                {...Responsive.onlyComputer}
                                            >
                                                ${" "}
                                                {new Intl.NumberFormat("de-DE").format(
                                                    item.price
                                                )}
                                            </Responsive>
                                        </Table.Cell>
                                        <Table.Cell>
                                            <Button href={'/ficha-tecnica/detalle/' + normalize(item.title)
                                                .split(" ")
                                                .join("-")
                                                .split("%")
                                                .join("")
                                                .split("?")
                                                .join("")
                                                .split("/")
                                                .join("") +
                                                "-" +
                                                item.datasheet_id
                                            } style={{ textTransform: 'uppercase' }} fluid>ver ficha técnica</Button>
                                            <Button 
                                            fluid 
                                            onClick={() => removeVehicle(item.datasheet_id) } 
                                            style={{ marginTop: 7, textTransform: 'uppercase' }}>eliminar de favoritos</Button>
                                        </Table.Cell>
                                    </Table.Row>
                                ))}
                            </Table.Body>
                        </Table>
                        {Math.ceil(resultTotalA / 20) > 1 && (
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
                                    onPageChange={() => console.log()}
                                    totalPages={Math.ceil(resultTotalA / 20)}
                                />
                            </Container>
                        )}
                    </Fragment>
                )}
                {accesorios.length == 0 && (
                    <Header as="h4">Aún no cuentas con accesorios.</Header>
                )}
            </Tab.Pane>
        ),
    },
    ]
};
