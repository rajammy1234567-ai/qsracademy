const nodemailer = require('nodemailer');

// Destination email requested by client
const DEFAULT_RECIPIENT = process.env.ADMIN_NOTIFICATION_EMAIL || 'academyqsr@gmail.com';

/**
 * Creates reusable SMTP transporter if credentials are provided
 */
const getTransporter = () => {
  const user = process.env.SMTP_USER || process.env.ADMIN_NOTIFICATION_EMAIL || 'academyqsr@gmail.com';
  const rawPass = process.env.SMTP_PASS || 'joma vbzt tsae dzbk';

  if (!rawPass) {
    return null;
  }

  const pass = rawPass.trim();

  return nodemailer.createTransport({
    host: process.env.SMTP_HOST || 'smtp.gmail.com',
    port: parseInt(process.env.SMTP_PORT || '465', 10),
    secure: process.env.SMTP_SECURE === 'true' || (process.env.SMTP_PORT || '465') === '465',
    auth: {
      user,
      pass,
    },
  });
};

/**
 * Generates an executive, branded HTML notification email
 */
const generateEmailTemplate = ({ title, category, badgeColor, fields, messageText, adminUrl }) => {
  const fieldRows = fields
    .map(
      (f) => `
      <tr>
        <td style="padding: 10px 14px; font-weight: 600; color: #475569; width: 35%; border-bottom: 1px solid #f1f5f9; font-size: 13px;">${f.label}</td>
        <td style="padding: 10px 14px; color: #0f172a; font-weight: 500; border-bottom: 1px solid #f1f5f9; font-size: 13px;">${f.value}</td>
      </tr>`
    )
    .join('');

  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${title}</title>
</head>
<body style="margin: 0; padding: 0; background-color: #f8fafc; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;">
  <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background-color: #f8fafc; padding: 30px 15px;">
    <tr>
      <td align="center">
        <!-- Main Card Container -->
        <table role="presentation" width="100%" style="max-width: 600px; background-color: #ffffff; border-radius: 16px; overflow: hidden; box-shadow: 0 4px 20px rgba(0,0,0,0.06); border: 1px solid #e2e8f0;">
          
          <!-- Header Banner -->
          <tr>
            <td style="background: linear-gradient(135deg, #0a192f 0%, #0f2747 100%); padding: 28px 30px; text-align: left;">
              <table width="100%" cellspacing="0" cellpadding="0">
                <tr>
                  <td>
                    <div style="font-size: 20px; font-weight: 800; color: #ffffff; letter-spacing: -0.5px;">
                      QSR <span style="color: #f59e0b;">ACADEMY</span>
                    </div>
                    <div style="font-size: 11px; color: #94a3b8; text-transform: uppercase; letter-spacing: 1px; margin-top: 4px;">
                      Lead Management System • Zirakpur Campus
                    </div>
                  </td>
                  <td align="right">
                    <span style="display: inline-block; padding: 6px 12px; background-color: rgba(245, 158, 11, 0.15); border: 1px solid rgba(245, 158, 11, 0.4); border-radius: 20px; color: #fbbf24; font-size: 11px; font-weight: 700; text-transform: uppercase;">
                      ${category}
                    </span>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Body Content -->
          <tr>
            <td style="padding: 28px 30px;">
              <h2 style="margin: 0 0 8px 0; color: #0f172a; font-size: 19px; font-weight: 700;">
                ${title}
              </h2>
              <p style="margin: 0 0 20px 0; color: #64748b; font-size: 13px; line-height: 1.5;">
                A new enquiry has been submitted on the QSR ACADEMY website. Details are recorded below:
              </p>

              <!-- Data Table -->
              <table width="100%" cellspacing="0" cellpadding="0" style="background-color: #f8fafc; border-radius: 12px; border: 1px solid #e2e8f0; margin-bottom: 20px;">
                ${fieldRows}
              </table>

              ${
                messageText
                  ? `
              <!-- User Note / Message Box -->
              <div style="background-color: #fefce8; border-left: 4px solid #f59e0b; padding: 14px 16px; border-radius: 6px; margin-bottom: 24px;">
                <div style="font-size: 11px; font-weight: 700; color: #854d0e; text-transform: uppercase; margin-bottom: 4px;">
                  Message / Remarks:
                </div>
                <div style="font-size: 13px; color: #1e293b; line-height: 1.5; font-style: italic;">
                  "${messageText}"
                </div>
              </div>`
                  : ''
              }

              <!-- Action Button -->
              <table width="100%" cellspacing="0" cellpadding="0">
                <tr>
                  <td align="center" style="padding-top: 10px;">
                    <a href="${adminUrl}" style="display: inline-block; background-color: #0a192f; color: #ffffff; text-decoration: none; padding: 13px 28px; border-radius: 10px; font-weight: 700; font-size: 13px; box-shadow: 0 2px 6px rgba(10, 25, 47, 0.3);">
                      Open in Admin Dashboard →
                    </a>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="background-color: #f8fafc; padding: 18px 30px; border-top: 1px solid #e2e8f0; text-align: center;">
              <p style="margin: 0; font-size: 11px; color: #94a3b8; line-height: 1.5;">
                This automated notification was delivered to <strong>${DEFAULT_RECIPIENT}</strong>.<br />
                Campus: SCO-35, High Street Market, Opp. VIP Road, Zirakpur, Punjab 140603.
              </p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>
`;
};

/**
 * Main dispatcher to send email notification on new enquiries
 */
const sendLeadNotification = async ({ type, data }) => {
  const adminUrl = `${process.env.CLIENT_URL || 'http://localhost:5173'}/admin/dashboard`;
  let title = '';
  let category = '';
  let badgeColor = '#f59e0b';
  let fields = [];
  let messageText = '';

  const timestampStr = new Date().toLocaleString('en-IN', {
    timeZone: 'Asia/Kolkata',
    dateStyle: 'medium',
    timeStyle: 'short',
  });

  if (type === 'ADMISSION') {
    title = `New Student Admission: ${data.fullName}`;
    category = 'Student Admission';
    fields = [
      { label: 'Student Name', value: data.fullName },
      { label: 'Phone Number', value: `<a href="tel:${data.phone}" style="color: #d97706; text-decoration: none; font-weight: 700;">${data.phone}</a>` },
      { label: 'Email Address', value: `<a href="mailto:${data.email}" style="color: #2563eb; text-decoration: none;">${data.email}</a>` },
      { label: 'City', value: data.city },
      { label: 'Course Interested', value: `<strong>${data.courseName || 'QSR Operations'}</strong>` },
      { label: 'Qualification', value: data.qualification || 'Not specified' },
      { label: 'Submitted At', value: timestampStr },
    ];
    messageText = data.message;
  } else if (type === 'FRANCHISE') {
    title = `New ₹4L Franchise Lead: ${data.fullName}`;
    category = 'Franchise Partner';
    fields = [
      { label: 'Investor Name', value: data.fullName },
      { label: 'Phone Number', value: `<a href="tel:${data.phone}" style="color: #d97706; text-decoration: none; font-weight: 700;">${data.phone}</a>` },
      { label: 'Email Address', value: `<a href="mailto:${data.email}" style="color: #2563eb; text-decoration: none;">${data.email}</a>` },
      { label: 'Target City', value: data.city },
      { label: 'Preferred Model', value: `<strong>${data.preferredModel}</strong>` },
      { label: 'Readiness', value: data.investmentReadiness || 'Ready to invest' },
      { label: 'Occupation', value: data.occupation || 'Entrepreneur' },
      { label: 'Submitted At', value: timestampStr },
    ];
    messageText = data.message;
  } else if (type === 'HIRING') {
    title = `New Manpower Request: ${data.companyName}`;
    category = 'Corporate Talent';
    fields = [
      { label: 'Company / Brand', value: `<strong>${data.companyName}</strong>` },
      { label: 'Contact Person', value: data.contactPerson },
      { label: 'Phone Number', value: `<a href="tel:${data.phone}" style="color: #d97706; text-decoration: none; font-weight: 700;">${data.phone}</a>` },
      { label: 'Official Email', value: `<a href="mailto:${data.email}" style="color: #2563eb; text-decoration: none;">${data.email}</a>` },
      { label: 'Store City', value: data.city },
      { label: 'Staff Positions', value: `<strong>${data.staffRequired} candidates</strong>` },
      { label: 'Roles Required', value: (data.rolesRequired || []).join(', ') },
      { label: 'Submitted At', value: timestampStr },
    ];
    messageText = data.message;
  } else if (type === 'CONTACT') {
    title = `New Contact Message: ${data.name}`;
    category = 'Contact Query';
    fields = [
      { label: 'Sender Name', value: data.name },
      { label: 'Phone Number', value: data.phone ? `<a href="tel:${data.phone}" style="color: #d97706; text-decoration: none; font-weight: 700;">${data.phone}</a>` : 'Not provided' },
      { label: 'Email Address', value: `<a href="mailto:${data.email}" style="color: #2563eb; text-decoration: none;">${data.email}</a>` },
      { label: 'Subject', value: `<strong>${data.subject}</strong>` },
      { label: 'Submitted At', value: timestampStr },
    ];
    messageText = data.message;
  }

  const html = generateEmailTemplate({
    title,
    category,
    badgeColor,
    fields,
    messageText,
    adminUrl,
  });

  const transporter = getTransporter();

  // If no SMTP password provided, log the email preview cleanly
  if (!transporter) {
    console.log('\n=============================================================');
    console.log(`📧 [EMAIL NOTIFICATION DISPATCHED TO: ${DEFAULT_RECIPIENT}]`);
    console.log(`📌 SUBJECT: ${title}`);
    console.log(`📋 CATEGORY: ${category}`);
    console.log('📝 DETAILS:');
    fields.forEach((f) => console.log(`   - ${f.label}: ${f.value.replace(/<[^>]*>?/gm, '')}`));
    if (messageText) console.log(`💬 MESSAGE: "${messageText}"`);
    console.log('ℹ️  Note: To send live emails to inbox, configure SMTP_PASS in server/.env');
    console.log('=============================================================\n');
    return { success: true, simulated: true };
  }

  // Send real live email via SMTP
  try {
    const fromAddress = process.env.EMAIL_FROM || `"QSR ACADEMY Leads" <${process.env.SMTP_USER || 'academyqsr@gmail.com'}>`;
    const mailOptions = {
      from: fromAddress,
      to: DEFAULT_RECIPIENT,
      subject: `[QSR ACADEMY] ${title}`,
      html,
    };

    const info = await transporter.sendMail(mailOptions);
    console.log(`✅ [EmailService]: Live notification successfully sent to ${DEFAULT_RECIPIENT} (ID: ${info.messageId})`);
    return { success: true, messageId: info.messageId };
  } catch (err) {
    console.error(`❌ [EmailService Error]: Failed to send notification email to ${DEFAULT_RECIPIENT}:`, err.message);
    // Do not throw so client submission response is not interrupted
    return { success: false, error: err.message };
  }
};

module.exports = {
  sendLeadNotification,
  DEFAULT_RECIPIENT,
};
