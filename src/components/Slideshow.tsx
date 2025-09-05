import { useState, useEffect } from 'react';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { ChevronLeft, ChevronRight, Calendar, ArrowRight } from 'lucide-react';
import { useRouter } from './Router';

export function Slideshow() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const { navigateTo } = useRouter();

  const slides = [
    {
      id: 1,
      title: 'New Mosque Development Project',
      subtitle: 'Building Our Permanent Home',
      description: 'Join us in building a beautiful, permanent mosque facility that will serve our growing community for generations to come.',
      image: 'https://images.unsplash.com/photo-1564769625905-50bd9fb66b1b?w=800&h=400&fit=crop',
      type: 'Project',
      cta: 'Learn More & Donate',
      action: () => navigateTo('mosque-project'),
      featured: true
    },
    {
      id: 2,
      title: 'Community Iftar & Fundraising 2025',
      subtitle: 'April 9, 2025 at 6:00 PM',
      description: 'Join us for a blessed evening of community, reflection, and supporting our mosque development with Sheikh Fouad Aboud.',
      image: 'https://images.unsplash.com/photo-1544537150-6e4b998de2df?w=800&h=400&fit=crop',
      type: 'Event',
      cta: 'Register Now',
      action: () => navigateTo('events')
    },
    {
      id: 3,
      title: 'New Quran Learning Programs',
      subtitle: 'Starting March 2025',
      description: 'Comprehensive Islamic education programs for all ages. From beginner Quran reading to advanced memorization classes.',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&h=400&fit=crop',
      type: 'Education',
      cta: 'View Programs',
      action: () => navigateTo('programs')
    },
    {
      id: 4,
      title: 'Weekly Live Streams Available',
      subtitle: 'Friday Khutbah & Educational Content',
      description: 'Watch our Friday prayers and educational programs online. Access our growing library of Islamic content.',
      image: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=800&h=400&fit=crop',
      type: 'Media',
      cta: 'Watch Now',
      action: () => navigateTo('media')
    }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 6000);
    return () => clearInterval(timer);
  }, [slides.length]);

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
  };

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  return (
    <div className="relative h-[500px] md:h-[600px] overflow-hidden rounded-lg shadow-2xl">
      {/* Slides */}
      <div className="relative h-full">
        {slides.map((slide, index) => (
          <div
            key={slide.id}
            className={`absolute inset-0 transition-opacity duration-1000 ${
              index === currentSlide ? 'opacity-100' : 'opacity-0'
            }`}
          >
            {/* Background Image */}
            <div 
              className="absolute inset-0 bg-cover bg-center"
              style={{ backgroundImage: `url(${slide.image})` }}
            >
              <div className="absolute inset-0 bg-black/50"></div>
            </div>
            
            {/* Content */}
            <div className="relative h-full flex items-center">
              <div className="max-w-4xl mx-auto px-6 text-white">
                <div className="max-w-2xl">
                  <Badge 
                    className={`mb-4 ${
                      slide.type === 'Project' ? 'bg-green-600' :
                      slide.type === 'Event' ? 'bg-blue-600' :
                      slide.type === 'Education' ? 'bg-purple-600' :
                      'bg-orange-600'
                    }`}
                  >
                    {slide.type}
                    {slide.featured && <span className="ml-1">⭐</span>}
                  </Badge>
                  
                  <h2 className="text-3xl md:text-5xl font-bold mb-4 leading-tight">
                    {slide.title}
                  </h2>
                  
                  <div className="flex items-center gap-2 mb-4 text-green-200">
                    <Calendar className="h-4 w-4" />
                    <span className="text-lg">{slide.subtitle}</span>
                  </div>
                  
                  <p className="text-xl mb-8 leading-relaxed text-gray-200">
                    {slide.description}
                  </p>
                  
                  <Button
                    size="lg"
                    className="bg-green-600 hover:bg-green-700 text-white px-8 py-3"
                    onClick={slide.action}
                  >
                    {slide.cta}
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Navigation Arrows */}
      <button
        onClick={prevSlide}
        className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/20 hover:bg-white/30 text-white p-2 rounded-full transition-all"
      >
        <ChevronLeft className="h-6 w-6" />
      </button>
      
      <button
        onClick={nextSlide}
        className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/20 hover:bg-white/30 text-white p-2 rounded-full transition-all"
      >
        <ChevronRight className="h-6 w-6" />
      </button>

      {/* Dots Indicator */}
      <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex space-x-2">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`w-3 h-3 rounded-full transition-all ${
              index === currentSlide 
                ? 'bg-white' 
                : 'bg-white/50 hover:bg-white/75'
            }`}
          />
        ))}
      </div>
    </div>
  );
}