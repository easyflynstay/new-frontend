/** Keep in sync with backend `password_policy.py` (`_SPECIAL` character set). */

export const PASSWORD_MIN_LEN = 12;
export const PASSWORD_MAX_LEN = 128;

/** Allowed ASCII special characters (exactly the set accepted by the API). */
const SPECIAL_CHARS = new Set(
  "!@#$%^&*()_+-=[]{}|;:,.<>?/`~".split("")
);

function isSpecialChar(ch: string): boolean {
  return ch.length === 1 && SPECIAL_CHARS.has(ch);
}

export function hasConsecutiveSpecialCharacters(password: string): boolean {
  for (let i = 0; i < password.length - 1; i++) {
    if (isSpecialChar(password[i]) && isSpecialChar(password[i + 1])) return true;
  }
  return false;
}

export type PasswordRule = { key: string; label: string; met: boolean };

export function getPasswordRules(password: string): PasswordRule[] {
  const hasSpecial = [...password].some((c) => isSpecialChar(c));

  return [
    {
      key: "len",
      label: `${PASSWORD_MIN_LEN}–${PASSWORD_MAX_LEN} characters`,
      met: password.length >= PASSWORD_MIN_LEN && password.length <= PASSWORD_MAX_LEN,
    },
    {
      key: "lower",
      label: "One lowercase letter",
      met: /[a-z]/.test(password),
    },
    {
      key: "upper",
      label: "One uppercase letter",
      met: /[A-Z]/.test(password),
    },
    {
      key: "digit",
      label: "One number",
      met: /\d/.test(password),
    },
    {
      key: "special",
      label: "One special character (! @ # …)",
      met: hasSpecial,
    },
    {
      key: "no_space",
      label: "No spaces",
      met: !/\s/.test(password),
    },
    {
      key: "no_adj_special",
      label: "No consecutive special characters",
      met: password.length === 0 || !hasConsecutiveSpecialCharacters(password),
    },
  ];
}

export function isPasswordStrong(password: string): boolean {
  return getPasswordRules(password).every((r) => r.met);
}
