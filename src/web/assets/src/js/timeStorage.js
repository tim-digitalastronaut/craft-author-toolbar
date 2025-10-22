export const timeStorage = (duration) => ({
	getItem(key) {
		const stored = localStorage.getItem(key);
		if (!stored) return null;

		try {
			const { value, expiry } = JSON.parse(stored);

			if (Date.now() > expiry) {
				localStorage.removeItem(key);
				return null;
			}

			return value;
		} catch (e) {
			console.error(error);
			return null;
		}
	},

	setItem(key, value) {
		const stored = localStorage.getItem(key);
		let expiry;

		if (stored) {
			try {
				const parsed = JSON.parse(stored);
				if (parsed.expiry && Date.now() <= parsed.expiry) {
					expiry = parsed.expiry;
				}
			} catch (error) {
				console.error(error);
			}
		}

		if (!expiry) expiry = Date.now() + duration;

		localStorage.setItem(key, JSON.stringify({ value, expiry }));
	},
});
