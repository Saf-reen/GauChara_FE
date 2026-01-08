import { Link } from 'react-router-dom';
import { ArrowRight, Calendar, User } from 'lucide-react';
import { Button } from '@/components/ui/button';

// Mock data - will be replaced with API data
const mockBlogs = [
  {
    id: '1',
    slug: 'empowering-women-through-education',
    title: 'Empowering Women Through Education',
    excerpt: 'How our education programs are changing lives and creating new opportunities for women in rural communities.',
    image: 'https://images.unsplash.com/photo-1594608661623-aa0bd3a69d98?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    author: 'Sarah Johnson',
    createdAt: '2024-01-15',
  },
  {
    id: '2',
    slug: 'clean-water-project-success',
    title: 'Clean Water Project: A Year in Review',
    excerpt: 'Looking back at the impact of our clean water initiative and the communities it has transformed.',
    image: 'https://images.unsplash.com/photo-1594398901394-4e34939a4fd0?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    author: 'Michael Chen',
    createdAt: '2024-01-10',
  },
  {
    id: '3',
    slug: 'volunteer-stories-making-difference',
    title: 'Volunteer Stories: Making a Difference',
    excerpt: 'Hear from our incredible volunteers about their experiences and the joy of giving back.',
    image: 'https://images.unsplash.com/photo-1559027615-cd4628902d4a?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    author: 'Emily Parker',
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
            Latest News
          </span>
          <h2 className="section-title">Stories From The Field</h2>
          <p className="section-subtitle">
            Stay updated with our latest news, success stories, and insights from our work.
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
