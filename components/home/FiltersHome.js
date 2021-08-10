import React, {useState} from 'react'
import { Header, Form, Container, Button, Input, Select, Responsive } from "semantic-ui-react";

import axios from 'axios';
import { API_URL, get_modelos } from '../../helpers/constants';

export default function FiltersHome({options}) {
    const FilterPricing = [
        { key: 0, text: "Precio", value: 0 },
        { key: 1, text: "Hasta $10.000.000", value: 1 },
        { key: 2, text: "$10.000.000 a $20.000.000", value: 2 },
        { key: 3, text: "$20.000.000 a $35.000.000", value: 3 },
        { key: 4, text: "$35.000.000 a $50.000.000", value: 4 },
        { key: 5, text: "$50.000.000 a $100.000.000", value: 5 },
        { key: 6, text: "$100.000.000 a $125.000.000", value: 6 },
        { key: 7, text: "$125.000.000 a $150.000.000", value: 7 },
        { key: 8, text: "$150.000.000 a $175.000.000", value: 8 },
        { key: 9, text: "$175.000.000 a $200.000.000", value: 9 },
        { key: 10, text: "$200.000.000 a $250.000.000", value: 10 },
        { key: 11, text: "$250.000.000 a $300.000.000", value: 11 },
        { key: 12, text: "$300.000.000 a $350.000.000", value: 12 },
        { key: 13, text: "$350.000.000 a $400.000.000", value: 13 },
        { key: 14, text: "Más de $400.000.000", value: 14 },
    ];
    const [filters, setFilters] = useState({
        category: 'carros',
        marca_id: '',
        modelo: '',
        modelos: [],
        precio: '',
        anioDesde: '',
        anioHasta: '',
        permuta: false,
        promocion: false
    })
    const changeFilter = (input, value) => {
        setFilters({
            ...filters,
            [input]: value
        })
        /**if(input === 'marca_id'){
            
        }**/
    }
    const onClickFilter = () => {
        var newUrl = new URL(window.location.protocol+"//"+window.location.hostname+":"+window.location.port+"/vehiculos");
        newUrl.searchParams.append('categoria', filters.category);
        console.log(">>>>>",filters.marca_id);
        var marcaObj = options.optionsMarcas.find(element => element.value === filters.marca_id);
        newUrl.searchParams.append('marca', marcaObj.text);
        console.log(">>>>>",marcaObj);
        var modeloObj = filters.modelos.find(element => element.value === filters.modelo);
        newUrl.searchParams.append('modelo', modeloObj.text);
        newUrl.searchParams.append('precio', filters.precio);
        newUrl.searchParams.append('anio', filters.anioDesde+':'+filters.anioHasta);
        if(filters.permuta){
            newUrl.searchParams.append('permuta', filters.permuta);
        }
        if(filters.promocion){
            newUrl.searchParams.append('promocion', filters.promocion);
        }
        console.log(">>>>>>>", newUrl.href)
        //window.location.href = newUrl.href;
    }
    const onChangeMarca = async (value) => {
        const res = await axios.get(API_URL + get_modelos + value);
        let optionsModelos = [{ key: "", value: "", text: "Modelo" }];
        await res.data.modelos.forEach(function (item) {
            optionsModelos.push({
                key: item.id,
                value: item.id,
                text: item.nombre,
            });
        });
        setFilters({
            ...filters,
            modelos: optionsModelos
        })
    }
    return (
        <div>
            <Container
                text
                style={{ textAlign: "center", marginTop: 20, marginBottom: 20 }}
            >
                <Header className="centered" as="h1" style={{ fontSize: "1.4rem", textTransform: "uppercase" }}>
                    ¿qué carro o moto quieres comprar en vende tu nave?
                </Header>
                <Responsive {...Responsive.onlyMobile}>
                    <Form>
                        <Form.Field>
                            <Select
                                search
                                options={options.optionsCategories}
                                defaultValue={filters.category}
                                onChange={(e, { value }) => changeFilter('category', value)}
                                placeholder="Tipo"
                                style={{ borderRadius: 18 }}
                            />
                        </Form.Field>
                        <Form.Field>
                            <label style={{ textAlign: "center", fontSize: 16 }}>
                                Selecciona marca y modelo
                            </label>
                            <Input type="text" action>
                                <Select
                                    search
                                    options={options.optionsMarcas}
                                    onChange={(e, { value }) => changeFilter('marca_id', value)}
                                    fluid
                                    placeholder="Marca"
                                    style={{
                                        borderTopLeftRadius: 18,
                                        borderBottomLeftRadius: 18,
                                        borderTopRightRadius: 0,
                                        borderBottomRightRadius: 0,
                                        borderRightWidth: 0,
                                    }}
                                />
                                <Select
                                    search
                                    id="combo-input-derecha"
                                    options={filters.modelos}
                                    onChange={(e, { value }) => changeFilter('modelo', value)}
                                    fluid
                                    placeholder="Modelo"
                                    style={{
                                        borderTopRightRadius: 18,
                                        borderBottomRightRadius: 18,
                                    }}
                                />
                            </Input>
                        </Form.Field>
                        <Form.Field style={{ width: "100%" }}>
                            <label style={{ textAlign: "center", fontSize: 16 }}>
                                Precios
                            </label>
                            <Select
                                search
                                options={FilterPricing}
                                onChange={(e, { value }) => changeFilter('precio', value)}
                                fluid
                                placeholder="Precio"
                                style={{ borderRadius: 18, marginTop: 10 }}
                            />
                        </Form.Field>
                        <Form.Field>
                            <label style={{ textAlign: "center", fontSize: 16 }}>Año</label>
                            <Input type="text" action>
                                <Select
                                    search
                                    options={options.optionsAniosDesde}
                                    onChange={(e, { value }) => changeFilter('anioDesde', value)}
                                    fluid
                                    placeholder="Desde"
                                    style={{ borderRadius: 18, marginRight: 10 }}
                                />
                                <Select
                                    search
                                    id="combo-input-derecha"
                                    options={options.optionsAniosHasta}
                                    onChange={(e, { value }) => changeFilter('anioHasta', value)}
                                    fluid
                                    placeholder="Hasta"
                                    style={{ borderRadius: 18 }}
                                />
                            </Input>
                        </Form.Field>
                        <Form.Field>
                            <Form.Group id="field-checks">
                                <Form.Checkbox
                                    name="promocion"
                                    label="Promoción"
                                    value={filters.promocion}
                                    onChange={(e) => changeFilter('promocion', !filters.promocion)}
                                />
                                <Form.Checkbox
                                    name="permuta"
                                    label="Permuta"
                                    value={filters.permuta}
                                    onChange={(e) => changeFilter('permuta', !filters.permuta)}
                                />
                            </Form.Group>
                        </Form.Field>
                        <Button  
                        onClick={()=> onClickFilter()}
                        color="blue" type="submit">
                            BUSCAR VEHÍCULO
                        </Button>
                    </Form>
                </Responsive>
                <Responsive {...Responsive.onlyTablet}>
                    <Form>
                        <Form.Field>
                            <Select
                                search
                                options={options.optionsCategories}
                                defaultValue={options.selectCategory}
                                placeholder="Tipo"
                                onChange={(e, { value }) => changeFilter('category', value)}
                                style={{ borderRadius: 18 }}
                            />
                        </Form.Field>
                        <Form.Field>
                            <label style={{ textAlign: "center", fontSize: 16 }}>
                                Selecciona marca y modelo
                            </label>
                            <Input type="text" action>
                                <Select
                                    search
                                    options={options.optionsMarcas}
                                    onChange={(e, { value }) => changeFilter('marca_id', value)}
                                    fluid
                                    placeholder="Marca"
                                    style={{
                                        borderTopLeftRadius: 18,
                                        borderBottomLeftRadius: 18,
                                        borderTopRightRadius: 0,
                                        borderBottomRightRadius: 0,
                                        borderRightWidth: 0,
                                    }}
                                />
                                <Select
                                    search
                                    id="combo-input-derecha"
                                    options={filters.modelos}
                                    onChange={(e, { value }) => changeFilter('modelo', value)}
                                    fluid
                                    placeholder="Modelo"
                                    style={{
                                        borderTopRightRadius: 18,
                                        borderBottomRightRadius: 18,
                                    }}
                                />
                            </Input>
                        </Form.Field>
                        <Form.Field style={{ width: "100%" }}>
                            <label style={{ textAlign: "center", fontSize: 16 }}>
                                Precios
                            </label>
                            <Select
                                search
                                options={FilterPricing}
                                onChange={(e, { value }) => changeFilter('precio', value)}
                                fluid
                                placeholder="Precio"
                                style={{ borderRadius: 18, marginTop: 10 }}
                            />
                        </Form.Field>
                        <Form.Field>
                            <label style={{ textAlign: "center", fontSize: 16 }}>Año</label>
                            <Input type="text" action>
                                <Select
                                    search
                                    options={options.optionsAniosDesde}
                                    onChange={(e, { value }) => changeFilter('anioDesde', value)}
                                    fluid
                                    placeholder="Desde"
                                    style={{ borderRadius: 18, marginRight: 10 }}
                                />
                                <Select
                                    search
                                    id="combo-input-derecha"
                                    options={options.optionsAniosHasta}
                                    onChange={(e, { value }) => changeFilter('anioHasta', value)}
                                    fluid
                                    placeholder="Hasta"
                                    style={{ borderRadius: 18 }}
                                />
                            </Input>
                        </Form.Field>
                        <Form.Field>
                            <Form.Group id="field-checks">
                                <Form.Checkbox
                                    name="promocion"
                                    label="Promoción"
                                    value={filters.promocion}
                                    onChange={(e) => changeFilter('promocion', !filters.promocion)}
                                />
                                <Form.Checkbox
                                    name="permuta"
                                    label="Permuta"
                                    value={filters.permuta}
                                    onChange={(e) => changeFilter('permuta', !filters.permuta)}
                                />
                            </Form.Group>
                        </Form.Field>
                        <Button  
                        onClick={()=> onClickFilter()}
                        color="blue" type="submit">
                            BUSCAR VEHÍCULO
                        </Button>
                    </Form>
                </Responsive>
                <Responsive {...Responsive.onlyComputer}>
                    <Form style={{ marginTop: 50, marginBottom: 50 }}>
                        <Form.Group>
                            <Form.Field>
                                <label style={{ textAlign: "center", fontSize: 16, textTransform: "uppercase" }}>
                                    tipo
                                </label>
                                <Select
                                    search
                                    options={options.optionsCategories}
                                    defaultValue={filters.category}
                                    onChange={(e, { value }) => changeFilter('category', value)}
                                    placeholder="Tipo"
                                    style={{ borderRadius: 18 }}
                                />
                            </Form.Field>
                            <Form.Field style={{ width: "100%" }}>
                                <label style={{ textAlign: "center", fontSize: 16, textTransform: "uppercase" }}>
                                    selecciona marca y modelo
                                </label>
                                <Input type="text" action>
                                    <Select
                                        search
                                        options={options.optionsMarcas}
                                        onChange={(e, { value }) => {changeFilter('marca_id', value); onChangeMarca(value)}}
                                        fluid
                                        placeholder="Marca"
                                        style={{ borderRadius: 18, marginRight: 10 }}
                                    />
                                    <Select
                                        search
                                        id="combo-input-derecha"
                                        options={filters.modelos}
                                        onChange={(e, { value }) => changeFilter('modelo', value)}
                                        fluid
                                        placeholder="Modelo"
                                        style={{ borderRadius: 18 }}
                                    />
                                </Input>
                            </Form.Field>
                        </Form.Group>
                        <Form.Group style={{ marginTop: 40, marginBottom: 40 }}>
                            <Form.Field style={{ width: "100%" }}>
                                <label style={{ textAlign: "center", fontSize: 16, textTransform: "uppercase" }}>
                                    precios
                                </label>
                                <Select
                                    search
                                    options={FilterPricing}
                                    onChange={(e, { value }) => changeFilter('precio', value)}
                                    fluid
                                    placeholder="Precio"
                                    style={{ borderRadius: 18 }}
                                />
                            </Form.Field>
                            <Form.Field style={{ width: "74%" }}>
                                <label style={{ textAlign: "center", fontSize: 16, textTransform: "uppercase" }}>
                                    año
                                </label>
                                <Input type="text" action>
                                    <Select
                                        search
                                        options={options.optionsAniosDesde}
                                        onChange={(e, { value }) => changeFilter('anioDesde', value)}
                                        fluid
                                        placeholder="Desde"
                                        style={{ borderRadius: 18, marginRight: 10 }}
                                    />
                                    <Select
                                        search
                                        id="combo-input-derecha"
                                        options={options.optionsAniosHasta}
                                        onChange={(e, { value }) => changeFilter('anioHasta', value)}
                                        fluid
                                        placeholder="Hasta"
                                        style={{ borderRadius: 18 }}
                                    />
                                </Input>
                            </Form.Field>
                        </Form.Group>
                        <Form.Field>
                            <Form.Group id="field-checks">
                                <Form.Checkbox
                                    name="promocion"
                                    label="Promoción"
                                    value={filters.promocion}
                                    onChange={(e) => changeFilter('promocion', !filters.promocion)}
                                />
                                <Form.Checkbox
                                    name="permuta"
                                    label="Permuta"
                                    value={filters.permuta}
                                    onChange={(e) => changeFilter('permuta', !filters.permuta)}
                                />
                            </Form.Group>
                        </Form.Field>
                        <Button  
                        onClick={()=> onClickFilter()}
                        color="blue" style={{ textTransform: "uppercase" }}>
                            buscar vehículo
                        </Button>
                    </Form>
                </Responsive>
            </Container>
        </div>
    )
}
