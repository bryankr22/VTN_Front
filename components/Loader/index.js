import React from 'react'
import { Dimmer, Loader } from "semantic-ui-react";

export default function Loading({isLoading = false, text= 'Cargando...'}) {
    return isLoading && (
        <Dimmer style={{ position: "fixed", zIndex: 9999 }} active={isLoading}>
            <Loader>{text}</Loader>
        </Dimmer>
    );
}