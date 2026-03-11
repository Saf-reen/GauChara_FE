import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { galleryApi } from '@/lib/api';
import { Button } from '@/components/ui/button';
import { Plus, Pencil, Trash2, Loader2, ArrowLeft, Image as ImageIcon } from 'lucide-react';
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

const ManageGallery = () => {
    const [images, setImages] = useState<any[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [selectedImage, setSelectedImage] = useState<any | null>(null);
    const [isViewOpen, setIsViewOpen] = useState(false);

    useEffect(() => {
        fetchGallery();
    }, []);

    const fetchGallery = async () => {
        try {
            const response = await galleryApi.getAll();
            setImages(response.data);
        } catch (error) {
            toast.error('Failed to fetch gallery images');
        } finally {
            setIsLoading(false);
        }
    };

    const handleDelete = async (id: string) => {
        try {
            await galleryApi.delete(id);
            setImages(images.filter(img => (img.id || img._id) !== id));
            toast.success('Image deleted successfully');
        } catch (error) {
            toast.error('Failed to delete image');
        }
    };

    const openViewModal = (image: any) => {
        setSelectedImage(image);
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
                            <h1 className="text-3xl font-bold">Manage Gallery</h1>
                            <p className="text-muted-foreground">Add, edit, and remove gallery images</p>
                        </div>
                    </div>
                    <Button asChild>
                        <Link to="/admin/gallery/new">
                            <Plus className="w-4 h-4 mr-2" />
                            Add New Image
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
                                    <TableHead>Category</TableHead>
                                    <TableHead>Caption</TableHead>
                                    <TableHead className="text-right">Actions</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {images.length === 0 ? (
                                    <TableRow>
                                        <TableCell colSpan={4} className="text-center py-12 text-muted-foreground">
                                            No images found. Add your first one!
                                        </TableCell>
                                    </TableRow>
                                ) : (
                                    images.map((img) => (
                                        <TableRow key={img.id || img._id} className="cursor-pointer hover:bg-muted/50" onClick={() => openViewModal(img)}>
                                            <TableCell>
                                                <div className="w-24 h-16 rounded overflow-hidden bg-muted">
                                                    <img
                                                        src={img.image}
                                                        alt={img.description}
                                                        className="w-full h-full object-cover"
                                                        onError={(e) => {
                                                            e.currentTarget.onerror = null;
                                                            e.currentTarget.src = '/placeholder.svg';
                                                        }}
                                                    />
                                                </div>
                                            </TableCell>
                                            <TableCell>
                                                <Badge variant="outline" className="capitalize">{img.category_name}</Badge>
                                            </TableCell>
                                            <TableCell className="max-w-md truncate">{img.caption}</TableCell>
                                            <TableCell className="text-right">
                                                <div className="flex justify-end gap-2" onClick={(e) => e.stopPropagation()}>
                                                    <Button variant="ghost" size="icon" onClick={() => openViewModal(img)}>
                                                        <Eye className="w-4 h-4 text-muted-foreground" />
                                                    </Button>
                                                    <Button variant="ghost" size="icon" asChild>
                                                        <Link to={`/admin/gallery/edit/${img.id || img._id}`}>
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
                                                                    This action cannot be undone. This will permanently delete the image.
                                                                </AlertDialogDescription>
                                                            </AlertDialogHeader>
                                                            <AlertDialogFooter>
                                                                <AlertDialogCancel>Cancel</AlertDialogCancel>
                                                                <AlertDialogAction onClick={() => handleDelete(img.id || img._id)} className="bg-red-500 hover:bg-red-600">
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

            {/* View Details Modal */}
            <Dialog open={isViewOpen} onOpenChange={setIsViewOpen}>
                <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
                    <DialogHeader>
                        <DialogTitle>Gallery Image Details</DialogTitle>
                        <DialogDescription>
                            Full details for selected image
                        </DialogDescription>
                    </DialogHeader>

                    {selectedImage && (
                        <div className="space-y-6 pt-4">
                            {/* Image */}
                            <div className="rounded-xl overflow-hidden border bg-muted w-full aspect-video flex items-center justify-center bg-black/5">
                                <img
                                    src={selectedImage.image}
                                    alt={selectedImage.caption}
                                    className="max-h-full max-w-full object-contain"
                                    onError={(e) => {
                                        e.currentTarget.src = '/placeholder.svg';
                                    }}
                                />
                            </div>

                            <div className="grid gap-4">
                                <div className="border rounded-lg p-4 bg-muted/30">
                                    <h4 className="font-semibold text-sm text-muted-foreground mb-1">Category</h4>
                                    <p className="text-lg font-medium">{selectedImage.category_name}</p>
                                </div>

                                <div className="border rounded-lg p-4 bg-muted/30">
                                    <h4 className="font-semibold text-sm text-muted-foreground mb-1">Caption</h4>
                                    <p className="text-base">{selectedImage.caption || "No caption provided."}</p>
                                </div>

                                <div className="text-xs text-muted-foreground text-right">
                                    ID: {selectedImage.id || selectedImage._id}
                                </div>
                            </div>
                        </div>
                    )}
                </DialogContent>
            </Dialog>
        </div>
    );
};

export default ManageGallery;
