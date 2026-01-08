import { useEffect, useState, useRef } from 'react';
import { Heart, Users, Globe, Award } from 'lucide-react';

interface CounterItem {
  icon: React.ElementType;
  value: number;
  suffix: string;
  label: string;
}

const counters: CounterItem[] = [
  { icon: Heart, value: 50000, suffix: '+', label: 'Lives Impacted' },
  { icon: Users, value: 200, suffix: '+', label: 'Volunteers' },
  { icon: Globe, value: 25, suffix: '+', label: 'Countries Reached' },
  { icon: Award, value: 150, suffix: '+', label: 'Projects Completed' },
];

const ImpactCounters = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [counts, setCounts] = useState<number[]>(counters.map(() => 0));
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.3 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!isVisible) return;

    const duration = 2000;
    const steps = 60;
    const interval = duration / steps;

    counters.forEach((counter, index) => {
      let step = 0;
      const increment = counter.value / steps;

      const timer = setInterval(() => {
        step++;
        setCounts((prev) => {
          const newCounts = [...prev];
          newCounts[index] = Math.min(Math.round(increment * step), counter.value);
          return newCounts;
        });

        if (step >= steps) {
          clearInterval(timer);
        }
      }, interval);
    });
  }, [isVisible]);

  const formatNumber = (num: number): string => {
    if (num >= 1000) {
      return (num / 1000).toFixed(num >= 10000 ? 0 : 1) + 'K';
    }
    return num.toString();
  };

  return (
    <section 
      ref={sectionRef}
      className="relative py-20 overflow-hidden"
    >
      {/* Background */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-fixed"
        style={{
          backgroundImage: `url('https://images.unsplash.com/photo-1469571486292-0ba58a3f068b?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80')`,
        }}
      >
        <div className="absolute inset-0 bg-secondary/90" />
      </div>

      <div className="container-custom relative z-10">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {counters.map((counter, index) => (
            <div key={index} className="text-center group">
              <div className="w-16 h-16 mx-auto mb-4 bg-white/10 rounded-2xl 
                            flex items-center justify-center transition-transform 
                            group-hover:scale-110 group-hover:bg-white/20">
                <counter.icon className="w-8 h-8 text-white" />
              </div>
              <span className="text-4xl md:text-5xl font-bold text-white block mb-2">
                {formatNumber(counts[index])}{counter.suffix}
              </span>
              <span className="text-white/80 text-sm md:text-base">{counter.label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ImpactCounters;
