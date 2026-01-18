import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import { usePortfolio } from '@/hooks/usePortfolio';
import { Link, useLocation } from 'react-router-dom';
const Navigation = () => {
  const {
    portfolio
  } = usePortfolio();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  const navItems = [{
    label: 'Главная',
    href: '#hero'
  }, {
    label: 'Обо мне',
    href: '#about'
  }, {
    label: 'Навыки',
    href: '#skills'
  }, {
    label: 'Проекты',
    href: '#projects'
  }, {
    label: 'Контакты',
    href: '#contact'
  }];
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  const handleNavClick = (href: string) => {
    setIsMobileMenuOpen(false);
    if (location.pathname !== '/') {
      window.location.href = '/' + href;
      return;
    }
    const element = document.querySelector(href);
    element?.scrollIntoView({
      behavior: 'smooth'
    });
  };
  return <>
      <motion.nav initial={{
      y: -100
    }} animate={{
      y: 0
    }} className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${isScrolled ? 'glass-card py-3' : 'py-6'}`}>
        <div className="container mx-auto px-4 flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="text-xl font-bold">
            {portfolio.name.split(' ')[0]}
            
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            {navItems.map(item => <button key={item.href} onClick={() => handleNavClick(item.href)} className="text-sm text-muted-foreground hover:text-foreground transition-colors relative group">
                {item.label}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full" />
              </button>)}
          </div>

          {/* Mobile Menu Button */}
          <div className="flex md:hidden items-center gap-4">
            <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="p-2 rounded-lg hover:bg-secondary transition-colors">
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && <motion.div initial={{
        opacity: 0,
        y: -20
      }} animate={{
        opacity: 1,
        y: 0
      }} exit={{
        opacity: 0,
        y: -20
      }} className="fixed inset-0 z-30 glass-card pt-24 px-4 md:hidden">
            <div className="flex flex-col items-center gap-6">
              {navItems.map((item, i) => <motion.button key={item.href} initial={{
            opacity: 0,
            y: 20
          }} animate={{
            opacity: 1,
            y: 0
          }} transition={{
            delay: i * 0.1
          }} onClick={() => handleNavClick(item.href)} className="text-2xl font-medium">
                  {item.label}
                </motion.button>)}
            </div>
          </motion.div>}
      </AnimatePresence>
    </>;
};
export default Navigation;