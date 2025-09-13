import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { Checkbox } from "../ui/checkbox";
import { Badge } from "../ui/badge";
import {
	Mail,
	Bell,
	Calendar,
	BookOpen,
	Users,
	Heart,
	CheckCircle,
	Phone,
	MessageCircle,
	Loader2,
} from "lucide-react";
import React, { useState } from "react";
import { SupabaseContentService } from "../../lib/services/supabase-content.service";
import { AddSubscriberRequest } from "../../lib/types";

export function SubscribePage() {
	// Form state
	const [formData, setFormData] = useState({
		firstName: "",
		lastName: "",
		email: "",
		phone: "",
		comments: "",
		subscriptionTypes: [] as string[],
		communicationMethods: [] as string[],
		agreeToTerms: false,
	});

	// UI state
	const [isSubmitting, setIsSubmitting] = useState(false);
	const [isSubmitted, setIsSubmitted] = useState(false);
	const [error, setError] = useState<string | null>(null);

	const subscriptionTypes = [
		{
			id: "weekly-newsletter",
			icon: Mail,
			title: "Weekly Newsletter",
			description:
				"Stay updated with community news, events, and Islamic reminders",
			frequency: "Weekly",
			color: "bg-blue-500",
		},
		{
			id: "upcoming-events",
			icon: Calendar,
			title: "Event Notifications",
			description:
				"Get notified about upcoming programs, lectures, and community gatherings",
			frequency: "As needed",
			color: "bg-green-500",
		},
		{
			id: "educational-programs",
			icon: BookOpen,
			title: "Educational Programs",
			description:
				"Updates on Quran classes, Islamic studies, and youth programs",
			frequency: "Monthly",
			color: "bg-purple-500",
		},
		{
			id: "mosque-project-progress",
			icon: Heart,
			title: "Mosque Project Updates",
			description:
				"Progress reports and donation opportunities for our new mosque",
			frequency: "Monthly",
			color: "bg-orange-500",
		},
	];

	const communicationMethods = [
		{ id: "email", label: "Email", icon: Mail },
		{ id: "sms", label: "SMS", icon: MessageCircle },
		{ id: "phone", label: "Phone Call", icon: Phone },
	];

	// Form handlers
	const handleInputChange = (field: string, value: string) => {
		setFormData((prev) => ({ ...prev, [field]: value }));
	};

	const handleCheckboxChange = (
		field: "subscriptionTypes" | "communicationMethods",
		value: string,
		checked: boolean
	) => {
		setFormData((prev) => ({
			...prev,
			[field]: checked
				? [...prev[field], value]
				: prev[field].filter((item) => item !== value),
		}));
	};

	const handleTermsChange = (checked: boolean) => {
		setFormData((prev) => ({ ...prev, agreeToTerms: checked }));
	};

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		setError(null);

		// Validation
		if (!formData.firstName || !formData.lastName || !formData.email) {
			setError("Please fill in all required fields.");
			return;
		}

		if (!formData.agreeToTerms) {
			setError("Please agree to the terms to continue.");
			return;
		}

		if (formData.subscriptionTypes.length === 0) {
			setError("Please select at least one subscription type.");
			return;
		}

		setIsSubmitting(true);

		try {
			const subscriberData: AddSubscriberRequest = {
				new_subscriber: {
					name: `${formData.firstName} ${formData.lastName}`,
					email: formData.email,
					phone: formData.phone,
					comments: formData.comments,
					subscribedAt: new Date().toISOString(),
					subscriptionTypes: formData.subscriptionTypes,
				},
			};

			const response = await SupabaseContentService.addSubscriber(
				subscriberData
			);

			// Handle successful response (204 status with no data)
			if (response.success || response.status === 204) {
				setIsSubmitted(true);
				// Reset form
				setFormData({
					firstName: "",
					lastName: "",
					email: "",
					phone: "",
					comments: "",
					subscriptionTypes: [],
					communicationMethods: [],
					agreeToTerms: false,
				});
			} else {
				throw new Error(response.message || "Failed to subscribe");
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
			<section className="py-24 bg-gradient-to-br from-green-700 via-green-600 to-green-800 text-white relative overflow-hidden">
				<div className="absolute inset-0 bg-black opacity-20"></div>
				<div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
					<div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-6">
						<Bell className="h-10 w-10" />
					</div>
					<h1 className="text-4xl md:text-5xl font-light mb-6 tracking-tight">
						Stay Connected
					</h1>
					<p className="text-xl md:text-2xl max-w-3xl mx-auto leading-relaxed font-light">
						Subscribe to receive updates about our community, events, programs,
						and the journey of building our new mosque
					</p>
				</div>
			</section>

			{/* Subscription Options */}
			<section className="py-16">
				<div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
					<div className="text-center mb-12">
						<h2 className="text-3xl font-light text-gray-900 mb-4 tracking-tight">
							Choose Your Interests
						</h2>
						<p className="text-lg text-gray-600 max-w-2xl mx-auto">
							Select the types of updates you'd like to receive from our
							community
						</p>
					</div>

					<div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
						{subscriptionTypes.map((type) => (
							<Card
								key={type.id}
								className="hover:shadow-lg transition-all duration-300 hover:scale-105 border-0 cursor-pointer group"
							>
								<CardHeader className="text-center pb-4">
									<div
										className={`w-16 h-16 ${type.color} rounded-full flex items-center justify-center mx-auto mb-4 transition-transform group-hover:scale-110`}
									>
										<type.icon className="h-8 w-8 text-white" />
									</div>
									<CardTitle className="text-lg">{type.title}</CardTitle>
									<Badge variant="outline" className="mx-auto">
										{type.frequency}
									</Badge>
								</CardHeader>
								<CardContent>
									<p className="text-gray-600 text-sm text-center leading-relaxed">
										{type.description}
									</p>
								</CardContent>
							</Card>
						))}
					</div>
				</div>
			</section>

			{/* Subscription Form */}
			<section className="py-16 bg-green-50">
				<div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
					<Card className="shadow-lg border-0">
						<CardHeader className="text-center">
							<CardTitle className="text-2xl text-gray-900 mb-2">
								Subscribe to Updates
							</CardTitle>
							<p className="text-gray-600">
								Fill out the form below to stay connected with our community
							</p>
						</CardHeader>
						<CardContent className="space-y-8">
							{/* Success Message */}
							{isSubmitted && (
								<div className="bg-green-50 border border-green-200 rounded-lg p-4">
									<div className="flex items-center space-x-3">
										<CheckCircle className="h-5 w-5 text-green-600" />
										<div>
											<p className="font-medium text-green-800">
												Successfully Subscribed!
											</p>
											<p className="text-sm text-green-700">
												Thank you for joining our community. You'll receive
												updates based on your preferences.
											</p>
										</div>
									</div>
								</div>
							)}

							{/* Error Message */}
							{error && (
								<div className="bg-red-50 border border-red-200 rounded-lg p-4">
									<div className="flex items-center space-x-3">
										<div className="h-5 w-5 text-red-600">⚠️</div>
										<div>
											<p className="font-medium text-red-800">
												Subscription Failed
											</p>
											<p className="text-sm text-red-700">{error}</p>
										</div>
									</div>
								</div>
							)}

							<form onSubmit={handleSubmit} className="space-y-6">
								{/* Personal Information */}
								<div className="grid md:grid-cols-2 gap-6">
									<div>
										<label className="block text-gray-700 mb-2 font-medium">
											First Name *
										</label>
										<Input
											type="text"
											className="h-12"
											placeholder="Your first name"
											value={formData.firstName}
											onChange={(e) =>
												handleInputChange("firstName", e.target.value)
											}
											required
										/>
									</div>
									<div>
										<label className="block text-gray-700 mb-2 font-medium">
											Last Name *
										</label>
										<Input
											type="text"
											className="h-12"
											placeholder="Your last name"
											value={formData.lastName}
											onChange={(e) =>
												handleInputChange("lastName", e.target.value)
											}
											required
										/>
									</div>
								</div>

								<div>
									<label className="block text-gray-700 mb-2 font-medium">
										Email Address *
									</label>
									<Input
										type="email"
										className="h-12"
										placeholder="your.email@example.com"
										value={formData.email}
										onChange={(e) => handleInputChange("email", e.target.value)}
										required
									/>
								</div>

								<div>
									<label className="block text-gray-700 mb-2 font-medium">
										Phone Number
									</label>
									<Input
										type="tel"
										className="h-12"
										placeholder="(604) 123-4567"
										value={formData.phone}
										onChange={(e) => handleInputChange("phone", e.target.value)}
									/>
								</div>

								{/* Subscription Preferences */}
								<div>
									<label className="block text-gray-700 mb-4 font-medium">
										What would you like to receive? (Select all that apply) *
									</label>
									<div className="grid md:grid-cols-2 gap-4">
										{subscriptionTypes.map((type) => (
											<div
												key={type.id}
												className="flex items-start space-x-3 p-4 bg-gray-50 rounded-lg"
											>
												<Checkbox
													id={type.id}
													className="mt-1"
													checked={formData.subscriptionTypes.includes(type.id)}
													onCheckedChange={(checked) =>
														handleCheckboxChange(
															"subscriptionTypes",
															type.id,
															!!checked
														)
													}
												/>
												<div className="flex-1">
													<label
														htmlFor={type.id}
														className="font-medium text-gray-900 cursor-pointer"
													>
														{type.title}
													</label>
													<p className="text-sm text-gray-600 mt-1">
														{type.description}
													</p>
												</div>
											</div>
										))}
									</div>
								</div>

								{/* Communication Preferences */}
								<div>
									<label className="block text-gray-700 mb-4 font-medium">
										How would you like to be contacted?
									</label>
									<div className="flex flex-wrap gap-4">
										{communicationMethods.map((method) => (
											<div
												key={method.id}
												className="flex items-center space-x-2"
											>
												<Checkbox
													id={method.id}
													checked={formData.communicationMethods.includes(
														method.id
													)}
													onCheckedChange={(checked) =>
														handleCheckboxChange(
															"communicationMethods",
															method.id,
															!!checked
														)
													}
												/>
												<method.icon className="h-4 w-4 text-gray-500" />
												<label
													htmlFor={method.id}
													className="text-gray-700 cursor-pointer"
												>
													{method.label}
												</label>
											</div>
										))}
									</div>
								</div>

								{/* Additional Interests */}
								{/* Additional Interests */}
								<div>
									<label className="block text-gray-700 mb-2 font-medium">
										Additional Comments or Interests
									</label>
									<Textarea
										rows={4}
										className="resize-none"
										placeholder="Tell us about any specific programs, events, or topics you're interested in..."
										value={formData.comments}
										onChange={(e) =>
											handleInputChange("comments", e.target.value)
										}
									/>
								</div>

								{/* Privacy Notice */}
								<div className="bg-blue-50 p-4 rounded-lg">
									<div className="flex items-start space-x-3">
										<CheckCircle className="h-5 w-5 text-blue-600 mt-0.5" />
										<div className="text-sm text-blue-800">
											<p className="font-medium mb-1">Privacy Notice</p>
											<p>
												We respect your privacy. Your information will only be
												used to send you the updates you've requested. You can
												unsubscribe at any time by clicking the link in our
												emails or contacting us directly.
											</p>
										</div>
									</div>
								</div>

								{/* Terms Agreement */}
								<div className="flex items-start space-x-3">
									<Checkbox
										id="terms"
										className="mt-1"
										checked={formData.agreeToTerms}
										onCheckedChange={(checked) => handleTermsChange(!!checked)}
										required
									/>
									<label
										htmlFor="terms"
										className="text-sm text-gray-600 cursor-pointer"
									>
										I agree to receive communications from NWMIS and understand
										that I can unsubscribe at any time. *
									</label>
								</div>

								<Button
									type="submit"
									size="lg"
									className="w-full bg-green-600 hover:bg-green-700 h-14 text-lg font-medium rounded-full transition-all duration-300 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
									disabled={isSubmitting}
								>
									{isSubmitting ? (
										<>
											<Loader2 className="mr-2 h-5 w-5 animate-spin" />
											Subscribing...
										</>
									) : (
										<>
											<Bell className="mr-2 h-5 w-5" />
											Subscribe Now
										</>
									)}
								</Button>
							</form>
						</CardContent>
					</Card>
				</div>
			</section>

			{/* Benefits Section */}
			<section className="py-16">
				<div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
					<h2 className="text-3xl font-light text-center text-gray-900 mb-12 tracking-tight">
						Why Subscribe?
					</h2>

					<div className="grid md:grid-cols-3 gap-8">
						<div className="text-center">
							<div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
								<Calendar className="h-8 w-8 text-green-600" />
							</div>
							<h3 className="font-medium text-gray-900 mb-2">
								Never Miss Events
							</h3>
							<p className="text-gray-600 text-sm">
								Be the first to know about prayers, lectures, community
								gatherings, and special celebrations
							</p>
						</div>

						<div className="text-center">
							<div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
								<BookOpen className="h-8 w-8 text-blue-600" />
							</div>
							<h3 className="font-medium text-gray-900 mb-2">Learn & Grow</h3>
							<p className="text-gray-600 text-sm">
								Receive Islamic reminders, educational content, and information
								about our learning programs
							</p>
						</div>

						<div className="text-center">
							<div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
								<Users className="h-8 w-8 text-purple-600" />
							</div>
							<h3 className="font-medium text-gray-900 mb-2">Stay Connected</h3>
							<p className="text-gray-600 text-sm">
								Be part of our growing community and stay updated on our mosque
								development progress
							</p>
						</div>
					</div>
				</div>
			</section>
		</div>
	);
}
