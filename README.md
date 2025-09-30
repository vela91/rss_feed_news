# RSS Daily Digest

Automated daily newsletter that aggregates web development news from top RSS feeds and sends them to your email.

## Features

- 📰 Aggregates content from 11+ top web development sources
- 📧 Beautiful HTML email digest
- ⏰ Automated daily scheduling with cron
- 🔍 Filters articles from the last 24 hours
- 📊 Organizes content by category
- 🛡️ Error handling and logging
- ⚡ Written in TypeScript

## RSS Sources

The digest includes articles from:

**General Web Dev**
- Dev.to - Web Development
- Smashing Magazine
- CSS-Tricks
- Web.dev (Google)

**JavaScript/Frontend**
- JavaScript Weekly
- Frontend Focus
- Echo JS
- React Status

**Backend/Full Stack**
- Node Weekly

**Tech News**
- Hacker News (Best)

**Communities**
- Reddit r/webdev

## Prerequisites

- Node.js 18+
- npm or yarn
- SMTP email account (Gmail recommended)

## Deployment Options

### Option 1: GitHub Actions (Recommended - 100% Free)

GitHub Actions runs the digest automatically without needing a server running 24/7.

**Setup:**

1. **Push your code to GitHub**

2. **Configure GitHub Secrets**
   - Go to your repository on GitHub
   - Navigate to `Settings` → `Secrets and variables` → `Actions`
   - Click `New repository secret` and add each of these:

   | Secret Name | Value |
   |------------|-------|
   | `EMAIL_HOST` | `smtp.gmail.com` |
   | `EMAIL_PORT` | `587` |
   | `EMAIL_USER` | Your Gmail address |
   | `EMAIL_PASS` | Your Gmail App Password |
   | `EMAIL_FROM` | Your Gmail address |
   | `EMAIL_TO` | Email where you want to receive the digest |
   | `CRON_SCHEDULE` | `0 8 * * *` (optional) |
   | `HOURS_LOOKBACK` | `24` (optional) |

3. **The workflow will run automatically**
   - Daily at 8:00 AM UTC (configured in `.github/workflows/daily-digest.yml`)
   - You can also trigger it manually from the Actions tab

4. **Adjust timezone if needed**
   - Edit `.github/workflows/daily-digest.yml`
   - Change the cron schedule (e.g., `0 13 * * *` for 8:00 AM EST)

**Manual trigger:**
- Go to `Actions` tab in your GitHub repo
- Select `RSS Daily Digest` workflow
- Click `Run workflow`

### Option 2: Local/Server Installation

## Installation

1. **Clone or download the project**
   ```bash
   cd rss-daily-digest
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure environment variables**
   ```bash
   cp .env.example .env
   ```

4. **Edit `.env` with your email credentials**
   ```env
   EMAIL_HOST=smtp.gmail.com
   EMAIL_PORT=587
   EMAIL_USER=your-email@gmail.com
   EMAIL_PASS=your-app-password
   EMAIL_TO=recipient@example.com
   CRON_SCHEDULE=0 8 * * *
   ```

   **For Gmail users:** You need to create an App Password:
   - Go to https://myaccount.google.com/apppasswords
   - Generate a new app password
   - Use this password in `EMAIL_PASS`

5. **Build the project**
   ```bash
   npm run build
   ```

## Usage

### Test Mode (Run Immediately)

Test the digest without waiting for the scheduled time:

```bash
npm run dev -- --test
```

This will:
- Fetch all RSS feeds immediately
- Generate and send the email
- Exit after completion

### Production Mode (Scheduled)

Run the digest on a schedule:

```bash
npm start
```

The application will:
- Start the cron scheduler
- Run daily at the configured time (default: 8:00 AM)
- Keep running until you stop it (Ctrl+C)

### Run in Background

For production, use a process manager like PM2:

```bash
npm install -g pm2
pm2 start dist/index.js --name rss-digest
pm2 save
pm2 startup
```

## Configuration

### Cron Schedule

Edit `CRON_SCHEDULE` in `.env`:

```bash
# Every day at 8:00 AM
CRON_SCHEDULE=0 8 * * *

# Every weekday at 9:00 AM
CRON_SCHEDULE=0 9 * * 1-5

# Every 6 hours
CRON_SCHEDULE=0 */6 * * *
```

Format: `minute hour day month weekday`

### Hours Lookback

Change how far back to look for articles:

```bash
# Last 24 hours (default)
HOURS_LOOKBACK=24

# Last 12 hours
HOURS_LOOKBACK=12

# Last 48 hours
HOURS_LOOKBACK=48
```

### Customize RSS Feeds

Edit `src/config.ts` to add/remove feeds:

```typescript
export const RSS_FEEDS: RSSFeed[] = [
  {
    name: 'Your Feed Name',
    url: 'https://example.com/feed.xml',
    category: 'Your Category'
  },
  // ... more feeds
];
```

## Project Structure

```
rss-daily-digest/
├── src/
│   ├── index.ts          # Entry point and cron scheduler
│   ├── rss-fetcher.ts    # RSS feed fetching logic
│   ├── email-sender.ts   # Email generation and sending
│   ├── config.ts         # RSS feeds configuration
│   └── types.ts          # TypeScript interfaces
├── dist/                 # Compiled JavaScript (generated)
├── package.json
├── tsconfig.json
├── .env                  # Your configuration (not committed)
└── .env.example          # Configuration template
```

## Troubleshooting

### Email not sending

1. **Check your credentials** - Make sure `EMAIL_USER` and `EMAIL_PASS` are correct
2. **Use App Password** - If using Gmail, you must use an App Password, not your regular password
3. **Enable less secure apps** - For some providers, you may need to enable this setting
4. **Check firewall** - Ensure port 587 (or 465) is not blocked

### No articles found

1. **Check RSS feeds** - Some feeds may be temporarily down
2. **Adjust lookback time** - Increase `HOURS_LOOKBACK` if feeds don't publish frequently
3. **Check logs** - The application will show which feeds failed to fetch

### Cron not running

1. **Validate schedule** - Use https://crontab.guru to verify your cron expression
2. **Check timezone** - Cron runs in your server's timezone
3. **Keep process running** - The application must stay running for cron to work

## Development

```bash
# Run in development mode with hot reload
npm run dev

# Build TypeScript
npm run build

# Run tests (immediate execution)
npm run test-fetch
```

## License

MIT

## Contributing

Feel free to customize the RSS feeds, email template, or scheduling to fit your needs!
