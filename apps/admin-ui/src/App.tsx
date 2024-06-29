import { Toaster } from "@/components/ui/toaster";
import { Providers } from "@/Providers";
import { AppRoutes } from "@/router/AppRoutes";

function App() {
	return (
		<Providers>
			<Toaster />
			<AppRoutes />
		</Providers>
	);
}

export default App;
