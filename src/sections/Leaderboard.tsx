import minoImg from "@/assets/mino.jpg";
import profileImg from "@/assets/profile.jpg";
import samImg from "@/assets/sam.jpg";

import commenter1 from "@/assets/commenter_1.jpg";
import commenter2 from "@/assets/commenter_2.jpg";
import commenter3 from "@/assets/commenter_3.jpg"

import { useEffect, useRef, useState } from "react";

/* ─── Data ───────────────────────────────────────────────────────────────── */
const DONORS = [
	{ rank: 2, name: "Mino",    handle: "@mino.lee",    amount: 87,  img: minoImg,    medal: "🥈" },
	{ rank: 1, name: "Sam",     handle: "@sam_builds",  amount: 142, img: samImg,     medal: "🥇" },
	{ rank: 3, name: "Ben",    handle: "@litter.per.follower", amount: 54,  img: profileImg, medal: "🥉" },
] as const;

const COMMENTS = [
	{ handle: "@andrew_choe_",    avatar: commenter1,    text: "10k followers: cute cat for the cafe 🐱",       time: "3h",  likes: 42 },
	{ handle: "@aarondrizzy_",  avatar: commenter2,     text: "WEEE BACKKKK",         time: "5h",  likes: 78 },
	{ handle: "@arianamasters", avatar: commenter3, text: "OG❤️❤️🔥🔥",         time: "1h",  likes: 113 },
];

/* ─── PodiumCard ─────────────────────────────────────────────────────────── */
const PodiumCard = ({
	donor,
	visible,
	delay,
}: {
	donor: (typeof DONORS)[number];
	visible: boolean;
	delay: number;
}) => {
	const isFirst = donor.rank === 1;

	return (
		<div
			className="flex flex-col items-center"
			style={{
				opacity: visible ? 1 : 0,
				transform: visible ? "translateY(0)" : "translateY(48px)",
				transition: `opacity 600ms cubic-bezier(0.22,1,0.36,1) ${delay}ms, transform 600ms cubic-bezier(0.22,1,0.36,1) ${delay}ms`,
				willChange: "transform, opacity",
			}}
		>
			{/* Medal badge */}
			<span className="text-3xl mb-3 leading-none">{donor.medal}</span>

			{/* Avatar ring — gold ring for 1st */}
			<div
				className="rounded-full p-[3px] mb-3"
				style={{
					background: isFirst
						? "linear-gradient(135deg, #f5c842, #c8860a)"
						: donor.rank === 2
						? "linear-gradient(135deg, #c0c0c0, #888)"
						: "linear-gradient(135deg, #cd7f32, #8B4513)",
					boxShadow: isFirst ? "0 4px 24px rgba(200,134,10,0.35)" : "none",
				}}
			>
				<img
					src={donor.img}
					alt={donor.name}
					className="rounded-full object-cover block"
					style={{ width: isFirst ? 88 : 68, height: isFirst ? 88 : 68 }}
				/>
			</div>

			{/* Name */}
			<p className={`font-bold text-gray-700 ${isFirst ? "text-lg" : "text-base"}`}>{donor.name}</p>
			<p className="text-xs text-gray-400 mt-0.5">{donor.handle}</p>

			{/* Podium block */}
			<div
				className="mt-4 w-full rounded-t-xl flex items-center justify-center"
				style={{
					height: isFirst ? 80 : donor.rank === 2 ? 56 : 40,
					minWidth: isFirst ? 110 : 90,
					background: isFirst
						? "linear-gradient(180deg, hsl(38 85%  68%), hsl(38 60% 50%))"
						: donor.rank === 2
						? "linear-gradient(180deg, hsl(0 0% 82%), hsl(0 0% 65%))"
						: "linear-gradient(180deg, hsl(28 55% 62%), hsl(28 45% 48%))",
				}}
			>
				<span
					className="font-black text-white text-sm tracking-tight drop-shadow"
					style={{ textShadow: "0 1px 4px rgba(0,0,0,0.25)" }}
				>
					${donor.amount}
				</span>
			</div>
		</div>
	);
};

/* ─── IGComment ──────────────────────────────────────────────────────────── */
const IGComment = ({
	comment,
	visible,
	delay,
}: {
	comment: (typeof COMMENTS)[number];
	visible: boolean;
	delay: number;
}) => {
	const [liked, setLiked] = useState(false);

	return (
		<div
			className="flex gap-3 items-start"
			style={{
				opacity: visible ? 1 : 0,
				transform: visible ? "translateX(0)" : "translateX(-24px)",
				transition: `opacity 500ms cubic-bezier(0.22,1,0.36,1) ${delay}ms, transform 500ms cubic-bezier(0.22,1,0.36,1) ${delay}ms`,
				willChange: "transform, opacity",
			}}
		>
			{/* Avatar */}
			<img
				src={comment.avatar}
				alt={comment.handle}
				className="w-9 h-9 rounded-full object-cover shrink-0 ring-2 ring-gray-100"
			/>

			{/* Bubble */}
			<div className="flex-1">
				<div className="bg-gray-50 rounded-2xl rounded-tl-sm px-4 py-3">
					<span className="text-xs font-bold text-gray-700 mr-2">{comment.handle}</span>
					<span className="text-sm text-gray-500 leading-relaxed">{comment.text}</span>
				</div>
				<div className="flex items-center gap-4 mt-1.5 px-1">
					<span className="text-xs text-gray-300">{comment.time}</span>
					<button
						type="button"
						className="text-xs text-gray-400 hover:text-gray-600 transition-colors duration-150"
						onClick={() => setLiked((l) => !l)}
					>
						Reply
					</button>
					<button
						type="button"
						className="flex items-center gap-1 text-xs transition-colors duration-150"
						style={{ color: liked ? "#e0245e" : "#9ca3af" }}
						onClick={() => setLiked((l) => !l)}
						aria-label="Like comment"
					>
						<svg
							viewBox="0 0 24 24"
							className="w-3.5 h-3.5"
							fill={liked ? "currentColor" : "none"}
							stroke="currentColor"
							strokeWidth={2}
						>
							<title>Like</title>
							<path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
						</svg>
						{comment.likes + (liked ? 1 : 0)}
					</button>
				</div>
			</div>
		</div>
	);
};

/* ─── Main Section ───────────────────────────────────────────────────────── */
export const Leaderboard = () => {
	const ref = useRef<HTMLElement>(null);
	const [inView, setInView] = useState(false);

	useEffect(() => {
		const el = ref.current;
		if (!el) return;
		const obs = new IntersectionObserver(
			([entry]) => {
				if (entry.isIntersecting) {
					setInView(false);
					requestAnimationFrame(() => setTimeout(() => setInView(true), 80));
				} else {
					setInView(false);
				}
			},
			{ threshold: 0.15 },
		);
		obs.observe(el);
		return () => obs.disconnect();
	}, []);

	return (
		<section
			ref={ref}
			className="w-full bg-white font-(--font-family) py-24 sm:py-32"
		>
			<div className="max-w-3xl mx-auto px-6 sm:px-12">
				{/* Heading */}
				<div
					className="text-center mb-16"
					style={{
						opacity: inView ? 1 : 0,
						transform: inView ? "translateY(0)" : "translateY(20px)",
						transition: "opacity 500ms cubic-bezier(0.22,1,0.36,1), transform 500ms cubic-bezier(0.22,1,0.36,1)",
					}}
				>
					<h2 className="text-4xl sm:text-5xl tracking-tight text-gray-800">
						<span className="font-extralight italic text-gray-400">Top </span>
						<span
							className="font-black text-transparent bg-clip-text"
							style={{ backgroundImage: "linear-gradient(135deg, hsl(28 57% 59%) 0%, hsl(28 42% 35%) 100%)" }}
						>
							Supporters
						</span>
					</h2>
					<p className="text-sm text-gray-400 font-light tracking-widest uppercase mt-2">
						the people building this dream
					</p>
				</div>

				{/* Podium — order: 2nd | 1st | 3rd */}
				<div className="flex items-end justify-center gap-3 sm:gap-6 lg:gap-10 mb-20 scale-90 sm:scale-100">
					{DONORS.map((donor, i) => (
						<PodiumCard
							key={donor.rank}
							donor={donor}
							visible={inView}
							delay={i * 120}
						/>
					))}
				</div>

				{/* Divider */}
				<div className="flex items-center gap-4 mb-10">
					<div className="flex-1 h-px bg-linear-to-r from-transparent via-gray-200 to-transparent" />
					<p className="text-xs text-gray-300 tracking-widest uppercase font-medium px-2">Community Love</p>
					<div className="flex-1 h-px bg-linear-to-r from-transparent via-gray-200 to-transparent" />
				</div>

				{/* IG Comments */}
				<div className="flex flex-col gap-5">
					{COMMENTS.map((c, i) => (
						<IGComment key={c.handle} comment={c} visible={inView} delay={300 + i * 120} />
					))}
				</div>
			</div>
		</section>
	);
};
