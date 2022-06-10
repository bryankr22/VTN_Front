import { useState } from 'react'
import { Header, Form, Container, Button, Input, Select, Responsive } from "semantic-ui-react";
import { useSelector } from 'react-redux';

import axios from 'axios';
import { API_URL, GET_BRANDS, get_modelos } from '../../helpers/constants';
import { dark, light } from '../../helpers/colors';

const FilterPricing = [
    { key: 0, text: "Precio", value: 0 },
    { key: 1, text: "Hasta $10.000.000", value: '0:10000000' },
    { key: 2, text: "$10.000.000 a $20.000.000", value: '10000000:20000000' },
    { key: 3, text: "$20.000.000 a $35.000.000", value: '20000000:35000000' },
    { key: 4, text: "$35.000.000 a $50.000.000", value: '35000000:50000000' },
    { key: 5, text: "$50.000.000 a $100.000.000", value: '50000000:100000000' },
    { key: 6, text: "$100.000.000 a $125.000.000", value: '100000000:125000000' },
    { key: 7, text: "$125.000.000 a $150.000.000", value: '125000000:150000000' },
    { key: 8, text: "$150.000.000 a $175.000.000", value: '150000000:175000000' },
    { key: 9, text: "$175.000.000 a $200.000.000", value: '175000000:200000000' },
    { key: 10, text: "$200.000.000 a $250.000.000", value: '200000000:250000000' },
    { key: 11, text: "$250.000.000 a $300.000.000", value: '250000000:300000000' },
    { key: 12, text: "$300.000.000 a $350.000.000", value: '300000000:350000000' },
    { key: 13, text: "$350.000.000 a $400.000.000", value: '350000000:400000000' },
    { key: 14, text: "Más de $400.000.000", value: '400000000:500000000' },
];

export default function FiltersHome({ options: optsProp }) {

    const [options, setOptions] = useState(() => optsProp);

    const [filters, setFilters] = useState({
        category: 'carros',
        marca_id: '',
        modelo: '',
        modelos: [],
        precio: '',
        anioDesde: '',
        anioHasta: '',
        permuta: false,
        promocion: false,
        blindaje: false,
    })
    const [marca, setMarca] = useState('');
    const changeFilter = (input, value) => {
        setFilters({
            ...filters,
            [input]: value
        })
        if (input === 'marca_id') {
            onChangeMarca(value);
            setMarca(value);
        }
    }
    const onClickFilter = () => {
        var newUrl = new URL(window.location.protocol + "//" + window.location.hostname + ":" + window.location.port + "/vehiculos");
        newUrl.searchParams.append('categoria', filters.category);
        //Filtros
        if (marca) {
            var marcaObj = options.optionsMarcas.find(element => element.value === marca);
            newUrl.searchParams.append('marca', marcaObj.text);
        }
        if (filters.modelo) {
            var modeloObj = filters.modelos.find(element => element.value === filters.modelo);
            newUrl.searchParams.append('modelo', modeloObj.text);
        }
        //
        if (filters.precio) {
            newUrl.searchParams.append('precio', filters.precio);
        }
        if (filters.anioDesde) {
            newUrl.searchParams.append('anio', filters.anioDesde + ':' + filters.anioHasta);
        }
        if (filters.permuta) {
            newUrl.searchParams.append('permuta', filters.permuta);
        }
        if (filters.promocion) {
            newUrl.searchParams.append('promocion', filters.promocion);
        }
        if (filters.blindaje) {
            newUrl.searchParams.append('blindaje', filters.blindaje);
        }
        window.location.href = newUrl.href;
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

    const handleChangeType = async (e, { value }) => {
        const { key } = options.optionsCategories?.find?.(item => item.value === value) || {};
        const res = await axios.get(GET_BRANDS.replace(':id', key)).catch(() => []);
        const optionsMarcas = [{ key: "", value: "", text: "Marca" }];
        await res?.data?.marcas?.forEach?.(function (item) {
            optionsMarcas.push({
                key: item.id,
                value: item.id,
                text: item.nombre,
            });
        });
        changeFilter('category', value)
        setOptions(prev => ({ ...prev, optionsMarcas }))
    }

    const darkMode = useSelector(({ darkMode }) => darkMode.status);
    const colorText = darkMode === light ? dark : light;

    return (
        <div>
            <Container
                text
                style={{ textAlign: "center", marginTop: 20, marginBottom: 20 }}
            >
                <style>
                    {`
                        .ui.checkbox>label {
                            color: ${colorText}
                        }
                        .ui.checkbox label:hover, .ui.checkbox+label:hover {
                            color: ${colorText}
                        }
                    `}
                </style>
                <Header className="centered" as="h1" style={{ fontSize: "1.4rem", textTransform: "uppercase", color: colorText }}>
                    ¿qué carro o moto quieres comprar en vende tu nave?
                </Header>
                <Responsive {...Responsive.onlyMobile}>
                    <Form>
                        <Form.Field>
                            <Select
                                search
                                options={options.optionsCategories}
                                defaultValue={filters.category}
                                onChange={handleChangeType}
                                placeholder="Tipo"
                                style={{ borderRadius: 18 }}
                            />
                        </Form.Field>
                        <Form.Field>
                            <label style={{ textAlign: "center", fontSize: 16, color: colorText }}>
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
                            <label style={{ textAlign: "center", fontSize: 16, color: colorText }}>
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
                            <label style={{ textAlign: "center", fontSize: 16, color: colorText }}>Año</label>
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
                                    name="blindaje"
                                    label="Blindaje"
                                    value={filters.blindaje}
                                    onChange={(e) => changeFilter('blindaje', !filters.blindaje)}
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
                            onClick={() => onClickFilter()}
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
                                onChange={handleChangeType}
                                style={{ borderRadius: 18 }}
                            />
                        </Form.Field>
                        <Form.Field>
                            <label style={{ textAlign: "center", fontSize: 16, color: colorText }}>
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
                            <label style={{ textAlign: "center", fontSize: 16, color: colorText }}>
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
                            <label style={{ textAlign: "center", fontSize: 16, color: colorText }}>Año</label>
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
                                    name="blindaje"
                                    label="Blindaje"
                                    value={filters.blindaje}
                                    onChange={(e) => changeFilter('blindaje', !filters.blindaje)}
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
                            onClick={() => onClickFilter()}
                            color="blue" type="submit">
                            BUSCAR VEHÍCULO
                        </Button>
                    </Form>
                </Responsive>
                <Responsive {...Responsive.onlyComputer}>
                    <Form style={{ marginTop: 50, marginBottom: 50 }}>
                        <Form.Group>
                            <Form.Field>
                                <label style={{ textAlign: "center", fontSize: 16, textTransform: "uppercase", color: colorText }}>
                                    tipo
                                </label>
                                <Select
                                    search
                                    options={options.optionsCategories}
                                    defaultValue={filters.category}
                                    onChange={handleChangeType}
                                    placeholder="Tipo"
                                    style={{ borderRadius: 18 }}
                                />
                            </Form.Field>
                            <Form.Field style={{ width: "100%" }}>
                                <label style={{ textAlign: "center", fontSize: 16, textTransform: "uppercase", color: colorText }}>
                                    selecciona marca y modelo
                                </label>
                                <Input type="text" action>
                                    <Select
                                        search
                                        options={options.optionsMarcas}
                                        onChange={(e, { value }) => changeFilter('marca_id', value)}
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
                                <label style={{ textAlign: "center", fontSize: 16, textTransform: "uppercase", color: colorText }}>
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
                                <label style={{ textAlign: "center", fontSize: 16, textTransform: "uppercase", color: colorText }}>
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
                                    name="blindaje"
                                    label="Blindaje"
                                    value={filters.blindaje}
                                    onChange={(e) => changeFilter('blindaje', !filters.blindaje)}
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
                            onClick={() => onClickFilter()}
                            color="blue" style={{ textTransform: "uppercase" }}>
                            buscar vehículo
                        </Button>
                    </Form>
                </Responsive>
            </Container>
        </div>
    )
}
