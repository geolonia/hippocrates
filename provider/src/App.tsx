import React from "react";
import { Routes, Route } from "react-router-dom";
import "./App.scss";

import Home from './App/Home'
import List from './App/List'
import AboutUs from './App/AboutUs'

import Tabbar from './App/Tabbar'
// @ts-ignore
import geojsonExtent from '@mapbox/geojson-extent'
import { LngLatLike } from "maplibre-gl";

const App = () => {
  const [shopList, setShopList] = React.useState<Pwamap.ShopData[]>([])
  const [bounds, setBounds] = React.useState<LngLatLike[]>([])

  React.useEffect(() => {
    fetch(`${process.env.PUBLIC_URL}/data.geojson?timestamp=${new Date().getTime()}`)
      .then((response) => {
        return response.ok ? response.text() : Promise.reject(response.status);
      })
      .then((fetchedData) => {

        const data = JSON.parse(fetchedData)
        const features = data.features

        const nextShopList: Pwamap.ShopData[] = []
        for (let i = 0; i < features.length; i++) {
          const properties = features[i].properties as Pwamap.ShopData

          // 緯度と経度プロパティを追加
          const coordinates = features[i].geometry.coordinates
          properties['緯度'] = coordinates[1]
          properties['経度'] = coordinates[0]

          const shop = {
            ...properties,
            index: i
          }

          nextShopList.push(shop)
        }

        setShopList(nextShopList)

        const bounds = geojsonExtent(data)
        setBounds(bounds)
      });
  }, [])

  return (
    <div className="app">
      <div className="app-body">
        <Routes>
          <Route path="/" element={<Home data={shopList} bounds={bounds}/>} />
          <Route path="/list" element={<List data={shopList} />} />
          <Route path="/about" element={<AboutUs />} />
        </Routes>
      </div>
      <div className="app-footer">
        <Tabbar />
      </div>
    </div>
  );
}

export default App;
