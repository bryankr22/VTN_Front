import { useCallback, useState } from "react";

import { AdSlug, reportClick, useRequestInfo } from "./useRequest";
import styles from "./styles.module.css";

interface Props {
  slug: string;
}

const parseCategory = (rawCategory: string): AdSlug | undefined => {
  if(!rawCategory) return

  if (rawCategory === "carros") {
    return "carros-y-camionetas";
  }
  if (rawCategory === "carros_coleccion") {
    return "colección";
  }
  rawCategory = rawCategory.replaceAll("_", "-").replaceAll(" ", "-");
  return rawCategory as AdSlug;
};

function ZoneAd({ slug }: Props) {
  const { value } = useRequestInfo(parseCategory(slug));
  const [showButton, setShowButton] = useState(false);

  const changeRoute = useCallback(
    (id: number, path: string) => () => {
      reportClick(id);
      window.open(path, '_blank');
    },
    []
  );

  if (!value?.data?.patterns) {
    return null;
  }

  const ad = value.data.patterns;

  return (
    <div key={ad.id} className={styles.container}>
      <img
        alt={ad.name}
        loading="lazy"
        src={ad.image}
        className={styles.image}
        onLoad={() => {
          setShowButton(true);
        }}
      ></img>
      {ad.link && showButton && (
        <button onClick={changeRoute(ad.id, ad.link)} className={styles.button}>
          {ad.button_name}
        </button>
      )}
    </div>
  );
}

export default ZoneAd;
