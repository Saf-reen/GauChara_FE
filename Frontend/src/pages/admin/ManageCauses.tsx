import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { causeApi } from '@/lib/api';
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

const ManageCauses = () => {
    const [causes, setCauses] = useState<any[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        fetchCauses();
    }, []);

    const fetchCauses = async () => {
        try {
            const response = await causeApi.getAll();
            setCauses(response.data);
        } catch (error) {
            toast.error('Failed to fetch causes');
        } finally {
            setIsLoading(false);
        }
    };

    const handleDelete = async (id: string) => {
        try {
            await causeApi.delete(id);
            setCauses(causes.filter(cause => cause._id !== id));
            toast.success('Cause deleted successfully');
        } catch (error) {
            toast.error('Failed to delete cause');
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
                            <h1 className="text-3xl font-bold">Manage Causes</h1>
                            <p className="text-muted-foreground">Create, edit, and remove donation causes</p>
                        </div>
                    </div>
                    <Button asChild>
                        <Link to="/admin/causes/new">
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
                                    <TableHead>Goal</TableHead>
                                    <TableHead>Raised</TableHead>
                                    <TableHead className="text-right">Actions</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {causes.length === 0 ? (
                                    <TableRow>
                                        <TableCell colSpan={4} className="text-center py-12 text-muted-foreground">
                                            No causes found. Create your first one!
                                        </TableCell>
                                    </TableRow>
                                ) : (
                                    causes.map((cause) => (
                                        <TableRow key={cause._id}>
                                            <TableCell className="font-medium">{cause.title}</TableCell>
                                            <TableCell>${cause.goalAmount}</TableCell>
                                            <TableCell>${cause.raisedAmount}</TableCell>
                                            <TableCell className="text-right">
                                                <div className="flex justify-end gap-2">
                                                    <Button variant="ghost" size="icon" asChild>
                                                        <Link to={`/admin/causes/edit/${cause._id}`}>
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
                                                                    This action cannot be undone. This will permanently delete the cause.
                                                                </AlertDialogDescription>
                                                            </AlertDialogHeader>
                                                            <AlertDialogFooter>
                                                                <AlertDialogCancel>Cancel</AlertDialogCancel>
                                                                <AlertDialogAction onClick={() => handleDelete(cause._id)} className="bg-red-500 hover:bg-red-600">
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

export default ManageCauses;
