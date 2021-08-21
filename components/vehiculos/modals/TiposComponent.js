import React, {useState} from 'react'
import { Grid, Header, Icon, Accordion, List } from "semantic-ui-react";
export default function TiposComponent({filtros, params}) {
    const insertParam = (key, value) => {
        key = encodeURIComponent(key);
        value = encodeURIComponent(value);
        var kvp = document.location.search.substr(1).split('&');
        let i=0;
        for(; i<kvp.length; i++){
            if (kvp[i].startsWith(key + '=')) {
                let pair = kvp[i].split('=');
                pair[1] = value;
                kvp[i] = pair.join('=');
                break;
            }
        }
        if(i >= kvp.length){
            kvp[kvp.length] = [key,value].join('=');
        }
        let params = kvp.join('&');
        document.location.search = params;
    }
    const mapping_contador = (contador) => {
        var mapItems = Object.keys(contador).map((item, index) => {
            return {
                label: item,
                qty: index
            }
        });
        var size = 5;
        var sliceItems = mapItems.slice(0, size)
        sliceItems.push({
            label: 'Ver Todos',
            slug: '',
            qty: 0
        })
        return sliceItems;
    }
    const [opcionesList, setOpcionesList] = useState({
        text: "Tipos",
        open: false,
        slug: 'tipo',
        values: mapping_contador(filtros.tipo)
    });
    const activeOpciones = () => {
        var openDrop = opcionesList.open;
        opcionesList.open = !openDrop;
        setOpcionesList({...opcionesList});
    }
    return (
        <>
            {!params.tipo && params.categoria === 'motos' && (    
            <Accordion 
            style={{ width: "100%", marginBottom: 15 }}>
                <Accordion.Title
                style={{
                    width: "100%",
                    border: "1px solid black",
                    padding: "10px 20px",
                    borderRadius: 20,
                }}
                active={opcionesList.open}
                index={0}
                onClick={() => activeOpciones()}
                >
                <Header as="h5">
                    {opcionesList.text}
                    <Icon name="dropdown" style={{ float: "right" }} />
                </Header>
                </Accordion.Title>
                <Accordion.Content active={opcionesList.open}>
                    <Grid.Column>
                        <List link>
                            <List.Item>
                                <List.Content>
                                    <List.List style={{ paddingLeft: 15 }}>
                                        {opcionesList.values.map((itemSecond, indexSecond) => ( 
                                        <List.Item
                                            key={opcionesList.text + indexSecond}
                                            as="a"
                                            style={{
                                                padding: "7px 0px",
                                                borderBottom: "1px solid #cccccc",
                                                color: "#2185d0",
                                            }}
                                            onClick={()=> insertParam(opcionesList.slug, itemSecond.label)}
                                        >
                                            {itemSecond.label}
                                        </List.Item>
                                        ))}
                                    </List.List>
                                </List.Content>
                            </List.Item>
                        </List>
                    </Grid.Column>
                </Accordion.Content>
            </Accordion>
            )}
        </>
    )
}
