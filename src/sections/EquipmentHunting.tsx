import coffeeBrewerImg from "@/assets/coffee_brewer.png";
import mushroomLampImg from "@/assets/mushroom_lamp.png";
import { useEffect, useRef, useState } from "react";

/* ─── Data ──────────────────────────────────────────────────────────────── */
type EquipmentItem = {
	id: string;
	name: string;
	image: string;
	initialPrice: number;
	finalPrice: number;
};

const ITEMS: EquipmentItem[] = [
	{ id: "coffee-brewer", name: "Coffee Brewer", image: coffeeBrewerImg, initialPrice: 220, finalPrice: 70 },
	{ id: "mushroom-lamp", name: "Mushroom Lamp", image: mushroomLampImg, initialPrice: 40, finalPrice: 20 },
];

const LIKES = 3519;
const CENTS_PER_LIKE = 0.1;

/* ─── EquipmentRow ───────────────────────────────────────────────────────── */
const EquipmentRow = ({ item }: { item: EquipmentItem }) => (
	<div className="flex items-center gap-0 bg-white/50 rounded-lg overflow-hidden hover:bg-white/80 transition-colors duration-200">
		<img src={item.image} alt={item.name} className="w-28 h-20 object-cover shrink-0" />
		<div className="w-px self-stretch bg-driftwood-200/60" />
		<span className="px-5 flex-1 text-base font-medium text-driftwood-800 tracking-tight">{item.name}</span>
		<div className="w-px self-stretch bg-driftwood-200/60" />
		<div className="px-5 flex flex-col items-end gap-0.5 shrink-0 py-3">
			<span className="text-sm text-driftwood-300 line-through font-light">${item.initialPrice}</span>
			<span className="text-base font-bold text-driftwood-600">${item.finalPrice}</span>
		</div>
	</div>
);

/* ─── EquationChunk ──────────────────────────────────────────────────────── */
const EquationChunk = ({ children, visible, delay }: { children: React.ReactNode; visible: boolean; delay: number }) => (
	<span
		className="inline-flex items-center transition-all duration-600"
		style={{
			opacity: visible ? 1 : 0,
			transform: visible ? "translateY(0) scale(1)" : "translateY(12px) scale(0.92)",
			transitionDelay: visible ? `${delay}ms` : "0ms",
		}}
	>
		{children}
	</span>
);

/* ─── MysteryBox ─────────────────────────────────────────────────────────── */
const MysteryBox = ({ visible }: { visible: boolean }) => {
	const total = (LIKES * CENTS_PER_LIKE).toFixed(2);
	return (
		<div className="flex flex-col items-center gap-7">
			{/* Box */}
			<div
				className="w-72 h-64 sm:w-[600px] sm:h-[500px] rounded-3xl border-2 border-dashed border-driftwood-400/60 bg-linear-to-br from-driftwood-50 to-white flex items-center justify-center relative"
				style={{ boxShadow: "inset 0 0 40px hsl(28 40% 50% / 0.06), 0 8px 32px hsl(28 40% 30% / 0.10)" }}
			>
				{/* Corner accents */}
				<div className="absolute top-3 left-3 w-5 h-5 border-t-2 border-l-2 border-driftwood-400/50 rounded-tl-lg" />
				<div className="absolute top-3 right-3 w-5 h-5 border-t-2 border-r-2 border-driftwood-400/50 rounded-tr-lg" />
				<div className="absolute bottom-3 left-3 w-5 h-5 border-b-2 border-l-2 border-driftwood-400/50 rounded-bl-lg" />
				<div className="absolute bottom-3 right-3 w-5 h-5 border-b-2 border-r-2 border-driftwood-400/50 rounded-br-lg" />
				{/* Central ? */}
				<span
					className="text-[7rem] sm:text-[9rem] leading-none select-none text-transparent bg-clip-text"
					style={{
						backgroundImage: "linear-gradient(135deg, hsl(28 57% 59%), hsl(28 40% 50%) 60%, hsl(26 75% 72%))",
						fontFamily: "Georgia, 'Times New Roman', serif",
						fontWeight: 300,
						filter: "drop-shadow(0 4px 12px hsl(28 40% 50% / 0.25))",
					}}
				>
					?
				</span>
			</div>

			{/* Equation */}
			<div className="flex flex-wrap items-baseline justify-center gap-2 font-mono">
				<EquationChunk visible={visible} delay={0}>
					<span className="text-xl sm:text-2xl font-bold text-driftwood-800 tabular-nums">
						{LIKES.toLocaleString()}
					</span>
					<span className="text-base text-driftwood-500 ml-1.5">likes</span>
				</EquationChunk>
				<EquationChunk visible={visible} delay={200}>
					<span className="text-xl text-driftwood-300 mx-1">×</span>
				</EquationChunk>
				<EquationChunk visible={visible} delay={400}>
					<span className="text-xl sm:text-2xl font-bold text-driftwood-800">10¢</span>
				</EquationChunk>
				<EquationChunk visible={visible} delay={600}>
					<span className="text-xl text-driftwood-300 mx-1">=</span>
				</EquationChunk>
				<EquationChunk visible={visible} delay={800}>
					<span
						className="text-2xl sm:text-3xl font-black text-transparent bg-clip-text"
						style={{ backgroundImage: "linear-gradient(90deg, hsl(28 57% 59%), hsl(28 42% 35%))" }}
					>
						${total}
					</span>
				</EquationChunk>
			</div>
		</div>
	);
};

/* ─── Main Section ───────────────────────────────────────────────────────── */
export const EquipmentHunting = () => {
	const sectionRef = useRef<HTMLElement>(null);
	const [inView, setInView] = useState(false);

	useEffect(() => {
		const el = sectionRef.current;
		if (!el) return;
		const observer = new IntersectionObserver(
			([entry]) => {
				if (entry.isIntersecting) {
					setInView(false);
					requestAnimationFrame(() => setTimeout(() => setInView(true), 80));
				} else {
					setInView(false);
				}
			},
			{ threshold: 0.2 },
		);
		observer.observe(el);
		return () => observer.disconnect();
	}, []);

	return (
		<section
			ref={sectionRef}
			className="w-full bg-linear-to-b from-white via-driftwood-50/30 to-driftwood-100/20 font-(--font-family)"
		>
			<div className="max-w-full mx-auto px-8 sm:px-12 pt-24 sm:pt-32 pb-28 sm:pb-36">
				{/* Heading */}
				<div className="text-center mb-20">
					<h2 className="text-4xl sm:text-5xl lg:text-6xl tracking-tight text-driftwood-900 mb-2">
						<span className="font-extralight italic text-driftwood-400">Equipment</span>
						{"  "}
						<span
							className="font-black text-transparent bg-clip-text"
							style={{ backgroundImage: "linear-gradient(135deg, hsl(28 57% 59%) 0%, hsl(28 42% 35%) 100%)" }}
						>
							Hunting
						</span>
					</h2>
					<p className="text-sm text-driftwood-400 font-light tracking-widest uppercase mt-2">
						haggling for my home cafe
					</p>
				</div>

				{/* Body — relative canvas so "Already Secured" pins top-left
				    and mystery box is independently centered */}
				<div className="relative min-h-[480px] flex flex-col items-center gap-20 xl:block xl:min-h-[560px]">
					{/* ── Already Secured — top-left ───────────────────── */}
					<div className="w-full max-w-md xl:absolute xl:top-0 xl:left-0 xl:w-[460px]">
						<p className="text-xs font-semibold uppercase tracking-[0.18em] text-gray-500 mb-3 text-center xl:text-left">
							✓ Already Secured
						</p>
						<div className="rounded-2xl border-2 border-dashed border-gray-200 bg-driftwood-50/20 p-2.5 sm:p-3.5 flex flex-col gap-2.5">
							{ITEMS.map((item) => (
								<EquipmentRow key={item.id} item={item} />
							))}
						</div>
					</div>

					{/* ── Mystery Box — true center ─────────────────────── */}
					<div className="flex flex-col items-center xl:absolute xl:left-1/2 xl:top-1/2 xl:-translate-x-1/2 xl:-translate-y-1/2">
						<p className="text-xs font-semibold uppercase tracking-[0.18em] text-driftwood-300 mb-5">
							? Next Target
						</p>
						<MysteryBox visible={inView} />
					</div>
				</div>
			</div>
		</section>
	);
};
