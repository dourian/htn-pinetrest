import React, { useEffect, useState } from "react";
import {
  GoogleMap,
  InfoWindowF,
  MarkerF,
  useJsApiLoader,
} from "@react-google-maps/api";
import usePlacesAutocomplete, {
  getGeocode,
  getLatLng,
} from "use-places-autocomplete";
import "./index.css";
import Hover from "./Hover";

const PlacesAutocomplete = ({ setSelected }) => {
  const {
    ready,
    value,
    setValue,
    suggestions: { status, data },
    clearSuggestions,
  } = usePlacesAutocomplete();
  const handleSelect = async (address) => {
    setValue(address, false);
    clearSuggestions();
    const results = await getGeocode({ address });
    const { lat, lng } = await getLatLng(results[0]);
    console.log({ lat, lng });
    setSelected({ lat, lng });
  };
  return (
    <form className={`drop_shadow w-full absolute z-10 top-5`}>
      <label>
        <input
          className={`border-[2px] rounded-lg mx-4 py-1 px-4 h-[50px] w-9/12`} // Change w-10/12 to w-full
          type="text"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          disabled={!ready}
          placeholder={"Where do you want to go?"}
        ></input>
      </label>
      <button
        className={`text-sm rounded-lg px-4 py-2 drop_shadow bg-black text-white`}
        type="submit"
      >
        {"Go"}
      </button>
      <div>
        {status === "OK" &&
          data.map(({ place_id, description }) => (
            <button key={place_id} onClick={() => handleSelect(description)}>
              {description}
            </button>
          ))}
      </div>
    </form>
  );
};

export default function MapWrapper({currentLat, setCurrentLat, currentLng, setCurrentLng}) {
  const libraries = ["places"];
  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: "AIzaSyBgx2IEOegL2ILr6cdBzeymb3-6GChTTIc",
    libraries,
  });
  const google = window.google;
  const [selected, setSelected] = useState(null);
  const [map, setMap] = React.useState(null);
  const [activeMarker, setActiveMarker] = useState(null);

  const handleActiveMarker = (marker) => {
    if (marker === activeMarker) {
      return;
    }
    setActiveMarker(marker);
  };

  const containerStyle = {
    width: "100vw",
    height: "100vh",
  };
  const center = {
    lat: 43.473176,
    lng: -80.539849,
  };

  const [markers, setMarkers] = useState(null);
  const onLoad = React.useCallback(function callback(map) {
    const bounds = new window.google.maps.LatLngBounds(center);
    map.fitBounds(bounds);
    setMap(map);
  }, []);
  const onUnmount = React.useCallback(function callback(map) {
    setMap(null);
  }, []);

  useEffect(() => {
    const requestOptions = {
      method: "GET",
      redirect: "follow",
    };

    fetch("http://localhost:8000/getPoints", requestOptions)
      .then((response) => response.text())
      .then((result) => setMarkers(JSON.parse(result)))
      .catch((error) => console.log("error", error));
  }, []);

  console.log(markers);

  return isLoaded ? (
    <>
      <div className="places-container">
        <PlacesAutocomplete setSelected={setSelected} />
      </div>
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={selected ? { lat: selected.lat, lng: selected.lng } : center}
        defaultZoom={3}
        onLoad={onLoad}
        onUnmount={onUnmount}
        onClick={(ev) => {setActiveMarker(null); setCurrentLat(ev.latLng.lat()); setCurrentLng(ev.latLng.lng())}}
        options={{ disableDefaultUI: true, mapId: "10561e5854fbba2e" }}
      >
        {markers?.map((markerinfo) => (
          <>
            <MarkerF
              key={markerinfo.username}
              //   z-Index={20}
              position={{
                lat: markerinfo.location.latitude,
                lng: markerinfo.location.longitude,
              }}
              icon={{
                url: markerinfo.image_url,
                scaledSize: new google.maps.Size(0, 0),
              }}
            >
              <InfoWindowF
                onCloseClick={() => setActiveMarker(null)}
                position={{
                  lat: markerinfo.location.latitude,
                  lng: markerinfo.location.longitude,
                }}
              >
                <div
                  className="h-16 w-32 rounded-3xl justify-center overflow-hidden"
                  onClick={() => handleActiveMarker(markerinfo.image_url)}
                >
                  <img
                    src={markerinfo.image_url}
                    className=" w-full markerinfo"
                  ></img>
                </div>
              </InfoWindowF>
            </MarkerF>
          </>
        ))}
        <></>
      </GoogleMap>
      {activeMarker && markers && (
        <Hover markerinfo={markers.find((e) => e.image_url == activeMarker)} />
      )}
    </>
  ) : (
    <></>
  );
}
