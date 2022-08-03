import React, { useState } from "react";
import {
  Container,
  Input,
  List,
  Grid,
  Header,
  Button,
} from "semantic-ui-react";
import { useSelector } from "react-redux";
import { PRICES_FILTER } from '../../helpers/constants';
import { groupByAlphabet, groupByDecade } from "../../helpers/dataStructure";
import ActiveTagsVehiculos from "./ActiveTagsVehiculos";
import ModalFiltersDesk from "./modals/ModalFiltersDesk";
import { dark, light } from "../../helpers/colors";

const mapArray = (contador = []) => {
  var mapItems = contador.map((item) => {
    return {
      label: item.label,
      slug: item.slug,
    };
  });
  var size = 5;
  var sliceItems = mapItems.slice(0, size);
  return sliceItems;
};

export default function SidebarFichas({ params, contadores, vehiculos }) {
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
    const list = Array.isArray(listado) ? listado : Object.keys(listado);
    var mapItems = list.map((item, index) => {
      return {
        label: item.label,
        slug: item.slug,
        qty: index,
      };
    });
    if (titulo === "Año") {
      var byLabel = R.descend(R.prop("label"));
      var aniosByLabel = R.sort(byLabel, mapItems);
      setListadoModal(groupByDecade(aniosByLabel));
    } else {
      let grouped = [];
      if (Array.isArray(listado)) {
        grouped = [[...mapItems]]
      } else {
        grouped = groupByAlphabet(mapItems)
      }
      setListadoModal(grouped);
    }
    setModalAll(true);
  };

  const [filters, setFilters] = useState({
    min_precio: 0,
    max_precio: 0,
    min_km: 0,
    max_km: 0,
  });

  const setInputVal = (input, value) => {
    setFilters({
      ...filters,
      [input]: value,
    });
  };

  const setPrice = () => {
    insertParam("precio", filters.min_precio + ":" + filters.max_precio);
  };

  const darkMode = useSelector(({ darkMode }) => darkMode.status);
  const colorText = darkMode === light ? dark : light;
  const colorTextFilters = darkMode === light ? undefined : light;

  return (
    <Grid.Column style={{ paddingLeft: "3%", backgroundColor: darkMode }} width={3}>
      <style>
        {`
          .ui.horizontal.list:not(.celled)>.item:first-child {
            margin: 10px !important;
          }
        `}
      </style>
      <Header style={{ margin: 0, fontSize: '1.3rem', color: colorText }} as="h1">
        Ficha Técnica
        <span className="d-block">
          {title_page(params.categoria)}
        </span>
      </Header>
      <Header style={{ marginTop: 15, fontSize: '1.2rem', color: colorText }} as="h2">
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
                <Header as="h3" style={{ fontSize: '1rem', color: colorText }}>Tipo de vehiculo</Header>
              </List.Header>
              <List.List style={{ paddingLeft: 15 }}>
                {tipos_vehList.map((item, index) => (
                  <List.Item
                    key={index}
                    as="a"
                    onClick={() => insertParam("tipo", item.id, true)}
                    style={{
                      color: params.tipo == item.id ? "#2185d0" : colorTextFilters,
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
                <Header as="h3" style={{ fontSize: '1rem', color: colorText }}>Marca</Header>
              </List.Header>
              <List.List style={{ paddingLeft: 15 }}>
                {mapping_contador(contadores.marca).map((item, index) => (
                  <List.Item
                    key={index}
                    as="a"
                    onClick={() => insertParam("marca", item.label)}
                    style={{
                      color: params.marca == item.label ? "#2185d0" : colorTextFilters,
                    }}
                  >
                    {item.label}
                  </List.Item>
                ))}
                {handleRenderModal(contadores.marca) && (
                  <List.Item
                    as="a"
                    style={{ color: colorText }}
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

        {params.marca &&
          <List link>
            <List.Item>
              <List.Content>
                <List.Header>
                  <Header as="h3" style={{ fontSize: '1rem', color: colorText }}>Modelo</Header>
                </List.Header>
                <List.List style={{ paddingLeft: 15 }}>
                  {mapping_contador(contadores.modelo).map((item, index) => (
                    <List.Item
                      key={index}
                      as="a"
                      onClick={() => insertParam("modelo", item.label)}
                      style={{
                        color: params.modelo == item.label ? '#2185d0' : colorTextFilters
                      }}
                    >
                      {item.label}
                    </List.Item>
                  ))}
                  {handleRenderModal(contadores.modelo) && (
                    <List.Item
                      as="a"
                      style={{ color: colorText }}
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
        }
        <List link>
          <List.Item>
            <List.Content>
              <List.Header>
                <Header as="h3" style={{ fontSize: '1rem', color: colorText }}>Tipo de Motor</Header>
              </List.Header>
              <List.List style={{ paddingLeft: 15 }}>
                {mapping_contador(contadores.combustible).map(
                  (item, index) => (
                    <List.Item
                      key={index}
                      as="a"
                      onClick={() => insertParam("combustible", item.label)}
                      style={{
                        color: params.combustible == item.label ? '#2185d0' : colorTextFilters
                      }}
                    >
                      {item.label}
                    </List.Item>
                  )
                )}

                {handleRenderModal(contadores.combustible) && (
                  <List.Item
                    as="a"
                    style={{ color: colorTextFilters }}
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
                <Header as="h3" style={{ fontSize: '1rem', color: colorText }}>Transmision</Header>
              </List.Header>
              <List.List style={{ paddingLeft: 15 }}>
                {mapping_contador(contadores.transmision).map((item, index) => (
                  <List.Item
                    key={index}
                    as="a"
                    onClick={() => insertParam("transmision", item.label)}
                    style={{
                      color: params.transmision == item.label ? "#2185d0" : colorTextFilters,
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
                  <Header as="h3" style={{ fontSize: '1rem', color: colorText }}>Precio</Header>
                </List.Header>
                <List.List>
                  {mapArray(PRICES_FILTER).map((item, index) => (
                    <List.Item
                      key={index}
                      as="a"
                      style={{
                        textTransform: "capitalize",
                        color:
                          params.precio == item.slug ? "#2185d0" : colorTextFilters,
                      }}
                      onClick={() => insertParam("precio", item.slug)}
                    >
                      {item.label}
                    </List.Item>
                  ))}
                  <List.Item
                    as="a"
                    style={{ color: colorTextFilters }}
                    onClick={() =>
                      openModal("Precios", [...PRICES_FILTER].splice(5, PRICES_FILTER.length - 1), "precio", true)
                    }
                  >
                    Ver Todos
                  </List.Item>
                </List.List>
              </List.Content>
            </List.Item>
          </List>
          <Grid id="grid-range-price" style={{ marginBottom: 8, marginTop: 10 }}>
            <Grid.Column width={6}>
              <Input
                type="number"
                fluid
                defaultValue={0}
                placeholder="Mínimo"
                onChange={(e, { value }) => setInputVal("min_precio", value)}
              />
            </Grid.Column>
            <Grid.Column
              width={1}
              style={{ textAlign: "center", marginTop: 3, fontSize: 16 }}
            >
              -
            </Grid.Column>
            <Grid.Column width={6}>
              <Input
                type="number"
                fluid
                defaultValue={0}
                placeholder="Máximo"
                onChange={(e, { value }) => setInputVal("max_precio", value)}
              />
            </Grid.Column>
            <Grid.Column width={3}>
              <Button
                style={{ marginLeft: 6 }}
                circular
                icon="angle right"
                onClick={() => setPrice()}
              />
            </Grid.Column>
          </Grid>
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
