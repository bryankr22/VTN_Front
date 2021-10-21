import { Row, Text } from "@nextui-org/react";

interface Props {
  text: string;
  open?: boolean;
}

export default function TitleCollapsible({ text, open }: Props) {
  return (
    <Row justify="space-between" align="center">
      <Text h6={!open} h5={open} weight="bold">{text}</Text>
      <i className={`angle ${open ? 'down' : 'right'} big icon`}></i>
    </Row>
  );
}
