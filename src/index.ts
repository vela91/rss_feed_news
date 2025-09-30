import dotenv from 'dotenv';
import cron from 'node-cron';
import { fetchAllFeeds } from './rss-fetcher';
import { sendDigestEmail } from './email-sender';
import { CRON_SCHEDULE } from './config';

// Load environment variables
dotenv.config();

/**
 * Main function that fetches RSS feeds and sends digest email
 */
async function runDigest(): Promise<void> {
  const startTime = Date.now();

  try {
    console.log('\n' + '='.repeat(60));
    console.log('🚀 Starting RSS Daily Digest');
    console.log('='.repeat(60));

    // Fetch all RSS feeds
    const digest = await fetchAllFeeds();

    // Send email
    await sendDigestEmail(digest);

    const duration = ((Date.now() - startTime) / 1000).toFixed(2);
    console.log('\n' + '='.repeat(60));
    console.log(`✅ Digest completed successfully in ${duration}s`);
    console.log('='.repeat(60) + '\n');
  } catch (error) {
    console.error('\n❌ Error running digest:', error);
    console.error('='.repeat(60) + '\n');
    throw error;
  }
}

/**
 * Main entry point
 */
async function main() {
  const args = process.argv.slice(2);

  // Test mode: run immediately without scheduling
  if (args.includes('--test')) {
    console.log('🧪 Running in TEST mode (immediate execution)...\n');
    await runDigest();
    process.exit(0);
  }

  // Normal mode: schedule with cron
  console.log('\n' + '='.repeat(60));
  console.log('📅 RSS Daily Digest Scheduler Started');
  console.log('='.repeat(60));
  console.log(`Schedule: ${CRON_SCHEDULE}`);
  console.log('Waiting for scheduled execution...');
  console.log('(Press Ctrl+C to stop)');
  console.log('='.repeat(60) + '\n');

  // Validate cron expression
  if (!cron.validate(CRON_SCHEDULE)) {
    console.error(`❌ Invalid cron schedule: ${CRON_SCHEDULE}`);
    process.exit(1);
  }

  // Schedule the digest
  cron.schedule(CRON_SCHEDULE, async () => {
    await runDigest();
  });

  // Keep the process running
  process.on('SIGINT', () => {
    console.log('\n\n👋 Shutting down gracefully...\n');
    process.exit(0);
  });
}

// Run the application
main().catch((error) => {
  console.error('Fatal error:', error);
  process.exit(1);
});
