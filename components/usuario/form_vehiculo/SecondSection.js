import React, { useMemo, useState } from "react";
import RUG from 'react-upload-gallery'
import 'react-upload-gallery/dist/style.css' // or scss


export default function SecondSection({ data: { edit } = {}, isMobile, maxFiles = 10 }) {
  const [visible, setVisible] = useState(false);

  const sources = useMemo(
    () =>
      edit?.imagenes?.filter(item => !!item.url).map((item) => ({
        id: item?.imageId,
        dataURL: item?.url,
      })) || [],
    [edit?.imagenes]
  );

  const hideModal = () => {
    setVisible(false);
  };
  const onUpload = (data) => {
    console.log("Upload files", data);
  };
  const onSelect = (data) => {
    console.log("Select files", data);
  };
  const onRemove = (id) => {
    console.log("Remove image id", id);
  };

  return (
    <RUG sorting={{ lockAxis: 'x' }} />
  );
}
