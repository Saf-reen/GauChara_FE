import { useState, useEffect } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import { blogApi } from '@/lib/api';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { ArrowLeft, Loader2, Save } from 'lucide-react';
import { toast } from 'sonner';

const BlogEditor = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const isEditing = !!id;

    const [formData, setFormData] = useState({
        title: '',
        slug: '',
        content: '',
        excerpt: '',
        featuredImage: '',
        author: 'Admin',
    });
    const [isLoading, setIsLoading] = useState(false);
    const [isFetching, setIsFetching] = useState(isEditing);

    useEffect(() => {
        if (isEditing) {
            fetchBlog();
        }
    }, [id]);

    const fetchBlog = async () => {
        try {
            // Since we don't have a getById for blogs in the frontend API (only getBySlug), 
            // we might need to fetch all and find, or update the API. 
            // For now, let's assume we can fetch all and find the one we need, 
            // or better yet, let's update the API to support getById if needed.
            // Actually, the backend supports getBySlug. 
            // But the edit link uses ID. Let's fetch all and find by ID for now to be safe,
            // or we can update the backend to support getById.
            // The backend route is router.get('/:slug', ...).
            // Wait, the backend route `router.get('/:slug')` searches by slug.
            // If I pass an ID, it won't find it unless the slug IS the ID (unlikely).
            // I should update the backend to support getting by ID or just use the slug in the URL.
            // But the ManageBlogs page uses ID for the edit link.
            // Let's stick to ID for editing. I need to update the backend to support fetching by ID.
            // OR, I can just fetch all blogs here and find the one with the matching ID.
            // That's inefficient but works for small numbers.
            // Let's try fetching all for now.
            const response = await blogApi.getAll();
            const blog = response.data.find((b: any) => b._id === id);
            if (blog) {
                setFormData({
                    title: blog.title,
                    slug: blog.slug,
                    content: blog.content,
                    excerpt: blog.excerpt,
                    featuredImage: blog.featuredImage,
                    author: blog.author || 'Admin',
                });
            } else {
                toast.error('Blog not found');
                navigate('/admin/blogs');
            }
        } catch (error) {
            toast.error('Failed to fetch blog details');
        } finally {
            setIsFetching(false);
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));

        // Auto-generate slug from title if creating new
        if (name === 'title' && !isEditing) {
            setFormData(prev => ({
                ...prev,
                slug: value.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '')
            }));
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);

        try {
            if (isEditing) {
                await blogApi.update(id!, formData);
                toast.success('Blog updated successfully');
            } else {
                await blogApi.create(formData);
                toast.success('Blog created successfully');
            }
            navigate('/admin/blogs');
        } catch (error: any) {
            toast.error(error.response?.data?.error || 'Failed to save blog');
        } finally {
            setIsLoading(false);
        }
    };

    if (isFetching) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <Loader2 className="w-8 h-8 animate-spin text-primary" />
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-muted/30 p-8">
            <div className="max-w-4xl mx-auto">
                <div className="flex items-center justify-between mb-8">
                    <div className="flex items-center gap-4">
                        <Button variant="outline" size="icon" asChild>
                            <Link to="/admin/blogs">
                                <ArrowLeft className="w-4 h-4" />
                            </Link>
                        </Button>
                        <div>
                            <h1 className="text-3xl font-bold">{isEditing ? 'Edit Blog' : 'Create New Blog'}</h1>
                        </div>
                    </div>
                </div>

                <div className="bg-background rounded-xl border shadow-sm p-6">
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <label className="text-sm font-medium">Title</label>
                                <Input
                                    name="title"
                                    value={formData.title}
                                    onChange={handleChange}
                                    placeholder="Enter blog title"
                                    required
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-medium">Slug</label>
                                <Input
                                    name="slug"
                                    value={formData.slug}
                                    onChange={handleChange}
                                    placeholder="url-friendly-slug"
                                    required
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-medium">Featured Image URL</label>
                            <Input
                                name="featuredImage"
                                value={formData.featuredImage}
                                onChange={handleChange}
                                placeholder="https://example.com/image.jpg"
                                required
                            />
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-medium">Excerpt</label>
                            <Textarea
                                name="excerpt"
                                value={formData.excerpt}
                                onChange={handleChange}
                                placeholder="Brief summary of the blog post"
                                rows={3}
                                required
                            />
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-medium">Content (Markdown supported)</label>
                            <Textarea
                                name="content"
                                value={formData.content}
                                onChange={handleChange}
                                placeholder="Write your blog content here..."
                                className="min-h-[300px] font-mono"
                                required
                            />
                        </div>

                        <div className="flex justify-end gap-4">
                            <Button type="button" variant="outline" onClick={() => navigate('/admin/blogs')}>
                                Cancel
                            </Button>
                            <Button type="submit" disabled={isLoading}>
                                {isLoading ? (
                                    <>
                                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                        Saving...
                                    </>
                                ) : (
                                    <>
                                        <Save className="mr-2 h-4 w-4" />
                                        Save Blog
                                    </>
                                )}
                            </Button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default BlogEditor;
