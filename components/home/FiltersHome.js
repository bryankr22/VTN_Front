import React, {useState} from 'react'
import { Header, Form, Container, Button, Input, Select, Responsive } from "semantic-ui-react";
export default function FiltersHome({options}) {
    //console.log(">>>>>", options);
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
        category: '',
        marca: '',
        modelo: '',
        precio: '',
        anioDesde: '',
        anioHasta: ''
    })
    const changeFilter = (input, value) => {
        setFilters({
            ...filters,
            [input]: value
        })
    }
    const onClickFilter = () => {
        var newUrl = new URL(window.location.protocol+"//"+window.location.hostname+":"+window.location.port+"/vehiculos");
        newUrl.searchParams.append('categoria', filters.category);
        newUrl.searchParams.append('marca', filters.marca);
        newUrl.searchParams.append('modelo', filters.modelo);
        newUrl.searchParams.append('precio', filters.precio);
        newUrl.searchParams.append('anioDesde', filters.anioDesde);
        newUrl.searchParams.append('anioHasta', filters.anioHasta);
        window.location.href = newUrl.href;
        //console.log(">>>>>newurl", newUrl);
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
                                defaultValue={options.selectCategory}
                                onChange={() => changeFilter('category', e.target.value)}
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
                                    options={options.optionsModelos}
                                    
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
                                    
                                    fluid
                                    placeholder="Desde"
                                    style={{ borderRadius: 18, marginRight: 10 }}
                                />
                                <Select
                                    search
                                    id="combo-input-derecha"
                                    options={options.optionsAniosHasta}
                                    
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
                                />
                                <Form.Checkbox
                                    name="permuta"
                                    
                                    label="Permuta"
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
                                    options={options.optionsModelos}
                                    
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
                                    
                                    fluid
                                    placeholder="Desde"
                                    style={{ borderRadius: 18, marginRight: 10 }}
                                />
                                <Select
                                    search
                                    id="combo-input-derecha"
                                    options={options.optionsAniosHasta}
                                    
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
                                />
                                <Form.Checkbox
                                    name="permuta"
                                    
                                    label="Permuta"
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
                                    defaultValue={options.selectCategory}
                                    
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
                                        
                                        fluid
                                        placeholder="Marca"
                                        style={{ borderRadius: 18, marginRight: 10 }}
                                    />
                                    <Select
                                        search
                                        id="combo-input-derecha"
                                        options={options.optionsModelos}
                                        
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
                                        
                                        fluid
                                        placeholder="Desde"
                                        style={{ borderRadius: 18, marginRight: 10 }}
                                    />
                                    <Select
                                        search
                                        id="combo-input-derecha"
                                        options={options.optionsAniosHasta}
                                        
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
                                />
                                <Form.Checkbox
                                    name="permuta"
                                    
                                    label="Permuta"
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
