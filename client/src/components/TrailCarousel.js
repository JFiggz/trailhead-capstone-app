import { convertToKM, convertToMetre, calcHikingTime } from '../utils/timeDistConverters';
import Slider from 'react-slick';
import TrailCard from './TrailCard';
import LoadingSpinner from './LoadingSpinner';
import RightArrow from '../assets/icons/chevron_right.svg';
import LeftArrow from '../assets/icons/chevron_left.svg';

export default function TrailCarousel({ trails, handleAddFavourite, handleEditFavourite, currentFavourites }) {

    function ForwardArrow(props) {
        const { className, style, onClick } = props;
        return (
            <img className={className} style={{ ...style }} src={RightArrow} onClick={onClick} alt="Forward slider navigation arrow" />
        );
    };

    function BackArrow(props) {
        const { className, style, onClick } = props;
        return (
            <img className={className} style={{ ...style }} src={LeftArrow} onClick={onClick} alt="Back slider navigation arrow" />
        );
    };

    // Slick settings, see slick documentation for description of settings
    const settings = {
        className: "trail-disp__carousel",
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 2,
        slidesToScroll: 1,
        initialSlide: 0,
        centerMode: true,
        rows: 1,
        useTransform: false,
        nextArrow: <ForwardArrow />,
        prevArrow: <BackArrow />,
        responsive: [
            {
                breakpoint: 1199,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 1,
                    infinite: true,
                    dots: false,
                    centerMode: true,
                    rows: 1,
                }
            },
            {
                breakpoint: 1080,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1,
                    infinite: true,
                    dots: false,
                    centerMode: true,
                    rows: 1,
                }
            },
            {
                breakpoint: 650,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    infinite: false,
                    dots: false,
                    centerMode: true,
                    rows: 1,
                }
            }
        ],
    };

    return (
        trails ?
            <Slider {...settings}>
                {trails.map(trail => {
                    // Trail API provides data in Imperial units and therefore, must convert before being displayed on card
                    const trailDist = convertToKM(trail.length);
                    const trailAscent = convertToMetre(trail.ascent);
                    // Hiking time was not available in the API data so this is estimated based on the length and ascent of the trail
                    return <TrailCard key={trail.id} trail={trail} time={calcHikingTime(trail.length, trail.ascent)} km={trailDist} height={trailAscent} handleAddFavourite={handleAddFavourite} currentFavourites={currentFavourites} handleEditFavourite={handleEditFavourite} />
                })}
            </Slider>
            :
            <LoadingSpinner />
    );


};