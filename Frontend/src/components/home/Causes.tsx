import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { causeApi } from '@/lib/api';
import { toast } from 'sonner';

const Causes = () => {
  const [causes, setCauses] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchCauses = async () => {
      try {
        const response = await causeApi.getAll();
        // Map backend data to frontend structure if needed
        const formattedCauses = response.data.map((cause: any) => ({
          ...cause,
          id: cause._id || cause.id,
        }));
        setCauses(formattedCauses);
      } catch (error) {
        console.error("Failed to fetch causes:", error);
        toast.error("Failed to load causes");
      } finally {
        setIsLoading(false);
      }
    };

    fetchCauses();
  }, []);
  return (
    <section className="section-padding bg-muted/30">
      <div className="container-custom">
        {/* Section Header */}
        <div className="text-center mb-12">
          <span className="inline-block px-4 py-2 bg-primary/10 text-primary rounded-full 
                         text-sm font-semibold mb-4">
            Our Initiatives
          </span>
          <h2 className="section-title">Support Our Sacred Mission</h2>
          <p className="section-subtitle">
            Your contribution directly supports the nourishment and care of Gaumata.
          </p>
        </div>

        {/* Causes Grid */}
        {isLoading ? (
          <div className="flex justify-center py-12">
            <Loader2 className="w-10 h-10 animate-spin text-primary" />
          </div>
        ) : causes.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-muted-foreground text-lg">No causes found.</p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {causes.map((cause) => {
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
        )}

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
