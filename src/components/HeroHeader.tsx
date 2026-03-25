import profile from "@/assets/profile.jpg";
import { DonationBadges } from "@/components/DonationBadges";

export const HeroHeader = () => (
	<header className="w-full mb-10  border-b-2 border-dashed border-driftwood-700/30">
		<div className="flex items-center justify-between mx-4 sm:mx-7 py-4">
			{/* Profile avatar */}
			<div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full flex items-center justify-center overflow-hidden">
				<img
					src={profile}
					alt="Profile"
					className="w-full h-full object-cover"
				/>
			</div>

			{/* Donation Badges */}
			<DonationBadges />
		</div>
	</header>
);
