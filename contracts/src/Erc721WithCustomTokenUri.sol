// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import {ERC721} from "solady/tokens/ERC721.sol";
import {EIP712} from "solady/utils/EIP712.sol";
import {Ownable} from "solady/auth/Ownable.sol";
import {ECDSA} from "solady/utils/ECDSA.sol";

contract Erc721WithCustomTokenUri is ERC721, EIP712, Ownable {
    struct Issuance {
        string tokenUri;
        address recipient;
        uint256 nonce;
    }

    uint256 public currentTokenId;
    uint256 public mintPrice;
    bool public _paused;
    string private _name;
    string private _symbol;

    mapping(uint256 => string) public tokenUriByTokenId;
    mapping(uint256 => bool) public usedNonces;

    event Minted(address to, uint256 tokenId, string tokenUri);
    event Paused(address account);
    event Unpaused(address account);

    constructor(address _owner, uint256 _mintPrice, string memory name_, string memory symbol_) Ownable() {
        _initializeOwner(_owner);
        mintPrice = _mintPrice;
        _name = name_;
        _symbol = symbol_;
        _paused = false;
    }

    function name() public view override returns (string memory) {
        return _name;
    }

    function symbol() public view override returns (string memory) {
        return _symbol;
    }

    modifier whenNotPaused() {
        require(!_paused, "Pausable: paused");
        _;
    }

    modifier whenPaused() {
        require(_paused, "Pausable: not paused");
        _;
    }

    function pause() public onlyOwner whenNotPaused {
        _paused = true;
        emit Paused(msg.sender);
    }

    function unpause() public onlyOwner whenPaused {
        _paused = false;
        emit Unpaused(msg.sender);
    }

    function paused() public view returns (bool) {
        return _paused;
    }

    function mintTo(address _to, string memory _tokenUri) public onlyOwner whenNotPaused returns (uint256) {
        uint256 newTokenId = _setUriAndMint(_to, _tokenUri);
        return newTokenId;
    }

    function mintToWithSignature(address _to, Issuance calldata issuance, uint8 v, bytes32 r, bytes32 s)
        public
        payable
        whenNotPaused
        returns (uint256)
    {
        require(msg.value == mintPrice, "Mint fee is invalid");
        require(bytes(issuance.tokenUri).length > 0, "URI can't be empty");
        require(_to == issuance.recipient, "Recipient mismatch");
        require(usedNonces[issuance.nonce] == false, "Nonce already used");

        bytes32 digest = _hashTypedData(
            keccak256(
                abi.encode(
                    keccak256("Issuance(string tokenUri,address recipient,uint256 nonce)"),
                    keccak256(bytes(issuance.tokenUri)),
                    issuance.recipient,
                    issuance.nonce
                )
            )
        );
        address signer = ECDSA.recover(digest, v, r, s);
        require(signer == owner(), "Invalid signature");

        usedNonces[issuance.nonce] = true;

        uint256 newTokenId = _setUriAndMint(_to, issuance.tokenUri);

        return newTokenId;
    }

    function withdraw() public onlyOwner {
        payable(owner()).transfer(address(this).balance);
    }

    function tokenURI(uint256 id) public view override returns (string memory) {
        return tokenUriByTokenId[id];
    }

    function _domainNameAndVersion()
        internal
        pure
        override
        returns (string memory _domainName, string memory _domainVersion)
    {
        _domainName = "Erc721WithCustomTokenUri";
        _domainVersion = "1";
    }

    function _domainNameAndVersionMayChange() internal pure override returns (bool result) {
        result = false;
    }

    function getDomainSeparator() public view returns (bytes32 separator) {
        return _domainSeparator();
    }

    function _setUriAndMint(address _to, string memory _tokenUri) private whenNotPaused returns (uint256) {
        uint256 newTokenId = currentTokenId++;
        tokenUriByTokenId[newTokenId] = _tokenUri;
        _safeMint(_to, newTokenId);
        emit Minted(_to, newTokenId, _tokenUri);
        return newTokenId;
    }
}
