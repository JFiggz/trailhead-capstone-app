import {gql} from '@apollo/client';

//queries
export const GET_AIR_QUALITY = gql `
    query GetAirQuality($lat: Float!, $lon: Float!){
        getAirQuality(lat: $lat, lon: $lon){
            aqius
        }
    }
`;

export const GET_CURRENT_WEATHER = gql `
    query GetCurrentWeather($lat: Float!, $lon: Float!){
        getCurrentWeather(lat: $lat, lon: $lon){
            dt
            sunrise
            sunset
            temp
            feels_like
            visibility
            weather{
                main
                description
                icon
            }
            rain{
                oneH
            }
            snow{
                oneH
            }
        }
    }
`;

export const GET_HOURLY_WEATHER = gql `
    query GetHourlyWeather($lat: Float!, $lon: Float!){
        getHourlyWeather(lat: $lat, lon: $lon){
            dt
            temp
            feels_like
            visibility
            weather{
                main
                description
                icon
            }
            pop
            rain{
                oneH
            }
            snow{
                oneH
            }
        }
    }
`;

export const GET_DAILY_WEATHER = gql `
    query GetDailyWeather($lat: Float!, $lon: Float!){
        getDailyWeather(lat: $lat, lon: $lon){
            dt
            sunrise
            sunset
            temp{
                morn
                day
                eve
                min
                max
            }
            feels_like{
                morn
                day
                eve
                night
            }
            weather{
                main
                description
                icon
            }
            pop
            rain
            snow
        }
    }
`;