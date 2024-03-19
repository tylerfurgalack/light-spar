import React, { useState, useEffect, useRef } from "react";
import FormError from "../layout/FormError";
import ErrorList from "../layout/ErrorList";
import translateServerErrors from "../../services/translateServerErrors";
import config from "../../config";

const RegistrationForm = () => {
  const [userPayload, setUserPayload] = useState({
    username: "",
    weight: "",
    location: "",
    email: "",
    password: "",
    passwordConfirmation: "",
  });

  const [errors, setErrors] = useState({});

  const [serverErrors, setServerErrors] = useState({});

  const [shouldRedirect, setShouldRedirect] = useState(false);

  const validateInput = (payload) => {
    setErrors({});
    const { email, password, passwordConfirmation, username, weight, location } = payload;
    const emailRegexp = config.validation.email.regexp;
    let newErrors = {};

    if (username.trim() === "") {
      newErrors = {
        username: "is required",
        ...newErrors,
      };
    }

    if (location.trim() === "") {
      newErrors = {
        location: "is required",
        ...newErrors,
      };
    }

    if (weight === "") {
      newErrors = {
        weight: "is required",
        ...newErrors,
      };
    } else if (!Number.isInteger(Number(weight))) {
      newErrors = {
        weight: "must be an integer",
        ...newErrors,
      };
    }

    if (!email.match(emailRegexp)) {
      newErrors = {
        ...newErrors,
        email: "is invalid",
      };
    }

    if (password.trim() == "") {
      newErrors = {
        ...newErrors,
        password: "is required",
      };
    }

    if (passwordConfirmation.trim() === "") {
      newErrors = {
        ...newErrors,
        passwordConfirmation: "is required",
      };
    } else {
      if (passwordConfirmation !== password) {
        newErrors = {
          ...newErrors,
          passwordConfirmation: "does not match password",
        };
      }
    }

    setErrors(newErrors);
    if (Object.keys(newErrors).length === 0) {
      return true;
    }
    return false;
  };

  const onSubmit = async (event) => {
    event.preventDefault();
    if (validateInput(userPayload)) {
      try {
        if (Object.keys(errors).length === 0) {
          const response = await fetch("/api/v1/users", {
            method: "post",
            body: JSON.stringify(userPayload),
            headers: new Headers({
              "Content-Type": "application/json",
            }),
          });
          if (!response.ok) {
            if (response.status === 422) {
              const body = await response.json();
              const newServerErrors = translateServerErrors(body.errors);
              return setServerErrors(newServerErrors);
            }
            const errorMessage = `${response.status} (${response.statusText})`;
            const error = new Error(errorMessage);
            throw error;
          }
          const userData = await response.json();
          setShouldRedirect(true);
        }
      } catch (err) {
        console.error(`Error in fetch: ${err.message}`);
      }
    }
  };

  const onInputChange = (event) => {
    setUserPayload({
      ...userPayload,
      [event.currentTarget.name]: event.currentTarget.value,
    });
  };

  if (shouldRedirect) {
    location.href = "/";
  }

  const autoCompleteRef = useRef();
  const inputRef = useRef();

  const initMap = () => {
    const options = {
      types: ["(cities)"],
    };

    autoCompleteRef.current = new window.google.maps.places.Autocomplete(inputRef.current, options);
    autoCompleteRef.current.addListener("place_changed", () => {
      const selectedPlace = autoCompleteRef.current.getPlace();
      if (selectedPlace && selectedPlace.formatted_address) {
        console.log(`google listener`, userPayload);
        setUserPayload((userPayloadPending) => {
          return {
            ...userPayloadPending,
            location: selectedPlace.formatted_address,
          };
        });
      }
    });
  };

  useEffect(() => {
    const loadScript = () => {
      const script = document.createElement("script");
      script.type = "text/javascript";
      script.src = `https://maps.googleapis.com/maps/api/js?key=AIzaSyDLGIItpnt5wyW2QbJxY3PIHDMxm-bRSg4&libraries=places`;
      document.body.appendChild(script);
      script.onload = () => initMap();
    };

    // const initMap = () => {
    //   const options = {
    //     types: ["(cities)"],
    //   };

    //   autoCompleteRef.current = new window.google.maps.places.Autocomplete(
    //     inputRef.current,
    //     options
    //   );
    //   autoCompleteRef.current.addListener("place_changed", () => {
    //     const selectedPlace = autoCompleteRef.current.getPlace();
    //     if (selectedPlace && selectedPlace.formatted_address) {
    //       console.log(`google listener`, userPayload);
    //       setUserPayload((userPayloadPending) => {
    //         return {
    //           ...userPayloadPending,
    //           location: selectedPlace.formatted_address,
    //         };
    //       });
    //     }
    //   });
    // };

    loadScript();
  }, []);
  return (
    <div className="registration-background">
      <div className="grid-container form-container">
        <h1>Register</h1>
        <ErrorList errors={serverErrors} />
        <form onSubmit={onSubmit}>
          <div>
            <label className="form-labels">Your User Name</label>
            <input
              className="form-input"
              type="text"
              name="username"
              value={userPayload.username}
              onChange={onInputChange}
            />
            <FormError error={errors.username} />
          </div>
          <div>
            <label className="form-labels">Your Weight (lbs)</label>
            <input
              className="form-input"
              type="number"
              name="weight"
              value={userPayload.weight}
              onChange={onInputChange}
            />
            <FormError error={errors.weight} />
          </div>
          <div>
            <label className="form-labels">Your Location</label>
            <input
              className="form-input"
              type="text"
              name="location"
              value={userPayload.location}
              onChange={onInputChange}
              ref={inputRef}
            />
            <FormError error={errors.location} />
          </div>

          <div>
            <label className="form-labels">
              Email
              <input
                className="form-input"
                type="text"
                name="email"
                value={userPayload.email}
                onChange={onInputChange}
              />
              <FormError error={errors.email} />
            </label>
          </div>
          <div>
            <label className="form-labels">
              Password
              <input
                className="form-input"
                type="password"
                name="password"
                value={userPayload.password}
                onChange={onInputChange}
              />
              <FormError error={errors.password} />
            </label>
          </div>
          <div>
            <label className="form-labels">
              Password Confirmation
              <input
                className="form-input"
                type="password"
                name="passwordConfirmation"
                value={userPayload.passwordConfirmation}
                onChange={onInputChange}
              />
              <FormError error={errors.passwordConfirmation} />
            </label>
          </div>
          <div>
            <input type="submit" className="button" value="Register" />
          </div>
        </form>
      </div>
    </div>
  );
};

export default RegistrationForm;
