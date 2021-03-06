import React from 'react';
import { useSelector } from 'react-redux';
import { Button, Item } from 'semantic-ui-react';
import { light } from '../../helpers/colors';

export default function ListaConcesionarios({ concesionarios_res }) {

    const darkMode = useSelector(({ darkMode }) => darkMode.status);
    const colorText = darkMode === light ? undefined : light;
    return (
        <div>
            <Item.Group divided>
                {(concesionarios_res).map((item, index) =>
                    <Item key={index}>
                        <Item.Image size='small' src={item.image} alt={item.name} />
                        <Item.Content>
                            <Item.Header style={{ color: colorText }} as="h2" className="fnt-weight-bold">{item.name}</Item.Header>
                            <Item.Meta style={{ color: colorText }} as="h3" >{item.description}</Item.Meta>
                            <Item.Meta style={{ color: colorText }} as="h3" >{item.address}</Item.Meta>
                            <Item.Meta style={{ color: colorText }} as="h3" >Tel: {item.phone}</Item.Meta>
                            <Item.Extra style={{ float: 'right', marginTop: '-11%', width: '20%' }}>
                                <Button
                                    onClick={() => { window.open(`http://maps.google.com/maps?q=${item.latitude},${item.longitude}`, '_blank') }}
                                    secondary={darkMode === light}
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
