import { useEffect, useState, memo } from 'react';
import { usePortfolio } from '@/hooks/usePortfolio';

interface Particle {
  id: number;
  left: number;
  animationDuration: number;
  animationDelay: number;
  size: number;
  opacity: number;
}

const ParticleEffect = memo(() => {
  const { portfolio } = usePortfolio();
  const [particles, setParticles] = useState<Particle[]>([]);

  useEffect(() => {
    const count = portfolio.theme === 'rain' ? 100 : 50;
    const newParticles: Particle[] = [];
    
    for (let i = 0; i < count; i++) {
      newParticles.push({
        id: i,
        left: Math.random() * 100,
        animationDuration: portfolio.theme === 'rain' ? 0.5 + Math.random() * 0.5 : 5 + Math.random() * 10,
        animationDelay: Math.random() * 5,
        size: portfolio.theme === 'rain' ? 2 : 10 + Math.random() * 20,
        opacity: 0.3 + Math.random() * 0.7,
      });
    }
    
    setParticles(newParticles);
  }, [portfolio.theme]);

  if (portfolio.theme === 'light' || portfolio.theme === 'dark') {
    return null;
  }

  const renderParticle = (p: Particle) => {
    const style = {
      left: `${p.left}%`,
      animationDuration: `${p.animationDuration}s`,
      animationDelay: `${p.animationDelay}s`,
      fontSize: `${p.size}px`,
      opacity: p.opacity,
    };

    if (portfolio.theme === 'snow') {
      return (
        <div key={p.id} className="particle snowflake" style={style}>
          ❄
        </div>
      );
    }

    if (portfolio.theme === 'autumn') {
      const leaves = ['🍂', '🍁', '🍃'];
      return (
        <div key={p.id} className="particle leaf" style={style}>
          {leaves[p.id % leaves.length]}
        </div>
      );
    }

    if (portfolio.theme === 'rain') {
      return (
        <div
          key={p.id}
          className="particle raindrop"
          style={{
            left: `${p.left}%`,
            animationDuration: `${p.animationDuration}s`,
            animationDelay: `${p.animationDelay}s`,
            height: `${15 + Math.random() * 15}px`,
            opacity: p.opacity,
          }}
        />
      );
    }

    return null;
  };

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-10">
      {particles.map(renderParticle)}
    </div>
  );
});

ParticleEffect.displayName = 'ParticleEffect';

export default ParticleEffect;
