export const displayMap = (locations) => {
  mapboxgl.accessToken =
    'pk.eyJ1IjoiYXNoYWthZSIsImEiOiJja3dhbHZlaHAybm5wMnZwNm1kZGVlZmdnIn0.mNrbqiikVWLu4Am1EJdWiA'

  let map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/ashakae/ckwavzezc5ydl14mvcpjcj0vi',
    // center: [-118.113491, 34.111745],
    // zoom: 10,
    scrollZoom: false,
  })

  const bounds = new mapboxgl.LngLatBounds()

  locations.forEach((loc) => {
    const el = document.createElement('div')
    el.className = 'marker'

    new mapboxgl.Marker({
      element: el,
      anchor: 'bottom',
    })
      .setLngLat(loc.coordinates)
      .addTo(map)

    new mapboxgl.Popup({
      offset: 30,
    })
      .setLngLat(loc.coordinates)
      .setHTML(`<p>Day ${loc.day}: ${loc.description}</p>`)
      .addTo(map)

    bounds.extend(loc.coordinates)
  })

  map.fitBounds(bounds, {
    padding: {
      top: 200,
      bottom: 150,
      left: 100,
      right: 100,
    },
  })
}
