export interface RSSFeed {
  name: string;
  url: string;
  category: string;
}

export interface Article {
  title: string;
  link: string;
  pubDate: Date;
  description?: string;
  source: string;
  category: string;
}

export interface EmailConfig {
  host: string;
  port: number;
  secure: boolean;
  auth: {
    user: string;
    pass: string;
  };
  from: string;
  to: string;
}

export interface DigestResult {
  totalArticles: number;
  articlesByCategory: Map<string, Article[]>;
  errors: string[];
}
