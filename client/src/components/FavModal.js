import { useState } from 'react';
import Btn from './Btn';
import { ADD_FAVOURITE, EDIT_FAVOURITE } from '../graphql/userQueries';
import { useMutation } from '@apollo/client';

export default function FavModal({ id, trailId, trailName, trailComment, toggleModal, fetchFavourites }) {

    //State variable for the comment field
    const [comment, setComment] = useState(trailComment);

    //Mutation for the DB to update the user favourites
    const [updateFavourite] = useMutation(ADD_FAVOURITE);

    //Mutation for the DB to edit the user favourite
    const [editFavourite] = useMutation(EDIT_FAVOURITE);


    const handleAdd = async () => {
        await updateFavourite({ variables: { id: parseInt(trailId), notes: comment, name: trailName } })
            .then(resp => {
                //Re-fetch lazy query to refresh the favourites on the dashboard page
                fetchFavourites();
                toggleModal(false);
            })
            .catch(err => console.error(err));
    };

    const handleEdit = async () => {
        await editFavourite({ variables: { id: parseInt(id), notes: comment } })
            .then(resp => {
                //Re-fetch lazy query to refresh the favourites on the dashboard page
                fetchFavourites();
                toggleModal(false);
            })
            .catch(err => console.error(err));
    };


    return (
        <section className="modal">
            <span className="modal__close" onClick={() => toggleModal(false)}></span>
            <div className="container modal__content">
                {trailName ? <p className="modal__trail-name">{trailName}</p> : <p className="modal__trail-name">Loading Trail Name</p>}
                <label className="modal__comment-label">
                    Comment
                    <textarea
                        className="modal__comment"
                        autoFocus
                        maxLength="190"
                        name="favComment"
                        placeholder="(optional) Comment on this hike"
                        spellCheck="true"
                        value={comment}
                        onChange={(e) => setComment(e.target.value)}
                    ></textarea>
                </label>
                <Btn addClass="modal__cancel-btn" type="button" handleClick={() => toggleModal(false)}>Cancel</Btn>
                {/* Conditionally render the correct button whether the modal is to add a new favourite or edit an existing */}
                {!id ?
                    trailId && trailName ? <Btn addClass="modal__sub-btn" type="button" handleClick={handleAdd}>Add</Btn> : <Btn addClass="modal__sub-btn-loading" type="button" >Data Loading</Btn>
                    :
                    trailId && trailName && trailComment ? <Btn addClass="modal__sub-btn" type="button" handleClick={handleEdit}>Update</Btn> : <Btn addClass="modal__sub-btn-loading" type="button" >Data Loading</Btn>
                }
            </div>
        </section>
    );
};
