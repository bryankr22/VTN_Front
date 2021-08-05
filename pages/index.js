import React from 'react';
import loadable from '@loadable/component';

const PublicLayout = loadable(() => import('../layouts/PublicLayout'));
const ContentHome = loadable(() => import('../components/home/ContentHome'));
const NoticiasHome = loadable(() => import('../components/home/NoticiasHome'));
const MarcasHome = loadable(() => import('../components/home/MarcasHome'));
const CategoriasHome = loadable(() => import('../components/home/CategoriasHome'));
const FiltersHome = loadable(() => import('../components/home/FiltersHome'));
const SliderHome = loadable(() => import('../components/home/SliderHome'));
const DestacadosHome = loadable(() => import('../components/home/DestacadosHome'));

//import PublicLayout from '../layouts/PublicLayout';
//import ContentHome from '../components/home/ContentHome';
//import NoticiasHome from '../components/home/NoticiasHome';
//import MarcasHome from '../components/home/MarcasHome';
//import CategoriasHome from '../components/home/CategoriasHome';
//import FiltersHome from '../components/home/FiltersHome';
//import SliderHome from '../components/home/SliderHome';
//import DestacadosHome from '../components/home/DestacadosHome';

import axios from 'axios';
import { API_URL, home } from '../helpers/constants';

const Home = ({ vehiculos, slider, sliderMobile, categorias, marcas, noticias, filters}) => {
    return(
        <PublicLayout>
            <SliderHome slider={slider} sliderMobile={sliderMobile}/>
            <FiltersHome options={filters}/>
            <CategoriasHome categorias={categorias}/>
            <MarcasHome marcas={marcas}/>
            <DestacadosHome vehiculos={vehiculos}/>
            <NoticiasHome noticias={noticias}/>
            <ContentHome />
        </PublicLayout>
    );
}
export async function getStaticProps() {
    const res = await axios.get(API_URL + home);
    const vehiculos = await res.data.vehiculos_promocion;
    const slider = await res.data.banners;
    const sliderMobile = await res.data.bannersMobile;
    const categorias = await res.data.categories;
    const marcas = await res.data.marcas;
    const noticias = await res.data.noticias;
    let optionsCategories = [];
    await res.data.categories.forEach(function (item) {
        optionsCategories.push({
            key: item.id,
            value: item.slug,
            text: item.nombre
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
            value: item.nombre,
            text: item.nombre,
        });
    });
    const filters = {
        optionsCategories,
        optionsAnios,
        optionsAniosDesde,
        optionsAniosHasta,
        optionsMarcas,
    }
    return {
        props: {
            vehiculos,
            slider,
            sliderMobile,
            categorias,
            marcas,
            noticias,
            filters
        }
    }
}
  
export default Home;
