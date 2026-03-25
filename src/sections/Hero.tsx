import { BudgetProgressBar } from "@/components/BudgetProgressBar";
import { CoffeeCup } from "@/components/CoffeeCup";
import { DonateButton } from "@/components/DonateButton";
import { FollowerStats } from "@/components/FollowerStats";
import { HeroHeader } from "@/components/HeroHeader";
import { useAnimatedCounter } from "@/hooks/useAnimatedCounter";

const Hero = () => {
	// Animated counters
	const followers = useAnimatedCounter(250000, 27000, 20000);
	const likes = useAnimatedCounter(1000000, 10000, 20000);
	const shares = useAnimatedCounter(100000, 1000, 20000);
	const budget = useAnimatedCounter(43000, 5000, 20000);

	// Coffee cup fill level (0–250K followers maps to 0–100% fill)
	const fillPercentage = (followers / 250000) * 100;

	return (
		<section className="w-full min-h-screen bg-linear-to-b from-driftwood-100 via-driftwood-50 to-white flex items-start font-(--font-family)">
			<div className="w-full max-w-full flex flex-col items-center">
				<HeroHeader />

				<h1 className="text-3xl sm:text-4xl lg:text-5xl  text-gray-700 text-center mb-10 sm:mb-14 tracking-tight font-mono!">
					Cafe Andy&rsquo;s Journey
				</h1>

				<div className="flex flex-col lg:grid lg:grid-cols-[auto_1fr_auto] items-center gap-10 sm:gap-14 lg:gap-20 mb-12 sm:mb-16 w-full px-6 max-w-5xl self-center">
					<div className="order-2 lg:order-1 flex justify-center w-full">
						<FollowerStats followers={followers} likes={likes} shares={shares} />
					</div>

					<div className="order-1 lg:order-2 flex justify-center w-full mb-8 lg:mb-0 scale-90 sm:scale-100">
						<CoffeeCup fillPercentage={fillPercentage} />
					</div>

					<div className="order-3 lg:order-3 flex justify-center w-full">
						<BudgetProgressBar current={budget} goal={125000} />
					</div>
				</div>

				<div className="flex justify-center">
					<DonateButton />
				</div>
			</div>
		</section>
	);
};

export default Hero;
