import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';

// Mock data - will be replaced with API data
const mockCauses = [
  {
    id: '1',
    title: 'Medical Care for Injured Cows',
    description: 'Providing emergency medical treatment and long-term rehabilitation for cows injured in accidents.',
    image: '/hero-3.png',
    goalAmount: 50000,
    raisedAmount: 32500,
    category: 'Medical',
  },
  {
    id: '2',
    title: 'Fodder & Nutrition Program',
    description: 'Ensuring a steady supply of high-quality, organic green fodder and nutritional supplements.',
    image: '/hero-8.jpg',
    goalAmount: 30000,
    raisedAmount: 21000,
    category: 'Nutrition',
  },
  {
    id: '3',
    title: 'Gaushala Expansion Project',
    description: 'Building new shelters and improving existing facilities to accommodate more rescued cows.',
    image: '/hero-6.webp',
    goalAmount: 75000,
    raisedAmount: 45000,
    category: 'Infrastructure',
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
                  <Link to="/donate">
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
