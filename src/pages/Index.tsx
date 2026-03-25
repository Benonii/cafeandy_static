import Noise from "@/assets/noise.jpg";
import { EquipmentHunting } from "@/sections/EquipmentHunting";
import Hero from "@/sections/Hero";
import { Leaderboard } from "@/sections/Leaderboard";
import { SupportAndy } from "@/sections/SupportAndy";

const Index: React.FC = () => {
	return (
		<main className="min-h-screen">
			<div
				className="absolute inset-0 opacity-10 mix-blend-overlay pointer-events-none"
				style={{ backgroundImage: `url(${Noise})`, backgroundSize: "cover" }}
			/>
			<Hero />
			<EquipmentHunting />
			<SupportAndy />
			<Leaderboard />
		</main>
	);
};

export default Index;
