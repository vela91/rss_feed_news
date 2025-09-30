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
  }
];

// Hours to look back for articles (default 24 hours)
export const HOURS_LOOKBACK = parseInt(process.env.HOURS_LOOKBACK || '24', 10);

// Cron schedule (default: every day at 8:00 AM)
export const CRON_SCHEDULE = process.env.CRON_SCHEDULE || '0 8 * * *';
