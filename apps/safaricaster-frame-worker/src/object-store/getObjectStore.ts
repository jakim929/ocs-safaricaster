import type { Bindings } from "@/Bindings";

export const getCachedObjectStore = <K>({
	bindings,
	basePath,
	shouldAlwaysRegenerate = false,
	keyFn,
	operationFn,
}: {
	bindings: Bindings;
	basePath: string;
	shouldAlwaysRegenerate?: boolean;
	keyFn: (params: K) => string;
	operationFn: (params: K) => Promise<ArrayBuffer>;
}) => {
	const getKey = (params: K) => `${basePath}/${keyFn(params)}`;

	const getAndStoreInCache = async (params: K) => {
		const object = await operationFn(params);
		const key = getKey(params);

		// TODO: consider ctx.waitUntil

		await bindings.SAFARICASTER_R2_BUCKET.put(key, object);

		return object;
	};

	return {
		get: async (params: K) => {
			const key = getKey(params);

			if (!shouldAlwaysRegenerate) {
				const storedValue = await bindings.SAFARICASTER_R2_BUCKET.get(key);

				if (storedValue) {
					return await storedValue.arrayBuffer();
				}
			}

			return await getAndStoreInCache(params);
		},

		getUrl: async (params: K) => {
			const key = getKey(params);
			const url = `${bindings.SAFARICASTER_R2_BUCKET_BASE_URL}/${key}`;

			if (!shouldAlwaysRegenerate) {
				const head = await bindings.SAFARICASTER_R2_BUCKET.head(key);
				if (!head) {
					await getAndStoreInCache(params);
				}
			} else {
				await getAndStoreInCache(params);
			}

			return url;
		},

		getUrlNoFetch: (params: K) => {
			const key = getKey(params);
			return `${bindings.SAFARICASTER_R2_BUCKET_BASE_URL}/${key}`;
		},

		getKey: (params: K) => getKey(params),
	};
};
