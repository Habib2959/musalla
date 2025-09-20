import { useState } from "react";
import { DonationSection } from "../DonationSection";
import { Button } from "../ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../ui/dialog";
import { Badge } from "../ui/badge";
import {
	Heart,
	CreditCard,
	Mail,
	Building2,
	Banknote,
	Copy,
	CheckCircle2,
	ExternalLink,
	Phone,
} from "lucide-react";
import { useApiOnMount } from "../../lib/hooks/api-hooks";
import { SupabaseContentService } from "../../lib/services/supabase-content.service";

export function DonatePage() {
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [selectedAmount, setSelectedAmount] = useState<number | null>(null);
	const [selectedMethod, setSelectedMethod] = useState<string | null>(null);

	const quickAmounts = [25, 50, 100, 250, 500, 1000];

	// Fetch donation methods from API (same as MosqueProjectPage)
	const {
		data: donationData,
		loading: donationLoading,
		error: donationError,
	} = useApiOnMount(() => SupabaseContentService.getDonationMethods());

	// Extract donation methods from API, with fallback
	const apiDonationMethods = (donationData && donationData[0]?.value) || [];
	console.log("API Donation Methods:", apiDonationMethods, {
		donationData,
		donationLoading,
		donationError,
	});

	// Helper function to get icon and colors for donation methods
	const getDonationMethodConfig = (type: string) => {
		const configs = {
			interac: {
				icon: Mail,
				bgColor: "bg-blue-100",
				textColor: "text-blue-600",
				borderColor: "border-blue-200 hover:border-blue-400",
				buttonColor: "bg-blue-600 hover:bg-blue-700",
				badge: "Most Popular",
			},
			paypal: {
				icon: CreditCard,
				bgColor: "bg-yellow-100",
				textColor: "text-yellow-600",
				borderColor: "border-yellow-200 hover:border-yellow-400",
				buttonColor: "bg-yellow-500 hover:bg-yellow-600",
				badge: "",
			},
			card: {
				icon: CreditCard,
				bgColor: "bg-green-100",
				textColor: "text-green-600",
				borderColor: "border-green-200 hover:border-green-400",
				buttonColor: "bg-green-600 hover:bg-green-700",
				badge: "",
			},
			banking: {
				icon: Building2,
				bgColor: "bg-purple-100",
				textColor: "text-purple-600",
				borderColor: "border-purple-200 hover:border-purple-400",
				buttonColor: "bg-purple-600 hover:bg-purple-700",
				badge: "",
			},
			cash: {
				icon: Banknote,
				bgColor: "bg-gray-100",
				textColor: "text-gray-600",
				borderColor: "border-gray-200 hover:border-gray-400",
				buttonColor: "bg-gray-600 hover:bg-gray-700",
				badge: "",
			},
		};
		return configs[type] || configs.card;
	};

	// Use only API data for donation methods
	const activeDonationMethods =
		apiDonationMethods.length > 0
			? apiDonationMethods
					.filter((method) => method.isActive)
					.sort((a, b) => a.displayOrder - b.displayOrder)
			: [];

	const handleDonateClick = (amount?: number) => {
		setSelectedAmount(amount || null);
		setIsModalOpen(true);
	};

	const copyToClipboard = (text: string) => {
		navigator.clipboard.writeText(text);
	};

	const processDonation = () => {
		if (selectedMethod && selectedAmount) {
			const method = activeDonationMethods.find(
				(m) => m.id === selectedMethod || m.type === selectedMethod
			);
			if (method) {
				if (method.type === "paypal" && method.link) {
					window.open(
						`${method.link}${selectedAmount ? "/" + selectedAmount : ""}`,
						"_blank"
					);
				} else if (method.type === "interac" && method.email) {
					copyToClipboard(method.email);
				} else if (method.link) {
					window.open(method.link, "_blank");
				} else {
					// fallback
					console.log(`Processing ${selectedAmount} via ${selectedMethod}`);
				}
			}
			setIsModalOpen(false);
		}
	};

	return (
		<div className="min-h-screen bg-white/95 backdrop-blur-sm relative">
			{/* Hero Section */}
			<section className="py-24 bg-gradient-to-br from-green-700 via-green-600 to-green-800 text-white relative">
				<div className="absolute inset-0 bg-black opacity-20"></div>
				<div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
					<h1 className="text-4xl md:text-5xl mb-6">Support Our Community</h1>
					<p className="text-xl md:text-2xl max-w-2xl mx-auto mb-8">
						Your generous donations help us serve our community and strengthen
						our Islamic programs
					</p>

					{/* Quick Donate Buttons */}
					<div className="flex flex-wrap justify-center gap-4 mb-8">
						{quickAmounts.map((amount) => (
							<Button
								key={amount}
								onClick={() => handleDonateClick(amount)}
								variant="outline"
								className="border-2 border-white bg-transparent text-white hover:bg-white hover:text-green-700 px-6 py-3 text-lg font-medium rounded-full"
							>
								${amount}
							</Button>
						))}
					</div>

					<Button
						onClick={() => handleDonateClick()}
						size="lg"
						className="bg-white text-green-700 hover:bg-gray-100 px-8 py-4 text-lg font-medium rounded-full"
					>
						<Heart className="h-5 w-5 mr-2" />
						Choose Amount & Method
					</Button>
				</div>
			</section>

			{/* Donation Modal */}
			<Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
				<DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
					<DialogHeader>
						<DialogTitle className="text-2xl text-center mb-4">
							Complete Your Donation
						</DialogTitle>
					</DialogHeader>

					<div className="space-y-6">
						{/* Amount Selection */}
						<div>
							<h3 className="text-lg font-medium mb-4">
								Select Donation Amount
							</h3>
							<div className="grid grid-cols-3 md:grid-cols-6 gap-3 mb-4">
								{quickAmounts.map((amount) => (
									<Button
										key={amount}
										onClick={() => setSelectedAmount(amount)}
										variant={selectedAmount === amount ? "default" : "outline"}
										className={`py-3 ${
											selectedAmount === amount
												? "bg-green-600 hover:bg-green-700"
												: "border-green-600 text-green-600 hover:bg-green-50"
										}`}
									>
										${amount}
									</Button>
								))}
							</div>
							<div className="flex items-center gap-2">
								<span className="text-sm text-gray-600">
									Or enter custom amount: $
								</span>
								<input
									type="number"
									className="border border-gray-300 rounded px-3 py-2 text-center w-24"
									placeholder="0"
									onChange={(e) => setSelectedAmount(Number(e.target.value))}
								/>
							</div>
						</div>

						{/* Payment Method Selection */}
						<div>
							<h3 className="text-lg font-medium mb-4">
								Choose Payment Method
							</h3>
							<div className="grid md:grid-cols-2 gap-4">
								{activeDonationMethods.map((method) => {
									const config = getDonationMethodConfig(method.type);
									const Icon = config.icon;
									return (
										<Card
											key={method.id}
											className={`cursor-pointer transition-all duration-200 hover:shadow-md ${
												selectedMethod === method.id ||
												selectedMethod === method.type
													? "ring-2 ring-green-500 bg-green-50"
													: "hover:shadow-lg"
											}`}
											onClick={() =>
												setSelectedMethod(method.id || method.type)
											}
										>
											<CardContent className="p-4">
												<div className="flex items-start gap-3">
													<div
														className={`p-2 rounded-lg ${config.bgColor} ${config.textColor}`}
													>
														<Icon className={`h-5 w-5`} />
													</div>
													<div className="flex-1">
														<div className="flex items-center gap-2 mb-1">
															<h4 className="font-medium">{method.title}</h4>
															{config.badge && (
																<Badge
																	className={`${config.buttonColor} text-xs text-white`}
																>
																	{config.badge}
																</Badge>
															)}
														</div>
														{/* Description as bullet points if multiline */}
														{method.description &&
														method.description.includes("\n") ? (
															<ul className="text-xs text-gray-600 mb-2 list-disc list-inside space-y-1">
																{method.description
																	.split("\n")
																	.map((line, idx) => (
																		<li key={idx}>{line}</li>
																	))}
															</ul>
														) : (
															<p className="text-xs text-gray-600 mb-2">
																{method.description}
															</p>
														)}
														{/* Email */}
														{method.email && (
															<div className="mb-1">
																<span className="font-medium">Email:</span>{" "}
																<span className="font-mono">
																	{method.email}
																</span>
															</div>
														)}

														{/* Account Info */}
														{method.accountInfo && (
															<div className="mb-1">
																<span className="font-medium">
																	Account Info:
																</span>{" "}
																{method.accountInfo}
															</div>
														)}
														{/* Instructions */}
														{method.instructions && (
															<div className="mb-1">
																<span className="font-medium">
																	Instructions:
																</span>{" "}
																{method.instructions}
															</div>
														)}
													</div>
													{(selectedMethod === method.id ||
														selectedMethod === method.type) && (
														<CheckCircle2 className="h-5 w-5 text-green-600 flex-shrink-0" />
													)}
												</div>
											</CardContent>
										</Card>
									);
								})}
							</div>
						</div>

						{/* Selected Method Details */}
						{selectedMethod && (
							<div className="bg-blue-50 rounded-lg p-4">
								<h4 className="font-medium mb-2">Payment Instructions</h4>
								<p className="text-sm text-gray-700 mb-3">
									{(() => {
										const method = activeDonationMethods.find(
											(m) =>
												m.id === selectedMethod || m.type === selectedMethod
										);
										if (method && method.instructions)
											return method.instructions;
										if (method && method.type === "interac")
											return "Send e-transfer to this email. No security question required for auto-deposit.";
										if (method && method.type === "paypal")
											return "Click the PayPal button to be redirected to our secure payment page.";
										if (method && method.type === "banking")
											return "Add NWMIS as a payee in your online banking. Contact us for account details.";
										if (method && method.type === "cash")
											return "Visit during prayer times or community events. Speak with treasurer or board members.";
										return "";
									})()}
								</p>
								{(() => {
									const method = activeDonationMethods.find(
										(m) => m.id === selectedMethod || m.type === selectedMethod
									);
									if (method && method.type === "interac" && method.email) {
										return (
											<div className="flex items-center gap-2 p-3 bg-white rounded border">
												<span className="font-mono text-sm">
													{method.email}
												</span>
												<Button
													size="sm"
													variant="outline"
													onClick={() => copyToClipboard(method.email)}
												>
													<Copy className="h-4 w-4" />
												</Button>
											</div>
										);
									}
									return null;
								})()}
							</div>
						)}

						{/* Action Buttons */}
						<div className="flex flex-col sm:flex-row gap-3 pt-4 border-t">
							<Button
								onClick={() => setIsModalOpen(false)}
								variant="outline"
								className="flex-1"
							>
								Cancel
							</Button>
							<Button
								onClick={processDonation}
								disabled={!selectedAmount || !selectedMethod}
								className="flex-1 bg-green-600 hover:bg-green-700"
							>
								{selectedMethod === "paypal" ? (
									<>
										Continue to PayPal <ExternalLink className="h-4 w-4 ml-2" />
									</>
								) : selectedMethod === "etransfer" ? (
									<>
										Copy Email Address <Copy className="h-4 w-4 ml-2" />
									</>
								) : (
									<>
										Proceed with Donation <Heart className="h-4 w-4 ml-2" />
									</>
								)}
							</Button>
						</div>
					</div>
				</DialogContent>
			</Dialog>

			{/* Donation Content */}
			<div className="py-0">
				<DonationSection />
			</div>

			{/* Impact Section */}
			<section className="py-16 bg-gray-50">
				<div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
					<h2 className="text-3xl text-center text-gray-900 mb-12">
						Your Impact
					</h2>
					<div className="grid md:grid-cols-3 gap-8">
						<div className="text-center bg-white rounded-lg p-6 shadow-sm">
							<div className="text-3xl mb-4">🕌</div>
							<h3 className="text-xl text-gray-900 mb-3">Mosque Development</h3>
							<p className="text-gray-600">
								Help us build a permanent worship space for our growing
								community
							</p>
						</div>
						<div className="text-center bg-white rounded-lg p-6 shadow-sm">
							<div className="text-3xl mb-4">📚</div>
							<h3 className="text-xl text-gray-900 mb-3">Education Programs</h3>
							<p className="text-gray-600">
								Support Islamic education and Quran learning for all ages
							</p>
						</div>
						<div className="text-center bg-white rounded-lg p-6 shadow-sm">
							<div className="text-3xl mb-4">🤝</div>
							<h3 className="text-xl text-gray-900 mb-3">Community Support</h3>
							<p className="text-gray-600">
								Provide assistance to families and individuals in need
							</p>
						</div>
					</div>
				</div>
			</section>

			{/* Payment Methods Section */}
			<section className="py-16">
				<div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
					<h2 className="text-3xl text-center text-gray-900 mb-4">
						Multiple Ways to Give
					</h2>
					<p className="text-lg text-gray-600 text-center mb-12 max-w-2xl mx-auto">
						Choose the payment method that works best for you. All donations are
						secure and tax-deductible.
					</p>

					<div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
						{activeDonationMethods.map((method) => {
							const config = getDonationMethodConfig(method.type);
							const Icon = config.icon;
							return (
								<Card
									key={method.id}
									className={`hover:shadow-lg transition-shadow ${config.borderColor}`}
								>
									<CardHeader>
										<div className="flex items-center gap-3">
											<div
												className={`p-3 rounded-lg ${config.bgColor} ${config.textColor}`}
											>
												<Icon className="h-6 w-6" />
											</div>
											<div>
												<CardTitle className="text-lg">
													{method.title}
												</CardTitle>
												{config.badge && (
													<Badge
														className={`${config.buttonColor} text-xs text-white mt-1`}
													>
														{config.badge}
													</Badge>
												)}
											</div>
										</div>
									</CardHeader>
									<CardContent>
										{/* Description as bullet points if multiline */}
										{method.description && method.description.includes("\n") ? (
											<ul className="text-gray-600 mb-4 list-disc list-inside space-y-1">
												{method.description.split("\n").map((line, idx) => (
													<li key={idx}>{line}</li>
												))}
											</ul>
										) : (
											<p className="text-gray-600 mb-4">{method.description}</p>
										)}
										{/* Email */}
										{method.email && (
											<div className="mb-2">
												<span className="font-medium">Email:</span>{" "}
												<span className="font-mono">{method.email}</span>
											</div>
										)}
										{/* Link */}
										{method.link && (
											<div className="mb-2">
												<a
													href={method.link}
													target="_blank"
													rel="noopener noreferrer"
													className="inline-block bg-gradient-to-r from-blue-500 to-green-500 text-white font-semibold px-5 py-2 rounded-full shadow-md hover:from-green-600 hover:to-blue-600 hover:scale-105 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-400"
												>
													<span className="flex items-center gap-2">
														<svg
															xmlns="http://www.w3.org/2000/svg"
															className="h-5 w-5"
															fill="none"
															viewBox="0 0 24 24"
															stroke="currentColor"
														>
															<path
																strokeLinecap="round"
																strokeLinejoin="round"
																strokeWidth={2}
																d="M17 9V7a5 5 0 00-10 0v2a2 2 0 00-2 2v6a2 2 0 002 2h10a2 2 0 002-2v-6a2 2 0 00-2-2z"
															/>
															<path
																strokeLinecap="round"
																strokeLinejoin="round"
																strokeWidth={2}
																d="M12 17v.01"
															/>
														</svg>
														Donate Online
													</span>
												</a>
											</div>
										)}
										{/* Account Info */}
										{method.accountInfo && (
											<div className="mb-2">
												<span className="font-medium">Account Info:</span>{" "}
												{method.accountInfo}
											</div>
										)}
										{/* Instructions */}
										{method.instructions && (
											<div className="mb-2">
												<span className="font-medium">Instructions:</span>{" "}
												{method.instructions}
											</div>
										)}
									</CardContent>
								</Card>
							);
						})}
					</div>
				</div>
			</section>

			{/* Tax Information */}
			<section className="py-16 bg-gray-50">
				<div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
					<h2 className="text-2xl text-gray-900 mb-6">
						Tax Deductible Donations
					</h2>
					<p className="text-lg text-gray-600 mb-4">
						New Westminster Islamic Society is a registered charity in Canada.
					</p>
					<p className="text-gray-600">
						All donations are tax-deductible and you will receive an official
						receipt for your records. Our charitable registration number will be
						provided with your receipt.
					</p>
				</div>
			</section>

			{/* Become a Monthly Donor */}
			<section className="py-16 bg-gray-50">
				<div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
					<h2 className="text-2xl text-gray-900 mb-6">
						Become a Monthly Donor
					</h2>
					<p className="text-lg text-gray-600 mb-4">
						Support the House of Allah
					</p>
					<p className="text-gray-600">
						The Prophet Muhammad ﷺ said: “The most beloved of deeds to Allah are
						those that are consistent, even if small.” (Sahih Bukhari & Muslim).
						By becoming a monthly donor, you are not only helping to establish a
						permanent house of Allah in your community, but also securing
						continuous rewards for yourself in this world and the Hereafter.
					</p>
					<p className="text-gray-600">
						👉 Join today by filling out this pledge form below as a monthly
						donor and be part of building a lasting legacy for generations to
						come.
					</p>
				</div>
			</section>
		</div>
	);
}
