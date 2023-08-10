'use client';

import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';

const responsive = {
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 3,
  },
  tablet: {
    breakpoint: { max: 1024, min: 768 },
    items: 2,
  },
  mobile: {
    breakpoint: { max: 767, min: 0 },
    items: 1,
  },
};

type Props = { children: React.ReactNode };

export default function MultiCarousel({ children }: Props) {
  return (
    <Carousel
      responsive={responsive}
      infinite={true}
      autoPlay={true}
      pauseOnHover={true}
      centerMode={true}
      removeArrowOnDeviceType={['mobile']}
    >
      {children}
    </Carousel>
  );
}
