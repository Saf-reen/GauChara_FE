import { Link } from 'react-router-dom';
import { 
  Facebook, 
  Twitter, 
  Instagram, 
  Youtube, 
  Mail, 
  Phone, 
  MapPin,
  Heart,
  ArrowRight
} from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const quickLinks = [
    { name: 'About Us', path: '/about' },
    { name: 'Our Causes', path: '/causes' },
    { name: 'Blog', path: '/blog' },
    { name: 'Contact', path: '/contact' },
    { name: 'Donate', path: '/donate' },
  ];

  const causes = [
    { name: 'Education', path: '/causes?category=education' },
    { name: 'Healthcare', path: '/causes?category=healthcare' },
    { name: 'Food & Water', path: '/causes?category=food' },
    { name: 'Environment', path: '/causes?category=environment' },
  ];

  const socialLinks = [
    { icon: Facebook, href: 'https://facebook.com/gauchara', label: 'Facebook' },
    { icon: Twitter, href: 'https://twitter.com/gauchara', label: 'Twitter' },
    { icon: Instagram, href: 'https://instagram.com/gauchara', label: 'Instagram' },
    { icon: Youtube, href: 'https://youtube.com/gauchara', label: 'YouTube' },
  ];

  return (
    <footer className="bg-foreground text-background">
      {/* Main Footer */}
      <div className="container-custom section-padding">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* About Column */}
          <div>
            <div className="flex items-center gap-2 mb-6">
              <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center">
                <span className="text-primary-foreground font-bold text-xl">G</span>
              </div>
              <span className="text-2xl font-serif font-bold text-white">
                Gauchara
              </span>
            </div>
            <p className="text-muted-foreground mb-6 leading-relaxed">
              Empowering communities and transforming lives through compassion, 
              education, and sustainable development initiatives.
            </p>
            <div className="flex gap-3">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center 
                           hover:bg-primary transition-colors group"
                  aria-label={social.label}
                >
                  <social.icon className="w-5 h-5 text-white group-hover:text-primary-foreground" />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-bold text-white mb-6">Quick Links</h4>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.path}>
                  <Link
                    to={link.path}
                    className="text-muted-foreground hover:text-primary transition-colors 
                             flex items-center gap-2 group"
                  >
                    <ArrowRight className="w-4 h-4 opacity-0 -ml-6 group-hover:opacity-100 
                                         group-hover:ml-0 transition-all" />
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Our Causes */}
          <div>
            <h4 className="text-lg font-bold text-white mb-6">Our Causes</h4>
            <ul className="space-y-3">
              {causes.map((cause) => (
                <li key={cause.path}>
                  <Link
                    to={cause.path}
                    className="text-muted-foreground hover:text-primary transition-colors 
                             flex items-center gap-2 group"
                  >
                    <ArrowRight className="w-4 h-4 opacity-0 -ml-6 group-hover:opacity-100 
                                         group-hover:ml-0 transition-all" />
                    {cause.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-lg font-bold text-white mb-6">Contact Us</h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                <span className="text-muted-foreground">
                  123 Charity Street, Kathmandu, Nepal
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-primary flex-shrink-0" />
                <a
                  href="tel:+9771234567890"
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  +977 123 456 7890
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-primary flex-shrink-0" />
                <a
                  href="mailto:info@gauchara.com"
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  info@gauchara.com
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/10">
        <div className="container-custom py-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-muted-foreground text-sm">
              © {currentYear} Gauchara. All rights reserved.
            </p>
            <p className="text-muted-foreground text-sm flex items-center gap-1">
              Made with <Heart className="w-4 h-4 text-primary" /> for a better world
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
