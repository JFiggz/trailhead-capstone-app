import LoadingSpinner from './LoadingSpinner';
import DeleteBtn from '../assets/icons/delete.svg';
import EditBtn from '../assets/icons/edit.svg';
import FavModal from './FavModal';
import { useMutation } from "@apollo/client";
import { DELETE_FAVOURITE } from '../graphql/userQueries';

export default function Favourites({ favourites, fetchFavourites, modalState, toggleModal, selectedFavData, handleEditFavourite }) {

    //GQL mutation to delete a favourite record
    const [deleteFavourite] = useMutation(DELETE_FAVOURITE);

    const handleDelete = (id) => {
        deleteFavourite({ variables: { id: parseInt(id) } })
            .then(resp => {
                fetchFavourites();
            })
            .catch(err => console.log(err));
    };

    return (
        <section className="favourites">
            <h2 className="favourites__header">Favourites</h2>
            <span className="favourites__column-headers">
                <p className="favourites__column-text">Name</p>
                <p className="favourites__column-text">Notes</p>
            </span>
            <ul className="favourites__list">

                {favourites ?
                    favourites.map(favourite => {
                        return (
                            <li key={favourite.trail_id} id={favourite.trail_id} className="favourites__list-item">
                                <span>
                                    <button id={favourite.id} type="button" className="favourites__btn favourites__btn--edit" onClick={(e) => handleEditFavourite(e)} ><img src={EditBtn} alt="Edit button icon" /></button>
                                    <button id={favourite.id} type="button" className="favourites__btn favourites__btn--delete" onClick={(e) => handleDelete(e.target.id)} ><img src={DeleteBtn} alt="Delete button icon" /></button>
                                </span>
                                <p id={`trailName${favourite.id}`} className="favourites__text favourites__text--name">{favourite.trail_name}</p>
                                <p id={`trailNotes${favourite.id}`} className="favourites__text favourites__text--notes">{favourite.trail_notes}</p>
                            </li>
                        )
                    })
                    :
                    <LoadingSpinner />
                }
            </ul>
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