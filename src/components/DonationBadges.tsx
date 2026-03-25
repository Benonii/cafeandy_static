import { Award, Coffee, Medal } from "lucide-react";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog";
import {
	Tooltip,
	TooltipContent,
	TooltipProvider,
	TooltipTrigger,
} from "@/components/ui/tooltip";

type BadgeType = {
	id: string;
	name: string;
	description: string;
	icon: React.ElementType;
	colors: string;
	amount: number;
	rotation?: string;
};

const DONATION_BADGES: BadgeType[] = [
	{
		id: "bronze-bean",
		name: "Bronze Bean",
		description:
			"Awarded to supporters who have donated $5 or more. This roasted bronze bean shows you support the daily grind!",
		icon: Coffee,
		colors: "bg-amber-700/20 text-amber-700 border-amber-700/50",
		amount: 5,
		rotation: "-rotate-6",
	},
	{
		id: "silver-spoon",
		name: "Silver Spoon",
		description:
			"Awarded to generous supporters who have donated $25 or more. A shiny silver spoon for stirring up great ideas!",
		icon: Medal,
		colors:
			"bg-slate-300/30 text-slate-700 border-slate-400/60 dark:bg-slate-700/30 dark:text-slate-300 dark:border-slate-500",
		amount: 25,
		rotation: "rotate-3",
	},
	{
		id: "golden-cup",
		name: "Golden Cup",
		description:
			"Awarded to elite supporters who have donated $100 or more. The ultimate sign of appreciation—a golden cup overflowing with gratitude!",
		icon: Award,
		colors:
			"bg-yellow-500/20 text-yellow-600 border-yellow-500/50 dark:text-yellow-400",
		amount: 100,
		rotation: "-rotate-2",
	},
];

export const DonationBadges = () => {
	return (
		<TooltipProvider delayDuration={200}>
			<div className="flex items-end gap-2 sm:gap-3">
				{DONATION_BADGES.map((badge) => {
					const Icon = badge.icon;
					return (
						<Dialog key={badge.id}>
							<Tooltip>
								<TooltipTrigger asChild>
									<DialogTrigger asChild>
										<button
											type="button"
											className={`flex items-center justify-center p-1.5 sm:p-2.5 rounded-md border shadow-sm transition-all hover:scale-105 active:scale-95 cursor-pointer ${badge.colors} ${badge.rotation || ""}`}
										>
											<Icon className="w-5 h-5 drop-shadow-sm" />
										</button>
									</DialogTrigger>
								</TooltipTrigger>
								<TooltipContent
									side="bottom"
									className="font-semibold px-2.5 py-1 text-sm border bg-popover text-popover-foreground"
								>
									{badge.name}
								</TooltipContent>
							</Tooltip>
							<DialogContent className="sm:max-w-md">
								<DialogHeader>
									<div
										className={`mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full border-4 shadow-sm ${badge.colors.replace(/bg-.*\/[0-9]+/, "bg-background")}`}
									>
										<Icon className="h-8 w-8" />
									</div>
									<DialogTitle className="text-center text-xl pb-1">
										{badge.name}
									</DialogTitle>
									<DialogDescription className="text-center text-base">
										{badge.description}
									</DialogDescription>
								</DialogHeader>
								<div className="flex justify-center pt-4">
									<span className="inline-flex items-center rounded-full bg-secondary px-3 py-1 text-sm font-medium text-secondary-foreground">
										Unlocked at ${badge.amount}
									</span>
								</div>
							</DialogContent>
						</Dialog>
					);
				})}
			</div>
		</TooltipProvider>
	);
};
