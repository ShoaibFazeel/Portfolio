import { createClient } from '@sanity/client';
import imageUrlBuilder from '@sanity/image-url';


const projectId = import.meta.env.VITE_SANITY_PROJECT_ID;
const dataset = import.meta.env.VITE_SANITY_DATASET || 'production';
const apiVersion = '2023-05-03';

const isProjectIdValid = (id: string | undefined): id is string => {
  return typeof id === 'string' && /^[a-z0-9-]+$/.test(id);
};

export const client = isProjectIdValid(projectId)
  ? createClient({
    projectId,
    dataset,
    apiVersion,
    useCdn: true,
  })
  : (null as any);

const builder = imageUrlBuilder(client);

export const urlFor = (source: any) => {
  return builder.image(source);
};

export const GROQ_QUERY = `
  {
    "aboutMe": *[_type == "about" || _type == "aboutMe"][0] {
      ...,
      "fullName": coalesce(fullName, name),
      "shortBio": coalesce(shortBio, bio, description),
      "profilePicture": coalesce(profilePicture, profileImage),
      "resumeLink": coalesce(resumeLink, resume.asset->url, resume, cv.asset->url, cv)
    },
    "education": *[_type == "education"] | order(coalesce(startDate, StartDate) desc) {
      ...,
      "institution": coalesce(institution, Institution),
      "degree": coalesce(degree, Degree),
      "major": coalesce(major, Major),
      "startDate": coalesce(startDate, StartDate),
      "endDate": coalesce(endDate, EndDate)
    },
    "experience": *[_type == "experience"] | order(startDate desc),
    "projects": *[_type == "project"] {
      ...,
      "image": coalesce(image, projectImage),
      "githubLink": coalesce(githubLink, github),
      "liveDemoLink": coalesce(demoLink, demo, liveLink)
    },
    "skills": *[_type == "skill"] {
      ...,
      "skillName": coalesce(skillName, name, title),
      "proficiency": coalesce(proficiency, level)
    }
  }
`;
