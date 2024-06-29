import { BaseLayout } from "@/layouts/BaseLayout";
import { SafaricasterPage } from "@/pages/SafaricasterPage";
import {
	createBrowserRouter,
	Navigate,
	RouterProvider,
} from "react-router-dom";

const router = createBrowserRouter([
	{
		element: <BaseLayout />,
		children: [
			{
				path: "",
				element: <Navigate to="/safaricaster" />,
			},
			{
				path: "safaricaster",
				element: <SafaricasterPage />,
			},
		],
	},
]);

export const AppRoutes = () => <RouterProvider router={router} />;
