# Internationalization (i18n) Setup

This directory contains all the internationalization files for the Prism Status Page application.

## Files

- `en.json` - English translations (complete)
- `index.ts` - Utility functions and type definitions

## Structure

The translation keys are organized hierarchically by feature:

### Common
- Basic UI elements (buttons, labels, etc.)
- Form fields and validation messages
- Status indicators and notifications

### Navigation
- Menu items and navigation labels
- User interface navigation elements

### Homepage
- Hero section content
- Feature descriptions and titles

### Authentication
- Sign in/out pages
- Email verification
- Form labels and messages

### Dashboard
- Dashboard overview and statistics
- Activity feed and notifications

### Services
- Service management interface
- CRUD operations and form validation

### Incidents
- Incident management interface
- Status updates and severity levels

### Status Page
- Public status page content
- System status indicators

### Game
- Status monitoring game interface
- Instructions and gameplay elements

### Pricing
- Pricing plans and features
- Billing information

### Customers
- Customer testimonials and social proof
- Call-to-action sections

### Integrations
- Integration showcase
- Third-party service descriptions

### Product
- Product features and benefits
- Demo and showcase content

### Errors
- Error pages and messages
- 404, 500, and other error states

### Validation
- Form validation messages
- Input error handling

### Notifications
- Success, error, and info messages
- Toast notifications

## Usage

### Basic Translation
```typescript
import { t } from '@/i18n';

// Simple translation
const message = t('common.loading'); // "Loading..."

// With parameters
const message = t('game.incidentDescription', 'en', { status: 'degraded' });
// "is experiencing degraded performance."
```

### Type Safety
The `TranslationKey` type provides autocomplete and type checking for all available translation keys.

### Adding New Languages
1. Create a new JSON file (e.g., `fr.json`, `es.json`)
2. Copy the structure from `en.json`
3. Translate all values
4. Update `index.ts` to include the new locale
5. Add the locale to the `locales` array and `translations` object

## Next Steps for Tolgee Integration

1. **Install Tolgee SDK**:
   ```bash
   npm install @tolgee/react
   ```

2. **Configure Tolgee Provider** in your app layout
3. **Replace hardcoded strings** with translation keys
4. **Set up Tolgee project** and sync translations
5. **Add language switcher** component

## Translation Key Naming Convention

- Use lowercase with dots for hierarchy
- Group related keys together
- Use descriptive names that indicate the context
- Keep keys short but meaningful

Example: `auth.signin.emailPlaceholder` for the email input placeholder in the sign-in form.

## Maintenance

- Keep translation keys organized and consistent
- Add new keys as features are developed
- Remove unused keys during cleanup
- Document any special formatting or parameters needed 