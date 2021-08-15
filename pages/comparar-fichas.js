import React, {useState, useEffect} from 'react'
import PublicLayout from '../layouts/PublicLayout'
import { Container, Header, Responsive, Segment, Button } from 'semantic-ui-react';
import CompareFicha from '../components/comparadores/CompareFicha'
import CompareFichaMobile from '../components/comparadores/CompareFichaMobile'
import { useSelector, useDispatch } from 'react-redux';
import { restartFicha } from '../store/comparadorSlice';
export default function comparar_fichas() {
    const dispatch = useDispatch();
    const cleanSelector = () => {
        dispatch(restartFicha());
        localStorage.setItem("compareFichatecnica", "1")
        window.location.href = '/ficha-tecnica';
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
                    <Button style={{ marginTop: 15 }} primary>Descargar PDF</Button>
                    <br />
                    <Button 
                    onClick={()=> cleanSelector()}
                    style={{ marginTop: 15 }} >Comparar más versiones</Button>
                </Segment>
            </Container>
        </PublicLayout>
    )
}
