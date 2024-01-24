import React from "react";
import Links from './Links'
import './Shop.scss'
import { AiOutlineClose } from 'react-icons/ai'
import { makeDistanceLabelText } from "./distance-label";
import ReplaceTextToLink from "./ReplaceTextToLink";

type Props = {
  shop: Pwamap.ShopData
  close: Function;
}

type TableProps = {
  shop: Pwamap.ShopData
}

const Table = (props: TableProps) => {
  const { shop } = props

  return (
    <table className="data-table">
      <tbody>
        {Object.entries(shop)
          .filter(([key, _]) => key !== '緯度' && key !== '経度')
          .map(([key, value]) => (
            <tr key={key}>
              <td className="col-1">{key}</td>
              <td className="col-2"><ReplaceTextToLink text={`${value}`} /></td>
            </tr>
          ))}
      </tbody>
    </table>
  );
};

const Content = (props: Props) => {
  const mapNode = React.useRef<HTMLDivElement>(null);
  const [map, setMap] = React.useState<any>(null)
  const { shop } = props

  const clickHandler = () => {
    props.close()
    if (mapNode.current) {
      mapNode.current.remove()
      map.remove()
    }
  }

  React.useEffect(() => {
    if (!mapNode.current) {
      return
    }

    // @ts-ignore
    const nextMap = new window.geolonia.Map({
      container: mapNode.current,
      interactive: false,
      zoom: 14,
      style: `geolonia/gsi`,
    });
    setMap(nextMap)
  }, [shop, mapNode])

  const distanceTipText = makeDistanceLabelText(shop.distance)

  return (
    <div className="shop-single">
      <div className="head">
        <button onClick={clickHandler}><AiOutlineClose size="16px" color="#FFFFFF" /> 閉じる</button>
      </div>
      <div className="container">
        {shop ?
          <>
            <h2>{shop['名称']}</h2>

            {
              distanceTipText && <div>
                <span className="nowrap">{distanceTipText && <span className="distance">現在位置から {distanceTipText}</span>}</span>
              </div>
            }

            <div
              ref={mapNode}
              style={{ width: '100%', height: '200px', marginTop: "24px"}}
              data-lat={shop['緯度']}
              data-lng={shop['経度']}
              data-navigation-control="off"
            ></div>

            <p style={{marginBottom: "24px"}}>
              <a className="small" href={`http://maps.apple.com/?q=${shop['緯度']},${shop['経度']}`}>場所までの道順</a>
            </p>

            {shop['画像'] && <img className="shop-img" src={shop['画像']} alt={shop['名称']} style={{ width: "100%" }} />}

            <Table shop={shop} />

          </>
          :
          <></>
        }
      </div>
    </div>
  );
};

export default Content;
