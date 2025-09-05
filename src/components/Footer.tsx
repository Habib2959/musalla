import { MapPin, Phone, Mail, Clock, Facebook } from 'lucide-react';

export function Footer() {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid md:grid-cols-3 gap-8">
          {/* Contact Information */}
          <div>
            <h3 className="text-xl font-semibold mb-6">Contact Us</h3>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <MapPin className="h-5 w-5 text-green-400 mt-0.5" />
                <div>
                  <p className="font-medium">New Westminster Islamic Society</p>
                  <p className="text-gray-300">8879 Selkirk Street</p>
                  <p className="text-gray-300">Vancouver, BC V6P 4J6</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="h-5 w-5 text-green-400" />
                <p className="text-gray-300">604-298-2190 / 604-563-2990</p>
              </div>
              <div className="flex items-center gap-3">
                <Mail className="h-5 w-5 text-green-400" />
                <p className="text-gray-300">info@nwmismasjid.org</p>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-xl font-semibold mb-6">Quick Links</h3>
            <ul className="space-y-3">
              <li><a href="#home" className="text-gray-300 hover:text-green-400 transition-colors">Home</a></li>
              <li><a href="#about" className="text-gray-300 hover:text-green-400 transition-colors">About Us</a></li>
              <li><a href="#events" className="text-gray-300 hover:text-green-400 transition-colors">Events</a></li>
              <li><a href="#programs" className="text-gray-300 hover:text-green-400 transition-colors">Programs</a></li>
              <li><a href="#donate" className="text-gray-300 hover:text-green-400 transition-colors">Donate</a></li>
              <li><a href="#contact" className="text-gray-300 hover:text-green-400 transition-colors">Contact</a></li>
            </ul>
          </div>

          {/* Prayer Times & Social */}
          <div>
            <h3 className="text-xl font-semibold mb-6">Connect With Us</h3>
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <Clock className="h-5 w-5 text-green-400" />
                <p className="text-gray-300">Daily prayer times available</p>
              </div>
              <div className="flex items-center gap-3">
                <Facebook className="h-5 w-5 text-green-400" />
                <a href="#" className="text-gray-300 hover:text-green-400 transition-colors">
                  Follow us on Facebook
                </a>
              </div>
              <div className="mt-6">
                <p className="text-gray-300 text-sm">
                  Please note that the masjid does have a digital security lock, so first access looks need.
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-700 mt-8 pt-8 text-center">
          <p className="text-gray-400">
            © 2025 New Westminster Islamic Society. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}