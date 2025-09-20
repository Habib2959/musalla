import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { useApiOnMount } from "../../lib/hooks/api-hooks";
import { SupabaseContentService } from "../../lib/services/supabase-content.service";
import type { MediaItem, MediaCategory, Event } from "../../lib/types";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { ImageWithFallback } from "../figma/ImageWithFallback";
import {
	Calendar,
	MapPin,
	Users,
	Clock,
	Filter,
	Camera,
	Heart,
	Share2,
	Play,
	Video,
} from "lucide-react";

export function EventsPage() {
	const [photoFilter, setPhotoFilter] = useState("All");
	const [videoFilter, setVideoFilter] = useState("All");
	const [eventFilter, setEventFilter] = useState("All");

	// API calls to fetch media data
	const {
		data: mediaItemsData,
		loading: mediaLoading,
		error: mediaError,
	} = useApiOnMount(() => SupabaseContentService.getMediaItems());

	const {
		data: mediaCategoriesData,
		loading: categoriesLoading,
		error: categoriesError,
	} = useApiOnMount(() => SupabaseContentService.getMediaCategories());

	const {
		data: eventsData,
		loading: eventsLoading,
		error: eventsError,
	} = useApiOnMount(() => SupabaseContentService.getEvents());

	// Extract media items and categories from API, with fallbacks
	const apiMediaItems = mediaItemsData?.[0]?.value || [];
	const apiMediaCategories = mediaCategoriesData?.[0]?.value || [];
	const apiEvents = eventsData?.[0]?.value || [];

	// Create category lookup map
	const categoryMap = apiMediaCategories.reduce(
		(acc: Record<string, string>, cat: MediaCategory) => {
			acc[cat.id] = cat.name;
			return acc;
		},
		{}
	);

	// Separate photos and videos from API data
	const apiPhotos = apiMediaItems
		.filter((item: MediaItem) => item.mediaType === "image")
		.map((item: MediaItem) => ({
			title: item.title,
			date: new Date(item.date).toLocaleDateString("en-US", {
				month: "long",
				year: "numeric",
			}),
			image: item.mediaLink,
			description: item.description,
			category: categoryMap[item.categoryId] || "Other",
		}));

	const apiVideos = apiMediaItems
		.filter((item: MediaItem) => item.mediaType === "video")
		.map((item: MediaItem) => ({
			title: item.title,
			date: new Date(item.date).toLocaleDateString("en-US", {
				month: "long",
				year: "numeric",
			}),
			thumbnail:
				item.mediaLink.includes("youtube") ||
				item.mediaLink.includes("youtu.be")
					? `https://img.youtube.com/vi/${getYouTubeVideoId(
							item.mediaLink
					  )}/maxresdefault.jpg`
					: item.mediaLink,
			duration: "N/A", // Duration would need to be added to API or calculated
			description: item.description,
			category: categoryMap[item.categoryId] || "Other",
		}));

	// Helper function to extract YouTube video ID
	function getYouTubeVideoId(url: string): string {
		const regExp =
			/^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
		const match = url.match(regExp);
		return match && match[2].length === 11 ? match[2] : "";
	}

	// Transform API events to display format
	const allEvents = apiEvents.map((event: Event) => {
		const eventDate = new Date(event.dateTime);
		const speakers = event.speakers.map((speaker) => speaker.name).join(", ");

		return {
			id: event.id,
			title: event.title,
			date:
				event.frequency ||
				eventDate.toLocaleDateString("en-US", {
					month: "long",
					day: "numeric",
					year: "numeric",
				}),
			time: event.frequency
				? ""
				: eventDate.toLocaleTimeString("en-US", {
						hour: "numeric",
						minute: "2-digit",
						hour12: true,
				  }),
			location: event.location,
			address: "", // Could be extracted from location if needed
			speaker: speakers || undefined,
			description: event.description,
			type: event.tags[0] || "General", // Use first tag as type
			featured: event.isFeatured,
			recurring: event.type === "recurring",
			image: "/api/placeholder/400/200", // Placeholder image
		};
	});

	// Create dynamic event types from API data
	const eventTypes = [
		"All",
		...Array.from(new Set(apiEvents.flatMap((event: Event) => event.tags))),
	];

	// Use only API data for photos and videos
	const allPhotos = apiPhotos;

	// Use only API data for videos
	const allVideos = apiVideos;

	// Create gallery categories from actual data
	const galleryCategories = [
		"All",
		...Array.from(
			new Set([
				...allPhotos.map((photo) => photo.category),
				...allVideos.map((video) => video.category),
			])
		),
	];

	const filteredPhotos =
		photoFilter === "All"
			? allPhotos
			: allPhotos.filter((item) => item.category === photoFilter);

	const filteredVideos =
		videoFilter === "All"
			? allVideos
			: allVideos.filter((item) => item.category === videoFilter);

	const filteredEvents =
		eventFilter === "All"
			? allEvents
			: allEvents.filter(
					(event) =>
						event.type === eventFilter ||
						apiEvents
							.find((apiEvent: Event) => apiEvent.id === event.id)
							?.tags.includes(eventFilter)
			  );

	return (
		<div className="min-h-screen bg-white/95 backdrop-blur-sm relative">
			{/* Hero Section */}
			<section className="py-24 bg-gradient-to-br from-green-700 via-green-600 to-green-800 text-white relative">
				<div className="absolute inset-0 bg-black opacity-20"></div>
				<div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
					<h1 className="text-4xl md:text-5xl mb-6">Community Events</h1>
					<p className="text-xl md:text-2xl max-w-2xl mx-auto">
						Join our vibrant community in worship, learning, and fellowship
						throughout the year
					</p>
				</div>
			</section>

			{/* Filter Section */}
			<section className="py-8 bg-gray-50">
				<div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
					<div className="flex items-center gap-4 flex-wrap">
						<Filter className="h-5 w-5 text-gray-600" />
						<span className="text-gray-700">Filter by type:</span>
						<div className="flex gap-2 flex-wrap">
							{eventTypes.map((type) => (
								<Badge
									key={type}
									variant={type === eventFilter ? "default" : "outline"}
									className="cursor-pointer hover:bg-green-600 hover:text-white transition-colors"
									onClick={() => setEventFilter(type)}
								>
									{type}
								</Badge>
							))}
						</div>
					</div>
				</div>
			</section>

			{/* Events Grid */}
			<section className="py-16">
				<div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
					{/* Error States */}
					{eventsError && (
						<div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
							<p className="text-red-600">
								Unable to load events. Showing default events.
							</p>
						</div>
					)}

					<div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
						{eventsLoading
							? // Loading skeleton for events
							  Array.from({ length: 6 }).map((_, index) => (
									<Card
										key={index}
										className="hover:shadow-lg transition-shadow"
									>
										<CardHeader className="pb-4">
											<div className="flex justify-between items-start mb-2">
												<div className="h-6 bg-gray-200 animate-pulse rounded w-20 mb-2"></div>
												<div className="h-6 bg-gray-200 animate-pulse rounded w-16"></div>
											</div>
											<div className="h-6 bg-gray-200 animate-pulse rounded mb-2"></div>
										</CardHeader>
										<CardContent className="space-y-3">
											<div className="h-4 bg-gray-200 animate-pulse rounded"></div>
											<div className="h-4 bg-gray-200 animate-pulse rounded"></div>
											<div className="h-4 bg-gray-200 animate-pulse rounded"></div>
											<div className="h-16 bg-gray-200 animate-pulse rounded"></div>
											<div className="flex gap-2 mt-4">
												<div className="h-10 bg-gray-200 animate-pulse rounded flex-1"></div>
												<div className="h-10 bg-gray-200 animate-pulse rounded w-20"></div>
											</div>
										</CardContent>
									</Card>
							  ))
							: filteredEvents.map((event) => (
									<Card
										key={event.id}
										className={`hover:shadow-lg transition-shadow ${
											event.featured ? "ring-2 ring-green-500" : ""
										}`}
									>
										<CardHeader className="pb-4">
											<div className="flex justify-between items-start mb-2">
												<Badge
													variant={
														event.type === "Fundraising"
															? "default"
															: "secondary"
													}
													className="mb-2"
												>
													{event.type}
												</Badge>
												<div className="flex gap-1">
													{event.featured && (
														<Badge className="bg-green-600 hover:bg-green-700">
															Featured
														</Badge>
													)}
													{event.recurring && (
														<Badge variant="outline">Recurring</Badge>
													)}
												</div>
											</div>
											<CardTitle className="text-lg leading-tight">
												{event.title}
											</CardTitle>
										</CardHeader>
										<CardContent className="space-y-3">
											<div className="flex items-center gap-2 text-gray-600">
												<Calendar className="h-4 w-4" />
												<span className="text-sm">{event.date}</span>
											</div>
											<div className="flex items-center gap-2 text-gray-600">
												<Clock className="h-4 w-4" />
												<span className="text-sm">{event.time}</span>
											</div>
											<div className="flex items-start gap-2 text-gray-600">
												<MapPin className="h-4 w-4 mt-0.5" />
												<div className="text-sm">
													<div>{event.location}</div>
													{event.address && (
														<div className="text-gray-500">{event.address}</div>
													)}
												</div>
											</div>
											{event.speaker && (
												<div className="flex items-center gap-2 text-gray-600">
													<Users className="h-4 w-4" />
													<span className="text-sm">
														Speaker: {event.speaker}
													</span>
												</div>
											)}
											<p className="text-sm text-gray-700 mt-3">
												{event.description}
											</p>
											<div className="flex gap-2 mt-4">
												<Button className="flex-1 bg-green-600 hover:bg-green-700">
													Learn More
												</Button>
												<Button variant="outline" size="sm">
													Share
												</Button>
											</div>
										</CardContent>
									</Card>
							  ))}
					</div>
				</div>
			</section>

			{/* Upcoming Highlights */}
			{/* <section className="py-16 bg-green-50">
				<div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
					<h2 className="text-3xl text-center text-gray-900 mb-8">
						Event Calendar Highlights
					</h2>
					<div className="bg-white rounded-lg p-8 shadow-sm">
						<h3 className="text-xl text-green-800 mb-6">
							This Month's Special Events
						</h3>
						<div className="space-y-4">
							<div className="border-l-4 border-green-600 pl-4">
								<h4 className="font-semibold">Community Iftar - April 9</h4>
								<p className="text-gray-600">
									Special fundraising dinner with guest speaker
								</p>
							</div>
							<div className="border-l-4 border-blue-600 pl-4">
								<h4 className="font-semibold">Youth Competition - March 15</h4>
								<p className="text-gray-600">
									Islamic knowledge competition for teenagers
								</p>
							</div>
							<div className="border-l-4 border-purple-600 pl-4">
								<h4 className="font-semibold">Eid Celebration - April 21</h4>
								<p className="text-gray-600">
									Community-wide Eid ul-Fitr celebration
								</p>
							</div>
						</div>
					</div>
				</div>
			</section> */}

			{/* Previous Events Photo Gallery */}
			<section className="py-16">
				<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
					<div className="text-center mb-8">
						<h2 className="text-3xl font-light text-gray-900 mb-4 tracking-tight">
							Photo Gallery
						</h2>
						<p className="text-lg text-gray-600 max-w-2xl mx-auto mb-8">
							Relive the beautiful moments from our past community gatherings
							and celebrations
						</p>

						{/* Error States */}
						{mediaError && (
							<div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
								<p className="text-red-600">
									Unable to load media content. Showing default gallery.
								</p>
							</div>
						)}

						{/* Photo Filter */}
						<div className="flex justify-center mb-8">
							<div className="flex items-center gap-4 flex-wrap">
								<Filter className="h-5 w-5 text-gray-600" />
								<span className="text-gray-700">Filter photos:</span>
								<div className="flex gap-2 flex-wrap">
									{galleryCategories.map((category) => (
										<Badge
											key={category}
											variant={category === photoFilter ? "default" : "outline"}
											className="cursor-pointer hover:bg-green-600 hover:text-white transition-colors"
											onClick={() => setPhotoFilter(category)}
										>
											{category}
										</Badge>
									))}
								</div>
							</div>
						</div>
					</div>

					<div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
						{mediaLoading
							? // Loading skeleton for photos
							  Array.from({ length: 6 }).map((_, index) => (
									<Card key={index} className="border-0 overflow-hidden">
										<div className="aspect-video bg-gray-200 animate-pulse"></div>
										<CardContent className="p-6">
											<div className="h-4 bg-gray-200 animate-pulse rounded mb-2"></div>
											<div className="h-6 bg-gray-200 animate-pulse rounded mb-3"></div>
											<div className="h-12 bg-gray-200 animate-pulse rounded mb-4"></div>
											<div className="flex gap-3">
												<div className="h-8 bg-gray-200 animate-pulse rounded flex-1"></div>
												<div className="h-8 bg-gray-200 animate-pulse rounded flex-1"></div>
											</div>
										</CardContent>
									</Card>
							  ))
							: filteredPhotos.map((event, index) => (
									<Card
										key={`${event.title}-${index}`}
										className="hover:shadow-lg transition-all duration-300 hover:scale-105 border-0 overflow-hidden"
									>
										<div className="aspect-video relative overflow-hidden">
											<ImageWithFallback
												src={event.image}
												alt={event.title}
												className="w-full h-full object-cover transition-transform duration-300 hover:scale-110"
											/>
											<div className="absolute top-4 right-4">
												<div className="bg-black/50 backdrop-blur-sm rounded-full p-2">
													<Camera className="h-4 w-4 text-white" />
												</div>
											</div>
											<div className="absolute bottom-4 left-4">
												<Badge className="bg-white/90 text-gray-800 hover:bg-white">
													{event.category}
												</Badge>
											</div>
										</div>
										<CardContent className="p-6">
											<div className="text-sm text-green-600 font-medium mb-2">
												{event.date}
											</div>
											<h3 className="font-medium text-gray-900 mb-3 leading-tight">
												{event.title}
											</h3>
											<p className="text-gray-600 text-sm leading-relaxed mb-4">
												{event.description}
											</p>
											<div className="flex items-center gap-3">
												<Button variant="outline" size="sm" className="flex-1">
													<Heart className="h-4 w-4 mr-1" />
													Like
												</Button>
												<Button variant="outline" size="sm" className="flex-1">
													<Share2 className="h-4 w-4 mr-1" />
													Share
												</Button>
											</div>
										</CardContent>
									</Card>
							  ))}
					</div>
				</div>
			</section>

			{/* Video Gallery */}
			<section className="py-16 bg-gray-50">
				<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
					<div className="text-center mb-8">
						<h2 className="text-3xl font-light text-gray-900 mb-4 tracking-tight">
							Video Gallery
						</h2>
						<p className="text-lg text-gray-600 max-w-2xl mx-auto mb-8">
							Watch recordings of our lectures, events, and community programs
						</p>

						{/* Error States */}
						{mediaError && (
							<div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
								<p className="text-red-600">
									Unable to load video content. Showing default gallery.
								</p>
							</div>
						)}

						{/* Video Filter */}
						<div className="flex justify-center mb-8">
							<div className="flex items-center gap-4 flex-wrap">
								<Video className="h-5 w-5 text-gray-600" />
								<span className="text-gray-700">Filter videos:</span>
								<div className="flex gap-2 flex-wrap">
									{galleryCategories.map((category) => (
										<Badge
											key={category}
											variant={category === videoFilter ? "default" : "outline"}
											className="cursor-pointer hover:bg-green-600 hover:text-white transition-colors"
											onClick={() => setVideoFilter(category)}
										>
											{category}
										</Badge>
									))}
								</div>
							</div>
						</div>
					</div>

					<div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
						{mediaLoading
							? // Loading skeleton for videos
							  Array.from({ length: 3 }).map((_, index) => (
									<Card
										key={index}
										className="border-0 overflow-hidden bg-white"
									>
										<div className="aspect-video bg-gray-200 animate-pulse relative">
											<div className="absolute inset-0 flex items-center justify-center">
												<div className="bg-gray-300 rounded-full p-4">
													<div className="h-8 w-8 bg-gray-400 animate-pulse rounded"></div>
												</div>
											</div>
										</div>
										<CardContent className="p-6">
											<div className="h-4 bg-gray-200 animate-pulse rounded mb-2"></div>
											<div className="h-6 bg-gray-200 animate-pulse rounded mb-3"></div>
											<div className="h-12 bg-gray-200 animate-pulse rounded mb-4"></div>
											<div className="flex gap-3">
												<div className="h-8 bg-gray-200 animate-pulse rounded flex-1"></div>
												<div className="h-8 bg-gray-200 animate-pulse rounded flex-1"></div>
											</div>
										</CardContent>
									</Card>
							  ))
							: filteredVideos.map((video, index) => (
									<Card
										key={`${video.title}-${index}`}
										className="group hover:shadow-lg transition-all duration-300 hover:scale-105 border-0 overflow-hidden bg-white"
									>
										<div className="aspect-video relative overflow-hidden">
											<ImageWithFallback
												src={video.thumbnail}
												alt={video.title}
												className="w-full h-full object-cover"
											/>
											<div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent flex items-center justify-center group-hover:from-black/70 group-hover:via-black/30 transition-all duration-300">
												<div className="bg-green-600 hover:bg-green-700 rounded-full p-4 shadow-2xl transform hover:scale-110 transition-all duration-300 cursor-pointer ring-4 ring-white/20">
													<Play className="h-8 w-8 text-white fill-white" />
												</div>
											</div>
											{video.duration !== "N/A" && (
												<div className="absolute top-4 right-4">
													<div className="bg-black/70 backdrop-blur-sm rounded-lg px-2 py-1">
														<span className="text-white text-sm font-medium">
															{video.duration}
														</span>
													</div>
												</div>
											)}
											<div className="absolute bottom-4 left-4">
												<Badge className="bg-white/90 text-gray-800 hover:bg-white">
													{video.category}
												</Badge>
											</div>
										</div>
										<CardContent className="p-6">
											<div className="text-sm text-green-600 font-medium mb-2">
												{video.date}
											</div>
											<h3 className="font-medium text-gray-900 mb-3 leading-tight">
												{video.title}
											</h3>
											<p className="text-gray-600 text-sm leading-relaxed mb-4">
												{video.description}
											</p>
											<div className="flex items-center gap-3">
												<Button variant="outline" size="sm" className="flex-1">
													<Heart className="h-4 w-4 mr-1" />
													Like
												</Button>
												<Button variant="outline" size="sm" className="flex-1">
													<Share2 className="h-4 w-4 mr-1" />
													Share
												</Button>
											</div>
										</CardContent>
									</Card>
							  ))}
					</div>
				</div>
			</section>

			{/* Event Submission */}
			<section className="py-16">
				<div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
					<h2 className="text-3xl text-gray-900 mb-6">Submit Your Event</h2>
					<p className="text-lg text-gray-600 mb-8">
						Have an Islamic event you'd like to share with our community? Let us
						know!
					</p>
					<Button size="lg" className="bg-green-600 hover:bg-green-700">
						Submit Event Proposal
					</Button>
				</div>
			</section>
		</div>
	);
}
