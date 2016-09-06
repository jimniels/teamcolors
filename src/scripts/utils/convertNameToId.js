/**
 * Convert Name to ID
 * Take a string (usually a team name) with spaces and mixed casing,
 * convert it to a lowercased, hyphen-separated string representing an ID
 *
 * @param {string} name
 * @returns {string} id
 */
export default function convertNameToId(name) {
  return name.replace(/\s+/g, '-').toLowerCase()
}
