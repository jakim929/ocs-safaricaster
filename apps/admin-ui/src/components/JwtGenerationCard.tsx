import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import jwtUtils from "@tsndr/cloudflare-worker-jwt";

import { Label } from "@/components/ui/label";
import { useState } from "react";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
} from "@/components/ui/dialog";
import { generateNewKeyPair, getPublicKeyFromPrivateKey } from "@/lib/ecdsa";
import { useToast } from "@/components/ui/use-toast";

// Obviously never use this private key EVER
// Intentionally leaked - do not use this in production
const placeholderPrivateKey = `-----BEGIN PRIVATE KEY-----
MIGHAgEAMBMGByqGSM49AgEGCCqGSM49AwEHBG0wawIBAQQgbT093BXN++uPXP5r
MRrWkd96BJ4321fMggnJQIdjis+hRANCAARZnf4zFJsvpGJoqo/ztDZcp4MtQC5D
XAwC6rFmNK9RBHO1akpyI2Z/eyUCFbZHOhFo4U+yvOhFBAqjOVdLhNI0
-----END PRIVATE KEY-----`;

const GenerationSuccessDialog = ({
	onOpenChange,
	successPayload,
}: {
	onOpenChange: (isOpen: boolean) => void;
	successPayload: SuccessPayload | null;
}) => {
	const { toast } = useToast();

	if (!successPayload) {
		return null;
	}

	const { publicKey, privateKey, jwt } = successPayload;
	return (
		<Dialog open={true} onOpenChange={onOpenChange}>
			<DialogContent>
				<DialogHeader>
					<DialogTitle>JWT Generated</DialogTitle>
					<DialogDescription>
						Copy the following details and store them securely.
					</DialogDescription>
				</DialogHeader>
				<div className="flex flex-col gap-2">
					<div className="flex flex-col gap-1.5">
						<div className="flex justify-between items-center">
							<Label htmlFor="jwt-string">JWT</Label>
							<Button
								size="sm"
								variant="outline"
								onClick={async () => {
									navigator.clipboard.writeText(jwt);
									toast({
										description: "Copied JWT",
									});
								}}
							>
								Copy
							</Button>
						</div>
						<Textarea
							readOnly
							rows={5}
							value={jwt}
							id="jwt-string"
							className="text-[0.7rem] font-mono resize-none"
							placeholder={placeholderPrivateKey}
						/>
					</div>
					<div className="flex flex-col gap-1.5">
						<div className="flex justify-between items-center">
							<Label htmlFor="ecdsa-private-key">Private key</Label>
							<Button
								size="sm"
								variant="outline"
								onClick={async () => {
									navigator.clipboard.writeText(privateKey);
									toast({
										description: "Copied Private Key",
									});
								}}
							>
								Copy
							</Button>
						</div>
						<Textarea
							readOnly
							rows={5}
							value={privateKey}
							id="ecdsa-private-key"
							className="text-[0.7rem] font-mono resize-none"
							placeholder={placeholderPrivateKey}
						/>
					</div>
					<div className="flex flex-col gap-1.5">
						<div className="flex justify-between items-center">
							<Label htmlFor="ecdsa-public-key">Public key</Label>
							<Button
								size="sm"
								variant="outline"
								onClick={async () => {
									navigator.clipboard.writeText(publicKey);
									toast({
										description: "Copied Public Key",
									});
								}}
							>
								Copy
							</Button>
						</div>
						<Textarea
							readOnly
							rows={4}
							value={publicKey}
							id="ecdsa-public-key"
							className="text-[0.7rem] font-mono resize-none"
							placeholder={placeholderPrivateKey}
						/>
					</div>
				</div>
			</DialogContent>
		</Dialog>
	);
};

type SuccessPayload = {
	name: string;
	jwt: string;
	publicKey: string;
	privateKey: string;
};

export const JwtGenerationCard = () => {
	const [signerPrivateKey, setSignerPrivateKey] = useState<string>("");
	const [name, setName] = useState<string>("");

	const [successPayload, setSuccessPayload] = useState<SuccessPayload | null>(
		null,
	);

	const isFormCompleted = name !== "" && signerPrivateKey !== "";

	return (
		<>
			<Card className="max-w-lg">
				<CardHeader>
					<CardTitle>Admin auth</CardTitle>
				</CardHeader>
				<CardContent className="flex flex-col gap-6">
					<div className="flex flex-col gap-2">
						<div className="flex justify-between items-center">
							<Label htmlFor="ecdsa-key">Signer private key</Label>
							<Button
								size="sm"
								variant="outline"
								onClick={async () => {
									const { privateKey } = await generateNewKeyPair();
									setSignerPrivateKey(privateKey.toString());
								}}
							>
								Generate new key
							</Button>
						</div>
						<div className="flex items-end space-x-2">
							<Textarea
								rows={5}
								value={signerPrivateKey}
								onChange={(e) => setSignerPrivateKey(e.target.value)}
								id="ecdsa-key"
								className="text-[0.7rem] font-mono resize-none"
								placeholder={placeholderPrivateKey}
							/>
						</div>
					</div>
					<div className="flex flex-col gap-1.5">
						<Label htmlFor="name">Name</Label>
						<Input
							type="text"
							id="name"
							placeholder="some-computer"
							value={name}
							onChange={(e) => setName(e.target.value)}
						/>
					</div>
				</CardContent>
				<CardFooter>
					<Button
						disabled={!isFormCompleted}
						onClick={async () => {
							const publicKey =
								await getPublicKeyFromPrivateKey(signerPrivateKey);

							const token = await jwtUtils.sign(
								{
									name,
									isAdmin: true,
								},
								signerPrivateKey,
								{
									algorithm: "ES256",
								},
							);

							setSuccessPayload({
								name,
								jwt: token,
								publicKey: publicKey,
								privateKey: signerPrivateKey,
							});
						}}
					>
						Create signed JWT
					</Button>
				</CardFooter>
			</Card>
			<GenerationSuccessDialog
				successPayload={successPayload}
				onOpenChange={(isOpen) => {
					if (!isOpen) {
						setSuccessPayload(null);
					}
				}}
			/>
		</>
	);
};
