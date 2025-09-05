import { Button } from "./ui/button";
import { useRouter } from "./Router";
import { MapPin, Users, Calendar, Heart } from "lucide-react";

export function HeroSection() {
  const { navigateTo } = useRouter();

  return (
    <section className="relative bg-gradient-to-br from-green-600 via-green-700 to-green-800 text-white overflow-hidden min-h-[85vh] flex items-center">
      {/* Enhanced Islamic Pattern Background */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-20 left-20">
          <svg
            width="120"
            height="120"
            viewBox="0 0 100 100"
            className="text-white"
          >
            <defs>
              <pattern
                id="islamicPattern"
                x="0"
                y="0"
                width="20"
                height="20"
                patternUnits="userSpaceOnUse"
              >
                <circle
                  cx="10"
                  cy="10"
                  r="1"
                  fill="currentColor"
                />
                <path
                  d="M10 5 L15 10 L10 15 L5 10 Z"
                  fill="currentColor"
                  opacity="0.3"
                />
              </pattern>
            </defs>
            <rect
              width="100"
              height="100"
              fill="url(#islamicPattern)"
            />
          </svg>
        </div>
        <div className="absolute bottom-20 right-20">
          <svg
            width="80"
            height="80"
            viewBox="0 0 60 60"
            className="text-white"
          >
            <path
              d="M30 5 Q35 20 30 25 Q25 20 30 5"
              fill="currentColor"
            />
            <circle
              cx="25"
              cy="15"
              r="1.5"
              fill="currentColor"
            />
            <circle
              cx="35"
              cy="15"
              r="1.5"
              fill="currentColor"
            />
            <path
              d="M15 35 Q30 45 45 35"
              stroke="currentColor"
              strokeWidth="0.5"
              fill="none"
            />
          </svg>
        </div>
        <div className="absolute top-40 right-1/4">
          <svg
            width="100"
            height="100"
            viewBox="0 0 100 100"
            className="text-white"
          >
            <path
              d="M50 10 L55 40 L50 45 L45 40 Z"
              fill="currentColor"
            />
            <circle
              cx="50"
              cy="25"
              r="8"
              stroke="currentColor"
              strokeWidth="1"
              fill="none"
            />
          </svg>
        </div>
      </div>

      <div className="absolute inset-0 bg-black/10"></div>
      <div className="relative max-w-7xl mx-auto px-6 py-20 w-full">
        <div className="max-w-5xl mx-auto text-center">
          {/* Bismillah */}
          <div className="mb-12">
            <div className="text-2xl md:text-3xl text-green-100 mb-3 tracking-wide font-light">
              بِسْمِ اللهِ الرَّحْمٰنِ الرَّحِيْمِ
            </div>
            <div className="text-green-200 text-lg italic font-light">
              In the name of Allah, the Most Gracious, the Most
              Merciful
            </div>
          </div>

          {/* Main Title */}
          <h1 className="text-6xl md:text-8xl font-light mb-6 tracking-tight leading-none">
            Marpole Musalla
          </h1>
          <div className="text-2xl md:text-3xl font-light text-green-100 mb-4 tracking-wide">
            New Westminster Islamic Society
          </div>

          {/* Subtitle */}
          <p className="text-xl md:text-2xl mb-16 max-w-4xl mx-auto leading-relaxed font-light text-green-50/90">
            New Westminster Islamic Society — Building a vibrant
            Muslim community through faith, knowledge, and
            service in the heart of Vancouver
          </p>

          {/* Key Info Cards */}
          <div className="grid md:grid-cols-3 gap-6 mb-16 max-w-4xl mx-auto">
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
              <MapPin className="h-8 w-8 text-green-200 mx-auto mb-3" />
              <div className="text-green-100 font-medium mb-1">
                Location
              </div>
              <div className="text-green-200 text-sm">
                8879 Selkirk Street
              </div>
              <div className="text-green-200 text-sm">
                Vancouver, BC
              </div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
              <Users className="h-8 w-8 text-green-200 mx-auto mb-3" />
              <div className="text-green-100 font-medium mb-1">
                Community
              </div>
              <div className="text-green-200 text-sm">
                200+ Members
              </div>
              <div className="text-green-200 text-sm">
                All Welcome
              </div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
              <Calendar className="h-8 w-8 text-green-200 mx-auto mb-3" />
              <div className="text-green-100 font-medium mb-1">
                Next Jumu'ah
              </div>
              <div className="text-green-200 text-sm">
                Friday 1:00 PM
              </div>
              <div className="text-green-200 text-sm">
                Join Us
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-6 justify-center max-w-lg mx-auto">
            <Button
              onClick={() => navigateTo("events")}
              className="bg-white text-green-800 hover:bg-green-50 px-10 py-4 h-14 text-lg font-medium rounded-full transition-all duration-300 hover:scale-105 shadow-lg"
            >
              <Calendar className="h-5 w-5 mr-2" />
              View Events
            </Button>
            <Button
              onClick={() => navigateTo("mosque-project")}
              variant="outline"
              className="border-2 border-white text-white hover:bg-white hover:text-green-800 px-10 py-4 h-14 text-lg font-medium rounded-full transition-all duration-300 hover:scale-105"
            >
              <Heart className="h-5 w-5 mr-2" />
              Support Mosque
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}