import { ReactNode } from 'react';
import Collapsible from "react-collapsible";
import TitleCollapsible from "../TitleCollapsible";

import styles from "./styles.module.css";

interface Props {
  children: ReactNode
}

export default function Collapse({children}:Props) {

  return (
    <Collapsible
      trigger={<TitleCollapsible text="Llenar Datos" />}
      triggerWhenOpen={<TitleCollapsible text="Datos Generales" open />}
      className={styles.colapsible}
      openedClassName={styles.colapsible}
    >
      {children}
    </Collapsible>
  );
}
