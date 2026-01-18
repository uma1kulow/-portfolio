import { motion } from 'framer-motion';
import { Sun, Moon, Snowflake, Leaf, CloudRain } from 'lucide-react';
import { usePortfolio } from '@/hooks/usePortfolio';
import type { PortfolioState } from '@/store/portfolioSlice';

const themes: { id: PortfolioState['theme']; icon: typeof Sun; label: string }[] = [
  { id: 'light', icon: Sun, label: 'Light' },
  { id: 'dark', icon: Moon, label: 'Dark' },
  { id: 'snow', icon: Snowflake, label: 'Snow' },
  { id: 'autumn', icon: Leaf, label: 'Autumn' },
  { id: 'rain', icon: CloudRain, label: 'Rain' },
];

const ThemeSwitcher = () => {
  const { portfolio, actions } = usePortfolio();

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      className="fixed top-1/2 -translate-y-1/2 right-4 z-50 glass-card rounded-full p-1.5 flex flex-col gap-1"
    >
      {themes.map(({ id, icon: Icon, label }) => (
        <motion.button
          key={id}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => actions.setTheme(id)}
          className={`p-2.5 rounded-full transition-all duration-300 ${
            portfolio.theme === id
              ? 'bg-primary text-primary-foreground'
              : 'hover:bg-secondary text-muted-foreground hover:text-foreground'
          }`}
          title={label}
        >
          <Icon className="w-4 h-4" />
        </motion.button>
      ))}
    </motion.div>
  );
};

export default ThemeSwitcher;
