import React, { useMemo } from "react";
import { List, Modal } from "semantic-ui-react";

const list = [
  { key: 0, value: 'MAS_RECIENTE', text: "Más reciente" },
  { key: 1, value: 'NUEVO', text: "Nuevo" },
  { key: 2, value: 'USADO', text: "Usado" },
  { key: 3, value: 'PRECIO_MAS_BAJO', text: "Precio más bajo" },
  { key: 4, value: 'PRECIO_MAS_ALTO', text: "Precio más alto" },
];
export default function ModalOrderMobile({ showModal, onClose, isFicha }) {
  const filter = useMemo(() => {
    return !isFicha
      ? list
      : list.filter((item) => ![1, 2].includes(item.value));
  }, [isFicha]);
  const insertParam = (key, value) => {
    key = encodeURIComponent(key);
    value = encodeURIComponent(value);
    var kvp = document.location.search.substr(1).split("&");
    let i = 0;
    for (; i < kvp.length; i++) {
      if (kvp[i].startsWith(key + "=")) {
        let pair = kvp[i].split("=");
        pair[1] = value;
        kvp[i] = pair.join("=");
        break;
      }
    }
    if (i >= kvp.length) {
      kvp[kvp.length] = [key, value].join("=");
    }
    let params = kvp.join("&");
    document.location.search = params;
  };
  const handleChangeFilter = (item) => {
    insertParam("orden", item.value);
  };
  return (
    <Modal size="tiny" open={showModal} onClose={onClose} closeIcon>
      <Modal.Header>Ordenar por</Modal.Header>
      <Modal.Content>
        <List link>
          {filter.map((item, index) => (
            <List.Item
              key={index}
              as="a"
              style={{ marginBottom: 10 }}
              onClick={() => handleChangeFilter(item)}
            >
              {item.text}
            </List.Item>
          ))}
        </List>
      </Modal.Content>
    </Modal>
  );
}
