import Image from "next/image";
import { Grid, Spacer, Text } from "@nextui-org/react";

import front from "./assets/property-front.jpeg";
import back from "./assets/property-back.jpeg";

export function PropertyCard() {
  return (
    <>
      <Grid.Container gap={2} justify="center">
        <Grid md={12} xs={12} direction="column">
          <Spacer />
          <Text weight="bold">
            Para llenar los formularios utiliza la tarjeta de propiedad.
          </Text>
        </Grid>
        <Grid md={6} xs={6} justify="center">
          <Image
            src={front}
            alt="property front side"
            layout="intrinsic"
            height="200px"
            width="400px"
          />
        </Grid>
        <Grid md={6} xs={6} justify="center">
          <Image
            src={back}
            alt="property back side"
            layout="intrinsic"
            height="200px"
            width="400px"
          />
        </Grid>
      </Grid.Container>
    </>
  );
}
