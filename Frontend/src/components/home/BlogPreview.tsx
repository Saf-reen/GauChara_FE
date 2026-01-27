import { Link } from 'react-router-dom';
import { ArrowRight, Calendar, User } from 'lucide-react';
import { Button } from '@/components/ui/button';

// Mock data - will be replaced with API data
const mockBlogs = [
  {
    id: '1',
    slug: 'importance-of-desi-cows',
    title: 'The Importance of Desi Cows in Agriculture',
    excerpt: 'Discover how indigenous cow breeds are essential for sustainable and organic farming practices.',
    image: '/hero-10.png',
    author: 'Dr. Rajesh Kumar',
    createdAt: '2024-01-15',
  },
  {
    id: '2',
    slug: 'success-story-rescued-gaumata',
    title: 'Success Story: A New Life for Rescued Gaumata',
    excerpt: 'Read about the incredible recovery of a cow rescued from a highway accident and her new life at GauChara.',
    image: '/hero-4.jpg',
    author: 'Amit Sharma',
    createdAt: '2024-01-10',
  },
  {
    id: '3',
    slug: 'volunteering-at-gaushala',
    title: 'My Experience Volunteering at a Gaushala',
    excerpt: 'One of our volunteers shares the peace and fulfillment found in serving and caring for cows.',
    image: '/hero-5.png',
    author: 'Priya Patel',
    createdAt: '2024-01-05',
  },
];

const BlogPreview = () => {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  return (
    <section className="section-padding bg-background">
      <div className="container-custom">
        {/* Section Header */}
        <div className="text-center mb-12">
          <span className="inline-block px-4 py-2 bg-primary/10 text-primary rounded-full 
                         text-sm font-semibold mb-4">
            GauChara Updates
          </span>
          <h2 className="section-title">Chronicles of Care</h2>
          <p className="section-subtitle">
            Read about our recent activities, rescue stories, and the impact of your support.
          </p>
        </div>

        {/* Blog Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {mockBlogs.map((blog) => (
            <article
              key={blog.id}
              className="bg-card rounded-2xl overflow-hidden shadow-lg card-hover group"
            >
              {/* Image */}
              <Link to={`/blog/${blog.slug}`} className="block relative h-52 overflow-hidden">
                <img
                  src={blog.image}
                  alt={blog.title}
                  className="w-full h-full object-cover transition-transform duration-500 
                           group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors" />
              </Link>

              {/* Content */}
              <div className="p-6">
                {/* Meta */}
                <div className="flex items-center gap-4 text-sm text-muted-foreground mb-3">
                  <span className="flex items-center gap-1">
                    <Calendar className="w-4 h-4" />
                    {formatDate(blog.createdAt)}
                  </span>
                  <span className="flex items-center gap-1">
                    <User className="w-4 h-4" />
                    {blog.author}
                  </span>
                </div>

                <Link to={`/blog/${blog.slug}`}>
                  <h3 className="text-xl font-bold text-card-foreground mb-2 
                               group-hover:text-primary transition-colors line-clamp-2">
                    {blog.title}
                  </h3>
                </Link>

                <p className="text-muted-foreground text-sm mb-4 line-clamp-3">
                  {blog.excerpt}
                </p>

                <Link
                  to={`/blog/${blog.slug}`}
                  className="inline-flex items-center gap-2 text-primary font-semibold 
                           text-sm hover:gap-3 transition-all"
                >
                  Read More
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </article>
          ))}
        </div>

        {/* View All Link */}
        <div className="text-center mt-10">
          <Link to="/blog">
            <Button variant="outline" className="btn-outline">
              View All Articles
              <ArrowRight className="w-5 h-5" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default BlogPreview;
