import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { Calendar, MapPin, Users, Clock, Mail, Phone } from 'lucide-react';
import { useRouter } from './Router';

export function EventsSection() {
  const { navigateTo } = useRouter();
  
  const calendarHighlights = [
    {
      date: '9',
      month: 'APR',
      day: 'Wed',
      title: 'Community Iftar & Fundraising',
      time: '6:00 PM',
      type: 'Fundraising',
      color: 'bg-green-500'
    },
    {
      date: '15',
      month: 'MAR',
      day: 'Sat',
      title: 'Youth Islamic Knowledge Competition',
      time: '10:00 AM',
      type: 'Youth',
      color: 'bg-blue-500'
    },
    {
      date: '22',
      month: 'MAR',
      day: 'Sat',
      title: 'Weekly Quran Study Circle',
      time: '2:00 PM',
      type: 'Educational',
      color: 'bg-purple-500'
    },
    {
      date: '28',
      month: 'FEB',
      day: 'Fri',
      title: 'Friday Jumu\'ah Prayer',
      time: '1:00 PM',
      type: 'Weekly',
      color: 'bg-emerald-500'
    }
  ];
  
  const events = [
    {
      id: 1,
      title: 'Community Iftar and Fundraising 2025',
      date: 'April 9, 2025',
      time: '6:00 PM',
      location: 'Marpole Musalla',
      address: '8879 Selkirk Street, Vancouver, BC V6P 4J6',
      speaker: 'Sheikh Fouad Aboud',
      description: 'Join us for a blessed evening of community, reflection, and supporting our mosque development.',
      type: 'Fundraising',
      featured: true
    },
    {
      id: 2,
      title: 'Weekly Quran Study Circle',
      date: 'Every Saturday',
      time: '2:00 PM - 4:00 PM',
      location: 'Main Prayer Hall',
      description: 'Deep study of Quranic verses with Arabic language learning components.',
      type: 'Educational',
      featured: false
    },
    {
      id: 3,
      title: 'Youth Islamic Knowledge Competition',
      date: 'March 15, 2025',
      time: '10:00 AM',
      location: 'Community Center',
      description: 'Annual competition for youth aged 12-18 covering Islamic history, Quran, and current affairs.',
      type: 'Youth',
      featured: false
    }
  ];

  return (
    <section id="events" className="py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-light text-gray-900 mb-8 tracking-tight">
            Event Calendar Highlights
          </h2>
          <p className="text-xl text-gray-700 max-w-3xl mx-auto leading-relaxed">
            Stay connected with our vibrant community through worship, learning, and fellowship
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {calendarHighlights.map((highlight, index) => (
            <Card key={index} className="hover:shadow-lg transition-all duration-300 hover:scale-105 border-0 overflow-hidden">
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
          <h3 className="text-3xl font-light mb-6">
            Join Our Community
          </h3>
          <p className="text-xl mb-8 max-w-3xl mx-auto leading-relaxed font-light">
            Be part of our upcoming events and create new memories with our community. Connect with fellow Muslims, learn together, and strengthen your faith in a welcoming environment.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-6 justify-center max-w-lg mx-auto">
            <Button 
              onClick={() => navigateTo('contact')}
              className="bg-white text-green-700 hover:bg-green-50 px-8 py-4 h-14 text-lg font-medium rounded-full transition-all duration-300 hover:scale-105 shadow-lg"
            >
              <Phone className="h-5 w-5 mr-2" />
              Contact Us
            </Button>
            <Button 
              onClick={() => navigateTo('events')}
              variant="outline"
              className="border-2 border-white text-white hover:bg-white hover:text-green-700 px-8 py-4 h-14 text-lg font-medium rounded-full transition-all duration-300 hover:scale-105"
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