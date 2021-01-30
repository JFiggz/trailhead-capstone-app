import {gql} from '@apollo/client';

//queries
export const GET_TRAILS = gql `
    query GetTrails($lat: Float!, $lon: Float!, $maxDist: Int, $maxResults: Int, $minLen:Int, $minStars:Int){
        getTrails(lat: $lat, lon: $lon, maxDist: $maxDist, maxResults: $maxResults, minLen:$minLen, minStars:$minStars){
            id
            name
            type
            summary
            difficulty
            stars
            location
            url
            imgMedium
            imgSqSmall
            imgSmall
            imgSmallMed
            length
            ascent
            descent
            longitude
            latitude
            conditionStatus
        }
    }
`;