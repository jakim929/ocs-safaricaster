import { SideNav } from "@/components/SideNav";
import { Separator } from "@/components/ui/separator";
import { Outlet, Link } from "react-router-dom";

export const BaseLayout = () => {
	return (
		<div className="w-full h-full flex-1 flex flex-col">
			<div className="flex p-4 justify-between items-center">
				<Link className="font-mono text-lg font-semibold" to="/">
					<div className="flex flex-col text-sm">
						<div>DailyTeam Admin</div>
					</div>
				</Link>
			</div>
			<Separator />
			<div className="flex-1 flex">
				<SideNav />
				<div className="flex-1 flex flex-col bg-muted/40">
					<Outlet />
				</div>
			</div>
		</div>
	);
};
