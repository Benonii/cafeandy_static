import { useEffect, useRef, useState } from "react";

export const useAnimatedCounter = (
	target: number,
	minValue: number = 10000,
	duration: number = 20000,
) => {
	const [count, setCount] = useState(minValue);
	const frameRef = useRef<number>(0);

	useEffect(() => {
		const startTime = performance.now();
		const startValue = minValue;

		const animate = (currentTime: number) => {
			const elapsed = currentTime - startTime;
			const progress = Math.min(elapsed / duration, 1);
			// Linear — constant, slow rise across the full duration
			const eased = progress;
			const current = Math.round(startValue + (target - startValue) * eased);
			setCount(current);

			if (progress < 1) {
				frameRef.current = requestAnimationFrame(animate);
			}
		};

		frameRef.current = requestAnimationFrame(animate);
		return () => cancelAnimationFrame(frameRef.current);
	}, [target, duration, minValue]);

	return count;
};
