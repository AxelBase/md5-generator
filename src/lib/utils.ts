export function getByteLength(text: string): number {
	return new TextEncoder().encode(text).length;
}

export async function copyToClipboard(text: string): Promise<void> {
	await navigator.clipboard.writeText(text);
}