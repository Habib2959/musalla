import { useState } from 'react';
import { Button } from './ui/button';
import { Menu, X } from 'lucide-react';
import { useRouter } from './Router';

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { currentPage, navigateTo } = useRouter();

  const handleNavigation = (page: 'home' | 'mosque-project' | 'events' | 'donate' | 'subscribe' | 'contact') => {
    navigateTo(page);
    setIsMenuOpen(false);
  };

  const isActive = (page: string) => currentPage === page;

  return (
    <header className="bg-white/80 backdrop-blur-md border-b border-gray-100 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center h-12 px-6">
          
          {/* Logo */}
          <div className="flex items-center gap-3 cursor-pointer" onClick={() => handleNavigation('home')}>
            <div className="w-8 h-8 bg-green-600 rounded-lg flex items-center justify-center">
              <svg width="16" height="16" viewBox="0 0 24 24" className="text-white">
                <path d="M12 2L8 6v2H6v10h3v-4h6v4h3V8h-2V6l-4-4z" fill="currentColor"/>
                <circle cx="12" cy="8" r="1" fill="currentColor"/>
              </svg>
            </div>
            <span className="text-gray-900 font-medium tracking-tight">NWMIS</span>
          </div>

          {/* Desktop Navigation - All tabs visible */}
          <nav className="hidden lg:flex items-center space-x-8">
            <button 
              onClick={() => handleNavigation('mosque-project')}
              className={`text-sm transition-colors duration-200 ${
                isActive('mosque-project') 
                  ? 'text-gray-900' 
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              Mosque Project
            </button>
            
            <button 
              onClick={() => handleNavigation('events')}
              className={`text-sm transition-colors duration-200 ${
                isActive('events') 
                  ? 'text-gray-900' 
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              Events
            </button>

            <button 
              onClick={() => handleNavigation('subscribe')}
              className={`text-sm transition-colors duration-200 ${
                isActive('subscribe') 
                  ? 'text-gray-900' 
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              Subscribe
            </button>
            
            <button 
              onClick={() => handleNavigation('contact')}
              className={`text-sm transition-colors duration-200 ${
                isActive('contact') 
                  ? 'text-gray-900' 
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              Contact
            </button>
          </nav>

          {/* Right Side */}
          <div className="flex items-center gap-4">
            {/* Donate Button */}
            <Button 
              onClick={() => handleNavigation('donate')}
              className="hidden sm:inline-flex bg-green-600 hover:bg-green-700 text-white px-4 py-2 h-8 text-sm font-medium rounded-full transition-all duration-200"
            >
              Donate
            </Button>

            {/* Mobile menu button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="lg:hidden p-2 -m-2 text-gray-600 hover:text-gray-900 transition-colors duration-200"
            >
              {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="lg:hidden border-t border-gray-100 bg-white/95 backdrop-blur-md">
            <div className="px-6 py-4 space-y-3">
              <button 
                onClick={() => handleNavigation('mosque-project')}
                className={`block w-full text-left py-2 text-sm transition-colors duration-200 ${
                  isActive('mosque-project') 
                    ? 'text-gray-900 font-medium' 
                    : 'text-gray-600'
                }`}
              >
                Mosque Project
              </button>
              
              <button 
                onClick={() => handleNavigation('events')}
                className={`block w-full text-left py-2 text-sm transition-colors duration-200 ${
                  isActive('events') 
                    ? 'text-gray-900 font-medium' 
                    : 'text-gray-600'
                }`}
              >
                Events
              </button>

              <button 
                onClick={() => handleNavigation('subscribe')}
                className={`block w-full text-left py-2 text-sm transition-colors duration-200 ${
                  isActive('subscribe') 
                    ? 'text-gray-900 font-medium' 
                    : 'text-gray-600'
                }`}
              >
                Subscribe
              </button>
              
              <button 
                onClick={() => handleNavigation('contact')}
                className={`block w-full text-left py-2 text-sm transition-colors duration-200 ${
                  isActive('contact') 
                    ? 'text-gray-900 font-medium' 
                    : 'text-gray-600'
                }`}
              >
                Contact
              </button>

              <div className="pt-3 border-t border-gray-100">
                <Button 
                  onClick={() => handleNavigation('donate')}
                  className="w-full bg-green-600 hover:bg-green-700 text-white py-2.5 text-sm font-medium rounded-full"
                >
                  Donate
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Subtle Mosque Project Banner */}
      <div className="bg-gradient-to-r from-green-50 to-emerald-50 border-b border-green-100">
        <div className="max-w-7xl mx-auto px-6 py-2">
          <div className="flex items-center justify-center text-center">
            <p className="text-sm text-green-800">
              <span className="font-medium">New Mosque Project:</span>
              <span className="mx-2">$32,000 raised of $50,000 goal</span>
              <button 
                onClick={() => handleNavigation('mosque-project')}
                className="text-green-700 hover:text-green-900 font-medium underline underline-offset-2 transition-colors duration-200"
              >
                Learn more
              </button>
            </p>
          </div>
        </div>
      </div>
    </header>
  );
}