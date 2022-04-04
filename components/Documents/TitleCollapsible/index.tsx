import { Row, Text } from "@nextui-org/react";
import styles from "./styles.module.css";

interface Props {
  text: string;
  open?: boolean;
}

export default function TitleCollapsible({ text, open }: Props) {
  return (
    <Row justify="space-between" align="center" className={styles.title} style={{ backgroundColor: 'white' }}>
      <Text h3 size={open ? 19 : 14} weight="bolder">
        {text}
      </Text>
      <i className={`angle ${open ? "down" : "right"} big icon`}></i>
    </Row>
  );
}
