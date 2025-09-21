import { useState, useEffect } from 'react';
import Icon from '@/components/ui/icon';

const Hero = () => {
  const slides = [
    {
      image: "/img/ad7d4503-d3c5-43be-aeef-03fef966fe39.jpg",
      alt: "Серверная комната дата-центра",
      title: "Аренда VPS/VDS",
      subtitle: "Виртуальные серверы в России",
      price: "от 200 руб/мес"
    },
    {
      image: "/img/bdd0d182-c814-4d07-9de4-348427f20d5b.jpg",
      alt: "Современный дата-центр",
      title: "Высокая производительность",
      subtitle: "Современное оборудование",
      price: "SSD диски и быстрая сеть"
    },
    {
      image: "/img/ffcc9d9d-f575-4415-a79d-3e08f7403e41.jpg",
      alt: "Облачная инфраструктура",
      title: "Облачные технологии",
      subtitle: "Масштабируемая архитектура",
      price: "Гибкие конфигурации"
    },
    {
      image: "/img/52e60503-acf3-4698-ad13-fd3be0dedbcf.jpg",
      alt: "Администрирование серверов",
      title: "24/7 мониторинг",
      subtitle: "Профессиональная поддержка",
      price: "Круглосуточный контроль"
    },
    {
      image: "/img/ccdc9549-1ced-4171-8642-0a91625c6e2e.jpg",
      alt: "Безопасность серверов",
      title: "Максимальная безопасность",
      subtitle: "Защита от DDoS атак",
      price: "Надежная защита данных"
    }
  ];

  const [currentSlide, setCurrentSlide] = useState(0);

  // Автопереключение слайдов каждые 5 секунд
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [slides.length]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
  };

  return (
    <section className="animate-fade-in pt-6">
      {/* Hero Slider */}
      <div className="relative w-full overflow-hidden rounded-2xl">
        <div 
          className="flex transition-transform duration-500 ease-in-out"
          style={{ transform: `translateX(-${currentSlide * 100}%)` }}
        >
          {slides.map((slide, index) => (
            <div key={index} className="relative w-full flex-shrink-0">
              <img 
                src={slide.image}
                alt={slide.alt}
                className="w-full h-64 md:h-80 lg:h-96 object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/30 to-transparent"></div>
              
              {/* Overlay Text */}
              <div className="absolute inset-0 flex items-center justify-start pl-8 md:pl-16 lg:pl-24">
                <div className="text-white max-w-lg">
                  <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-4">
                    {slide.title}
                  </h2>
                  <p className="text-lg md:text-xl mb-2 text-white/90">
                    {slide.subtitle}
                  </p>
                  <p className="text-lg md:text-xl text-white/90">
                    {slide.price}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Navigation Arrows */}
        <button
          onClick={prevSlide}
          className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full transition-all duration-200 backdrop-blur-sm"
          aria-label="Предыдущий слайд"
        >
          <Icon name="ChevronLeft" size={24} />
        </button>
        
        <button
          onClick={nextSlide}
          className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full transition-all duration-200 backdrop-blur-sm"
          aria-label="Следующий слайд"
        >
          <Icon name="ChevronRight" size={24} />
        </button>

        {/* Dots Indicator */}
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`w-3 h-3 rounded-full transition-all duration-200 ${
                index === currentSlide 
                  ? 'bg-white scale-110' 
                  : 'bg-white/50 hover:bg-white/70'
              }`}
              aria-label={`Перейти к слайду ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Hero;