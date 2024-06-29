import type { Bindings } from "@/Bindings";
import { createPublicClient, http } from "viem";
import { baseSepolia } from "viem/chains";
import { base } from "viem/chains";

// TODO Fix to use non public RPCs: DRAFT READY
export const publicClient = (bindings: Bindings) => {
	return createPublicClient({
		chain: base,
		transport: http(bindings.CHAIN_RPC_URL),
	});
};
