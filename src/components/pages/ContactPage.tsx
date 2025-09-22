import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Button } from "../ui/button";
import {
	MapPin,
	Phone,
	Mail,
	Clock,
	Facebook,
	AlertCircle,
	Users,
	CheckCircle,
	Loader2,
} from "lucide-react";
import React, { useState } from "react";
import { SupabaseContentService } from "../../lib/services/supabase-content.service";
import { AddContactMessageRequest } from "../../lib/types";
import { useApiOnMount } from "../../lib/hooks/api-hooks";

export function ContactPage() {
	// Social Links API call
	const {
		data: socialLinksData,
		loading: socialLinksLoading,
		error: socialLinksError,
	} = useApiOnMount(() => SupabaseContentService.getSocialLinks());

	// Form state
	const [formData, setFormData] = useState({
		name: "",
		email: "",
		phone: "",
		subject: "",
		message: "",
	});

	// UI state
	const [isSubmitting, setIsSubmitting] = useState(false);
	const [isSubmitted, setIsSubmitted] = useState(false);
	const [error, setError] = useState<string | null>(null);

	// Form handlers
	const handleInputChange = (field: string, value: string) => {
		setFormData((prev) => ({ ...prev, [field]: value }));
	};

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		setError(null);

		// Validation
		if (
			!formData.name ||
			!formData.email ||
			!formData.subject ||
			!formData.message
		) {
			setError("Please fill in all required fields.");
			return;
		}

		setIsSubmitting(true);

		try {
			const contactData: AddContactMessageRequest = {
				new_message: {
					name: formData.name,
					email: formData.email,
					phone: formData.phone,
					message: formData.message,
					subject: formData.subject,
					dateTime: new Date().toISOString().slice(0, 16), // Format: "2025-08-23T16:27"
				},
			};

			const response = await SupabaseContentService.addContactMessage(
				contactData
			);

			// Handle successful response (204 status with no data)
			if (response.success || response.status === 204) {
				setIsSubmitted(true);
				// Reset form
				setFormData({
					name: "",
					email: "",
					phone: "",
					subject: "",
					message: "",
				});
			} else {
				throw new Error(response.message || "Failed to send message");
			}
		} catch (err) {
			setError(
				err instanceof Error ? err.message : "An unexpected error occurred"
			);
		} finally {
			setIsSubmitting(false);
		}
	};

	return (
		<div className="min-h-screen bg-white/95 backdrop-blur-sm relative">
			{/* Hero Section */}
			<section className="py-24 bg-gradient-to-br from-green-700 via-green-600 to-green-800 text-white relative">
				<div className="absolute inset-0 bg-black opacity-20"></div>
				<div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
					<h1 className="text-4xl md:text-5xl mb-6">Get In Touch</h1>
					<p className="text-xl md:text-2xl max-w-2xl mx-auto">
						We welcome visitors and are here to answer any questions about Islam
						or our community
					</p>
				</div>
			</section>

			{/* Contact Information */}
			<section className="py-16">
				<div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
					<div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
						{/* Location */}
						<Card className="hover:shadow-lg transition-shadow">
							<CardHeader>
								<CardTitle className="flex items-center gap-2 text-green-700">
									<MapPin className="h-5 w-5" />
									Location
								</CardTitle>
							</CardHeader>
							<CardContent className="space-y-3">
								<div>
									<p className="font-semibold">
										New Westminster Islamic Society
									</p>
									<p className="text-gray-600">Marpole Musalla</p>
									<p className="text-gray-600">8879 Selkirk Street</p>
									<p className="text-gray-600">Vancouver, BC V6P 4J6</p>
								</div>
								<Button className="w-full bg-green-600 hover:bg-green-700">
									Get Directions
								</Button>
							</CardContent>
						</Card>

						{/* Phone */}
						<Card className="hover:shadow-lg transition-shadow">
							<CardHeader>
								<CardTitle className="flex items-center gap-2 text-green-700">
									<Phone className="h-5 w-5" />
									Phone
								</CardTitle>
							</CardHeader>
							<CardContent className="space-y-3">
								<div>
									<p className="font-semibold">Main Numbers:</p>
									<p className="text-gray-600">604-298-2190</p>
									<p className="text-gray-600">604-563-2990</p>
								</div>
								<p className="text-sm text-gray-500">
									Available during prayer times and community events
								</p>
								<Button className="w-full bg-green-600 hover:bg-green-700">
									Call Now
								</Button>
							</CardContent>
						</Card>

						{/* Email */}
						<Card className="hover:shadow-lg transition-shadow">
							<CardHeader>
								<CardTitle className="flex items-center gap-2 text-green-700">
									<Mail className="h-5 w-5" />
									Email
								</CardTitle>
							</CardHeader>
							<CardContent className="space-y-3">
								<div>
									<p className="font-semibold">General Inquiries:</p>
									<p className="text-gray-600">info@nwmismasjid.org</p>
								</div>
								<p className="text-sm text-gray-500">
									We typically respond within 24-48 hours
								</p>
								<Button className="w-full bg-green-600 hover:bg-green-700">
									Send Email
								</Button>
							</CardContent>
						</Card>
					</div>
				</div>
			</section>

			{/* Prayer Times & Access */}
			<section className="py-16 bg-gray-50">
				<div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
					<h2 className="text-3xl text-center text-gray-900 mb-12">
						Prayer Times & Access
					</h2>
					<div className="grid md:grid-cols-2 gap-8">
						<Card>
							<CardHeader>
								<CardTitle className="flex items-center gap-2 text-green-700">
									<Clock className="h-5 w-5" />
									Daily Prayers
								</CardTitle>
							</CardHeader>
							<CardContent className="space-y-3">
								<div className="space-y-2">
									<div className="flex justify-between">
										<span>Fajr</span>
										<span className="font-semibold">5:15 AM</span>
									</div>
									<div className="flex justify-between">
										<span>Dhuhr</span>
										<span className="font-semibold">12:45 PM</span>
									</div>
									<div className="flex justify-between">
										<span>Asr</span>
										<span className="font-semibold">3:45 PM</span>
									</div>
									<div className="flex justify-between">
										<span>Maghrib</span>
										<span className="font-semibold">6:15 PM</span>
									</div>
									<div className="flex justify-between">
										<span>Isha</span>
										<span className="font-semibold">7:45 PM</span>
									</div>
								</div>
								<div className="border-t pt-3">
									<div className="flex justify-between font-semibold text-green-700">
										<span>Friday Jumu'ah</span>
										<span>1:00 PM</span>
									</div>
								</div>
							</CardContent>
						</Card>

						<Card>
							<CardHeader>
								<CardTitle className="flex items-center gap-2 text-orange-600">
									<AlertCircle className="h-5 w-5" />
									Important Access Information
								</CardTitle>
							</CardHeader>
							<CardContent className="space-y-4">
								<div className="bg-yellow-50 p-4 rounded-lg border-l-4 border-yellow-400">
									<p className="text-yellow-800 font-semibold mb-2">
										Digital Security Lock
									</p>
									<p className="text-yellow-700 text-sm">
										The masjid has a digital security lock. First-time visitors
										should contact us in advance for access arrangements.
									</p>
								</div>
								<div>
									<p className="font-semibold mb-2">For New Visitors:</p>
									<ul className="text-sm text-gray-600 space-y-1">
										<li>• Call ahead to arrange access</li>
										<li>• Arrive 15 minutes before prayer time</li>
										<li>• Ask for a community member to assist</li>
									</ul>
								</div>
							</CardContent>
						</Card>
					</div>
				</div>
			</section>

			{/* Contact Form */}
			<section className="py-16">
				<div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
					<h2 className="text-3xl text-center text-gray-900 mb-12">
						Send Us a Message
					</h2>
					<div className="bg-green-50 rounded-lg p-8">
						{/* Success Message */}
						{isSubmitted && (
							<div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6">
								<div className="flex items-center space-x-3">
									<CheckCircle className="h-5 w-5 text-green-600" />
									<div>
										<p className="font-medium text-green-800">
											Message Sent Successfully!
										</p>
										<p className="text-sm text-green-700">
											Thank you for contacting us. We'll respond within 24-48
											hours.
										</p>
									</div>
								</div>
							</div>
						)}

						{/* Error Message */}
						{error && (
							<div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
								<div className="flex items-center space-x-3">
									<div className="h-5 w-5 text-red-600">⚠️</div>
									<div>
										<p className="font-medium text-red-800">
											Failed to Send Message
										</p>
										<p className="text-sm text-red-700">{error}</p>
									</div>
								</div>
							</div>
						)}

						<form onSubmit={handleSubmit} className="space-y-6">
							<div className="grid md:grid-cols-2 gap-6">
								<div>
									<label className="block text-gray-700 mb-2">Name *</label>
									<input
										type="text"
										className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
										placeholder="Your full name"
										value={formData.name}
										onChange={(e) => handleInputChange("name", e.target.value)}
										required
									/>
								</div>
								<div>
									<label className="block text-gray-700 mb-2">Email *</label>
									<input
										type="email"
										className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
										placeholder="your.email@example.com"
										value={formData.email}
										onChange={(e) => handleInputChange("email", e.target.value)}
										required
									/>
								</div>
							</div>

							<div>
								<label className="block text-gray-700 mb-2">Phone</label>
								<input
									type="tel"
									className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
									placeholder="(604) 123-4567"
									value={formData.phone}
									onChange={(e) => handleInputChange("phone", e.target.value)}
								/>
							</div>

							<div>
								<label className="block text-gray-700 mb-2">Subject *</label>
								<select
									className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
									value={formData.subject}
									onChange={(e) => handleInputChange("subject", e.target.value)}
									required
								>
									<option value="">Select a topic</option>
									<option value="General Inquiry">General Inquiry</option>
									<option value="Programs & Education">
										Programs & Education
									</option>
									<option value="Events">Events</option>
									<option value="Volunteer Opportunities">
										Volunteer Opportunities
									</option>
									<option value="Donations">Donations</option>
									<option value="Community Review of the Beginner Qur'an Program">
										Community Review of the Beginner Qur'an Program
									</option>
									<option value="Other">Other</option>
								</select>
							</div>

							<div>
								<label className="block text-gray-700 mb-2">Message *</label>
								<textarea
									rows={6}
									className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
									placeholder="Please share your message or questions..."
									value={formData.message}
									onChange={(e) => handleInputChange("message", e.target.value)}
									required
								></textarea>
							</div>

							<Button
								type="submit"
								size="lg"
								className="w-full bg-green-600 hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-green-600"
								disabled={isSubmitting}
							>
								{isSubmitting ? (
									<>
										<Loader2 className="mr-2 h-5 w-5 animate-spin" />
										Sending Message...
									</>
								) : (
									<>
										<Mail className="mr-2 h-5 w-5" />
										Send Message
									</>
								)}
							</Button>
						</form>
					</div>
				</div>
			</section>

			{/* Social Media */}
			<section className="py-16 bg-gray-50">
				<div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
					<h2 className="text-2xl text-gray-900 mb-6">Follow Us</h2>
					<p className="text-gray-600 mb-8">
						Stay connected with our community through social media for updates,
						events, and announcements.
					</p>
					{socialLinksLoading ? (
						<div className="text-gray-500">Loading social links...</div>
					) : socialLinksError ? (
						<div className="text-red-500">Unable to load social links.</div>
					) : (
						<div className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto">
							{(socialLinksData?.[0]?.value || [])
								.filter((link: any) => link.isActive)
								.sort((a: any, b: any) => a.displayOrder - b.displayOrder)
								.map((link: any) => {
									let Icon = null;
									switch (link.type) {
										case "facebook":
											Icon = Facebook;
											break;
										case "users":
											Icon = Users;
											break;
										// Add more icons as needed
										default:
											Icon = Facebook;
									}
									return (
										<Button
											key={link.id}
											variant={link.type === "facebook" ? "outline" : "default"}
											size="lg"
											className={
												link.type === "facebook"
													? "border-blue-600 text-blue-600 hover:bg-blue-50 flex-1"
													: "bg-green-600 hover:bg-green-700 flex-1 text-white"
											}
											onClick={() => window.open(link.link, "_blank")}
										>
											{Icon && <Icon className="h-5 w-5 mr-2" />}
											{link.title || link.platform_name}
										</Button>
									);
								})}
						</div>
					)}
				</div>
			</section>
		</div>
	);
}
