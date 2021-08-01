import React from 'react'
import { Dimmer, Loader, Grid, Segment } from "semantic-ui-react";
import "react-dropzone-uploader/dist/styles.css";
import Dropzone from "react-dropzone-uploader";
  
export default function SecondSection() {
    const getUploadParams = () => {}
    const handleChangeStatus = () => {}
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
                    <Segment style={{ maxHeight: 261 }}>
                        <Dropzone
                            getUploadParams={getUploadParams}
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
                    <Segment style={{ paddingBottom: 0, marginBottom: 5, paddingTop: 0, marginTop: 0 }} >
                        <Dropzone
                            getUploadParams={getUploadParams}
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
                            inputContent="6"
                        />
                    </Segment>
                    <Segment style={{ paddingBottom: 0, marginBottom: 5, paddingTop: 0, marginTop: 0 }} >
                        <Dropzone
                            getUploadParams={getUploadParams}
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
                            inputContent="9"
                        />
                    </Segment>
                </Grid.Column>
                <Grid.Column className="columDrop">
                    <Segment style={{ paddingBottom: 0, marginBottom: 5, maxHeight: 139 }} >
                        <Dropzone
                            getUploadParams={getUploadParams}
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
                    <Segment style={{ paddingTop: 0, marginTop: 0, marginBottom: 5, paddingBottom: 0, maxHeight: 125 }}>
                        <Dropzone
                            getUploadParams={getUploadParams}
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
                    <Segment style={{ paddingBottom: 0, marginBottom: 5, paddingTop: 0, marginTop: 0 }}>
                        <Dropzone
                            getUploadParams={getUploadParams}
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
                            inputContent="7"
                        />
                    </Segment>
                    <Segment style={{ paddingBottom: 0, marginBottom: 5, paddingTop: 0, marginTop: 0 }}>
                        <Dropzone
                            getUploadParams={getUploadParams}
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
                            inputContent="10"
                        />
                    </Segment>
                </Grid.Column>
                <Grid.Column className="columDrop">
                    <Segment style={{ paddingBottom: 0, marginBottom: 5, maxHeight: 139 }} >
                        <Dropzone
                            getUploadParams={getUploadParams}
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
                    <Segment style={{ paddingTop: 0, marginTop: 0, marginBottom: 5, paddingBottom: 0, maxHeight: 125 }}>
                        <Dropzone
                            getUploadParams={getUploadParams}
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
                    <Segment style={{ paddingBottom: 0, marginBottom: 5, paddingTop: 0, marginTop: 0 }} >
                        <Dropzone
                            getUploadParams={getUploadParams}
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
                            inputContent="8"
                        />
                    </Segment>
                </Grid.Column>
            </Grid.Row>
        </Grid>
    )
}
