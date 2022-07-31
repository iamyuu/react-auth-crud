export function fileTobase64(file: File | null): Promise<string | null> {
	return new Promise((resolve, reject) => {
		if (!file) {
			return null;
		}

		const reader = new FileReader();
		reader.readAsDataURL(file);
		reader.onerror = reject;
		reader.onload = () => {
			if (typeof reader.result === 'string') {
				return resolve(reader.result);
			}

			return null;
		};
	});
}
