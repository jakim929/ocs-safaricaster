import { buttonVariants } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import { useLocation, Link } from "react-router-dom";

const items = [
	{
		title: "Safaricaster",
		to: "/safaricaster",
	},
];

export const SideNav = () => {
	const { pathname } = useLocation();

	return (
		<div className="flex">
			<nav className={cn("p-2 flex-1 flex flex-col space-y-2")}>
				{items.map((item) => (
					<Link
						key={item.to}
						to={item.to}
						className={cn(
							buttonVariants({ variant: "ghost" }),
							pathname === item.to
								? "bg-muted hover:bg-muted"
								: "hover:bg-transparent hover:underline",
							"justify-start",
						)}
					>
						{item.title}
					</Link>
				))}
			</nav>
			<Separator orientation="vertical" />
		</div>
	);
};
