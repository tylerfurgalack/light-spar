import { Loader } from "@googlemaps/js-api-loader";

const googlePlacesAPIFilter = (inputRef, autoCompleteRef, setLocationFilter, locationFilter) => {
  const loader = new Loader({
    apiKey: "AIzaSyDLGIItpnt5wyW2QbJxY3PIHDMxm-bRSg4",
    version: "weekly",
    libraries: ["places"],
  });

  loader.load().then(() => {
    const options = {
      types: ["(cities)"],
    };

    autoCompleteRef.current = new window.google.maps.places.Autocomplete(inputRef.current, options);

    autoCompleteRef.current.addListener("place_changed", () => {
      const place = autoCompleteRef.current.getPlace();
      setLocationFilter(place.formatted_address);
    });
  });
  return locationFilter;
};

export default googlePlacesAPIFilter;
