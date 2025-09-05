import image_79f28ada02b22a35859801d21c69cc22cc354345 from "figma:asset/79f28ada02b22a35859801d21c69cc22cc354345.png";
import { useState } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../ui/card";
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
  const allEvents = [
    {
      id: 1,
      title: "Community Iftar and Fundraising 2025",
      date: "April 9, 2025",
      time: "6:00 PM",
      location: "Bonsor Hall, Bonsor Recreation Complex",
      address: "6550 Bonsor Ave, Burnaby BC V5H 3G4",
      speaker: "Sheikh Fouad Aboud",
      description:
        "Join us for a blessed evening of community, reflection, and supporting our mosque development. This special gathering will feature recitation, lecture, and community dinner.",
      type: "Fundraising",
      featured: true,
      image: "/api/placeholder/400/200",
    },
    {
      id: 2,
      title: "Weekly Quran Study Circle",
      date: "Every Saturday",
      time: "2:00 PM - 4:00 PM",
      location: "Main Prayer Hall",
      description:
        "Deep study of Quranic verses with Arabic language learning components. All levels welcome.",
      type: "Educational",
      featured: false,
      recurring: true,
    },
    {
      id: 3,
      title: "Youth Islamic Knowledge Competition",
      date: "March 15, 2025",
      time: "10:00 AM",
      location: "Community Center",
      description:
        "Annual competition for youth aged 12-18 covering Islamic history, Quran, and current affairs.",
      type: "Youth",
      featured: false,
    },
    {
      id: 4,
      title: "Eid ul-Fitr Celebration",
      date: "April 21, 2025",
      time: "8:00 AM",
      location: "Central Park, Burnaby",
      description:
        "Community-wide Eid celebration with prayers, food, activities for children, and cultural programs.",
      type: "Celebration",
      featured: true,
    },
    {
      id: 5,
      title: "Friday Khutbah Series: Islamic Ethics",
      date: "Every Friday",
      time: "1:00 PM",
      location: "Main Prayer Hall",
      description:
        "Monthly series focusing on Islamic ethics in modern life. This month: Business Ethics in Islam.",
      type: "Religious",
      featured: false,
      recurring: true,
    },
    {
      id: 6,
      title: "Community Food Drive",
      date: "February 28, 2025",
      time: "10:00 AM - 4:00 PM",
      location: "Mosque Parking Lot",
      description:
        "Monthly food collection for local food banks. Bring non-perishable items to help families in need.",
      type: "Service",
      featured: false,
    },
  ];

  const eventTypes = [
    "All",
    "Fundraising",
    "Educational",
    "Youth",
    "Celebration",
    "Religious",
    "Service",
  ];

  const pastEventsGallery = [
    {
      title: "Eid ul-Adha Celebration 2024",
      date: "June 16, 2024",
      image:
        "https://images.unsplash.com/photo-1542816417-0983c9c9ad53?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      description:
        "Beautiful community gathering for Eid ul-Adha with prayers, food, and celebrations",
      category: "Celebration",
    },
    {
      title: "Ramadan Iftar 2024",
      date: "April 2024",
      image: image_79f28ada02b22a35859801d21c69cc22cc354345,
      description:
        "Community iftar dinners throughout the blessed month of Ramadan",
      category: "Religious",
    },
    {
      title: "Islamic Knowledge Competition",
      date: "March 2024",
      image:
        "https://images.unsplash.com/photo-1523240795612-9a054b0db644?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      description:
        "Youth showcasing their Islamic knowledge in a friendly competition",
      category: "Youth",
    },
    {
      title: "Community Fundraising Dinner",
      date: "February 2024",
      image:
        "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      description:
        "Successful fundraising event for our mosque development project",
      category: "Fundraising",
    },
    {
      title: "Quran Recitation Competition",
      date: "January 2024",
      image:
        "https://images.unsplash.com/photo-1585036153215-ec43d51d2e4a?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      description:
        "Beautiful recitation competition for community members of all ages",
      category: "Educational",
    },
    {
      title: "Winter Community Gathering",
      date: "December 2023",
      image:
        "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      description:
        "Warm community gathering with lectures, food, and fellowship",
      category: "Service",
    },
  ];

  const videoGallery = [
    {
      title: "Imam Khutbah - Faith in Times of Hardship",
      date: "January 2025",
      thumbnail:
        "https://images.unsplash.com/photo-1584464491033-06628f3a6b7b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      duration: "25:30",
      description:
        "Weekly Friday Khutbah about maintaining faith during difficult times",
      category: "Religious",
    },
    {
      title: "Youth Panel - Islam in Modern Society",
      date: "December 2024",
      thumbnail:
        "https://images.unsplash.com/photo-1523240795612-9a054b0db644?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      duration: "45:15",
      description:
        "Young Muslims discussing challenges and opportunities in contemporary life",
      category: "Youth",
    },
    {
      title: "Eid ul-Fitr Celebration Highlights",
      date: "April 2024",
      thumbnail:
        "https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      duration: "12:45",
      description:
        "Beautiful moments from our community Eid celebration",
      category: "Celebration",
    },
  ];

  const galleryCategories = [
    "All",
    "Religious",
    "Educational",
    "Youth",
    "Celebration",
    "Fundraising",
    "Service",
  ];

  const filteredPhotos =
    photoFilter === "All"
      ? pastEventsGallery
      : pastEventsGallery.filter(
          (item) => item.category === photoFilter,
        );

  const filteredVideos =
    videoFilter === "All"
      ? videoGallery
      : videoGallery.filter(
          (item) => item.category === videoFilter,
        );

  return (
    <div className="min-h-screen bg-white/95 backdrop-blur-sm relative">
      {/* Hero Section */}
      <section className="py-24 bg-gradient-to-br from-green-700 via-green-600 to-green-800 text-white relative">
        <div className="absolute inset-0 bg-black opacity-20"></div>
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl mb-6">
            Community Events
          </h1>
          <p className="text-xl md:text-2xl max-w-2xl mx-auto">
            Join our vibrant community in worship, learning, and
            fellowship throughout the year
          </p>
        </div>
      </section>

      {/* Filter Section */}
      <section className="py-8 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-4 flex-wrap">
            <Filter className="h-5 w-5 text-gray-600" />
            <span className="text-gray-700">
              Filter by type:
            </span>
            <div className="flex gap-2 flex-wrap">
              {eventTypes.map((type) => (
                <Badge
                  key={type}
                  variant={
                    type === "All" ? "default" : "outline"
                  }
                  className="cursor-pointer hover:bg-green-600 hover:text-white transition-colors"
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
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {allEvents.map((event) => (
              <Card
                key={event.id}
                className={`hover:shadow-lg transition-shadow ${event.featured ? "ring-2 ring-green-500" : ""}`}
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
                        <Badge variant="outline">
                          Recurring
                        </Badge>
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
                    <span className="text-sm">
                      {event.date}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-600">
                    <Clock className="h-4 w-4" />
                    <span className="text-sm">
                      {event.time}
                    </span>
                  </div>
                  <div className="flex items-start gap-2 text-gray-600">
                    <MapPin className="h-4 w-4 mt-0.5" />
                    <div className="text-sm">
                      <div>{event.location}</div>
                      {event.address && (
                        <div className="text-gray-500">
                          {event.address}
                        </div>
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
      <section className="py-16 bg-green-50">
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
                <h4 className="font-semibold">
                  Community Iftar - April 9
                </h4>
                <p className="text-gray-600">
                  Special fundraising dinner with guest speaker
                </p>
              </div>
              <div className="border-l-4 border-blue-600 pl-4">
                <h4 className="font-semibold">
                  Youth Competition - March 15
                </h4>
                <p className="text-gray-600">
                  Islamic knowledge competition for teenagers
                </p>
              </div>
              <div className="border-l-4 border-purple-600 pl-4">
                <h4 className="font-semibold">
                  Eid Celebration - April 21
                </h4>
                <p className="text-gray-600">
                  Community-wide Eid ul-Fitr celebration
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Previous Events Photo Gallery */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-light text-gray-900 mb-4 tracking-tight">
              Photo Gallery
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto mb-8">
              Relive the beautiful moments from our past
              community gatherings and celebrations
            </p>

            {/* Photo Filter */}
            <div className="flex justify-center mb-8">
              <div className="flex items-center gap-4 flex-wrap">
                <Filter className="h-5 w-5 text-gray-600" />
                <span className="text-gray-700">
                  Filter photos:
                </span>
                <div className="flex gap-2 flex-wrap">
                  {galleryCategories.map((category) => (
                    <Badge
                      key={category}
                      variant={
                        category === photoFilter
                          ? "default"
                          : "outline"
                      }
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
            {filteredPhotos.map((event, index) => (
              <Card
                key={index}
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
                    <Button
                      variant="outline"
                      size="sm"
                      className="flex-1"
                    >
                      <Heart className="h-4 w-4 mr-1" />
                      Like
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      className="flex-1"
                    >
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
              Watch recordings of our lectures, events, and
              community programs
            </p>

            {/* Video Filter */}
            <div className="flex justify-center mb-8">
              <div className="flex items-center gap-4 flex-wrap">
                <Video className="h-5 w-5 text-gray-600" />
                <span className="text-gray-700">
                  Filter videos:
                </span>
                <div className="flex gap-2 flex-wrap">
                  {galleryCategories.map((category) => (
                    <Badge
                      key={category}
                      variant={
                        category === videoFilter
                          ? "default"
                          : "outline"
                      }
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
            {filteredVideos.map((video, index) => (
              <Card
                key={index}
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
                  <div className="absolute top-4 right-4">
                    <div className="bg-black/70 backdrop-blur-sm rounded-lg px-2 py-1">
                      <span className="text-white text-sm font-medium">
                        {video.duration}
                      </span>
                    </div>
                  </div>
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
                    <Button
                      variant="outline"
                      size="sm"
                      className="flex-1"
                    >
                      <Heart className="h-4 w-4 mr-1" />
                      Like
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      className="flex-1"
                    >
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
          <h2 className="text-3xl text-gray-900 mb-6">
            Submit Your Event
          </h2>
          <p className="text-lg text-gray-600 mb-8">
            Have an Islamic event you'd like to share with our
            community? Let us know!
          </p>
          <Button
            size="lg"
            className="bg-green-600 hover:bg-green-700"
          >
            Submit Event Proposal
          </Button>
        </div>
      </section>
    </div>
  );
}