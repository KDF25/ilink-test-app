import { Settings } from "lucide-react";

import { Button } from "@/shared/ui";

type TokenSettingsButtonProps = {
	onClick?: () => void;
};

export const TokenSettingsButton: React.FC<TokenSettingsButtonProps> = ({
	onClick
}) => (
	<Button
		variant="gray"
		size="icon"
		onClick={onClick}
		aria-label="Настройки токена"
	>
		<Settings size={20} className="text-border" />
	</Button>
);
