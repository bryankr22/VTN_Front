import React, {useState} from 'react'
import PublicLayout from '../../layouts/PublicLayout';
import { Header, Container, Tab } from "semantic-ui-react";
import { authInitialProps } from '../../helpers/auth';
import { panes } from '../../components/usuario/publicacionesTabs';
export default function mis_publicaciones() {
    const [activeIndex, setActiveIndex] = useState(0);
    const handleTabChange = (e, {activeIndex}) => {
        setActiveIndex(activeIndex);
    };
    return (
        <PublicLayout>
            <Container style={{ paddingTop: 25 }} text>
                <Header as="h2">MIS PUBLICACIONES</Header>
                <Tab
                    panes={panes([], 0, [], 0)}
                    activeIndex={activeIndex}
                    onTabChange={handleTabChange}
                />
            </Container>
        </PublicLayout>
    )
}
mis_publicaciones.getInitialProps = authInitialProps()