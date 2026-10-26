/**
 * Country dialling codes for the Contact Sales phone field.
 *
 * `example` is a representative national number (no dialling code) used as the
 * input placeholder, so the expected digit count changes with the selection.
 */

export type Country = {
  /** ISO 3166-1 alpha-2 code, unique per row and used as the React key. */
  iso: string;
  name: string;
  dial: string;
  example: string;
  /**
   * Accepted national number lengths. Omitted when the number is always the
   * same length as `example`, which covers most countries.
   */
  min?: number;
  max?: number;
};

/** Accepted digit-length range for a country's national number. */
export function digitRange(country: Country): { min: number; max: number } {
  const fallback = country.example.length;
  return {
    min: country.min ?? fallback,
    max: country.max ?? country.min ?? fallback,
  };
}

/**
 * Validate a national phone number for a country.
 *
 * Returns an error message, or null when the number is acceptable. An empty
 * value is acceptable because the phone field is optional.
 */
export function validatePhone(
  digits: string,
  country: Country,
): string | null {
  if (digits.length === 0) return null;

  const { min, max } = digitRange(country);

  if (digits.length < min || digits.length > max) {
    const expected = min === max ? `${min} digits` : `${min} to ${max} digits`;
    return `${country.name} numbers are ${expected}. You entered ${digits.length}.`;
  }

  return null;
}

export const COUNTRIES: Country[] = [
  { iso: "AF", name: "Afghanistan", dial: "+93", example: "701234567" },
  { iso: "AL", name: "Albania", dial: "+355", example: "672123456" },
  { iso: "DZ", name: "Algeria", dial: "+213", example: "551234567" },
  { iso: "AR", name: "Argentina", dial: "+54", example: "1123456789", min: 10, max: 11 },
  { iso: "AM", name: "Armenia", dial: "+374", example: "77123456" },
  { iso: "AU", name: "Australia", dial: "+61", example: "412345678" },
  { iso: "AT", name: "Austria", dial: "+43", example: "6641234567", min: 10, max: 13 },
  { iso: "AZ", name: "Azerbaijan", dial: "+994", example: "401234567" },
  { iso: "BH", name: "Bahrain", dial: "+973", example: "36001234" },
  { iso: "BD", name: "Bangladesh", dial: "+880", example: "1812345678" },
  { iso: "BY", name: "Belarus", dial: "+375", example: "294911911" },
  { iso: "BE", name: "Belgium", dial: "+32", example: "470123456" },
  { iso: "BO", name: "Bolivia", dial: "+591", example: "71234567" },
  { iso: "BA", name: "Bosnia and Herzegovina", dial: "+387", example: "61123456" },
  { iso: "BW", name: "Botswana", dial: "+267", example: "71123456" },
  { iso: "BR", name: "Brazil", dial: "+55", example: "11961234567", min: 10, max: 11 },
  { iso: "BG", name: "Bulgaria", dial: "+359", example: "48123456" },
  { iso: "KH", name: "Cambodia", dial: "+855", example: "91234567" },
  { iso: "CM", name: "Cameroon", dial: "+237", example: "671234567" },
  { iso: "CA", name: "Canada", dial: "+1", example: "4165550123" },
  { iso: "CL", name: "Chile", dial: "+56", example: "221234567" },
  { iso: "CN", name: "China", dial: "+86", example: "13123456789" },
  { iso: "CO", name: "Colombia", dial: "+57", example: "3211234567" },
  { iso: "CR", name: "Costa Rica", dial: "+506", example: "83123456" },
  { iso: "HR", name: "Croatia", dial: "+385", example: "921234567" },
  { iso: "CY", name: "Cyprus", dial: "+357", example: "96123456" },
  { iso: "CZ", name: "Czechia", dial: "+420", example: "601123456" },
  { iso: "DK", name: "Denmark", dial: "+45", example: "32123456" },
  { iso: "DO", name: "Dominican Republic", dial: "+1", example: "8092345678" },
  { iso: "EC", name: "Ecuador", dial: "+593", example: "991234567" },
  { iso: "EG", name: "Egypt", dial: "+20", example: "1001234567" },
  { iso: "SV", name: "El Salvador", dial: "+503", example: "70123456" },
  { iso: "EE", name: "Estonia", dial: "+372", example: "51234567" },
  { iso: "ET", name: "Ethiopia", dial: "+251", example: "911234567" },
  { iso: "FI", name: "Finland", dial: "+358", example: "412345678", min: 9, max: 10 },
  { iso: "FR", name: "France", dial: "+33", example: "612345678" },
  { iso: "GE", name: "Georgia", dial: "+995", example: "555123456" },
  { iso: "DE", name: "Germany", dial: "+49", example: "15123456789", min: 10, max: 11 },
  { iso: "GH", name: "Ghana", dial: "+233", example: "231234567" },
  { iso: "GR", name: "Greece", dial: "+30", example: "6912345678" },
  { iso: "GT", name: "Guatemala", dial: "+502", example: "51234567" },
  { iso: "HK", name: "Hong Kong", dial: "+852", example: "51234567" },
  { iso: "HU", name: "Hungary", dial: "+36", example: "201234567" },
  { iso: "IS", name: "Iceland", dial: "+354", example: "6111234" },
  { iso: "IN", name: "India", dial: "+91", example: "9876543210" },
  { iso: "ID", name: "Indonesia", dial: "+62", example: "81234567890", min: 9, max: 12 },
  { iso: "IQ", name: "Iraq", dial: "+964", example: "7912345678" },
  { iso: "IE", name: "Ireland", dial: "+353", example: "850123456" },
  { iso: "IL", name: "Israel", dial: "+972", example: "502345678" },
  { iso: "IT", name: "Italy", dial: "+39", example: "3123456789", min: 9, max: 10 },
  { iso: "JM", name: "Jamaica", dial: "+1", example: "8762101234" },
  { iso: "JP", name: "Japan", dial: "+81", example: "9012345678" },
  { iso: "JO", name: "Jordan", dial: "+962", example: "790123456" },
  { iso: "KZ", name: "Kazakhstan", dial: "+7", example: "7710009998" },
  { iso: "KE", name: "Kenya", dial: "+254", example: "712123456" },
  { iso: "KW", name: "Kuwait", dial: "+965", example: "50012345" },
  { iso: "LV", name: "Latvia", dial: "+371", example: "21234567" },
  { iso: "LB", name: "Lebanon", dial: "+961", example: "71123456", min: 7, max: 8 },
  { iso: "LT", name: "Lithuania", dial: "+370", example: "61234567" },
  { iso: "LU", name: "Luxembourg", dial: "+352", example: "628123456" },
  { iso: "MY", name: "Malaysia", dial: "+60", example: "123456789", min: 9, max: 10 },
  { iso: "MT", name: "Malta", dial: "+356", example: "96961234" },
  { iso: "MU", name: "Mauritius", dial: "+230", example: "52512345" },
  { iso: "MX", name: "Mexico", dial: "+52", example: "2221234567" },
  { iso: "MD", name: "Moldova", dial: "+373", example: "62112345" },
  { iso: "MA", name: "Morocco", dial: "+212", example: "650123456" },
  { iso: "MM", name: "Myanmar", dial: "+95", example: "92123456" },
  { iso: "NP", name: "Nepal", dial: "+977", example: "9841234567" },
  { iso: "NL", name: "Netherlands", dial: "+31", example: "612345678" },
  { iso: "NZ", name: "New Zealand", dial: "+64", example: "211234567", min: 8, max: 10 },
  { iso: "NG", name: "Nigeria", dial: "+234", example: "8021234567" },
  { iso: "NO", name: "Norway", dial: "+47", example: "40612345" },
  { iso: "OM", name: "Oman", dial: "+968", example: "92123456" },
  { iso: "PK", name: "Pakistan", dial: "+92", example: "3012345678" },
  { iso: "PA", name: "Panama", dial: "+507", example: "61234567" },
  { iso: "PY", name: "Paraguay", dial: "+595", example: "961456789" },
  { iso: "PE", name: "Peru", dial: "+51", example: "912345678" },
  { iso: "PH", name: "Philippines", dial: "+63", example: "9051234567" },
  { iso: "PL", name: "Poland", dial: "+48", example: "512345678" },
  { iso: "PT", name: "Portugal", dial: "+351", example: "912345678" },
  { iso: "QA", name: "Qatar", dial: "+974", example: "33123456" },
  { iso: "RO", name: "Romania", dial: "+40", example: "712034567" },
  { iso: "RU", name: "Russia", dial: "+7", example: "9123456789" },
  { iso: "SA", name: "Saudi Arabia", dial: "+966", example: "512345678" },
  { iso: "RS", name: "Serbia", dial: "+381", example: "601234567" },
  { iso: "SG", name: "Singapore", dial: "+65", example: "81234567" },
  { iso: "SK", name: "Slovakia", dial: "+421", example: "912123456" },
  { iso: "SI", name: "Slovenia", dial: "+386", example: "31234567" },
  { iso: "ZA", name: "South Africa", dial: "+27", example: "711234567" },
  { iso: "KR", name: "South Korea", dial: "+82", example: "1020000000", min: 9, max: 10 },
  { iso: "ES", name: "Spain", dial: "+34", example: "612345678" },
  { iso: "LK", name: "Sri Lanka", dial: "+94", example: "712345678" },
  { iso: "SE", name: "Sweden", dial: "+46", example: "701234567", min: 7, max: 9 },
  { iso: "CH", name: "Switzerland", dial: "+41", example: "781234567" },
  { iso: "TW", name: "Taiwan", dial: "+886", example: "912345678" },
  { iso: "TZ", name: "Tanzania", dial: "+255", example: "621234567" },
  { iso: "TH", name: "Thailand", dial: "+66", example: "812345678" },
  { iso: "TN", name: "Tunisia", dial: "+216", example: "20123456" },
  { iso: "TR", name: "Turkey", dial: "+90", example: "5012345678" },
  { iso: "UG", name: "Uganda", dial: "+256", example: "712345678" },
  { iso: "UA", name: "Ukraine", dial: "+380", example: "501234567" },
  { iso: "AE", name: "United Arab Emirates", dial: "+971", example: "501234567" },
  { iso: "GB", name: "United Kingdom", dial: "+44", example: "7400123456" },
  { iso: "US", name: "United States", dial: "+1", example: "2015550123" },
  { iso: "UY", name: "Uruguay", dial: "+598", example: "94231234" },
  { iso: "UZ", name: "Uzbekistan", dial: "+998", example: "911234567" },
  { iso: "VE", name: "Venezuela", dial: "+58", example: "4121234567" },
  { iso: "VN", name: "Vietnam", dial: "+84", example: "912345678", min: 9, max: 10 },
  { iso: "ZM", name: "Zambia", dial: "+260", example: "955123456" },
  { iso: "ZW", name: "Zimbabwe", dial: "+263", example: "712345678" },
];

export const DEFAULT_COUNTRY =
  COUNTRIES.find((country) => country.iso === "US") ?? COUNTRIES[0];

/**
 * Filter countries by name or dialling code. A leading "+" is ignored so both
 * "44" and "+44" match the United Kingdom.
 */
export function searchCountries(query: string): Country[] {
  const term = query.trim().toLowerCase().replace(/^\+/, "");
  if (!term) return COUNTRIES;

  return COUNTRIES.filter(
    (country) =>
      country.name.toLowerCase().includes(term) ||
      country.dial.replace("+", "").startsWith(term) ||
      country.iso.toLowerCase() === term,
  );
}
