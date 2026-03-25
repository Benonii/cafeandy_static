import { useId } from "react";

interface CoffeeCupProps {
	fillPercentage: number;
}

export const CoffeeCup = ({ fillPercentage }: CoffeeCupProps) => {
	const fill = Math.max(0, Math.min(100, fillPercentage));
	const cupClipId = useId();
	const coffeeGradId = useId();
	const foamGradId = useId();

	// Cup interior spans from y=68 (just below rim) to y=208 (above base), ~140 units tall
	const interiorHeight = 140;
	const liquidTop = 208 - (fill / 100) * interiorHeight;

	return (
		<div className="flex justify-center">
			<div
				className="relative w-72 sm:w-96 lg:w-[480px]"
				style={{ aspectRatio: "240 / 270" }}
			>
				<svg
					viewBox="0 0 240 270"
					className="w-full h-full"
					xmlns="http://www.w3.org/2000/svg"
					aria-hidden="true"
				>
					<defs>
						<clipPath id={cupClipId}>
							<path d="M52,68 L168,68 L158,206 Q156,214 148,216 L72,216 Q64,214 62,206 Z" />
						</clipPath>

						<linearGradient id={coffeeGradId} x1="0" y1="0" x2="0" y2="1">
							<stop offset="0%" stopColor="hsl(22 69% 86%)" stopOpacity="0.5" />
							<stop
								offset="20%"
								stopColor="hsl(26 75% 72%)"
								stopOpacity="0.8"
							/>
							<stop offset="100%" stopColor="hsl(28 42% 35%)" />
						</linearGradient>

						<linearGradient id={foamGradId} x1="0" y1="0" x2="0" y2="1">
							<stop offset="0%" stopColor="hsl(20 64% 95%)" />
							<stop
								offset="100%"
								stopColor="hsl(22 69% 86%)"
								stopOpacity="0.5"
							/>
						</linearGradient>
					</defs>

					{/* Saucer */}
					<ellipse
						cx="110"
						cy="242"
						rx="95"
						ry="14"
						fill="hsl(22 69% 86%)"
						opacity="0.5"
					/>
					<ellipse
						cx="110"
						cy="238"
						rx="90"
						ry="11"
						fill="hsl(20 64% 95%)"
						opacity="0.7"
					/>
					<ellipse
						cx="110"
						cy="236"
						rx="85"
						ry="9"
						fill="hsl(22 69% 86%)"
						opacity="0.35"
					/>

					{/* Cup body */}
					<path
						d="M45,60 L175,60 L162,212 Q160,222 148,224 L72,224 Q60,222 58,212 Z"
						fill="hsl(20 64% 95%)"
						stroke="hsl(26 75% 72% / 0.5)"
						strokeWidth="1.5"
					/>

					{/* Cup rim */}
					<ellipse
						cx="110"
						cy="60"
						rx="65"
						ry="10"
						fill="hsl(20 64% 95%)"
						stroke="hsl(26 75% 72% / 0.5)"
						strokeWidth="1"
					/>
					<ellipse
						cx="110"
						cy="60"
						rx="60"
						ry="8"
						fill="hsl(22 69% 86% / 0.3)"
					/>

					{/* Handle */}
					<path
						d="M175,85 C200,85 210,105 210,130 C210,155 200,175 175,175"
						fill="none"
						stroke="hsl(26 75% 72% / 0.5)"
						strokeWidth="8"
						strokeLinecap="round"
					/>
					<path
						d="M175,90 C196,90 204,108 204,130 C204,152 196,170 175,170"
						fill="none"
						stroke="hsl(20 64% 95%)"
						strokeWidth="4"
						strokeLinecap="round"
					/>

					{/* Liquid content */}
					<g clipPath={`url(#${cupClipId})`}>
						<rect
							x="40"
							y={liquidTop + 10}
							width="140"
							height={230 - liquidTop}
							fill={`url(#${coffeeGradId})`}
						/>
						<rect
							x="40"
							y={liquidTop + 3}
							width="140"
							height="14"
							fill={`url(#${foamGradId})`}
							opacity="0.7"
						/>

						<g className="animate-coffee-wave">
							<path
								d={`M20,${liquidTop + 8} C50,${liquidTop - 3} 80,${liquidTop + 19} 110,${liquidTop + 8} C140,${liquidTop - 3} 170,${liquidTop + 19} 200,${liquidTop + 8} C230,${liquidTop - 3} 260,${liquidTop + 19} 280,${liquidTop + 8} L280,${liquidTop + 24} L20,${liquidTop + 24} Z`}
								fill="hsl(26 75% 72%)"
								opacity="0.45"
							/>
						</g>

						<g className="animate-coffee-wave-reverse">
							<path
								d={`M20,${liquidTop + 6} C45,${liquidTop + 17} 75,${liquidTop - 5} 110,${liquidTop + 6} C145,${liquidTop + 17} 175,${liquidTop - 5} 210,${liquidTop + 6} C245,${liquidTop + 17} 275,${liquidTop - 5} 300,${liquidTop + 6} L300,${liquidTop + 24} L20,${liquidTop + 24} Z`}
								fill="hsl(22 69% 86%)"
								opacity="0.4"
							/>
						</g>
					</g>

					{/* Highlight */}
					<path
						d="M65,70 L62,190 Q63,200 66,202 L69,70 Z"
						fill="white"
						opacity="0.12"
					/>
				</svg>
			</div>
		</div>
	);
};
