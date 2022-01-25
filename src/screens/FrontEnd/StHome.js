import React from 'react';
import { useState, useEffect, useMemo } from 'react'
import ajj from '../FrontEnd/img/ajj.jpg'
import ajjj from '../FrontEnd/img/ajjj.jpg'
import ajjjj from '../FrontEnd/img/ajjjj.jpg'
import '../FrontEnd/css/home.css'
import { Modal, Button, Form, Card, Carousel, CarouselItem, CarouselProps } from 'react-bootstrap'

const Home = () => {

  const [index, setIndex] = useState(0);

  const handleSelect = (selectedIndex, e) => {
    setIndex(selectedIndex);
  };

  return (
    <div className='py-3 cont-slide' >
      <div className=''>
        <div className='row'>
          <div className='col-9 col-md-9 col-mdx mb-3'>
            <Carousel activeIndex={index} onSelect={handleSelect}>
              <Carousel.Item>
                <img
                  className=" d-block w-100"
                  src={ajj}
                  alt="First slide"
                />
              </Carousel.Item>
              <Carousel.Item>
                <img
                  className="d-block w-100"
                  src={ajjj}
                  alt="Second slide"
                />
              </Carousel.Item>
              <Carousel.Item>
                <img
                  className="d-block w-100"
                  src={ajjjj}
                  alt="Third slide"
                />
              </Carousel.Item>
            </Carousel>
          </div>
        </div>

      </div>

    </div>

  );

};

export default Home;
