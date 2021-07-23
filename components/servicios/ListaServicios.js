import React from 'react'
import { Container, Header, Select, Button, Responsive, Grid, Item, Segment, Pagination } from 'semantic-ui-react'
export default function ListaServicios({servicios_res}) {
    const handlePaginationChange = () => {}
    return (
        <div>
            <Item.Group divided>
                {(servicios_res).map((item, index) =>
                    <Item key={index}>
                        <Item.Image size='small' src={item.image} />
                        <Item.Content>
                            <Item.Header>{item.nombre}</Item.Header>
                            <Item.Meta>{item.descripcion}</Item.Meta>
                            <Item.Meta>{item.direccion}</Item.Meta>
                            <Item.Meta>{item.telefono}</Item.Meta>
                            <Item.Meta>{item.servicio}</Item.Meta>
                            <Item.Extra style={{ float: 'right', marginTop: '-11%', width: '20%' }}>
                                <Button
                                    onClick={() => { window.open(item.url, '_blank') }}
                                    secondary
                                    floated='right'
                                >
                                    VER
                            </Button>
                            </Item.Extra>
                        </Item.Content>
                    </Item>
                )}
            </Item.Group>
            {/**Math.ceil((this.state.servicesTotal) / 10) > 1 &&    
            **/}
            <Container fluid style={{ textAlign: 'center', margin: 25 }}>
                <Pagination
                    pointing
                    secondary
                    boundaryRange={0}
                    activePage={1}
                    ellipsisItem={null}
                    firstItem={null}
                    lastItem={null}
                    siblingRange={2}
                    onPageChange={handlePaginationChange}
                    totalPages={5}
                />
            </Container>
        </div>
    )
}
