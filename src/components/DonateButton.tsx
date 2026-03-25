import { CoffeeIcon } from "@/components/CoffeeIcon";

interface DonateButtonProps {
	onClick?: () => void;
}

export const DonateButton = ({ onClick }: DonateButtonProps) => (
	<button
		type="button"
		onClick={onClick}
		className="
      group relative inline-flex items-center justify-center
      px-14 sm:px-20 py-3.5 sm:py-4
      bg-transparent text-driftwood-800/70
      font-semibold text-sm sm:text-base uppercase tracking-[0.25em]
      rounded-lg
      border-2 border-dashed border-driftwood-700/50
      transition-all duration-300
      hover:text-driftwood-600 hover:border-driftwood-400 hover:bg-driftwood-100/40
      active:scale-[0.97]
      focus:outline-none focus:ring-2 focus:ring-driftwood-200 focus:ring-offset-2 focus:ring-offset-driftwood-50
    "
	>
		Donate
		<CoffeeIcon className="ml-3 w-4 h-4 sm:w-5 sm:h-5 text-driftwood-600 transition-all duration-300 group-hover:translate-x-1 group-hover:text-driftwood-400" />
	</button>
);
