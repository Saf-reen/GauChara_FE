import { useEffect, useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { authApi } from '@/lib/api';
import { clearAuthTokens } from '@/lib/axios';
import {
    LayoutDashboard,
    FileText,
    Heart,
    MessageSquare,
    LogOut,
    Settings,
    Users,
    Calendar,
    Mail,
    UserCheck,
    HeartHandshake,
    Grid,
    ChevronRight,
    Search,
    UserCircle,
    Menu
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';

interface AdminLayoutProps {
    children: React.ReactNode;
    title?: string;
}

interface SidebarContentProps {
    isActive: (path: string) => boolean;
    menuItems: any[];
    setIsMobileMenuOpen: (open: boolean) => void;
    admin: any;
    handleLogout: () => void;
}

const SidebarContent = ({ isActive, menuItems, setIsMobileMenuOpen, admin, handleLogout }: SidebarContentProps) => (
    <div className="flex flex-col h-full bg-background border-r border-border/50">
        <div className="p-6 h-20 border-b border-border/50 flex items-center">
            <Link to="/" className="flex items-center gap-3">
                <img src="/logo.png" alt="Logo" className="h-10 w-auto" />
                <span className="font-bold text-xl tracking-tight">Admin<span className="text-primary text-2xl">.</span></span>
            </Link>
        </div>

        <div className="p-4 space-y-1 flex-1 overflow-y-auto sidebar-scroll">
            <div className="space-y-1">
                <p className="px-4 py-2 text-[10px] font-black uppercase tracking-widest text-muted-foreground/60">Core Management</p>
                <nav className="space-y-1">
                    {menuItems.map((item) => (
                        <Link
                            key={item.path}
                            to={item.path}
                            onClick={() => setIsMobileMenuOpen(false)}
                            className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 group ${isActive(item.path)
                                ? 'bg-primary text-primary-foreground shadow-lg shadow-primary/20'
                                : 'hover:bg-muted text-muted-foreground hover:text-foreground'
                                }`}
                        >
                            <item.icon className={`w-5 h-5 transition-transform duration-200 ${isActive(item.path) ? 'scale-110' : 'group-hover:scale-110'}`} />
                            <span className="font-semibold text-sm">{item.label}</span>
                            {isActive(item.path) && <ChevronRight className="w-4 h-4 ml-auto" />}
                        </Link>
                    ))}
                </nav>
            </div>
        </div>

        <div className="p-4 border-t border-border/50 space-y-4 bg-background mt-auto">
            <div className="flex items-center gap-3 px-4 py-2">
                <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                    <UserCircle className="w-5 h-5 text-primary" />
                </div>
                <div className="flex flex-col overflow-hidden">
                    <span className="text-sm font-bold truncate">{admin?.username || 'Admin User'}</span>
                    <span className="text-[10px] text-muted-foreground truncate uppercase font-black">Super Admin</span>
                </div>
            </div>
            <Button
                variant="ghost"
                className="w-full justify-start text-destructive hover:text-destructive hover:bg-destructive/10 rounded-xl"
                onClick={handleLogout}
            >
                <LogOut className="w-5 h-5 mr-3" />
                <span className="font-bold text-sm">Logout Session</span>
            </Button>
        </div>
    </div>
);

const AdminLayout = ({ children, title = "Admin Dashboard" }: AdminLayoutProps) => {
    const navigate = useNavigate();
    const location = useLocation();
    const [admin, setAdmin] = useState<any>(null);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [isSearchFocused, setIsSearchFocused] = useState(false);

    useEffect(() => {
        const user = localStorage.getItem('admin_user');
        if (!user) {
            navigate('/admin-login');
            return;
        }
        setAdmin(JSON.parse(user));
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

    const isActive = (path: string) => location.pathname === path;

    const menuItems = [
        { label: 'Dashboard', path: '/admin/dashboard', icon: LayoutDashboard },
        { label: 'Blogs', path: '/admin/blogs', icon: FileText },
        { label: 'Causes', path: '/admin/causes', icon: Heart },
        { label: 'Testimonials', path: '/admin/testimonials', icon: MessageSquare },
        { label: 'Gallery', path: '/admin/gallery', icon: Grid },
        { label: 'Programs', path: '/admin/programs', icon: Calendar },
        { label: 'Contacts', path: '/admin/contacts', icon: Mail },
        { label: 'Volunteers', path: '/admin/volunteers', icon: UserCheck },
        { label: 'Donations', path: '/admin/donations', icon: HeartHandshake },
        { label: 'Categories', path: '/admin/categories', icon: Grid },
    ];

    const filteredItems = menuItems.filter(item => 
        item.label.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div className="flex bg-muted/30 min-h-screen">
            {/* Desktop Sidebar */}
            <aside className="hidden lg:block w-64 bg-background border-r border-border/50 fixed top-0 left-0 h-full z-50">
                <SidebarContent 
                    isActive={isActive} 
                    menuItems={menuItems} 
                    setIsMobileMenuOpen={setIsMobileMenuOpen} 
                    admin={admin} 
                    handleLogout={handleLogout} 
                />
            </aside>

            {/* Main Content */}
            <div className="flex-1 lg:ml-64 flex flex-col min-h-screen min-w-0 overflow-x-hidden">
                {/* Sticky Top Navbar */}
                <header className="h-20 bg-background/80 backdrop-blur-md border-b border-border/50 sticky top-0 z-40 px-4 md:px-8 flex items-center justify-between shadow-sm">
                    <div className="flex items-center gap-4">
                        <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
                            <SheetTrigger asChild>
                                <Button variant="ghost" size="icon" className="lg:hidden">
                                    <Menu className="w-6 h-6" />
                                </Button>
                            </SheetTrigger>
                            <SheetContent side="left" className="p-0 w-64 border-none">
                                <SidebarContent 
                                    isActive={isActive} 
                                    menuItems={menuItems} 
                                    setIsMobileMenuOpen={setIsMobileMenuOpen} 
                                    admin={admin} 
                                    handleLogout={handleLogout} 
                                />
                            </SheetContent>
                        </Sheet>
                        <h2 className="font-bold text-lg md:text-xl text-foreground truncate">{title}</h2>
                    </div>

                    <div className="flex items-center gap-3 md:gap-6">
                        <div className="relative hidden md:block">
                            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                            <input 
                                type="text" 
                                placeholder="Quick search modules..." 
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                onFocus={() => setIsSearchFocused(true)}
                                onBlur={() => setTimeout(() => setIsSearchFocused(false), 200)}
                                className="h-10 w-48 xl:w-64 bg-muted/50 border-none rounded-xl pl-10 text-xs font-medium focus:ring-2 focus:ring-primary/20 transition-all"
                            />

                            {/* Search Results Dropdown */}
                            {isSearchFocused && searchQuery && (
                                <div className="absolute top-full left-0 w-full mt-2 bg-background border border-border/50 rounded-2xl shadow-2xl overflow-hidden animate-in fade-in slide-in-from-top-2 duration-200">
                                    <div className="p-2 space-y-1">
                                        {filteredItems.length > 0 ? (
                                            filteredItems.map(item => (
                                                <button
                                                    key={item.path}
                                                    onClick={() => {
                                                        navigate(item.path);
                                                        setSearchQuery('');
                                                    }}
                                                    className="w-full flex items-center gap-3 px-3 py-2.5 hover:bg-muted rounded-xl transition-all group"
                                                >
                                                    <item.icon className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors" />
                                                    <span className="text-xs font-bold text-foreground">{item.label}</span>
                                                    <ChevronRight className="w-3 h-3 ml-auto text-muted-foreground/30" />
                                                </button>
                                            ))
                                        ) : (
                                            <div className="px-4 py-8 text-center">
                                                <Search className="w-8 h-8 text-muted-foreground/20 mx-auto mb-2" />
                                                <p className="text-[10px] font-black uppercase tracking-widest text-muted-foreground/60">No modules found</p>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </header>

                {/* Page Content */}
                <main className="p-4 md:p-8 flex-1">
                    {children}
                </main>

                <footer className="p-4 md:p-8 border-t border-border/50 text-center text-xs font-medium text-muted-foreground">
                    &copy; {new Date().getFullYear()} GauChara Foundation. All rights reserved.
                </footer>
            </div>
        </div>
    );
};

export default AdminLayout;

