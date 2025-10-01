import { RSSFeed } from './types';

export const RSS_FEEDS: RSSFeed[] = [
  // General Web Development
  {
    name: 'Dev.to - Web Development',
    url: 'https://dev.to/feed/tag/webdev',
    category: 'General Web Dev'
  },
  {
    name: 'Smashing Magazine',
    url: 'https://www.smashingmagazine.com/feed/',
    category: 'General Web Dev'
  },
  {
    name: 'CSS-Tricks',
    url: 'https://css-tricks.com/feed/',
    category: 'General Web Dev'
  },
  {
    name: 'Web.dev (Google)',
    url: 'https://web.dev/feed.xml',
    category: 'General Web Dev'
  },

  // JavaScript/Frontend
  {
    name: 'JavaScript Weekly',
    url: 'https://javascriptweekly.com/rss/',
    category: 'JavaScript/Frontend'
  },
  {
    name: 'Frontend Focus',
    url: 'https://frontendfoc.us/rss/',
    category: 'JavaScript/Frontend'
  },
  {
    name: 'Echo JS',
    url: 'https://www.echojs.com/rss',
    category: 'JavaScript/Frontend'
  },
  {
    name: 'React Status',
    url: 'https://react.statuscode.com/rss/',
    category: 'JavaScript/Frontend'
  },

  // Backend/Full Stack
  {
    name: 'Node Weekly',
    url: 'https://nodeweekly.com/rss/',
    category: 'Backend/Full Stack'
  },
  {
    name: 'Hacker News (Best)',
    url: 'https://hnrss.org/best',
    category: 'Tech News'
  },

  // Communities
  {
    name: 'Reddit r/webdev',
    url: 'https://www.reddit.com/r/webdev/.rss',
    category: 'Communities'
  },

  // AI & Machine Learning
  {
    name: 'OpenAI Blog',
    url: 'https://openai.com/blog/rss.xml',
    category: 'AI & Machine Learning'
  },
  {
    name: 'Google AI Blog',
    url: 'https://blog.research.google/feeds/posts/default',
    category: 'AI & Machine Learning'
  },
  {
    name: 'Hugging Face Blog',
    url: 'https://huggingface.co/blog/feed.xml',
    category: 'AI & Machine Learning'
  },
  {
    name: 'Towards Data Science - AI',
    url: 'https://towardsdatascience.com/feed/tagged/artificial-intelligence',
    category: 'AI & Machine Learning'
  },
  {
    name: 'AI Weekly',
    url: 'https://aiweekly.co/rss/',
    category: 'AI & Machine Learning'
  },
  {
    name: 'The Batch (Andrew Ng)',
    url: 'https://www.deeplearning.ai/the-batch/feed/',
    category: 'AI & Machine Learning'
  },

  // Python & AI Development
  {
    name: 'Real Python',
    url: 'https://realpython.com/atom.xml',
    category: 'Python & AI Dev'
  },
  {
    name: 'Python Weekly',
    url: 'https://www.pythonweekly.com/rss/',
    category: 'Python & AI Dev'
  },
  {
    name: 'Dev.to - AI',
    url: 'https://dev.to/feed/tag/ai',
    category: 'AI & Machine Learning'
  },
  {
    name: 'Dev.to - Machine Learning',
    url: 'https://dev.to/feed/tag/machinelearning',
    category: 'AI & Machine Learning'
  },

  // LLMs, RAG & AI Agents
  {
    name: 'LangChain Blog',
    url: 'https://blog.langchain.dev/rss/',
    category: 'LLMs & AI Agents'
  },
  {
    name: 'Reddit r/LangChain',
    url: 'https://www.reddit.com/r/LangChain/.rss',
    category: 'LLMs & AI Agents'
  },
  {
    name: 'Reddit r/MachineLearning',
    url: 'https://www.reddit.com/r/MachineLearning/.rss',
    category: 'AI & Machine Learning'
  },
  {
    name: 'Reddit r/LocalLLaMA',
    url: 'https://www.reddit.com/r/LocalLLaMA/.rss',
    category: 'LLMs & AI Agents'
  },

  // Automation
  {
    name: 'Zapier Blog',
    url: 'https://zapier.com/blog/feed/',
    category: 'Automation'
  },
  {
    name: 'n8n Blog',
    url: 'https://blog.n8n.io/rss/',
    category: 'Automation'
  }
];

// Hours to look back for articles (default 24 hours)
export const HOURS_LOOKBACK = parseInt(process.env.HOURS_LOOKBACK || '24', 10);

// Cron schedule (default: every day at 8:00 AM)
export const CRON_SCHEDULE = process.env.CRON_SCHEDULE || '0 8 * * *';
