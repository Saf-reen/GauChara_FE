import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { authApi, blogApi, causeApi, testimonialApi } from '@/lib/api';
import { clearAuthTokens } from '@/lib/axios';
import {
    LayoutDashboard,
    FileText,
    Heart,
    MessageSquare,
    LogOut,
    Plus,
    Settings,
    Users,
    Calendar,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';

const AdminDashboard = () => {
    const navigate = useNavigate();
    const [admin, setAdmin] = useState<any>(null);
    const [counts, setCounts] = useState({
        blogs: 0,
        causes: 0,
        testimonials: 0
    });

    useEffect(() => {
        const fetchCounts = async () => {
            try {
                const [blogsRes, causesRes, testimonialsRes] = await Promise.all([
                    blogApi.getAll(),
                    causeApi.getAll(),
                    testimonialApi.getAll()
                ]);
                setCounts({
                    blogs: blogsRes.data.length || 0,
                    causes: causesRes.data.length || 0,
                    testimonials: testimonialsRes.data.length || 0
                });
            } catch (error) {
                console.error("Failed to fetch dashboard stats", error);
            }
        };

        const user = localStorage.getItem('admin_user');
        if (!user) {
            navigate('/admin-login');
            return;
        }
        setAdmin(JSON.parse(user));

        // Fetch counts only if authenticated
        fetchCounts();
    }, [navigate]);

    const handleLogout = async () => {
        try {
            await authApi.logout();
        } catch (error) {
            console.error('Logout failed:', error);
        } finally {
            clearAuthTokens();
            localStorage.removeItem('admin_user');
            toast.success('Logged out successfully');
            navigate('/admin-login');
        }
    };

    const stats = [
        { label: 'Total Blogs', value: counts.blogs.toString(), icon: FileText, color: 'bg-blue-500' },
        { label: 'Total Causes', value: counts.causes.toString(), icon: Heart, color: 'bg-rose-500' },
        { label: 'Testimonials', value: counts.testimonials.toString(), icon: MessageSquare, color: 'bg-amber-500' },
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
                    <Link to="/admin/gallery" className="flex items-center gap-3 px-4 py-2 hover:bg-muted rounded-lg transition-colors">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="w-5 h-5"
                        >
                            <rect width="18" height="18" x="3" y="3" rx="2" ry="2" />
                            <circle cx="9" cy="9" r="2" />
                            <path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21" />
                        </svg>
                        Gallery
                    </Link>
                    <Link to="/admin/programs" className="flex items-center gap-3 px-4 py-2 hover:bg-muted rounded-lg transition-colors">
                        <Calendar className="w-5 h-5" />
                        Programs
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
        </div >
    );
};

export default AdminDashboard;
