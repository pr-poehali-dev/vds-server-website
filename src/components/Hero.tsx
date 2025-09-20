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
        <div className="absolute inset-0 bg-gradient-to-t from-blue-600/20 to-transparent"></div>
      </div>
    </section>
  );
};

export default Hero;