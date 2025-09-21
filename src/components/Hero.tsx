const Hero = () => {
  return (
    <section className="animate-fade-in">
      {/* Hero Image */}
      <div className="relative w-full">
        <img 
          src="/img/ad7d4503-d3c5-43be-aeef-03fef966fe39.jpg" 
          alt="Серверная комната дата-центра"
          className="w-full h-64 md:h-80 lg:h-96 object-cover animate-scale-in rounded-2xl"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/30 to-transparent rounded-2xl"></div>
        
        {/* Overlay Text */}
        <div className="absolute inset-0 flex items-center justify-start pl-8 md:pl-16 lg:pl-24">
          <div className="text-white max-w-lg">
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-4">
              Аренда VPS/VDS
            </h2>
            <p className="text-lg md:text-xl mb-2 text-white/90">
              Виртуальные серверы в России
            </p>
            <p className="text-lg md:text-xl text-white/90">
              от 200 руб/мес
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;