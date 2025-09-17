import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { Calendar, MapPin, Users, Clock, Mail, Phone } from "lucide-react";
import { useRouter } from "./Router";
import { useApiOnMount } from "../lib/hooks/api-hooks";
import { SupabaseContentService } from "../lib/services/supabase-content.service";

export function EventsSection() {
	const { navigateTo } = useRouter();

	// Fetch events from API
	const {
		data: eventsData,
		loading: eventsLoading,
		error: eventsError,
	} = useApiOnMount(() => SupabaseContentService.getEvents());

	// Transform API events to display format (upcoming 4 only)
	const apiEvents = eventsData?.[0]?.value || [];
	const now = new Date();
	const upcomingEvents = apiEvents
		.filter((event) => {
			// Only show events in the future or recurring
			if (event.type === "recurring") return true;
			const eventDate = new Date(event.dateTime);
			return eventDate >= now;
		})
		.sort((a, b) => {
			// Sort by date ascending
			const aDate = new Date(a.dateTime);
			const bDate = new Date(b.dateTime);
			return aDate.getTime() - bDate.getTime();
		})
		.slice(0, 4)
		.map((event) => {
			const eventDate = new Date(event.dateTime);
			const month = eventDate
				.toLocaleString("en-US", { month: "short" })
				.toUpperCase();
			const day = eventDate.toLocaleString("en-US", { weekday: "short" });
			const date = eventDate.getDate().toString();
			return {
				date,
				month,
				day,
				title: event.title,
				time: eventDate.toLocaleTimeString("en-US", {
					hour: "numeric",
					minute: "2-digit",
					hour12: true,
				}),
				type: event.tags?.[0] || "General",
				color:
					event.tags?.[0] === "Fundraising"
						? "bg-green-500"
						: event.tags?.[0] === "Youth"
						? "bg-blue-500"
						: event.tags?.[0] === "Educational"
						? "bg-purple-500"
						: "bg-emerald-500",
			};
		});

	return (
		<section id="events" className="py-24 bg-gray-50">
			<div className="max-w-7xl mx-auto px-6">
				<div className="text-center mb-16">
					<h2 className="text-4xl font-light text-gray-900 mb-8 tracking-tight">
						Event Calendar Highlights
					</h2>
					<p className="text-xl text-gray-700 max-w-3xl mx-auto leading-relaxed">
						Stay connected with our vibrant community through worship, learning,
						and fellowship
					</p>
				</div>

				<div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
					{upcomingEvents.map((highlight, index) => (
						<Card
							key={index}
							className="hover:shadow-lg transition-all duration-300 hover:scale-105 border-0 overflow-hidden"
						>
							<div className={`${highlight.color} text-white text-center py-4`}>
								<div className="text-3xl font-light mb-1">{highlight.date}</div>
								<div className="text-sm font-medium">{highlight.month}</div>
								<div className="text-xs opacity-90">{highlight.day}</div>
							</div>
							<CardContent className="p-6">
								<Badge variant="outline" className="mb-3 text-xs">
									{highlight.type}
								</Badge>
								<h3 className="font-medium text-gray-900 mb-2 leading-tight">
									{highlight.title}
								</h3>
								<div className="flex items-center gap-2 text-gray-600">
									<Clock className="h-4 w-4" />
									<span className="text-sm">{highlight.time}</span>
								</div>
							</CardContent>
						</Card>
					))}
				</div>

				{/* Community Join Section */}
				<div className="bg-gradient-to-r from-green-600 to-emerald-600 rounded-3xl p-12 text-center text-white">
					<h3 className="text-3xl font-light mb-6">Join Our Community</h3>
					<p className="text-xl mb-8 max-w-3xl mx-auto leading-relaxed font-light">
						Be part of our upcoming events and create new memories with our
						community. Connect with fellow Muslims, learn together, and
						strengthen your faith in a welcoming environment.
					</p>

					<div className="flex flex-col sm:flex-row gap-6 justify-center max-w-lg mx-auto">
						<Button
							onClick={() => navigateTo("contact")}
							className="bg-white text-green-700 hover:bg-green-50 px-8 py-4 h-14 text-lg font-medium rounded-full transition-all duration-300 hover:scale-105 shadow-lg"
						>
							<Phone className="h-5 w-5 mr-2" />
							Contact Us
						</Button>
						<Button
							onClick={() => navigateTo("events")}
							variant="outline"
							className="bg-white text-green-700 hover:bg-green-50 px-8 py-4 h-14 text-lg font-medium rounded-full transition-all duration-300 hover:scale-105 shadow-lg"
						>
							<Calendar className="h-5 w-5 mr-2" />
							Latest News
						</Button>
					</div>
				</div>
			</div>
		</section>
	);
}
