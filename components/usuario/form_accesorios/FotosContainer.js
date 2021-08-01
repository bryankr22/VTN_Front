import React from 'react'
import { Dimmer, Loader, Grid, Segment } from "semantic-ui-react";
import "react-dropzone-uploader/dist/styles.css";
import Dropzone from "react-dropzone-uploader";
export default function FotosContainer() {
    const getUploadParamsAcc1 = () => {

    }
    const handleChangeStatus = () => {

    }
    return (
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
                            getUploadParams={getUploadParamsAcc1}
                            onChangeStatus={handleChangeStatus}
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
                            getUploadParams={getUploadParamsAcc1}
                            onChangeStatus={handleChangeStatus}
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
                            getUploadParams={getUploadParamsAcc1}
                            onChangeStatus={handleChangeStatus}
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
                            getUploadParams={getUploadParamsAcc1}
                            onChangeStatus={handleChangeStatus}
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
                            getUploadParams={getUploadParamsAcc1}
                            onChangeStatus={handleChangeStatus}
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

    )
}
