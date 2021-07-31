import React from 'react'
import { Container, Input, List, Modal, Grid, Checkbox, Header, Button, Label, Icon } from "semantic-ui-react";
export default function ActiveTagsVehiculos({tags}) {
    return (
        <div>
            { tags.categoria ? 
            <Label as="a" style={{ marginBottom: 5 }}>
                {tags.categoria}
                <Icon
                    name="delete"
                    onClick={() => console.log("Eliminar") }
                />
            </Label>
            : null}
            { tags.ubicacion ? 
            <Label as="a" style={{ marginBottom: 5 }}>
                {tags.ubicacion}
                <Icon
                    name="delete"
                    onClick={() => console.log("Eliminar") }
                />
            </Label>
            : null}
            { tags.tipo ? 
            <Label as="a" style={{ marginBottom: 5 }}>
                {tags.tipo}
                <Icon
                    name="delete"
                    onClick={() => console.log("Eliminar") }
                />
            </Label>
            : null}
            { tags.marca ? 
            <Label as="a" style={{ marginBottom: 5 }}>
                {tags.marca}
                <Icon
                    name="delete"
                    onClick={() => console.log("Eliminar") }
                />
            </Label>
            : null}
            { tags.motor ? 
            <Label as="a" style={{ marginBottom: 5 }}>
                {tags.motor}
                <Icon
                    name="delete"
                    onClick={() => console.log("Eliminar") }
                />
            </Label>
            : null}
            { tags.modelo ? 
            <Label as="a" style={{ marginBottom: 5 }}>
                {tags.modelo}
                <Icon
                    name="delete"
                    onClick={() => console.log("Eliminar") }
                />
            </Label>
            : null}
            { tags.estado ? 
            <Label as="a" style={{ marginBottom: 5 }}>
                {tags.estado}
                <Icon
                    name="delete"
                    onClick={() => console.log("Eliminar") }
                />
            </Label>
            : null}
            { tags.transmision ? 
            <Label as="a" style={{ marginBottom: 5 }}>
                {tags.transmision}
                <Icon
                    name="delete"
                    onClick={() => console.log("Eliminar") }
                />
            </Label>
            : null}
            { tags.kilometraje ? 
            <Label as="a" style={{ marginBottom: 5 }}>
                {tags.kilometraje}
                <Icon
                    name="delete"
                    onClick={() => console.log("Eliminar") }
                />
            </Label>
            : null}
            { tags.precio ? 
            <Label as="a" style={{ marginBottom: 5 }}>
                {tags.precio}
                <Icon
                    name="delete"
                    onClick={() => console.log("Eliminar") }
                />
            </Label>
            : null}
        </div>
    )
}
