import React from "react";
import { Routes, Route } from "react-router-dom";
import "./App.scss";

import Home from './App/Home'
import List from './App/List'
import AboutUs from './App/AboutUs'

import Tabbar from './App/Tabbar'

const sortShopList = async (shopList: Pwamap.ShopData[]) => {

  // 新着順にソート
  return shopList.sort(function (item1, item2) {
    return Date.parse(item2['タイムスタンプ']) - Date.parse(item1['タイムスタンプ'])
  });
}

const App = () => {
  const [shopList, setShopList] = React.useState<Pwamap.ShopData[]>([])

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

          if (!properties['スポット名']) {
            continue;
          }

          const shop = {
            ...properties,
            index: i
          }

          nextShopList.push(shop)
        }

        sortShopList(nextShopList).then((sortedShopList) => {
          setShopList(sortedShopList)
        })

      });
  }, [])

  return (
    <div className="app">
      <div className="app-body">
        <Routes>
          <Route path="/" element={<Home data={shopList} />} />
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
