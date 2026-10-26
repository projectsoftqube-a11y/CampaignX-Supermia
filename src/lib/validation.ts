/**
 * Field validation for the Contact Sales form.
 *
 * Each rule returns an error message, or null when the value is acceptable.
 * The server validates too; these exist to correct mistakes before a round
 * trip and to say precisely what is wrong.
 */

/**
 * Practical email check.
 *
 * Deliberately not RFC 5322: that grammar accepts addresses no provider
 * issues, while rejecting nothing users actually mistype. This catches the
 * real mistakes (missing @, missing dot, trailing punctuation, spaces).
 */
const EMAIL_PATTERN = /^[^\s@]+@[^\s@.]+(\.[^\s@.]+)+$/;

/** Letters, spaces, apostrophes and hyphens cover names across locales. */
const NAME_PATTERN = /^[\p{L}\p{M}'’\-. ]+$/u;

export function validateName(value: string, label: string): string | null {
  const trimmed = value.trim();

  if (trimmed.length === 0) return `${label} is required.`;
  if (trimmed.length < 2) return `${label} must be at least 2 characters.`;
  if (trimmed.length > 100) return `${label} must be 100 characters or fewer.`;
  if (!NAME_PATTERN.test(trimmed)) {
    return `${label} can only contain letters, spaces, hyphens and apostrophes.`;
  }

  return null;
}

export function validateEmail(value: string): string | null {
  const trimmed = value.trim();

  if (trimmed.length === 0) return "Work email is required.";
  if (trimmed.length > 254) return "Email must be 254 characters or fewer.";
  if (!EMAIL_PATTERN.test(trimmed)) {
    return "Enter a valid email address, for example jane@company.com.";
  }

  return null;
}

export function validateCompany(value: string): string | null {
  const trimmed = value.trim();

  if (trimmed.length === 0) return "Company name is required.";
  if (trimmed.length < 2) return "Company name must be at least 2 characters.";
  if (trimmed.length > 255) {
    return "Company name must be 255 characters or fewer.";
  }

  return null;
}

export function validateMessage(value: string): string | null {
  if (value.trim().length > 2000) {
    return "Message must be 2000 characters or fewer.";
  }

  return null;
}
