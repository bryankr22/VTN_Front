import React, { useState } from "react";
import { useRouter } from "next/router";
import { Grid, Header, Icon, Accordion, List } from "semantic-ui-react";
import { groupByAlphabet, groupByDecade, normalize } from '../../../helpers/dataStructure';
import ModalFiltersDesk from "./ModalFiltersDesk";

export default function MarcaModeloComponent({ filtros, params, vendedor }) {
  const router = useRouter();
  const newParams = router.query;

  const insertParam = (key, value, reset, persist) => {
    var kvp = document.location.search.substr(1).split('&');
    let i=0;
    for(; i<kvp.length; i++){
        if (kvp[i].startsWith(key + '=')) {
            let pair = kvp[i].split('=');
            pair[1] = value;
            kvp[i] = pair.join('=');
            break;
        }
    }
    if(i >= kvp.length){
        kvp[kvp.length] = [key,value].join('=');
    }
    let params = kvp.join('&');
    if (reset) {
        if(persist) {
            const url = new URL(location.href);
            const newUrl = new URL('http://test.com');
            if (newParams.vendedor) {
              newUrl.searchParams.append('vendedor', `${normalize(vendedor.nombre)}-${vendedor.id}`);
            }
            url.searchParams.forEach((nValue, nKey) => {
                if(persist.includes(nKey)) {
                    newUrl.searchParams.append(nKey, nValue)
                }
            });
            newUrl.searchParams.append(key, value);
            params = newUrl.search
        } else {
          params = newParams.vendedor ? `vendedor=${normalize(vendedor.nombre)}-${vendedor.id}&${key}=${value}` : `${key}=${value}`;
        }
    }

    document.location.search = params;
}
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
  const [modalAction, setModalAction] = useState();
  const openModal = (titulo, listado, param, action) => {
    setTituloModal(titulo);
    setParamModal(param);
    setModalAction(prev => action)
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
                          color: newParams.marca === itemSecond.slug ? "#2185d0": undefined,
                        }}
                        onClick={() => {
                          if (itemSecond.slug !== "") {
                            return insertParam(
                              marcasList.slug,
                              itemSecond.slug,
                              true,
                              ['categoria', "ubicacion", 'ciudad']
                            );
                          }
                          openModal(
                            marcasList.text,
                            filtros.marcas,
                            'marca',
                            (label) => insertParam(
                              marcasList.slug,
                              label,
                              true,
                              ['categoria']
                            )
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
      {newParams.marca && (
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
                            color: newParams.modelo === itemSecond.slug ? "#2185d0": undefined,
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
          modalAction={modalAction}
        />
      )}
    </>
  );
}
