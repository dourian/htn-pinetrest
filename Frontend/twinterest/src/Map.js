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

const PlacesAutocomplete = ({ setSelected }) => {
  const {
    ready,
    value,
    setValue,
    suggestions: { status, data },
    clearSuggestions,
  } = usePlacesAutocomplete();

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
            <p key={place_id}>{description}</p>
          ))}
      </div>
    </form>
  );
};

function MyComponent() {
  const google = window.google;

  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: "AIzaSyBgx2IEOegL2ILr6cdBzeymb3-6GChTTIc",
    libraries: ["places"],
  });

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

  return isLoaded ? (
    <>
      <div className="places-container">
        <PlacesAutocomplete setSelected={setSelected} />
      </div>
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={center}
        defaultZoom={3}
        onLoad={onLoad}
        onUnmount={onUnmount}
        options={{ disableDefaultUI: true, mapId: "10561e5854fbba2e" }}
      >
        {/* Child components, such as markers, info windows, etc. */}
        <Marker
          position={center}
          icon={{
            url: "https://firebasestorage.googleapis.com/v0/b/impactful-ring-399204.appspot.com/o/shinguh.png?alt=media&token=1a8cc7a6-7b71-4b65-a649-bcbaf9269abc",
            scaledSize: new google.maps.Size(100, 100),
          }}
          title="shinguh"
        />
        <></>
      </GoogleMap>
    </>
  ) : (
    <></>
  );
}

export default React.memo(MyComponent);
