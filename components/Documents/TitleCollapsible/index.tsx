import { Row, Text } from "@nextui-org/react";
import styles from './styles.module.css';

interface Props {
  text: string;
  open?: boolean;
}

export default function TitleCollapsible({ text, open }: Props) {
  return (
    <Row justify="space-between" align="center" className={styles.title}>
      <Text h6={!open} h4={open} weight="bolder">{text}</Text>
      <i className={`angle ${open ? 'down' : 'right'} big icon`}></i>
    </Row>
  );
}
