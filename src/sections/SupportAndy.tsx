import logoImg from "@/assets/logo.jpg";
import mugBlackImg from "@/assets/mug_black.png";
import mugCreamImg from "@/assets/mug_cream.png";
import { useEffect, useRef, useState } from "react";

/* ─── Merch Data ─────────────────────────────────────────────────────────── */
type MerchItem = {
	id: string;
	name: string;
	variant: string;
	price: number;
	type: "mug" | "hoodie";
	img?: string;
	bg: string;       // CSS color for hoodie body
	accent: string;   // logo / text tint
};

const MERCH: MerchItem[] = [
	{ id: "mug-cream",     name: "Cafe Andy Mug",     variant: "Classic Cream",   price: 22, type: "mug",    img: mugCreamImg, bg: "#f5ede6", accent: "#7f5f34" },
	{ id: "mug-black",     name: "Cafe Andy Mug",     variant: "Matte Black",     price: 25, type: "mug",    img: mugBlackImg, bg: "#1a1a1a", accent: "#C29A6B" },
	{ id: "hoodie-brown",  name: "Cafe Andy Hoodie",  variant: "Driftwood Brown", price: 55, type: "hoodie", bg: "#9E7749",    accent: "#f5ede6" },
	{ id: "hoodie-cream",  name: "Cafe Andy Hoodie",  variant: "Oat Cream",       price: 55, type: "hoodie", bg: "#EEDBC5",    accent: "#5B4324" },
	{ id: "hoodie-slate",  name: "Cafe Andy Hoodie",  variant: "Slate Charcoal",  price: 58, type: "hoodie", bg: "#3a3535",    accent: "#DDB88A" },
	{ id: "mug-terracotta",name: "Cafe Andy Mug",     variant: "Terracotta",      price: 24, type: "mug",    bg: "#b55e40",    accent: "#fff8f0" },
];

/* ─── Donation Tiers ─────────────────────────────────────────────────────── */
type Tier = { id: string; emoji: string; title: string; desc: string; price: number; borderColor: string; glow: string };

const TIERS: Tier[] = [
	{
		id: "brick",
		emoji: "🧱",
		title: "One Brick",
		desc: "Literally one brick for the wall of Andy's cafe. Your name goes in the mortar.",
		price: 1,
		borderColor: "hsl(22 90% 55%)",
		glow: "hsl(22 90% 55% / 0.25)",
	},
	{
		id: "coffee",
		emoji: "☕",
		title: "Fund a Coffee",
		desc: "Cover one cup served on opening day. That cup is named after you.",
		price: 3,
		borderColor: "hsl(38 85% 52%)",
		glow: "hsl(38 85% 52% / 0.25)",
	},
	{
		id: "table",
		emoji: "🪑",
		title: "Sponsor a Table",
		desc: "A table at Cafe Andy will have your name on a small plaque. Good vibes guaranteed.",
		price: 10,
		borderColor: "hsl(28 57% 59%)",
		glow: "hsl(28 57% 59% / 0.25)",
	},
	{
		id: "barista",
		emoji: "🎓",
		title: "Train a Barista",
		desc: "Fund a full barista training shift. You're officially responsible for excellent espresso.",
		price: 100,
		borderColor: "hsl(28 42% 35%)",
		glow: "hsl(28 42% 35% / 0.25)",
	},
];

/* ─── Hoodie SVG ─────────────────────────────────────────────────────────── */
const HoodieSVG = ({ bg, accent }: { bg: string; accent: string }) => (
	<svg viewBox="0 0 200 220" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
		<title>Cafe Andy Hoodie</title>
		{/* Body */}
		<path d="M40 80 L20 200 H180 L160 80 L140 60 Q100 50 60 60 Z" fill={bg} />
		{/* Hood */}
		<path d="M60 60 Q100 20 140 60 Q120 55 100 55 Q80 55 60 60 Z" fill={bg} />
		{/* Pocket */}
		<rect x="70" y="150" width="60" height="35" rx="4" fill={accent} fillOpacity="0.15" stroke={accent} strokeOpacity="0.3" strokeWidth="1" />
		{/* Sleeves */}
		<path d="M40 80 L10 140 L30 145 L55 95 Z" fill={bg} />
		<path d="M160 80 L190 140 L170 145 L145 95 Z" fill={bg} />
		{/* Logo area on chest */}
		<circle cx="100" cy="110" r="22" fill={accent} fillOpacity="0.18" stroke={accent} strokeOpacity="0.4" strokeWidth="1.5" />
		<text x="100" y="106" textAnchor="middle" fontSize="7" fill={accent} fontWeight="600" letterSpacing="0.5">CAFE</text>
		<text x="100" y="117" textAnchor="middle" fontSize="9" fill={accent} fontWeight="800" letterSpacing="1">ANDY</text>
		{/* Zipper */}
		<line x1="100" y1="55" x2="100" y2="200" stroke={accent} strokeOpacity="0.2" strokeWidth="1.5" strokeDasharray="3 3" />
	</svg>
);

/* ─── MerchCard ──────────────────────────────────────────────────────────── */
const MerchCard = ({ item, index, activeIdx, total }: { item: MerchItem; index: number; activeIdx: number; total: number }) => {
	// Shortest-path offset for infinite wrapping
	let offset = index - activeIdx;
	const half = Math.floor(total / 2);
	if (offset > half) offset -= total;
	if (offset < -half) offset += total;

	const isActive = offset === 0;
	const abs = Math.abs(offset);

	const tx = offset * 300;
	const tz = isActive ? 100 : -abs * 80;
	const scale = isActive ? 1 : Math.max(0.68, 1 - abs * 0.16);
	const opacity = abs > 2 ? 0 : isActive ? 1 : Math.max(0.3, 1 - abs * 0.35);
	const rotY = Math.min(Math.max(offset * -20, -40), 40);

	return (
		<div
			className="absolute top-0 left-1/2"
			style={{
				transform: `translateX(calc(-50% + ${tx}px)) translateZ(${tz}px) rotateY(${rotY}deg) scale(${scale})`,
				opacity,
				transition: "transform 480ms cubic-bezier(0.22, 1, 0.36, 1), opacity 320ms ease",
				zIndex: isActive ? 10 : 10 - abs,
				pointerEvents: isActive ? "auto" : "none",
				willChange: "transform, opacity",
			}}
		>
			<div
				className="w-80 rounded-2xl overflow-hidden shadow-2xl flex flex-col"
				style={{
					background: "rgba(255,255,255,0.92)",
					backdropFilter: "blur(16px)",
					border: "3px dashed",
					borderColor: isActive ? "#D1D5DB" : "transparent",
					transition: "border-color 320ms ease",
				}}
			>
				{/* Product visual */}
				<div
					className="w-full h-72 flex items-center justify-center p-6 relative overflow-hidden"
					style={{ background: `linear-gradient(135deg, ${item.bg}22, ${item.bg}55)` }}
				>
					{/* faint logo watermark */}
					<img src={logoImg} alt="" className="absolute inset-0 w-full h-full object-cover opacity-5 blur-sm" aria-hidden />
					{item.img ? (
						<img src={item.img} alt={item.name} className="w-52 h-52 object-contain drop-shadow-2xl relative z-10" />
					) : item.type === "hoodie" ? (
						<div className="w-52 h-56 relative z-10">
							<HoodieSVG bg={item.bg} accent={item.accent} />
						</div>
					) : (
						<div className="relative z-10 flex flex-col items-center">
							<div
								className="w-32 h-32 rounded-2xl flex items-center justify-center shadow-xl"
								style={{ background: item.bg, color: item.accent }}
							>
								<span className="text-6xl">☕</span>
							</div>
						</div>
					)}
					{/* Color swatch dot */}
					<div
						className="absolute bottom-4 right-4 w-5 h-5 rounded-full border-2 border-white shadow-md"
						style={{ background: item.bg }}
					/>
				</div>

				{/* Info */}
				<div className="px-6 py-5 flex flex-col gap-1.5">
					<p className="text-xs text-driftwood-300 font-medium uppercase tracking-widest">{item.variant}</p>
					<p className="text-lg font-bold text-driftwood-800">{item.name}</p>
					<div className="flex items-center justify-between mt-3">
						<span className="text-2xl font-black text-driftwood-600">${item.price}</span>
						<button
							type="button"
							className="px-5 py-2 rounded-xl text-sm font-bold text-white transition-all duration-200 active:scale-95 hover:brightness-110"
							style={{
								background: "linear-gradient(135deg, hsl(28 57% 59%), hsl(28 42% 35%))",
								boxShadow: "0 3px 12px hsl(28 40% 40% / 0.4)",
							}}
						>
							Buy Now
						</button>
					</div>
				</div>
			</div>
		</div>
	);
};

/* ─── DonationTierCard ───────────────────────────────────────────────────── */
const TierCard = ({
	tier,
	visible,
	delay,
	featured = false,
}: {
	tier: Tier;
	visible: boolean;
	delay: number;
	featured?: boolean;
}) => {
	const [hovered, setHovered] = useState(false);

	return (
		<article
			className={`bg-white rounded-2xl flex flex-col overflow-hidden h-full ${featured ? "p-10" : "p-8"}`}
			style={{
				opacity: visible ? 1 : 0,
				transform: visible ? "translateY(0) scale(1)" : "translateY(28px) scale(0.94)",
				transition: `opacity 550ms cubic-bezier(0.22,1,0.36,1) ${delay}ms, transform 550ms cubic-bezier(0.22,1,0.36,1) ${delay}ms, box-shadow 250ms ease`,
				boxShadow: hovered
					? `0 20px 60px ${tier.glow}`
					: "0 2px 20px rgba(0,0,0,0.06)",
				border: "2px dashed #D1D5DB",
				willChange: "transform, opacity",
			}}
			onMouseEnter={() => setHovered(true)}
			onMouseLeave={() => setHovered(false)}
		>
			{/* Emoji badge */}
			<div
				className={`${featured ? "w-20 h-20 text-5xl mb-6" : "w-14 h-14 text-3xl mb-4"} rounded-2xl flex items-center justify-center shrink-0`}
				style={{
					background: `${tier.borderColor}15`,
					transition: "transform 300ms cubic-bezier(0.22, 1, 0.36, 1)",
					transform: hovered ? "scale(1.1) rotate(-5deg)" : "scale(1) rotate(0deg)",
				}}
			>
				{tier.emoji}
			</div>

			{/* Content */}
			<div className="flex-1 flex flex-col">
				<p className={`font-bold text-gray-700 ${featured ? "text-2xl" : "text-lg"}`}>{tier.title}</p>
				<p className={`text-gray-400 leading-relaxed mt-2 ${featured ? "text-base" : "text-sm"}`}>{tier.desc}</p>
			</div>

			{/* Footer */}
			<div className={`flex items-center justify-between gap-4 ${featured ? "mt-10 pt-6" : "mt-6 pt-5"} border-t border-gray-100`}>
				<span
					className={`font-black shrink-0 ${featured ? "text-4xl" : "text-3xl"}`}
					style={{ color: tier.borderColor }}
				>
					${tier.price}
				</span>
				<button
					type="button"
					className={`rounded-xl font-bold transition-all duration-200 active:scale-95 shrink-0 ${featured ? "px-7 py-3 text-base" : "px-5 py-2.5 text-sm"}`}
					style={{
						background: "transparent",
						color: tier.borderColor,
						border: `2px dashed ${tier.borderColor}`,
						transform: hovered ? "scale(1.05)" : "scale(1)",
						transition: "transform 200ms cubic-bezier(0.22, 1, 0.36, 1), background 200ms ease",
					}}
					onMouseEnter={(e) => { (e.currentTarget as HTMLButtonElement).style.background = `${tier.borderColor}12`; }}
					onMouseLeave={(e) => { (e.currentTarget as HTMLButtonElement).style.background = "transparent"; }}
				>
					Support →
				</button>
			</div>
		</article>
	);
};


/* ─── Main Section ───────────────────────────────────────────────────────── */
export const SupportAndy = () => {
	const sectionRef = useRef<HTMLElement>(null);
	const [inView, setInView] = useState(false);
	const [activeIdx, setActiveIdx] = useState(0);
	const total = MERCH.length;

	/* Intersection observer for donate-tier entrance */
	useEffect(() => {
		const el = sectionRef.current;
		if (!el) return;
		const observer = new IntersectionObserver(
			([entry]) => {
				if (entry.isIntersecting) {
					setInView(false);
					requestAnimationFrame(() => setTimeout(() => setInView(true), 100));
				} else {
					setInView(false);
				}
			},
			{ threshold: 0.15 },
		);
		observer.observe(el);
		return () => observer.disconnect();
	}, []);

	/* Auto-advance carousel */
	useEffect(() => {
		if (!inView) return;
		const t = setInterval(() => setActiveIdx((i) => (i + 1) % total), 3200);
		return () => clearInterval(t);
	}, [inView, total]);

	const prev = () => setActiveIdx((i) => (i - 1 + total) % total);
	const next = () => setActiveIdx((i) => (i + 1) % total);

	return (
		<section
			ref={sectionRef}
			className="w-full bg-linear-to-b from-driftwood-100/20 via-driftwood-50/40 to-white font-(--font-family) overflow-hidden"
		>
			{/* ── Merch Carousel ───────────────────────────────── */}
			<div className="pt-24 sm:pt-32 pb-16">
				<div className="text-center mb-4">
					<h2 className="text-4xl sm:text-5xl lg:text-6xl tracking-tight text-driftwood-900">
						<span className="font-extralight italic text-driftwood-400">Wear the</span>
						{"  "}
						<span
							className="font-black text-transparent bg-clip-text"
							style={{ backgroundImage: "linear-gradient(135deg, hsl(28 57% 59%) 0%, hsl(28 42% 35%) 100%)" }}
						>
							Dream
						</span>
					</h2>
					<p className="text-sm text-driftwood-400 font-light tracking-widest uppercase mt-2">
						official cafe andy merch
					</p>
				</div>

				{/* 3-D perspective stage */}
				<div
					className="relative mx-auto mt-10 h-[500px]"
					style={{ perspective: "1200px", perspectiveOrigin: "50% 40%", maxWidth: "1100px" }}
				>
					{/* Cards */}
					<div className="absolute inset-0" style={{ transformStyle: "preserve-3d" }}>
						{MERCH.map((item, i) => (
							<MerchCard key={item.id} item={item} index={i} activeIdx={activeIdx} total={total} />
						))}
					</div>

					{/* Prev / Next */}
					<button
						type="button"
						onClick={prev}
						className="absolute left-2 sm:left-6 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-white/80 backdrop-blur border border-driftwood-200 flex items-center justify-center text-driftwood-600 shadow-md hover:scale-110 active:scale-95 transition-transform duration-200"
						aria-label="Previous item"
					>
						‹
					</button>
					<button
						type="button"
						onClick={next}
						className="absolute right-2 sm:right-6 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-white/80 backdrop-blur border border-driftwood-200 flex items-center justify-center text-driftwood-600 shadow-md hover:scale-110 active:scale-95 transition-transform duration-200"
						aria-label="Next item"
					>
						›
					</button>
				</div>

				{/* Dot indicators */}
				<div className="flex justify-center gap-2 mt-4">
					{MERCH.map((item, i) => (
						<button
							key={item.id}
							type="button"
							onClick={() => setActiveIdx(i)}
							className="rounded-full transition-all duration-300"
							style={{
								width: i === activeIdx ? "24px" : "8px",
								height: "8px",
								background: i === activeIdx ? "hsl(28 57% 59%)" : "hsl(28 40% 75% / 0.5)",
							}}
							aria-label={`Go to ${item.name}`}
						/>
					))}
				</div>
			</div>

			{/* ── Build Andy's Cafe ─────────────────────────────── */}
			<div className="max-w-7xl mx-auto px-6 sm:px-12 pb-28 sm:pb-36">
				{/* Divider */}
				<div className="flex items-center gap-4 mb-14">
					<div className="flex-1 h-px bg-linear-to-r from-transparent via-gray-200 to-transparent" />
					<div className="flex flex-col items-center gap-1 px-4">
						<img src={logoImg} alt="Cafe Andy logo" className="w-12 h-12 rounded-full object-cover ring-2 ring-gray-200" />
						<p className="text-xs text-gray-400 tracking-widest uppercase font-medium">Build Andy's Cafe</p>
					</div>
					<div className="flex-1 h-px bg-linear-to-r from-transparent via-gray-200 to-transparent" />
				</div>

				{/* Bento grid layout
				    Desktop: [brick | table (wide) | barista (tall, featured)]
				             [coffee| table (wide) | barista (tall, featured)]
				    Mobile: stacked */}
				<div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 lg:[grid-template-areas:'brick_table_barista''coffee_table_barista']">
					<div className="lg:[grid-area:brick]">
						<TierCard tier={TIERS[0]} visible={inView} delay={0} />
					</div>
					<div className="lg:[grid-area:coffee]">
						<TierCard tier={TIERS[1]} visible={inView} delay={100} />
					</div>
					<div className="sm:col-span-2 lg:col-span-1 lg:[grid-area:table]">
						<TierCard tier={TIERS[2]} visible={inView} delay={200} />
					</div>
					<div className="sm:col-span-2 lg:col-span-1 lg:[grid-area:barista]">
						<TierCard tier={TIERS[3]} visible={inView} delay={300} featured />
					</div>
				</div>

				{/* Footer note */}
				<p
					className="text-center text-xs text-driftwood-300 mt-8 italic"
					style={{
						opacity: inView ? 1 : 0,
						transition: "opacity 600ms ease 500ms",
					}}
				>
					Every contribution goes directly toward building a real, physical Cafe Andy. No middlemen.
				</p>
			</div>
		</section>
	);
};
