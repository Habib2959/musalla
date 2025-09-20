import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import { Progress } from "../ui/progress";
import {
	Heart,
	Home,
	Users,
	Calendar,
	MapPin,
	Target,
	CheckCircle,
	Mail,
	Phone,
	CreditCard,
	Copy,
	BookOpen,
	Utensils,
	Car,
	Accessibility,
	Leaf,
	Building2,
	Star,
	ArrowRight,
	Gift,
	GraduationCap,
	Baby,
	HandHeart,
	Banknote,
	Building,
	HeartHandshake,
	Loader2,
} from "lucide-react";
import { useRouter } from "../Router";
import { useApiOnMount } from "../../lib/hooks/api-hooks";
import { SupabaseContentService } from "../../lib/services/supabase-content.service";
import { Alert, AlertDescription } from "../ui/alert";
import { ProjectProgress, DonationMethod } from "../../lib/types";

export function MosqueProjectPage() {
	const { navigateTo } = useRouter();

	// API call to fetch project progress data
	const {
		data: projectData,
		loading,
		error,
	} = useApiOnMount(() => SupabaseContentService.getProjectProgress());

	// API call to fetch donation methods
	const {
		data: donationData,
		loading: donationLoading,
		error: donationError,
	} = useApiOnMount(() => SupabaseContentService.getDonationMethods());

	// Extract project progress info, with fallbacks
	const projectProgress =
		projectData && projectData[0]?.value ? projectData[0].value : {};

	// Extract donation methods from API, with fallbacks
	const apiDonationMethods = (donationData && donationData[0]?.value) || [];

	// Use API data with fallbacks to static data
	const projectGoal = projectProgress.target || 50000;
	const currentAmount = projectProgress.raised || 32000;
	const progressPercentage = Math.round((currentAmount / projectGoal) * 100);
	const contributors = projectProgress.contributors || 150;
	const mission =
		projectProgress.mission ||
		"To serve Allah and strengthen our Ummah through worship, education, and community service based on Quranic teachings.";
	const vision =
		projectProgress.vision ||
		"To establish a comprehensive Islamic center that serves as a beacon of faith, Islamic knowledge and community unity.";
	const goals = projectProgress.goals || [];

	// Icon mapping for dynamic icons from API
	const iconMap = {
		Building: Building,
		Building2: Building2,
		Heart: Heart,
		GraduationCap: GraduationCap,
		BookOpen: BookOpen,
		Users: Users,
		Baby: Baby,
		HeartHandshake: HeartHandshake,
		HandHeart: HandHeart,
		Utensils: Utensils,
		Car: Car,
		Accessibility: Accessibility,
		Leaf: Leaf,
	};

	const visionPoints = [
		{
			icon: Building2,
			title: "Our Islamic Mission",
			description: mission,
		},
		{
			icon: Heart,
			title: "Our Sacred Vision",
			description: vision,
		},
	];

	// Combined project goals and planned features with better icons
	const projectFeaturesAndGoals =
		goals.length > 0
			? goals.map((goal) => ({
					icon: iconMap[goal.icon] || Building2,
					title: goal.title,
					description: goal.description,
					completed: goal.completed,
					category: "dynamic",
			  }))
			: [
					// Fallback static data if API fails
					{
						icon: Building2,
						title: "Establish a large masjid with comprehensive facilities",
						description:
							"Creating a spacious worship center for our growing community",
						category: "worship",
					},
					{
						icon: Heart,
						title: "Provide funeral services for the deceased",
						description:
							"Offering dignified Islamic funeral services and support",
						category: "services",
					},
					{
						icon: GraduationCap,
						title: "Create separate fulltime madrashas for boys and girls",
						description:
							"Comprehensive Islamic education in dedicated facilities",
						category: "education",
					},
					{
						icon: BookOpen,
						title: "Offer afternoon Islamic schools for all grades",
						description: "After-school Islamic education programs for children",
						category: "education",
					},
					{
						icon: Users,
						title: "Implement full time and part time Tahfiz programs",
						description:
							"Quran memorization programs for different commitment levels",
						category: "education",
					},
					{
						icon: Baby,
						title: "Develop orphanage care and outreach program",
						description: "Supporting orphaned children and vulnerable families",
						category: "services",
					},
					{
						icon: HandHeart,
						title: "Organize social and community service initiatives",
						description: "Building bridges and serving the wider community",
						category: "community",
					},
					{
						icon: Utensils,
						title: "Community Kitchen & Event Facilities",
						description: "Modern kitchen and halls for events and gatherings",
						category: "facilities",
					},
					{
						icon: Car,
						title: "Parking Facility",
						description: "Ample parking for community members and visitors",
						category: "facilities",
					},
					{
						icon: Accessibility,
						title: "Accessible Design",
						description: "Full accessibility for all community members",
						category: "facilities",
					},
					{
						icon: Leaf,
						title: "Eco-Friendly Construction",
						description: "Sustainable building practices and materials",
						category: "facilities",
					},
			  ];

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

	// Static fallback donation methods if API fails
	const staticDonationMethods = [
		{
			id: "interac",
			type: "interac",
			title: "Interact E-Transfer",
			description: "Send money directly from your bank account with no fees",
			email: "nwmis.bc@gmail.com",
			isActive: true,
			link: "",
			displayOrder: 1,
		},
		{
			id: "paypal",
			type: "paypal",
			title: "PayPal",
			description: "Pay securely with PayPal account or any credit/debit card",
			email: "",
			isActive: true,
			link: "",
			displayOrder: 2,
		},
	];

	// Use API data with fallback to static data
	const activeDonationMethods =
		apiDonationMethods.length > 0
			? apiDonationMethods
					.filter((method) => method.isActive)
					.sort((a, b) => a.displayOrder - b.displayOrder)
			: staticDonationMethods;

	return (
		<div className="min-h-screen bg-white/95 backdrop-blur-sm relative">
			{/* Error State */}
			{(error || donationError) && (
				<div className="bg-red-50 border-l-4 border-red-500 p-4 mb-6">
					<Alert>
						<AlertDescription>
							Unable to load {error ? "project" : ""}
							{error && donationError ? " and " : ""}
							{donationError ? "donation" : ""} data. Showing default
							information.
							{import.meta.env.DEV &&
								` Error: ${error?.message || donationError?.message}`}
						</AlertDescription>
					</Alert>
				</div>
			)}

			{/* Hero Section with Mosque Background */}
			<section className="py-32 bg-gradient-to-br from-green-700 via-green-600 to-green-800 text-white relative overflow-hidden min-h-[80vh] flex items-center">
				<div className="absolute inset-0 bg-black/30"></div>

				{/* Mosque Silhouette */}
				<div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-full max-w-md opacity-30">
					<svg viewBox="0 0 400 200" className="w-full h-auto">
						<path
							d="M50 180 L50 120 Q50 100 70 100 L90 100 L90 80 Q90 60 110 60 L130 60 Q140 60 140 70 L140 80 L160 80 L160 50 Q160 30 180 30 L220 30 Q240 30 240 50 L240 80 L260 80 L260 70 Q260 60 270 60 L290 60 Q310 60 310 80 L310 100 L330 100 Q350 100 350 120 L350 180 Z"
							fill="currentColor"
						/>
						<circle cx="200" cy="50" r="25" fill="currentColor" />
						<rect x="190" y="25" width="20" height="30" fill="currentColor" />
						<circle cx="120" cy="70" r="15" fill="currentColor" />
						<circle cx="280" cy="70" r="15" fill="currentColor" />
					</svg>
				</div>

				<div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center z-10">
					<h1 className="text-5xl md:text-6xl font-light mb-8 tracking-tight">
						Building Our Sacred
						<br />
						<span className="text-green-200">Mosque</span>
					</h1>
					<p className="text-xl md:text-2xl max-w-3xl mx-auto mb-12 leading-relaxed font-light">
						A comprehensive Islamic center serving as a beacon of faith,
						education, and community service in the heart of British Columbia.
					</p>

					{/* Location Card */}
					<div className="inline-block bg-white/20 backdrop-blur-md rounded-lg px-6 py-4 border border-white/30">
						<div className="flex items-center gap-3 text-white">
							<MapPin className="h-5 w-5" />
							<div>
								<p className="font-medium">New Location</p>
								<p className="text-sm text-green-100">Marpole, Vancouver</p>
							</div>
						</div>
					</div>
				</div>
			</section>

			{/* Vision Section */}
			<section className="py-20">
				<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
					<div className="grid lg:grid-cols-5 gap-12 items-start">
						{/* Left Side - Vision Text */}
						<div className="lg:col-span-3">
							<div className="mb-6">
								<Badge className="bg-green-100 text-green-800 hover:bg-green-200 mb-4">
									Our Aspiration for the Ummah
								</Badge>
								<h2 className="text-4xl font-light mb-6 tracking-tight">
									Help Us Build
									<br />
									<span className="text-green-600">the House of Allah</span>
								</h2>
							</div>

							<div className="space-y-6 text-lg text-gray-700 leading-relaxed mb-8">
								<p>
									The New Westminster Islamic Society (NWMIS) is actively
									seeking a permanent property near Marpole, Vancouver, BC,
									Canada, to establish a mosque and permanent Islamic centre
									that will serve as a beacon of faith and community for
									generations, InshāAllāh.
								</p>
								<p>
									With the help of Allah ﷻ, this Masjid will become a vibrant
									centre that nurtures Islamic values, promotes lifelong
									learning, and provides essential services to Muslims across
									Greater Vancouver and beyond. The Prophet ﷺ said: “Whoever
									builds a mosque for the sake of Allah, Allah will build for
									him a house in Paradise.” (Sahih Bukhari). Donate generously
									and invest in your home in Paradise.
								</p>
								<p>
									Our vision is to create a welcoming place of worship, a centre
									of excellence for Islamic education, and a gathering space
									where families and individuals can connect, grow, and
									contribute positively to society. This Masjid will stand as a
									landmark reflecting the beauty of Islam and the strength of a
									united Ummah.
								</p>
							</div>
						</div>

						{/* Right Side - Progress Section (from HomePage) */}
						<div className="lg:col-span-2">
							<Card className="shadow-lg border-0 sticky top-8">
								<CardHeader className="text-center pb-6">
									{loading ? (
										<div className="space-y-3">
											<div className="h-12 bg-gray-200 rounded animate-pulse"></div>
											<div className="h-6 bg-gray-200 rounded animate-pulse"></div>
										</div>
									) : (
										<>
											<div className="text-5xl font-light text-green-600 mb-2">
												${currentAmount.toLocaleString()}
											</div>
											<div className="text-lg text-gray-600">
												raised of ${projectGoal.toLocaleString()} goal
											</div>
										</>
									)}
								</CardHeader>
								<CardContent className="space-y-6">
									<div className="space-y-2">
										<div className="flex justify-between text-sm font-medium">
											<span>Progress</span>
											<span>
												{loading ? "..." : `${progressPercentage}% Complete`}
											</span>
										</div>
										{loading ? (
											<div className="h-3 bg-gray-200 rounded animate-pulse"></div>
										) : (
											<Progress value={progressPercentage} className="h-3" />
										)}
									</div>

									<div className="grid md:grid-cols-3 gap-4 text-center">
										<div className="bg-blue-50 rounded-xl p-4">
											{loading ? (
												<div className="space-y-2">
													<div className="h-8 bg-gray-200 rounded animate-pulse"></div>
													<div className="h-4 bg-gray-200 rounded animate-pulse"></div>
												</div>
											) : (
												<>
													<div className="text-2xl font-light text-blue-600 mb-1">
														{contributors}+
													</div>
													<div className="text-gray-600 text-sm font-medium">
														Contributors
													</div>
												</>
											)}
										</div>
										<div className="bg-purple-50 rounded-xl p-4">
											<div className="text-2xl font-light text-purple-600 mb-1">
												18
											</div>
											<div className="text-gray-600 text-sm font-medium">
												Months Timeline
											</div>
										</div>
										<div className="bg-orange-50 rounded-xl p-4">
											{loading ? (
												<div className="space-y-2">
													<div className="h-8 bg-gray-200 rounded animate-pulse"></div>
													<div className="h-4 bg-gray-200 rounded animate-pulse"></div>
												</div>
											) : (
												<>
													<div className="text-2xl font-light text-orange-600 mb-1">
														${(projectGoal - currentAmount).toLocaleString()}
													</div>
													<div className="text-gray-600 text-sm font-medium">
														Remaining
													</div>
												</>
											)}
										</div>
									</div>

									<div className="flex flex-col sm:flex-row gap-4 pt-4">
										<Button
											onClick={() => navigateTo("donate")}
											size="lg"
											className="flex-1 bg-green-600 hover:bg-green-700 text-lg py-6 rounded-full transition-all duration-300 hover:scale-105"
										>
											<Heart className="mr-2 h-5 w-5" />
											Support the Mosque
										</Button>
										<Button
											onClick={() => navigateTo("mosque-project")}
											size="lg"
											variant="outline"
											className="flex-1 border-2 border-green-600 text-green-600 hover:bg-green-50 text-lg py-6 rounded-full transition-all duration-300 hover:scale-105"
										>
											<Building2 className="mr-2 h-5 w-5" />
											Learn More
										</Button>
									</div>
								</CardContent>
							</Card>
						</div>
					</div>
				</div>
			</section>

			{/* Building Our Islamic Community Center - Combined Goals and Features */}
			<section className="py-20 bg-gray-50">
				<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
					{/* Project Goals from HomePage as a Card */}
					<div className="mb-16">
						<Card className="shadow-lg border-0 bg-gradient-to-br from-green-50 to-emerald-50">
							<CardHeader>
								<CardTitle className="text-2xl text-green-900 text-center">
									Project Goals & Planned Features
								</CardTitle>
							</CardHeader>
							<CardContent>
								{loading ? (
									<div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
										{Array.from({ length: 6 }).map((_, index) => (
											<div
												key={index}
												className="flex items-start gap-4 p-4 bg-white rounded-lg shadow-sm"
											>
												<div className="w-12 h-12 bg-gray-200 rounded-lg animate-pulse flex-shrink-0"></div>
												<div className="flex-1 space-y-2">
													<div className="h-4 bg-gray-200 rounded animate-pulse"></div>
													<div className="h-3 bg-gray-200 rounded animate-pulse w-3/4"></div>
												</div>
											</div>
										))}
									</div>
								) : (
									<div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
										{projectFeaturesAndGoals.map((item, index) => (
											<div
												key={index}
												className="flex items-start gap-4 p-4 bg-white rounded-lg shadow-sm"
											>
												<div className="bg-green-100 rounded-lg p-3 flex-shrink-0">
													<item.icon className="h-6 w-6 text-green-600" />
												</div>
												<div>
													<h4 className="font-medium text-gray-900 leading-tight mb-2 flex items-center gap-2">
														{item.title}
														{item.completed && (
															<CheckCircle className="h-4 w-4 text-green-600" />
														)}
													</h4>
													<p className="text-sm text-gray-600 leading-relaxed">
														{item.description}
													</p>
												</div>
											</div>
										))}
									</div>
								)}
							</CardContent>
						</Card>
					</div>
				</div>
			</section>

			{/* Multiple Donation Options Section */}
			<section className="py-20">
				<div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
					<div className="text-center mb-16">
						<h2 className="text-4xl font-light text-gray-900 mb-6 tracking-tight">
							Multiple Ways to Donate
						</h2>
						<p className="text-lg text-gray-600 max-w-2xl mx-auto">
							Choose the donation method that works best for you. All options
							are secure and provide instant confirmation.
						</p>
					</div>

					<div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
						{donationLoading
							? // Loading state
							  Array.from({ length: 3 }).map((_, index) => (
									<Card
										key={index}
										className="border-2 hover:shadow-lg transition-all duration-300"
									>
										<CardHeader className="text-center">
											<div className="w-16 h-16 bg-gray-200 rounded-full animate-pulse mx-auto mb-4"></div>
											<div className="h-6 bg-gray-200 rounded animate-pulse mb-2"></div>
											<div className="h-4 bg-gray-200 rounded animate-pulse w-24 mx-auto"></div>
										</CardHeader>
										<CardContent className="space-y-4">
											<div className="h-4 bg-gray-200 rounded animate-pulse"></div>
											<div className="h-12 bg-gray-200 rounded animate-pulse"></div>
											<div className="space-y-2">
												{Array.from({ length: 4 }).map((_, i) => (
													<div
														key={i}
														className="h-3 bg-gray-200 rounded animate-pulse"
													></div>
												))}
											</div>
										</CardContent>
									</Card>
							  ))
							: activeDonationMethods.map((method) => {
									const config = getDonationMethodConfig(method.type);
									const IconComponent = config.icon;

									return (
										<Card
											key={method.id}
											className={`border-2 ${config.borderColor} hover:shadow-lg transition-all duration-300`}
										>
											<CardHeader className="text-center">
												<div
													className={`w-16 h-16 ${config.bgColor} rounded-full flex items-center justify-center mx-auto mb-4`}
												>
													<IconComponent
														className={`h-8 w-8 ${config.textColor}`}
													/>
												</div>
												<CardTitle className="text-xl text-gray-900">
													{method.title}
												</CardTitle>
												{config.badge && (
													<Badge className={`${config.buttonColor} text-white`}>
														{config.badge}
													</Badge>
												)}
											</CardHeader>
											<CardContent className="space-y-4">
												<p className="text-gray-600 text-center">
													{method.description.split("\n")[0] ||
														method.description}
												</p>

												{/* Email display for interac type */}
												{method.type === "interac" && method.email && (
													<div className="bg-blue-50 rounded-lg p-4">
														<p className="font-medium text-blue-900 mb-2 text-center">
															Send to:
														</p>
														<div className="flex items-center justify-center gap-2 bg-white rounded p-3">
															<span className="font-mono text-blue-700 text-sm">
																{method.email}
															</span>
															<Button variant="outline" size="sm">
																<Copy className="h-4 w-4" />
															</Button>
														</div>
													</div>
												)}

												{/* Features list for each method */}
												{method.description.includes("\n") ? (
													<ul className="text-sm text-gray-600 space-y-2">
														{method.description
															.split("\n")
															.slice(1)
															.map((feature, index) => (
																<li
																	key={index}
																	className="flex items-center gap-2"
																>
																	<CheckCircle className="h-4 w-4 text-green-600" />
																	{feature}
																</li>
															))}
													</ul>
												) : (
													<ul className="text-sm text-gray-600 space-y-2">
														<li className="flex items-center gap-2">
															<CheckCircle className="h-4 w-4 text-green-600" />
															Secure and reliable
														</li>
														<li className="flex items-center gap-2">
															<CheckCircle className="h-4 w-4 text-green-600" />
															Instant confirmation
														</li>
														<li className="flex items-center gap-2">
															<CheckCircle className="h-4 w-4 text-green-600" />
															Tax receipt provided
														</li>
													</ul>
												)}

												{/* Action button */}
												{method.link ? (
													<Button
														className={`w-full ${config.buttonColor} text-white`}
														onClick={() => window.open(method.link, "_blank")}
													>
														{method.type === "paypal"
															? "Donate via PayPal"
															: `Pay with ${method.title}`}
													</Button>
												) : method.type === "interac" ? (
													<Button
														className={`w-full ${config.buttonColor} text-white`}
														disabled
													>
														Use Your Banking App
													</Button>
												) : (
													<Button
														variant="outline"
														className={`w-full border-2 ${config.textColor} hover:bg-gray-50`}
														onClick={() => navigateTo("contact")}
													>
														Get Details
													</Button>
												)}
											</CardContent>
										</Card>
									);
							  })}

						{/* Static fallback cards if no API data and not loading */}
						{!donationLoading && activeDonationMethods.length === 0 && (
							<>
								{/* Static Interac Card */}
								<Card className="border-2 border-blue-200 hover:border-blue-400 hover:shadow-lg transition-all duration-300">
									<CardHeader className="text-center">
										<div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
											<Mail className="h-8 w-8 text-blue-600" />
										</div>
										<CardTitle className="text-xl text-gray-900">
											Interact E-Transfer
										</CardTitle>
										<Badge className="bg-blue-600 hover:bg-blue-700 text-white">
											Most Popular
										</Badge>
									</CardHeader>
									<CardContent className="space-y-4">
										<p className="text-gray-600 text-center">
											Send money directly from your bank account with no fees
										</p>
										<div className="bg-blue-50 rounded-lg p-4">
											<p className="font-medium text-blue-900 mb-2 text-center">
												Send to:
											</p>
											<div className="flex items-center justify-center gap-2 bg-white rounded p-3">
												<span className="font-mono text-blue-700 text-sm">
													nwmis.bc@gmail.com
												</span>
												<Button variant="outline" size="sm">
													<Copy className="h-4 w-4" />
												</Button>
											</div>
										</div>
										<ul className="text-sm text-gray-600 space-y-2">
											<li className="flex items-center gap-2">
												<CheckCircle className="h-4 w-4 text-green-600" />
												Instant transfer
											</li>
											<li className="flex items-center gap-2">
												<CheckCircle className="h-4 w-4 text-green-600" />
												No transaction fees
											</li>
											<li className="flex items-center gap-2">
												<CheckCircle className="h-4 w-4 text-green-600" />
												Auto-deposit enabled
											</li>
											<li className="flex items-center gap-2">
												<CheckCircle className="h-4 w-4 text-green-600" />
												Tax receipt via email
											</li>
										</ul>
									</CardContent>
								</Card>

								{/* Static PayPal Card */}
								<Card className="border-2 border-yellow-200 hover:border-yellow-400 hover:shadow-lg transition-all duration-300">
									<CardHeader className="text-center">
										<div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-4">
											<CreditCard className="h-8 w-8 text-yellow-600" />
										</div>
										<CardTitle className="text-xl text-gray-900">
											PayPal
										</CardTitle>
									</CardHeader>
									<CardContent className="space-y-4">
										<p className="text-gray-600 text-center">
											Pay securely with PayPal account or any credit/debit card
										</p>
										<ul className="text-sm text-gray-600 space-y-2">
											<li className="flex items-center gap-2">
												<CheckCircle className="h-4 w-4 text-green-600" />
												Secure payment processing
											</li>
											<li className="flex items-center gap-2">
												<CheckCircle className="h-4 w-4 text-green-600" />
												International support
											</li>
											<li className="flex items-center gap-2">
												<CheckCircle className="h-4 w-4 text-green-600" />
												Buyer protection
											</li>
											<li className="flex items-center gap-2">
												<CheckCircle className="h-4 w-4 text-green-600" />
												Instant confirmation
											</li>
										</ul>
										<Button className="w-full bg-yellow-500 hover:bg-yellow-600 text-white">
											Donate via PayPal
										</Button>
									</CardContent>
								</Card>

								{/* Static Contact Card */}
								<Card className="border-2 border-green-200 hover:border-green-400 hover:shadow-lg transition-all duration-300">
									<CardHeader className="text-center">
										<div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
											<Phone className="h-8 w-8 text-green-600" />
										</div>
										<CardTitle className="text-xl text-gray-900">
											Contact Us
										</CardTitle>
									</CardHeader>
									<CardContent className="space-y-4">
										<p className="text-gray-600 text-center">
											Get in touch for other donation methods or questions
										</p>
										<ul className="text-sm text-gray-600 space-y-2">
											<li className="flex items-center gap-2">
												<CheckCircle className="h-4 w-4 text-green-600" />
												Personal assistance
											</li>
											<li className="flex items-center gap-2">
												<CheckCircle className="h-4 w-4 text-green-600" />
												Multiple options available
											</li>
											<li className="flex items-center gap-2">
												<CheckCircle className="h-4 w-4 text-green-600" />
												Custom arrangements
											</li>
											<li className="flex items-center gap-2">
												<CheckCircle className="h-4 w-4 text-green-600" />
												Community support
											</li>
										</ul>
										<Button
											variant="outline"
											className="w-full border-green-600 text-green-600 hover:bg-green-50"
											onClick={() => navigateTo("contact")}
										>
											Contact Us
										</Button>
									</CardContent>
								</Card>
							</>
						)}
					</div>

					<div className="text-center mt-12">
						<p className="text-sm text-gray-600 mb-6">
							May Allah bless you and may your family and community benefit from
							generosity in both worlds.
						</p>
						<Button
							onClick={() => navigateTo("donate")}
							size="lg"
							className="bg-green-600 hover:bg-green-700 px-8 py-4 h-14 rounded-full"
						>
							<Heart className="mr-2 h-5 w-5" />
							Visit Full Donation Page
						</Button>
					</div>
				</div>
			</section>

			{/* Contact Us Section (replacing Join Our Sacred Mission) */}
			<section className="py-20 bg-gray-50">
				<div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
					<div className="text-center mb-16">
						<h2 className="text-4xl font-light text-gray-900 mb-6 tracking-tight">
							Contact Us
						</h2>
						<p className="text-lg text-gray-600 max-w-2xl mx-auto">
							Have questions about the mosque project or want to get involved?
							We'd love to hear from you.
						</p>
					</div>

					<div className="grid md:grid-cols-3 gap-8">
						{/* Phone Contact */}
						<Card className="border-0 shadow-lg hover:shadow-xl transition-shadow text-center">
							<CardContent className="p-8">
								<div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
									<Phone className="h-8 w-8 text-green-600" />
								</div>
								<h3 className="text-xl font-medium text-gray-900 mb-4">
									Call Us
								</h3>
								<p className="text-gray-600 mb-6 leading-relaxed">
									Speak directly with our team about the mosque project or any
									questions you may have.
								</p>
								<div className="space-y-2">
									<p className="font-medium text-gray-900">778-317-6673</p>
									<p className="text-sm text-gray-600">
										Available after prayer times
									</p>
								</div>
							</CardContent>
						</Card>

						{/* Email Contact */}
						<Card className="border-0 shadow-lg hover:shadow-xl transition-shadow text-center">
							<CardContent className="p-8">
								<div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
									<Mail className="h-8 w-8 text-blue-600" />
								</div>
								<h3 className="text-xl font-medium text-gray-900 mb-4">
									Email Us
								</h3>
								<p className="text-gray-600 mb-6 leading-relaxed">
									Send us your questions, suggestions, or requests for more
									information about our project.
								</p>
								<div className="space-y-2">
									<p className="font-medium text-gray-900">
										nwmis.bc@gmail.com
									</p>
									<p className="text-sm text-gray-600">
										We respond within 24 hours
									</p>
								</div>
							</CardContent>
						</Card>

						{/* Visit Us */}
						<Card className="border-0 shadow-lg hover:shadow-xl transition-shadow text-center">
							<CardContent className="p-8">
								<div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-6">
									<MapPin className="h-8 w-8 text-purple-600" />
								</div>
								<h3 className="text-xl font-medium text-gray-900 mb-4">
									Visit Us
								</h3>
								<p className="text-gray-600 mb-6 leading-relaxed">
									Join us for prayers or community events. All are welcome in
									our temporary location.
								</p>
								<div className="space-y-2">
									<p className="font-medium text-gray-900">
										8879 Selkirk Street
									</p>
									<p className="font-medium text-gray-900">
										Vancouver, BC V6P 4J6
									</p>
									<p className="text-sm text-gray-600">
										Open daily for prayer times
									</p>
								</div>
							</CardContent>
						</Card>
					</div>

					<div className="text-center mt-12">
						<Button
							onClick={() => navigateTo("contact")}
							size="lg"
							className="bg-green-600 hover:bg-green-700 px-8 py-4 h-14 rounded-full"
						>
							<ArrowRight className="mr-2 h-5 w-5" />
							Visit Our Contact Page
						</Button>
					</div>
				</div>
			</section>

			{/* Final CTA Section */}
			<section className="py-20 bg-gradient-to-r from-green-600 to-green-700">
				<div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
					<div className="bg-white/10 backdrop-blur-md rounded-3xl p-12 border border-white/20">
						<h2 className="text-4xl font-light text-white mb-6 tracking-tight">
							Together, We Build More Than a Masjid
						</h2>
						<p className="text-xl text-green-100 mb-8 leading-relaxed">
							We build a legacy, a community, and a place where future
							generations will worship, learn, and grow in faith.
						</p>
						<div className="flex flex-col sm:flex-row gap-4 justify-center">
							<Button
								size="lg"
								onClick={() => navigateTo("donate")}
								className="bg-white text-green-700 hover:bg-gray-100 px-8 py-4 h-14 rounded-full font-medium"
							>
								<Heart className="mr-2 h-5 w-5" />
								Make Your Contribution
							</Button>
							<Button
								size="lg"
								onClick={() => navigateTo("contact")}
								variant="outline"
								className="border-2 border-white text-white bg-transparent hover:bg-white hover:text-green-700 px-8 py-4 h-14 rounded-full font-medium"
							>
								<Phone className="mr-2 h-5 w-5" />
								Contact Us
							</Button>
						</div>
					</div>
				</div>
			</section>
		</div>
	);
}
