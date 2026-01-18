import { useState } from 'react';
import { motion } from 'framer-motion';
import { usePortfolio } from '@/hooks/usePortfolio';
import { Link, useNavigate } from 'react-router-dom';
import { 
  ArrowLeft, 
  User, 
  Briefcase, 
  Globe, 
  GraduationCap,
  Languages,
  Plus,
  Trash2,
  Save,
  X,
  Folder,
  LogOut
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { toast } from 'sonner';
import ThemeSwitcher from '@/components/ThemeSwitcher';

const AdminPanel = () => {
  const { portfolio, actions } = usePortfolio();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('profile');

  // Profile state
  const [profile, setProfile] = useState({
    name: portfolio.name,
    title: portfolio.title,
    subtitle: portfolio.subtitle,
    bio: portfolio.bio,
    email: portfolio.email,
    phone: portfolio.phone,
    location: portfolio.location,
  });

  // Education state
  const [education, setEducation] = useState(portfolio.education);

  // Languages state
  const [languages, setLanguages] = useState(portfolio.languages);

  // Skills state
  const [skills, setSkills] = useState(portfolio.skills);
  const [newSkill, setNewSkill] = useState({ name: '', category: 'Frontend', level: 80 });

  // Social Links state
  const [socialLinks, setSocialLinks] = useState(portfolio.socialLinks);
  const [newLink, setNewLink] = useState({ platform: '', url: '', icon: 'github' });

  // Projects state
  const [projects, setProjects] = useState(portfolio.projects);
  const [newProject, setNewProject] = useState({ 
    title: '', 
    description: '', 
    technologies: '',
    link: '',
    github: ''
  });

  const handleLogout = () => {
    sessionStorage.removeItem('admin_auth');
    toast.success('Вы вышли из системы');
    navigate('/');
  };

  const handleSaveProfile = () => {
    actions.updateProfile(profile);
    toast.success('Профиль успешно обновлён!');
  };

  const handleSaveEducation = () => {
    actions.updateEducation(education);
    toast.success('Образование обновлено!');
  };

  const handleSaveLanguages = () => {
    actions.updateLanguages(languages);
    toast.success('Языки обновлены!');
  };

  const handleAddSkill = () => {
    if (!newSkill.name) return;
    const skill = {
      id: Date.now().toString(),
      ...newSkill,
    };
    actions.addSkill(skill);
    setSkills([...skills, skill]);
    setNewSkill({ name: '', category: 'Frontend', level: 80 });
    toast.success('Навык добавлен!');
  };

  const handleDeleteSkill = (id: string) => {
    actions.deleteSkill(id);
    setSkills(skills.filter(s => s.id !== id));
    toast.success('Навык удалён!');
  };

  const handleAddSocialLink = () => {
    if (!newLink.platform || !newLink.url) return;
    const link = {
      id: Date.now().toString(),
      ...newLink,
    };
    actions.addSocialLink(link);
    setSocialLinks([...socialLinks, link]);
    setNewLink({ platform: '', url: '', icon: 'github' });
    toast.success('Ссылка добавлена!');
  };

  const handleDeleteSocialLink = (id: string) => {
    actions.deleteSocialLink(id);
    setSocialLinks(socialLinks.filter(l => l.id !== id));
    toast.success('Ссылка удалена!');
  };

  const handleAddProject = () => {
    if (!newProject.title) return;
    const project = {
      id: Date.now().toString(),
      title: newProject.title,
      description: newProject.description,
      technologies: newProject.technologies.split(',').map(t => t.trim()).filter(Boolean),
      link: newProject.link || undefined,
      github: newProject.github || undefined,
    };
    actions.addProject(project);
    setProjects([...projects, project]);
    setNewProject({ title: '', description: '', technologies: '', link: '', github: '' });
    toast.success('Проект добавлен!');
  };

  const handleDeleteProject = (id: string) => {
    actions.deleteProject(id);
    setProjects(projects.filter(p => p.id !== id));
    toast.success('Проект удалён!');
  };

  const handleUpdateLanguage = (index: number, field: 'name' | 'level', value: string) => {
    const updated = [...languages];
    updated[index] = { ...updated[index], [field]: value };
    setLanguages(updated);
  };

  const handleAddLanguage = () => {
    setLanguages([...languages, { name: '', level: '' }]);
  };

  const handleRemoveLanguage = (index: number) => {
    setLanguages(languages.filter((_, i) => i !== index));
  };

  return (
    <div className="min-h-screen bg-background">
      <ThemeSwitcher />
      
      {/* Header */}
      <header className="border-b border-border p-4">
        <div className="container mx-auto flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link to="/">
              <Button variant="ghost" size="icon">
                <ArrowLeft className="w-5 h-5" />
              </Button>
            </Link>
            <div>
              <h1 className="text-xl font-bold">Админ панель</h1>
              <p className="text-sm text-muted-foreground">Управление портфолио</p>
            </div>
          </div>
          <Button variant="outline" onClick={handleLogout} className="gap-2">
            <LogOut className="w-4 h-4" />
            <span className="hidden sm:inline">Выйти</span>
          </Button>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto py-8 px-4">
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid grid-cols-3 md:grid-cols-6 w-full mb-8">
            <TabsTrigger value="profile" className="gap-2">
              <User className="w-4 h-4" />
              <span className="hidden sm:inline">Профиль</span>
            </TabsTrigger>
            <TabsTrigger value="skills" className="gap-2">
              <Briefcase className="w-4 h-4" />
              <span className="hidden sm:inline">Навыки</span>
            </TabsTrigger>
            <TabsTrigger value="projects" className="gap-2">
              <Folder className="w-4 h-4" />
              <span className="hidden sm:inline">Проекты</span>
            </TabsTrigger>
            <TabsTrigger value="social" className="gap-2">
              <Globe className="w-4 h-4" />
              <span className="hidden sm:inline">Соц. сети</span>
            </TabsTrigger>
            <TabsTrigger value="education" className="gap-2">
              <GraduationCap className="w-4 h-4" />
              <span className="hidden sm:inline">Образование</span>
            </TabsTrigger>
            <TabsTrigger value="languages" className="gap-2">
              <Languages className="w-4 h-4" />
              <span className="hidden sm:inline">Языки</span>
            </TabsTrigger>
          </TabsList>
          <TabsContent value="profile">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="glass-card rounded-2xl p-6 max-w-2xl mx-auto"
            >
              <h2 className="text-xl font-semibold mb-6">Основная информация</h2>
              
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm text-muted-foreground mb-2">Имя</label>
                    <Input
                      value={profile.name}
                      onChange={(e) => setProfile({ ...profile, name: e.target.value })}
                      placeholder="Ваше имя"
                    />
                  </div>
                  <div>
                    <label className="block text-sm text-muted-foreground mb-2">Должность</label>
                    <Input
                      value={profile.title}
                      onChange={(e) => setProfile({ ...profile, title: e.target.value })}
                      placeholder="Frontend Developer"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm text-muted-foreground mb-2">Подзаголовок</label>
                  <Input
                    value={profile.subtitle}
                    onChange={(e) => setProfile({ ...profile, subtitle: e.target.value })}
                    placeholder="Web & Digital Specialist"
                  />
                </div>

                <div>
                  <label className="block text-sm text-muted-foreground mb-2">О себе</label>
                  <Textarea
                    value={profile.bio}
                    onChange={(e) => setProfile({ ...profile, bio: e.target.value })}
                    placeholder="Расскажите о себе..."
                    className="min-h-[120px]"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm text-muted-foreground mb-2">Email</label>
                    <Input
                      type="email"
                      value={profile.email}
                      onChange={(e) => setProfile({ ...profile, email: e.target.value })}
                      placeholder="your@email.com"
                    />
                  </div>
                  <div>
                    <label className="block text-sm text-muted-foreground mb-2">Телефон</label>
                    <Input
                      value={profile.phone}
                      onChange={(e) => setProfile({ ...profile, phone: e.target.value })}
                      placeholder="+996 XXX XXX XXX"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm text-muted-foreground mb-2">Локация</label>
                  <Input
                    value={profile.location}
                    onChange={(e) => setProfile({ ...profile, location: e.target.value })}
                    placeholder="Kyrgyzstan"
                  />
                </div>

                <Button onClick={handleSaveProfile} className="w-full gap-2">
                  <Save className="w-4 h-4" />
                  Сохранить
                </Button>
              </div>
            </motion.div>
          </TabsContent>

          {/* Skills Tab */}
          <TabsContent value="skills">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="max-w-4xl mx-auto space-y-6"
            >
              {/* Add new skill */}
              <div className="glass-card rounded-2xl p-6">
                <h2 className="text-xl font-semibold mb-4">Добавить навык</h2>
                <div className="flex flex-col md:flex-row gap-4">
                  <Input
                    value={newSkill.name}
                    onChange={(e) => setNewSkill({ ...newSkill, name: e.target.value })}
                    placeholder="Название навыка"
                    className="flex-1"
                  />
                  <select
                    value={newSkill.category}
                    onChange={(e) => setNewSkill({ ...newSkill, category: e.target.value })}
                    className="px-3 py-2 rounded-lg bg-secondary border-0"
                  >
                    <option value="Frontend">Frontend</option>
                    <option value="Backend">Backend</option>
                    <option value="Styling">Styling</option>
                    <option value="Tools">Tools</option>
                    <option value="Design">Design</option>
                  </select>
                  <Input
                    type="number"
                    value={newSkill.level}
                    onChange={(e) => setNewSkill({ ...newSkill, level: Number(e.target.value) })}
                    placeholder="Уровень %"
                    className="w-24"
                    min={0}
                    max={100}
                  />
                  <Button onClick={handleAddSkill} className="gap-2">
                    <Plus className="w-4 h-4" />
                    Добавить
                  </Button>
                </div>
              </div>

              {/* Skills list */}
              <div className="glass-card rounded-2xl p-6">
                <h2 className="text-xl font-semibold mb-4">Текущие навыки</h2>
                <div className="grid gap-3">
                  {skills.map((skill) => (
                    <div
                      key={skill.id}
                      className="flex items-center justify-between p-3 rounded-lg bg-secondary"
                    >
                      <div className="flex items-center gap-4">
                        <span className="font-medium">{skill.name}</span>
                        <span className="text-sm text-muted-foreground">{skill.category}</span>
                        <span className="text-sm px-2 py-0.5 rounded-full bg-primary/10 text-primary">
                          {skill.level}%
                        </span>
                      </div>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleDeleteSkill(skill.id)}
                        className="text-destructive hover:text-destructive"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          </TabsContent>

          {/* Projects Tab */}
          <TabsContent value="projects">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="max-w-4xl mx-auto space-y-6"
            >
              {/* Add new project */}
              <div className="glass-card rounded-2xl p-6">
                <h2 className="text-xl font-semibold mb-4">Добавить проект</h2>
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Input
                      value={newProject.title}
                      onChange={(e) => setNewProject({ ...newProject, title: e.target.value })}
                      placeholder="Название проекта"
                    />
                    <Input
                      value={newProject.technologies}
                      onChange={(e) => setNewProject({ ...newProject, technologies: e.target.value })}
                      placeholder="Технологии (через запятую)"
                    />
                  </div>
                  <Textarea
                    value={newProject.description}
                    onChange={(e) => setNewProject({ ...newProject, description: e.target.value })}
                    placeholder="Описание проекта"
                    className="min-h-[80px]"
                  />
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Input
                      value={newProject.link}
                      onChange={(e) => setNewProject({ ...newProject, link: e.target.value })}
                      placeholder="Ссылка на проект"
                    />
                    <Input
                      value={newProject.github}
                      onChange={(e) => setNewProject({ ...newProject, github: e.target.value })}
                      placeholder="GitHub ссылка"
                    />
                  </div>
                  <Button onClick={handleAddProject} className="gap-2">
                    <Plus className="w-4 h-4" />
                    Добавить
                  </Button>
                </div>
              </div>

              {/* Projects list */}
              <div className="glass-card rounded-2xl p-6">
                <h2 className="text-xl font-semibold mb-4">Текущие проекты</h2>
                <div className="grid gap-4">
                  {projects.map((project) => (
                    <div
                      key={project.id}
                      className="p-4 rounded-lg bg-secondary"
                    >
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <h3 className="font-medium">{project.title}</h3>
                          <p className="text-sm text-muted-foreground">{project.description}</p>
                        </div>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => handleDeleteProject(project.id)}
                          className="text-destructive hover:text-destructive"
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                      <div className="flex flex-wrap gap-2 mt-2">
                        {project.technologies.map((tech, i) => (
                          <span
                            key={i}
                            className="text-xs px-2 py-1 rounded-full bg-primary/10 text-primary"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          </TabsContent>

          {/* Social Links Tab */}
          <TabsContent value="social">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="max-w-2xl mx-auto space-y-6"
            >
              {/* Add new link */}
              <div className="glass-card rounded-2xl p-6">
                <h2 className="text-xl font-semibold mb-4">Добавить соц. сеть</h2>
                <div className="flex flex-col md:flex-row gap-4">
                  <Input
                    value={newLink.platform}
                    onChange={(e) => setNewLink({ ...newLink, platform: e.target.value })}
                    placeholder="Название (GitHub, LinkedIn...)"
                    className="flex-1"
                  />
                  <Input
                    value={newLink.url}
                    onChange={(e) => setNewLink({ ...newLink, url: e.target.value })}
                    placeholder="URL"
                    className="flex-1"
                  />
                  <select
                    value={newLink.icon}
                    onChange={(e) => setNewLink({ ...newLink, icon: e.target.value })}
                    className="px-3 py-2 rounded-lg bg-secondary border-0"
                  >
                    <option value="github">GitHub</option>
                    <option value="linkedin">LinkedIn</option>
                    <option value="telegram">Telegram</option>
                    <option value="instagram">Instagram</option>
                  </select>
                  <Button onClick={handleAddSocialLink} className="gap-2">
                    <Plus className="w-4 h-4" />
                    Добавить
                  </Button>
                </div>
              </div>

              {/* Links list */}
              <div className="glass-card rounded-2xl p-6">
                <h2 className="text-xl font-semibold mb-4">Текущие ссылки</h2>
                <div className="grid gap-3">
                  {socialLinks.map((link) => (
                    <div
                      key={link.id}
                      className="flex items-center justify-between p-3 rounded-lg bg-secondary"
                    >
                      <div className="flex items-center gap-4">
                        <span className="font-medium">{link.platform}</span>
                        <span className="text-sm text-muted-foreground truncate max-w-xs">
                          {link.url}
                        </span>
                      </div>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleDeleteSocialLink(link.id)}
                        className="text-destructive hover:text-destructive"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          </TabsContent>

          {/* Education Tab */}
          <TabsContent value="education">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="glass-card rounded-2xl p-6 max-w-2xl mx-auto"
            >
              <h2 className="text-xl font-semibold mb-6">Образование</h2>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm text-muted-foreground mb-2">Учебное заведение</label>
                  <Input
                    value={education.institution}
                    onChange={(e) => setEducation({ ...education, institution: e.target.value })}
                    placeholder="Название учебного заведения"
                  />
                </div>

                <div>
                  <label className="block text-sm text-muted-foreground mb-2">Период обучения</label>
                  <Input
                    value={education.period}
                    onChange={(e) => setEducation({ ...education, period: e.target.value })}
                    placeholder="2020 - 2024"
                  />
                </div>

                <div>
                  <label className="block text-sm text-muted-foreground mb-2">Локация</label>
                  <Input
                    value={education.location}
                    onChange={(e) => setEducation({ ...education, location: e.target.value })}
                    placeholder="Город, Страна"
                  />
                </div>

                <Button onClick={handleSaveEducation} className="w-full gap-2">
                  <Save className="w-4 h-4" />
                  Сохранить
                </Button>
              </div>
            </motion.div>
          </TabsContent>

          {/* Languages Tab */}
          <TabsContent value="languages">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="glass-card rounded-2xl p-6 max-w-2xl mx-auto"
            >
              <h2 className="text-xl font-semibold mb-6">Языки</h2>
              
              <div className="space-y-4">
                {languages.map((lang, index) => (
                  <div key={index} className="flex gap-4 items-center">
                    <Input
                      value={lang.name}
                      onChange={(e) => handleUpdateLanguage(index, 'name', e.target.value)}
                      placeholder="Язык"
                      className="flex-1"
                    />
                    <Input
                      value={lang.level}
                      onChange={(e) => handleUpdateLanguage(index, 'level', e.target.value)}
                      placeholder="Уровень"
                      className="flex-1"
                    />
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleRemoveLanguage(index)}
                      className="text-destructive"
                    >
                      <X className="w-4 h-4" />
                    </Button>
                  </div>
                ))}

                <Button
                  variant="outline"
                  onClick={handleAddLanguage}
                  className="w-full gap-2"
                >
                  <Plus className="w-4 h-4" />
                  Добавить язык
                </Button>

                <Button onClick={handleSaveLanguages} className="w-full gap-2">
                  <Save className="w-4 h-4" />
                  Сохранить
                </Button>
              </div>
            </motion.div>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default AdminPanel;
