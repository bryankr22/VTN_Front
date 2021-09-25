import React from "react";
import { Label, Icon } from "semantic-ui-react";
export default function ActiveTagsVehiculos({ tags }) {
  const removeFilter = (param) => {
    var params = new URLSearchParams(window.location.search);
    params.delete(param);
    window.location.href = `${window.location.pathname}?${params}`;
  };
  const handleCategoryName = (category) => {
    switch (category) {
      case "carros":
        return "Carros y Camionetas";
      case "carros_coleccion":
        return "Carros de Colección";
      default:
        return category;
    }
  };
  return (
    <>
      {tags.categoria ? (
        <Label as="a" style={{ marginBottom: 5, textTransform: "capitalize" }}>
          {handleCategoryName(tags.categoria)}
          <Icon name="delete" onClick={() => removeFilter("categoria")} />
        </Label>
      ) : null}
      {tags.ubicacion ? (
        <Label as="a" style={{ marginBottom: 5, textTransform: "capitalize" }}>
          {tags.ubicacion}
          <Icon name="delete" onClick={() => removeFilter("ubicacion")} />
        </Label>
      ) : null}
      {tags.ciudad ? (
        <Label as="a" style={{ marginBottom: 5, textTransform: "capitalize" }}>
          {tags.ciudad}
          <Icon name="delete" onClick={() => removeFilter("ciudad")} />
        </Label>
      ) : null}
      {tags.tipo ? (
        <Label as="a" style={{ marginBottom: 5, textTransform: "capitalize" }}>
          {tags.tipo}
          <Icon name="delete" onClick={() => removeFilter("tipo")} />
        </Label>
      ) : null}
      {tags.marca ? (
        <Label as="a" style={{ marginBottom: 5, textTransform: "capitalize" }}>
          {tags.marca}
          <Icon name="delete" onClick={() => removeFilter("marca")} />
        </Label>
      ) : null}
      {tags.modelo ? (
        <Label as="a" style={{ marginBottom: 5, textTransform: "capitalize" }}>
          {tags.modelo}
          <Icon name="delete" onClick={() => removeFilter("modelo")} />
        </Label>
      ) : null}
      {tags.anio ? (
        <Label as="a" style={{ marginBottom: 5, textTransform: "capitalize" }}>
          {tags.anio}
          <Icon name="delete" onClick={() => removeFilter("anio")} />
        </Label>
      ) : null}
      {tags.ano ? (
        <Label as="a" style={{ marginBottom: 5, textTransform: "capitalize" }}>
          {tags.ano}
          <Icon name="delete" onClick={() => removeFilter("ano")} />
        </Label>
      ) : null}
      {tags.motor ? (
        <Label as="a" style={{ marginBottom: 5, textTransform: "capitalize" }}>
          {tags.motor}
          <Icon name="delete" onClick={() => removeFilter("motor")} />
        </Label>
      ) : null}
      {tags.combustible ? (
        <Label as="a" style={{ marginBottom: 5, textTransform: "capitalize" }}>
          {tags.combustible}
          <Icon name="delete" onClick={() => removeFilter("combustible")} />
        </Label>
      ) : null}
      {tags.transmision ? (
        <Label as="a" style={{ marginBottom: 5, textTransform: "capitalize" }}>
          {tags.transmision}
          <Icon name="delete" onClick={() => removeFilter("transmision")} />
        </Label>
      ) : null}
      {tags.estado ? (
        <Label as="a" style={{ marginBottom: 5, textTransform: "capitalize" }}>
          {tags.estado}
          <Icon name="delete" onClick={() => removeFilter("estado")} />
        </Label>
      ) : null}
      {tags.promocion ? (
        <Label as="a" style={{ marginBottom: 5, textTransform: "capitalize" }}>
          {"Promocion"}
          <Icon name="delete" onClick={() => removeFilter("promocion")} />
        </Label>
      ) : null}
      {tags.permuta ? (
        <Label as="a" style={{ marginBottom: 5, textTransform: "capitalize" }}>
          {"Permuta"}
          <Icon name="delete" onClick={() => removeFilter("permuta")} />
        </Label>
      ) : null}
      {tags.blindaje ? (
        <Label as="a" style={{ marginBottom: 5, textTransform: "capitalize" }}>
          {"Blindaje"}
          <Icon name="delete" onClick={() => removeFilter("blindaje")} />
        </Label>
      ) : null}
      {tags.precio ? (
        <Label as="a" style={{ marginBottom: 5, textTransform: "capitalize" }}>
          {tags.precio}
          <Icon name="delete" onClick={() => removeFilter("precio")} />
        </Label>
      ) : null}
      {tags.kilometraje ? (
        <Label as="a" style={{ marginBottom: 5, textTransform: "capitalize" }}>
          {tags.kilometraje}
          <Icon name="delete" onClick={() => removeFilter("kilometraje")} />
        </Label>
      ) : null}
    </>
  );
}
