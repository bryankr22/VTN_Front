import React, { Component } from 'react';
import {
    Container,
    Grid,
    Header,
    Icon,
    List,
    Responsive,
    Segment,
} from 'semantic-ui-react'

export default class Footer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            config: [],
            urlWpp: '',
            numeroContact: '',
            dateC: '',
        };
    }
    componentDidMount() {
        let dateC = new Date().getFullYear();
        this.setState({
            dateC: dateC
        })
        axios.get('/api/config/all')
            .then(res => {
                this.setState({
                    config: res.data.configuraciones,
                    numeroContact: (res.data.configuraciones.telefono_contacto).trim(),
                    urlWpp: 'https://api.whatsapp.com/send?phone=57' + (res.data.configuraciones.telefono_contacto).trim() + '&text=Hola,%20necesito%20ayuda%20por%20favor.&source=vendetunave.co&data='
                })
            }).catch(error => {
                console.log(error)
            })
    }

    render() {
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
                                        }}
                                        inverted
                                        as='h4'
                                        content='SÍGUENOS'
                                    />
                                    <List link inverted style={{ marginTop: 5 }}>
                                        <List.Item>
                                            <a href='https://instagram.com/vendetunave?igshid=112zj0fxgq16g' target='_blank' style={{ textDecoration: 'none' }}>
                                                <Icon size="big" style={{ color: 'white' }} name='instagram' />
                                            </a>
                                            <a href={this.state.urlWpp} target='_blank' style={{ textDecoration: 'none' }}>
                                                <Icon size="big" style={{ color: 'white' }} name='whatsapp' />
                                            </a>
                                            <a href='https://m.youtube.com/channel/UCAFCTbFIi9lr7bP0zXULcOg' target='_blank' style={{ textDecoration: 'none' }}>
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
                                        }}
                                        inverted
                                        as='h4'
                                        content='CONTÁCTANOS'
                                    />
                                    <List link inverted>
                                        <List.Item style={{ color: 'white' }}>(057) {this.state.numeroContact}</List.Item>
                                        <List.Item style={{ color: 'white', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{(this.state.config.correo_contacto) ? this.state.config.correo_contacto : <br />}</List.Item>
                                    </List>
                                </Grid.Column>
                            </Grid.Row>
                            <Grid.Row>
                                <Grid.Column width={16} style={{ textAlign: 'center' }}>
                                    <img
                                        src="/images/VTN_logo_white.png"
                                        style={{ height: 'auto', width: '70px' }}
                                    />
                                </Grid.Column>
                                <Grid.Column width={4}>
                                    <a
                                        style={{
                                            position: 'fixed',
                                            bottom: 10,
                                            right: 10,
                                            zIndex: 3
                                        }}
                                        href={this.state.urlWpp}
                                        target='_blank'
                                    >
                                        <img
                                            src="/images/vtn_call.png"
                                            style={{ height: 'auto', width: '55px' }}
                                        />
                                    </a>
                                </Grid.Column>
                            </Grid.Row>
                            <Grid.Row>
                                <Grid.Column width={16} style={{ textAlign: 'center' }}>
                                    <p style={{ marginBottom: 2 }}>Copyright { this.state.dateC } - VendeTuNave</p>
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
                                        }}
                                        inverted
                                        as='h4'
                                        content='SÍGUENOS'
                                    />
                                    <List link inverted style={{ marginTop: 5 }}>
                                        <List.Item>
                                            <a href='https://instagram.com/vendetunave?igshid=112zj0fxgq16g' target='_blank' style={{ textDecoration: 'none' }}>
                                                <Icon size="big" style={{ color: 'white' }} name='instagram' />
                                            </a>
                                            <a href={this.state.urlWpp} target='_blank' style={{ textDecoration: 'none' }}>
                                                <Icon size="big" style={{ color: 'white' }} name='whatsapp' />
                                            </a>
                                            <a href='https://m.youtube.com/channel/UCAFCTbFIi9lr7bP0zXULcOg' target='_blank' style={{ textDecoration: 'none' }}>
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
                                        }}
                                        inverted
                                        as='h4'
                                        content='CONTÁCTANOS'
                                    />
                                    <List link inverted>
                                        <List.Item style={{ color: 'white' }}>(057) {this.state.numeroContact}</List.Item>
                                        <List.Item style={{ color: 'white', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{(this.state.config.correo_contacto) ? this.state.config.correo_contacto : <br />}</List.Item>
                                    </List>
                                </Grid.Column>
                            </Grid.Row>
                            <Grid.Row>
                                <Grid.Column width={16} style={{ textAlign: 'center' }}>
                                    <img
                                        src="/images/VTN_logo_white.png"
                                        style={{ height: 'auto', width: '70px' }}
                                    />
                                </Grid.Column>
                                <Grid.Column width={4}>
                                    <a
                                        style={{
                                            position: 'fixed',
                                            bottom: 10,
                                            right: 10,
                                            zIndex: 3
                                        }}
                                        href={this.state.urlWpp}
                                        target='_blank'
                                    >
                                        <img
                                            src="/images/vtn_call.png"
                                            style={{ height: 'auto', width: '55px' }}
                                        />
                                    </a>
                                </Grid.Column>
                            </Grid.Row>
                            <Grid.Row>
                                <Grid.Column width={16} style={{ textAlign: 'center' }}>
                                    <p style={{ marginBottom: 2 }}>Copyright { this.state.dateC } - VendeTuNave</p>
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
                                            borderImage: 'conic-gradient(black, black, white) 1'
                                        }}
                                        inverted
                                        as='h4'
                                        content='SÍGUENOS'
                                    />
                                    <List link inverted style={{ marginTop: 5 }}>
                                        <List.Item>
                                            <a href='https://instagram.com/vendetunave?igshid=112zj0fxgq16g' target='_blank' style={{ textDecoration: 'none' }}>
                                                <Icon size="big" style={{ color: 'white' }} name='instagram' />
                                            </a>
                                            <a href={this.state.urlWpp} target='_blank' style={{ textDecoration: 'none' }}>
                                                <Icon size="big" style={{ color: 'white' }} name='whatsapp' />
                                            </a>
                                            <a href='https://m.youtube.com/channel/UCAFCTbFIi9lr7bP0zXULcOg' target='_blank' style={{ textDecoration: 'none' }}>
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
                                            borderImage: 'conic-gradient(black, black, white) 1'
                                        }}
                                        inverted
                                        as='h4'
                                        content='CONTÁCTANOS'
                                    />
                                    <List link inverted>
                                        <List.Item style={{ color: 'white' }}>(057) {this.state.numeroContact}</List.Item>
                                        <List.Item style={{ color: 'white' }}>{(this.state.config.correo_contacto) ? this.state.config.correo_contacto : <br />}</List.Item>
                                    </List>
                                </Grid.Column>
                                <Grid.Column width={2}>
                                    <img
                                        src="/images/VTN_logo_white.png"
                                        style={{ height: 'auto', width: '116px' }}
                                    />
                                </Grid.Column>
                            </Grid.Row>
                            <Grid.Row>
                                <Grid.Column width={16} style={{ textAlign: 'center' }}>
                                    <a
                                        style={{
                                            position: 'fixed',
                                            bottom: 60,
                                            right: 10
                                        }}
                                        href={this.state.urlWpp}
                                        target='_blank'
                                    >
                                        <img
                                            src="/images/vtn_call.png"
                                            style={{ height: 'auto', width: '55px', position: 'absolute', right: 0 }}
                                        />
                                    </a>
                                </Grid.Column>
                            </Grid.Row>
                            <Grid.Row>
                                <Grid.Column width={16} style={{ textAlign: 'center' }}>
                                    <p style={{ marginBottom: 2 }}>Copyright { this.state.dateC } - VendeTuNave</p>
                                    <a style={{ color: '#fff' }} href='/terminos-y-condiciones'>Términos y Condiciones</a>
                                </Grid.Column>
                            </Grid.Row>
                        </Grid>
                    </Container>
                </Responsive>
            </Segment>
        );
    }
}
