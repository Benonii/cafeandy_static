interface StatItemProps {
	value: number;
	label: string;
}

const StatItem = ({ value, label }: StatItemProps) => (
	<div className="text-left">
		<p className="text-2xl sm:text-3xl lg:text-4xl font- text-gray-500 tracking-tight tabular-nums">
			{value.toLocaleString()}
		</p>
		<p className="text-xs sm:text-sm text-driftwood-300 font-semibold uppercase tracking-[0.15em] mt-0.5">
			{label}
		</p>
	</div>
);

interface FollowerStatsProps {
	followers: number;
	likes: number;
	shares: number;
}

export const FollowerStats = ({
	followers,
	likes,
	shares,
}: FollowerStatsProps) => (
	<div className="flex sm:flex-row lg:flex-col items-center lg:items-start justify-center gap-6 sm:gap-10 lg:gap-7 w-full overflow-x-auto py-2">
		<StatItem value={followers} label="Followers" />
		<div className="hidden sm:block lg:hidden h-10 border-l border-dashed border-driftwood-200" />
		<div className="sm:hidden lg:block w-20 border-t border-dashed border-driftwood-200" />
		<StatItem value={likes} label="Likes" />
		<div className="hidden sm:block lg:hidden h-10 border-l border-dashed border-driftwood-200" />
		<div className="sm:hidden lg:block w-20 border-t border-dashed border-driftwood-200" />
		<StatItem value={shares} label="Shares" />
	</div>
);
