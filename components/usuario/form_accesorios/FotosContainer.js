import React, { useState } from 'react'
import { Dimmer, Loader, Grid, Segment } from "semantic-ui-react";
import "react-dropzone-uploader/dist/styles.css";
import Dropzone from "react-dropzone-uploader";
import Resizer from "react-image-file-resizer";
import { useDispatch } from 'react-redux';
import { addImage, removeImage } from '../../../store/accesorioSlice';

export default function FotosContainer() {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);

  const getUploadParamsAcc = (file, meta, index) => {
    setLoading(true);
    let orientation = 0;
    if (meta.width < meta.height) {
      orientation = 90;
    }
    Resizer.imageFileResizer(file, 1000, 1000, "JPEG", 100, 360, (uri) => {
      dispatch(addImage({ index, image: uri }));
      setLoading(false);
    }, "base64");

    return { url: "" };
  }
  const handleChangeStatus = (status, index) => {
    if (status === "removed") {
      dispatch(removeImage(index));
    }
  }
  return (
    <>
      <Dimmer active={loading}>
        <Loader indeterminate>Cargando archivo...</Loader>
      </Dimmer>
      <Grid columns={3} divided>
        <style>
          {`
                    .ui.grid>.column:not(.row), .ui.grid>.row>.column {
                        padding-left: 0 !important;
                        padding-right: 0 !important;
                    }
                    .columDrop {
                        padding: 0px !important;
                    }
                    .dzu-inputLabel {
                        color: #000;
                    }
                    .dzu-previewStatusContainer > progress {
                        display: none
                    }
                    .dzu-previewStatusContainer > span:last-child {
                        display: none
                    }
                `}
        </style>

        <Grid.Row stretched>
          <Grid.Column className="columDrop">
            <Segment>
              <Dropzone
                getUploadParams={({ file, meta }) => getUploadParamsAcc(file, meta, 0)}
                onChangeStatus={({ file, meta }, status) => handleChangeStatus(status, 0)}
                maxFiles={1}
                accept="image/*"
                styles={{
                  dropzone: {
                    minHeight: 255,
                    maxHeight: 255,
                    border: "1px dashed",
                    overflow: "unset",
                  },
                  preview: {
                    display: "block",
                    textAlign: "center",
                    padding: "10px 3%",
                  },
                  previewImage: {
                    width: "80%",
                    marginBottom: 10,
                    maxHeight: 140,
                  },
                }}
                inputContent="Imagen principal"
              />
            </Segment>
          </Grid.Column>
          <Grid.Column className="columDrop">
            <Segment
              style={{ paddingBottom: 0, marginBottom: 5 }}
            >
              <Dropzone
                getUploadParams={({ file, meta }) => getUploadParamsAcc(file, meta, 1)}
                onChangeStatus={({ file, meta }, status) => handleChangeStatus(status, 1)}
                maxFiles={1}
                accept="image/*"
                styles={{
                  dropzone: {
                    minHeight: 125,
                    maxHeight: 125,
                    border: "1px dashed",
                    overflow: "unset",
                  },
                  preview: {
                    display: "block",
                    textAlign: "center",
                    padding: "10px 3%",
                  },
                  previewImage: {
                    width: "80%",
                    marginBottom: 10,
                    maxHeight: 80,
                  },
                }}
                inputContent="2"
              />
            </Segment>
            <Segment style={{ paddingTop: 0, marginTop: 0 }}>
              <Dropzone
                getUploadParams={({ file, meta }) => getUploadParamsAcc(file, meta, 2)}
                onChangeStatus={({ file, meta }, status) => handleChangeStatus(status, 2)}
                maxFiles={1}
                accept="image/*"
                styles={{
                  dropzone: {
                    minHeight: 125,
                    maxHeight: 125,
                    border: "1px dashed",
                    overflow: "unset",
                  },
                  preview: {
                    display: "block",
                    textAlign: "center",
                    padding: "10px 3%",
                  },
                  previewImage: {
                    width: "80%",
                    marginBottom: 10,
                    maxHeight: 80,
                  },
                }}
                inputContent="4"
              />
            </Segment>
          </Grid.Column>
          <Grid.Column className="columDrop">
            <Segment
              style={{ paddingBottom: 0, marginBottom: 5 }}
            >
              <Dropzone
                getUploadParams={({ file, meta }) => getUploadParamsAcc(file, meta, 3)}
                onChangeStatus={({ file, meta }, status) => handleChangeStatus(status, 3)}
                maxFiles={1}
                accept="image/*"
                styles={{
                  dropzone: {
                    minHeight: 125,
                    maxHeight: 125,
                    border: "1px dashed",
                    overflow: "unset",
                  },
                  preview: {
                    display: "block",
                    textAlign: "center",
                    padding: "10px 3%",
                  },
                  previewImage: {
                    width: "80%",
                    marginBottom: 10,
                    maxHeight: 80,
                  },
                }}
                inputContent="3"
              />
            </Segment>
            <Segment style={{ paddingTop: 0, marginTop: 0 }}>
              <Dropzone
                getUploadParams={({ file, meta }) => getUploadParamsAcc(file, meta, 4)}
                onChangeStatus={({ file, meta }, status) => handleChangeStatus(status, 4)}
                maxFiles={1}
                accept="image/*"
                styles={{
                  dropzone: {
                    minHeight: 125,
                    maxHeight: 125,
                    border: "1px dashed",
                    overflow: "unset",
                  },
                  preview: {
                    display: "block",
                    textAlign: "center",
                    padding: "10px 3%",
                  },
                  previewImage: {
                    width: "80%",
                    marginBottom: 10,
                    maxHeight: 80,
                  },
                }}
                inputContent="5"
              />
            </Segment>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </>
  )
}
