import React from "react";
import setCluster from './setCluster'
import Shop from './Shop'
import { LngLatLike, GeoJSONFeature } from "maplibre-gl";

type Props = {
  data: Pwamap.ShopData[];
  bounds: LngLatLike[];
};

const CSS: React.CSSProperties = {
  width: '100%',
  height: '100%',
  position: 'relative',
}

const hidePoiLayers = (map: any) => {

  const hideLayers = [
    'poi',
    'poi-primary',
    'poi-r0-r9',
    'poi-r10-r24',
    'poi-r25',
    'poi-bus',
    'poi-entrance',
  ]

  for (let i = 0; i < hideLayers.length; i++) {
    const layerId = hideLayers[i];
    map.setLayoutProperty(layerId, 'visibility', 'none')
  }
}

const addLatLngToProperties = (feature: GeoJSONFeature) => {
  // @ts-ignore
  const coordinates = feature.geometry.coordinates
  feature.properties['緯度'] = coordinates[1]
  feature.properties['経度'] = coordinates[0]
  return feature.properties as Pwamap.ShopData
}

const Content = (props: Props) => {
  const mapNode = React.useRef<HTMLDivElement>(null);
  const [mapObject, setMapObject] = React.useState<any>()
  const [shop, setShop] = React.useState<Pwamap.ShopData | undefined>(undefined)

  const addMarkers = (mapObject: any) => {

    if (!mapObject) {
      return
    }

    mapObject.on('render', () => {

      // nothing to do if shops exists.
      if (mapObject.getSource('shops')) {
        return
      }

      hidePoiLayers(mapObject)

      const textColor = '#000000'
      const textHaloColor = '#FFFFFF'


      mapObject.addSource('shops', {
        type: 'geojson',
        data: './data.geojson',
        cluster: true,
        clusterMaxZoom: 14,
        clusterRadius: 25,
      })

      mapObject.addLayer({
        id: 'shop-points',
        type: 'circle',
        source: 'shops',
        filter: ['all',
          ['==', '$type', 'Point'],
        ],
        paint: {
          'circle-radius': 13,
          'circle-color': '#FF0000',
          'circle-opacity': 0.4,
          'circle-stroke-width': 2,
          'circle-stroke-color': '#FFFFFF',
          'circle-stroke-opacity': 1,
        },
      })

      mapObject.addLayer({
        id: 'shop-symbol',
        type: 'symbol',
        source: 'shops',
        filter: ['all',
          ['==', '$type', 'Point'],
        ],
        paint: {
          'text-color': textColor,
          'text-halo-color': textHaloColor,
          'text-halo-width': 2,
        },
        layout: {
          'text-field': "{スポット名}",
          'text-font': ['Noto Sans Regular'],
          'text-variable-anchor': ['top', 'bottom', 'left', 'right'],
          'text-radial-offset': 0.5,
          'text-justify': 'auto',
          'text-size': 12,
          'text-anchor': 'top',
          'text-max-width': 12,
          'text-allow-overlap': false,
        },
      })

      mapObject.on('mouseenter', 'shop-points', () => {
        mapObject.getCanvas().style.cursor = 'pointer'
      })

      mapObject.on('mouseleave', 'shop-points', () => {
        mapObject.getCanvas().style.cursor = ''
      })

      mapObject.on('mouseenter', 'shop-symbol', () => {
        mapObject.getCanvas().style.cursor = 'pointer'
      })

      mapObject.on('mouseleave', 'shop-symbol', () => {
        mapObject.getCanvas().style.cursor = ''
      })

      mapObject.on('click', 'shop-points', (event: any) => {
        if (!event.features[0].properties.cluster) {

          const properties: Pwamap.ShopData = addLatLngToProperties(event.features[0])
          setShop(properties)
        }
      })

      mapObject.on('click', 'shop-symbol', (event: any) => {
        if (!event.features[0].properties.cluster) {
          const properties: Pwamap.ShopData = addLatLngToProperties(event.features[0])
          setShop(properties)
        }
      })

      setCluster(mapObject)
    });

  }

  React.useEffect(() => {

    addMarkers(mapObject)

  }, [mapObject])

  React.useEffect(() => {
    // Only once reder the map.
    if (!mapNode.current || mapObject || props.bounds.length === 0) {
      return
    }

    // @ts-ignore
    const { geolonia } = window;

    const map = new geolonia.Map({
      container: mapNode.current,
      style: 'geolonia/gsi',
      bounds: props.bounds,
      fitBoundsOptions: { padding: 50 },
    });

    const onMapLoad = () => {
      hidePoiLayers(map)
      setMapObject(map)
    }

    const orienteationchangeHandler = () => {
      map.resize()
    }

    // attach
    map.on('load', onMapLoad)

    window.addEventListener('orientationchange', orienteationchangeHandler)

    return () => {
      // detach to prevent memory leak
      window.removeEventListener('orientationchange', orienteationchangeHandler)
      map.off('load', onMapLoad)
    }
  }, [mapNode, mapObject, props.bounds, props.data])

  const closeHandler = () => {
    setShop(undefined)
  }

  return (
    <div style={CSS}>
      <div
        ref={mapNode}
        style={CSS}
        data-geolocate-control="on"
        data-marker="off"
        data-gesture-handling="off"
      ></div>
      {shop ?
        <Shop shop={shop} close={closeHandler} />
        :
        <></>
      }
    </div>
  );
};

export default Content;
