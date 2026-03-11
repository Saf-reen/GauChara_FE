import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { blogApi } from '@/lib/api';
import { Button } from '@/components/ui/button';
import { Plus, Pencil, Trash2, Loader2, ArrowLeft } from 'lucide-react';
import { toast } from 'sonner';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Copy, Check, Eye } from 'lucide-react';

const ManageBlogs = () => {
    const [blogs, setBlogs] = useState<any[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [selectedBlog, setSelectedBlog] = useState<any | null>(null);
    const [isViewOpen, setIsViewOpen] = useState(false);

    useEffect(() => {
        fetchBlogs();
    }, []);

    const fetchBlogs = async () => {
        try {
            const response = await blogApi.getAll();
            setBlogs(response.data);
        } catch (error) {
            toast.error('Failed to fetch blogs');
        } finally {
            setIsLoading(false);
        }
    };

    const handleDelete = async (id: string) => {
        try {
            await blogApi.delete(id);
            setBlogs(blogs.filter(blog => (blog.id || blog._id) !== id));
            toast.success('Blog deleted successfully');
        } catch (error) {
            toast.error('Failed to delete blog');
        }
    };

    const openViewModal = (blog: any) => {
        setSelectedBlog(blog);
        setIsViewOpen(true);
    };

    return (
        <div className="min-h-screen bg-muted/30 p-8">
            <div className="max-w-6xl mx-auto">
                <div className="flex items-center justify-between mb-8">
                    <div className="flex items-center gap-4">
                        <Button variant="outline" size="icon" asChild>
                            <Link to="/admin/dashboard">
                                <ArrowLeft className="w-4 h-4" />
                            </Link>
                        </Button>
                        <div>
                            <h1 className="text-3xl font-bold">Manage Blogs</h1>
                            <p className="text-muted-foreground">Create, edit, and remove blog posts</p>
                        </div>
                    </div>
                    <Button asChild>
                        <Link to="/admin/blogs/new">
                            <Plus className="w-4 h-4 mr-2" />
                            Create New
                        </Link>
                    </Button>
                </div>

                <div className="bg-background rounded-xl border shadow-sm overflow-hidden">
                    {isLoading ? (
                        <div className="flex justify-center p-12">
                            <Loader2 className="w-8 h-8 animate-spin text-primary" />
                        </div>
                    ) : (
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Image</TableHead>
                                    <TableHead>Title</TableHead>
                                    <TableHead>Author</TableHead>
                                    <TableHead>Date</TableHead>
                                    <TableHead className="text-right">Actions</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {blogs.length === 0 ? (
                                    <TableRow>
                                        <TableCell colSpan={5} className="text-center py-12 text-muted-foreground">
                                            No blogs found. Create your first one!
                                        </TableCell>
                                    </TableRow>
                                ) : (
                                    blogs.map((blog) => {
                                        const imageUrl = blog.featured_image
                                            ? (blog.featured_image.startsWith('http') ? blog.featured_image : `http://127.0.0.1:8000${blog.featured_image}`)
                                            : blog.featured_image_url
                                                ? (blog.featured_image_url.startsWith('http') ? blog.featured_image_url : `http://127.0.0.1:8000${blog.featured_image_url}`)
                                                : '/placeholder.svg';

                                        return (
                                            <TableRow key={blog.id || blog._id} className="cursor-pointer hover:bg-muted/50" onClick={() => openViewModal(blog)}>
                                                <TableCell>
                                                    <div className="w-16 h-10 rounded overflow-hidden bg-muted">
                                                        <img
                                                            src={imageUrl}
                                                            alt={blog.title}
                                                            className="w-full h-full object-cover"
                                                            onError={(e) => {
                                                                e.currentTarget.onerror = null;
                                                                e.currentTarget.src = '/placeholder.svg';
                                                            }}
                                                        />
                                                    </div>
                                                </TableCell>
                                                <TableCell className="font-medium max-w-[200px] truncate">{blog.title}</TableCell>
                                                <TableCell>{typeof blog.author === 'object' ? (blog.author.username || 'Admin') : blog.author}</TableCell>
                                                <TableCell>{new Date(blog.created_at || blog.createdAt).toLocaleDateString()}</TableCell>
                                                <TableCell className="text-right">
                                                    <div className="flex justify-end gap-2" onClick={(e) => e.stopPropagation()}>
                                                        <Button variant="ghost" size="icon" onClick={() => openViewModal(blog)}>
                                                            <Eye className="w-4 h-4 text-muted-foreground" />
                                                        </Button>
                                                        <Button variant="ghost" size="icon" asChild>
                                                            <Link to={`/admin/blogs/edit/${blog.id || blog._id}`}>
                                                                <Pencil className="w-4 h-4 text-blue-500" />
                                                            </Link>
                                                        </Button>

                                                        <AlertDialog>
                                                            <AlertDialogTrigger asChild>
                                                                <Button variant="ghost" size="icon">
                                                                    <Trash2 className="w-4 h-4 text-red-500" />
                                                                </Button>
                                                            </AlertDialogTrigger>
                                                            <AlertDialogContent>
                                                                <AlertDialogHeader>
                                                                    <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                                                                    <AlertDialogDescription>
                                                                        This action cannot be undone. This will permanently delete the blog post.
                                                                    </AlertDialogDescription>
                                                                </AlertDialogHeader>
                                                                <AlertDialogFooter>
                                                                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                                                                    <AlertDialogAction onClick={() => handleDelete(blog.id || blog._id)} className="bg-red-500 hover:bg-red-600">
                                                                        Delete
                                                                    </AlertDialogAction>
                                                                </AlertDialogFooter>
                                                            </AlertDialogContent>
                                                        </AlertDialog>
                                                    </div>
                                                </TableCell>
                                            </TableRow>
                                        );
                                    })
                                )}
                            </TableBody>
                        </Table>
                    )}
                </div>
            </div>

            {/* View Details Modal */}
            <Dialog open={isViewOpen} onOpenChange={setIsViewOpen}>
                <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
                    <DialogHeader>
                        <DialogTitle>Blog Details</DialogTitle>
                        <DialogDescription>
                            Full content of the blog post
                        </DialogDescription>
                    </DialogHeader>

                    {selectedBlog && (
                        <div className="space-y-6 pt-4">
                            {/* Header Info */}
                            <div className="flex flex-col md:flex-row gap-4 justify-between items-start border-b pb-4">
                                <div>
                                    <h3 className="text-xl font-bold">{selectedBlog.title}</h3>
                                    <div className="flex items-center gap-2 mt-2 text-sm text-muted-foreground">
                                        <span>By {typeof selectedBlog.author === 'object' ? (selectedBlog.author.username || 'Admin') : selectedBlog.author}</span>
                                        <span>•</span>
                                        <span>{new Date(selectedBlog.created_at || selectedBlog.createdAt).toLocaleDateString()}</span>
                                    </div>
                                    <div className="mt-2 text-xs text-muted-foreground">
                                        Slug: {selectedBlog.slug}
                                    </div>
                                </div>
                            </div>

                            {/* Image */}
                            <div className="rounded-xl overflow-hidden border bg-muted w-full aspect-video">
                                <img
                                    src={selectedBlog.featured_image
                                        ? (selectedBlog.featured_image.startsWith('http') ? selectedBlog.featured_image : `http://127.0.0.1:8000${selectedBlog.featured_image}`)
                                        : selectedBlog.featured_image_url
                                            ? (selectedBlog.featured_image_url.startsWith('http') ? selectedBlog.featured_image_url : `http://127.0.0.1:8000${selectedBlog.featured_image_url}`)
                                            : '/placeholder.svg'
                                    }
                                    alt={selectedBlog.title}
                                    className="w-full h-full object-cover"
                                    onError={(e) => {
                                        e.currentTarget.src = '/placeholder.svg';
                                    }}
                                />
                            </div>

                            {/* Content */}
                            <div className="space-y-4">
                                <div>
                                    <h4 className="font-semibold mb-1">Excerpt</h4>
                                    <p className="text-muted-foreground bg-muted/30 p-3 rounded-md text-sm italic">
                                        {selectedBlog.excerpt || "No excerpt provided."}
                                    </p>
                                </div>
                                <div>
                                    <h4 className="font-semibold mb-1">Content</h4>
                                    <div className="prose prose-sm max-w-none bg-muted/30 p-4 rounded-md">
                                        <div className="whitespace-pre-wrap">{selectedBlog.content}</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                </DialogContent>
            </Dialog>
        </div>
    );
};

export default ManageBlogs;
