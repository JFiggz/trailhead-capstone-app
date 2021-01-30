import { gql } from '@apollo/client';

//mutations
export const LOGIN_USER = gql`
    mutation LoginUser($email:String!, $pwd: String!){
        loginUser (email: $email, pwd: $pwd)
    }
`;

export const SIGNUP_USER = gql`
    mutation SignupUser($email:String!, $pwd: String!){
        signupUser (email: $email, pwd: $pwd)
    }
`;

export const ADD_FAVOURITE = gql`
    mutation AddFavourite($id:Int!, $notes: String, $name: String!){
        addFavourite (id: $id, notes: $notes, name: $name )
    }
`;


export const GET_USER_COORDINATES = gql`
    mutation GetUserCoordinates($city: String!, $country: String!){
        getUserCoordinates(city: $city, country: $country){
                lat
                lng
                city
                country
        }
    }
`;

export const UPDATE_USER_PREF = gql`
    mutation UpdateUserPref($fName: String!, $lName: String, $lat: Float!, $lon: Float!){
        updateUserPref(fName: $fName, lName: $lName, lat: $lat, lon: $lon)
    }
`;

export const GET_USER_DATA = gql`
    mutation{
        getUserData{
            id
            first_name
            last_name
            UserPref{
                set_lat
                set_lon
            }
            LastLocation{
                lat
                lon
            }
        }
    }
`;

export const LOGOUT_USER = gql`
    mutation {
        logoutUser
    }
`;

export const EDIT_FAVOURITE = gql`
    mutation EditFavourite($id:Int!, $notes:String){
        editFavourite(id:$id, notes:$notes)
    }
`;

export const DELETE_FAVOURITE = gql`
    mutation DeleteFavourite($id:Int!){
        deleteFavourite(id:$id)
    }
`;

//queries
export const GET_USER_FAVOURITES = gql`
    query{
        getUserFavourites{
            id
            trail_id
            trail_name
            trail_notes
        }
    }
`;

export const GET_USER_CITY = gql`
    query GetUserCity($lat: Float!, $lon: Float!){
        getUserCity(lat: $lat, lon: $lon){
            city
            state
            country
        }
    }
`;
