import { ICONS } from "@/shared/assets";

import type { NavigationItem } from "./types";

export const navigationConfig: NavigationItem[] = [
	{ name: "Trade", icon: ICONS.HomeIcon, path: "/" },
	{ name: "Positions", icon: ICONS.WaveIcon, path: "/positions" },
	{
		name: "Rewards",
		icon: ICONS.EggIcon,
		path: "/rewards",
		badge: "345,28k"
	},
	{ name: "Profile", icon: ICONS.UserIcon, path: "/profile" }
];
