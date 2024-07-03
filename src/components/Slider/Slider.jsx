import { useState, useEffect } from 'react';
import './Slider.css';
import images from './images';

const Slider = () => {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [ visibleImages, setVisibleImages ] = useState(4)
  const interval = 3000
  const screen = window.innerWidth

  const goToNextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex >= images.length - visibleImages ? 0 : prevIndex + 1))
  };
  
  useEffect(()=>{ 
    if(screen <= 500){
      setVisibleImages(1)
    }
    if(screen >= 750 && screen <= 900 ){
      setVisibleImages(3)
    }
  },[screen])

  useEffect(() => {
    const autoPlay = setInterval(goToNextSlide, interval)
    return () => clearInterval(autoPlay)
  }, [currentIndex, interval])

  const displayedImages = images.slice(currentIndex, currentIndex + visibleImages)

  return (
    <div className="carousel">
      <div className="slide-container">
        {displayedImages.map((image, index) => (
          <div key={index} className="slide">
            <img src={image} alt={`Slide ${currentIndex + index}`} />
          </div>
        ))}
      </div>
    </div>
  )
}

export default Slider