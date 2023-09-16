import React from "react";
import { GoogleMap } from "@react-google-maps/api";
import usePlacesAutocomplete, {
  getGeocode,
  getLatLng,
} from "use-places-autocomplete";

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

export default function TrailMap() {
  const libraries = ["places", "markers"];

  const { isLoaded } = useLoadScript({
    googleMapsApiKey: "AIzaSyBgx2IEOegL2ILr6cdBzeymb3-6GChTTIc",
    libraries,
    id: "google-map-script",
  });

  const center = useMemo(() => ({ lat: 43.473176, lng: -80.539849 }), []);

  return (
    <div className="App">
      {!isLoaded ? (
        <h1>Loading...</h1>
      ) : (
        <GoogleMap
          mapContainerClassName="map-container"
          center={center}
          zoom={10}
        />
      )}
    </div>
  );
}

{
  /* <div className="places-container">
<PlacesAutocomplete setSelected={setSelected} />
</div> */
}
