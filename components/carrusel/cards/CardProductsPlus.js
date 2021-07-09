import React from 'react'
import { Image, Card } from "semantic-ui-react";
export default function CardProductsPlus(props, {item}) {
    return (
        <Card
        as="a"
        href="/vehiculos/Carros-y-camionetas_1/Marca/Modelo/Estilo/Ubicacion/Ciudad/Anio/Combustible/Estado/Desde_0-Hasta_0/Desde_0-Hasta_0/Pagina_1/Promo_1/Permu_0/Buscar_/Orden_0"
        style={{
            boxShadow: "none",
            textDecoration: "none",
            padding: 10,
        }}
        >
            <Image
            src="https://vendetunave.s3.amazonaws.com/vendetunave/images/categorias/VTN_Otros.jpg"
            alt="VTN_Otros.jpg"
            style={{
                marginBottom: 0,
                height: 150,
                objectFit: "contain",
                borderRadius: 0,
                background: "white",
            }}
            />
            <Card.Content
            style={{
                border: "none",
                textAlign: "center",
            }}
            >
                <Card.Header>Ver Más</Card.Header>
            </Card.Content>
        </Card>
    )
}
