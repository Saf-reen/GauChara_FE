import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import {
    LayoutDashboard,
    FileText,
    Heart,
    MessageSquare,
    LogOut,
    Plus,
    Settings,
    Users
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';

const AdminDashboard = () => {
    const navigate = useNavigate();
    const [admin, setAdmin] = useState<any>(null);

    useEffect(() => {
        const user = localStorage.getItem('admin_user');
        if (!user) {
            navigate('/admin-login');
            return;
        }
        setAdmin(JSON.parse(user));
    }, [navigate]);

    const handleLogout = () => {
        localStorage.removeItem('admin_token');
        localStorage.removeItem('admin_user');
        toast.success('Logged out successfully');
        navigate('/admin-login');
    };

    const stats = [
        { label: 'Total Blogs', value: '12', icon: FileText, color: 'bg-blue-500' },
        { label: 'Active Causes', value: '4', icon: Heart, color: 'bg-rose-500' },
        { label: 'Testimonials', value: '8', icon: MessageSquare, color: 'bg-amber-500' },
        { label: 'Total Donors', value: '150+', icon: Users, color: 'bg-emerald-500' },
    ];

    return (
        <div className="min-h-screen bg-muted/30 flex">
            {/* Sidebar */}
            <aside className="w-64 bg-background border-r flex flex-col">
                <div className="p-6 border-b">
                    <Link to="/" className="flex items-center gap-2">
                        <img src="/logo.png" alt="Logo" className="h-10 w-auto" />
                        <span className="font-bold text-xl">Admin</span>
                    </Link>
                </div>

                <nav className="flex-1 p-4 space-y-2">
                    <Link to="/admin/dashboard" className="flex items-center gap-3 px-4 py-2 bg-primary text-primary-foreground rounded-lg">
                        <LayoutDashboard className="w-5 h-5" />
                        Dashboard
                    </Link>
                    <Link to="/admin/blogs" className="flex items-center gap-3 px-4 py-2 hover:bg-muted rounded-lg transition-colors">
                        <FileText className="w-5 h-5" />
                        Manage Blogs
                    </Link>
                    <Link to="/admin/causes" className="flex items-center gap-3 px-4 py-2 hover:bg-muted rounded-lg transition-colors">
                        <Heart className="w-5 h-5" />
                        Manage Causes
                    </Link>
                    <Link to="/admin/testimonials" className="flex items-center gap-3 px-4 py-2 hover:bg-muted rounded-lg transition-colors">
                        <MessageSquare className="w-5 h-5" />
                        Testimonials
                    </Link>
                </nav>

                <div className="p-4 border-t">
                    <Button variant="ghost" className="w-full justify-start text-destructive hover:text-destructive hover:bg-destructive/10" onClick={handleLogout}>
                        <LogOut className="w-5 h-5 mr-3" />
                        Logout
                    </Button>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 overflow-y-auto p-8">
                <header className="flex justify-between items-center mb-8">
                    <div>
                        <h1 className="text-3xl font-bold">Dashboard Overview</h1>
                        <p className="text-muted-foreground">Welcome back, {admin?.username}</p>
                    </div>
                    <div className="flex gap-4">
                        <Button asChild>
                            <Link to="/admin/blogs/new">
                                <Plus className="w-4 h-4 mr-2" />
                                New Blog
                            </Link>
                        </Button>
                    </div>
                </header>

                {/* Stats Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                    {stats.map((stat) => (
                        <div key={stat.label} className="bg-background p-6 rounded-2xl border shadow-sm">
                            <div className="flex items-center justify-between mb-4">
                                <div className={`p-3 rounded-xl ${stat.color} text-white`}>
                                    <stat.icon className="w-6 h-6" />
                                </div>
                                <span className="text-2xl font-bold">{stat.value}</span>
                            </div>
                            <p className="text-muted-foreground font-medium">{stat.label}</p>
                        </div>
                    ))}
                </div>

                {/* Recent Activity / Quick Links */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    <div className="bg-background p-6 rounded-2xl border shadow-sm">
                        <h3 className="text-xl font-bold mb-4">Quick Actions</h3>
                        <div className="grid grid-cols-2 gap-4">
                            <Button variant="outline" className="h-24 flex flex-col gap-2" asChild>
                                <Link to="/admin/causes/new">
                                    <Heart className="w-6 h-6 text-rose-500" />
                                    Add New Cause
                                </Link>
                            </Button>
                            <Button variant="outline" className="h-24 flex flex-col gap-2" asChild>
                                <Link to="/admin/testimonials/new">
                                    <MessageSquare className="w-6 h-6 text-amber-500" />
                                    Add Testimonial
                                </Link>
                            </Button>
                        </div>
                    </div>

                    <div className="bg-background p-6 rounded-2xl border shadow-sm">
                        <h3 className="text-xl font-bold mb-4">System Status</h3>
                        <div className="space-y-4">
                            <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                                <span className="text-sm font-medium">Database Connection</span>
                                <span className="px-2 py-1 bg-emerald-500/10 text-emerald-500 text-xs font-bold rounded-full">ONLINE</span>
                            </div>
                            <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                                <span className="text-sm font-medium">API Server</span>
                                <span className="px-2 py-1 bg-emerald-500/10 text-emerald-500 text-xs font-bold rounded-full">ACTIVE</span>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default AdminDashboard;
