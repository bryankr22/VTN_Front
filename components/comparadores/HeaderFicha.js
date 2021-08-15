import React from 'react'
import { Image, Container, Card, Grid, Button, } from "semantic-ui-react";
import { useLocalStorage } from '../../helpers/hooks/useLocalStorage';
import { useSelector, useDispatch } from 'react-redux';
import { removeFicha } from '../../store/comparadorSlice';
export default function HeaderFicha() {
    const compareList = useSelector(({ comparador }) => comparador.fichas);
    const dispatch = useDispatch();
    const pathS3 = "https://d3bmp4azzreq60.cloudfront.net/fit-in/55x55/vendetunave/images/ficha-tecnica/";
    const removeFichaClick = (index) => {
        dispatch(removeFicha(index));
    }
    return (
        <>
            <Container style={{ marginBottom: 10 }}>
              <p>.</p>
            </Container>
            {compareList.length > 0 &&
            <Container fluid 
            style={{ textAlign: "center", margin: 10, overflowX: 'auto', overflowY: 'hidden' }}>
                <Grid style={{ width: 'max-content' }}>
                    <Grid.Column width={16} style={{ marginBottom: 10 }}>
                        <Card.Group itemsPerRow={3}>
                            {compareList.map((item, index) => (
                                <Card key={index} style={{ width: 'auto', marginLeft: 15 }}>
                                    <Card.Content>
                                        <Button
                                            style={{
                                                background: 'transparent',
                                                position: 'absolute',
                                                right: 0,
                                                top: 0,
                                            }}
                                            circular
                                            icon='remove'
                                            onClick={() => removeFichaClick(index)}
                                        />
                                        {item.new_image === 0 || item.new_image === 2 && (
                                            <Image
                                                className="image-compare"
                                                floated='left'
                                                size='mini'
                                                src={pathS3 + item.nameImage + "." + item.extension}
                                                wrapped
                                                ui={false}
                                            />
                                        )}
                                        <Card.Header
                                        style={{
                                            whiteSpace: 'nowrap',
                                            overflow: 'hidden',
                                            textOverflow: 'ellipsis',
                                            paddingLeft: 7,
                                            fontSize: 15,
                                            textAlign: 'left',
                                            marginTop: 14
                                        }}
                                        >
                                            {(item.title.length > 12) ? item.title.substr(0, 12) + '...' : item.title} - {item.year}
                                        </Card.Header>
                                        <Card.Meta style={{ textAlign: 'left', paddingLeft: 63 }}>${new Intl.NumberFormat("de-DE").format(item.price)}{" "} COP</Card.Meta>
                                    </Card.Content>
                                </Card>
                            ))}
                            <Card style={{ width: 'auto', marginLeft: 15, border: 'none', boxShadow: 'none' }}>
                                <Button as="a" href="/comparar-fichas" secondary fluid style={{ margin: 'auto' }}>Comparar</Button>
                            </Card>
                        </Card.Group>
                    </Grid.Column>
                </Grid>
            </Container>
            }
        </>
    )
}
