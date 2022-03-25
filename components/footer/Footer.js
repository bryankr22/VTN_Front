import { useState, useEffect } from 'react';
import { Container, Grid, Header, Icon, List, Responsive, Segment } from 'semantic-ui-react';
import axios from 'axios';
import { API_URL, config } from '../../helpers/constants';
import Image from 'next/image'
const Footer = () => {
    const [footer, setFooter] = useState({
        config: [],
        urlWpp: '',
        numeroContact: '',
        dateC: '',
    })
    useEffect(() => {
        let dateC = new Date().getFullYear();
        setFooter({
            ...footer,
            dateC: dateC
        })
        axios.get(API_URL + config).then(res => {
            setFooter({
                ...footer,
                config: res.data.configuraciones,
                numeroContact: (res.data.configuraciones.telefono_contacto).trim(),
                urlWpp: 'https://api.whatsapp.com/send?phone=57' + (res.data.configuraciones.telefono_contacto).trim() + '&text=Hola,%20necesito%20ayuda%20por%20favor.&source=vendetunave.co&data='
            })
        }).catch(error => {
            console.log(error)
        })
    }, [])
    return (
        <Segment inverted vertical style={{ padding: '2em 0em', marginTop: 20, background: 'black' }}>
            <Responsive {...Responsive.onlyMobile}>
                <style>
                    {`
                        .ui.link.list .item, .ui.link.list .item a:not(.ui), .ui.link.list a.item {
                            margin-right: 0 !important;
                        }
                    `}
                </style>
                <Container>
                    <Grid divided inverted>
                        <Grid.Row style={{ textAlign: 'center' }}>
                            <Grid.Column width={16}>
                                <Header
                                    style={{
                                        marginBottom: 9,
                                        paddingBottom: 2,
                                        fontSize: '1.1rem'
                                    }}
                                    inverted
                                    as='h2'
                                    content='SÍGUENOS'
                                />
                                <List link inverted style={{ marginTop: 5 }}>
                                    <List.Item>
                                        <a href='https://instagram.com/vendetunave?igshid=112zj0fxgq16g' target='_blank' rel="noreferrer" style={{ textDecoration: 'none' }}>
                                            <Icon size="big" style={{ color: 'white' }} name='instagram' />
                                        </a>
                                        <a href={footer.urlWpp} target='_blank' rel="noreferrer" style={{ textDecoration: 'none' }}>
                                            <Icon size="big" style={{ color: 'white' }} name='whatsapp' />
                                        </a>
                                        <a href='https://m.youtube.com/channel/UCAFCTbFIi9lr7bP0zXULcOg' target='_blank' rel="noreferrer" style={{ textDecoration: 'none' }}>
                                            <Icon size="big" style={{ color: 'white' }} name='youtube' />
                                        </a>
                                    </List.Item>
                                </List>
                            </Grid.Column>
                            <Grid.Column style={{ marginTop: 15 }} width={16}>
                                <Header
                                    style={{
                                        marginBottom: 9,
                                        paddingBottom: 2,
                                        fontSize: '1.1rem'
                                    }}
                                    inverted
                                    as='h2'
                                    content='CONTÁCTANOS'
                                />
                                <List link inverted>
                                    <List.Item style={{ color: 'white' }}>(057) {footer.numeroContact}</List.Item>
                                    <List.Item style={{ color: 'white', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{(footer.config.correo_contacto) ? footer.config.correo_contacto : <br />}</List.Item>
                                </List>
                            </Grid.Column>
                        </Grid.Row>
                        <Grid.Row>
                            <Grid.Column width={16} style={{ textAlign: 'center' }}>
                                <div
                                    className={'image-container'}
                                >
                                    <Image
                                        layout='fill'
                                        alt="VTN_logo_white"
                                        className={'imglogo'}
                                        src="/images/VTN_logo_white.png"
                                    />
                                </div>
                            </Grid.Column>
                            <Grid.Column width={4}>
                                <a
                                    style={{
                                        position: 'fixed',
                                        bottom: 10,
                                        right: 10,
                                        zIndex: 3
                                    }}
                                    href={footer.urlWpp}
                                    target='_blank'
                                    rel="noreferrer"
                                >
                                    <Image
                                        width="55px"
                                        height="55px"
                                        alt="call button"
                                        src="/images/vtn_call.png"
                                        style={{ height: 'auto', width: '55px' }}
                                    />
                                </a>
                            </Grid.Column>
                        </Grid.Row>
                        <Grid.Row>
                            <Grid.Column width={16} style={{ textAlign: 'center' }}>
                                <p style={{ marginBottom: 2 }}>Copyright {footer.dateC} - VendeTuNave</p>
                                <a style={{ color: '#fff' }} href='/terminos-y-condiciones'>Términos y Condiciones</a>
                            </Grid.Column>
                        </Grid.Row>
                    </Grid>
                </Container>
            </Responsive>
            <Responsive {...Responsive.onlyTablet}>
                <Container>
                    <style>
                        {`
                            .ui.link.list .item, .ui.link.list .item a:not(.ui), .ui.link.list a.item {
                                margin-right: 0 !important;
                            }
                        `}
                    </style>
                    <Grid divided inverted>
                        <Grid.Row style={{ textAlign: 'center' }}>
                            <Grid.Column width={8}>
                                <Header
                                    style={{
                                        marginBottom: 9,
                                        paddingBottom: 2,
                                        fontSize: '1.1rem'
                                    }}
                                    inverted
                                    as='h2'
                                    content='SÍGUENOS'
                                />
                                <List link inverted style={{ marginTop: 5 }}>
                                    <List.Item>
                                        <a href='https://instagram.com/vendetunave?igshid=112zj0fxgq16g' target='_blank' rel="noreferrer" style={{ textDecoration: 'none' }}>
                                            <Icon size="big" style={{ color: 'white' }} name='instagram' />
                                        </a>
                                        <a href={footer.urlWpp} target='_blank' rel="noreferrer" style={{ textDecoration: 'none' }}>
                                            <Icon size="big" style={{ color: 'white' }} name='whatsapp' />
                                        </a>
                                        <a href='https://m.youtube.com/channel/UCAFCTbFIi9lr7bP0zXULcOg' target='_blank' rel="noreferrer" style={{ textDecoration: 'none' }}>
                                            <Icon size="big" style={{ color: 'white' }} name='youtube' />
                                        </a>
                                    </List.Item>
                                </List>
                            </Grid.Column>
                            <Grid.Column width={8}>
                                <Header
                                    style={{
                                        marginBottom: 9,
                                        paddingBottom: 2,
                                        fontSize: '1.1rem'
                                    }}
                                    inverted
                                    as='h2'
                                    content='CONTÁCTANOS'
                                />
                                <List link inverted>
                                    <List.Item style={{ color: 'white' }}>(057) {footer.numeroContact}</List.Item>
                                    <List.Item style={{ color: 'white', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{(footer.config.correo_contacto) ? footer.config.correo_contacto : <br />}</List.Item>
                                </List>
                            </Grid.Column>
                        </Grid.Row>
                        <Grid.Row>
                            <Grid.Column width={16} style={{ textAlign: 'center' }}>
                                <div
                                    className={'image-container'}
                                >
                                    <Image
                                        layout='fill'
                                        alt="VTN_logo_white"
                                        className={'imglogo'}
                                        src="/images/VTN_logo_white.png"
                                    />
                                </div>
                            </Grid.Column>
                            <Grid.Column width={4}>
                                <a
                                    style={{
                                        position: 'fixed',
                                        bottom: 10,
                                        right: 10,
                                        zIndex: 3
                                    }}
                                    href={footer.urlWpp}
                                    target='_blank'
                                    rel="noreferrer"
                                >
                                    <Image
                                        width="55px"
                                        height="55px"
                                        alt="call button"
                                        src="/images/vtn_call.png"
                                        style={{ height: 'auto', width: '55px' }}
                                    />
                                </a>
                            </Grid.Column>
                        </Grid.Row>
                        <Grid.Row>
                            <Grid.Column width={16} style={{ textAlign: 'center' }}>
                                <p style={{ marginBottom: 2 }}>Copyright {footer.dateC} - VendeTuNave</p>
                                <a style={{ color: '#fff' }} href='/terminos-y-condiciones'>Términos y Condiciones</a>
                            </Grid.Column>
                        </Grid.Row>
                    </Grid>
                </Container>
            </Responsive>
            <Responsive {...Responsive.onlyComputer}>
                <Container>
                    <Grid divided inverted>
                        <Grid.Row>
                            <Grid.Column width={7}>
                                <Header
                                    style={{
                                        marginBottom: 9,
                                        paddingBottom: 2,
                                        borderBottom: '1px solid',
                                        borderImage: 'conic-gradient(black, black, white) 1',
                                        fontSize: '1.1rem'
                                    }}
                                    inverted
                                    as='h2'
                                    content='SÍGUENOS'
                                />
                                <List link inverted style={{ marginTop: 5 }}>
                                    <List.Item>
                                        <a href='https://instagram.com/vendetunave?igshid=112zj0fxgq16g' target='_blank' rel="noreferrer" style={{ textDecoration: 'none' }}>
                                            <Icon size="big" style={{ color: 'white' }} name='instagram' />
                                        </a>
                                        <a href={footer.urlWpp} target='_blank' rel="noreferrer" style={{ textDecoration: 'none' }}>
                                            <Icon size="big" style={{ color: 'white' }} name='whatsapp' />
                                        </a>
                                        <a href='https://m.youtube.com/channel/UCAFCTbFIi9lr7bP0zXULcOg' target='_blank' rel="noreferrer" style={{ textDecoration: 'none' }}>
                                            <Icon size="big" style={{ color: 'white' }} name='youtube' />
                                        </a>
                                    </List.Item>
                                </List>
                            </Grid.Column>
                            <Grid.Column width={7}>
                                <Header
                                    style={{
                                        marginBottom: 9,
                                        paddingBottom: 2,
                                        borderBottom: '1px solid',
                                        borderImage: 'conic-gradient(black, black, white) 1',
                                        fontSize: '1.1rem'
                                    }}
                                    inverted
                                    as='h2'
                                    content='CONTÁCTANOS'
                                />
                                <List link inverted>
                                    <List.Item style={{ color: 'white' }}>(057) {footer.numeroContact}</List.Item>
                                    <List.Item style={{ color: 'white' }}>{(footer.config.correo_contacto) ? footer.config.correo_contacto : <br />}</List.Item>
                                </List>
                            </Grid.Column>
                            <Grid.Column width={2}>
                                <div
                                    className={'image-container-footer'}
                                >
                                    <Image
                                        layout='fill'
                                        alt="VTN_logo_white"
                                        className={'imglogo'}
                                        src="/images/VTN_logo_white.png"
                                    />
                                </div>
                            </Grid.Column>
                        </Grid.Row>
                        <Grid.Row>
                            <Grid.Column width={16} style={{ textAlign: 'center', zIndex: 10 }}>
                                <a
                                    style={{
                                        position: 'fixed',
                                        bottom: 60,
                                        right: 10
                                    }}
                                    href={footer.urlWpp}
                                    target='_blank'
                                    rel="noreferrer"
                                >
                                    <Image
                                        width="55px"
                                        height="55px"
                                        alt="call button"
                                        src="/images/vtn_call.png"
                                        style={{ height: 'auto', width: '55px', position: 'absolute', right: 0 }}
                                    />
                                </a>
                            </Grid.Column>
                        </Grid.Row>
                        <Grid.Row>
                            <Grid.Column width={16} style={{ textAlign: 'center' }}>
                                <p style={{ marginBottom: 2 }}>Copyright {footer.dateC} - VendeTuNave</p>
                                <a style={{ color: '#fff' }} href='/terminos-y-condiciones'>Términos y Condiciones</a>
                            </Grid.Column>
                        </Grid.Row>
                    </Grid>
                </Container>
            </Responsive>
        </Segment>
    );

}
export default Footer;