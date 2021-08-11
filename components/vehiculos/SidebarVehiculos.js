import React, {useState} from 'react'
import { Container, Input, List, Modal, Grid, Checkbox, Header, Button, Label, Icon } from "semantic-ui-react";
import ActiveTagsVehiculos from './ActiveTagsVehiculos';
import ModalFiltersDesk from './modals/ModalFiltersDesk';
export default function SidebarVehiculos({ params, contadores, vehiculos }) {
    const [filters, setFilters] = useState({
        min_precio: 0,
        max_precio: 0,
        min_km: 0,
        max_km: 0
    })
    const title_page = (slug) => {
        switch (slug) {
            case 'motos':
                return 'Motos'
            case 'camiones':
                return 'Camiones'
            case 'carros_coleccion':
                return 'Carros de coleccion'
            case 'otros':
                return 'Otros'
            case 'accesorios':
                return 'Accesorios'
            default:
                return 'Carros y camionetas'
        }
    }
    const mapping_contador = (contador) => {
        var mapItems = Object.keys(contador).map((item, index) => {
            return {
                label: item,
                qty: index
            }
        });
        var size = 5;
        var sliceItems = mapItems.slice(0, size)
        return sliceItems;
    }
    const kilometraje_filter = [
        { text: "De 0 a 5.000", slug: '0:5000' },
        { text: "De 5.000 a 10.000", slug: '5000:10000' },
        { text: "De 10.000 a 20.000", slug: '10000:20000' },
        { text: "De 20.000 a 30.000", slug: '20000:30000' },
        { text: "De 30.000 a 45.000", slug: '30000:45000' },
    ];
    const precios_filter = [
        { text: "Hasta $10.000.000", slug: '0:10000000' },
        { text: "$10.000.000 a $20.000.000", slug: '10000000:20000000' },
        { text: "$20.000.000 a $35.000.000", slug: '20000000:35000000' },
        { text: "$35.000.000 a $50.000.000", slug: '35000000:50000000' },
        { text: "$50.000.000 a $100.000.000", slug: '50000000:100000000' },
    ];
    const categorias_filter = [
        { text: "CARROS Y CAMIONETAS", slug: 'carros' },
        { text: "CAMIONES", slug: 'camiones' },
        { text: "CARROS DE COLECCION", slug: 'carros_coleccion' },
        { text: "MOTOS", slug: 'motos' },
        { text: "OTROS", slug: 'otros' },
    ];
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
    const setInputVal = (input, value) => {
        setFilters({
            ...filters,
            [input]: value
        })
    }
    const setKilometraje = () => {
        //console.log(">>>>>", filters);
        insertParam('kilometraje', filters.min_km+':'+filters.max_km);
    }
    const setPrice = () => {
        insertParam('precio', filters.min_precio+':'+filters.max_precio);
    }
    const [modalAll, setModalAll] = useState(false);
    const [tituloModal, setTituloModal] = useState('');
    const [listadoModal, setListadoModal] = useState([]);
    const openModal = (titulo, listado) => {
        setTituloModal(titulo);
        var mapItems = Object.keys(listado).map((item, index) => {
            return {
                label: item,
                qty: index
            }
        });
        setListadoModal(mapItems);
        setModalAll(true);
    }
    return (
        <Grid.Column style={{ paddingLeft: "3%" }} width={3}>
            <Header style={{ margin: 0 }} as="h3">
                {title_page(params.categoria)}
            </Header>
            <Header style={{ marginTop: 15 }} as="h3">
               { contadores.total_records } resultados
            </Header>
            <Container>
                <ActiveTagsVehiculos tags={params}/>
            </Container>
            <Container style={{ padding: "20px 20px" }}>
                { !params.ubicacion && ( 
                <List link>
                    <List.Item>
                        <List.Content>
                            <List.Header>
                                <Header as="h5">Ubicaciones</Header>
                            </List.Header>
                            <List.List style={{ paddingLeft: 15 }}>
                                {mapping_contador(contadores.ubicacion).map((item, index) => (
                                    <List.Item 
                                    key={index}
                                    as="a"
                                    onClick={() => insertParam('ubicacion', item.label) }>
                                        {item.label}
                                    </List.Item>
                                )
                                )}
                                <List.Item 
                                as="a"
                                onClick={() => openModal('Ubicaciones', contadores.ubicacion)}>
                                    Ver Todos
                                </List.Item>
                            </List.List>
                        </List.Content>
                    </List.Item>
                </List>
                )}
                { !params.categoria && ( 
                <List link>
                    <List.Item>
                        <List.Content>
                            <List.Header>
                                <Header as="h5">Categorias</Header>
                            </List.Header>
                            <List.List style={{ paddingLeft: 15 }}>
                                {categorias_filter.map((item, index) => (
                                    <List.Item 
                                    key={index}
                                    as="a">
                                        {item.text}
                                    </List.Item>
                                )
                                )}
                            </List.List>
                        </List.Content>
                    </List.Item>
                </List>
                )}
                { params.marca && !params.modelo && ( 
                <List link>
                    <List.Item>
                        <List.Content>
                            <List.Header>
                                <Header as="h5">Modelos</Header>
                            </List.Header>
                            <List.List style={{ paddingLeft: 15 }}>
                                {mapping_contador(contadores.modelos).map((item, index) => (
                                    <List.Item 
                                    key={index}
                                    as="a"
                                    onClick={() => insertParam('modelo', item.label) }>
                                        {item.label}
                                    </List.Item>
                                )
                                )}
                                <List.Item 
                                as="a"
                                onClick={() => openModal('Modelos', contadores.modelos)}>
                                    Ver Todos
                                </List.Item>
                            </List.List>
                        </List.Content>
                    </List.Item>
                </List>
                )}
                { !params.marca && ( 
                <List link>
                    <List.Item>
                        <List.Content>
                            <List.Header>
                                <Header as="h5">Marcas</Header>
                            </List.Header>
                            <List.List style={{ paddingLeft: 15 }}>
                                {mapping_contador(contadores.marcas).map((item, index) => (
                                    <List.Item 
                                    key={index}
                                    as="a"
                                    onClick={() => insertParam('marca', item.label) }>
                                        {item.label}
                                    </List.Item>
                                )
                                )}
                                <List.Item 
                                as="a"
                                onClick={() => openModal('Marcas', contadores.marcas)}>
                                    Ver Todos
                                </List.Item>
                            </List.List>
                        </List.Content>
                    </List.Item>
                </List>
                )}
                { !params.combustible && (
                <List link>
                    <List.Item>
                        <List.Content>
                            <List.Header>
                                <Header as="h5">Tipo de Motor</Header>
                            </List.Header>
                            <List.List style={{ paddingLeft: 15 }}>
                                {mapping_contador(contadores.combustible).map((item, index) => (
                                    <List.Item 
                                    key={index}
                                    as="a"
                                    onClick={() => insertParam('combustible', item.label) }>
                                        {item.label}
                                    </List.Item>
                                )
                                )}
                            </List.List>
                        </List.Content>
                    </List.Item>
                </List>
                )}
                { !params.ano && (
                <List link>
                    <List.Item>
                        <List.Content>
                            <List.Header>
                                <Header as="h5">Año</Header>
                            </List.Header>
                            <List.List style={{ paddingLeft: 15 }}>
                                {mapping_contador(contadores.anios).map((item, index) => (
                                    <List.Item 
                                    key={index}
                                    as="a"
                                    onClick={() => insertParam('ano', item.label) }>
                                        {item.label}
                                    </List.Item>
                                )
                                )}
                                <List.Item 
                                as="a"
                                onClick={() => openModal('Año', contadores.anios)}
                                >
                                    Ver Todos
                                </List.Item>
                            </List.List>
                        </List.Content>
                    </List.Item>
                </List>
                )}
                { !params.estado && (
                <List link>
                    <List.Item>
                        <List.Content>
                            <List.Header>
                                <Header as="h5">Estado</Header>
                            </List.Header>
                            <List.List style={{ paddingLeft: 15 }}>
                                <List.Item
                                    as="a"
                                    onClick={() => insertParam('estado', 'Nuevo') }
                                >
                                    Nuevo
                                </List.Item>
                                <List.Item
                                    as="a"
                                    onClick={() => insertParam('estado', 'Usado') }
                                >
                                    Usado
                                </List.Item>
                            </List.List>
                        </List.Content>
                    </List.Item>
                </List>
                )}
                { !params.transmision && (
                <List link>
                    <List.Item>
                        <List.Content>
                            <List.Header>
                                <Header as="h5">Transmision</Header>
                            </List.Header>
                            <List.List style={{ paddingLeft: 15 }}>
                                {mapping_contador(contadores.caja).map((item, index) => (
                                    <List.Item 
                                    key={index}
                                    as="a"
                                    onClick={() => insertParam('transmision', item.label) }>
                                        {item.label}
                                    </List.Item>
                                )
                                )}
                            </List.List>
                        </List.Content>
                    </List.Item>
                </List>
                )}
                <Checkbox
                    name="promocion"
                    label="Promoción"
                    defaultValue={params.promocion}
                    onChange={({value}) => insertParam('promocion', !value) }
                />
                <Checkbox
                    name="permuta"
                    label="Permuta"
                    defaultValue={params.permuta}
                    onChange={({value}) => insertParam('permuta', !value) }
                />
                <Checkbox
                    name="blindaje"
                    label="Blindaje"
                    defaultValue={params.blindaje}
                    onChange={({value}) => insertParam('blindaje', !value) }
                />
                { !params.kilometraje && (<>
                <List link style={{ marginBottom: 0 }}>
                    <List.Item style={{ marginBottom: 0 }}>
                        <List.Content>
                            <List.Header>
                                <Header as="h5">Kilometraje</Header>
                            </List.Header>
                            <List.List>
                                {kilometraje_filter.map((item, index) => (
                                    <List.Item 
                                    key={index}
                                    as="a"
                                    onClick={() => insertParam('kilometraje', item.slug) }>
                                        {item.text}
                                    </List.Item>
                                )
                                )}
                            </List.List>
                        </List.Content>
                    </List.Item>
                </List>
                <Grid id="grid-range-km" style={{ marginBottom: 8 }}>
                    <Grid.Column width={6}>
                        <Input
                            type="number"
                            fluid
                            defaultValue={0}
                            placeholder="Mínimo"
                            onChange={(e, {value}) => setInputVal('min_km', value)}
                        />
                    </Grid.Column>
                    <Grid.Column
                        width={1}
                        style={{ textAlign: "center", marginTop: 3, fontSize: 16 }}
                    >
                        -
                    </Grid.Column>
                    <Grid.Column width={6}>
                        <Input
                            type="number"
                            fluid
                            defaultValue={0}
                            placeholder="Máximo"
                            onChange={(e, {value}) => setInputVal('max_km', value)}
                        />
                    </Grid.Column>
                    <Grid.Column width={3}>
                        <Button
                            style={{ marginLeft: 6 }}
                            circular
                            icon="angle right"
                            onClick={()=> setKilometraje()}
                        />
                    </Grid.Column>
                </Grid>
                </>)}
                { !params.precio && (<>
                <List link style={{ marginBottom: 0 }}>
                    <List.Item style={{ marginBottom: 0 }}>
                        <List.Content>
                            <List.Header>
                                <Header as="h5">Precio</Header>
                            </List.Header>
                            <List.List>
                                {precios_filter.map((item, index) => (
                                    <List.Item 
                                    key={index}
                                    as="a"
                                    onClick={() => insertParam('precio', item.slug) }>
                                        {item.text}
                                    </List.Item>
                                )
                                )}
                            </List.List>
                        </List.Content>
                    </List.Item>
                </List>
                <Grid id="grid-range-km" style={{ marginBottom: 8 }}>
                    <Grid.Column width={6}>
                        <Input
                            type="number"
                            fluid
                            defaultValue={0}
                            placeholder="Mínimo"
                            onChange={(e, {value}) => setInputVal('min_precio', value)}
                        />
                    </Grid.Column>
                    <Grid.Column
                        width={1}
                        style={{ textAlign: "center", marginTop: 3, fontSize: 16 }}
                    >
                        -
                    </Grid.Column>
                    <Grid.Column width={6}>
                        <Input
                            type="number"
                            fluid
                            defaultValue={0}
                            placeholder="Máximo"
                            onChange={(e, {value}) => setInputVal('max_precio', value)}
                        />
                    </Grid.Column>
                    <Grid.Column width={3}>
                        <Button
                            style={{ marginLeft: 6 }}
                            circular
                            icon="angle right"
                            onClick={()=> setPrice()}
                        />
                    </Grid.Column>
                </Grid>
                </>)}
            </Container>
            <ModalFiltersDesk
            showModal={modalAll} 
            onClose={() => setModalAll(!modalAll)} 
            titulo={tituloModal} 
            listado={listadoModal} />
        </Grid.Column>
    )
}
