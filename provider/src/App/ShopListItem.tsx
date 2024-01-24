import { BsChevronCompactRight } from 'react-icons/bs'
import './ShopListItem.scss'
import { makeDistanceLabelText } from "./distance-label";

type Props = {
  data: Pwamap.ShopData;
  popupHandler: Function;
};

const Content = (props: Props) => {
  const clickHandler = () => {
    props.popupHandler(props.data)
  }

  const distanceTipText = makeDistanceLabelText(props.data.distance)
  const image = props.data['画像']

  return (
    <>
      <div className="shop-link">
        <h2 className="shop-title" style={{ wordBreak: "break-all" }} onClick={clickHandler}>{props.data['名称']}</h2>
        {
          distanceTipText && <div className='tag-box'>
            <span className="nowrap">{distanceTipText && <span className="distance">現在位置から {distanceTipText}</span>}</span>
          </div>
        }

        <div style={{ margin: "10px 10px 10px 0" }}>

          {image && <img src={image} alt={props.data['名称']} onClick={clickHandler} />}

        </div>

        <div className="right" onClick={clickHandler}><BsChevronCompactRight size="40px" color="#CCCCCC" /></div>
      </div>
    </>
  );
};

export default Content;
