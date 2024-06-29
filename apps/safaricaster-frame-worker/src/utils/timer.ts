export const startTimer = (tag: string) => {
	const startTime = performance.now();
	return {
		endTimer: () => {
			console.error(tag, { timer: performance.now() - startTime });
		},
	};
};
