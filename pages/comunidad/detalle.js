import React from 'react'
import PublicLayout from '../../layouts/PublicLayout';
import { Container, Header, Form, Button, Label, Item, TextArea, Responsive, Comment } from 'semantic-ui-react'
export default function detalle() {
    return (
        <PublicLayout>
            <Container style={{ paddingTop: 25 }} text>
                <Header as='h2'>COMUNIDAD</Header>
                <Header as='h5'>DATAUSER</Header>
                <Header as='h3' dividing>TITULO</Header>
                <p>
                    DESCRIPTION
                </p>
                <div style={{ paddingBottom: '30px' }}>
                    <Label as='a' tag>TAG1</Label>
                    <Label as='a' tag>TAG2</Label>
                </div>
                {/**localStorage.getItem('logged') == '1' &&
                    <Form>
                        <TextArea onChange={(e) => this.setState({ comentario: e.target.value })} style={{ minHeight: 100, marginBottom: 10 }} placeholder='Comentario...' />
                        <Button onClick={this.handleSubmit} primary floated='right' style={{ marginBottom: 10 }}>ENVIAR COMENTARIO</Button>
                    </Form>
                **/}
                <Responsive {...Responsive.onlyComputer}>
                    <Item.Group divided>
                        <Item>
                            <Responsive {...Responsive.onlyComputer} style={{ marginRight: 20 }}>
                                <Item.Image size='tiny' src={'https://via.placeholder.com/150'} />
                            </Responsive>

                            <Item.Content>
                                <Item.Extra style={{ textAlign: 'left', color: 'black', margin: 0, marginLeft: -10 }}>
                                    USUARIO
                                </Item.Extra>
                                <Item.Meta>RESPUESTA</Item.Meta>
                                <Item.Extra style={{ textAlign: 'right', color: 'black' }}>
                                    Respondido el DATA-FECHA
                                </Item.Extra>
                            </Item.Content>
                        </Item>
                    </Item.Group>
                </Responsive>
                
                <Responsive {...Responsive.onlyMobile}>
                    <Comment.Group style={{ marginTop: 45 }}>
                        <Comment>
                            <Comment.Avatar src={'https://via.placeholder.com/150'} />
                            <Comment.Content>
                                <Comment.Author as='a'>USUARIO</Comment.Author>
                                <Comment.Metadata>
                                    <div>Respondido el DATAFECHA</div>
                                </Comment.Metadata>
                                <Comment.Text>DATARESPUESTA</Comment.Text>
                            </Comment.Content>
                        </Comment>
                    </Comment.Group>
                </Responsive>
                <Responsive {...Responsive.onlyTablet}>
                    <Comment.Group style={{ marginTop: 45 }}>
                        <Comment>
                            <Comment.Avatar src={'https://via.placeholder.com/150'} />
                            <Comment.Content>
                                <Comment.Author as='a'>USUARIO</Comment.Author>
                                <Comment.Metadata>
                                    <div>Respondido el DATAFECHA</div>
                                </Comment.Metadata>
                                <Comment.Text>DATARESPUESTA</Comment.Text>
                            </Comment.Content>
                        </Comment>
                    </Comment.Group>
                </Responsive>
            </Container>
        </PublicLayout>
    )
}
