DROP TABLE IF EXISTS screenshots;

CREATE TABLE IF NOT EXISTS screenshots (
    id TEXT NOT NULL PRIMARY KEY,
    image_object_key VARCHAR(255) NOT NULL,
    animal_id VARCHAR(255),
    timestamp TIMESTAMP NOT NULL,
    are_transformations_cached BOOLEAN NOT NULL,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
	updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_screenshots_timestamp_are_transformations_cached ON screenshots (timestamp, are_transformations_cached);
CREATE INDEX IF NOT EXISTS idx_screenshots_animal_id ON screenshots (animal_id);

DROP TABLE IF EXISTS views;

CREATE TABLE IF NOT EXISTS views (
    id TEXT NOT NULL PRIMARY KEY,
    screenshot_id TEXT NOT NULL,
    fid INTEGER NOT NULL,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
	updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);
CREATE INDEX IF NOT EXISTS unique_idx_views_fid_screenshot_id ON views (fid, screenshot_id);
CREATE INDEX IF NOT EXISTS idx_views_screenshot_id ON views (screenshot_id);


DROP TABLE IF EXISTS mint_permits;

CREATE TABLE IF NOT EXISTS mint_permits (
    id TEXT NOT NULL PRIMARY KEY,
    screenshot_id TEXT NOT NULL,
    animal_id VARCHAR(255),
    fid INTEGER NOT NULL,
    chain_id TEXT NOT NULL,
    recipient TEXT NOT NULL,
    nonce TEXT NOT NULL,
    signature TEXT NOT NULL,
    image_object_key TEXT NOT NULL,
    token_uri TEXT NOT NULL,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE UNIQUE INDEX IF NOT EXISTS unique_idx_mint_permits_fid_screenshot_id ON mint_permits (fid, screenshot_id);

DROP TABLE IF EXISTS mints;

CREATE TABLE IF NOT EXISTS mints (
    id TEXT NOT NULL PRIMARY KEY,
    screenshot_id TEXT NOT NULL,
    image_object_key TEXT NOT NULL,
    fid INTEGER NOT NULL,
    chain_id TEXT NOT NULL,
    recipient TEXT NOT NULL,
    transactionHash TEXT NOT NULL,
    tokenId TEXT NOT NULL,
    tokenUri TEXT NOT NULL,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

DROP TABLE IF EXISTS contract_indexing_states;

CREATE TABLE IF NOT EXISTS contract_indexing_states (
    id TEXT NOT NULL PRIMARY KEY,
    chain_id TEXT NOT NULL,
    address TEXT NOT NULL,
    block_number INTEGER NOT NULL,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE UNIQUE INDEX IF NOT EXISTS unique_idx_contract_indexing_states_chain_id_address ON contract_indexing_states (chain_id, address);