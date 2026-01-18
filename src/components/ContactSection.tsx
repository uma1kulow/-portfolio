import { motion, useInView } from 'framer-motion';
import { useRef, useState } from 'react';
import { usePortfolio } from '@/hooks/usePortfolio';
import { Send, Mail, MapPin, Phone, Github, Linkedin, Instagram } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { toast } from 'sonner';

const ContactSection = () => {
  const { portfolio } = usePortfolio();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success('Сообщение отправлено! Я свяжусь с вами в ближайшее время.');
    setFormData({ name: '', email: '', message: '' });
  };

  const getIcon = (icon: string) => {
    switch (icon) {
      case 'github': return Github;
      case 'linkedin': return Linkedin;
      case 'telegram': return Send;
      case 'instagram': return Instagram;
      default: return Github;
    }
  };

  return (
    <section id="contact" className="py-20 md:py-32 px-4" ref={ref}>
      <div className="container mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-5xl font-bold mb-4">
            Связаться со мной
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Есть проект или идея? Давайте обсудим!
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.2 }}
            className="space-y-8"
          >
            <div className="glass-card rounded-2xl p-6">
              <h3 className="text-xl font-semibold mb-6">Контактная информация</h3>
              
              <div className="space-y-4">
                <motion.a
                  href={`mailto:${portfolio.email}`}
                  whileHover={{ x: 5 }}
                  className="flex items-center gap-4 p-3 rounded-xl hover:bg-secondary transition-colors"
                >
                  <div className="p-3 rounded-lg bg-primary/10">
                    <Mail className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Email</p>
                    <p className="font-medium">{portfolio.email}</p>
                  </div>
                </motion.a>

                <motion.div
                  whileHover={{ x: 5 }}
                  className="flex items-center gap-4 p-3 rounded-xl hover:bg-secondary transition-colors"
                >
                  <div className="p-3 rounded-lg bg-primary/10">
                    <Phone className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Телефон</p>
                    <p className="font-medium">{portfolio.phone}</p>
                  </div>
                </motion.div>

                <motion.div
                  whileHover={{ x: 5 }}
                  className="flex items-center gap-4 p-3 rounded-xl hover:bg-secondary transition-colors"
                >
                  <div className="p-3 rounded-lg bg-primary/10">
                    <MapPin className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Локация</p>
                    <p className="font-medium">{portfolio.location}</p>
                  </div>
                </motion.div>
              </div>
            </div>

            {/* Social Links */}
            <div className="glass-card rounded-2xl p-6">
              <h3 className="text-xl font-semibold mb-6">Социальные сети</h3>
              <div className="flex flex-wrap gap-3">
                {portfolio.socialLinks.map((link, i) => {
                  const Icon = getIcon(link.icon);
                  return (
                    <motion.a
                      key={link.id}
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={isInView ? { opacity: 1, scale: 1 } : {}}
                      transition={{ delay: 0.3 + i * 0.1 }}
                      whileHover={{ scale: 1.1, y: -3 }}
                      className="p-4 rounded-xl glass-card hover:bg-primary hover:text-primary-foreground transition-all duration-300"
                    >
                      <Icon className="w-6 h-6" />
                    </motion.a>
                  );
                })}
              </div>
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.3 }}
          >
            <form onSubmit={handleSubmit} className="glass-card rounded-2xl p-6 space-y-6">
              <h3 className="text-xl font-semibold mb-2">Отправить сообщение</h3>
              
              <div>
                <label className="block text-sm text-muted-foreground mb-2">Имя</label>
                <Input
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="Ваше имя"
                  className="bg-secondary border-0"
                  required
                />
              </div>

              <div>
                <label className="block text-sm text-muted-foreground mb-2">Email</label>
                <Input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="your@email.com"
                  className="bg-secondary border-0"
                  required
                />
              </div>

              <div>
                <label className="block text-sm text-muted-foreground mb-2">Сообщение</label>
                <Textarea
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder="Расскажите о вашем проекте..."
                  className="bg-secondary border-0 min-h-[150px] resize-none"
                  required
                />
              </div>

              <Button type="submit" className="w-full" size="lg">
                <Send className="w-4 h-4 mr-2" />
                Отправить
              </Button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
