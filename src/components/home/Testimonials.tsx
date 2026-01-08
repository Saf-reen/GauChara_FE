import { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Quote } from 'lucide-react';

// Mock data - will be replaced with API data
const mockTestimonials = [
  {
    id: '1',
    name: 'Maria Gonzalez',
    role: 'Community Leader',
    content: 'Gauchara\'s education program changed my daughter\'s life. She went from having no access to school to being top of her class. We are forever grateful for their support.',
    image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80',
    rating: 5,
  },
  {
    id: '2',
    name: 'James Kimura',
    role: 'Volunteer',
    content: 'Being a volunteer with Gauchara has been the most rewarding experience of my life. Seeing the direct impact of our work on families is truly inspiring.',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80',
    rating: 5,
  },
  {
    id: '3',
    name: 'Priya Sharma',
    role: 'Donor',
    content: 'I\'ve donated to many organizations, but Gauchara stands out for their transparency and genuine impact. Every rupee is used effectively to help those in need.',
    image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80',
    rating: 5,
  },
];

const Testimonials = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  const nextSlide = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setCurrentIndex((prev) => (prev + 1) % mockTestimonials.length);
  };

  const prevSlide = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setCurrentIndex((prev) => (prev - 1 + mockTestimonials.length) % mockTestimonials.length);
  };

  useEffect(() => {
    const timer = setTimeout(() => setIsAnimating(false), 500);
    return () => clearTimeout(timer);
  }, [currentIndex]);

  useEffect(() => {
    const autoPlay = setInterval(nextSlide, 5000);
    return () => clearInterval(autoPlay);
  }, []);

  return (
    <section className="section-padding bg-muted/30">
      <div className="container-custom">
        {/* Section Header */}
        <div className="text-center mb-12">
          <span className="inline-block px-4 py-2 bg-primary/10 text-primary rounded-full 
                         text-sm font-semibold mb-4">
            Testimonials
          </span>
          <h2 className="section-title">What People Say</h2>
          <p className="section-subtitle">
            Hear from the communities we serve and the people who support our mission.
          </p>
        </div>

        {/* Testimonial Slider */}
        <div className="max-w-4xl mx-auto relative">
          {/* Main Content */}
          <div className="bg-card rounded-3xl p-8 md:p-12 shadow-xl relative overflow-hidden">
            {/* Quote Icon */}
            <div className="absolute top-6 right-6 w-16 h-16 bg-primary/10 rounded-full 
                          flex items-center justify-center">
              <Quote className="w-8 h-8 text-primary" />
            </div>

            {/* Testimonial */}
            <div 
              className={`transition-all duration-500 ${
                isAnimating ? 'opacity-0 translate-y-4' : 'opacity-100 translate-y-0'
              }`}
            >
              <div className="flex flex-col md:flex-row items-center gap-8">
                {/* Avatar */}
                <div className="flex-shrink-0">
                  <img
                    src={mockTestimonials[currentIndex].image}
                    alt={mockTestimonials[currentIndex].name}
                    className="w-24 h-24 md:w-32 md:h-32 rounded-full object-cover 
                             border-4 border-primary shadow-lg"
                  />
                </div>

                {/* Content */}
                <div className="text-center md:text-left">
                  {/* Stars */}
                  <div className="flex justify-center md:justify-start gap-1 mb-4">
                    {[...Array(mockTestimonials[currentIndex].rating)].map((_, i) => (
                      <svg
                        key={i}
                        className="w-5 h-5 text-accent fill-current"
                        viewBox="0 0 20 20"
                      >
                        <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                      </svg>
                    ))}
                  </div>

                  <blockquote className="text-lg md:text-xl text-card-foreground mb-6 
                                       leading-relaxed italic">
                    "{mockTestimonials[currentIndex].content}"
                  </blockquote>

                  <div>
                    <h4 className="font-bold text-foreground text-lg">
                      {mockTestimonials[currentIndex].name}
                    </h4>
                    <p className="text-muted-foreground">
                      {mockTestimonials[currentIndex].role}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Navigation */}
            <div className="flex justify-center gap-4 mt-8">
              <button
                onClick={prevSlide}
                className="w-12 h-12 rounded-full border-2 border-primary text-primary 
                         hover:bg-primary hover:text-primary-foreground transition-colors
                         flex items-center justify-center"
                aria-label="Previous testimonial"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                onClick={nextSlide}
                className="w-12 h-12 rounded-full border-2 border-primary text-primary 
                         hover:bg-primary hover:text-primary-foreground transition-colors
                         flex items-center justify-center"
                aria-label="Next testimonial"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>

            {/* Dots */}
            <div className="flex justify-center gap-2 mt-6">
              {mockTestimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentIndex(index)}
                  className={`w-2.5 h-2.5 rounded-full transition-all ${
                    index === currentIndex
                      ? 'bg-primary w-8'
                      : 'bg-muted-foreground/30 hover:bg-muted-foreground/50'
                  }`}
                  aria-label={`Go to testimonial ${index + 1}`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
