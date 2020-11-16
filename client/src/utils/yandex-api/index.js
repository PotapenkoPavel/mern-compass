import ymaps from 'ymaps'

let map
let maps
let placeLat, placeLng

export function createMap(coords, selector, markOptions) {
  placeLat = coords[0]
  placeLng = coords[1]

  const { name, address } = markOptions

  ymaps
    .load(
      'https://api-maps.yandex.ru/2.1/?apikey=732f6d16-ca66-42ce-a28f-36a3f86c30b9&lang=ru_RU'
    )
    .then((res) => {
      maps = res

      map = new maps.Map(selector, {
        center: [placeLat, placeLng],
        zoom: 15,
        controls: ['fullscreenControl', 'zoomControl'],
      })

      createPlacemark(name, address)
    })
    .catch((error) => console.log('Failed to load Yandex Maps', error))
}

export function createPlacemark(name, address) {
  const squareLayout = maps.templateLayoutFactory.createClass(`
      <div class="marker" id="LocMarker">

      <div class="marker-wrapper">
        <img src="/normal-pin.svg" class="marker-pin"/>
        <img src="/hover-pin.svg" class="marker-pin-hover"/>
      </div>

      <div class="marker-content">
        <div class="marker-content__name">${name}</div>
        <div class="marker-content__address">${address}</div>
      </div>

    </div>
    `)

  const squarePlacemark = new maps.Placemark(
    [placeLat, placeLng],
    {},
    {
      iconLayout: squareLayout,
      iconOffset: [-14, -36],
      iconShape: {
        type: 'Rectangle',
        coordinates: [
          [0, 0],
          [28, 36],
        ],
      },
    }
  )
  function isMobile() {
    const isMobile = /Mobile|webOS|BlackBerry|IEMobile|MeeGo|mini|Fennec|Windows Phone|Android|iP(ad|od|hone)/i.test(
      navigator.userAgent
    )
    return isMobile
  }

  map.geoObjects.add(squarePlacemark)

  if (!isMobile()) {
    squarePlacemark.events
      .add('mouseenter', function (e) {
        const marker = document.getElementById('LocMarker')
        marker.classList.add('active')
      })
      .add('mouseleave', function (e) {
        const marker = document.getElementById('LocMarker')
        marker.classList.remove('active')
      })
  } else {
    squarePlacemark.events.add('click', function (e) {
      const marker = document.getElementById('LocMarker')
      marker.classList.toggle('active')
    })
  }
}
