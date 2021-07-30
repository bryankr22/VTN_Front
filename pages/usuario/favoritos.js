import React, {useState} from 'react'
import PublicLayout from '../../layouts/PublicLayout';
import { authInitialProps } from '../../helpers/auth';
import { Container, Header, Table, Button, Image, Responsive, Dimmer, Loader, Tab } from 'semantic-ui-react'
import { panes } from '../../components/usuario/favoritosTabs';
export default function favoritos() {
    const [activeIndex, setActiveIndex] = useState(0);
    const handleTabChange = (e, {activeIndex}) => {
        setActiveIndex(activeIndex);
    };
    return (
        <PublicLayout>
            <Container style={{ paddingTop: 25 }} text>
                <Header as="h2" style={{ textTransform: 'uppercase' }}>Favoritos</Header>
                <Tab
                    panes={panes([], 0, [], 0)}
                    activeIndex={activeIndex}
                    onTabChange={handleTabChange}
                />
            </Container>
        </PublicLayout>
    )
}
favoritos.getInitialProps = authInitialProps()