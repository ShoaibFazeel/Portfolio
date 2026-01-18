export interface SanityImage {
  _type: 'image';
  asset: {
    _ref: string;
    _type: 'reference';
  };
}

export interface AboutMe {
  fullName: string;
  role: string;
  shortBio: string;
  profilePicture: SanityImage;
  email: string;
  location: string;
  socialLinks: {
    platform: string;
    url: string;
  }[];
  resumeLink: string;
}

export interface Education {
  institution: string;
  degree: string;
  major: string;
  startDate: string;
  endDate: string;
}

export interface Experience {
  company: string;
  role: string;
  location: string;
  startDate: string;
  endDate: string;
  description: string;
  technologies: string[];
}

export interface Project {
  title: string;
  description: string;
  technologies: string[];
  image?: SanityImage;
  githubLink?: string;
  liveDemoLink?: string;
}

export interface Skill {
  skillName: string;
  category: 'Frontend' | 'Backend' | 'Database' | 'DevOps' | 'Options';
  proficiency: 'Beginner' | 'Intermediate' | 'Advanced' | 'Expert';
}

export interface PortfolioData {
  aboutMe: AboutMe;
  education: Education[];
  experience: Experience[];
  projects: Project[];
  skills: Skill[];
}
