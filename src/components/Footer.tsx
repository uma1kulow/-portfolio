import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { usePortfolio } from '@/hooks/usePortfolio';

const Footer = () => {
  const { portfolio } = usePortfolio();
  const currentYear = new Date().getFullYear();
  const navigate = useNavigate();

  return (
    <footer className="py-8 px-4 border-t border-border">
      <div className="container mx-auto">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="flex flex-col md:flex-row items-center justify-between gap-4"
        >
          <p className="text-sm text-muted-foreground">
            © {currentYear} {portfolio.name}. All rights reserved.
          </p>
          <p className="text-sm text-muted-foreground">
            Built with React, TypeScript & 
          </p>
          <button
            onClick={() => navigate('/secret-admin')}
            className="text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            .
          </button>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;
