import { Link } from 'react-router-dom';
import { ArrowRight, Heart } from 'lucide-react';
import { Button } from '@/components/ui/button';

const CTABanner = () => {
  return (
    <section className="relative py-20 overflow-hidden">
      {/* Background */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-fixed"
        style={{
          backgroundImage: `url('https://images.unsplash.com/photo-1532629345422-7515f3d16bb6?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80')`,
        }}
      >
        <div className="absolute inset-0 bg-primary/90" />
      </div>

      {/* Content */}
      <div className="container-custom relative z-10">
        <div className="max-w-3xl mx-auto text-center">
          <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center 
                        mx-auto mb-6 animate-pulse-glow">
            <Heart className="w-8 h-8 text-white" />
          </div>
          
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6 font-serif">
            Join Us In Making A Difference
          </h2>
          
          <p className="text-xl text-white/90 mb-8 leading-relaxed">
            Your contribution, no matter how small, can help transform lives and 
            bring hope to communities in need. Together, we can create a better world.
          </p>

          <div className="flex flex-wrap justify-center gap-4">
            <Link to="/donate">
              <Button className="bg-white text-primary hover:bg-white/90 text-lg px-8 py-6 
                               font-semibold rounded-full inline-flex items-center gap-2
                               transition-all hover:shadow-lg hover:-translate-y-0.5">
                Donate Now
                <ArrowRight className="w-5 h-5" />
              </Button>
            </Link>
            <Link to="/contact">
              <Button className="border-2 border-white text-white hover:bg-white 
                               hover:text-primary text-lg px-8 py-6 font-semibold 
                               rounded-full bg-transparent inline-flex items-center gap-2
                               transition-all hover:shadow-lg hover:-translate-y-0.5">
                Become A Volunteer
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTABanner;
