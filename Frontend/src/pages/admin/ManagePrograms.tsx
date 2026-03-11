import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { programApi } from '@/lib/api';
import { getImageUrl } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Plus, Pencil, Trash2, Loader2, ArrowLeft, Eye, Calendar } from 'lucide-react';
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

const ManagePrograms = () => {
    const [programs, setPrograms] = useState<any[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [selectedProgram, setSelectedProgram] = useState<any | null>(null);
    const [isViewOpen, setIsViewOpen] = useState(false);

    useEffect(() => {
        fetchPrograms();
    }, []);

    const fetchPrograms = async () => {
        try {
            const response = await programApi.getAll();
            setPrograms(response.data);
        } catch (error) {
            toast.error('Failed to fetch programs');
        } finally {
            setIsLoading(false);
        }
    };

    const handleDelete = async (id: string | number) => {
        try {
            await programApi.delete(id);
            setPrograms(programs.filter(program => (program.id) !== id));
            toast.success('Program deleted successfully');
        } catch (error) {
            toast.error('Failed to delete program');
        }
    };

    const openViewModal = (program: any) => {
        setSelectedProgram(program);
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
                            <h1 className="text-3xl font-bold">Manage Programs</h1>
                            <p className="text-muted-foreground">Create, edit, and remove programs and events</p>
                        </div>
                    </div>
                    <Button asChild>
                        <Link to="/admin/programs/new">
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
                                    <TableHead>Description</TableHead>
                                    <TableHead className="text-right">Actions</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {programs.length === 0 ? (
                                    <TableRow>
                                        <TableCell colSpan={4} className="text-center py-12 text-muted-foreground">
                                            No programs found. Create your first one!
                                        </TableCell>
                                    </TableRow>
                                ) : (
                                    programs.map((program) => (
                                        <TableRow key={program.id} className="cursor-pointer hover:bg-muted/50" onClick={() => openViewModal(program)}>
                                            <TableCell>
                                                <div className="w-16 h-10 rounded overflow-hidden bg-muted">
                                                    <img
                                                        src={getImageUrl(program.file_image || program.url_image)}
                                                        alt={program.title}
                                                        className="w-full h-full object-cover"
                                                        onError={(e) => {
                                                            e.currentTarget.onerror = null;
                                                            e.currentTarget.src = '/placeholder.svg';
                                                        }}
                                                    />
                                                </div>
                                            </TableCell>
                                            <TableCell className="font-medium">{program.title}</TableCell>
                                            <TableCell className="max-w-md truncate text-muted-foreground">
                                                {program.description}
                                            </TableCell>
                                            <TableCell className="text-right">
                                                <div className="flex justify-end gap-2" onClick={(e) => e.stopPropagation()}>
                                                    <Button variant="ghost" size="icon" onClick={() => openViewModal(program)}>
                                                        <Eye className="w-4 h-4 text-muted-foreground" />
                                                    </Button>
                                                    <Button variant="ghost" size="icon" asChild>
                                                        <Link to={`/admin/programs/edit/${program.id}`}>
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
                                                                    This action cannot be undone. This will permanently delete the program.
                                                                </AlertDialogDescription>
                                                            </AlertDialogHeader>
                                                            <AlertDialogFooter>
                                                                <AlertDialogCancel>Cancel</AlertDialogCancel>
                                                                <AlertDialogAction onClick={() => handleDelete(program.id)} className="bg-red-500 hover:bg-red-600">
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
                <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
                    <DialogHeader>
                        <DialogTitle>Program Details</DialogTitle>
                        <DialogDescription>
                            Full details for "{selectedProgram?.title}"
                        </DialogDescription>
                    </DialogHeader>

                    {selectedProgram && (
                        <div className="space-y-6 pt-4">
                            {/* Header Info */}
                            <div className="flex justify-between items-start border-b pb-4">
                                <div>
                                    <h3 className="text-xl font-bold">{selectedProgram.title}</h3>
                                    <span className="text-xs text-muted-foreground mt-1 block">ID: {selectedProgram.id}</span>
                                </div>
                            </div>

                            {/* Image */}
                            {(selectedProgram.file_image || selectedProgram.url_image) && (
                                <div className="rounded-xl overflow-hidden border bg-muted w-full aspect-video">
                                    <img
                                        src={getImageUrl(selectedProgram.file_image || selectedProgram.url_image)}
                                        alt={selectedProgram.title}
                                        className="w-full h-full object-cover"
                                        onError={(e) => {
                                            e.currentTarget.src = '/placeholder.svg';
                                        }}
                                    />
                                </div>
                            )}

                            {/* Description */}
                            <div>
                                <h4 className="font-semibold mb-2">Description</h4>
                                <div className="bg-muted/30 p-4 rounded-md text-sm whitespace-pre-wrap">
                                    {selectedProgram.description || "No description provided."}
                                </div>
                            </div>
                        </div>
                    )}
                </DialogContent>
            </Dialog>
        </div>
    );
};

export default ManagePrograms;
