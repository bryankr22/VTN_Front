import React, { useState } from "react";
import { Grid, Header, Icon, Accordion, List } from "semantic-ui-react";
import { groupByAlphabet, groupByDecade } from "../../../helpers/dataStructure";
import ModalFiltersDesk from "./ModalFiltersDesk";
import * as R from "ramda";

export default function TiposComponent({ filtros, params }) {
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
  const mapping_contador = (contador) => {
    var mapItems = Object.keys(contador).map((item, index) => {
      return {
        label: item,
        qty: index,
      };
    });
    var size = 5;
    var sliceItems = mapItems.slice(0, size);
    sliceItems.push({
      label: "Ver Todos",
      slug: "",
      qty: 0,
    });
    return sliceItems;
  };
  const [opcionesList, setOpcionesList] = useState({
    text: "Tipos",
    open: false,
    slug: "tipo",
    values: mapping_contador(filtros.tipo),
  });
  const activeOpciones = () => {
    var openDrop = opcionesList.open;
    opcionesList.open = !openDrop;
    setOpcionesList({ ...opcionesList });
  };

  const [modalAll, setModalAll] = useState(false);
  const [tituloModal, setTituloModal] = useState("");
  const [paramModal, setParamModal] = useState("");
  const [listadoModal, setListadoModal] = useState([]);
  const openModal = (titulo, listado, param) => {
    setTituloModal(titulo);
    setParamModal(param);
    var mapItems = Object.keys(listado).map((item, index) => {
      return {
        label: item,
        qty: index,
      };
    });
    if (titulo === "Año") {
      var byLabel = R.descend(R.prop("label"));
      var aniosByLabel = R.sort(byLabel, mapItems);
      setListadoModal(groupByDecade(aniosByLabel));
    } else {
      setListadoModal(groupByAlphabet(mapItems));
    }
    setModalAll(true);
  };
  return (
    <>
      {params.categoria === "motos" && (
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
              <Icon name="dropdown" style={{ cssFloat: "right" }} />
            </Header>
          </Accordion.Title>
          <Accordion.Content active={opcionesList.open}>
            <Grid.Column>
              <List link>
                <List.Item>
                  <List.Content>
                    <List.List style={{ paddingLeft: 15 }}>
                      {opcionesList.values.map((itemSecond, indexSecond) => (
                        <List.Item
                          key={opcionesList.text + indexSecond}
                          as="a"
                          style={{
                            padding: "7px 0px",
                            borderBottom: "1px solid #cccccc",
                            color:
                              params.tipo === itemSecond.label && "#2185d0",
                          }}
                          onClick={() => {
                            console.log(itemSecond);
                            if (itemSecond.slug !== "") {
                              return insertParam(
                                opcionesList.slug,
                                itemSecond.label
                              );
                            }
                            openModal(opcionesList.text, filtros.tipo, "tipo");
                          }}
                        >
                          {itemSecond.label}
                        </List.Item>
                      ))}
                    </List.List>
                  </List.Content>
                </List.Item>
              </List>
            </Grid.Column>
          </Accordion.Content>
        </Accordion>
      )}
      {modalAll && (
        <ModalFiltersDesk
          showModal={modalAll}
          onClose={() => setModalAll(!modalAll)}
          titulo={tituloModal}
          param={paramModal}
          listado={listadoModal}
        />
      )}
    </>
  );
}
