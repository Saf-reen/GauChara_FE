import { useState, useEffect } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import { causeApi } from '@/lib/api';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { ArrowLeft, Loader2, Save } from 'lucide-react';
import { toast } from 'sonner';
import { Switch } from "@/components/ui/switch";

const CauseEditor = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const isEditing = !!id;

    const [formData, setFormData] = useState({
        title: '',
        description: '',
        content: '',
        image: '',
        goalAmount: '',
        category: '',
        featured: false,
    });
    const [isLoading, setIsLoading] = useState(false);
    const [isFetching, setIsFetching] = useState(isEditing);

    useEffect(() => {
        if (isEditing) {
            fetchCause();
        }
    }, [id]);

    const fetchCause = async () => {
        try {
            const response = await causeApi.getById(id!);
            setFormData({
                title: response.data.title,
                description: response.data.description,
                content: response.data.content,
                image: response.data.image,
                goalAmount: response.data.goalAmount.toString(),
                category: response.data.category,
                featured: response.data.featured,
            });
        } catch (error) {
            toast.error('Failed to fetch cause details');
            navigate('/admin/causes');
        } finally {
            setIsFetching(false);
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSwitchChange = (checked: boolean) => {
        setFormData(prev => ({ ...prev, featured: checked }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);

        try {
            const payload = {
                ...formData,
                goalAmount: Number(formData.goalAmount),
            };

            if (isEditing) {
                await causeApi.update(id!, payload);
                toast.success('Cause updated successfully');
            } else {
                await causeApi.create(payload);
                toast.success('Cause created successfully');
            }
            navigate('/admin/causes');
        } catch (error: any) {
            toast.error(error.response?.data?.error || 'Failed to save cause');
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
                            <Link to="/admin/causes">
                                <ArrowLeft className="w-4 h-4" />
                            </Link>
                        </Button>
                        <div>
                            <h1 className="text-3xl font-bold">{isEditing ? 'Edit Cause' : 'Create New Cause'}</h1>
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
                                    placeholder="Enter cause title"
                                    required
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-medium">Category</label>
                                <Input
                                    name="category"
                                    value={formData.category}
                                    onChange={handleChange}
                                    placeholder="e.g., Education, Health, Food"
                                    required
                                />
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <label className="text-sm font-medium">Goal Amount ($)</label>
                                <Input
                                    name="goalAmount"
                                    type="number"
                                    value={formData.goalAmount}
                                    onChange={handleChange}
                                    placeholder="5000"
                                    required
                                />
                            </div>
                            <div className="space-y-2 flex items-center justify-between border rounded-md p-3 mt-auto">
                                <label className="text-sm font-medium">Featured Cause</label>
                                <Switch
                                    checked={formData.featured}
                                    onCheckedChange={handleSwitchChange}
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-medium">Image URL</label>
                            <Input
                                name="image"
                                value={formData.image}
                                onChange={handleChange}
                                placeholder="https://example.com/image.jpg"
                                required
                            />
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-medium">Short Description</label>
                            <Textarea
                                name="description"
                                value={formData.description}
                                onChange={handleChange}
                                placeholder="Brief description for cards"
                                rows={3}
                                required
                            />
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-medium">Full Content</label>
                            <Textarea
                                name="content"
                                value={formData.content}
                                onChange={handleChange}
                                placeholder="Detailed explanation of the cause..."
                                className="min-h-[200px]"
                                required
                            />
                        </div>

                        <div className="flex justify-end gap-4">
                            <Button type="button" variant="outline" onClick={() => navigate('/admin/causes')}>
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
                                        Save Cause
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

export default CauseEditor;
