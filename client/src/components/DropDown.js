import { forwardRef } from 'react';
import { countryList } from '../data/countryList';

export const DropDown = forwardRef(({ name, id, addClass }, ref) => {
    //Drop down country listing, data is pulled from countryList. Default selection is Canada
    return (
        <select required className={`dropdown ${addClass ? addClass : ""}`} name={name || 'country'} id={id || 'country-select'} ref={ref} defaultValue={'Canada'}>
            {countryList.map((country, i) => <option key={i} value={country} >{country}</option>)}
        </select>
    );
});