import React from 'react'
import { Container, Input, List, Modal, Grid, Checkbox, Header, Button, Label, Icon } from "semantic-ui-react";
export default function ActiveTagsVehiculos({tags}) {
    const removeFilter = (param) => {
        var params = new URLSearchParams(window.location.search);
        params.delete(param);
        window.location.href = `${window.location.pathname}?${params}`;
    }
    return (
        <div>
            { tags.permuta ? 
            <Label as="a" style={{ marginBottom: 5 }}>
                {'Permuta'}
                <Icon
                    name="delete"
                    onClick={() => removeFilter('permuta') }
                />
            </Label>
            : null}
            { tags.combustible ? 
            <Label as="a" style={{ marginBottom: 5 }}>
                {tags.combustible}
                <Icon
                    name="delete"
                    onClick={() => removeFilter('combustible') }
                />
            </Label>
            : null}
            { tags.blindaje ? 
            <Label as="a" style={{ marginBottom: 5 }}>
                {'Blindaje'}
                <Icon
                    name="delete"
                    onClick={() => removeFilter('blindaje') }
                />
            </Label>
            : null}
            { tags.promocion ? 
            <Label as="a" style={{ marginBottom: 5 }}>
                {'Promocion'}
                <Icon
                    name="delete"
                    onClick={() => removeFilter('promocion') }
                />
            </Label>
            : null}
            { tags.categoria ? 
            <Label as="a" style={{ marginBottom: 5 }}>
                {tags.categoria}
                <Icon
                    name="delete"
                    onClick={() => removeFilter('categoria') }
                />
            </Label>
            : null}
            { tags.ubicacion ? 
            <Label as="a" style={{ marginBottom: 5 }}>
                {tags.ubicacion}
                <Icon
                    name="delete"
                    onClick={() => removeFilter('ubicacion') }
                />
            </Label>
            : null}
            { tags.tipo ? 
            <Label as="a" style={{ marginBottom: 5 }}>
                {tags.tipo}
                <Icon
                    name="delete"
                    onClick={() => removeFilter('tipo') }
                />
            </Label>
            : null}
            { tags.anio ? 
            <Label as="a" style={{ marginBottom: 5 }}>
                {tags.anio}
                <Icon
                    name="delete"
                    onClick={() => removeFilter('anio') }
                />
            </Label>
            : null}
            { tags.marca ? 
            <Label as="a" style={{ marginBottom: 5 }}>
                {tags.marca}
                <Icon
                    name="delete"
                    onClick={() => removeFilter('marca') }
                />
            </Label>
            : null}
            { tags.motor ? 
            <Label as="a" style={{ marginBottom: 5 }}>
                {tags.motor}
                <Icon
                    name="delete"
                    onClick={() => removeFilter('motor') }
                />
            </Label>
            : null}
            { tags.modelo ? 
            <Label as="a" style={{ marginBottom: 5 }}>
                {tags.modelo}
                <Icon
                    name="delete"
                    onClick={() => removeFilter('modelo') }
                />
            </Label>
            : null}
            { tags.estado ? 
            <Label as="a" style={{ marginBottom: 5 }}>
                {tags.estado}
                <Icon
                    name="delete"
                    onClick={() => removeFilter('estado') }
                />
            </Label>
            : null}
            { tags.transmision ? 
            <Label as="a" style={{ marginBottom: 5 }}>
                {tags.transmision}
                <Icon
                    name="delete"
                    onClick={() => removeFilter('transmision') }
                />
            </Label>
            : null}
            { tags.kilometraje ? 
            <Label as="a" style={{ marginBottom: 5 }}>
                {tags.kilometraje}
                <Icon
                    name="delete"
                    onClick={() => removeFilter('kilometraje') }
                />
            </Label>
            : null}
            { tags.precio ? 
            <Label as="a" style={{ marginBottom: 5 }}>
                {tags.precio}
                <Icon
                    name="delete"
                    onClick={() => removeFilter('precio') }
                />
            </Label>
            : null}
        </div>
    )
}
