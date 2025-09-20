const Hero = () => {
  return (
    <section className="text-center py-16 animate-fade-in">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-5xl md:text-6xl font-bold text-foreground mb-6">
          Надёжные <span className="text-primary">VDS серверы</span>
          <br />для вашего бизнеса
        </h1>
        <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
          Высокопроизводительные виртуальные серверы с гарантией uptime 99.9%. 
          Современные технологии и круглосуточная поддержка.
        </p>
      </div>
      
      {/* Hero Image */}
      <div className="mt-12 relative w-full">
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
            <p className="text-lg md:text-xl mb-4 text-white/90">
              Виртуальные серверы в России
            </p>
            <div>
              <span className="text-3xl md:text-4xl font-bold text-white">
                от 200 руб/мес
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;