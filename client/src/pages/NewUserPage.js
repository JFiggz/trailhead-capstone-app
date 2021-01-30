import { Input } from '../components/Input';
import Btn from '../components/Btn';
import { useState, useRef } from 'react';
import { GET_USER_COORDINATES, UPDATE_USER_PREF } from '../graphql/userQueries';
import { useMutation } from '@apollo/client';
import { useHistory } from 'react-router-dom';
import { addError, removeError } from '../utils/handleValidation';
import { DropDown } from '../components/DropDown';

export default function NewUserPage() {

    const history = useHistory();

    //React references for components used on the new user page
    const cityInput = useRef(null);
    const countryInput = useRef(null);
    const fNameInput = useRef(null);
    const lNameInput = useRef(null);

    //GQL Mutations for getting the coordinates based on user manual search for the city (vs. using Geolocation) and updating the user preferences for the signed in profile.
    const [getUserCoordinates] = useMutation(GET_USER_COORDINATES);
    const [updateUserPref] = useMutation(UPDATE_USER_PREF);

    //State variable to hold the user coordinates set.
    const [coordinates, setCoordinates] = useState(null);

    //Use browser geolocation API to automatically retrieve user coordinates
    const getLocation = () => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(position => {
                let lat = position.coords.latitude;
                let lon = position.coords.longitude;
                setCoordinates({
                    lat: parseFloat(lat.toPrecision(6)),
                    lon: parseFloat(lon.toPrecision(6)),
                });
            }, error => {
                console.log("Error in request for geolocation.", error);
            });
        } else {
            alert("Geolocation is not supported by this browser.");
        }
    };

    //Check user location based on manually entered city/country. Store the returned coordinates with validation for blank city field and error response if no results are found.
    const checkLocation = async (e) => {
        if (cityInput.current.value.trim() && countryInput.current.value.trim()) {
            return await getUserCoordinates({ variables: { city: cityInput.current.value, country: countryInput.current.value } })
                .then(({ data }) => {
                    setCoordinates({
                        lat: parseFloat(data.getUserCoordinates.lat.toPrecision(6)),
                        lon: parseFloat(data.getUserCoordinates.lng.toPrecision(6)),
                    });
                })
                .catch(err => {
                    addError(cityInput.current, "manualLocValidate");
                });
        } else {
            if (!cityInput.current.value.trim()) {
                addError(cityInput.current, "errorValidate");
            };
        };
    };

    //Validate all required fields (first name and coordinates) and update the currently signed in user profile. Push user to the dashboard if successful.
    const validateAndSubmit = async (e) => {
        if (coordinates && fNameInput.current.value.trim()) {
            await updateUserPref({ variables: { fName: fNameInput.current.value, lName: lNameInput.current.value, lat: coordinates.lat, lon: coordinates.lon } })
                .then(resp => {
                    history.push('/dashboard');
                })
                .catch(err => console.log(err));
        } else {
            if (!fNameInput.current.value.trim()) {
                addError(fNameInput.current, "errorValidate");
            }
            if (!coordinates) {
                addError(cityInput.current, "setLocationValidate");
            }
        }
    }


    return (
        <section className='container new-user'>
            <div className='new-user__container'>
                <h2 className="new-user__header"><span>Welcome!</span>Let's iron out a few details to get you started:</h2>

                <label className="new-user__label">
                    <Input addClass="new-user__input" placeholder='Enter your first name' name="fName" type="text" handleChange={removeError} errClass={["errorValidate"]} ref={fNameInput} />
                    First Name*
                </label>

                <label className="new-user__label">
                    <Input addClass="new-user__input" placeholder='Enter your first name' name="lName" type="text" handleChange={removeError} ref={lNameInput} />
                    Last Name
                </label>

                <h3 className="new-user__sub-header">Location*</h3>
                {coordinates ? <p className="new-user__coords">{`Coordinates: ${coordinates.lat} Lat, ${coordinates.lon} Lon`}</p> : <p className="new-user__coords">Coordinates:</p>}
                <Btn type="button" handleClick={getLocation}>Determine my location</Btn>
                <p className="new-user__city-select">Or enter nearest city below</p>

                <label className="new-user__label">
                    <Input addClass="new-user__input" placeholder='City name' name="city" type="text" handleChange={removeError} errClass={["errorValidate", "setLocationValidate", "manualLocValidate"]} ref={cityInput} />
                    City*
                </label>

                <label className="new-user__label">
                    <DropDown ref={countryInput} addClass="new-user__input" />
                    Country*
                </label>

                <Btn type="button" handleClick={checkLocation} >Update location</Btn>

                <Btn type="button" className="btn new-user__link" handleClick={validateAndSubmit}>Proceed to your dashboard</Btn>
            </div>
        </section>
    );
};