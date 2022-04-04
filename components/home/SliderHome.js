import { useRouter } from "next/router";
import { useState } from "react";
import { Responsive, Input } from 'semantic-ui-react';
import Image from "next/image";

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
      <Responsive className="banner-home" {...Responsive?.onlyComputer}>
        <div style={{ width: '100%', position: 'relative', height: 500 }}>
          {slider?.[0]?.url &&
            <Image
              layout="fill"
              src={slider?.[0]?.url.replace(
                "https://vendetunave.s3.amazonaws.com",
                `https://d3bmp4azzreq60.cloudfront.net/fit-in/1100x1100`
              )}
              className="bg-black"
              alt={"banner"}
            />
          }
        </div>
      </Responsive>
      <Responsive className="banner-home" {...Responsive?.onlyMobile}>
        <>
          <div style={{ width: '100%', position: 'relative', height: 400 }}>
            <Image
              layout="fill"
              src={sliderMobile?.[0].url.replace(
                "https://vendetunave.s3.amazonaws.com",
                `https://d3bmp4azzreq60.cloudfront.net/fit-in/400x400`
              )}
              className="bg-black"
              alt={"banner"}
            />
          </div>
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
      </Responsive>
      <Responsive className="banner-home" {...Responsive?.onlyTablet}>
        <div style={{ width: '100%', position: 'relative', height: 400 }}>
          <Image
            layout="fill"
            src={sliderMobile?.[0]?.url.replace(
              "https://vendetunave.s3.amazonaws.com",
              `https://d3bmp4azzreq60.cloudfront.net/fit-in/400x400`
            )}
            className="bg-black"
            alt={"banner"}
          />
        </div>
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
      </Responsive>
    </div>
  );
}
