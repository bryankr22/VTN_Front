import React from 'react';
import Head from "next/head";

import PublicLayout from '../layouts/PublicLayout';
import ContentHome from '../components/home/ContentHome';
import NoticiasHome from '../components/home/NoticiasHome';
import MarcasHome from '../components/home/MarcasHome';
import CategoriasHome from '../components/home/CategoriasHome';
import FiltersHome from '../components/home/FiltersHome';
import SliderHome from '../components/home/SliderHome';
import DestacadosHome from '../components/home/DestacadosHome';

import axios from 'axios';
import { API_URL, home } from '../helpers/constants';

const Home = ({ vehiculos, slider, sliderMobile, categorias, marcas, noticias, filters, config}) => {
    return(
        <PublicLayout>
            <Head>
                <meta property="keywords" content="vende tu nave, carros en venta, carros de segunda, mercado libre carros, venta de carros usados y nuevos, compra y venta de carros, compra y venta motos, venta de carros" />
            </Head>
            <SliderHome slider={slider} sliderMobile={sliderMobile}/>
            <FiltersHome options={filters}/>
            <CategoriasHome categorias={categorias}/>
            <MarcasHome marcas={marcas}/>
            <DestacadosHome vehiculos={vehiculos}/>
            <NoticiasHome noticias={noticias}/>
            <ContentHome config={config} />
        </PublicLayout>
    );
}

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
    }
    return {
        props: {
            vehiculos,
            slider,
            sliderMobile,
            categorias,
            marcas,
            noticias,
            filters,
            config
        }
    }
}
  
export default Home;
