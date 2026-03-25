import { useId } from "react";

interface BudgetProgressBarProps {
	current: number;
	goal?: number;
}

export const BudgetProgressBar = ({
	current,
	goal = 500000,
}: BudgetProgressBarProps) => {
	const percentage = Math.min((current / goal) * 100, 100);
	const barTop = 200;
	const fillHeight = (percentage / 100) * barTop;
	const liquidY = barTop - fillHeight + 10;

	const barClipId = useId();
	const barCoffeeGradId = useId();
	const barFoamGradId = useId();

	return (
		<div className="flex flex-col items-center gap-3 h-full">
			<p className="text-base sm:text-lg  font-medium text-driftwood-800 whitespace-nowrap tracking-wide">
				${goal.toLocaleString()}
			</p>

			<div className="relative flex-1 min-h-[240px] sm:min-h-[360px]">
				<svg
					viewBox="0 0 52 220"
					className="h-full"
					style={{ width: "72px" }}
					xmlns="http://www.w3.org/2000/svg"
					role="img"
					aria-label="Budget progress bar"
				>
					<title>Budget progress bar</title>
					<defs>
						<clipPath id={barClipId}>
							<rect x="2" y="2" width="48" height="216" rx="3" />
						</clipPath>

						<linearGradient id={barCoffeeGradId} x1="0" y1="0" x2="0" y2="1">
							<stop offset="0%" stopColor="hsl(22 69% 86%)" stopOpacity="0.5" />
							<stop
								offset="25%"
								stopColor="hsl(26 75% 72%)"
								stopOpacity="0.8"
							/>
							<stop offset="100%" stopColor="hsl(28 42% 35%)" />
						</linearGradient>

						<linearGradient id={barFoamGradId} x1="0" y1="0" x2="0" y2="1">
							<stop offset="0%" stopColor="hsl(20 64% 95%)" />
							<stop
								offset="100%"
								stopColor="hsl(22 69% 86%)"
								stopOpacity="0.5"
							/>
						</linearGradient>
					</defs>

					<rect
						x="1"
						y="1"
						width="50"
						height="218"
						rx="4"
						fill="hsl(20 64% 95% / 0.4)"
						stroke="hsl(26 75% 72% / 0.35)"
						strokeWidth="1.5"
					/>

					<g clipPath={`url(#${barClipId})`}>
						<rect
							x="0"
							y={liquidY + 8}
							width="52"
							height={220 - liquidY}
							fill={`url(#${barCoffeeGradId})`}
						/>
						<rect
							x="0"
							y={liquidY + 2}
							width="52"
							height="12"
							fill={`url(#${barFoamGradId})`}
							opacity="0.7"
						/>

						<g className="animate-coffee-wave">
							<path
								d={`M-20,${liquidY + 7} C-5,${liquidY} 10,${liquidY + 14} 26,${liquidY + 7} C42,${liquidY} 57,${liquidY + 14} 72,${liquidY + 7} C87,${liquidY} 102,${liquidY + 14} 112,${liquidY + 7} L112,${liquidY + 20} L-20,${liquidY + 20} Z`}
								fill="hsl(26 75% 72%)"
								opacity="0.5"
							/>
						</g>

						<g className="animate-coffee-wave-reverse">
							<path
								d={`M-20,${liquidY + 5} C-8,${liquidY + 13} 8,${liquidY - 3} 26,${liquidY + 5} C44,${liquidY + 13} 58,${liquidY - 3} 72,${liquidY + 5} C90,${liquidY + 13} 104,${liquidY - 3} 112,${liquidY + 5} L112,${liquidY + 20} L-20,${liquidY + 20} Z`}
								fill="hsl(22 69% 86%)"
								opacity="0.4"
							/>
						</g>
					</g>
				</svg>
			</div>

			<p className="text-base sm:text-lg font-medium text-driftwood-800 whitespace-nowrap tracking-wide tabular-nums">
				${current.toLocaleString()}
			</p>
		</div>
	);
};
