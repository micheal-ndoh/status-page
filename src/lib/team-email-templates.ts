export const teamInviteEmailTemplates = {
  en: {
    subject: "You've been invited to join a team on Prism",
    generateHTML: (inviterName: string, teamName: string, inviteUrl: string, role: string) => `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Team Invitation - Prism</title>
        <style>
          body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
            margin: 0;
            padding: 0;
            background: linear-gradient(135deg, #0a0a0a 0%, #1a1a2e 50%, #16213e 100%);
            color: #ffffff;
          }
          .container {
            max-width: 600px;
            margin: 0 auto;
            padding: 40px 20px;
          }
          .header {
            text-align: center;
            margin-bottom: 40px;
          }
          .logo {
            font-size: 32px;
            font-weight: bold;
            background: linear-gradient(135deg, #3b82f6, #8b5cf6);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            margin-bottom: 20px;
          }
          .card {
            background: rgba(255, 255, 255, 0.1);
            backdrop-filter: blur(10px);
            border: 1px solid rgba(255, 255, 255, 0.2);
            border-radius: 16px;
            padding: 40px;
            margin-bottom: 30px;
          }
          .title {
            font-size: 24px;
            font-weight: bold;
            margin-bottom: 20px;
            text-align: center;
          }
          .description {
            font-size: 16px;
            line-height: 1.6;
            margin-bottom: 30px;
            text-align: center;
            color: rgba(255, 255, 255, 0.8);
          }
          .team-info {
            background: rgba(59, 130, 246, 0.2);
            border: 1px solid rgba(59, 130, 246, 0.3);
            border-radius: 12px;
            padding: 20px;
            margin: 30px 0;
            text-align: center;
          }
          .team-name {
            font-size: 20px;
            font-weight: bold;
            color: #3b82f6;
            margin-bottom: 10px;
          }
          .role-badge {
            display: inline-block;
            background: linear-gradient(135deg, #10b981, #059669);
            color: white;
            padding: 8px 16px;
            border-radius: 20px;
            font-size: 14px;
            font-weight: 500;
            text-transform: uppercase;
            letter-spacing: 0.5px;
          }
          .cta-button {
            display: inline-block;
            background: linear-gradient(135deg, #3b82f6, #1d4ed8);
            color: white;
            text-decoration: none;
            padding: 16px 32px;
            border-radius: 12px;
            font-weight: 600;
            font-size: 16px;
            text-align: center;
            margin: 30px 0;
            transition: all 0.3s ease;
            box-shadow: 0 4px 15px rgba(59, 130, 246, 0.3);
          }
          .cta-button:hover {
            transform: translateY(-2px);
            box-shadow: 0 6px 20px rgba(59, 130, 246, 0.4);
          }
          .footer {
            text-align: center;
            margin-top: 40px;
            padding-top: 30px;
            border-top: 1px solid rgba(255, 255, 255, 0.1);
            color: rgba(255, 255, 255, 0.6);
            font-size: 14px;
          }
          .security-note {
            background: rgba(239, 68, 68, 0.1);
            border: 1px solid rgba(239, 68, 68, 0.3);
            border-radius: 8px;
            padding: 15px;
            margin-top: 20px;
            font-size: 14px;
            color: rgba(255, 255, 255, 0.8);
          }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <div class="logo">Prism</div>
          </div>
          
          <div class="card">
            <div class="title">You're Invited! 🎉</div>
            <div class="description">
              ${inviterName} has invited you to join their team on Prism, the modern status page platform.
            </div>
            
            <div class="team-info">
              <div class="team-name">${teamName}</div>
              <div class="role-badge">${role}</div>
            </div>
            
            <div style="text-align: center;">
              <a href="${inviteUrl}" class="cta-button">
                Accept Invitation
              </a>
            </div>
            
            <div class="security-note">
              <strong>🔒 Security Note:</strong> This invitation link is unique to you and will expire in 7 days. 
              If you didn't expect this invitation, please ignore this email.
            </div>
          </div>
          
          <div class="footer">
            <p>This invitation was sent from Prism Status Page Platform</p>
            <p>If you have any questions, please contact your team administrator</p>
          </div>
        </div>
      </body>
      </html>
    `,
    generateText: (inviterName: string, teamName: string, inviteUrl: string, role: string) => `
You've been invited to join a team on Prism!

${inviterName} has invited you to join the team "${teamName}" as a ${role.toLowerCase()}.

Team: ${teamName}
Role: ${role}
Invitation Link: ${inviteUrl}

To accept this invitation, click the link above or copy and paste it into your browser.

This invitation will expire in 7 days.

Security Note: This invitation link is unique to you. If you didn't expect this invitation, please ignore this email.

---
Prism Status Page Platform
    `
  },
  fr: {
    subject: "Vous avez été invité à rejoindre une équipe sur Prism",
    generateHTML: (inviterName: string, teamName: string, inviteUrl: string, role: string) => `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Invitation d'équipe - Prism</title>
        <style>
          body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
            margin: 0;
            padding: 0;
            background: linear-gradient(135deg, #0a0a0a 0%, #1a1a2e 50%, #16213e 100%);
            color: #ffffff;
          }
          .container {
            max-width: 600px;
            margin: 0 auto;
            padding: 40px 20px;
          }
          .header {
            text-align: center;
            margin-bottom: 40px;
          }
          .logo {
            font-size: 32px;
            font-weight: bold;
            background: linear-gradient(135deg, #3b82f6, #8b5cf6);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            margin-bottom: 20px;
          }
          .card {
            background: rgba(255, 255, 255, 0.1);
            backdrop-filter: blur(10px);
            border: 1px solid rgba(255, 255, 255, 0.2);
            border-radius: 16px;
            padding: 40px;
            margin-bottom: 30px;
          }
          .title {
            font-size: 24px;
            font-weight: bold;
            margin-bottom: 20px;
            text-align: center;
          }
          .description {
            font-size: 16px;
            line-height: 1.6;
            margin-bottom: 30px;
            text-align: center;
            color: rgba(255, 255, 255, 0.8);
          }
          .team-info {
            background: rgba(59, 130, 246, 0.2);
            border: 1px solid rgba(59, 130, 246, 0.3);
            border-radius: 12px;
            padding: 20px;
            margin: 30px 0;
            text-align: center;
          }
          .team-name {
            font-size: 20px;
            font-weight: bold;
            color: #3b82f6;
            margin-bottom: 10px;
          }
          .role-badge {
            display: inline-block;
            background: linear-gradient(135deg, #10b981, #059669);
            color: white;
            padding: 8px 16px;
            border-radius: 20px;
            font-size: 14px;
            font-weight: 500;
            text-transform: uppercase;
            letter-spacing: 0.5px;
          }
          .cta-button {
            display: inline-block;
            background: linear-gradient(135deg, #3b82f6, #1d4ed8);
            color: white;
            text-decoration: none;
            padding: 16px 32px;
            border-radius: 12px;
            font-weight: 600;
            font-size: 16px;
            text-align: center;
            margin: 30px 0;
            transition: all 0.3s ease;
            box-shadow: 0 4px 15px rgba(59, 130, 246, 0.3);
          }
          .cta-button:hover {
            transform: translateY(-2px);
            box-shadow: 0 6px 20px rgba(59, 130, 246, 0.4);
          }
          .footer {
            text-align: center;
            margin-top: 40px;
            padding-top: 30px;
            border-top: 1px solid rgba(255, 255, 255, 0.1);
            color: rgba(255, 255, 255, 0.6);
            font-size: 14px;
          }
          .security-note {
            background: rgba(239, 68, 68, 0.1);
            border: 1px solid rgba(239, 68, 68, 0.3);
            border-radius: 8px;
            padding: 15px;
            margin-top: 20px;
            font-size: 14px;
            color: rgba(255, 255, 255, 0.8);
          }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <div class="logo">Prism</div>
          </div>
          
          <div class="card">
            <div class="title">Vous êtes invité ! 🎉</div>
            <div class="description">
              ${inviterName} vous a invité à rejoindre son équipe sur Prism, la plateforme moderne de pages de statut.
            </div>
            
            <div class="team-info">
              <div class="team-name">${teamName}</div>
              <div class="role-badge">${role}</div>
            </div>
            
            <div style="text-align: center;">
              <a href="${inviteUrl}" class="cta-button">
                Accepter l'invitation
              </a>
            </div>
            
            <div class="security-note">
              <strong>🔒 Note de sécurité :</strong> Ce lien d'invitation vous est unique et expirera dans 7 jours. 
              Si vous n'attendiez pas cette invitation, veuillez ignorer cet email.
            </div>
          </div>
          
          <div class="footer">
            <p>Cette invitation a été envoyée depuis la plateforme Prism Status Page</p>
            <p>Si vous avez des questions, veuillez contacter votre administrateur d'équipe</p>
          </div>
        </div>
      </body>
      </html>
    `,
    generateText: (inviterName: string, teamName: string, inviteUrl: string, role: string) => `
Vous avez été invité à rejoindre une équipe sur Prism !

${inviterName} vous a invité à rejoindre l'équipe "${teamName}" en tant que ${role.toLowerCase()}.

Équipe : ${teamName}
Rôle : ${role}
Lien d'invitation : ${inviteUrl}

Pour accepter cette invitation, cliquez sur le lien ci-dessus ou copiez-le dans votre navigateur.

Cette invitation expirera dans 7 jours.

Note de sécurité : Ce lien d'invitation vous est unique. Si vous n'attendiez pas cette invitation, veuillez ignorer cet email.

---
Plateforme Prism Status Page
    `
  }
};

export const generateTeamInviteEmail = (
  language: string,
  inviterName: string,
  teamName: string,
  inviteUrl: string,
  role: string
) => {
  const template = teamInviteEmailTemplates[language as keyof typeof teamInviteEmailTemplates] || teamInviteEmailTemplates.en;

  return {
    subject: template.subject,
    html: template.generateHTML(inviterName, teamName, inviteUrl, role),
    text: template.generateText(inviterName, teamName, inviteUrl, role),
  };
}; 