import React from "react";
import Map from "./Map"
import { LngLatLike } from "maplibre-gl";

type Props = {
  data: Pwamap.ShopData[];
  bounds: LngLatLike[];
}

const Content = (props: Props) => {
  return (
    <><Map data={props.data} bounds={props.bounds}/></>
  );
};

export default Content;
