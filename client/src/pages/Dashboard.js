import CurrentWeather from '../components/CurrentWeather';
import ForecastWeather from '../components/ForecastWeather';
import TrailDisplay from '../components/TrailDisplay';
import UserLocation from '../components/UserLocation';
import Favourites from '../components/Favourites';
import DBNavBar from '../components/DbNavBar';
import NotSignedInPage from './NotSignedInPage';
import { addError, removeError } from '../utils/handleValidation';
import { useState, useEffect } from 'react';
import { GET_USER_DATA, GET_USER_CITY, GET_USER_COORDINATES, GET_USER_FAVOURITES } from '../graphql/userQueries';
import { GET_TRAILS } from '../graphql/hikingQueries';
import { GET_AIR_QUALITY, GET_CURRENT_WEATHER, GET_DAILY_WEATHER } from '../graphql/weatherQueries';
import { useMutation, useLazyQuery } from '@apollo/client';
import LoadingSpinner from '../components/LoadingSpinner';
import { useHistory } from 'react-router-dom';

export default function Dashboard() {

    const history = useHistory();

    //GraphQL queries and mutations
    const [getUserCoordinates, { data: userCoords }] = useMutation(GET_USER_COORDINATES);
    const [getUserData, { data: userData, loading: userLoad, error: userError }] = useMutation(GET_USER_DATA);

    const [getUserCity, { data: userCity, loading: cityLoad }] = useLazyQuery(GET_USER_CITY);
    const [getTrails, { data: trails, loading: trailLoad }] = useLazyQuery(GET_TRAILS);
    const [getAirQuality, { data: airQ, loading: airQLoad }] = useLazyQuery(GET_AIR_QUALITY);
    const [getCurrentWeather, { data: currWeather, loading: currWLoad }] = useLazyQuery(GET_CURRENT_WEATHER);
    const [getDailyWeather, { data: dailyWeather, loading: dailyWLoad }] = useLazyQuery(GET_DAILY_WEATHER);
    const [getUserFavourites, { data: userFav, loading: userFavLoad, refetch: fetchFavourites }] = useLazyQuery(GET_USER_FAVOURITES);

    //React state hooks
    //Store user coordinates once re-set with manual location search on dashboard. Initial coordinates are provided from user profile.
    const [coordinates, setCoordinates] = useState({
        lat: "",
        lon: "",
    });
    const [location, updateLocation] = useState({
        city: "",
    });


    //Favourite modal states
    const [modalState, toggleModal] = useState(false);

    const [selectedFavData, updateFavData] = useState({
        id: "",
        trailName: "",
        trailId: "",
        trailComment: "",
    });


    useEffect(() => {
        const updateDash = async () => {
            if (coordinates.lat && coordinates.lon) {
                setupDashboardPanels(coordinates.lat, coordinates.lon)
            } else {
                await setUserData();
            };
        }
        updateDash();

        // eslint-disable-next-line 
    }, [getUserData, getUserCity, coordinates])

    //Retrieve stored user data and setup inital dashboard. Validation if user decided to skip the new user setup page.
    const setUserData = async () => {
        return getUserData()
            .then(({ data }) => {
                if (!data.getUserData.UserPref) {
                    history.push('/newuser');
                } else {
                    getUserCity({ variables: { lat: data.getUserData.UserPref.set_lat, lon: data.getUserData.UserPref.set_lon } });
                    setupDashboardPanels(data.getUserData.UserPref.set_lat, data.getUserData.UserPref.set_lon);
                };
            })
            .catch(err => console.log(err));
    };

    //Setup all dashboard panels based on lat/lon
    const setupDashboardPanels = (lat, lon) => {
        getTrails({ variables: { lat: lat, lon: lon } });
        getAirQuality({ variables: { lat: lat, lon: lon } });
        getCurrentWeather({ variables: { lat: lat, lon: lon } });
        getDailyWeather({ variables: { lat: lat, lon: lon } });
        getUserFavourites();
    };

    //Helper Functions
    //Validate the user location manually entered on the dashboard
    const checkLocation = async (e) => {
        e.preventDefault();

        const city = e.target.city;
        const country = e.target.country;

        const locationObj = {
            ...location,
            country: country.value
        };

        if (city.value.trim()) {
            await getUserCoordinates({ variables: locationObj })
                .then(({ data }) => {
                    // Set the location coordinates based on the city/country entered
                    setCoordinates({
                        lat: data.getUserCoordinates.lat,
                        lon: data.getUserCoordinates.lng,
                    });
                    //Reset the location hook state
                    updateLocation({
                        city: "",
                    });
                })
                .catch(err => {
                    addError(city, "manualLocValidate");
                });
        } else {
            if (!city.value.trim()) {
                addError(city, "errorValidate");
            };
        };
    };

    //Used to store state for the user entered location before searching for lat/lon
    const setLocation = (e) => {
        removeError(e.target, ["errorValidate", "manualLocValidate"]);
        updateLocation({
            ...location,
            [e.target.name]: e.target.value
        });
    };

    //Handle the edit for each trail card that is already favourited or the favourites listing
    const handleEditFavourite = (e, dbId, tId, tName, tNotes) => {
        e.preventDefault();

        if (dbId && tId && tName && tNotes) {
            updateFavData({
                id: dbId,
                trailName: tName,
                trailId: tId,
                trailComment: tNotes,
            });

        } else {
            const id = e.target.id;
            const trailId = e.target.parentElement.parentElement.id;
            const trailName = document.getElementById(`trailName${id}`).innerText;
            const trailNotes = document.getElementById(`trailNotes${id}`).innerText;

            updateFavData({
                id: id,
                trailName: trailName,
                trailId: trailId,
                trailComment: trailNotes,
            });

        }

        toggleModal(true);
    };


    if (!userLoad && userData) {
        return (
            <section className="container dashboard">
                <DBNavBar />
                <h2 className="dashboard__header">{`Welcome back, ${!userLoad && userData ? userData.getUserData.first_name : ""}!`}</h2>
                {!cityLoad && userCity ?
                    <UserLocation
                        city={userCoords?.getUserCoordinates?.city ? userCoords.getUserCoordinates.city : userCity.getUserCity.city}
                        prov={userCoords?.getUserCoordinates?.country ? userCoords.getUserCoordinates.country : userCity.getUserCity.state}
                        handleSubmit={checkLocation}
                        handleChange={setLocation}
                        setLoc={location}
                    />
                    : <LoadingSpinner />}

                {!currWLoad && !airQLoad && airQ && currWeather ?
                    <CurrentWeather
                        weatherIcon={currWeather.getCurrentWeather.weather[0].icon}
                        weatherDesc={currWeather.getCurrentWeather.weather[0].description}
                        temp={Math.round(currWeather.getCurrentWeather.temp)}
                        airQuality={airQ.getAirQuality.aqius}
                    />
                    : <LoadingSpinner />}

                {!dailyWLoad && dailyWeather ?
                    <ForecastWeather
                        forecast={dailyWeather.getDailyWeather}
                    />
                    : <LoadingSpinner />}

                {!trailLoad && !userFavLoad && trails && userFav ?
                    <TrailDisplay
                        lat={coordinates.lat ? coordinates.lat : userData.getUserData.UserPref.set_lat}
                        lon={coordinates.lon ? coordinates.lon : userData.getUserData.UserPref.set_lon}
                        trails={trails.getTrails}
                        handleFilter={getTrails}
                        fetchFavourites={fetchFavourites}
                        modalState={modalState}
                        toggleModal={toggleModal}
                        updateFavData={updateFavData}
                        selectedFavData={selectedFavData}
                        currentFavourites={userFav.getUserFavourites}
                        handleEditFavourite={handleEditFavourite}
                    />
                    : <LoadingSpinner />}

                {!userFavLoad && userFav ?
                    <Favourites
                        favourites={userFav.getUserFavourites}
                        fetchFavourites={fetchFavourites}
                        modalState={modalState}
                        toggleModal={toggleModal}
                        selectedFavData={selectedFavData}
                        handleEditFavourite={handleEditFavourite}
                    />
                    : <LoadingSpinner />}

            </section>
        );
    } else if (!userLoad && userError) {
        return <NotSignedInPage />;
    } else {
        return <LoadingSpinner />;
    };
};