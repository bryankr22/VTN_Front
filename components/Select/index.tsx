import { Text } from "@nextui-org/react";

import styles from "./styles.module.css";

interface Props {
  options: { value: string; label: string }[] | string[];
  label?: string;
  error?: string;
  inputProps?: { [key: string]: any };
}

export default function Select({
  options,
  label,
  error,
  inputProps,
}: Props) {
  return (
    <div className={styles.container}>
      <label className={styles.label}>{label}</label>
      <select className={styles.select} {...inputProps}>
        {options.map((item) => {
          const [value, label] =
            typeof item === "string" ? [item, item] : [item.value, item.label];
          return (
            <option value={value} key={value}>
              {label}
            </option>
          );
        })}
      </select>
      <i className={`angle down icon ${styles.icon}`} />
      {error && (
        <Text span color="error">
          {error}
        </Text>
      )}
    </div>
  );
}
