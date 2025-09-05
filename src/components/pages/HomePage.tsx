import { HeroSection } from "../HeroSection";
import { PrayerTimes } from "../PrayerTimes";
import { EventsSection } from "../EventsSection";
import { ProgramsSection } from "../ProgramsSection";
import { QuoteSection } from "../QuoteSection";
import { Button } from "../ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Progress } from "../ui/progress";
import { useRouter } from "../Router";
import {
  Heart,
  Home,
  Users,
  Calendar,
  GraduationCap,
  BookOpen,
  Baby,
  HandHeart,
  Building2,
  Phone,
  Mail,
  MapPin,
  ChevronRight,
} from "lucide-react";

export function HomePage() {
  const { navigateTo } = useRouter();

  const projectGoal = 50000;
  const currentAmount = 32000;
  const progressPercentage = Math.round(
    (currentAmount / projectGoal) * 100,
  );

  const projectGoals = [
    {
      icon: Building2,
      title:
        "Establish a large masjid with comprehensive facilities",
      description:
        "Creating a spacious worship center for our growing community",
    },
    {
      icon: Heart,
      title: "Provide funeral services for the deceased",
      description:
        "Offering dignified Islamic funeral services and support",
    },
    {
      icon: GraduationCap,
      title:
        "Create separate fulltime madrashas for boys and girls",
      description:
        "Comprehensive Islamic education in dedicated facilities",
    },
    {
      icon: BookOpen,
      title: "Offer afternoon Islamic schools for all grades",
      description:
        "After-school Islamic education programs for children",
    },
    {
      icon: Users,
      title:
        "Implement full time and part time Tahfiz programs",
      description:
        "Quran memorization programs for different commitment levels",
    },
    {
      icon: Baby,
      title: "Develop orphanage care and outreach program",
      description:
        "Supporting orphaned children and vulnerable families",
    },
    {
      icon: HandHeart,
      title:
        "Organize social and community service initiatives",
      description:
        "Building bridges and serving the wider community",
    },
  ];

  return (
    <div className="bg-white">
      {/* Hero Section */}
      <HeroSection />

      {/* Mosque Project Summary */}
      <section className="py-16 bg-green-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-light text-gray-900 mb-4 tracking-tight">
              Our Mosque Development Project
            </h2>
            <p className="text-xl text-gray-700 max-w-3xl mx-auto leading-relaxed">
              Help us build a beautiful, permanent mosque
              facility that will serve our growing community for
              generations to come
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-12 items-start">
            {/* Progress Section */}
            <div className="lg:col-span-2">
              <Card className="shadow-lg border-0">
                <CardHeader className="text-center pb-6">
                  <div className="text-5xl font-light text-green-600 mb-2">
                    ${currentAmount.toLocaleString()}
                  </div>
                  <div className="text-lg text-gray-600">
                    raised of ${projectGoal.toLocaleString()}{" "}
                    goal
                  </div>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm font-medium">
                      <span>Progress</span>
                      <span>
                        {progressPercentage}% Complete
                      </span>
                    </div>
                    <Progress
                      value={progressPercentage}
                      className="h-3"
                    />
                  </div>

                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4 text-center">
                    <div className="bg-blue-50 rounded-xl p-4">
                      <div className="text-2xl font-light text-blue-600 mb-1">
                        150+
                      </div>
                      <div className="text-gray-600 text-sm font-medium">
                        Contributors
                      </div>
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
                      <div className="text-2xl font-light text-orange-600 mb-1">
                        $
                        {(
                          projectGoal - currentAmount
                        ).toLocaleString()}
                      </div>
                      <div className="text-gray-600 text-sm font-medium">
                        Remaining
                      </div>
                    </div>
                    <div className="bg-green-50 rounded-xl p-4">
                      <div className="text-2xl font-light text-green-600 mb-1">
                        300+
                      </div>
                      <div className="text-gray-600 text-sm font-medium">
                        Prayer Capacity
                      </div>
                    </div>
                    <div className="bg-red-50 rounded-xl p-4">
                      <div className="text-2xl font-light text-red-600 mb-1">
                        5
                      </div>
                      <div className="text-gray-600 text-sm font-medium">
                        Construction Phases
                      </div>
                    </div>
                    <div className="bg-indigo-50 rounded-xl p-4">
                      <div className="text-2xl font-light text-indigo-600 mb-1">
                        500+
                      </div>
                      <div className="text-gray-600 text-sm font-medium">
                        Volunteer Hours
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-col sm:flex-row gap-4 pt-4">
                    <Button
                      onClick={() =>
                        navigateTo("mosque-project")
                      }
                      size="lg"
                      className="flex-1 bg-green-600 hover:bg-green-700 text-lg py-6 rounded-full transition-all duration-300 hover:scale-105"
                    >
                      <Heart className="mr-2 h-5 w-5" />
                      Support the Mosque
                    </Button>
                    <Button
                      onClick={() =>
                        navigateTo("mosque-project")
                      }
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

            {/* Project Goals Sidebar */}
            <div className="lg:col-span-1">
              <Card className="shadow-lg border-0 bg-gradient-to-br from-green-50 to-emerald-50">
                <CardHeader>
                  <CardTitle className="text-xl text-green-900">
                    Project Goals
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {projectGoals.map((goal, index) => (
                    <div
                      key={index}
                      className="flex items-start gap-3"
                    >
                      <div className="bg-white rounded-lg p-2 flex-shrink-0">
                        <goal.icon className="h-4 w-4 text-green-600" />
                      </div>
                      <div>
                        <h4 className="text-sm font-medium text-green-900 leading-tight mb-1">
                          {goal.title}
                        </h4>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Welcome & Prayer Times Section */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-3 gap-16 items-start">
            <div className="lg:col-span-2">
              <h2 className="text-4xl font-light text-gray-900 mb-8 tracking-tight">
                Welcome to Our Community
              </h2>
              <div className="space-y-6 text-gray-700 text-lg leading-relaxed">
                <p>
                  New Westminster Islamic Society (NWMIS) is a
                  non-profit organization that serves the
                  growing Muslim community in the Greater
                  Vancouver area. Our mission is to provide a
                  place of worship, learning, and community
                  building that strengthens our faith and serves
                  our neighbors.
                </p>
                <p>
                  We offer daily prayers, educational programs,
                  community events, and support services for
                  Muslims and those interested in learning about
                  Islam. Our doors are open to all, regardless
                  of background or level of Islamic knowledge.
                </p>
              </div>
            </div>

            <div className="lg:col-span-1">
              <PrayerTimes />
            </div>
          </div>
        </div>
      </section>

      {/* Mission, Vision, Values Section */}
      <section className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-light text-gray-900 mb-8 tracking-tight">
              Our Foundation
            </h2>
            <p className="text-xl text-gray-700 max-w-3xl mx-auto leading-relaxed">
              Built on Islamic principles and guided by our
              commitment to serve Allah and our community
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-12">
            {/* Mission */}
            <Card className="border-0 shadow-lg bg-white">
              <CardHeader className="text-center">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Building2 className="h-8 w-8 text-green-600" />
                </div>
                <CardTitle className="text-2xl text-gray-900 mb-4">
                  Our Mission
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700 leading-relaxed text-center">
                  To establish and maintain a vibrant Islamic
                  community that serves Allah (SWT) through
                  worship, education, and service to humanity.
                  We strive to be a beacon of Islamic values
                  while contributing positively to Canadian
                  society.
                </p>
              </CardContent>
            </Card>

            {/* Vision */}
            <Card className="border-0 shadow-lg bg-white">
              <CardHeader className="text-center">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Heart className="h-8 w-8 text-blue-600" />
                </div>
                <CardTitle className="text-2xl text-gray-900 mb-4">
                  Our Vision
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700 leading-relaxed text-center">
                  A thriving Muslim community that exemplifies
                  the beauty of Islam through knowledge,
                  compassion, and unity, while fostering
                  interfaith dialogue and understanding in
                  Greater Vancouver.
                </p>
              </CardContent>
            </Card>

            {/* Values */}
            <Card className="border-0 shadow-lg bg-white">
              <CardHeader className="text-center">
                <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Users className="h-8 w-8 text-purple-600" />
                </div>
                <CardTitle className="text-2xl text-gray-900 mb-4">
                  Our Values
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3 text-gray-700">
                  <li className="flex items-start gap-3">
                    <span className="text-green-600 mt-1">
                      🕌
                    </span>
                    <div>
                      <strong className="text-gray-900">
                        Faith:
                      </strong>{" "}
                      Deepening our relationship with Allah
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-green-600 mt-1">
                      📚
                    </span>
                    <div>
                      <strong className="text-gray-900">
                        Knowledge:
                      </strong>{" "}
                      Pursuing Islamic education
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-green-600 mt-1">
                      👥
                    </span>
                    <div>
                      <strong className="text-gray-900">
                        Community:
                      </strong>{" "}
                      Building strong bonds
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-green-600 mt-1">
                      🤝
                    </span>
                    <div>
                      <strong className="text-gray-900">
                        Service:
                      </strong>{" "}
                      Contributing to society
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-green-600 mt-1">
                      🌟
                    </span>
                    <div>
                      <strong className="text-gray-900">
                        Unity:
                      </strong>{" "}
                      Embracing diversity
                    </div>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* What We Offer Section */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-light text-gray-900 mb-8 tracking-tight">
              What We Offer
            </h2>
            <p className="text-xl text-gray-700 max-w-3xl mx-auto leading-relaxed">
              Comprehensive services and programs to serve our
              community's spiritual, educational, and social
              needs
            </p>
          </div>

          <div className="bg-green-50 rounded-3xl p-12">
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8 text-green-800">
              <div className="flex items-center gap-4">
                <div className="w-3 h-3 bg-green-600 rounded-full flex-shrink-0"></div>
                <span className="font-medium">
                  Five daily prayers
                </span>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-3 h-3 bg-green-600 rounded-full flex-shrink-0"></div>
                <span className="font-medium">
                  Friday Jumu'ah
                </span>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-3 h-3 bg-green-600 rounded-full flex-shrink-0"></div>
                <span className="font-medium">
                  Quran classes
                </span>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-3 h-3 bg-green-600 rounded-full flex-shrink-0"></div>
                <span className="font-medium">
                  Community events
                </span>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-3 h-3 bg-green-600 rounded-full flex-shrink-0"></div>
                <span className="font-medium">
                  Family counseling
                </span>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-3 h-3 bg-green-600 rounded-full flex-shrink-0"></div>
                <span className="font-medium">
                  Youth programs
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Clean Stats Section */}
      <section className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-4 gap-12 text-center">
            <div>
              <div className="text-4xl font-light text-green-600 mb-3">
                200+
              </div>
              <div className="text-gray-600 font-medium">
                Community Members
              </div>
            </div>
            <div>
              <div className="text-4xl font-light text-blue-600 mb-3">
                15+
              </div>
              <div className="text-gray-600 font-medium">
                Weekly Programs
              </div>
            </div>
            <div>
              <div className="text-4xl font-light text-purple-600 mb-3">
                50+
              </div>
              <div className="text-gray-600 font-medium">
                Students Enrolled
              </div>
            </div>
            <div>
              <div className="text-4xl font-light text-orange-600 mb-3">
                $32K
              </div>
              <div className="text-gray-600 font-medium">
                Mosque Fund Raised
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Programs Section */}
      <ProgramsSection />

      {/* Featured Events Preview */}
      <EventsSection />

      {/* Quranic Quote */}
      <QuoteSection />
    </div>
  );
}