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
          backgroundImage: `url('https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80')`,
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/60 to-black/40" />
      </div>

      {/* Content */}
      <div className="container-custom relative z-10 pt-20">
        <div className="max-w-2xl">
          <span className="inline-block px-4 py-2 bg-primary/20 text-primary rounded-full 
                         text-sm font-semibold mb-6 animate-fade-in">
            Welcome to Gauchara
          </span>
          
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 
                       leading-tight animate-slide-up font-serif">
            Together We Can
            <span className="text-primary block mt-2">Change The World</span>
          </h1>
          
          <p className="text-lg md:text-xl text-white/80 mb-8 leading-relaxed 
                      animate-slide-up" style={{ animationDelay: '0.1s' }}>
            Join us in our mission to empower communities, transform lives, and create 
            lasting positive change through education, healthcare, and sustainable development.
          </p>

          <div className="flex flex-wrap gap-4 animate-slide-up" style={{ animationDelay: '0.2s' }}>
            <Link to="/donate">
              <Button className="btn-primary text-lg px-8 py-6">
                Donate Now
                <ArrowRight className="w-5 h-5" />
              </Button>
            </Link>
            <Link to="/causes">
              <Button className="btn-outline border-white text-white hover:bg-white 
                               hover:text-foreground text-lg px-8 py-6">
                Explore Causes
              </Button>
            </Link>
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

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce-subtle">
        <div className="w-8 h-12 border-2 border-white/50 rounded-full flex justify-center pt-2">
          <div className="w-1.5 h-3 bg-white/70 rounded-full animate-pulse" />
        </div>
      </div>
    </section>
  );
};

export default Hero;
