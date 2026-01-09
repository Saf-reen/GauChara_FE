import { ReactNode } from 'react';
import Navbar from './Navbar';
import Footer from './Footer';
import Chatbot from '@/components/chatbot/Chatbot';
import PartnerFloatingImage from './PartnerFloatingImage';

interface LayoutProps {
  children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <PartnerFloatingImage />
      <main className="flex-grow">{children}</main>
      <Footer />
      <Chatbot />
    </div>
  );
};

export default Layout;
