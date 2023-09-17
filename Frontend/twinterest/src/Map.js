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
    setSelected({ lat, lng });
  };

  return (
    <form className={`drop_shadow w-full absolute z-10 top-5 items-center`}>
      <label>
        <input
          className={`border-[2px] rounded-lg mx-4 py-1 px-4 h-[50px] w-11/12`} // Change w-10/12 to w-full
          type="text"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          disabled={!ready}
          placeholder={"Where do you want to go?"}
        ></input>
      </label>
      {status === "OK" && (
        <div className="bg-white m-2 p-3 rounded-md">
          {data.map(({ place_id, description }) => (
            <button
              className="w-full text-start border-gray-200 border-y-[0.5px]"
              key={place_id}
              onClick={() => handleSelect(description)}
            >
              {description}
            </button>
          ))}
        </div>
      )}
    </form>
  );
};

export default function MapWrapper({
  currentLat,
  setCurrentLat,
  currentLng,
  setCurrentLng,
}) {
  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: "AIzaSyBgx2IEOegL2ILr6cdBzeymb3-6GChTTIc",
    libraries: ["places"]
  });
  const google = window.google;
  const [selected, setSelected] = useState({lat: 0, lng: 0});
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
        onClick={(ev) => {
          setActiveMarker(null);
          setCurrentLat(ev.latLng.lat());
          setCurrentLng(ev.latLng.lng());
        //   const tlat = parseFloat(ev.latLng.lat());
        //   const tlng = parseFloat(ev.latLng.lng());
        //   console.log(tlat, tlng)
          setSelected({lat: ev.latLng.lat(), lng: ev.latLng.lng()});
        }}
        options={{ disableDefaultUI: true, mapId: "10561e5854fbba2e" }}
      >
        {currentLat && currentLng && (
          <MarkerF
            key={"current-click"}
            position={{
              lat: currentLat,
              lng: currentLng,
            }}
          />
        )}
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
                  onClick={() => {
                    handleActiveMarker(markerinfo.image_url);
                    setSelected({lat: markerinfo.location.latitude, lng: markerinfo.location.longitude});
                }}
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
