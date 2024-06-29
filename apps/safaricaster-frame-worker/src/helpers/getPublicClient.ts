import type { Bindings } from "@/Bindings";
import { createPublicClient, http } from "viem";

export const getPublicClient = (bindings: Bindings) => {
  return createPublicClient({
    transport: http(bindings.CHAIN_RPC_URL),
  });
};
