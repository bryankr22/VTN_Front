import { ChangeEvent, useState } from "react";
import cn from "classnames";
import { useCookies } from "react-cookie";

import styles from "./styles.module.css";
import axios from "axios";
import { verify } from "jsonwebtoken";
import { truncate } from "./utils";

interface Props {
  name?: string;
  label?: string;
  request?: string;
  onChange?: (url: any) => void;
  accept?: string;
}

/**
 * Create a new component that render a Input File
 */

export default function InputFile({
  name,
  label = "Upload",
  request,
  onChange,
  accept = "application/pdf",
}: Props) {
  const [loading, setLoading] = useState(false);
  const [fileName, setFileName] = useState<string>();
  const [cookies] = useCookies(["vtn_token"]);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { files } = event.target;
    debugger;
    if (files && files.length > 0) {
      const file = files[0];
      if (request) {
        setLoading(true);
        const cookie = cookies.vtn_token;
        const decoded: any = verify(cookie, "vendetunave2021");
        const config = {
          headers: {
            Authorization: `Bearer ${decoded.token_server.access_token}`,
          },
        };

        const formData = new FormData();
        formData.append(name, file);
        axios.post(request, formData, config).then((res) => {
          if (onChange) {
            onChange(res.data);
            setFileName(file.name);
          }
          setLoading(false);
        });
      }
    } else {
      setFileName(undefined);
      setLoading(false);
      onChange(undefined);
    }
  };

  return (
    <div className={cn(styles.container, loading && styles.disabled)}>
      <label htmlFor={`file-${name}`}>
        <input
          type="file"
          id={`file-${name}`}
          name={name}
          className={styles.input}
          onChange={handleChange}
          accept={accept}
        />
        <span className={styles.text}>
          <i className="icon clipboard check mr-2"></i>
          <span>{(fileName && `(${truncate(fileName)})`) || label}</span>
          {loading && <i className="ml-2 loading circle notched icon"></i>}
        </span>
      </label>
    </div>
  );
}
