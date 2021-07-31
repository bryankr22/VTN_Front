import React from 'react'
import PublicLayout from '../../../layouts/PublicLayout';
import { Container, Header, Form, Button, Label, Item, TextArea, Responsive, Comment } from 'semantic-ui-react'
import axios from 'axios';
export default function detalle({ data }) {
    const userImagePre = 'data:image/jpeg;base64,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';
    const pathS3 = "https://d3bmp4azzreq60.cloudfront.net/fit-in/300x300/vendetunave/images/usuarios/";
    return (
        <PublicLayout>
            <Container style={{ paddingTop: 25 }} text>
                <Header as='h2'>COMUNIDAD</Header>
                <Header as='h5'>{data.pregunta.nombre}</Header>
                <Header as='h3' dividing>{data.pregunta.titulo}</Header>

                <p>
                    {data.pregunta.descripcion}
                </p>

                <div style={{ paddingBottom: '30px' }}>
                    {(data.tags).map((itemTag) =>
                        <Label as='a' tag>{itemTag.tag}</Label>
                    )}
                </div>

                {/**localStorage.getItem('logged') == '1' &&
                    <Form>
                        <TextArea onChange={(e) => this.setState({ comentario: e.target.value })} style={{ minHeight: 100, marginBottom: 10 }} placeholder='Comentario...' />
                        <Button onClick={this.handleSubmit} primary floated='right' style={{ marginBottom: 10 }}>ENVIAR COMENTARIO</Button>
                    </Form>
                **/}
                <Responsive {...Responsive.onlyComputer}>
                    <Item.Group divided>
                        {(data.respuestas).map((item) =>
                            <Item>
                                <Responsive {...Responsive.onlyComputer} style={{ marginRight: 20 }}>
                                    <Item.Image size='tiny' src={(item.image == 0) ? userImagePre : pathS3 + item.image} />
                                </Responsive>

                                <Item.Content>
                                    <Item.Extra style={{ textAlign: 'left', color: 'black', margin: 0, marginLeft: -10 }}>
                                        {item.nombre}
                                    </Item.Extra>
                                    <Item.Meta>{item.respuesta}</Item.Meta>
                                    <Item.Extra style={{ textAlign: 'right', color: 'black' }}>
                                        Respondido el {item.fecha}
                                    </Item.Extra>
                                </Item.Content>
                            </Item>
                        )}
                    </Item.Group>
                </Responsive>
                
                <Responsive {...Responsive.onlyMobile}>
                    <Comment.Group style={{ marginTop: 45 }}>
                        {(data.respuestas).map((item) =>
                            <Comment>
                                <Comment.Avatar src={(item.image == 0) ? userImagePre : pathS3 + item.image} />
                                <Comment.Content>
                                    <Comment.Author as='a'>{item.nombre}</Comment.Author>
                                    <Comment.Metadata>
                                        <div>Respondido el {item.fecha}</div>
                                    </Comment.Metadata>
                                    <Comment.Text>{item.respuesta}</Comment.Text>
                                </Comment.Content>
                            </Comment>
                        )}
                    </Comment.Group>
                </Responsive>
                <Responsive {...Responsive.onlyTablet}>
                    <Comment.Group style={{ marginTop: 45 }}>
                        {(data.respuestas).map((item) =>
                            <Comment>
                                <Comment.Avatar src={(item.image == 0) ? userImagePre : pathS3 + item.image} />
                                <Comment.Content>
                                    <Comment.Author as='a'>{item.nombre}</Comment.Author>
                                    <Comment.Metadata>
                                        <div>Respondido el {item.fecha}</div>
                                    </Comment.Metadata>
                                    <Comment.Text>{item.respuesta}</Comment.Text>
                                </Comment.Content>
                            </Comment>
                        )}
                    </Comment.Group>
                </Responsive>
            </Container>
        </PublicLayout>
    )
}
export async function getServerSideProps({ params }) {
    const res = await axios.get('https://api.vendetunave.co/api/pregunta/' + params.slug);
    const data = await res.data;
    //const imagenes = await res.data.imagenes;
    return {
        props: {
            data
        },
    }
}