/**
 * Converts a string to Hyphenish format
 * @param str - The input string to convert
 * @returns The Hyphenish encoded string
 */
export function stringToHyphenish(str: string): string {
	return str
		.split('')
		.map((char) =>
			char.charCodeAt(0).toString(2).padStart(8, '0').replace(/1/g, '-').replace(/0/g, '—')
		)
		.join(' ');
}

/**
 * Converts a Hyphenish string back to regular text
 * @param binStr - The Hyphenish encoded string
 * @returns The decoded string
 */
export function hyphenishToString(binStr: string): string {
	return binStr
		.split(' ')
		.map((byte) => String.fromCharCode(parseInt(byte.replace(/-/g, '1').replace(/—/g, '0'), 2)))
		.join('');
}
