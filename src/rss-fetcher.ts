import Parser from 'rss-parser';
import { RSSFeed, Article, DigestResult } from './types';
import { RSS_FEEDS, HOURS_LOOKBACK } from './config';

const parser = new Parser();

/**
 * Fetches articles from a single RSS feed
 */
async function fetchFeed(feed: RSSFeed): Promise<Article[]> {
  try {
    console.log(`Fetching: ${feed.name}`);
    const parsedFeed = await parser.parseURL(feed.url);

    const articles: Article[] = [];
    const cutoffDate = new Date();
    cutoffDate.setHours(cutoffDate.getHours() - HOURS_LOOKBACK);

    for (const item of parsedFeed.items) {
      const pubDate = item.pubDate ? new Date(item.pubDate) : new Date();

      // Only include articles from the last X hours
      if (pubDate >= cutoffDate) {
        articles.push({
          title: item.title || 'No title',
          link: item.link || '#',
          pubDate: pubDate,
          description: item.contentSnippet || item.content || '',
          source: feed.name,
          category: feed.category
        });
      }
    }

    console.log(`  ✓ Found ${articles.length} recent articles from ${feed.name}`);
    return articles;
  } catch (error) {
    console.error(`  ✗ Error fetching ${feed.name}:`, error);
    return [];
  }
}

/**
 * Fetches all RSS feeds and organizes articles by category
 */
export async function fetchAllFeeds(): Promise<DigestResult> {
  console.log(`\n📰 Fetching RSS feeds (last ${HOURS_LOOKBACK} hours)...\n`);

  const errors: string[] = [];
  const allArticles: Article[] = [];

  // Fetch all feeds in parallel
  const feedPromises = RSS_FEEDS.map(async (feed) => {
    try {
      return await fetchFeed(feed);
    } catch (error) {
      const errorMsg = `Failed to fetch ${feed.name}: ${error}`;
      errors.push(errorMsg);
      return [];
    }
  });

  const results = await Promise.all(feedPromises);
  results.forEach(articles => allArticles.push(...articles));

  // Sort by date (newest first)
  allArticles.sort((a, b) => b.pubDate.getTime() - a.pubDate.getTime());

  // Organize by category
  const articlesByCategory = new Map<string, Article[]>();
  for (const article of allArticles) {
    if (!articlesByCategory.has(article.category)) {
      articlesByCategory.set(article.category, []);
    }
    articlesByCategory.get(article.category)!.push(article);
  }

  console.log(`\n✅ Total articles found: ${allArticles.length}`);
  if (errors.length > 0) {
    console.log(`⚠️  Errors: ${errors.length}`);
  }

  return {
    totalArticles: allArticles.length,
    articlesByCategory,
    errors
  };
}
