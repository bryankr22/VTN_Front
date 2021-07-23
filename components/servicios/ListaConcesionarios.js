import React from 'react'
import { Container, Header, Select, Button, Responsive, Grid, Item, Segment, Pagination } from 'semantic-ui-react'
export default function ListaConcesionarios({concesionarios_res}) {
    return (
        <div>
            <Item.Group divided>
                {(concesionarios_res).map((item, index) =>
                <Item key={index}>
                    <Item.Image size='small' src={item.image} />
                    <Item.Content>
                        <Item.Header>{item.name}</Item.Header>
                        <Item.Meta>{item.description}</Item.Meta>
                        <Item.Meta>{item.address}</Item.Meta>
                        <Item.Meta>Tel: {item.phone}</Item.Meta>
                        <Item.Extra style={{ float: 'right', marginTop: '-11%', width: '20%' }}>
                            <Button
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
                <Container fluid style={{ textAlign: 'center', margin: 25 }}>
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
                        totalPages={Math.ceil((this.state.servicesTotal) / 10)}
                    />
                </Container>
            **/}
        </div>
    )
}
