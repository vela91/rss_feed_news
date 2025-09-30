import nodemailer from 'nodemailer';
import { DigestResult, Article, EmailConfig } from './types';

/**
 * Generates HTML email content from the digest result
 */
function generateEmailHTML(digest: DigestResult): string {
  const now = new Date().toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  let categoriesHTML = '';

  if (digest.totalArticles === 0) {
    categoriesHTML = '<p style="text-align: center; color: #666;">No new articles found in the last 24 hours.</p>';
  } else {
    // Generate HTML for each category
    for (const [category, articles] of digest.articlesByCategory) {
      categoriesHTML += `
        <div style="margin-bottom: 30px;">
          <h2 style="color: #2563eb; border-bottom: 2px solid #2563eb; padding-bottom: 8px; margin-bottom: 15px;">
            ${category} (${articles.length})
          </h2>
          <div style="margin-left: 10px;">
      `;

      articles.forEach((article: Article) => {
        const description = article.description
          ? article.description.substring(0, 200) + (article.description.length > 200 ? '...' : '')
          : '';

        categoriesHTML += `
          <div style="margin-bottom: 20px; padding: 15px; background-color: #f9fafb; border-left: 3px solid #2563eb; border-radius: 4px;">
            <h3 style="margin: 0 0 8px 0; font-size: 16px;">
              <a href="${article.link}" style="color: #1e40af; text-decoration: none;">
                ${article.title}
              </a>
            </h3>
            ${description ? `<p style="margin: 8px 0; color: #4b5563; font-size: 14px; line-height: 1.5;">${description}</p>` : ''}
            <p style="margin: 8px 0 0 0; font-size: 12px; color: #9ca3af;">
              <strong>Source:</strong> ${article.source} |
              <strong>Published:</strong> ${article.pubDate.toLocaleString()}
            </p>
          </div>
        `;
      });

      categoriesHTML += `
          </div>
        </div>
      `;
    }
  }

  // Error section
  let errorsHTML = '';
  if (digest.errors.length > 0) {
    errorsHTML = `
      <div style="margin-top: 30px; padding: 15px; background-color: #fef2f2; border-left: 3px solid #dc2626; border-radius: 4px;">
        <h3 style="color: #dc2626; margin-top: 0;">⚠️ Errors (${digest.errors.length})</h3>
        <ul style="color: #991b1b; font-size: 12px;">
          ${digest.errors.map(error => `<li>${error}</li>`).join('')}
        </ul>
      </div>
    `;
  }

  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Web Dev Daily Digest</title>
</head>
<body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; line-height: 1.6; color: #333; max-width: 800px; margin: 0 auto; padding: 20px; background-color: #ffffff;">

  <div style="text-align: center; padding: 20px 0; border-bottom: 3px solid #2563eb; margin-bottom: 30px;">
    <h1 style="color: #1e3a8a; margin: 0; font-size: 32px;">📰 Web Dev Daily Digest</h1>
    <p style="color: #64748b; margin: 10px 0 0 0; font-size: 14px;">${now}</p>
    <p style="color: #64748b; margin: 5px 0 0 0; font-size: 14px;"><strong>${digest.totalArticles}</strong> articles</p>
  </div>

  ${categoriesHTML}

  ${errorsHTML}

  <div style="margin-top: 40px; padding-top: 20px; border-top: 1px solid #e5e7eb; text-align: center; color: #9ca3af; font-size: 12px;">
    <p>Generated automatically by RSS Daily Digest</p>
  </div>

</body>
</html>
  `;
}

/**
 * Sends the digest email
 */
export async function sendDigestEmail(digest: DigestResult): Promise<void> {
  const config: EmailConfig = {
    host: process.env.EMAIL_HOST || 'smtp.gmail.com',
    port: parseInt(process.env.EMAIL_PORT || '587', 10),
    secure: process.env.EMAIL_PORT === '465',
    auth: {
      user: process.env.EMAIL_USER || '',
      pass: process.env.EMAIL_PASS || ''
    },
    from: process.env.EMAIL_FROM || process.env.EMAIL_USER || '',
    to: process.env.EMAIL_TO || ''
  };

  // Validate configuration
  if (!config.auth.user || !config.auth.pass || !config.to) {
    throw new Error('Missing email configuration. Please check your .env file.');
  }

  console.log('\n📧 Sending email...');

  const transporter = nodemailer.createTransport({
    host: config.host,
    port: config.port,
    secure: config.secure,
    auth: config.auth
  });

  const htmlContent = generateEmailHTML(digest);

  const mailOptions = {
    from: `"Web Dev Digest" <${config.from}>`,
    to: config.to,
    subject: `📰 Web Dev Daily Digest - ${new Date().toLocaleDateString()} (${digest.totalArticles} articles)`,
    html: htmlContent
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log('✅ Email sent successfully!');
    console.log('   Message ID:', info.messageId);
  } catch (error) {
    console.error('❌ Error sending email:', error);
    throw error;
  }
}
