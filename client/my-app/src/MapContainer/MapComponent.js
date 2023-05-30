// import React, { Component } from "react";
// import L from "leaflet";

// class MapComponent extends Component {

//   componentDidMount() {
//     this.map = L.map("map", {
//       center: [this.props.latitude, this.props.longitude],
//       zoom: 13,
//     });

//     L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
//       attribution:
//         'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors',
//       maxZoom: 18,
//       id: "mapbox/streets-v11",
//       tileSize: 512,
//       zoomOffset: -1,
//     }).addTo(this.map);

//     L.marker([this.props.latitude, this.props.longitude]).addTo(this.map);
//   }

//   render() {
//     return <div id="map" style={{ height: "500px" }} />
//   }
// }

// export default MapComponent;
import React, { useEffect, useState } from "react";
import L from "leaflet";

const MapComponent = (props) => {
  // const [map, setMap] = useState();

  useEffect(() => {
    // setMap(() => {
    //   return L.map("map", {
    //     center: [props.latitude, props.longitude],
    //     zoom: 13,
    //   });
    // });
    var map = L.map("map", {
      center: [props.latitude, props.longitude],
      zoom: 13,
    });

    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution:
        'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors',
      maxZoom: 12,
      id: "mapbox/streets-v11",
      tileSize: 512,
      zoomOffset: -1,
    }).addTo(map);

    L.marker([props.latitude, props.longitude]).addTo(map);
  }, []);
  return <div id="map" style={{ height: "500px" }} />;
};

export default MapComponent;
