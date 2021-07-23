import React from 'react'
import { Container, Header, Select, Button, Responsive, Grid, Item, Segment, Pagination } from 'semantic-ui-react'
export default function ListaServicios({servicios_res, pagina, total}) {
    const insertParam = (key, value) => {
        key = encodeURIComponent(key);
        value = encodeURIComponent(value);
        var kvp = document.location.search.substr(1).split('&');
        let i=0;
        for(; i<kvp.length; i++){
            if (kvp[i].startsWith(key + '=')) {
                let pair = kvp[i].split('=');
                pair[1] = value;
                kvp[i] = pair.join('=');
                break;
            }
        }
        if(i >= kvp.length){
            kvp[kvp.length] = [key,value].join('=');
        }
        let params = kvp.join('&');
        document.location.search = params;
    }
    const handlePaginationChange = (e, { activePage }) => {
        insertParam('page', activePage);
    }
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
            {Math.ceil((total) / 10) > 1 && 
                <Container fluid style={{ textAlign: 'center', margin: 25 }}>
                    <Pagination
                        pointing
                        secondary
                        boundaryRange={0}
                        activePage={pagina}
                        ellipsisItem={null}
                        firstItem={null}
                        lastItem={null}
                        siblingRange={2}
                        onPageChange={handlePaginationChange}
                        totalPages={Math.ceil(total / 20)}
                    />
                </Container>   
            }
            
        </div>
    )
}
