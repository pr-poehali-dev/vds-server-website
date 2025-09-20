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
      <div className="mt-12 relative -mx-4 md:-mx-8 lg:-mx-16">
        <img 
          src="/img/eb312f13-d82a-4a67-a6fa-e51de6bf7e47.jpg" 
          alt="VDS серверы и технологии"
          className="w-full h-64 md:h-80 lg:h-96 object-cover animate-scale-in"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/30 to-transparent"></div>
        
        {/* Overlay Text */}
        <div className="absolute inset-0 flex items-center justify-start pl-8 md:pl-16 lg:pl-24">
          <div className="text-white max-w-lg">
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-4">
              Аренда VPS/VDS
            </h2>
            <p className="text-lg md:text-xl mb-4 text-white/90">
              Виртуальные серверы в России
            </p>
            <div className="mb-6">
              <span className="text-3xl md:text-4xl font-bold text-yellow-400">
                от 200 руб/мес
              </span>
            </div>
            <button className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-semibold transition-colors duration-200 shadow-lg">
              Заказать сервер
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;