import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { BookOpen, Users, Clock, Award, ArrowRight } from 'lucide-react';
import { useRouter } from './Router';

export function ProgramsSection() {
  const { navigateTo } = useRouter();
  
  const programs = [
    {
      id: 1,
      title: 'Beginner Quran Reading',
      description: 'Learn to read Arabic and recite the Quran with proper tajweed. Perfect for newcomers to Islam or those wanting to improve their recitation.',
      level: 'Beginner',
      duration: '12 weeks',
      schedule: 'Saturdays 10:00 AM - 12:00 PM',
      instructor: 'Sheikh Ahmed Hassan',
      capacity: '15 students',
      price: 'Free',
      features: ['Arabic alphabet', 'Basic tajweed rules', 'Short surahs', 'Prayer recitations'],
      nextStart: 'March 1, 2025'
    },
    {
      id: 2,
      title: 'Advanced Quran Memorization',
      description: 'Systematic memorization program for those who can already read Arabic. Focused on effective memorization techniques and retention.',
      level: 'Advanced',
      duration: 'Ongoing',
      schedule: 'Tuesdays & Thursdays 7:00 PM - 8:30 PM',
      instructor: 'Hafez Omar Malik',
      capacity: '10 students',
      price: '$50/month',
      features: ['Memorization techniques', 'Review sessions', 'Individual attention', 'Progress tracking'],
      nextStart: 'Ongoing enrollment'
    },
    {
      id: 3,
      title: 'Youth Islamic Studies',
      description: 'Comprehensive Islamic education for youth aged 12-18, covering Quran, Hadith, Islamic history, and contemporary issues.',
      level: 'All Levels',
      duration: 'Academic year',
      schedule: 'Sundays 1:00 PM - 3:00 PM',
      instructor: 'Sister Fatima Al-Zahra',
      capacity: '20 students',
      price: '$30/month',
      features: ['Islamic history', 'Hadith studies', 'Character building', 'Discussion groups'],
      nextStart: 'September 2025'
    },
    {
      id: 4,
      title: 'Adult Islamic Education',
      description: 'Weekly sessions covering fundamental Islamic knowledge, including aqeedah, fiqh, and practical Islamic living.',
      level: 'All Levels',
      duration: 'Ongoing',
      schedule: 'Fridays after Maghrib',
      instructor: 'Dr. Abdullah Rahman',
      capacity: '25 students',
      price: 'Donation-based',
      features: ['Islamic jurisprudence', 'Practical guidance', 'Q&A sessions', 'Community discussion'],
      nextStart: 'Join anytime'
    }
  ];

  const facilities = [
    {
      title: 'Main Prayer Hall',
      description: 'Spacious prayer area accommodating up to 200 worshippers',
      icon: '🕌'
    },
    {
      title: 'Learning Center',
      description: 'Dedicated classrooms with modern teaching equipment',
      icon: '📚'
    },
    {
      title: 'Library',
      description: 'Extensive collection of Islamic books and resources',
      icon: '📖'
    },
    {
      title: 'Community Kitchen',
      description: 'Fully equipped kitchen for community events and meals',
      icon: '🍽️'
    }
  ];

  return (
    <section id="programs" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        {/* Programs Section */}
        <div className="text-center mb-16">
          <h2 className="text-4xl font-light text-gray-900 mb-8 tracking-tight">
            Islamic Education Programs
          </h2>
          <p className="text-xl text-gray-700 max-w-3xl mx-auto leading-relaxed">
            Strengthen your faith through knowledge. Join our comprehensive Islamic education programs designed for all ages and experience levels.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 mb-16">
          {programs.slice(0, 2).map((program) => (
            <Card key={program.id} className="hover:shadow-lg transition-shadow">
              <CardHeader className="pb-4">
                <div className="flex justify-between items-start mb-2">
                  <CardTitle className="text-xl">{program.title}</CardTitle>
                  <Badge variant={program.level === 'Beginner' ? 'secondary' : program.level === 'Advanced' ? 'default' : 'outline'}>
                    {program.level}
                  </Badge>
                </div>
                <p className="text-gray-600">{program.description}</p>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid sm:grid-cols-2 gap-4 text-sm">
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4 text-green-600" />
                    <span>{program.duration}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Users className="h-4 w-4 text-green-600" />
                    <span>{program.capacity}</span>
                  </div>
                </div>
                
                <div className="space-y-2 text-sm">
                  <p><strong>Schedule:</strong> {program.schedule}</p>
                  <p><strong>Instructor:</strong> {program.instructor}</p>
                  <p><strong>Fee:</strong> {program.price}</p>
                  <p><strong>Next Start:</strong> {program.nextStart}</p>
                </div>

                <div>
                  <h4 className="font-semibold mb-2">What You'll Learn:</h4>
                  <ul className="text-sm text-gray-600 space-y-1">
                    {program.features.map((feature, index) => (
                      <li key={index} className="flex items-center gap-2">
                        <ArrowRight className="h-3 w-3 text-green-600" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>

                <Button className="w-full bg-green-600 hover:bg-green-700">
                  <BookOpen className="h-4 w-4 mr-2" />
                  Enroll Now
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>


      </div>
    </section>
  );
}