export const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';

export type SiteConfig = {
  name: string;
  title: string;
  description: string;
  origin: string;
  og: string;
  keywords: string[];
  creator: {
    name: string;
    url: string;
  };
  socials: {
    github: string;
  };
};
