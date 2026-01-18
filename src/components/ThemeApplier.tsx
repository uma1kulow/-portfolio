import { useEffect } from 'react';
import { usePortfolio } from '@/hooks/usePortfolio';

const ThemeApplier = () => {
  const { portfolio } = usePortfolio();

  useEffect(() => {
    const root = document.documentElement;
    root.classList.remove('light', 'dark', 'snow', 'autumn', 'rain');
    root.classList.add(portfolio.theme);
  }, [portfolio.theme]);

  return null;
};

export default ThemeApplier;
