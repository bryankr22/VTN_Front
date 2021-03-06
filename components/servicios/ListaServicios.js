import React from 'react';
import { useSelector } from 'react-redux';
import { Container, Button, Item, Pagination } from 'semantic-ui-react'
import { dark, light } from '../../helpers/colors';
export default function ListaServicios({ servicios_res, pagina, total }) {
    const insertParam = (key, value) => {
        key = encodeURIComponent(key);
        value = encodeURIComponent(value);
        var kvp = document.location.search.substr(1).split('&');
        let i = 0;
        for (; i < kvp.length; i++) {
            if (kvp[i].startsWith(key + '=')) {
                let pair = kvp[i].split('=');
                pair[1] = value;
                kvp[i] = pair.join('=');
                break;
            }
        }
        if (i >= kvp.length) {
            kvp[kvp.length] = [key, value].join('=');
        }
        let params = kvp.join('&');
        document.location.search = params;
    }
    const handlePaginationChange = (e, { activePage }) => {
        insertParam('page', activePage);
    }

    const darkMode = useSelector(({ darkMode }) => darkMode.status);
    const colorText = darkMode === light ? undefined : light;
    return (
        <div>
            <Item.Group divided>
                {(servicios_res).map((item, index) =>
                    <Item key={index}>
                        <Item.Image size='small' src={item.image} alt={item.nombre} />
                        <Item.Content>
                            <Item.Header><h2 style={{ color: colorText }} className="fnt-size-inherit">{item.nombre}</h2></Item.Header>
                            <Item.Meta><h3 style={{ color: colorText }} className="fnt-size-inherit">{item.descripcion}</h3></Item.Meta>
                            <Item.Meta><h3 style={{ color: colorText }} className="fnt-size-inherit">{item.direccion}</h3></Item.Meta>
                            <Item.Meta><h3 style={{ color: colorText }} className="fnt-size-inherit">{item.telefono}</h3></Item.Meta>
                            <Item.Meta><h3 style={{ color: colorText }} className="fnt-size-inherit">{item.servicio}</h3></Item.Meta>
                            <Item.Extra style={{ float: 'right', marginTop: '-11%', width: '20%' }}>
                                <Button
                                    onClick={() => { window.open(item.url, '_blank') }}
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
            {Math.ceil((total) / 10) > 1 &&
                <Container fluid style={{ textAlign: 'center', margin: 25 }}>
                    {darkMode === dark &&
                        <style>{`
                            .ui.secondary.pointing.menu .active.item {
                                color: ${colorText}
                            }
                            .ui.secondary.pointing.menu .item {
                                border-color: ${colorText};
                                color: ${colorText}
                            }
                        `}</style>
                    }
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
