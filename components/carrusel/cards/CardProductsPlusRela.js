import React from 'react'
import { Image, Card } from "semantic-ui-react";
export default function CardProductsPlusRela(props) {
    return (
        <Card
            as="a"
            href={`/vehiculos/${props.category}/${props.marca}/${props.modelo}/Estilo/Ubicacion/Ciudad/Anio/Combustible/Blindaje_0/Transmision/Estado/Desde_0-Hasta_0/Desde_0-Hasta_0/Pagina_1/Promo_0/Permu_0/Buscar_/Orden_0`}
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
                    height: 100,
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
