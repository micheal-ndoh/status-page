// Email templates with internationalization support
export const emailTemplates = {
  en: {
    subject: "Sign in to Prism - Your Status Page Dashboard",
    welcome: "Welcome to Prism! ✨",
    description: "You're just one click away from accessing your status page dashboard. Click the button below to securely sign in to your account.",
    signInButton: "🚀 Sign in to Dashboard",
    featuresTitle: "What you can do with Prism:",
    features: [
      "Monitor your services and uptime in real-time",
      "Create and manage incidents with your team",
      "Update status pages with beautiful design",
      "View detailed analytics and performance reports",
      "Get instant alerts across all your channels",
      "Integrate with your existing tools and workflows"
    ],
    securityNote: "🔒 This link will expire in 24 hours for security reasons.",
    ignoreNote: "If you didn't request this email, you can safely ignore it.",
    footer: "This is an automated message from your Prism Status Page application.",
    support: "Need help? Contact our support team at support@prism.com"
  },
  fr: {
    subject: "Connexion à Prism - Votre tableau de bord de page de statut",
    welcome: "Bienvenue chez Prism ! ✨",
    description: "Vous n'êtes qu'à un clic de votre tableau de bord de page de statut. Cliquez sur le bouton ci-dessous pour vous connecter en toute sécurité à votre compte.",
    signInButton: "🚀 Se connecter au tableau de bord",
    featuresTitle: "Ce que vous pouvez faire avec Prism :",
    features: [
      "Surveillez vos services et votre temps de fonctionnement en temps réel",
      "Créez et gérez des incidents avec votre équipe",
      "Mettez à jour les pages de statut avec un design magnifique",
      "Consultez des analyses détaillées et des rapports de performance",
      "Recevez des alertes instantanées sur tous vos canaux",
      "Intégrez avec vos outils et flux de travail existants"
    ],
    securityNote: "🔒 Ce lien expirera dans 24 heures pour des raisons de sécurité.",
    ignoreNote: "Si vous n'avez pas demandé cet email, vous pouvez l'ignorer en toute sécurité.",
    footer: "Ceci est un message automatisé de votre application Prism Status Page.",
    support: "Besoin d'aide ? Contactez notre équipe de support à support@prism.com"
  },
  de: {
    subject: "Anmeldung bei Prism - Ihr Statusseiten-Dashboard",
    welcome: "Willkommen bei Prism! ✨",
    description: "Sie sind nur einen Klick von Ihrem Statusseiten-Dashboard entfernt. Klicken Sie auf die Schaltfläche unten, um sich sicher bei Ihrem Konto anzumelden.",
    signInButton: "🚀 Zum Dashboard anmelden",
    featuresTitle: "Was Sie mit Prism machen können:",
    features: [
      "Überwachen Sie Ihre Services und Betriebszeit in Echtzeit",
      "Erstellen und verwalten Sie Vorfälle mit Ihrem Team",
      "Aktualisieren Sie Statusseiten mit schönem Design",
      "Betrachten Sie detaillierte Analysen und Leistungsberichte",
      "Erhalten Sie sofortige Warnungen auf allen Ihren Kanälen",
      "Integrieren Sie sich mit Ihren bestehenden Tools und Workflows"
    ],
    securityNote: "🔒 Dieser Link läuft aus Sicherheitsgründen in 24 Stunden ab.",
    ignoreNote: "Wenn Sie diese E-Mail nicht angefordert haben, können Sie sie sicher ignorieren.",
    footer: "Dies ist eine automatisierte Nachricht von Ihrer Prism Status Page-Anwendung.",
    support: "Brauchen Sie Hilfe? Kontaktieren Sie unser Support-Team unter support@prism.com"
  },
  zh: {
    subject: "登录Prism - 您的状态页面仪表板",
    welcome: "欢迎使用Prism！✨",
    description: "您距离访问状态页面仪表板只有一步之遥。点击下面的按钮安全登录您的账户。",
    signInButton: "🚀 登录仪表板",
    featuresTitle: "您可以使用Prism做什么：",
    features: [
      "实时监控您的服务和运行时间",
      "与团队创建和管理事件",
      "使用精美设计更新状态页面",
      "查看详细分析和性能报告",
      "在所有渠道获得即时警报",
      "与现有工具和工作流程集成"
    ],
    securityNote: "🔒 此链接将在24小时后过期以确保安全。",
    ignoreNote: "如果您没有请求此邮件，可以安全地忽略它。",
    footer: "这是来自您的Prism状态页面应用程序的自动消息。",
    support: "需要帮助？请联系我们的支持团队：support@prism.com"
  },
  es: {
    subject: "Iniciar sesión en Prism - Tu panel de control de página de estado",
    welcome: "¡Bienvenido a Prism! ✨",
    description: "Estás a solo un clic de acceder a tu panel de control de página de estado. Haz clic en el botón de abajo para iniciar sesión de forma segura en tu cuenta.",
    signInButton: "🚀 Iniciar sesión en el panel",
    featuresTitle: "Lo que puedes hacer con Prism:",
    features: [
      "Monitorea tus servicios y tiempo de actividad en tiempo real",
      "Crea y gestiona incidentes con tu equipo",
      "Actualiza páginas de estado con diseño hermoso",
      "Ve análisis detallados y reportes de rendimiento",
      "Recibe alertas instantáneas en todos tus canales",
      "Integra con tus herramientas y flujos de trabajo existentes"
    ],
    securityNote: "🔒 Este enlace expirará en 24 horas por razones de seguridad.",
    ignoreNote: "Si no solicitaste este correo electrónico, puedes ignorarlo de forma segura.",
    footer: "Este es un mensaje automatizado de tu aplicación Prism Status Page.",
    support: "¿Necesitas ayuda? Contacta a nuestro equipo de soporte en support@prism.com"
  }
};

export const generateEmailHTML = (url: string, language: string = 'en') => {
  const template = emailTemplates[language as keyof typeof emailTemplates] || emailTemplates.en;
  
  const featuresList = template.features.map(feature => `<li>${feature}</li>`).join('');

  return `
    <!DOCTYPE html>
    <html>
    <head>
        <meta charset="utf-8">
        <title>Sign in to Prism</title>
    </head>
    <body style="margin: 0; padding: 20px; background-color: #f5f5f5; font-family: Arial, sans-serif;">
        <table width="100%" cellpadding="0" cellspacing="0">
            <tr>
                <td align="center">
                    <table width="600" cellpadding="0" cellspacing="0" style="background-color: #ffffff; border-radius: 8px; box-shadow: 0 2px 10px rgba(0,0,0,0.1);">
                        <!-- Header -->
                        <tr>
                            <td style="background-color: #1a1a2e; padding: 30px; text-align: center;">
                                <h1 style="color: #ffffff; margin: 0; font-size: 28px; font-weight: bold;">PRISM</h1>
                                <p style="color: #add8e6; margin: 5px 0 0; font-size: 16px;">Status Page Dashboard</p>
                            </td>
                        </tr>
                        
                        <!-- Content -->
                        <tr>
                            <td style="padding: 30px;">
                                <h2 style="color: #333333; margin: 0 0 20px; font-size: 24px;">${template.welcome}</h2>
                                
                                <p style="color: #666666; font-size: 16px; line-height: 1.5; margin: 0 0 25px;">
                                    ${template.description}
                                </p>
                                
                                <table width="100%" cellpadding="0" cellspacing="0" style="margin: 25px 0;">
                                    <tr>
                                        <td align="center">
                                            <a href="${url}" style="display: inline-block; background-color: #add8e6; color: #1a1a2e; padding: 15px 30px; text-decoration: none; border-radius: 5px; font-weight: bold; font-size: 16px;">
                                                ${template.signInButton}
                                            </a>
                                        </td>
                                    </tr>
                                </table>
                                
                                <table width="100%" cellpadding="0" cellspacing="0" style="margin: 25px 0;">
                                    <tr>
                                        <td style="background-color: #f8f9fa; border-left: 4px solid #add8e6; padding: 20px;">
                                            <h3 style="color: #333333; margin: 0 0 15px; font-size: 18px;">${template.featuresTitle}</h3>
                                            <ul style="color: #666666; margin: 0; padding-left: 20px; line-height: 1.6;">
                                                ${featuresList}
                                            </ul>
                                        </td>
                                    </tr>
                                </table>
                                
                                <p style="color: #999999; font-size: 14px; line-height: 1.4; margin: 25px 0 0; text-align: center;">
                                    ${template.securityNote}<br>
                                    ${template.ignoreNote}
                                </p>
                            </td>
                        </tr>
                        
                        <!-- Footer -->
                        <tr>
                            <td style="background-color: #f8f9fa; padding: 20px; text-align: center; border-top: 1px solid #e9ecef;">
                                <p style="color: #999999; font-size: 13px; margin: 0;">
                                    ${template.footer}<br>
                                    ${template.support}
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

export const generateEmailText = (url: string, language: string = 'en') => {
  const template = emailTemplates[language as keyof typeof emailTemplates] || emailTemplates.en;
  
  return `${template.welcome}

${template.description}

${template.signInButton}: ${url}

${template.featuresTitle}
${template.features.map(feature => `- ${feature}`).join('\n')}

${template.securityNote}
${template.ignoreNote}

---
${template.footer}
${template.support}`;
}; 