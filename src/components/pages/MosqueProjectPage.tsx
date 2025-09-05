import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../ui/card";
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
  Banknote
} from "lucide-react";
import { useRouter } from '../Router';

export function MosqueProjectPage() {
  const { navigateTo } = useRouter();
  const projectGoal = 50000;
  const currentAmount = 32000;
  const progressPercentage = Math.round(
    (currentAmount / projectGoal) * 100,
  );

  const visionPoints = [
    {
      icon: Building2,
      title: "Our Islamic Mission",
      description: "To serve Allah and strengthen our Ummah through worship, education, and community service based on Quranic teachings."
    },
    {
      icon: Heart,
      title: "Our Sacred Vision", 
      description: "To establish a comprehensive Islamic center that serves as a beacon of faith, Islamic knowledge and community unity."
    }
  ];

  // Combined project goals and planned features with better icons
  const projectFeaturesAndGoals = [
    {
      icon: Building2,
      title: "Establish a large masjid with comprehensive facilities",
      description: "Creating a spacious worship center for our growing community",
      category: "worship"
    },
    {
      icon: Heart,
      title: "Provide funeral services for the deceased", 
      description: "Offering dignified Islamic funeral services and support",
      category: "services"
    },
    {
      icon: GraduationCap,
      title: "Create separate fulltime madrashas for boys and girls",
      description: "Comprehensive Islamic education in dedicated facilities",
      category: "education"
    },
    {
      icon: BookOpen,
      title: "Offer afternoon Islamic schools for all grades",
      description: "After-school Islamic education programs for children", 
      category: "education"
    },
    {
      icon: Users,
      title: "Implement full time and part time Tahfiz programs",
      description: "Quran memorization programs for different commitment levels",
      category: "education"
    },
    {
      icon: Baby,
      title: "Develop orphanage care and outreach program",
      description: "Supporting orphaned children and vulnerable families",
      category: "services"
    },
    {
      icon: HandHeart,
      title: "Organize social and community service initiatives",
      description: "Building bridges and serving the wider community",
      category: "community"
    },
    {
      icon: Utensils,
      title: "Community Kitchen & Event Facilities",
      description: "Modern kitchen and halls for events and gatherings",
      category: "facilities"
    },
    {
      icon: Car,
      title: "Parking Facility",
      description: "Ample parking for community members and visitors",
      category: "facilities"
    },
    {
      icon: Accessibility,
      title: "Accessible Design",
      description: "Full accessibility for all community members",
      category: "facilities"
    },
    {
      icon: Leaf,
      title: "Eco-Friendly Construction",
      description: "Sustainable building practices and materials",
      category: "facilities"
    }
  ];

  const donationMethods = {
    online: [
      "Online banking (CanadaHelps)",
      "E-transfer: nwmis.bc@gmail.com", 
      "Credit Card: Visa/MasterCard",
      "PayPal: Support through PayPal"
    ],
    inPerson: [
      "Cash at the masjid",
      "Cheque made out to NWMIS",
      "Speak to Board members",
      "International wire transfer"
    ]
  };

  return (
    <div className="min-h-screen bg-white/95 backdrop-blur-sm relative">
      {/* Hero Section with Mosque Background */}
      <section className="py-32 bg-gradient-to-br from-green-700 via-green-600 to-green-800 text-white relative overflow-hidden min-h-[80vh] flex items-center">
        <div className="absolute inset-0 bg-black/30"></div>
        
        {/* Mosque Silhouette */}
        <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-full max-w-md opacity-30">
          <svg viewBox="0 0 400 200" className="w-full h-auto">
            <path d="M50 180 L50 120 Q50 100 70 100 L90 100 L90 80 Q90 60 110 60 L130 60 Q140 60 140 70 L140 80 L160 80 L160 50 Q160 30 180 30 L220 30 Q240 30 240 50 L240 80 L260 80 L260 70 Q260 60 270 60 L290 60 Q310 60 310 80 L310 100 L330 100 Q350 100 350 120 L350 180 Z" fill="currentColor"/>
            <circle cx="200" cy="50" r="25" fill="currentColor"/>
            <rect x="190" y="25" width="20" height="30" fill="currentColor"/>
            <circle cx="120" cy="70" r="15" fill="currentColor"/>
            <circle cx="280" cy="70" r="15" fill="currentColor"/>
          </svg>
        </div>

        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center z-10">
          <h1 className="text-5xl md:text-6xl font-light mb-8 tracking-tight">
            Building Our Sacred
            <br />
            <span className="text-green-200">Masjid</span>
          </h1>
          <p className="text-xl md:text-2xl max-w-3xl mx-auto mb-12 leading-relaxed font-light">
            A comprehensive Islamic center serving as a beacon of faith, education, and community service in the heart of British Columbia.
          </p>
          
          {/* Location Card */}
          <div className="inline-block bg-white/20 backdrop-blur-md rounded-lg px-6 py-4 border border-white/30">
            <div className="flex items-center gap-3 text-white">
              <MapPin className="h-5 w-5" />
              <div>
                <p className="font-medium">New Location</p>
                <p className="text-sm text-green-100">8879 Selkirk Street, Vancouver, BC V6P 4J6</p>
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
                  SACRED PROJECT OVERVIEW
                </Badge>
                <h2 className="text-4xl font-light mb-6 tracking-tight">
                  A Vision for Our
                  <br />
                  <span className="text-green-600">Islamic Community</span>
                </h2>
              </div>
              
              <div className="space-y-6 text-lg text-gray-700 leading-relaxed mb-8">
                <p>
                  New Westminster Islamic Society (NWMIS) has acquired a blessed 
                  property to establish one of the largest Masjids in North America, 
                  InshāAllāh.
                </p>
                <p>
                  This ambitious project, guided by Allah's grace, aims to create a 
                  comprehensive Islamic center that will serve as a beacon of faith, 
                  knowledge, and community service for generations to come.
                </p>
                <p>
                  With the acquisition of this strategically located property in the heart of 
                  Vancouver, we are working toward creating a space that will nurture 
                  Islamic values, provide quality education, and strengthen the bonds of 
                  our Ummah in the Greater Lower Mainland of British Columbia.
                </p>
              </div>

              {/* Mission and Vision Cards */}
              <div className="grid md:grid-cols-2 gap-6">
                {visionPoints.map((point, index) => (
                  <Card key={index} className="border-0 shadow-sm">
                    <CardContent className="p-6">
                      <div className="flex items-start gap-4">
                        <div className="bg-green-100 rounded-lg p-3">
                          <point.icon className="h-6 w-6 text-green-600" />
                        </div>
                        <div>
                          <h3 className="font-medium text-gray-900 mb-2">{point.title}</h3>
                          <p className="text-sm text-gray-600 leading-relaxed">{point.description}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>

            {/* Right Side - Progress Section (from HomePage) */}
            <div className="lg:col-span-2">
              <Card className="shadow-lg border-0 sticky top-8">
                <CardHeader className="text-center pb-6">
                  <div className="text-5xl font-light text-green-600 mb-2">
                    ${currentAmount.toLocaleString()}
                  </div>
                  <div className="text-lg text-gray-600">
                    raised of ${projectGoal.toLocaleString()} goal
                  </div>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm font-medium">
                      <span>Progress</span>
                      <span>{progressPercentage}% Complete</span>
                    </div>
                    <Progress value={progressPercentage} className="h-3" />
                  </div>

                  <div className="grid md:grid-cols-3 gap-4 text-center">
                    <div className="bg-blue-50 rounded-xl p-4">
                      <div className="text-2xl font-light text-blue-600 mb-1">150+</div>
                      <div className="text-gray-600 text-sm font-medium">Contributors</div>
                    </div>
                    <div className="bg-purple-50 rounded-xl p-4">
                      <div className="text-2xl font-light text-purple-600 mb-1">18</div>
                      <div className="text-gray-600 text-sm font-medium">Months Timeline</div>
                    </div>
                    <div className="bg-orange-50 rounded-xl p-4">
                      <div className="text-2xl font-light text-orange-600 mb-1">
                        ${(projectGoal - currentAmount).toLocaleString()}
                      </div>
                      <div className="text-gray-600 text-sm font-medium">Remaining</div>
                    </div>
                  </div>

                  <div className="flex flex-col sm:flex-row gap-4 pt-4">
                    <Button
                      onClick={() => navigateTo('donate')}
                      size="lg"
                      className="flex-1 bg-green-600 hover:bg-green-700 text-lg py-6 rounded-full transition-all duration-300 hover:scale-105"
                    >
                      <Heart className="mr-2 h-5 w-5" />
                      Support the Mosque
                    </Button>
                    <Button
                      onClick={() => navigateTo('donate')}
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
          <div className="text-center mb-16">
            <Badge className="bg-green-100 text-green-800 hover:bg-green-200 mb-4">
              COMPREHENSIVE VISION
            </Badge>
            <h2 className="text-4xl font-light mb-6 tracking-tight">
              Building Our Islamic
              <br />
              <span className="text-green-600">Community Center</span>
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Our comprehensive vision for a modern Islamic center that serves Allah and strengthens our Ummah through worship, education, and community services
            </p>
          </div>

          {/* Project Goals from HomePage as a Card */}
          <div className="mb-16">
            <Card className="shadow-lg border-0 bg-gradient-to-br from-green-50 to-emerald-50">
              <CardHeader>
                <CardTitle className="text-2xl text-green-900 text-center">Project Goals & Planned Features</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {projectFeaturesAndGoals.map((item, index) => (
                    <div key={index} className="flex items-start gap-4 p-4 bg-white rounded-lg shadow-sm">
                      <div className="bg-green-100 rounded-lg p-3 flex-shrink-0">
                        <item.icon className="h-6 w-6 text-green-600" />
                      </div>
                      <div>
                        <h4 className="font-medium text-gray-900 leading-tight mb-2">
                          {item.title}
                        </h4>
                        <p className="text-sm text-gray-600 leading-relaxed">
                          {item.description}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
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
              Choose the donation method that works best for you. All options are secure and provide instant confirmation.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Interact E-Transfer */}
            <Card className="border-2 border-blue-200 hover:border-blue-400 hover:shadow-lg transition-all duration-300">
              <CardHeader className="text-center">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Mail className="h-8 w-8 text-blue-600" />
                </div>
                <CardTitle className="text-xl text-gray-900">Interact E-Transfer</CardTitle>
                <Badge className="bg-blue-600 hover:bg-blue-700 text-white">Most Popular</Badge>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-gray-600 text-center">
                  Send money directly from your bank account with no fees
                </p>
                <div className="bg-blue-50 rounded-lg p-4">
                  <p className="font-medium text-blue-900 mb-2 text-center">Send to:</p>
                  <div className="flex items-center justify-center gap-2 bg-white rounded p-3">
                    <span className="font-mono text-blue-700 text-sm">nwmis.bc@gmail.com</span>
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

            {/* PayPal */}
            <Card className="border-2 border-yellow-200 hover:border-yellow-400 hover:shadow-lg transition-all duration-300">
              <CardHeader className="text-center">
                <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <CreditCard className="h-8 w-8 text-yellow-600" />
                </div>
                <CardTitle className="text-xl text-gray-900">PayPal</CardTitle>
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

            {/* Credit/Debit Card */}
            <Card className="border-2 border-green-200 hover:border-green-400 hover:shadow-lg transition-all duration-300">
              <CardHeader className="text-center">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <CreditCard className="h-8 w-8 text-green-600" />
                </div>
                <CardTitle className="text-xl text-gray-900">Credit/Debit Card</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-gray-600 text-center">
                  Pay directly with Visa, MasterCard, or Debit cards
                </p>
                <ul className="text-sm text-gray-600 space-y-2">
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                    All major cards accepted
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                    SSL encrypted security
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                    Recurring donation options
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                    Immediate tax receipt
                  </li>
                </ul>
                <Button className="w-full bg-green-600 hover:bg-green-700">
                  Pay with Card
                </Button>
              </CardContent>
            </Card>

            {/* Online Banking */}
            <Card className="border-2 border-purple-200 hover:border-purple-400 hover:shadow-lg transition-all duration-300">
              <CardHeader className="text-center">
                <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Building2 className="h-8 w-8 text-purple-600" />
                </div>
                <CardTitle className="text-xl text-gray-900">Online Banking</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-gray-600 text-center">
                  Add NWMIS as payee in your online banking system
                </p>
                <ul className="text-sm text-gray-600 space-y-2">
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                    No processing fees
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                    Schedule recurring payments
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                    Bank-level security
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                    Ideal for large donations
                  </li>
                </ul>
                <Button 
                  variant="outline" 
                  className="w-full border-purple-600 text-purple-600 hover:bg-purple-50"
                  onClick={() => navigateTo('contact')}
                >
                  Get Account Details
                </Button>
              </CardContent>
            </Card>

            {/* Cash/Cheque */}
            <Card className="border-2 border-gray-200 hover:border-gray-400 hover:shadow-lg transition-all duration-300">
              <CardHeader className="text-center">
                <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Banknote className="h-8 w-8 text-gray-600" />
                </div>
                <CardTitle className="text-xl text-gray-900">Cash/Cheque</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-gray-600 text-center">
                  Visit us in person during prayer times or events
                </p>
                <div className="bg-gray-50 rounded-lg p-4">
                  <p className="font-medium text-gray-900 mb-1 text-center">Location:</p>
                  <p className="text-sm text-gray-700 text-center">8879 Selkirk Street</p>
                  <p className="text-sm text-gray-700 text-center">Vancouver, BC V6P 4J6</p>
                </div>
                <ul className="text-sm text-gray-600 space-y-2">
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                    Personal interaction
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                    Immediate receipt
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                    Meet the community
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                    Any amount welcome
                  </li>
                </ul>
              </CardContent>
            </Card>

            {/* Cryptocurrency (Future) */}
            <Card className="border-2 border-indigo-200 hover:border-indigo-400 hover:shadow-lg transition-all duration-300 relative">
              <CardHeader className="text-center">
                <div className="w-16 h-16 bg-indigo-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Star className="h-8 w-8 text-indigo-600" />
                </div>
                <CardTitle className="text-xl text-gray-900">Cryptocurrency</CardTitle>
                <Badge className="bg-indigo-600 hover:bg-indigo-700 text-white">Coming Soon</Badge>
              </CardHeader>
              <CardContent className="space-y-4 opacity-75">
                <p className="text-gray-600 text-center">
                  Support through Bitcoin, Ethereum, and other cryptocurrencies
                </p>
                <ul className="text-sm text-gray-600 space-y-2">
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                    Low transaction fees
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                    Global accessibility
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                    Blockchain transparency
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                    Modern donation method
                  </li>
                </ul>
                <Button 
                  variant="outline" 
                  className="w-full border-indigo-600 text-indigo-600 hover:bg-indigo-50"
                  disabled
                >
                  Notify When Available
                </Button>
              </CardContent>
            </Card>
          </div>

          <div className="text-center mt-12">
            <p className="text-sm text-gray-600 mb-6">
              May Allah bless you and may your family and community benefit from generosity in both worlds.
            </p>
            <Button 
              onClick={() => navigateTo('donate')}
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
              Have questions about the mosque project or want to get involved? We'd love to hear from you.
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
                  Speak directly with our team about the mosque project or any questions you may have.
                </p>
                <div className="space-y-2">
                  <p className="font-medium text-gray-900">778-317-6673</p>
                  <p className="text-sm text-gray-600">Available after prayer times</p>
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
                  Send us your questions, suggestions, or requests for more information about our project.
                </p>
                <div className="space-y-2">
                  <p className="font-medium text-gray-900">nwmis.bc@gmail.com</p>
                  <p className="text-sm text-gray-600">We respond within 24 hours</p>
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
                  Join us for prayers or community events. All are welcome in our temporary location.
                </p>
                <div className="space-y-2">
                  <p className="font-medium text-gray-900">8879 Selkirk Street</p>
                  <p className="font-medium text-gray-900">Vancouver, BC V6P 4J6</p>
                  <p className="text-sm text-gray-600">Open daily for prayer times</p>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="text-center mt-12">
            <Button 
              onClick={() => navigateTo('contact')}
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
              We build a legacy, a community, and a place where future generations will worship, 
              learn, and grow in faith.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                size="lg"
                onClick={() => navigateTo('donate')}
                className="bg-white text-green-700 hover:bg-gray-100 px-8 py-4 h-14 rounded-full font-medium"
              >
                <Heart className="mr-2 h-5 w-5" />
                Make Your Contribution
              </Button>
              <Button 
                size="lg"
                onClick={() => navigateTo('contact')}
                variant="outline"
                className="border-2 border-white text-white hover:bg-white hover:text-green-700 px-8 py-4 h-14 rounded-full font-medium"
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