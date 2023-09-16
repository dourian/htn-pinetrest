import React, { useState } from "react";
import { GoogleMap, Marker, useJsApiLoader } from "@react-google-maps/api";
import usePlacesAutocomplete, {
  getGeocode,
  getLatLng,
} from "use-places-autocomplete";

const containerStyle = {
  width: "100vw",
  height: "100vh",
};

const center = {
  lat: 43.473176,
  lng: -80.539849,
};

const libraries = ["places"];

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

export default function MapWrapper() {
  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: "AIzaSyBgx2IEOegL2ILr6cdBzeymb3-6GChTTIc",
    libraries,
  });

  return isLoaded ? <Map /> : <></>;
}

function Map() {
  const google = window.google;

  const [selected, setSelected] = useState(null);
  const [map, setMap] = React.useState(null);

  const onLoad = React.useCallback(function callback(map) {
    // This is just an example of getting and using the map instance!!! don't just blindly copy!
    const bounds = new window.google.maps.LatLngBounds(center);
    map.fitBounds(bounds);

    setMap(map);
  }, []);

  const onUnmount = React.useCallback(function callback(map) {
    setMap(null);
  }, []);

  return (
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
        options={{ disableDefaultUI: true, mapId: "10561e5854fbba2e" }}
      >
        {/* Child components, such as markers, info windows, etc. */}
        {selected && (
          <>
            <Marker
              z-zIndex={20}
              position={center}
              icon={{
                url: "https://firebasestorage.googleapis.com/v0/b/impactful-ring-399204.appspot.com/o/shinguh.png?alt=media&token=1a8cc7a6-7b71-4b65-a649-bcbaf9269abc",
                scaledSize: new google.maps.Size(100, 100),
              }}
              title="shinguh"
            />
            <Marker
              position={{
                lat: 43.4642578,
                lng: -80.5204096,
              }}
            />{" "}
          </>
        )}
        <></>
      </GoogleMap>
    </>
  );
}
