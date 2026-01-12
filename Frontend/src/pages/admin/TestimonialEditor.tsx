import { useState, useEffect } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import { testimonialApi } from '@/lib/api';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { ArrowLeft, Loader2, Save } from 'lucide-react';
import { toast } from 'sonner';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";

const TestimonialEditor = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const isEditing = !!id;

    const [formData, setFormData] = useState({
        name: '',
        role: '',
        content: '',
        image: '',
        rating: '5',
    });
    const [isLoading, setIsLoading] = useState(false);
    const [isFetching, setIsFetching] = useState(isEditing);

    useEffect(() => {
        if (isEditing) {
            fetchTestimonial();
        }
    }, [id]);

    const fetchTestimonial = async () => {
        try {
            // Similar to blogs, we fetch all and find by ID since we don't have getById for testimonials yet
            // Or we can assume we fetch all.
            const response = await testimonialApi.getAll();
            const testimonial = response.data.find((t: any) => t._id === id);
            if (testimonial) {
                setFormData({
                    name: testimonial.name,
                    role: testimonial.role,
                    content: testimonial.content,
                    image: testimonial.image,
                    rating: testimonial.rating.toString(),
                });
            } else {
                toast.error('Testimonial not found');
                navigate('/admin/testimonials');
            }
        } catch (error) {
            toast.error('Failed to fetch testimonial details');
        } finally {
            setIsFetching(false);
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleRatingChange = (value: string) => {
        setFormData(prev => ({ ...prev, rating: value }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);

        try {
            const payload = {
                ...formData,
                rating: Number(formData.rating),
            };

            if (isEditing) {
                await testimonialApi.update(id!, payload);
                toast.success('Testimonial updated successfully');
            } else {
                await testimonialApi.create(payload);
                toast.success('Testimonial created successfully');
            }
            navigate('/admin/testimonials');
        } catch (error: any) {
            toast.error(error.response?.data?.error || 'Failed to save testimonial');
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
                            <Link to="/admin/testimonials">
                                <ArrowLeft className="w-4 h-4" />
                            </Link>
                        </Button>
                        <div>
                            <h1 className="text-3xl font-bold">{isEditing ? 'Edit Testimonial' : 'Create New Testimonial'}</h1>
                        </div>
                    </div>
                </div>

                <div className="bg-background rounded-xl border shadow-sm p-6">
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <label className="text-sm font-medium">Name</label>
                                <Input
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    placeholder="John Doe"
                                    required
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-medium">Role</label>
                                <Input
                                    name="role"
                                    value={formData.role}
                                    onChange={handleChange}
                                    placeholder="Donor / Volunteer"
                                    required
                                />
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <label className="text-sm font-medium">Rating</label>
                                <Select value={formData.rating} onValueChange={handleRatingChange}>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select rating" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="1">1 Star</SelectItem>
                                        <SelectItem value="2">2 Stars</SelectItem>
                                        <SelectItem value="3">3 Stars</SelectItem>
                                        <SelectItem value="4">4 Stars</SelectItem>
                                        <SelectItem value="5">5 Stars</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-medium">Image URL</label>
                                <Input
                                    name="image"
                                    value={formData.image}
                                    onChange={handleChange}
                                    placeholder="https://example.com/photo.jpg"
                                    required
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-medium">Testimonial Content</label>
                            <Textarea
                                name="content"
                                value={formData.content}
                                onChange={handleChange}
                                placeholder="What did they say?"
                                rows={4}
                                required
                            />
                        </div>

                        <div className="flex justify-end gap-4">
                            <Button type="button" variant="outline" onClick={() => navigate('/admin/testimonials')}>
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
                                        Save Testimonial
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

export default TestimonialEditor;
