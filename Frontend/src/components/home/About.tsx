import { Link } from 'react-router-dom';
import { Heart, Users, BookOpen, ArrowRight } from 'lucide-react';

const About = () => {
  const features = [
    {
      icon: Heart,
      title: 'Compassion First',
      description: 'We lead with empathy and understanding in everything we do.',
    },
    {
      icon: Users,
      title: 'Community Driven',
      description: 'Working alongside communities to create sustainable change.',
    },
    {
      icon: BookOpen,
      title: 'Education Focus',
      description: 'Empowering through knowledge and skill development.',
    },
  ];

  return (
    <section className="section-padding bg-background">
      <div className="container-custom">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Image Side */}
          <div className="relative">
            <div className="relative rounded-2xl overflow-hidden shadow-2xl">
              <img
                src="/hero-1.webp"
                alt="Sacred cow in Gaushala"
                className="w-full h-[500px] object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
            </div>

            {/* Floating Card */}
            <div className="absolute -bottom-6 -right-6 bg-primary text-primary-foreground 
                          p-6 rounded-2xl shadow-xl max-w-[200px]">
              <span className="text-4xl font-bold block">15+</span>
              <span className="text-sm opacity-90">Years of Cow Care</span>
            </div>
          </div>

          {/* Content Side */}
          <div>
            <span className="inline-block px-4 py-2 bg-primary/10 text-primary rounded-full 
                           text-sm font-semibold mb-4">
              About GauChara
            </span>

            <h2 className="section-title">
              Dedicated To The Welfare Of Every Gaumata
            </h2>

            <p className="text-muted-foreground text-lg mb-6 leading-relaxed">
              GauChara Foundation has been at the forefront of cow protection efforts,
              providing a safe haven for abandoned, injured, and non-milking cows. Our
              modern Gaushalas are designed to provide the highest standards of care.
            </p>

            <p className="text-muted-foreground mb-8 leading-relaxed">
              From organic fodder production to specialized veterinary care, every
              initiative we take is driven by our reverence for the cow as a
              symbol of life and sustenance in our culture.
            </p>

            {/* Features */}
            <div className="space-y-4 mb-8">
              {features.map((feature, index) => (
                <div key={index} className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center 
                                justify-center flex-shrink-0">
                    <feature.icon className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-bold text-foreground mb-1">{feature.title}</h4>
                    <p className="text-muted-foreground text-sm">{feature.description}</p>
                  </div>
                </div>
              ))}
            </div>

            <Link
              to="/about"
              className="inline-flex items-center gap-2 text-primary font-semibold 
                       hover:gap-4 transition-all"
            >
              Learn More About Us
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
