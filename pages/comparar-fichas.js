import React, {useState, useEffect} from 'react'
import PublicLayout from '../layouts/PublicLayout'
import { Container, Header, Responsive, Segment, Button } from 'semantic-ui-react';
import CompareFicha from '../components/comparadores/CompareFicha'
import CompareFichaMobile from '../components/comparadores/CompareFichaMobile'
import { useSelector, useDispatch } from 'react-redux';
import { restartFicha } from '../store/comparadorSlice';
import { API_URL, download_ficha } from '../helpers/constants';
import axios from 'axios';
export default function comparar_fichas() {
    const dispatch = useDispatch();
    const compareList = useSelector(({ comparador }) => comparador.fichas);
    const cleanSelector = () => {
        dispatch(restartFicha());
        localStorage.setItem("compareFichatecnica", "1")
        window.location.href = '/ficha-tecnica';
    }
    const downloadAction = () => {
        var data = [];
        compareList.forEach(elemt => {
            data.push(elemt.id);
        });
        axios.post(API_URL + download_ficha, { data }, {
            headers: {
                'Accept': 'application/pdf',
            },
            responseType: 'blob',
        }).then(res => {
            const url = window.URL.createObjectURL(new Blob([res.data]));
            const link = document.createElement('a');
            link.href = url;
            let f = new Date();
            link.setAttribute('download', `VendeTuNave_${f.getDate() + "-" + (f.getMonth() + 1) + "-" + f.getFullYear()}.pdf`);
            document.body.appendChild(link);
            link.click();
        }).catch(error => {
            console.log(error)
        })
    }
    return (
        <PublicLayout>
            <Container style={{ paddingTop: 25, paddingLeft: 20, paddingRight: 20 }} fluid>
                <Header as='h1'>Resultados de comparación</Header>
                <Responsive {...Responsive.onlyMobile}>
                    <Container style={{ paddingLeft: 0, paddingRight: 0, overflowX: 'auto', overflowY: 'hidden' }} fluid>
                        <CompareFichaMobile />
                    </Container>
                </Responsive>
                <Responsive {...Responsive.onlyTablet}>
                    <Container style={{ paddingLeft: 0, paddingRight: 0 }} fluid>
                        <CompareFichaMobile />
                    </Container>
                </Responsive>
                <Responsive {...Responsive.onlyComputer}>
                    <CompareFicha />
                </Responsive>
                <Segment vertical style={{ textAlign: 'center' }}>
                    { compareList.length > 0 ?
                        <Button 
                        onClick={()=> downloadAction() }
                        style={{ marginTop: 15 }} primary>Descargar PDF</Button>
                    : null}
                    <br />
                    <Button 
                    onClick={()=> cleanSelector()}
                    style={{ marginTop: 15 }} >Comparar más versiones</Button>
                </Segment>
            </Container>
        </PublicLayout>
    )
}
