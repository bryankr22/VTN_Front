import React from 'react'
import { List, Modal } from "semantic-ui-react";
export default function ModalFiltersDesk({showModal, onClose, titulo, listado = []}) {
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
    const handleChangeFilter = (item) => {
        insertParam(titulo, item.label);
    }
    return (
        <Modal
        size="tiny"
        open={showModal}
        onClose={onClose}
        closeIcon
        >
            <Modal.Header>{titulo}</Modal.Header>
            <Modal.Content>
                <List link>
                    {(listado).map((item, index) => (
                        <List.Item
                        key={index}
                        as="a"
                        style={{ marginBottom: 10 }}
                        onClick={() => handleChangeFilter(item)}
                        >
                        {item.label}
                        </List.Item>
                        )
                    )}
                </List>
            </Modal.Content>
        </Modal>
    )
}
