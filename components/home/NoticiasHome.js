import React, { useState } from 'react';
import { Header, Container, Grid, Button, Responsive } from "semantic-ui-react";
import { useSelector } from "react-redux";
const NoticiasHome = ({noticias}) => {
    //const noticias = useSelector(({ home }) => home.noticias);
    return (
        <div>
            <Container
                fluid
                style={{
                    padding: "70px 40px",
                    margin: "40px 0",
                    background: "rgb(242, 244, 246)",
                }}
            >
                <Responsive {...Responsive.onlyComputer}>
                    <Grid columns="equal">
                        <Grid.Row>
                            <Grid.Column>
                                <Header
                                    as="h2"
                                    style={{ fontSize: "1.4rem", textTransform: "uppercase" }}
                                    textAlign="center"
                                >
                                    noticias de actualidad automotriz
                                </Header>
                            </Grid.Column>
                        </Grid.Row>
                        <Grid.Row>
                            {noticias.map((item, index) => (
                                <Grid.Column key={index}>
                                    <Header
                                        as="h4"
                                        textAlign="left"
                                        style={{ fontSize: "1.2rem" }}
                                    >
                                        {item.title}
                                    </Header>

                                    <p style={{ fontWeight: 500, margin: 0 }}>
                                        {item.description}
                                    </p>
                                    <Button
                                        as="a"
                                        href={item.link}
                                        target="_blank"
                                        style={{
                                            float: "right",
                                            background: "transparent",
                                            color: "#000",
                                            textTransform: "uppercase"
                                        }}
                                    >
                                        ver más
                                    </Button>
                                </Grid.Column>
                            ))}
                        </Grid.Row>
                    </Grid>
                </Responsive>

                <Responsive {...Responsive.onlyMobile}>
                    <Grid columns="equal">
                        <Grid.Row>
                            <Grid.Column>
                                <Header
                                    as="h2"
                                    style={{ fontSize: "1.4rem", textTransform: "uppercase" }}
                                    textAlign="left"
                                >
                                    noticias de actualidad automotriz
                                </Header>
                            </Grid.Column>
                        </Grid.Row>
                        {noticias.map((item, index) => (
                            <Grid.Row key={index}>
                                <Grid.Column>
                                    <Header
                                        as="h4"
                                        textAlign="left"
                                        style={{ fontSize: "1.2rem" }}
                                    >
                                        {item.title}
                                    </Header>

                                    <p style={{ fontWeight: 500, margin: 0 }}>
                                        {item.description}
                                    </p>
                                    <Button
                                        as="a"
                                        href={item.link}
                                        target="_blank"
                                        style={{
                                            float: "right",
                                            background: "transparent",
                                            color: "#000", textTransform: "uppercase"
                                        }}
                                    >
                                        ver más
                                    </Button>
                                </Grid.Column>
                            </Grid.Row>
                        ))}
                    </Grid>
                </Responsive>
                <Responsive {...Responsive.onlyTablet}>
                    <Grid columns="equal">
                        <Grid.Row>
                            <Grid.Column>
                                <Header
                                    as="h2"
                                    style={{ fontSize: "1.4rem", textTransform: "uppercase" }}
                                    textAlign="left"
                                >
                                    noticias de actualidad automotriz
                                </Header>
                            </Grid.Column>
                        </Grid.Row>
                        {noticias.map((item, index) => (
                            <Grid.Row key={index}>
                                <Grid.Column>
                                    <Header
                                        as="h4"
                                        textAlign="left"
                                        style={{ fontSize: "1.2rem" }}
                                    >
                                        {item.title}
                                    </Header>

                                    <p style={{ fontWeight: 500, margin: 0 }}>
                                        {item.description}
                                    </p>
                                    <Button
                                        as="a"
                                        href={item.link}
                                        target="_blank"
                                        style={{
                                            float: "right",
                                            background: "transparent",
                                            color: "#000", textTransform: "uppercase"
                                        }}
                                    >
                                        ver más
                                    </Button>
                                </Grid.Column>
                            </Grid.Row>
                        ))}
                    </Grid>
                </Responsive>
            </Container>
        </div>
    );
}
export default NoticiasHome;
