import { Image, Container, Card, Grid, Button, } from "semantic-ui-react";
import { useSelector, useDispatch } from 'react-redux';
import { removeVehiculo } from '../../store/comparadorSlice';
export default function HeaderVehiculo() {
    const vehiculosList = useSelector(({ comparador }) => comparador.vehiculos);
    const dispatch = useDispatch();
    const pathS3 = "https://vendetunave.s3.amazonaws.com/vendetunave/images/thumbnails/";
    const removeVehiculoClick = (index) => {
        dispatch(removeVehiculo(index));
    }
    return (
        <>
            <Container style={{ marginBottom: 10 }}>
                <p>&nbsp;</p>
            </Container>
            {vehiculosList.length > 0 &&
                <Container fluid
                    style={{ textAlign: "center", margin: 10, overflowX: 'auto', overflowY: 'hidden' }}>
                    <Grid style={{ width: 'max-content' }}>
                        <Grid.Column width={16} style={{ marginBottom: 10 }}>
                            <Card.Group itemsPerRow={3}>
                                {vehiculosList.map((item, index) => (
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
                                                onClick={() => removeVehiculoClick(index)}
                                            />
                                            {item.new_image === 0 || item.new_image === 2 && (
                                                <Image
                                                    className="image-compare"
                                                    floated='left'
                                                    size='mini'
                                                    src={pathS3 + item.nameImage + "300x300.webp"}
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
                                            <Card.Meta style={{ textAlign: 'left', paddingLeft: 63 }}>${new Intl.NumberFormat("de-DE").format(item.precio)}{" "} COP</Card.Meta>
                                        </Card.Content>
                                    </Card>
                                ))}
                                <Card style={{ width: 'auto', marginLeft: 15, border: 'none', boxShadow: 'none' }}>
                                    <Button as="a" href="/comparar-vehiculos" secondary fluid style={{ margin: 'auto' }}>Comparar</Button>
                                </Card>
                            </Card.Group>
                        </Grid.Column>
                    </Grid>
                </Container>
            }
        </>
    )
}
