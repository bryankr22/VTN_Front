import React, {useState} from 'react'
import { Header, Form, Container, Button, Input, Select, Responsive } from "semantic-ui-react";
export default function FiltersHome() {
    const [filters, setFilters] = useState({
        optionsCategories: [],
        selectCategory: "",
        optionsMarcas: [],
        optionsModelos: [],
        optionsPrice: [],
        optionsAniosDesde: [],
        optionsAniosHasta: []
    })
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
                                options={filters.optionsCategories}
                                defaultValue={filters.selectCategory}
                                
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
                                    options={filters.optionsMarcas}
                                    
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
                                    options={filters.optionsModelos}
                                    
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
                                options={filters.optionsPrice}
                                
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
                                    options={filters.optionsAniosDesde}
                                    
                                    fluid
                                    placeholder="Desde"
                                    style={{ borderRadius: 18, marginRight: 10 }}
                                />
                                <Select
                                    search
                                    id="combo-input-derecha"
                                    options={filters.optionsAniosHasta}
                                    
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
                        <Button  color="blue" type="submit">
                            BUSCAR VEHÍCULO
                        </Button>
                    </Form>
                </Responsive>
                <Responsive {...Responsive.onlyTablet}>
                    <Form>
                        <Form.Field>
                            <Select
                                search
                                options={filters.optionsCategories}
                                defaultValue={filters.selectCategory}
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
                                    options={filters.optionsMarcas}
                                    
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
                                    options={filters.optionsModelos}
                                    
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
                                options={filters.optionsPrice}
                                
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
                                    options={filters.optionsAniosDesde}
                                    
                                    fluid
                                    placeholder="Desde"
                                    style={{ borderRadius: 18, marginRight: 10 }}
                                />
                                <Select
                                    search
                                    id="combo-input-derecha"
                                    options={filters.optionsAniosHasta}
                                    
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
                        <Button  color="blue" type="submit">
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
                                    options={filters.optionsCategories}
                                    defaultValue={filters.selectCategory}
                                    
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
                                        options={filters.optionsMarcas}
                                        
                                        fluid
                                        placeholder="Marca"
                                        style={{ borderRadius: 18, marginRight: 10 }}
                                    />
                                    <Select
                                        search
                                        id="combo-input-derecha"
                                        options={filters.optionsModelos}
                                        
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
                                    options={filters.optionsPrice}
                                    
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
                                        options={filters.optionsAniosDesde}
                                        
                                        fluid
                                        placeholder="Desde"
                                        style={{ borderRadius: 18, marginRight: 10 }}
                                    />
                                    <Select
                                        search
                                        id="combo-input-derecha"
                                        options={filters.optionsAniosHasta}
                                        
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
                        <Button  color="blue" style={{ textTransform: "uppercase" }}>
                            buscar vehículo
                        </Button>
                    </Form>
                </Responsive>
            </Container>
        </div>
    )
}
