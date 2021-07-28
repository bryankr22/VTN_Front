import React, {useEffect} from 'react';
import PublicLayout from '../layouts/PublicLayout';
import ContentHome from '../components/home/ContentHome';
import NoticiasHome from '../components/home/NoticiasHome';
import MarcasHome from '../components/home/MarcasHome';
import CategoriasHome from '../components/home/CategoriasHome';
import FiltersHome from '../components/home/FiltersHome';
import SliderHome from '../components/home/SliderHome';
import DestacadosHome from '../components/home/DestacadosHome';
import axios from 'axios';

import { useDispatch } from "react-redux";
import { updateHome } from '../store/homeSlice';
import { API_URL, home } from '../helpers/constants';

const Home = ({ vehiculos, slider, sliderMobile, categorias, marcas, noticias}) => {
    const dispatch = useDispatch();
    const fetchHome = () => {
        axios.get(API_URL + home).then((res) => {
            let optionsCategories = [];
            res.data.categories.forEach(function (item) {
                optionsCategories.push({
                    key: item.nombre .split(" ") .join("-") .split("?") .join("") + "_" + item.id,
                    value: item.nombre .split(" ") .join("-") .split("?") .join("") + "_" + item.id,
                    text: item.nombre,
                });
            });
            let optionsAnios = [{ key: "", value: "", text: "Años" }];
            res.data.anios.forEach(function (item) {
                optionsAnios.push({ key: item.ano, value: item.ano, text: item.ano });
            });
            let optionsAniosDesde = [{ key: "", value: "", text: "Desde" }];
            res.data.anios.forEach(function (item) {
                optionsAniosDesde.push({
                    key: item.ano,
                    value: item.ano,
                    text: item.ano,
                });
            });
            let optionsAniosHasta = [{ key: "", value: "", text: "Hasta" }];
            res.data.anios.forEach(function (item) {
                optionsAniosHasta.push({
                    key: item.ano,
                    value: item.ano,
                    text: item.ano,
                });
            });
            let optionsMarcas = [{ key: "", value: "", text: "Marca" }];
            res.data.marcasFil.forEach(function (item) {
                optionsMarcas.push({
                    key: item.nombre .split(" ") .join("-") .split("?") .join("") + "_" + item.id,
                    value: item.nombre .split(" ") .join("-") .split("?") .join("") + "_" + item.id,
                    text: item.nombre,
                });
            });
            dispatch(updateHome({
                optionsMarcas,
                categories: res.data.categories,
                vehiculos_promocion: res.data.vehiculos_promocion,
                banners: res.data.banners,
                bannersMobile: res.data.bannersMobile,
                marcas: res.data.marcas,
                noticias: res.data.noticias,
                link_video: res.data.config.link_video,
                optionsCategories,
                optionsAnios,
                optionsAniosDesde,
                optionsAniosHasta,
            }));
        }).catch((error) => {
            return false;
        });
    }
    useEffect(() => {
        //fetchHome();
    }, [])
    return(
        <PublicLayout>
            <SliderHome slider={slider} sliderMobile={sliderMobile}/>
            <FiltersHome />
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
    return {
        props: {
            vehiculos,
            slider,
            sliderMobile,
            categorias,
            marcas,
            noticias
        }
    }
}
  
export default Home;
