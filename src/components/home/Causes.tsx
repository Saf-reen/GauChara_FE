import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';

// Mock data - will be replaced with API data
const mockCauses = [
  {
    id: '1',
    title: 'Education for Every Child',
    description: 'Providing quality education to underprivileged children in rural areas.',
    image: 'https://images.unsplash.com/photo-1497486751825-1233686d5d80?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    goalAmount: 50000,
    raisedAmount: 32500,
    category: 'Education',
  },
  {
    id: '2',
    title: 'Clean Water Initiative',
    description: 'Installing water purification systems in villages lacking clean water access.',
    image: 'https://images.unsplash.com/photo-1541544537156-7627a7a4aa1c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    goalAmount: 30000,
    raisedAmount: 21000,
    category: 'Health',
  },
  {
    id: '3',
    title: 'Healthcare Access Program',
    description: 'Mobile health clinics bringing medical care to remote communities.',
    image: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    goalAmount: 75000,
    raisedAmount: 45000,
    category: 'Healthcare',
  },
];

const Causes = () => {
  return (
    <section className="section-padding bg-muted/30">
      <div className="container-custom">
        {/* Section Header */}
        <div className="text-center mb-12">
          <span className="inline-block px-4 py-2 bg-primary/10 text-primary rounded-full 
                         text-sm font-semibold mb-4">
            Our Causes
          </span>
          <h2 className="section-title">Help Us Make A Difference</h2>
          <p className="section-subtitle">
            Your support enables us to continue our vital work in communities around the world.
          </p>
        </div>

        {/* Causes Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {mockCauses.map((cause) => {
            const percentage = Math.round((cause.raisedAmount / cause.goalAmount) * 100);
            
            return (
              <div 
                key={cause.id}
                className="bg-card rounded-2xl overflow-hidden shadow-lg card-hover group"
              >
                {/* Image */}
                <div className="relative h-56 overflow-hidden">
                  <img
                    src={cause.image}
                    alt={cause.title}
                    className="w-full h-full object-cover transition-transform duration-500 
                             group-hover:scale-110"
                  />
                  <div className="absolute top-4 left-4">
                    <span className="px-3 py-1 bg-primary text-primary-foreground text-xs 
                                   font-semibold rounded-full">
                      {cause.category}
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6">
                  <h3 className="text-xl font-bold text-card-foreground mb-2 
                               group-hover:text-primary transition-colors">
                    {cause.title}
                  </h3>
                  <p className="text-muted-foreground text-sm mb-4 line-clamp-2">
                    {cause.description}
                  </p>

                  {/* Progress */}
                  <div className="mb-4">
                    <div className="flex justify-between text-sm mb-2">
                      <span className="font-semibold text-primary">
                        ${cause.raisedAmount.toLocaleString()}
                      </span>
                      <span className="text-muted-foreground">
                        Goal: ${cause.goalAmount.toLocaleString()}
                      </span>
                    </div>
                    <Progress value={percentage} className="h-2" />
                    <p className="text-xs text-muted-foreground mt-1 text-right">
                      {percentage}% raised
                    </p>
                  </div>

                  {/* CTA */}
                  <Link to={`/cause/${cause.id}`}>
                    <Button className="w-full btn-primary">
                      Donate Now
                      <ArrowRight className="w-4 h-4" />
                    </Button>
                  </Link>
                </div>
              </div>
            );
          })}
        </div>

        {/* View All Link */}
        <div className="text-center mt-10">
          <Link to="/causes">
            <Button variant="outline" className="btn-outline">
              View All Causes
              <ArrowRight className="w-5 h-5" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Causes;
