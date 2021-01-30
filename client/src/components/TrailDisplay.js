import TrailCarousel from './TrailCarousel';
import TrailFilter from './TrailFilter';
import FavModal from './FavModal';
import { useState } from 'react';
import { convertToMile, calcHikingTime } from '../utils/timeDistConverters';

export default function TrailDisplay({ lat, lon, trails, handleFilter, fetchFavourites, modalState, toggleModal, updateFavData, selectedFavData, currentFavourites, handleEditFavourite }) {

    //State variables
    //State variable to store the driving distance set by the user
    const [driveDist, setDriveDist] = useState("");

    //State variable to set the hike distance, time and search values from user input
    const [filters, setFilters] = useState({
        hikeDist: 50,
        hikeTime: 24,
        search: ""
    });

    //Trigger the favourite model with the data for the selected trail, update comment based on user input
    const handleAddFavourite = (e, id, name) => {
        e.preventDefault();

        updateFavData({
            id: "",
            trailName: name,
            trailId: id,
            trailComment: "",
        });

        toggleModal(true);
    };

    //Obtain the data from the user input and call the getTrails lazy query to retrieve the trails with these parameters.
    const retrieveFilteredTrails = () => {

        const variablesObj = {
            lat: lat,
            lon: lon,
            maxDist: driveDist ? Math.ceil(convertToMile(driveDist)) : "",
        }

        setFilters({
            hikeDist: 50,
            hikeTime: 24,
            search: ""
        });

        handleFilter({ variables: variablesObj });
    };

    //Dynamically filter trails based on the distance slider, time slider or search bar
    const manualFilterTrails = (trailArr) => {
        return trailArr.filter(trail => {
            const lowerCaseTrail = trail.name.toLowerCase();
            const userDist = convertToMile(filters.hikeDist);
            const trailHikeTime = calcHikingTime(trail.length, trail.ascent).combined;

            if (trail.length < userDist && trailHikeTime < filters.hikeTime) {
                if (filters.search) {
                    return lowerCaseTrail.includes(filters.search) ? trail : null;
                }
                return trail;
            } else {
                return null;
            }
        });
    };

    return (
        <section className="trail-disp">
            <div className="trail-disp__cont">
                <h2 className="trail-disp__header">Trails</h2>
                <TrailFilter
                    driveDist={driveDist}
                    setDriveDist={setDriveDist}
                    filterVal={filters}
                    setFilters={setFilters}
                    retrieveFilteredTrails={retrieveFilteredTrails}
                />
            </div>
            <TrailCarousel trails={manualFilterTrails(trails)} toggleModal={toggleModal} handleAddFavourite={handleAddFavourite} currentFavourites={currentFavourites} handleEditFavourite={handleEditFavourite} />
            {modalState ?
                <FavModal
                    toggleModal={toggleModal}
                    id={selectedFavData.id}
                    trailId={selectedFavData.trailId}
                    trailName={selectedFavData.trailName}
                    trailComment={selectedFavData.trailComment}
                    fetchFavourites={fetchFavourites}
                />
                :
                ""
            }
        </section>
    );
};
