document.addEventListener('DOMContentLoaded', () => {
	const zoomToPath = (pathId, duration = 500, offsetX = 0, offsetY = 0, padding = 10) => {
		const svg = document.getElementById('allSvg');
		const path = document.getElementById(pathId);

		if (!svg || !path) return;

		const startViewBox = svg.getAttribute('viewBox').split(' ').map(Number);
		const targetBBox = path.getBBox();

		// const padding = 10;
		const endViewBox = [
			targetBBox.x - padding + offsetX,
			targetBBox.y - padding + offsetY,
			targetBBox.width + padding * 2,
			targetBBox.height + padding * 2
		];

		const startTime = performance.now();

		const animate = (currentTime) => {
			const elapsed = currentTime - startTime;
			const progress = Math.min(elapsed / duration, 1);

			const interpolated = startViewBox.map((start, i) =>
				start + (endViewBox[i] - start) * progress
				);

			svg.setAttribute('viewBox', interpolated.join(' '));

			if (progress < 1) {
				requestAnimationFrame(animate);
			}
		};

		requestAnimationFrame(animate);
	};
	setTimeout(() => {
		zoomToPath('Morocco');
		// zoomToPath('Portugal');
		// zoomToPath('United States');
		// zoomToPath('Egypt');
		return;
	}, 1000);
	return;
});
document.addEventListener('animationstart', () => {
	if (event.animationName == 'openC') {
		setTimeout(() => {
			const svg = document.getElementById('allSvg');
			svg.remove();
			return;
		}, 2200);
	}
});