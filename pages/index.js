import Head from "next/head";
import { useSelector, useDispatch } from 'react-redux';
import loadable from '@loadable/component';

import PublicLayout from "../layouts/PublicLayout";
import NoticiasHome from "../components/home/NoticiasHome";
import MarcasHome from "../components/home/MarcasHome";
// import CategoriasHome from "../components/home/CategoriasHome";
import FiltersHome from "../components/home/FiltersHome";
import DestacadosHome from "../components/home/DestacadosHome";
import SliderHome from "../components/home/SliderHome"
import ContentHome from "../components/home/ContentHome";

import axios from "axios";
import { API_URL, home } from "../helpers/constants";
import { Responsive, Button } from "semantic-ui-react";
import { changeMode } from "../store/darkMode";
import { dark, light } from "../helpers/colors";

const CategoriasHome = loadable(() => import('../components/home/CategoriasHome'), {
  fallback: <div>...</div>
});

const Home = ({
  vehiculos,
  slider,
  sliderMobile,
  categorias,
  marcas,
  noticias,
  filters,
  config,
}) => {
  const dispatch = useDispatch();
  const darkMode = useSelector(({ darkMode }) => darkMode.status);
  const statusMode = darkMode === dark ? light : dark;

  return (
    <PublicLayout darkMode={darkMode}>
      <style>
        {`
          html {
            background-color: ${darkMode}
          }
          #dark-mode-button:hover {
            right: 5px !important;
            transition: width 1s ease 0s, right 0.8s ease 0s;
          }
        `}
      </style>
      <Head>
        <meta
          property="keywords"
          content="vende tu nave, carros en venta, carros de segunda, mercado libre carros, venta de carros usados y nuevos, compra y venta de carros, compra y venta motos, venta de carros"
        />
      </Head>
      <Responsive {...Responsive.onlyMobile}>
        <Button.Group
          vertical
          labeled
          icon
          style={{
            position: 'fixed',
            right: -175,
            zIndex: 4,
            cursor: 'pointer',
            top: '30%'
          }}
        >
          <Button onClick={() => dispatch(changeMode(statusMode))} size='big' icon='adjust' content='Modo Oscuro' />
        </Button.Group>
      </Responsive>
      <Responsive {...Responsive.onlyTablet}>
        <Button.Group
          vertical
          labeled
          icon
          style={{
            position: 'fixed',
            right: -175,
            zIndex: 4,
            cursor: 'pointer',
            top: '30%'
          }}
        >
          <Button onClick={() => dispatch(changeMode(statusMode))} size='big' icon='adjust' content='Modo Oscuro' />
        </Button.Group>
      </Responsive>
      <Responsive {...Responsive.onlyComputer}>
        <Button.Group
          id="dark-mode-button"
          vertical
          labeled
          icon
          style={{
            position: 'fixed',
            right: -175,
            zIndex: 4,
            cursor: 'pointer',
            top: '30%'
          }}
        >
          <Button onClick={() => dispatch(changeMode(statusMode))} size='big' icon='adjust' content='Modo Oscuro' />
        </Button.Group>
      </Responsive>
      {/* <Image
        onClick={() => dispatch(changeMode(statusMode))}
        width="30px"
        height="30px"
        alt="dark mode button"
        src="/images/dark_mode.png"
        style={{ height: 'auto', width: 30, position: 'absolute', right: 10, zIndex: 1, filter: 'invert(1)', cursor: 'pointer', top: 10 }}
      /> */}
      <SliderHome slider={slider} sliderMobile={sliderMobile} />
      <FiltersHome options={filters} />
      <CategoriasHome categorias={categorias} />
      <MarcasHome marcas={marcas} />
      <DestacadosHome vehiculos={vehiculos} />
      <NoticiasHome noticias={noticias} />
      <ContentHome config={config} />
    </PublicLayout>
  );
};

export async function getServerSideProps() {
  const res = await axios.get(API_URL + home);
  const vehiculos = await res.data.vehiculos_promocion;
  const slider = await res.data.banners;
  const sliderMobile = await res.data.bannersMobile;
  const categorias = await res.data.categories;
  const marcas = await res.data.marcas;
  const noticias = await res.data.noticias;
  const config = res.data.config;
  let optionsCategories = [];
  await res.data.categories.forEach(function (item) {
    optionsCategories.push({
      key: item.id,
      value: item.slug,
      text: item.nombre,
    });
  });
  let optionsAnios = [{ key: "", value: "", text: "Años" }];
  await res.data.anios.forEach(function (item) {
    optionsAnios.push({ key: item.ano, value: item.ano, text: item.ano });
  });
  let optionsAniosDesde = [{ key: "", value: "", text: "Desde" }];
  await res.data.anios.forEach(function (item) {
    optionsAniosDesde.push({
      key: item.ano,
      value: item.ano,
      text: item.ano,
    });
  });
  let optionsAniosHasta = [{ key: "", value: "", text: "Hasta" }];
  await res.data.anios.forEach(function (item) {
    optionsAniosHasta.push({
      key: item.ano,
      value: item.ano,
      text: item.ano,
    });
  });
  let optionsMarcas = [{ key: "", value: "", text: "Marca" }];
  await res.data.marcasFil.forEach(function (item) {
    optionsMarcas.push({
      key: item.id,
      value: item.id,
      text: item.nombre,
    });
  });
  const filters = {
    optionsCategories,
    optionsAnios,
    optionsAniosDesde,
    optionsAniosHasta,
    optionsMarcas,
  };
  return {
    props: {
      vehiculos,
      slider,
      sliderMobile,
      categorias,
      marcas,
      noticias,
      filters,
      config,
    },
  };
}

export default Home;
