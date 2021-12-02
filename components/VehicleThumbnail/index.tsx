import { Icon, Image } from "semantic-ui-react";
import styles from "./styles.module.css";

const showSection = ({
  permuta,
  financiacion,
  confiable,
  blindado,
  peritaje,
}) => {
  return (
    [permuta, financiacion, confiable, blindado].some(Boolean) ||
    peritaje != "0"
  );
};

export default function VehicleThumbnail({ item, src, compact }) {
  console.log(item, " >>>>>>");
  return (
    <div className={styles.imageWrapped}>
      <Image
        src={src}
        wrapped={!compact}
        priority={compact}
        className={compact && styles.compact}
        ui={false}
        alt={item.title}
        style={
          compact && {
            marginBottom: 0,
            height: 150,
            objectFit: "cover",
            borderRadius: 0,
          }
        }
      />
      {showSection(item) && (
        <div className={styles.indicator}>
          {item.permuta == 1 && <Icon name="exchange" title="permuta" />}
          {item.financiacion == 1 && (
            <Icon name="wpforms" title="financiación" />
          )}
          {item.confiable == 1 && <Icon name="check" title="confiable" />}
          {item.blindado == 1 && <Icon name="shield" title="blindado" />}
          {item.peritaje != "0" && (
            <Icon name="clipboard check" title="peritaje" />
          )}
        </div>
      )}
    </div>
  );
}
