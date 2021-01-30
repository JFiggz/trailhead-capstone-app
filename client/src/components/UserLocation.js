import Btn from './Btn';
import { DropDown } from './DropDown';

export default function UserLocation({ city, prov, handleSubmit, handleChange, setLoc }) {
    return (
        <section className="user-location">
            <h3 className="user-location__sub-header" >Currently Set Location:</h3>
            <p className="user-location__text" >{`${city}, ${prov}`}</p>
            <h3 className="user-location__sub-header" >Search for a new city:</h3>
            <form className="user-location__form" onSubmit={(e) => handleSubmit(e)}>
                <label className="user-location__label">
                    <input className='input' placeholder='City name' name="city" type="text" onChange={(e) => handleChange(e)} value={setLoc ? setLoc.city : ""} />
                    City*
                </label>

                <label className="user-location__label">
                    <DropDown />
                    Country*
                </label>
                <Btn>Update location</Btn>
            </form>
        </section>
    );
};