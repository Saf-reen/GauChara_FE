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

const ManageBlogs = () => {
    const [blogs, setBlogs] = useState<any[]>([]);
    const [isLoading, setIsLoading] = useState(true);

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
            setBlogs(blogs.filter(blog => blog._id !== id));
            toast.success('Blog deleted successfully');
        } catch (error) {
            toast.error('Failed to delete blog');
        }
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
                                    <TableHead>Title</TableHead>
                                    <TableHead>Author</TableHead>
                                    <TableHead>Date</TableHead>
                                    <TableHead className="text-right">Actions</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {blogs.length === 0 ? (
                                    <TableRow>
                                        <TableCell colSpan={4} className="text-center py-12 text-muted-foreground">
                                            No blogs found. Create your first one!
                                        </TableCell>
                                    </TableRow>
                                ) : (
                                    blogs.map((blog) => (
                                        <TableRow key={blog._id}>
                                            <TableCell className="font-medium">{blog.title}</TableCell>
                                            <TableCell>{blog.author}</TableCell>
                                            <TableCell>{new Date(blog.createdAt).toLocaleDateString()}</TableCell>
                                            <TableCell className="text-right">
                                                <div className="flex justify-end gap-2">
                                                    <Button variant="ghost" size="icon" asChild>
                                                        <Link to={`/admin/blogs/edit/${blog._id}`}>
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
                                                                <AlertDialogAction onClick={() => handleDelete(blog._id)} className="bg-red-500 hover:bg-red-600">
                                                                    Delete
                                                                </AlertDialogAction>
                                                            </AlertDialogFooter>
                                                        </AlertDialogContent>
                                                    </AlertDialog>
                                                </div>
                                            </TableCell>
                                        </TableRow>
                                    ))
                                )}
                            </TableBody>
                        </Table>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ManageBlogs;
