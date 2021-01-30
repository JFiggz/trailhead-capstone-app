import favHeart from '../assets/icons/favorite.svg'

export default function TrailCard({ trail, time, km, height, handleAddFavourite, currentFavourites, handleEditFavourite }) {

    const { id, name, stars, url, imgMedium, imgSmallMed, imgSmall, imgSqSmall, conditionStatus } = trail;

    // Check to see if the trail needed to be added (if so trigger model with blank data) or edited (set model data to existing user favourite data)
    const checkFavourites = (e) => {

        const favouritedTrail = currentFavourites.find(fav => fav.trail_id === id);

        if (favouritedTrail) {
            return handleEditFavourite(e, favouritedTrail.id, favouritedTrail.trail_id, favouritedTrail.trail_name, favouritedTrail.trail_notes);
        } else {
            return handleAddFavourite(e, id, name);
        }
    };

    return (
        <>
            <a className="card" target="_blank" rel="noreferrer" href={url} id={id} onClick={(e) => e.stopPropagation()}>
                {/* If user has the specific trail already favourites then render a different style to indicate so */}
                <img className={`card__favourite-btn ${currentFavourites.find(fav => fav.trail_id === id) ? "card__favourite-btn--active" : ""}`} src={favHeart} alt="Favourite trail icon" onClick={(e) => checkFavourites(e)} />
                {/* Not all trails have the same image sizes and some have no image at all, this checks to see if any of the image properties have values and then renders the images most appropriate order */}
                {imgMedium || imgSmallMed || imgSmall || imgSqSmall ?
                    <img className="card__img" src={imgMedium || imgSmallMed || imgSmall || imgSqSmall} alt={`${name} trail`} /> : <p className="card__no-img-text">No image found for this trail.</p>}
                <span>
                    <label className="card__label" >
                        Name:
                        <p className="card__text card__text--name">{name}</p>
                    </label>
                    <label className="card__label" >
                        Star Rating(1-5):
                        <p className="card__text">{stars}</p>
                    </label>
                    <label className="card__label" >
                        KM:
                        <p className="card__text">{km}</p>
                    </label>
                    <label className="card__label" >
                        Time:
                        <p className="card__text">{`${time.hrs} Hrs ${time.min} Min`}</p>
                    </label>
                    <label className="card__label" >
                        Ascent(m):
                        <p className="card__text">{height}</p>
                    </label>
                    <label className="card__label" >
                        Condition Status:
                        <p className="card__text">{conditionStatus}</p>
                    </label>
                </span>
            </a>
        </>
    );
};