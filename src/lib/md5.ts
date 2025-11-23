import SparkMD5 from 'spark-md5';

export async function computeMD5(input: string | File): Promise<{ hex: string; base64: string; time: number }> {
	const start = performance.now();
	const spark = new SparkMD5.ArrayBuffer();

	if (typeof input === 'string') {
		const encoder = new TextEncoder();
		const data = encoder.encode(input);
		spark.append(data);
	} else {
		// Chunked reading for files
		const fileSize = input.size;
		const chunkSize = 2 * 1024 * 1024; // 2MB chunks
		let offset = 0;
		while (offset < fileSize) {
			const slice = input.slice(offset, offset + chunkSize);
			const buffer = await slice.arrayBuffer();
			spark.append(buffer);
			offset += chunkSize;
		}
	}

	const binary = spark.end(true); // Raw binary string
	const hex = spark.end(); // Hex string (lowercase)
	const base64 = btoa(binary); // Base64 with padding (RFC 4648 §4)

	const time = performance.now() - start;

	return { hex, base64, time };
}