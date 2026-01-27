import { Link } from 'react-router-dom';
import { ArrowRight, Play } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center">
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url('/hero-9.jpg')`,
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-black/50 via-black/30 to-black/10" />
      </div>

      {/* Content */}
      <div className="container-custom relative z-10 pt-32">
        <div className="max-w-2xl ">
          <span className="inline-block px-4 py-2 bg-primary/20 text-primary rounded-full 
                         text-sm font-semibold mb-6 animate-fade-in">
            An Initiative of Savadia Foundation
          </span>

          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 
                       leading-tight animate-slide-up font-serif">
            GauChara:
            <span className="text-primary block mt-2 p-2">Nourishing Bos Indicus Cows</span>
          </h1>

          <p className="text-lg md:text-xl text-white/80 mb-8 leading-relaxed 
                      animate-slide-up" style={{ animationDelay: '0.1s' }}>
            Dedicated to the nourishment of Gaumata, the spiritual cornerstone of our tradition.
            We provide high-quality silage made from corn crops to ensure their health and well-being.
          </p>

          <div className="flex flex-wrap gap-4 animate-slide-up" style={{ animationDelay: '0.2s' }}>
            <Button asChild className="btn-primary text-lg px-8 py-6">
              <Link to="/donate">
                Donate Now
                <ArrowRight className="w-5 h-5" />
              </Link>
            </Button>
            {/* <Link to="/causes">
              <Button className="btn-outline border-white text-white hover:bg-white 
                               hover:text-foreground text-lg px-8 py-6">
                Explore Causes
              </Button>
            </Link> */}
          </div>

          {/* Stats */}
          <div className="mt-12 grid grid-cols-3 gap-6 animate-fade-in" style={{ animationDelay: '0.3s' }}>
            <div>
              <span className="text-3xl md:text-4xl font-bold text-primary">5K+</span>
              <p className="text-white/70 text-sm mt-1">Lives Impacted</p>
            </div>
            <div>
              <span className="text-3xl md:text-4xl font-bold text-primary">50+</span>
              <p className="text-white/70 text-sm mt-1">Active Projects</p>
            </div>
            <div>
              <span className="text-3xl md:text-4xl font-bold text-primary">100+</span>
              <p className="text-white/70 text-sm mt-1">Volunteers</p>
            </div>
          </div>
        </div>
      </div>


    </section>
  );
};

export default Hero;
