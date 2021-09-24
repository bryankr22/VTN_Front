import React, { useState } from "react";
import { Grid, Header, Icon, Accordion, Checkbox } from "semantic-ui-react";
export default function OpcionesComponent({ params }) {
  const insertParam = (key, value) => {
    key = encodeURIComponent(key);
    value = encodeURIComponent(value);
    var kvp = document.location.search.substr(1).split("&");
    let i = 0;
    for (; i < kvp.length; i++) {
      if (kvp[i].startsWith(key + "=")) {
        let pair = kvp[i].split("=");
        pair[1] = value;
        kvp[i] = pair.join("=");
        break;
      }
    }
    if (i >= kvp.length) {
      kvp[kvp.length] = [key, value].join("=");
    }
    let params = kvp.join("&");
    document.location.search = params;
  };
  const [opcionesList, setOpcionesList] = useState({
    text: "Opciones",
    open: false,
  });
  const activeOpciones = () => {
    var openDrop = opcionesList.open;
    opcionesList.open = !openDrop;
    setOpcionesList({ ...opcionesList });
  };
  return (
    <>
      <Accordion style={{ width: "100%", marginBottom: 15 }}>
        <Accordion.Title
          style={{
            width: "100%",
            border: "1px solid black",
            padding: "10px 20px",
            borderRadius: 20,
          }}
          active={opcionesList.open}
          index={0}
          onClick={() => activeOpciones()}
        >
          <Header as="h5">
            {opcionesList.text}
            <Icon name="dropdown" style={{ float: "right" }} />
          </Header>
        </Accordion.Title>
        <Accordion.Content active={opcionesList.open}>
          <Grid.Column>
            <Checkbox
              style={{ paddingLeft: 15 }}
              name="promocion"
              label="Promoción"
              checked={Boolean(params.promocion)}
              defaultValue={Boolean(params.promocion)}
              onChange={(e, { value }) => insertParam("promocion", !value)}
            />
            <br />
            <Checkbox
              style={{ paddingLeft: 15 }}
              name="permuta"
              label="Permuta"
              checked={Boolean(params.permuta)}
              defaultValue={Boolean(params.permuta)}
              onChange={(e, { value }) => insertParam("permuta", !value)}
            />
            <br />
            <Checkbox
              style={{ paddingLeft: 15 }}
              name="blindaje"
              label="Blindaje"
              checked={Boolean(params.blindaje)}
              defaultValue={Boolean(params.blindaje)}
              onChange={(e, { value }) => insertParam("blindaje", !value)}
            />
          </Grid.Column>
        </Accordion.Content>
      </Accordion>
    </>
  );
}
