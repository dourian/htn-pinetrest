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

const GOOGLE_MAPS_API_KEY = "AIzaSyBgx2IEOegL2ILr6cdBzeymb3-6GChTTIc";
const GOOGLE_MAPS_LIBRARIES = ["places"];

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
    const results = await getGeocode({ address });
    const { lat, lng } = await getLatLng(results[0]);
    setSelected({ lat, lng });
    clearSuggestions();
  };

  return (
    <div className={`drop_shadow w-full absolute z-10 top-5 items-center`}>
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
    </div>
  );
};

export default function MapWrapper({
  currentLat,
  setCurrentLat,
  currentLng,
  setCurrentLng,
  needRefresh,
  setNeedRefresh,
  activeMarker,
  setActiveMarker,
  displayform,
  setDisplayForm
}) {
  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: GOOGLE_MAPS_API_KEY,
    libraries: GOOGLE_MAPS_LIBRARIES,
  });

  return (
    isLoaded && (
      <TrailMap
        currentLat={currentLat}
        currentLng={currentLng}
        setCurrentLat={setCurrentLat}
        setCurrentLng={setCurrentLng}
        needRefresh={needRefresh}
        setNeedRefresh={setNeedRefresh}
        activeMarker={activeMarker}
        setActiveMarker={setActiveMarker}
        displayform={displayform}
        setDisplayForm={setDisplayForm}
      />
    )
  );
}

const TrailMap = ({
  currentLat,
  setCurrentLat,
  currentLng,
  setCurrentLng,
  needRefresh,
  setNeedRefresh,
  activeMarker,
  setActiveMarker,
  displayform,
  setDisplayForm
}) => {
  const google = window.google;
  const [selected, setSelected] = useState({
    lat: 43.47027710637713,
    lng: -80.53854722551067,
  });
  const [, setMap] = React.useState(null);

  const handleActiveMarker = (marker) => {
    if (marker === activeMarker) {
      return;
    }
    setActiveMarker(marker);
  };

  const containerStyle = {
    width: "100svw",
    height: "100svh",
  };

  const [markers, setMarkers] = useState(null);

  const onLoad = React.useCallback(
    function callback(map) {
      const bounds = new window.google.maps.LatLngBounds(selected);
      map.fitBounds(bounds);
      setMap(map);
    },
    [selected]
  );

  const onUnmount = React.useCallback(function callback() {
    setMap(null);
  }, []);

  useEffect(() => {
    const requestOptions = {
      method: "GET",
      redirect: "follow",
    };

    fetch("https://pientrest-15ef1ac3bb8f.herokuapp.com/getPoints", requestOptions)
      .then((response) => response.text())
      .then((result) => setMarkers(JSON.parse(result)))
      .catch((error) => console.log("error", error));

    setNeedRefresh(false);
  }, [needRefresh, setNeedRefresh]);

  return (
    <>
      <div className="places-container">
        <PlacesAutocomplete setSelected={setSelected} />
      </div>
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={selected}
        defaultZoom={3}
        onLoad={onLoad}
        onUnmount={onUnmount}
        onClick={(ev) => {
          setActiveMarker(null);
          setCurrentLat(ev.latLng.lat());
          setCurrentLng(ev.latLng.lng());
          setSelected({ lat: ev.latLng.lat(), lng: ev.latLng.lng() });
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
          <React.Fragment key={markerinfo.username}>
            <MarkerF
              key={"marker-" + markerinfo.username}
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
                key={"info-window-" + markerinfo.username}
                onCloseClick={() => setActiveMarker(null)}
                position={{
                  lat: markerinfo.location.latitude,
                  lng: markerinfo.location.longitude,
                }}
              >
                <div
                  key={"info-window-content-" + markerinfo.username}
                  className="h-16 w-32 rounded-3xl justify-center overflow-hidden"
                  onClick={() => {
                    handleActiveMarker(markerinfo.image_url);
                    setSelected({
                      lat: markerinfo.location.latitude,
                      lng: markerinfo.location.longitude,
                    });
                  }}
                >
                  <img
                    alt=""
                    src={markerinfo.image_url}
                    className=" w-full markerinfo"
                    key={"marker-image-" + markerinfo.username}
                  ></img>
                </div>
              </InfoWindowF>
            </MarkerF>
          </React.Fragment>
        ))}

        <></>
      </GoogleMap>
      {activeMarker && markers && (
        <Hover markerinfo={markers.find((e) => e.image_url === activeMarker)} setActiveMarker={setActiveMarker} setDisplayForm={setDisplayForm}/>
      )}
    </>
  );
};
