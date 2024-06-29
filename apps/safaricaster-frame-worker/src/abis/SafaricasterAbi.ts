export const SafaricasterAbi = [
	{
		type: "constructor",
		inputs: [
			{
				name: "_owner",
				type: "address",
				internalType: "address",
			},
			{
				name: "_mintPrice",
				type: "uint256",
				internalType: "uint256",
			},
			{
				name: "name_",
				type: "string",
				internalType: "string",
			},
			{
				name: "symbol_",
				type: "string",
				internalType: "string",
			},
		],
		stateMutability: "nonpayable",
	},
	{
		type: "function",
		name: "_paused",
		inputs: [],
		outputs: [
			{
				name: "",
				type: "bool",
				internalType: "bool",
			},
		],
		stateMutability: "view",
	},
	{
		type: "function",
		name: "approve",
		inputs: [
			{
				name: "account",
				type: "address",
				internalType: "address",
			},
			{
				name: "id",
				type: "uint256",
				internalType: "uint256",
			},
		],
		outputs: [],
		stateMutability: "payable",
	},
	{
		type: "function",
		name: "balanceOf",
		inputs: [
			{
				name: "owner",
				type: "address",
				internalType: "address",
			},
		],
		outputs: [
			{
				name: "result",
				type: "uint256",
				internalType: "uint256",
			},
		],
		stateMutability: "view",
	},
	{
		type: "function",
		name: "cancelOwnershipHandover",
		inputs: [],
		outputs: [],
		stateMutability: "payable",
	},
	{
		type: "function",
		name: "completeOwnershipHandover",
		inputs: [
			{
				name: "pendingOwner",
				type: "address",
				internalType: "address",
			},
		],
		outputs: [],
		stateMutability: "payable",
	},
	{
		type: "function",
		name: "currentTokenId",
		inputs: [],
		outputs: [
			{
				name: "",
				type: "uint256",
				internalType: "uint256",
			},
		],
		stateMutability: "view",
	},
	{
		type: "function",
		name: "eip712Domain",
		inputs: [],
		outputs: [
			{
				name: "fields",
				type: "bytes1",
				internalType: "bytes1",
			},
			{
				name: "name",
				type: "string",
				internalType: "string",
			},
			{
				name: "version",
				type: "string",
				internalType: "string",
			},
			{
				name: "chainId",
				type: "uint256",
				internalType: "uint256",
			},
			{
				name: "verifyingContract",
				type: "address",
				internalType: "address",
			},
			{
				name: "salt",
				type: "bytes32",
				internalType: "bytes32",
			},
			{
				name: "extensions",
				type: "uint256[]",
				internalType: "uint256[]",
			},
		],
		stateMutability: "view",
	},
	{
		type: "function",
		name: "getApproved",
		inputs: [
			{
				name: "id",
				type: "uint256",
				internalType: "uint256",
			},
		],
		outputs: [
			{
				name: "result",
				type: "address",
				internalType: "address",
			},
		],
		stateMutability: "view",
	},
	{
		type: "function",
		name: "getDomainSeparator",
		inputs: [],
		outputs: [
			{
				name: "separator",
				type: "bytes32",
				internalType: "bytes32",
			},
		],
		stateMutability: "view",
	},
	{
		type: "function",
		name: "isApprovedForAll",
		inputs: [
			{
				name: "owner",
				type: "address",
				internalType: "address",
			},
			{
				name: "operator",
				type: "address",
				internalType: "address",
			},
		],
		outputs: [
			{
				name: "result",
				type: "bool",
				internalType: "bool",
			},
		],
		stateMutability: "view",
	},
	{
		type: "function",
		name: "mintPrice",
		inputs: [],
		outputs: [
			{
				name: "",
				type: "uint256",
				internalType: "uint256",
			},
		],
		stateMutability: "view",
	},
	{
		type: "function",
		name: "mintTo",
		inputs: [
			{
				name: "_to",
				type: "address",
				internalType: "address",
			},
			{
				name: "_tokenUri",
				type: "string",
				internalType: "string",
			},
		],
		outputs: [
			{
				name: "",
				type: "uint256",
				internalType: "uint256",
			},
		],
		stateMutability: "nonpayable",
	},
	{
		type: "function",
		name: "mintToWithSignature",
		inputs: [
			{
				name: "_to",
				type: "address",
				internalType: "address",
			},
			{
				name: "issuance",
				type: "tuple",
				internalType: "struct Erc721WithCustomTokenUri.Issuance",
				components: [
					{
						name: "tokenUri",
						type: "string",
						internalType: "string",
					},
					{
						name: "recipient",
						type: "address",
						internalType: "address",
					},
					{
						name: "nonce",
						type: "uint256",
						internalType: "uint256",
					},
				],
			},
			{
				name: "v",
				type: "uint8",
				internalType: "uint8",
			},
			{
				name: "r",
				type: "bytes32",
				internalType: "bytes32",
			},
			{
				name: "s",
				type: "bytes32",
				internalType: "bytes32",
			},
		],
		outputs: [
			{
				name: "",
				type: "uint256",
				internalType: "uint256",
			},
		],
		stateMutability: "payable",
	},
	{
		type: "function",
		name: "name",
		inputs: [],
		outputs: [
			{
				name: "",
				type: "string",
				internalType: "string",
			},
		],
		stateMutability: "view",
	},
	{
		type: "function",
		name: "owner",
		inputs: [],
		outputs: [
			{
				name: "result",
				type: "address",
				internalType: "address",
			},
		],
		stateMutability: "view",
	},
	{
		type: "function",
		name: "ownerOf",
		inputs: [
			{
				name: "id",
				type: "uint256",
				internalType: "uint256",
			},
		],
		outputs: [
			{
				name: "result",
				type: "address",
				internalType: "address",
			},
		],
		stateMutability: "view",
	},
	{
		type: "function",
		name: "ownershipHandoverExpiresAt",
		inputs: [
			{
				name: "pendingOwner",
				type: "address",
				internalType: "address",
			},
		],
		outputs: [
			{
				name: "result",
				type: "uint256",
				internalType: "uint256",
			},
		],
		stateMutability: "view",
	},
	{
		type: "function",
		name: "pause",
		inputs: [],
		outputs: [],
		stateMutability: "nonpayable",
	},
	{
		type: "function",
		name: "paused",
		inputs: [],
		outputs: [
			{
				name: "",
				type: "bool",
				internalType: "bool",
			},
		],
		stateMutability: "view",
	},
	{
		type: "function",
		name: "renounceOwnership",
		inputs: [],
		outputs: [],
		stateMutability: "payable",
	},
	{
		type: "function",
		name: "requestOwnershipHandover",
		inputs: [],
		outputs: [],
		stateMutability: "payable",
	},
	{
		type: "function",
		name: "safeTransferFrom",
		inputs: [
			{
				name: "from",
				type: "address",
				internalType: "address",
			},
			{
				name: "to",
				type: "address",
				internalType: "address",
			},
			{
				name: "id",
				type: "uint256",
				internalType: "uint256",
			},
		],
		outputs: [],
		stateMutability: "payable",
	},
	{
		type: "function",
		name: "safeTransferFrom",
		inputs: [
			{
				name: "from",
				type: "address",
				internalType: "address",
			},
			{
				name: "to",
				type: "address",
				internalType: "address",
			},
			{
				name: "id",
				type: "uint256",
				internalType: "uint256",
			},
			{
				name: "data",
				type: "bytes",
				internalType: "bytes",
			},
		],
		outputs: [],
		stateMutability: "payable",
	},
	{
		type: "function",
		name: "setApprovalForAll",
		inputs: [
			{
				name: "operator",
				type: "address",
				internalType: "address",
			},
			{
				name: "isApproved",
				type: "bool",
				internalType: "bool",
			},
		],
		outputs: [],
		stateMutability: "nonpayable",
	},
	{
		type: "function",
		name: "supportsInterface",
		inputs: [
			{
				name: "interfaceId",
				type: "bytes4",
				internalType: "bytes4",
			},
		],
		outputs: [
			{
				name: "result",
				type: "bool",
				internalType: "bool",
			},
		],
		stateMutability: "view",
	},
	{
		type: "function",
		name: "symbol",
		inputs: [],
		outputs: [
			{
				name: "",
				type: "string",
				internalType: "string",
			},
		],
		stateMutability: "view",
	},
	{
		type: "function",
		name: "tokenURI",
		inputs: [
			{
				name: "id",
				type: "uint256",
				internalType: "uint256",
			},
		],
		outputs: [
			{
				name: "",
				type: "string",
				internalType: "string",
			},
		],
		stateMutability: "view",
	},
	{
		type: "function",
		name: "tokenUriByTokenId",
		inputs: [
			{
				name: "",
				type: "uint256",
				internalType: "uint256",
			},
		],
		outputs: [
			{
				name: "",
				type: "string",
				internalType: "string",
			},
		],
		stateMutability: "view",
	},
	{
		type: "function",
		name: "transferFrom",
		inputs: [
			{
				name: "from",
				type: "address",
				internalType: "address",
			},
			{
				name: "to",
				type: "address",
				internalType: "address",
			},
			{
				name: "id",
				type: "uint256",
				internalType: "uint256",
			},
		],
		outputs: [],
		stateMutability: "payable",
	},
	{
		type: "function",
		name: "transferOwnership",
		inputs: [
			{
				name: "newOwner",
				type: "address",
				internalType: "address",
			},
		],
		outputs: [],
		stateMutability: "payable",
	},
	{
		type: "function",
		name: "unpause",
		inputs: [],
		outputs: [],
		stateMutability: "nonpayable",
	},
	{
		type: "function",
		name: "usedNonces",
		inputs: [
			{
				name: "",
				type: "uint256",
				internalType: "uint256",
			},
		],
		outputs: [
			{
				name: "",
				type: "bool",
				internalType: "bool",
			},
		],
		stateMutability: "view",
	},
	{
		type: "function",
		name: "withdraw",
		inputs: [],
		outputs: [],
		stateMutability: "nonpayable",
	},
	{
		type: "event",
		name: "Approval",
		inputs: [
			{
				name: "owner",
				type: "address",
				indexed: true,
				internalType: "address",
			},
			{
				name: "account",
				type: "address",
				indexed: true,
				internalType: "address",
			},
			{
				name: "id",
				type: "uint256",
				indexed: true,
				internalType: "uint256",
			},
		],
		anonymous: false,
	},
	{
		type: "event",
		name: "ApprovalForAll",
		inputs: [
			{
				name: "owner",
				type: "address",
				indexed: true,
				internalType: "address",
			},
			{
				name: "operator",
				type: "address",
				indexed: true,
				internalType: "address",
			},
			{
				name: "isApproved",
				type: "bool",
				indexed: false,
				internalType: "bool",
			},
		],
		anonymous: false,
	},
	{
		type: "event",
		name: "Minted",
		inputs: [
			{
				name: "to",
				type: "address",
				indexed: false,
				internalType: "address",
			},
			{
				name: "tokenId",
				type: "uint256",
				indexed: false,
				internalType: "uint256",
			},
			{
				name: "tokenUri",
				type: "string",
				indexed: false,
				internalType: "string",
			},
		],
		anonymous: false,
	},
	{
		type: "event",
		name: "OwnershipHandoverCanceled",
		inputs: [
			{
				name: "pendingOwner",
				type: "address",
				indexed: true,
				internalType: "address",
			},
		],
		anonymous: false,
	},
	{
		type: "event",
		name: "OwnershipHandoverRequested",
		inputs: [
			{
				name: "pendingOwner",
				type: "address",
				indexed: true,
				internalType: "address",
			},
		],
		anonymous: false,
	},
	{
		type: "event",
		name: "OwnershipTransferred",
		inputs: [
			{
				name: "oldOwner",
				type: "address",
				indexed: true,
				internalType: "address",
			},
			{
				name: "newOwner",
				type: "address",
				indexed: true,
				internalType: "address",
			},
		],
		anonymous: false,
	},
	{
		type: "event",
		name: "Paused",
		inputs: [
			{
				name: "account",
				type: "address",
				indexed: false,
				internalType: "address",
			},
		],
		anonymous: false,
	},
	{
		type: "event",
		name: "Transfer",
		inputs: [
			{
				name: "from",
				type: "address",
				indexed: true,
				internalType: "address",
			},
			{
				name: "to",
				type: "address",
				indexed: true,
				internalType: "address",
			},
			{
				name: "id",
				type: "uint256",
				indexed: true,
				internalType: "uint256",
			},
		],
		anonymous: false,
	},
	{
		type: "event",
		name: "Unpaused",
		inputs: [
			{
				name: "account",
				type: "address",
				indexed: false,
				internalType: "address",
			},
		],
		anonymous: false,
	},
	{
		type: "error",
		name: "AccountBalanceOverflow",
		inputs: [],
	},
	{
		type: "error",
		name: "AlreadyInitialized",
		inputs: [],
	},
	{
		type: "error",
		name: "BalanceQueryForZeroAddress",
		inputs: [],
	},
	{
		type: "error",
		name: "NewOwnerIsZeroAddress",
		inputs: [],
	},
	{
		type: "error",
		name: "NoHandoverRequest",
		inputs: [],
	},
	{
		type: "error",
		name: "NotOwnerNorApproved",
		inputs: [],
	},
	{
		type: "error",
		name: "TokenAlreadyExists",
		inputs: [],
	},
	{
		type: "error",
		name: "TokenDoesNotExist",
		inputs: [],
	},
	{
		type: "error",
		name: "TransferFromIncorrectOwner",
		inputs: [],
	},
	{
		type: "error",
		name: "TransferToNonERC721ReceiverImplementer",
		inputs: [],
	},
	{
		type: "error",
		name: "TransferToZeroAddress",
		inputs: [],
	},
	{
		type: "error",
		name: "Unauthorized",
		inputs: [],
	},
] as const;
