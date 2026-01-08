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
                src="https://images.unsplash.com/photo-1559027615-cd4628902d4a?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80"
                alt="Volunteers helping community"
                className="w-full h-[500px] object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
            </div>
            
            {/* Floating Card */}
            <div className="absolute -bottom-6 -right-6 bg-primary text-primary-foreground 
                          p-6 rounded-2xl shadow-xl max-w-[200px]">
              <span className="text-4xl font-bold block">15+</span>
              <span className="text-sm opacity-90">Years of Service</span>
            </div>
          </div>

          {/* Content Side */}
          <div>
            <span className="inline-block px-4 py-2 bg-primary/10 text-primary rounded-full 
                           text-sm font-semibold mb-4">
              About Us
            </span>
            
            <h2 className="section-title">
              We're On A Mission To Help The Helpless
            </h2>
            
            <p className="text-muted-foreground text-lg mb-6 leading-relaxed">
              Gauchara Foundation has been at the forefront of humanitarian efforts, 
              bringing hope and opportunities to underserved communities. Our dedicated 
              team works tirelessly to create programs that address immediate needs 
              while building long-term solutions.
            </p>
            
            <p className="text-muted-foreground mb-8 leading-relaxed">
              From education initiatives that open doors for children to healthcare 
              programs that save lives, every action we take is driven by our 
              commitment to human dignity and equality.
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
