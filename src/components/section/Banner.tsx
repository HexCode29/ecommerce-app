// src/components/Banner.tsx
import { Carousel } from 'antd';
import Image from 'next/image';

const Banner = () => {
  const images = [
    'https://images.unsplash.com/photo-1483985988355-763728e1935b?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    'https://images.unsplash.com/photo-1559563458-527698bf5295?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    'https://images.unsplash.com/photo-1517420704952-d9f39e95b43e?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  ];

  return (
    <Carousel autoplay>
      {images.map((image, index) => (
        <div key={index}>
          <Image
            src={image}
            alt={"deleted"}
            width={1024} // Set the width of the image
            height={600} // Set the height of the image
            style={{ width: '100%', height:'600', objectFit: 'cover' }} // Make it responsive
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 1200px" // Responsive sizes
          />
        </div>
      ))}
    </Carousel>
  );
};

export default Banner;