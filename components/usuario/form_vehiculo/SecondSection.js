import React from "react";
import { Dimmer, Loader, Grid, Segment } from "semantic-ui-react";
import ImageUpload from "./ImageUpload";

const listMobile = [...Array(10)].map((_, index) => {
  if (index === 0) return { principal: true, index };
  return { index };
});
const inputsList_one = [
  {
    principal: true,
    index: 0,
  },
  {
    principal: false,
    index: 5,
  },
  {
    principal: false,
    index: 8,
  },
];
const inputsList_two = [
  {
    principal: false,
    index: 1,
  },
  {
    principal: false,
    index: 3,
  },
  {
    principal: false,
    index: 6,
  },
  {
    principal: false,
    index: 9,
  },
];
const inputsList_three = [
  {
    principal: false,
    index: 2,
  },
  {
    principal: false,
    index: 4,
  },
  {
    principal: false,
    index: 7,
  },
];

const tree = {
  mobile: { listMobile },
  desktop: {
    inputsList_one,
    inputsList_two,
    inputsList_three,
  },
};

export default function SecondSection({ data: { edit } = {}, isMobile }) {
  const { inputsList_one, inputsList_two, inputsList_three, listMobile } =
    tree[isMobile ? "mobile" : "desktop"];
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

      {isMobile ? (
        <Grid.Row>
          <Grid.Column className="columDrop" style={{ width: "100%" }}>
            {listMobile.map((item) => (
              <>
                <ImageUpload
                  images={edit?.imagenes}
                  key={item.index}
                  principal={item.principal}
                  index={item.index}
                />
                <div style={{ marginBottom: 5 }}></div>
              </>
            ))}
          </Grid.Column>
        </Grid.Row>
      ) : (
        <Grid.Row stretched>
          <Grid.Column className="columDrop">
            {inputsList_one.map((item, index) => (
              <ImageUpload
                images={edit?.imagenes}
                key={item.index}
                principal={item.principal}
                index={item.index}
              />
            ))}
          </Grid.Column>
          <Grid.Column className="columDrop">
            {inputsList_two.map((item, index) => (
              <ImageUpload
                images={edit?.imagenes}
                key={item.index}
                principal={item.principal}
                index={item.index}
              />
            ))}
          </Grid.Column>
          <Grid.Column className="columDrop">
            {inputsList_three.map((item, index) => (
              <ImageUpload
                images={edit?.imagenes}
                key={item.index}
                principal={item.principal}
                index={item.index}
              />
            ))}
          </Grid.Column>
        </Grid.Row>
      )}
    </Grid>
  );
}
