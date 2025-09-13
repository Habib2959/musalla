import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import {
	Play,
	Calendar,
	Clock,
	Users,
	Radio,
	Download,
	Share2,
} from "lucide-react";

export function MediaPage() {
	const liveStreams = [
		{
			id: 1,
			title: "Friday Jumu'ah Prayer",
			description: "Live weekly Friday prayers with khutbah",
			schedule: "Every Friday at 1:00 PM",
			isLive: false,
			nextStream: "Tomorrow at 1:00 PM",
		},
		{
			id: 2,
			title: "Evening Dua & Remembrance",
			description: "Community dhikr and dua session",
			schedule: "Every Tuesday at 8:00 PM",
			isLive: false,
			nextStream: "Tuesday at 8:00 PM",
		},
	];

	const videoLibrary = [
		{
			id: 1,
			title: "Islamic Ethics in Modern Business",
			speaker: "Dr. Abdullah Rahman",
			date: "February 15, 2025",
			duration: "45 min",
			thumbnail:
				"https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=225&fit=crop",
			views: 234,
			category: "Educational",
			featured: true,
		},
		{
			id: 2,
			title: "Community Iftar Highlights 2024",
			speaker: "Community Event",
			date: "April 10, 2024",
			duration: "12 min",
			thumbnail:
				"https://images.unsplash.com/photo-1544537150-6e4b998de2df?w=400&h=225&fit=crop",
			views: 456,
			category: "Events",
		},
		{
			id: 3,
			title: "Quranic Recitation Competition",
			speaker: "Youth Program",
			date: "March 20, 2024",
			duration: "38 min",
			thumbnail:
				"https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?w=400&h=225&fit=crop",
			views: 189,
			category: "Youth",
		},
		{
			id: 4,
			title: "The History of Islam in Canada",
			speaker: "Sheikh Fouad Aboud",
			date: "January 25, 2025",
			duration: "52 min",
			thumbnail:
				"https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=400&h=225&fit=crop",
			views: 367,
			category: "Historical",
		},
		{
			id: 5,
			title: "Ramadan Preparation Workshop",
			speaker: "Sister Fatima Al-Zahra",
			date: "February 28, 2025",
			duration: "35 min",
			thumbnail:
				"https://images.unsplash.com/photo-1542816417-0983c9c9ad53?w=400&h=225&fit=crop",
			views: 298,
			category: "Educational",
		},
		{
			id: 6,
			title: "New Convert Support Group",
			speaker: "Brother Omar Khan",
			date: "February 5, 2025",
			duration: "28 min",
			thumbnail:
				"https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=400&h=225&fit=crop",
			views: 156,
			category: "Support",
		},
	];

	const categories = [
		"All",
		"Educational",
		"Events",
		"Youth",
		"Historical",
		"Support",
	];

	const podcasts = [
		{
			id: 1,
			title: "Islamic Wisdom Weekly",
			description:
				"Weekly discussions on Islamic teachings and their application in daily life",
			episodes: 24,
			subscribers: "1.2K",
		},
		{
			id: 2,
			title: "Community Voices",
			description: "Stories and experiences from our diverse Muslim community",
			episodes: 18,
			subscribers: "856",
		},
	];

	return (
		<div className="min-h-screen bg-white/95 backdrop-blur-sm relative">
			{/* Hero Section */}
			<section className="py-24 bg-gradient-to-br from-purple-700 via-blue-600 to-green-600 text-white relative">
				<div className="absolute inset-0 bg-black opacity-20"></div>
				<div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
					<div className="text-6xl mb-4">📺</div>
					<h1 className="text-4xl md:text-5xl font-bold mb-6">
						Media & Streaming
					</h1>
					<p className="text-xl md:text-2xl max-w-2xl mx-auto">
						Watch our live streams, educational content, and community events.
						Stay connected with Islamic learning and community activities.
					</p>
				</div>
			</section>

			{/* Live Streams Section */}
			<section className="py-16">
				<div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
					<h2 className="text-3xl font-bold text-gray-900 mb-8">
						Live Streams
					</h2>
					<div className="grid md:grid-cols-2 gap-6 mb-12">
						{liveStreams.map((stream) => (
							<Card
								key={stream.id}
								className="hover:shadow-lg transition-shadow border-2 border-red-200"
							>
								<CardHeader>
									<div className="flex items-center justify-between">
										<CardTitle className="text-xl">{stream.title}</CardTitle>
										{stream.isLive ? (
											<Badge className="bg-red-500 hover:bg-red-600">
												<Radio className="h-3 w-3 mr-1" />
												LIVE
											</Badge>
										) : (
											<Badge
												variant="outline"
												className="border-red-500 text-red-600"
											>
												Scheduled
											</Badge>
										)}
									</div>
								</CardHeader>
								<CardContent className="space-y-4">
									<p className="text-gray-600">{stream.description}</p>
									<div className="flex items-center gap-4 text-sm text-gray-500">
										<div className="flex items-center gap-1">
											<Calendar className="h-4 w-4" />
											{stream.schedule}
										</div>
									</div>
									<div className="bg-blue-50 p-3 rounded-lg">
										<p className="text-blue-800 font-medium">
											Next Stream: {stream.nextStream}
										</p>
									</div>
									<div className="flex gap-2">
										<Button className="flex-1 bg-red-600 hover:bg-red-700">
											<Play className="mr-2 h-4 w-4" />
											{stream.isLive ? "Watch Live" : "Set Reminder"}
										</Button>
										<Button variant="outline" size="sm">
											<Share2 className="h-4 w-4" />
										</Button>
									</div>
								</CardContent>
							</Card>
						))}
					</div>
				</div>
			</section>

			{/* Video Library Section */}
			<section className="py-16 bg-gray-50">
				<div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
					<div className="flex justify-between items-center mb-8">
						<h2 className="text-3xl font-bold text-gray-900">Video Library</h2>
						<div className="flex gap-2 flex-wrap">
							{categories.map((category) => (
								<Badge
									key={category}
									variant={category === "All" ? "default" : "outline"}
									className="cursor-pointer hover:bg-blue-600 hover:text-white transition-colors"
								>
									{category}
								</Badge>
							))}
						</div>
					</div>

					<div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
						{videoLibrary.map((video) => (
							<Card
								key={video.id}
								className="hover:shadow-lg transition-shadow overflow-hidden"
							>
								<div className="relative">
									<img
										src={video.thumbnail}
										alt={video.title}
										className="w-full h-48 object-cover"
									/>
									<div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity cursor-pointer">
										<Button
											size="lg"
											className="bg-white/20 hover:bg-white/30 text-white border-white/50"
										>
											<Play className="mr-2 h-5 w-5" />
											Play
										</Button>
									</div>
									<div className="absolute bottom-2 right-2 bg-black/70 text-white text-xs px-2 py-1 rounded">
										{video.duration}
									</div>
									{video.featured && (
										<Badge className="absolute top-2 left-2 bg-orange-500">
											Featured
										</Badge>
									)}
								</div>

								<CardContent className="p-4">
									<h3 className="font-semibold text-lg mb-2 line-clamp-2">
										{video.title}
									</h3>
									<p className="text-gray-600 text-sm mb-2">{video.speaker}</p>

									<div className="flex items-center justify-between text-sm text-gray-500 mb-3">
										<div className="flex items-center gap-1">
											<Calendar className="h-3 w-3" />
											{video.date}
										</div>
										<div className="flex items-center gap-1">
											<Users className="h-3 w-3" />
											{video.views} views
										</div>
									</div>

									<div className="flex items-center justify-between">
										<Badge variant="outline" className="text-xs">
											{video.category}
										</Badge>
										<div className="flex gap-1">
											<Button variant="ghost" size="sm">
												<Download className="h-4 w-4" />
											</Button>
											<Button variant="ghost" size="sm">
												<Share2 className="h-4 w-4" />
											</Button>
										</div>
									</div>
								</CardContent>
							</Card>
						))}
					</div>

					<div className="text-center mt-8">
						<Button variant="outline" size="lg">
							Load More Videos
						</Button>
					</div>
				</div>
			</section>

			{/* Podcasts Section */}
			<section className="py-16">
				<div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
					<h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
						Podcasts
					</h2>
					<div className="grid md:grid-cols-2 gap-6">
						{podcasts.map((podcast) => (
							<Card
								key={podcast.id}
								className="hover:shadow-lg transition-shadow"
							>
								<CardContent className="p-6">
									<div className="flex items-start gap-4">
										<div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-blue-600 rounded-lg flex items-center justify-center text-white text-2xl">
											🎧
										</div>
										<div className="flex-1">
											<h3 className="font-semibold text-lg mb-2">
												{podcast.title}
											</h3>
											<p className="text-gray-600 text-sm mb-3">
												{podcast.description}
											</p>
											<div className="flex items-center gap-4 text-sm text-gray-500 mb-3">
												<span>{podcast.episodes} episodes</span>
												<span>{podcast.subscribers} subscribers</span>
											</div>
											<Button className="bg-purple-600 hover:bg-purple-700">
												<Play className="mr-2 h-4 w-4" />
												Listen Now
											</Button>
										</div>
									</div>
								</CardContent>
							</Card>
						))}
					</div>
				</div>
			</section>

			{/* Subscription Section */}
			<section className="py-16 bg-gradient-to-r from-blue-600 to-purple-600 text-white">
				<div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
					<h2 className="text-3xl font-bold mb-6">Stay Updated</h2>
					<p className="text-xl mb-8">
						Subscribe to get notified about new videos, live streams, and
						educational content.
					</p>
					<div className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto">
						<input
							type="email"
							placeholder="Enter your email"
							className="flex-1 px-4 py-3 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-white"
						/>
						<Button className="bg-white text-blue-600 hover:bg-gray-100 px-6 py-3">
							Subscribe
						</Button>
					</div>
					<p className="text-sm mt-4 text-blue-100">
						Join 2,500+ community members getting updates
					</p>
				</div>
			</section>

			{/* Technical Info */}
			<section className="py-16 bg-gray-50">
				<div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
					<h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">
						Streaming Information
					</h2>
					<div className="grid md:grid-cols-2 gap-8">
						<div className="bg-white rounded-lg p-6">
							<h3 className="font-semibold text-lg mb-4">How to Watch</h3>
							<ul className="space-y-2 text-gray-600">
								<li>• Live streams available on our website</li>
								<li>• No registration required for public content</li>
								<li>• HD quality video and clear audio</li>
								<li>• Mobile-friendly viewing experience</li>
								<li>• Recordings available after live streams</li>
							</ul>
						</div>

						<div className="bg-white rounded-lg p-6">
							<h3 className="font-semibold text-lg mb-4">Technical Support</h3>
							<ul className="space-y-2 text-gray-600">
								<li>• Having trouble? Contact us during streams</li>
								<li>• Recommended: Chrome or Firefox browser</li>
								<li>• Minimum 1 Mbps internet connection</li>
								<li>• Enable JavaScript for best experience</li>
								<li>• Mobile apps coming soon</li>
							</ul>
						</div>
					</div>
				</div>
			</section>
		</div>
	);
}
