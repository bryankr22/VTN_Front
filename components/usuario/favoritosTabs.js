import React, { Fragment } from 'react';
import { useSelector } from 'react-redux';
import { Container, Header, Table, Button, Image, Responsive, Tab, Pagination } from 'semantic-ui-react'
import { dark, light } from '../../helpers/colors';
const pathS3_favoritos = "https://d3bmp4azzreq60.cloudfront.net/fit-in/300x300/vendetunave/images/vehiculos/";
const pathS3_fichas = "https://d3bmp4azzreq60.cloudfront.net/fit-in/300x300/vendetunave/images/ficha-tecnica/";
const normalize = (function () {
    var from = "ÃÀÁÄÂÈÉËÊÌÍÏÎÒÓÖÔÙÚÜÛãàáäâèéëêìíïîòóöôùúüûÑñÇç",
        to = "AAAAAEEEEIIIIOOOOUUUUaaaaaeeeeiiiioooouuuunncc",
        mapping = {};

    for (var i = 0, j = from.length; i < j; i++)
        mapping[from.charAt(i)] = to.charAt(i);

    return function (str) {
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
    const darkMode = useSelector(({ darkMode }) => darkMode.status);
    const colorText = darkMode === light ? dark : light;

    return [
        {
            menuItem: "VEHÍCULOS",
            render: () => (
                <Tab.Pane inverted={darkMode === dark} color={colorText}>
                    {(favoritos).length > 0 &&
                        <Fragment>
                            <Table inverted={darkMode === dark} color={colorText}>
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
                                                    <Image src={pathS3_favoritos + item.nameImage + '.' + item.extension} rounded size='massive' alt={item.title} />
                                                    <Header.Content style={{ width: '70%', whiteSpace: 'nowrap', textOverflow: 'ellipsis', overflow: 'hidden' }}>
                                                        <h2 style={{ color: colorText }} className="fnt-size-inherit">
                                                            {(item.title.substr(0, 22))}
                                                        </h2>
                                                        <Header.Subheader style={{ fontSize: 10 }}>
                                                            <h3 style={{ color: colorText }} className="fnt-size-inherit">
                                                                {item.labelCiudad}
                                                            </h3>
                                                        </Header.Subheader>
                                                        <Responsive  {...Responsive.onlyMobile}>
                                                            <h3 style={{ color: colorText }} className="fnt-size-inherit">
                                                                $ {new Intl.NumberFormat("de-DE").format(item.precio)}
                                                            </h3>
                                                        </Responsive>
                                                    </Header.Content>
                                                </Header>
                                            </Table.Cell>
                                            <Table.Cell style={{ verticalAlign: 'inherit' }}>
                                                <Responsive  {...Responsive.onlyComputer}>
                                                    <h3 style={{ color: colorText }} className="fnt-size-inherit">
                                                        $ {new Intl.NumberFormat("de-DE").format(item.precio)}
                                                    </h3>
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
                                        pointing
                                        secondary
                                        boundaryRange={0}
                                        activePage={1}
                                        ellipsisItem={null}
                                        firstItem={null}
                                        lastItem={null}
                                        siblingRange={2}
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
                <Tab.Pane inverted={darkMode === dark} color={colorText}>
                    {accesorios.length > 0 && (
                        <Fragment>
                            <Table inverted={darkMode === dark} color={colorText}>
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
                                                    <Image src={pathS3_fichas + item.name + '.' + item.ext} rounded size='massive' alt={item.title} />
                                                    <Header.Content style={{ width: '70%', whiteSpace: 'nowrap', textOverflow: 'ellipsis', overflow: 'hidden' }}>
                                                        <h2 style={{ color: colorText }} className="fnt-size-inherit">
                                                            {(item.title.substr(0, 22))}
                                                        </h2>
                                                        <Header.Subheader style={{ fontSize: 10 }}>
                                                            <h3 style={{ color: colorText }} className="fnt-size-inherit">
                                                                {item.year}
                                                            </h3>
                                                        </Header.Subheader>
                                                        <Responsive  {...Responsive.onlyMobile}>
                                                            <h3 style={{ color: colorText }} className="fnt-size-inherit">
                                                                $ {new Intl.NumberFormat("de-DE").format(item.price)}
                                                            </h3>
                                                        </Responsive>
                                                    </Header.Content>
                                                </Header>
                                            </Table.Cell>
                                            <Table.Cell>
                                                <Responsive
                                                    {...Responsive.onlyComputer}
                                                >
                                                    <h3 style={{ color: colorText }} className="fnt-size-inherit">
                                                        ${" "}
                                                        {new Intl.NumberFormat("de-DE").format(
                                                            item.price
                                                        )}
                                                    </h3>
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
                                                    onClick={() => removeVehicle(item.datasheet_id)}
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
                                        pointing
                                        secondary
                                        boundaryRange={0}
                                        activePage={1}
                                        ellipsisItem={null}
                                        firstItem={null}
                                        lastItem={null}
                                        siblingRange={2}
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
