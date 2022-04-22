import {
  Header,
  Grid,
  Image,
  Button,
  Divider,
} from "semantic-ui-react";
import { useSelector, useDispatch } from "react-redux";
import { removeVehiculo } from "../../store/comparadorSlice";
import { light } from "../../helpers/colors";
export default function CompareVehiculoMobile() {
  const dispatch = useDispatch();
  const pathS3 = "https://vendetunave.s3.amazonaws.com/vendetunave/images/thumbnails/";
  const parseListings = (storageList) => {
    var newListado = [{ id: 0 }, { id: 0 }, { id: 0 }];
    if (storageList.length > 0) {
      for (let i = 0; i < newListado.length; i++) {
        if (storageList[i]) {
          newListado[i] = storageList[i];
        }
      }
    }
    return newListado;
  };
  const compareList = useSelector(({ comparador }) =>
    parseListings(comparador.vehiculos)
  );
  const removeVehiculoClick = (index) => {
    dispatch(removeVehiculo(index));
  };

  const darkMode = useSelector(({ darkMode }) => darkMode.status);
  const colorText = darkMode === light ? "gray" : light;
  return (
    <Grid
      columns={3}
      divided
      id="grid-compare"
      style={{ width: "max-content" }}
    >
      <Grid.Row style={{ textAlign: "left" }}>
        {compareList.map((vehicle, index) => {
          if (vehicle.id !== 0) {
            return (
              <Grid.Column key={index} style={{ width: 220 }}>
                <Button
                  primary
                  floated="right"
                  style={{ marginBottom: 10 }}
                  onClick={() => removeVehiculoClick(index)}
                >
                  Remover
                </Button>
                <Image
                  centered
                  style={{ height: 200, objectFit: "cover", width: "100%" }}
                  src={pathS3 + vehicle.nameImage + "300x300.webp"}
                  alt={vehicle.title}
                />
                {index === 0 && <Header as="h2" style={{ color: colorText }}>Características</Header>}
                {index !== 0 && (
                  <Header as="h2" style={{ color: "transparent" }}>
                    .
                  </Header>
                )}
                {index === 0 && <Header as="h3" style={{ color: colorText }}>Nombre</Header>}
                {index !== 0 && (
                  <Header as="h3" style={{ color: "transparent" }}>
                    .
                  </Header>
                )}
                <p
                  style={{
                    fontWeight: 700,
                    fontSize: 14,
                    marginLeft: 15,
                    color: "gray",
                    height: 35,
                  }}
                >
                  {vehicle.title}
                </p>
                {index === 0 && <Header as="h3" style={{ color: colorText }}>Precio</Header>}
                {index !== 0 && (
                  <Header as="h3" style={{ color: "transparent" }}>
                    .
                  </Header>
                )}
                <p
                  style={{
                    fontWeight: 700,
                    fontSize: 14,
                    marginLeft: 15,
                    color: "gray",
                  }}
                >
                  ${new Intl.NumberFormat("de-DE").format(vehicle.precio)} COP
                </p>

                {index === 0 && <Header as="h3" style={{ color: colorText }}>Ubicación</Header>}
                {index !== 0 && (
                  <Header as="h3" style={{ color: "transparent" }}>
                    .
                  </Header>
                )}
                <p
                  style={{
                    fontWeight: 700,
                    fontSize: 14,
                    marginLeft: 15,
                    color: "gray",
                  }}
                >
                  {vehicle.labelCiudad || vehicle.ciudadLabel}
                </p>

                {index === 0 && <Header as="h3" style={{ color: colorText }}>Marca</Header>}
                {index !== 0 && (
                  <Header as="h3" style={{ color: "transparent" }}>
                    .
                  </Header>
                )}
                <p
                  style={{
                    fontWeight: 700,
                    fontSize: 14,
                    marginLeft: 15,
                    color: "gray",
                  }}
                >
                  {vehicle.marca || vehicle.marcaLabel}
                </p>

                {index === 0 && <Header as="h3" style={{ color: colorText }}>Año</Header>}
                {index !== 0 && (
                  <Header as="h3" style={{ color: "transparent" }}>
                    .
                  </Header>
                )}
                <p
                  style={{
                    fontWeight: 700,
                    fontSize: 14,
                    marginLeft: 15,
                    color: "gray",
                  }}
                >
                  {vehicle.ano}
                </p>
                {index === 0 && <Header as="h3" style={{ color: colorText }}>Modelo</Header>}
                {index !== 0 && (
                  <Header as="h3" style={{ color: "transparent" }}>
                    .
                  </Header>
                )}
                <p
                  style={{
                    fontWeight: 700,
                    fontSize: 14,
                    marginLeft: 15,
                    color: "gray",
                  }}
                >
                  {vehicle.modelo || vehicle.modeloLabel}
                </p>
                {index === 0 && <Header as="h3" style={{ color: colorText }}>Estado</Header>}
                {index !== 0 && (
                  <Header as="h3" style={{ color: "transparent" }}>
                    .
                  </Header>
                )}
                <p
                  style={{
                    fontWeight: 700,
                    fontSize: 14,
                    marginLeft: 15,
                    color: "gray",
                  }}
                >
                  {vehicle.condicion}
                </p>
                {index === 0 && <Header as="h3" style={{ color: colorText }}>Tipo de precio</Header>}
                {index !== 0 && (
                  <Header as="h3" style={{ color: "transparent" }}>
                    .
                  </Header>
                )}
                <p
                  style={{
                    fontWeight: 700,
                    fontSize: 14,
                    marginLeft: 15,
                    color: "gray",
                  }}
                >
                  {vehicle.tipoPrecioLabel}
                </p>
                {index === 0 && <Header as="h3" style={{ color: colorText }}>Cilindraje</Header>}
                {index !== 0 && (
                  <Header as="h3" style={{ color: "transparent" }}>
                    .
                  </Header>
                )}
                <p
                  style={{
                    fontWeight: 700,
                    fontSize: 14,
                    marginLeft: 15,
                    color: "gray",
                  }}
                >
                  {new Intl.NumberFormat("de-DE").format(vehicle.cilindraje)} cc
                </p>
                {index === 0 && <Header as="h3" style={{ color: colorText }}>Kilometraje</Header>}
                {index !== 0 && (
                  <Header as="h3" style={{ color: "transparent" }}>
                    .
                  </Header>
                )}
                <p
                  style={{
                    fontWeight: 700,
                    fontSize: 14,
                    marginLeft: 15,
                    color: "gray",
                  }}
                >
                  {new Intl.NumberFormat("de-DE").format(vehicle.kilometraje)}{" "}
                  Km
                </p>
                {index === 0 && <Header as="h3" style={{ color: colorText }}>Transmisión</Header>}
                {index !== 0 && (
                  <Header as="h3" style={{ color: "transparent" }}>
                    .
                  </Header>
                )}
                <p
                  style={{
                    fontWeight: 700,
                    fontSize: 14,
                    marginLeft: 15,
                    color: "gray",
                  }}
                >
                  {vehicle.transmision}
                </p>
                {index === 0 && <Header as="h3" style={{ color: colorText }}>Blindaje</Header>}
                {index !== 0 && (
                  <Header as="h3" style={{ color: "transparent" }}>
                    .
                  </Header>
                )}
                <p
                  style={{
                    fontWeight: 700,
                    fontSize: 14,
                    marginLeft: 15,
                    color: "gray",
                  }}
                >
                  {vehicle.blindado ? "SI" : "NO"}
                </p>
                {index === 0 && <Header as="h3" style={{ color: colorText }}>Último dígito Placa</Header>}
                {index !== 0 && (
                  <Header as="h3" style={{ color: "transparent" }}>
                    Último dígito Placa
                  </Header>
                )}
                <p
                  style={{
                    fontWeight: 700,
                    fontSize: 14,
                    marginLeft: 15,
                    color: "gray",
                  }}
                >
                  {vehicle.placa}
                </p>
                <Divider />
                {index === 0 && <Header as="h2" style={{ color: colorText }}>Descripción</Header>}
                {index !== 0 && (
                  <Header as="h2" style={{ color: "transparent" }}>
                    .
                  </Header>
                )}
                <p
                  style={{
                    fontWeight: 700,
                    fontSize: 14,
                    marginLeft: 15,
                    color: "gray",
                  }}
                >
                  {vehicle.descripcion}
                </p>
              </Grid.Column>
            );
          } else {
            return (
              <Grid.Column style={{ width: 220 }} key={index}>
                <Button
                  as="a"
                  onClick={() => {
                    localStorage.setItem("compareVehiculos", "1");
                    localStorage.setItem("isComparing", "1");
                  }}
                  href="/vehiculos"
                  floated="right"
                  style={{ marginBottom: 10 }}
                >
                  Agregar
                </Button>
                <Image
                  centered
                  onClick={() => {
                    localStorage.setItem("compareVehiculos", "1");
                    localStorage.setItem("isComparing", "1");
                    location.href = "/vehiculos";
                  }}
                  style={{
                    height: 200,
                    objectFit: "cover",
                    width: "100%",
                    cursor: "pointer",
                  }}
                  src="/images/plus-compare.png"
                />
                {index === 0 && <Header as="h2" style={{ color: colorText }}>Características</Header>}
                {index !== 0 && (
                  <Header as="h2" style={{ color: "transparent" }}>
                    .
                  </Header>
                )}
                {index === 0 && <Header as="h3" style={{ color: colorText }}>Nombre</Header>}
                {index !== 0 && (
                  <Header as="h3" style={{ color: "transparent" }}>
                    .
                  </Header>
                )}
                <p
                  style={{
                    fontWeight: 700,
                    fontSize: 14,
                    marginLeft: 15,
                    color: "transparent",
                  }}
                >
                  .
                </p>
                {index === 0 && <Header as="h3" style={{ color: colorText }}>Precio</Header>}
                {index !== 0 && (
                  <Header as="h3" style={{ color: "transparent" }}>
                    .
                  </Header>
                )}
                <p
                  style={{
                    fontWeight: 700,
                    fontSize: 14,
                    marginLeft: 15,
                    color: "transparent",
                  }}
                >
                  .
                </p>
                {index === 0 && <Header as="h3" style={{ color: colorText }}>Ubicación</Header>}
                {index !== 0 && (
                  <Header as="h3" style={{ color: "transparent" }}>
                    .
                  </Header>
                )}
                <p
                  style={{
                    fontWeight: 700,
                    fontSize: 14,
                    marginLeft: 15,
                    color: "transparent",
                  }}
                >
                  .
                </p>

                {index === 0 && <Header as="h3" style={{ color: colorText }}>Marca</Header>}
                {index !== 0 && (
                  <Header as="h3" style={{ color: "transparent" }}>
                    .
                  </Header>
                )}

                <p
                  style={{
                    fontWeight: 700,
                    fontSize: 14,
                    marginLeft: 15,
                    color: "transparent",
                  }}
                >
                  .
                </p>

                {index === 0 && <Header as="h3" style={{ color: colorText }}>Año</Header>}
                {index !== 0 && (
                  <Header as="h3" style={{ color: "transparent" }}>
                    .
                  </Header>
                )}

                <p
                  style={{
                    fontWeight: 700,
                    fontSize: 14,
                    marginLeft: 15,
                    color: "transparent",
                  }}
                >
                  .
                </p>

                {index === 0 && <Header as="h3" style={{ color: colorText }}>Modelo</Header>}
                {index !== 0 && (
                  <Header as="h3" style={{ color: "transparent" }}>
                    .
                  </Header>
                )}

                <p
                  style={{
                    fontWeight: 700,
                    fontSize: 14,
                    marginLeft: 15,
                    color: "transparent",
                  }}
                >
                  .
                </p>

                {index === 0 && <Header as="h3" style={{ color: colorText }}>Estado</Header>}
                {index !== 0 && (
                  <Header as="h3" style={{ color: "transparent" }}>
                    .
                  </Header>
                )}

                <p
                  style={{
                    fontWeight: 700,
                    fontSize: 14,
                    marginLeft: 15,
                    color: "transparent",
                  }}
                >
                  .
                </p>

                {index === 0 && <Header as="h3" style={{ color: colorText }}>Tipo de precio</Header>}
                {index !== 0 && (
                  <Header as="h3" style={{ color: "transparent" }}>
                    .
                  </Header>
                )}

                <p
                  style={{
                    fontWeight: 700,
                    fontSize: 14,
                    marginLeft: 15,
                    color: "transparent",
                  }}
                >
                  .
                </p>

                {index === 0 && <Header as="h3" style={{ color: colorText }}>Cilindraje</Header>}
                {index !== 0 && (
                  <Header as="h3" style={{ color: "transparent" }}>
                    .
                  </Header>
                )}

                <p
                  style={{
                    fontWeight: 700,
                    fontSize: 14,
                    marginLeft: 15,
                    color: "transparent",
                  }}
                >
                  .
                </p>

                {index === 0 && <Header as="h3" style={{ color: colorText }}>Kilometraje</Header>}
                {index !== 0 && (
                  <Header as="h3" style={{ color: "transparent" }}>
                    .
                  </Header>
                )}

                <p
                  style={{
                    fontWeight: 700,
                    fontSize: 14,
                    marginLeft: 15,
                    color: "transparent",
                  }}
                >
                  .
                </p>

                {index === 0 && <Header as="h3" style={{ color: colorText }}>Transmisión</Header>}
                {index !== 0 && (
                  <Header as="h3" style={{ color: "transparent" }}>
                    .
                  </Header>
                )}

                <p
                  style={{
                    fontWeight: 700,
                    fontSize: 14,
                    marginLeft: 15,
                    color: "transparent",
                  }}
                >
                  .
                </p>

                {index === 0 && <Header as="h3" style={{ color: colorText }}>Blindaje</Header>}
                {index !== 0 && (
                  <Header as="h3" style={{ color: "transparent" }}>
                    .
                  </Header>
                )}

                <p
                  style={{
                    fontWeight: 700,
                    fontSize: 14,
                    marginLeft: 15,
                    color: "transparent",
                  }}
                >
                  .
                </p>

                {index === 0 && <Header as="h3" style={{ color: colorText }}>Último dígito Placa</Header>}
                {index !== 0 && (
                  <Header as="h3" style={{ color: "transparent" }}>
                    .
                  </Header>
                )}

                <p
                  style={{
                    fontWeight: 700,
                    fontSize: 14,
                    marginLeft: 15,
                    color: "transparent",
                  }}
                >
                  .
                </p>

                <Divider />

                {index === 0 && <Header as="h2" style={{ color: colorText }}>Descripción</Header>}
                {index !== 0 && (
                  <Header as="h2" style={{ color: "transparent" }}>
                    .
                  </Header>
                )}

                <p
                  style={{
                    fontWeight: 700,
                    fontSize: 14,
                    marginLeft: 15,
                    color: "transparent",
                  }}
                >
                  .
                </p>
              </Grid.Column>
            );
          }
        })}
      </Grid.Row>
    </Grid>
  );
}
