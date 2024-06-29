export type Job =
	| {
			type: "warm-screenshot-feed-view-store";
			screenshotId: string;
	  }
	| {
			type: "warm-nft-screenshot-layer-store";
			screenshotId: string;
	  }
	| {
			type: "warm-livestream-screenshot-store";
			screenshotId: string;
	  };
