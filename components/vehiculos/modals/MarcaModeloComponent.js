import React, { useState } from "react";
import { Grid, Header, Icon, Accordion, List } from "semantic-ui-react";
import { groupByAlphabet, groupByDecade } from '../../../helpers/dataStructure';
import ModalFiltersDesk from "./ModalFiltersDesk";

export default function MarcaModeloComponent({ filtros, params }) {
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
        slug: item,
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
  const [marcasList, setMarcasList] = useState({
    text: "Marcas",
    open: false,
    values: mapping_contador(filtros.marcas),
    slug: "marca",
  });
  const [modelosList, setModelosList] = useState({
    text: "Modelos",
    open: false,
    values: mapping_contador(filtros.modelos),
    slug: "modelo",
  });
  const activeMarcas = () => {
    var openDrop = marcasList.open;
    marcasList.open = !openDrop;
    setMarcasList({ ...marcasList });
  };
  const activeModelos = () => {
    var openDrop = modelosList.open;
    modelosList.open = !openDrop;
    setModelosList({ ...modelosList });
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
      <Accordion style={{ width: "100%", marginBottom: 15 }}>
        <Accordion.Title
          style={{
            width: "100%",
            border: "1px solid black",
            padding: "10px 20px",
            borderRadius: 20,
          }}
          active={marcasList.open}
          index={0}
          onClick={() => activeMarcas()}
        >
          <Header as="h5">
            {marcasList.text}
            <Icon name="dropdown" style={{ cssFloat: "right" }} />
          </Header>
        </Accordion.Title>
        <Accordion.Content active={marcasList.open}>
            <List link>
              <List.Item>
                <List.Content>
                  <List.List style={{ paddingLeft: 15 }}>
                    {marcasList.values.map((itemSecond, indexSecond) => (
                      <List.Item
                        key={marcasList.text + indexSecond}
                        as="a"
                        style={{
                          padding: "7px 0px",
                          borderBottom: "1px solid #cccccc",
                          color: params.marca === itemSecond.slug ? "#2185d0": undefined,
                        }}
                        onClick={() => {
                          if (itemSecond.slug !== "") {
                            return insertParam(
                              marcasList.slug,
                              itemSecond.slug
                            );
                          }
                          openModal(
                            marcasList.text,
                            filtros.marcas,
                            'marca'
                          );
                        }}
                      >
                        {itemSecond.label}
                      </List.Item>
                    ))}
                  </List.List>
                </List.Content>
              </List.Item>
            </List>
        </Accordion.Content>
      </Accordion>
      {params.marca && (
        <Accordion style={{ width: "100%", marginBottom: 15 }}>
          <Accordion.Title
            style={{
              width: "100%",
              border: "1px solid black",
              padding: "10px 20px",
              borderRadius: 20,
            }}
            active={modelosList.open}
            index={0}
            onClick={() => activeModelos()}
          >
            <Header as="h5">
              {modelosList.text}
              <Icon name="dropdown" style={{ cssFloat: "right" }} />
            </Header>
          </Accordion.Title>
          <Accordion.Content active={modelosList.open}>
            <Grid.Column>
              <List link>
                <List.Item>
                  <List.Content>
                    <List.List style={{ paddingLeft: 15 }}>
                      {modelosList.values.map((itemSecond, indexSecond) => (
                        <List.Item
                          key={modelosList.text + indexSecond}
                          as="a"
                          style={{
                            padding: "7px 0px",
                            borderBottom: "1px solid #cccccc",
                            color: params.modelo === itemSecond.slug ? "#2185d0": undefined,
                          }}
                          onClick={() => {
                            if (itemSecond.slug !== "") {
                              return insertParam(
                                modelosList.slug,
                                itemSecond.slug
                              );
                            }
                            openModal(
                              modelosList.text,
                              filtros.modelos,
                              'modelo'
                            );
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
