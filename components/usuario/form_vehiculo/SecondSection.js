import axios from "axios";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import Resizer from "react-image-file-resizer";
import jwt from "jsonwebtoken";
import { useDispatch } from "react-redux";
import RUG from "react-upload-gallery";
import "react-upload-gallery/dist/style.css"; // or scss
import { AUTH_URL } from "../../../helpers/constants";
import { setImages } from "../../../store/productoSlice";
import { useCookies } from "react-cookie";
import { Message } from "semantic-ui-react";
import { dark, light } from "../../../helpers/colors";

const customRequest = (cookies, id, update) => {
  return function ({
    uid,
    file,
    send,
    action,
    headers,
    onProgress,
    onSuccess,
    onError,
  }) {
    const cookie = cookies.vtn_token;
    const decoded = jwt.verify(cookie, "vendetunave2021");
    const CancelToken = axios.CancelToken;
    const source = CancelToken.source();
    const config = {
      headers: { Authorization: `Bearer ${decoded.token_server.access_token}` },
    };

    Resizer.imageFileResizer(
      file,
      2000,
      2000,
      "JPEG",
      100,
      360,
      (uri) => {
        const body = {
          id,
          source: uri,
        };

        axios
          .post(action, body, {
            ...config,
            onUploadProgress: ({ total, loaded }) => {
              onProgress(uid, Math.round((loaded / total) * 100));
            },
            cancelToken: source.token,
          })
          .then(({ data: response }) => {
            update((prev) => ({ ...prev, [uid]: response }));
            setTimeout(() => {
              onSuccess(uid, response);
            }, 300);
          })
          .catch((error) => {
            onError(uid, {
              action,
              status: error.request,
              response: error.response,
            });
          });
      },
      "base64"
    );
    return {
      abort() {
        source.cancel();
      },
    };
  };
};

const onWarning = (setMessage) => (type, rules) => {
  if (type === "limit") {
    setMessage(`La cantidad máxima de archivos es ${rules.limit}`);
  }
};

export default function SecondSection({ data: { edit } = {}, maxFiles = 15, darkMode }) {
  const dispatch = useDispatch();
  const [cookies] = useCookies(["vtn_token"]);
  const [imagesLoaded, setImagesLoaded] = useState({});
  const [message, setMessage] = useState();
  const warningCallback = useCallback(onWarning(setMessage), []);
  const sources = useMemo(
    () =>
      edit?.imagenes
        ?.filter((item) => !!item.url)
        .map((item) => ({
          id: item?.imageId,
          source: item?.url,
        })),
    [edit]
  );

  const handleChange = useCallback(
    (list = []) => {
      const imagesReady = list
        ?.filter((image) => image.done && !image.error)
        .map(({ id, source, uid }) => ({
          id: id || imagesLoaded[uid]?.imagen_id,
          source,
        }));
      dispatch(setImages(imagesReady));
    },
    [imagesLoaded, dispatch]
  );

  useEffect(() => {
    dispatch(setImages(sources));
    document.querySelector(".rug-handle-drop-text").innerHTML =
      "Arrastra aquí las imágenes que quieres cargar. Máximo 15.";
    document.querySelector(".rug-handle-drop-text+span").innerHTML = "O";
    document.querySelector(".rug-handle-button").innerHTML = "Selecciónalas";
  }, [sources]);

  const colorText = darkMode === light ? dark : light;

  return (
    <>
      <style>{`
        .error.message { display: block !important; margin: 20px; margin-bottom:10px !important}
        .rug-handle-info > div {
          color: ${colorText}
        }
        .rug-handle-info > span {
          color: ${colorText}
        }
      `}</style>
      {message && <Message error content={message} onDismiss={() => setMessage(undefined)} />}
      <RUG
        initialState={sources}
        action={`${AUTH_URL}/upload_vehicle_image`}
        customRequest={customRequest(
          cookies,
          edit?.vehiculo.id,
          setImagesLoaded
        )}
        inOrder
        onChange={handleChange}
        rules={{ limit: maxFiles }}
        source={(response) => response?.url_image_webp}
        onWarning={warningCallback}
        onConfirmDelete={() => {
          return window.confirm("¿Desea borrar la imagen?");
        }}
      />
    </>
  );
}
