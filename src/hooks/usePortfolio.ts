import { useDispatch, useSelector } from 'react-redux';
import type { RootState, AppDispatch } from '@/store';
import {
  updateProfile,
  setTheme,
  addSkill,
  updateSkill,
  deleteSkill,
  addProject,
  updateProject,
  deleteProject,
  addSocialLink,
  updateSocialLink,
  deleteSocialLink,
  updateEducation,
  updateLanguages,
  type PortfolioState,
  type Skill,
  type Project,
  type SocialLink,
} from '@/store/portfolioSlice';

export const usePortfolio = () => {
  const dispatch = useDispatch<AppDispatch>();
  const portfolio = useSelector((state: RootState) => state.portfolio);

  return {
    portfolio,
    actions: {
      updateProfile: (data: Partial<PortfolioState>) => dispatch(updateProfile(data)),
      setTheme: (theme: PortfolioState['theme']) => dispatch(setTheme(theme)),
      addSkill: (skill: Skill) => dispatch(addSkill(skill)),
      updateSkill: (skill: Skill) => dispatch(updateSkill(skill)),
      deleteSkill: (id: string) => dispatch(deleteSkill(id)),
      addProject: (project: Project) => dispatch(addProject(project)),
      updateProject: (project: Project) => dispatch(updateProject(project)),
      deleteProject: (id: string) => dispatch(deleteProject(id)),
      addSocialLink: (link: SocialLink) => dispatch(addSocialLink(link)),
      updateSocialLink: (link: SocialLink) => dispatch(updateSocialLink(link)),
      deleteSocialLink: (id: string) => dispatch(deleteSocialLink(id)),
      updateEducation: (edu: PortfolioState['education']) => dispatch(updateEducation(edu)),
      updateLanguages: (langs: PortfolioState['languages']) => dispatch(updateLanguages(langs)),
    },
  };
};
