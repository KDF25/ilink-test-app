import { Heart } from "lucide-react";

import { Button } from "@/shared/ui";

type TokenFavoriteButtonProps = {
	onClick?: () => void;
};

export const TokenFavoriteButton: React.FC<TokenFavoriteButtonProps> = ({
	onClick
}) => (
	<Button
		variant="gray"
		size="icon"
		onClick={onClick}
		aria-label="Добавить в избранное"
	>
		<Heart size={20} className="text-border" fill="currentColor" />
	</Button>
);
