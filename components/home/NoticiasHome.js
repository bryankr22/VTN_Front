import { Header, Container, Grid, Button, Responsive } from "semantic-ui-react";
import { useSelector } from 'react-redux';
import { light, dark } from "../../helpers/colors";

const NoticiasHome = ({ noticias }) => {
    const darkMode = useSelector(({ darkMode }) => darkMode.status);
    const colorText = darkMode === light ? dark : light;

    return (
        <div>
            <Container
                fluid
                style={{
                    padding: "70px 40px",
                    margin: "40px 0",
                    background: darkMode === dark ? dark : "rgb(242, 244, 246)",
                }}
            >
                <Responsive {...Responsive.onlyComputer}>
                    <Grid columns="equal">
                        <Grid.Row>
                            <Grid.Column>
                                <Header
                                    as="h2"
                                    style={{ fontSize: "1.4rem", textTransform: "uppercase", color: colorText }}
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
                                        as="h3"
                                        textAlign="left"
                                        style={{ fontSize: "1.2rem", color: colorText }}
                                    >
                                        {item.title}
                                    </Header>

                                    <p style={{ fontWeight: 500, margin: 0, color: colorText }}>
                                        {item.description}
                                    </p>
                                    <Button
                                        as="a"
                                        href={item.link}
                                        target="_blank"
                                        style={{
                                            float: "right",
                                            background: "transparent",
                                            color: colorText,
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
                                    style={{ fontSize: "1.4rem", textTransform: "uppercase", color: colorText }}
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
                                        as="h3"
                                        textAlign="left"
                                        style={{ fontSize: "1.2rem", color: colorText }}
                                    >
                                        {item.title}
                                    </Header>

                                    <p style={{ fontWeight: 500, margin: 0, color: colorText }}>
                                        {item.description}
                                    </p>
                                    <Button
                                        as="a"
                                        href={item.link}
                                        target="_blank"
                                        style={{
                                            float: "right",
                                            background: "transparent",
                                            color: colorText, textTransform: "uppercase"
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
                                    style={{ fontSize: "1.4rem", textTransform: "uppercase", color: colorText }}
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
                                        as="h3"
                                        textAlign="left"
                                        style={{ fontSize: "1.2rem", color: colorText }}
                                    >
                                        {item.title}
                                    </Header>

                                    <p style={{ fontWeight: 500, margin: 0, color: colorText }}>
                                        {item.description}
                                    </p>
                                    <Button
                                        as="a"
                                        href={item.link}
                                        target="_blank"
                                        style={{
                                            float: "right",
                                            background: "transparent",
                                            color: colorText, textTransform: "uppercase"
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
