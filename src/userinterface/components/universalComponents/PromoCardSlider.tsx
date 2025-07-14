import React, { useState } from "react";
import watch from "../../../assets/images/watch.jpg"

import games from "../../../assets/images/promos/games.jpg"
import games1 from "../../../assets/images/promos/games (1).jpg"
import games2 from "../../../assets/images/promos/games (2).jpg"
import games3 from "../../../assets/images/promos/games (3).jpg"
import games4 from "../../../assets/images/promos/games (4).jpg"
import games5 from "../../../assets/images/promos/games (5).jpg"
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { LeftArrowForPromo, RightArrowForPromo } from "./CustomArrowsForSliders";
import { Link } from "react-router-dom";
// var item = props.item

interface DataProp {
  promo: string;
  heading: string;
  subHeading: string;
  buttonHeading: string;
  img: string;
  link: string

}

interface Props {
  isOpen: boolean;
}

const data: DataProp[] = [{
  promo: 'Promo',
  heading: 'Daily Races',
  subHeading: 'Play in our $100,000 Daily Race Read More',
  buttonHeading: 'Race Now',
  link: 'Promo2',
  img: watch,
},
{
  promo: 'Promo',
  heading: 'Multiplier Race',
  subHeading: 'Win $200,000 in Race',
  buttonHeading: 'Race Now',
  img: games,
  link: 'multiplier-race'

},

{
  promo: 'Promo',
  heading: 'Daily Races',
  subHeading: 'Play in our $100,000 Daily Race Read More',
  buttonHeading: 'Race Now',
  img: games1,
  link: 'promo1'
  ,
},

{
  promo: 'Promo',
  heading: 'Daily Races',
  subHeading: 'Play in our $100,000 Daily Race Read More',
  buttonHeading: 'Race Now',
  img: games2,
  link: 'promo1'
  ,
},

{
  promo: 'Promo',
  heading: 'Daily Races',
  subHeading: 'Play in our $100,000 Daily Race Read More',
  buttonHeading: 'Race Now',
  img: games3,
  link: 'promo1'
  ,
},

{
  promo: 'Promo',
  heading: 'Conquer the World',
  subHeading: 'Win a share in $50,000 every week Read More',
  buttonHeading: 'Race Now',
  img: games4,
  link: 'conquer-the-casino'
  ,
}]




export default function PromoCardSlider({ isOpen }: Props): React.JSX.Element {
  const [isHover, setIsHovered] = useState(false)
  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 3,
    prevArrow: <LeftArrowForPromo isVisible={isHover} />,
    nextArrow: <RightArrowForPromo isVisible={isHover} />,
    responsive: [
      {
        breakpoint: 1324,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          infinite: true,
          dots: false
        }
      },
      {
        breakpoint: 700,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          initialSlide: 1
        }
      }
    ]
  };


  return (

    <div className="w-[100%]  sm:py-5  self-center  items-center  "
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >


      <Slider  {...settings}>

        {data.map((item, index) => (<>
          <div
            key={item.heading} className={` p-4 mx-5  max-sm:mx-1 m-4 gap-2 max-h-[220px] h-[180px]  sm:min-h-[220px] sm:min-w-[300px]   bg-[#1d3947] grid grid-cols-2 rounded-lg shadow-lg `}>

            <div className="  h-full col-span-1 ">
              <div className="bg-slate-200 h-[20px]  w-fit flex  items-center rounded font-bold text-[.75rem] p-1 text-slate-700 "> {item.promo}</div>

              <div className="py-1 font-bold whitespace-nowrap ">{item.heading}</div>
              <div className="font-medium h-[43%] 2xl:text-[.85rem] xl:text-[.75rem] lg:text-[.75rem] lg:w-[9rem] w-[8rem] sm:text-[.75rem] text-[.7rem]">{item.subHeading}</div>
              <Link to={`/casino/group/${item.link}`} className=" flex items-end "><button className=" flex items-center border  sm:w-28 h-8 sm:h-fit p-[.5rem] sm:px-4 rounded text-sm sm:text-sm">{item.buttonHeading}</button></Link>
            </div>
            <div className="col-span-1  ml-8  rounded">
              <img className="sm:h-[190px] h-[150px] sm:w-[130px]" src={item.img} alt="" />
            </div>


          </div>
        </>))}


      </Slider>
    </div>


  )
}