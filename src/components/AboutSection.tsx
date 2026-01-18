import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { usePortfolio } from '@/hooks/usePortfolio';
import { GraduationCap, Languages, MapPin, Mail, Phone } from 'lucide-react';

const AboutSection = () => {
  const { portfolio } = usePortfolio();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  const cards = [
    {
      icon: GraduationCap,
      title: 'Образование',
      content: (
        <div>
          <p className="font-semibold">{portfolio.education.institution}</p>
          <p className="text-sm text-muted-foreground">{portfolio.education.period}</p>
          <p className="text-sm text-muted-foreground">{portfolio.education.location}</p>
        </div>
      ),
    },
    {
      icon: Languages,
      title: 'Языки',
      content: (
        <ul className="space-y-1">
          {portfolio.languages.map((lang, i) => (
            <li key={i} className="flex justify-between text-sm">
              <span>{lang.name}</span>
              <span className="text-muted-foreground">{lang.level}</span>
            </li>
          ))}
        </ul>
      ),
    },
    {
      icon: MapPin,
      title: 'Контакты',
      content: (
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-sm">
            <Mail className="w-4 h-4 text-muted-foreground" />
            <span>{portfolio.email}</span>
          </div>
          <div className="flex items-center gap-2 text-sm">
            <Phone className="w-4 h-4 text-muted-foreground" />
            <span>{portfolio.phone}</span>
          </div>
          <div className="flex items-center gap-2 text-sm">
            <MapPin className="w-4 h-4 text-muted-foreground" />
            <span>{portfolio.location}</span>
          </div>
        </div>
      ),
    },
  ];

  return (
    <section id="about" className="py-20 md:py-32 px-4" ref={ref}>
      <div className="container mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-5xl font-bold mb-4">
            Обо мне
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            {portfolio.bio}
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {cards.map((card, i) => {
            const Icon = card.icon;
            return (
              <motion.div
                key={card.title}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: i * 0.15 }}
                whileHover={{ y: -8, transition: { type: 'spring', stiffness: 300 } }}
                className="glass-card rounded-2xl p-6 hover-lift"
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2 rounded-lg bg-primary/10">
                    <Icon className="w-5 h-5 text-primary" />
                  </div>
                  <h3 className="font-semibold text-lg">{card.title}</h3>
                </div>
                {card.content}
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
