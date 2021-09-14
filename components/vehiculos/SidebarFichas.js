import React, { useState } from "react";
import {
  Container,
  Input,
  List,
  Grid,
  Header,
  Button,
} from "semantic-ui-react";
import { groupByAlphabet, groupByDecade } from "../../helpers/dataStructure";
import ActiveTagsVehiculos from "./ActiveTagsVehiculos";
import ModalFiltersDesk from "./modals/ModalFiltersDesk";
export default function SidebarFichas({ params, contadores, vehiculos }) {
  //console.log(">>>>", contadores);
  const title_page = (slug) => {
    switch (slug) {
      case "motos":
        return "Motos";
      case "camiones":
        return "Camiones";
      case "carros_coleccion":
        return "Carros de coleccion";
      case "otros":
        return "Otros";
      case "accesorios":
        return "Accesorios";
      default:
        return "Carros y camionetas";
    }
  };
  const mapping_contador = (contador, no) => {
    var mapItems = Object.keys(contador).map((item, index) => {
      return {
        label: item,
        qty: index,
      };
    });
    var size = 5;
    var sliceItems = mapItems.slice(0, size);
    return sliceItems;
  };
  const kilometraje_filter = [
    { text: "De 0 a 5.000" },
    { text: "De 5.000 a 10.000" },
    { text: "De 10.000 a 20.000" },
    { text: "De 20.000 a 30.000" },
    { text: "De 30.000 a 45.000" },
  ];
  const precios_filter = [
    { label: "Hasta $10.000.000", slug: "0:10000000" },
    { label: "$10.000.000 a $20.000.000", slug: "10000000:20000000" },
    { label: "$20.000.000 a $35.000.000", slug: "20000000:35000000" },
    { label: "$35.000.000 a $50.000.000", slug: "35000000:50000000" },
    { label: "$50.000.000 a $100.000.000", slug: "50000000:100000000" },
  ];
  const insertParam = (key, value, reset, persist) => {
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
    if (reset) {
      if (persist) {
        const url = new URL(location.href);
        const newUrl = new URL("http://test.com");
        url.searchParams.forEach((nValue, nKey) => {
          if (persist.includes(nKey)) {
            newUrl.searchParams.append(nKey, nValue);
          }
        });
        newUrl.searchParams.append(key, value);
        params = newUrl.search;
      } else {
        params = `${key}=${value}`;
      }
    }
    document.location.search = params;
  };
  const tipos_vehList = [
    { id: "Carro", nombre: "Carro" },
    { id: "Camioneta", nombre: "Camioneta" },
    { id: "SUV", nombre: "SUV" },
    { id: "Deportivo", nombre: "Deportivo" },
    { id: "Convertible", nombre: "Convertible" },
    { id: "Pick-Up", nombre: "Pick-Up" },
  ];

  const handleRenderModal = (list = {}) => {
    return Object.keys(list).length >= 7;
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
    <Grid.Column style={{ paddingLeft: "3%" }} width={3}>
      <Header style={{ margin: 0 }} as="h3">
        {title_page(params.categoria)}
      </Header>
      <Header style={{ marginTop: 15 }} as="h3">
        {contadores.total_records} resultados
      </Header>
      <Container>
        <ActiveTagsVehiculos tags={params} />
      </Container>
      <Container>
          <List link>
            <List.Item>
              <List.Content>
                <List.Header>
                  <Header as="h5">Tipo de vehiculo</Header>
                </List.Header>
                <List.List style={{ paddingLeft: 15 }}>
                  {tipos_vehList.map((item, index) => (
                    <List.Item
                      key={index}
                      as="a"
                      onClick={() => insertParam("tipo", item.id, true)}
                      style={{
                        color: params.tipo == item.id && '#2185d0'
                      }}
                    >
                      {item.nombre}
                    </List.Item>
                  ))}
                </List.List>
              </List.Content>
            </List.Item>
          </List>
          <List link>
            <List.Item>
              <List.Content>
                <List.Header>
                  <Header as="h5">Marca</Header>
                </List.Header>
                <List.List style={{ paddingLeft: 15 }}>
                  {mapping_contador(contadores.marca).map((item, index) => (
                    <List.Item
                      key={index}
                      as="a"
                      onClick={() => insertParam("marca", item.label)}
                      style={{
                        color: params.marca == item.label && '#2185d0'
                      }}
                    >
                      {item.label}
                    </List.Item>
                  ))}
                  {handleRenderModal(contadores.marca) && (
                    <List.Item
                      as="a"
                      onClick={() =>
                        openModal("Marcas", contadores.marca, "marca")
                      }
                    >
                      Ver Todos
                    </List.Item>
                  )}
                </List.List>
              </List.Content>
            </List.Item>
          </List>

          <List link>
            <List.Item>
              <List.Content>
                <List.Header>
                  <Header as="h5">Modelo</Header>
                </List.Header>
                <List.List style={{ paddingLeft: 15 }}>
                  {mapping_contador(contadores.modelo).map((item, index) => (
                    <List.Item
                      key={index}
                      as="a"
                      onClick={() => insertParam("modelo", item.label)}
                      style={{
                        color: params.modelo == item.label && '#2185d0'
                      }}
                    >
                      {item.label}
                    </List.Item>
                  ))}
                  {handleRenderModal(contadores.modelo) && (
                    <List.Item
                      as="a"
                      onClick={() =>
                        openModal("Modelo", contadores.modelo, "modelo")
                      }
                    >
                      Ver Todos
                    </List.Item>
                  )}
                </List.List>
              </List.Content>
            </List.Item>
          </List>

          <List link>
            <List.Item>
              <List.Content>
                <List.Header>
                  <Header as="h5">Tipo de Motor</Header>
                </List.Header>
                <List.List style={{ paddingLeft: 15 }}>
                  {mapping_contador(contadores.combustible).map(
                    (item, index) => (
                      <List.Item
                        key={index}
                        as="a"
                        onClick={() => insertParam("combustible", item.label)}
                        style={{
                          color: params.combustible == item.label && '#2185d0'
                        }}
                      >
                        {item.label}
                      </List.Item>
                    )
                  )}

                  {handleRenderModal(contadores.combustible) && (
                    <List.Item
                      as="a"
                      onClick={() =>
                        openModal(
                          "Tipo de Motor",
                          contadores.combustible,
                          "combustible"
                        )
                      }
                    >
                      Ver Todos
                    </List.Item>
                  )}
                </List.List>
              </List.Content>
            </List.Item>
          </List>
          <List link>
            <List.Item>
              <List.Content>
                <List.Header>
                  <Header as="h5">Transmision</Header>
                </List.Header>
                <List.List style={{ paddingLeft: 15 }}>
                  {mapping_contador(contadores.transmision).map((item, index) => (
                    <List.Item
                      key={index}
                      as="a"
                      onClick={() => insertParam("transmision", item.label)}
                      style={{
                        color: params.transmision == item. label && '#2185d0'
                      }}
                    >
                      {item.label}
                    </List.Item>
                  ))}
                </List.List>
              </List.Content>
            </List.Item>
          </List>
          <>
            <List link style={{ marginBottom: 0 }}>
              <List.Item style={{ marginBottom: 0 }}>
                <List.Content>
                  <List.Header>
                    <Header as="h5">Precio</Header>
                  </List.Header>
                  <List.List>
                    {precios_filter.map((item, index) => (
                      <List.Item
                        key={index}
                        as="a"
                        onClick={() => insertParam("precio", item.slug)}
                        style={{
                        color: params.precio == item.slug && '#2185d0'
                      }}
                      >
                        {item.label}
                      </List.Item>
                    ))}
                  </List.List>
                </List.Content>
              </List.Item>
            </List>
            <div id="grid-range-km" style={{ marginBottom: 8 }}>
              <div className="mb-2 mt-3">
                <Input type="number" fluid placeholder="Mínimo" />
              </div>
              <div className="mb-3">
                <Input type="number" fluid placeholder="Máximo" />
              </div>
              <div width={2}>
                <Button style={{ marginLeft: 6 }} circular icon="angle right" />
              </div>
            </div>
          </>
      </Container>
      {modalAll && (
        <ModalFiltersDesk
          showModal={modalAll}
          onClose={() => setModalAll(!modalAll)}
          titulo={tituloModal}
          param={paramModal}
          listado={listadoModal}
        />
      )}
    </Grid.Column>
  );
}
