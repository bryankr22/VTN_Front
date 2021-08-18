import React, { useState } from 'react'
import { Dimmer, Loader, Grid, Segment } from "semantic-ui-react";
import "react-dropzone-uploader/dist/styles.css";
import Dropzone from "react-dropzone-uploader";
import Resizer from "react-image-file-resizer";
import { useDispatch } from 'react-redux';
import { addImage, removeImage } from '../../../store/productoSlice';

export default function ImageUpload({ principal, index }) {
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(false);
    const getUploadParams = ({ file, meta }) => {
        setLoading(true);
        let orientation = 0;
        if (meta.width < meta.height) {
            orientation = 90;
        }
        Resizer.imageFileResizer( file, 1000, 1000, "JPEG", 100, 360, (uri) => {
            dispatch(addImage({index, image: uri}));
            setLoading(false);
        }, "base64" );

        return { url: "" };
    }
    const handleChangeStatus = (status, index) => { 
        if (status === "removed") {
            dispatch(removeImage(index));
        }
    }
    return (
        <>
            {principal ?
                <Segment style={{ paddingBottom: 0, paddingTop: 0, marginBottom: 0, maxHeight: 261 }}>
                    <Dimmer active={loading}>
                        <Loader indeterminate>Cargando archivo...</Loader>
                    </Dimmer>
                    <Dropzone
                        getUploadParams={getUploadParams}
                        onChangeStatus={({ file, meta }, status) => handleChangeStatus(status, index) }
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
                :
                <Segment style={{ paddingBottom: 0, marginBottom: 5, paddingTop: 0, marginTop: 0, maxHeight: 125 }} >
                    <Dimmer active={loading}>
                        <Loader indeterminate>Cargando archivo...</Loader>
                    </Dimmer>
                    <Dropzone
                        getUploadParams={getUploadParams}
                        onChangeStatus={({ file, meta }, status) => handleChangeStatus(status, index) }
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
                        inputContent={index}
                    />
                </Segment>
            }
        </>
    )
}
