import { motion } from 'framer-motion';
import { usePortfolio } from '@/hooks/usePortfolio';
import { useInView } from 'framer-motion';
import { useRef } from 'react';

const SkillsSection = () => {
  const { portfolio } = usePortfolio();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  const categories = [...new Set(portfolio.skills.map(s => s.category))];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.05 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20, scale: 0.9 },
    visible: { 
      opacity: 1, 
      y: 0, 
      scale: 1,
      transition: { type: 'spring' as const, stiffness: 100 }
    }
  };

  return (
    <section id="skills" className="py-20 md:py-32 px-4 relative" ref={ref}>
      <div className="container mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-5xl font-bold mb-4">
            Навыки
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Технологии и инструменты, которыми я владею
          </p>
        </motion.div>

        {categories.map((category, catIndex) => (
          <motion.div
            key={category}
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: catIndex * 0.1 }}
            className="mb-12"
          >
            <h3 className="text-xl font-semibold mb-6 text-muted-foreground">
              {category}
            </h3>
            
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate={isInView ? 'visible' : 'hidden'}
              className="flex flex-wrap gap-3"
            >
              {portfolio.skills
                .filter(s => s.category === category)
                .map((skill) => (
                  <motion.div
                    key={skill.id}
                    variants={itemVariants}
                    whileHover={{ 
                      scale: 1.05, 
                      y: -5,
                      transition: { type: 'spring', stiffness: 400 }
                    }}
                    className="group relative"
                  >
                    <div className="glass-card px-5 py-3 rounded-xl hover-lift cursor-default">
                      <div className="flex items-center gap-3">
                        <span className="font-medium">{skill.name}</span>
                        <span className="text-xs px-2 py-0.5 rounded-full bg-primary/10 text-primary">
                          {skill.level}%
                        </span>
                      </div>
                      
                      {/* Skill level bar */}
                      <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-muted rounded-b-xl overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={isInView ? { width: `${skill.level}%` } : {}}
                          transition={{ duration: 1, delay: 0.5 }}
                          className="h-full bg-primary"
                        />
                      </div>
                    </div>
                  </motion.div>
                ))}
            </motion.div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default SkillsSection;
