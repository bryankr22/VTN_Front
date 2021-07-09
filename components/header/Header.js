import React, {useState} from 'react';
import { Dropdown, Input, Icon, Responsive, Button } from "semantic-ui-react";
import Link from 'next/link'
import Image from 'next/image'
const Header = () => {
    const [query, setQuery] = useState("");
    const handleSearch = () => {
        //console.log("click")
        if ( document.getElementById("dropSearchInput").classList.contains("visible") ) {
            document.getElementById("dropSearchInput").classList.remove("visible");
        } else {
            document.getElementById("dropSearchInput").classList.add("visible");
        }
    };
    const handleKeyDown = () => {
        
    };
    const handleSubmit = () => {

    };
    return (
        <div
            className="nativeHeader"
            style={{ zIndex: 1001, background: "#000" }}
        >
        <nav className="navbar navbar-expand-lg navbar-dark navbar-native-second">
            <button
            className="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
            >
            <Icon color="grey" inverted name="bars" size="big" />
            </button>

            <Responsive
            {...Responsive.onlyMobile}
            style={{ display: "contents" }}
            >
            <div style={{ textAlign: "center", margin: "0 auto" }}>
                <Link href="/">
                <Image
                    src="/images/VTN_logo_white.png"
                    style={{ height: "auto", width: "55px", margin: "0 auto" }}
                />
                </Link>
            </div>
            <Link id="link-login" href="/login">
                <h6 className="text-native">LOGIN</h6>
            </Link>
            </Responsive>
            <Responsive
            {...Responsive.onlyTablet}
            style={{ display: "contents" }}
            >
            <div style={{ textAlign: "center", margin: "0 auto" }}>
                <Link href="/">
                <Image
                    src="/images/VTN_logo_white.png"
                    style={{ height: "auto", width: "70px", margin: "0 auto" }}
                />
                </Link>
            </div>
            <Link id="link-login" href="/login">
                <h6 className="text-native">LOGIN</h6>
            </Link>
            </Responsive>
            <div
            className="collapse navbar-collapse"
            id="navbarSupportedContent"
            style={{ marginTop: 10 }}
            >
            <ul
                className="navbar-nav mr-auto"
                style={{ width: "auto", margin: "0 auto" }}
            >
                <li className="nav-item deleteMobile">
                <Link href="/">
                    <Image
                    src="/images/VTN_logo_white.png"
                    style={{
                        height: "auto",
                        width: "70px",
                        margin: "0 auto",
                    }}
                    />
                </Link>
                </li>
                <li
                className="nav-item"
                data-toggle="collapse"
                data-target="#navbarSupportedContent"
                >
                <Link
                    href="/"
                >
                    <a className="nav-link" style={{ letterSpacing: 2 }}>HOME
                    <Icon name="angle right" size="big" /></a>
                </Link>
                </li>
                <li
                className="nav-item"
                data-toggle="collapse"
                data-target="#navbarSupportedContent"
                >
                <Link
                    
                    href="/vehiculos"
                >
                    <a className="nav-link" style={{ letterSpacing: 2 }}>VEH&Iacute;CULOS
                    <Icon name="angle right" size="big" /></a>
                </Link>
                </li>
                <li
                className="nav-item"
                data-toggle="collapse"
                data-target="#navbarSupportedContent"
                >
                <Link
                    
                    href="/servicios"
                >
                    <a className="nav-link" style={{ letterSpacing: 2 }}>SERVICIOS
                    <Icon name="angle right" size="big" /></a>
                </Link>
                </li>

                <li
                className="nav-item"
                data-toggle="collapse"
                data-target="#navbarSupportedContent"
                >
                <Link
                    
                    href="/comunidad/Buscar_/Pagina_1"
                >
                    <a className="nav-link" style={{ letterSpacing: 2 }}>COMUNIDAD
                    <Icon name="angle right" size="big" /></a>
                </Link>
                </li>

                <li
                className="nav-item"
                data-toggle="collapse"
                data-target="#navbarSupportedContent"
                >
                <Link
                    
                    href={'/login'}
                >
                    <a className="nav-link" style={{ letterSpacing: 2 }}>VENDER
                    <Icon name="angle right" size="big" /></a>
                </Link>
                </li>

                <li
                id="input-nav"
                style={{ margin: "0 7%", textAlign: "center" }}
                >
                <Icon
                    onClick={() => handleSearch()}
                    name="search"
                    size="large"
                    style={{ color: "#fff", marginTop: 10 }}
                />
                <Dropdown id="dropSearch" floating direction="left">
                    <Dropdown.Menu id="dropSearchInput">
                    <Input
                        onChange={(e) => setQuery({ search: e.target.value }) }
                        onKeyDown={() => handleKeyDown}
                        placeholder="Buscar..."
                    />
                    <Button
                        color="black"
                        onClick={() => handleSubmit}
                        style={{ paddingRight: 10 }}
                    >
                        <Icon style={{ opacity: 1 }} name="search" />
                    </Button>
                    </Dropdown.Menu>
                </Dropdown>
                </li>
                <li className="nav-item deleteMobile" style={{ width: 250 }}>
                <Link
                id="link-login"
                href="/login"
                style={{ textDecoration: "none" }}
                >
                <h6 className="text-native" style={{ marginTop: 9 }} >
                    LOGIN
                </h6>
                </Link>
                </li>
            </ul>
            </div>
        </nav>
        </div>
    );
}
export default Header;
