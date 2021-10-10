import { useRouter } from "next/router";
import React, { useState } from "react";
import { Input, Responsive } from "semantic-ui-react";
import CarruselHome from "../carrusel/CarruselHome";
export default function SliderHome({ slider, sliderMobile }) {
  const router = useRouter();
  const [query, setQuery] = useState("");
  const handleKeyDown = (e) => {
    if (e.keyCode === 13) {
      handleSubmit();
    }
  };
  const handleSubmit = () => {
    router.push(`/vehiculos?q=${query}`);
  };
  return (
    <div>
      <Responsive className="banner-home" {...Responsive.onlyComputer}>
        {slider.length > 0 && <CarruselHome seccion="home" data={slider} desktop />}
      </Responsive>
      <Responsive className="banner-home" {...Responsive.onlyMobile}>
        {sliderMobile.length > 0 && (
          <>
            <CarruselHome seccion="home" data={sliderMobile} />
            <div className="bg-black">
              <Input
                action={{
                  icon: "search",
                  style: {
                    background: "transparent",
                    color: "white",
                    borderBottom: "1px solid white",
                    height: 47,
                    paddingTop: 10,
                  },
                  onClick: () => handleSubmit(),
                }}
                onChange={(e, { value }) => setQuery(value)}
                onKeyDown={(e) => handleKeyDown(e)}
                fluid
                id="search-responsive"
                style={{ margin: "10px 20px 0 20px" }}
                className="search-input-alt"
                placeholder="¿Qué estas buscando?"
              />
            </div>
          </>
        )}
      </Responsive>
      <Responsive className="banner-home" {...Responsive.onlyTablet}>
        {sliderMobile.length > 0 && (
          <>
            <CarruselHome seccion="home" data={sliderMobile} />
            <Input
              action={{
                icon: "search",
                style: {
                  background: "transparent",
                  color: "black",
                  borderBottom: "1px solid black",
                  height: 47,
                  paddingTop: 10,
                },
                onClick: () => handleSubmit(),
              }}
              onChange={(e, { value }) => setQuery(value)}
              onKeyDown={(e) => handleKeyDown(e)}
              fluid
              id="search-responsive"
              style={{ margin: "10px 20px 0 20px" }}
              className="search-input"
              placeholder="¿Qué estas buscando?"
            />
          </>
        )}
      </Responsive>
    </div>
  );
}
