import React, { useMemo } from "react";
import { List, Modal } from "semantic-ui-react";

const list = [
  { key: 0, value: 0, text: "Más reciente" },
  { key: 1, value: 1, text: "Nuevo" },
  { key: 2, value: 2, text: "Usado" },
  { key: 3, value: 3, text: "Precio más bajo" },
  { key: 4, value: 4, text: "Precio más alto" },
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
