import { Loader } from "@googlemaps/js-api-loader";

const googlePlacesAPI = (inputRef, autoCompleteRef, setUserPayload, userPayload) => {
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
      const selectedPlace = autoCompleteRef.current.getPlace();
      inputRef.current.value = selectedPlace.formatted_address;
      setUserPayload((prevState) => ({
        ...prevState,
        location: selectedPlace.formatted_address,
      }));
    });
  });
  return userPayload;
};

export default googlePlacesAPI;
