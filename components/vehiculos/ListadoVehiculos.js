import React, {useState} from 'react'
import { Image, Container, Input, Card, Select, Grid, Pagination } from "semantic-ui-react";
export default function ListadoVehiculos() {
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
            <Card.Group itemsPerRow={4}>
                <Card
                    as='a'
                    style={{ textDecoration: "none" }}
                >
                    <Image
                        src={'https://via.placeholder.com/300'}
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
                            DATA
                        </Card.Description>
                        <Card.Header>
                            $ 000000
                            COP
                        </Card.Header>
                        <Card.Description>
                            0000 -
                            000000
                            KM
                        </Card.Description>
                        <Card.Description>
                        DATA-CIUDAD
                        </Card.Description>
                    </Card.Content>
                </Card>
            </Card.Group>
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
