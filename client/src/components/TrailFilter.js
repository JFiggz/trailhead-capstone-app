import Btn from './Btn';
import TreeImg from '../assets/icons/tree-slider-img.svg';
import DropDown from '../assets/icons/arrow_drop_down.svg';
import DropUp from '../assets/icons/arrow_drop_up.svg';
import { useState } from 'react';

export default function TrailFilter({ driveDist, setDriveDist, filterVal, setFilters, retrieveFilteredTrails }) {

    //React state hook to hold the current state of the accordian menu for the filters (hide/show)
    const [isOpen, toggleFilters] = useState(false);

    //Calculate the conversion of the current value of the sliders to the width of the inner span element (darker bar)
    const widthStyle = (id) => {
        let calc = null;

        if (id === "maxDist") {
            calc = (filterVal.hikeDist / document.getElementById(id).getAttribute("max")) * 100;
        } else {
            calc = (filterVal.hikeTime / document.getElementById(id).getAttribute("max")) * 100;
        }
        return ({
            width: `${calc}%`
        });
    };


    return (
        <>
            <label className="trail-disp__filter-label">
                <span className="trail-disp__filter-header" onClick={() => toggleFilters(!isOpen)} aria-expanded={isOpen}>
                    Filters
                    <img className="trail-disp__dropdown-icon" src={isOpen ? DropUp : DropDown} alt="Dropdown toggle icon" />
                </span>

                {isOpen ?
                    <span>
                        <span className="trail-disp__drive-cont">
                            <label className="trail-disp__label trail-disp__label--first">
                                Driving Distance (KMs)
                                    <input
                                    type="number"
                                    className="trail-disp__input"
                                    value={driveDist}
                                    name="driveDist"
                                    onChange={(e) => setDriveDist(e.target.value)}
                                    placeholder="Maximum Distance"
                                />
                            </label>
                            <Btn type="button" addClass="trail-disp__btn" handleClick={retrieveFilteredTrails}>Update</Btn>
                        </span>

                        <label className="trail-disp__label">
                            Search
                            <input
                                type="text"
                                className="trail-disp__input trail-disp__search"
                                value={filterVal.search}
                                name="search"
                                placeholder="Search"
                                onChange={(e) => setFilters({
                                    ...filterVal,
                                    [e.target.name]: e.target.value
                                })}
                            />
                        </label>

                        <label className="trail-disp__label trail-disp__label--slider">
                            Hike Distance (Max KMs)
                            {/* Utilizes the function above to calculate the width of this element based on the value of the slider */}
                            <span className="trail-disp__progress" style={document.getElementById("maxDist") ? widthStyle("maxDist") : { width: "100%" }}><img src={TreeImg} alt="Slider thumb scrubber" className="trail-disp__progress-img" /><span>{filterVal.hikeDist}</span></span>
                            <input
                                type="range"
                                className="trail-disp__slider"
                                id="maxDist"
                                value={filterVal.hikeDist}
                                min="0"
                                max="50"
                                step="0.5"
                                name="hikeDist"
                                onChange={(e) => setFilters({
                                    ...filterVal,
                                    [e.target.name]: e.target.value
                                })}
                            />
                        </label>
                        <label className="trail-disp__label trail-disp__label--slider">
                            Hike Time (Max Hrs)
                            {/* Utilizes the function above to calculate the width of this element based on the value of the slider */}
                            <span className="trail-disp__progress" style={document.getElementById("maxTime") ? widthStyle("maxTime") : { width: "100%" }}><img src={TreeImg} alt="Slider thumb scrubber" className="trail-disp__progress-img" /><span>{filterVal.hikeTime}</span></span>
                            <input
                                type="range"
                                className="trail-disp__slider"
                                id="maxTime"
                                value={filterVal.hikeTime}
                                min="0"
                                max="24"
                                step="0.5"
                                name="hikeTime"
                                onChange={(e) => setFilters({
                                    ...filterVal,
                                    [e.target.name]: e.target.value
                                })}
                            />
                        </label>
                    </span>
                    :
                    ""
                }

            </label>
        </>
    );
};