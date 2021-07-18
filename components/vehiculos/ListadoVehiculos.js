import React, {useState} from 'react'
import { Image, Container, Input, Card, Select, Grid, Pagination } from "semantic-ui-react";
export default function ListadoVehiculos({params, vehiculos}) {
    const pathS3 = "https://d3bmp4azzreq60.cloudfront.net/fit-in/200x200/vendetunave/images/vehiculos/";
    const filter = [
        { key: 0, value: 0, text: "Más reciente" },
        { key: 1, value: 1, text: "Nuevo" },
        { key: 2, value: 2, text: "Usado" },
        { key: 3, value: 3, text: "Precio más bajo" },
        { key: 4, value: 4, text: "Precio más alto" },
    ];
    return (
        <Grid.Column width={13}>
            <Container fluid style={{ textAlign: "center", margin: 10 }}>
                <Grid>
                    <Grid.Column width={12}>
                        <Input
                            style={{ width: "100%" }}
                            action={{
                                icon: "search",
                                onClick: () => this.filterChange(0),
                            }}
                            placeholder="Buscar..."
                        />
                    </Grid.Column>
                    <Grid.Column width={4}>
                        <Select
                            fluid
                            placeholder="Ordenar por..."
                            search
                            options={filter}
                        />
                    </Grid.Column>
                </Grid>
            </Container>
            {/**<p
                style={{
                    textAlign: "center",
                    marginTop: "25%",
                    fontSize: 24,
                }}
            >
                No encontramos resultados
            </p>**/}
            {vehiculos.length > 0 && (
            <Card.Group itemsPerRow={4}>
                {vehiculos.map((item, index) => (
                <Card
                    key={index}
                    as='a'
                    style={{ textDecoration: "none" }}
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
                )
                )}
            </Card.Group>
            )}
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
        </Grid.Column>
    )
}
