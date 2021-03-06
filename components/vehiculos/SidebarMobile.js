import { useRouter } from "next/router";
import React, { useState, useEffect } from "react";
import { Input, Header, Button, Container, Image, Grid } from "semantic-ui-react";
import { Link } from '@mui/material';
import { light } from "../../helpers/colors";
import ActiveTagsVehiculos from "./ActiveTagsVehiculos";
import ModalFiltersMobile from "./modals/ModalFiltersMobile";
import ModalOrderMobile from "./modals/ModalOrderMobile";
import ModalTechCardFilter from "./modals/ModalTechCardFilter";
import { Instagram as InstagramIcon, Facebook as FacebookIcon } from '@mui/icons-material';

export default function SidebarMobile({
  colorText,
  params,
  contadores,
  vehiculos,
  vendedor,
  isFicha,
}) {
  const [modalOrder, setModalOrder] = useState(false);
  const [modalFilter, setModalFilter] = useState(false);
  const [query, setQuery] = useState("");
  const router = useRouter();
  const handleKeyDown = (e) => {
    if (e.keyCode === 13) {
      handleSubmit();
    }
  };

  const handleSubmit = () => {
    if (!isFicha) {
      router.push("/vehiculos?q=" + query);
    } else {
      router.push("/ficha-tecnica?q=" + query);
    }
  };

  useEffect(() => {
    setQuery(params.q)
  }, []);

  return (
    <>
      {params.vendedor && vendedor &&
        <Container style={{ marginTop: 15 }}>
          <style>
            {`
                .icons {
                    ${colorText === light && 'filter: invert(1);'}
                }
            `}
          </style>
          <Grid>
            <Grid.Row>
              <Grid.Column width={7}>
                <Image
                  src={
                    vendedor.image == 0
                      ? "/images/logo_user.png"
                      : "https://vendetunave.s3.amazonaws.com/vendetunave/images/usuarios/" +
                      vendedor.image
                  }
                  size="small"
                  circular
                  bordered
                  style={{ height: 130, width: 130, margin: '0 auto', backgroundColor: light, objectFit: 'cover' }}
                  alt="Imagen de usuario"
                />
              </Grid.Column>
              <Grid.Column width={9}>
                <Header
                  as="h1"
                  style={{ textTransform: "uppercase", color: colorText, marginBottom: 2, fontSize: '1.28571429rem', wordWrap: 'break-word' }}
                >
                  {vendedor.nombre}
                  {vendedor.confiable ? (
                    <Image
                      src="/images/verified_icon.png"
                      alt="verified icon"
                      style={{ width: 17, height: 16, margin: '-5px 0 0 3px' }}
                    />
                  ) : null}
                </Header>
                <p
                  style={{ color: colorText, margin: 0 }}
                >
                  Veh??culos publicados: {contadores.total_records}
                </p>

                {vendedor.website && vendedor.website != "null" &&
                  <a href={'https://' + (vendedor.website).replace('https://', '')} target="_blank" rel="noreferrer" style={{ textDecoration: 'none', color: colorText, cursor: 'pointer', marginBottom: 5, display: 'block' }}>
                    {vendedor.website}
                  </a>
                }
                {vendedor.telefono && vendedor.telefono != "null" &&
                  <a href={"https://api.whatsapp.com/send?phone=57" + vendedor.telefono + "&text=Hola,%20estoy%20interesado.&source=vendetunave.co&data="} target="_blank" rel="noreferrer">
                    {vendedor.telefono}
                  </a>
                }

                <div>
                  {vendedor.facebook && vendedor.facebook != "null" &&
                    <Link
                      component="a"
                      underline='none'
                      target="_blank"
                      href={'https://' + (vendedor.facebook).replace('https://', '')}
                    >
                      <FacebookIcon style={{ color: colorText, margin: '0 2px' }} />
                    </Link>
                  }
                  {vendedor.instagram && vendedor.instagram != "null" &&
                    <Link
                      component="a"
                      underline='none'
                      target="_blank"
                      href={'https://' + (vendedor.instagram).replace('https://', '')}
                    >
                      <InstagramIcon style={{ color: colorText, margin: '0 3px' }} />
                    </Link>
                  }
                  {vendedor.tiktok && vendedor.tiktok != "null" && <Image style={{ width: 19, height: 19, margin: '0 2px' }} as='a' href={'https://' + (vendedor.tiktok).replace('https://', '')} alt="icono tiktok" target='_blank' className="icons" src="/images/tiktok-logo.png" />}
                </div>
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </Container>
      }
      <style>
        {`
              
              #search-responsive {
                  color: ${colorText};
                  border-top: none;
                  border-right: none;
                  border-bottom: 1px solid ${colorText} !important;
                  border-left: none;
                  border-radius: 0;
                  background-color: transparent;
              }
              #search-responsive::placeholder {
                  color: ${colorText} !important;
                  text-align: center;
                  letter-spacing: 3px;
              }
              #search-responsive + i {
                  color: ${colorText};
                  opacity: 1;
              }
            `}
      </style>
      {!params.vendedor &&
        <Input
          action={{
            icon: "search",
            style: {
              background: "transparent",
              borderBottom: `1px solid ${colorText}`,
              color: colorText,
              height: 47,
              paddingTop: 10,
            },
            onClick: () => handleSubmit(),
          }}
          onChange={(e, { value }) => setQuery(value)}
          onKeyDown={(e) => handleKeyDown(e)}
          fluid
          value={query}
          id="search-responsive"
          style={{ margin: "10px 20px 0 20px" }}
          className="search-input"
          placeholder="??Qu?? estas buscando?"
        />
      }
      <Header style={{ margin: 10, color: colorText }} as="h3">
        {!params.vendedor &&
          <>{contadores.total_records} resultados</>
        }
        <Button
          style={{
            border: "1px solid #2185d0",
            padding: ".78571429em 10px",
            marginBottom: !params.vendedor ? 0 : 10
          }}
          fluid={!!params.vendedor}
          floated="right"
          color="blue"
          onClick={() => setModalFilter(true)}
        >
          FILTRAR
        </Button>
        {!isFicha ? (
          <ModalFiltersMobile
            params={params}
            vendedor={vendedor}
            filtros={contadores}
            showModal={modalFilter}
            onClose={() => setModalFilter(!modalFilter)}
          />
        ) : (
          <ModalTechCardFilter
            params={params}
            filtros={contadores}
            showModal={modalFilter}
            onClose={() => setModalFilter(!modalFilter)}
          />
        )}
        <Button
          style={{
            border: "1px solid",
            background: "transparent",
            color: "#2185d0",
            padding: ".78571429em 5px",
            marginBottom: !params.vendedor ? 0 : 10
          }}
          fluid={!!params.vendedor}
          floated="right"
          color="blue"
          onClick={() => setModalOrder(true)}
        >
          Ordenar
        </Button>
        <ModalOrderMobile
          isFicha={isFicha}
          showModal={modalOrder}
          onClose={() => setModalOrder(!modalOrder)}
        />
      </Header>
      <Container style={{ marginBottom: 10 }}>
        <ActiveTagsVehiculos tags={params} />
      </Container>
    </>
  );
}
