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
      <div className="mt-12 relative">
        <img 
          src="/img/0292846b-4251-4f5e-8c75-8e3c5bdd6adb.jpg" 
          alt="Аренда VPS/VDS виртуальные серверы в России от 200 руб/мес"
          className="mx-auto w-full rounded-2xl shadow-2xl animate-scale-in"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-blue-600/20 to-transparent rounded-2xl"></div>
      </div>
    </section>
  );
};

export default Hero;