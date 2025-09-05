export function AboutPage() {
  return (
    <div className="min-h-screen bg-white/95 backdrop-blur-sm relative">
      {/* Hero Section */}
      <section className="py-24 bg-gradient-to-br from-green-700 via-green-600 to-green-800 text-white relative">
        <div className="absolute inset-0 bg-black opacity-20"></div>
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl mb-6">About Our Community</h1>
          <p className="text-xl md:text-2xl max-w-2xl mx-auto">
            Building bridges of understanding and serving our diverse community since our establishment
          </p>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12">
            <div>
              <h2 className="text-2xl text-gray-900 mb-6">Our Mission</h2>
              <p className="text-gray-700 mb-8 leading-relaxed">
                To establish and maintain a vibrant Islamic community that serves Allah (SWT) through worship, education, and service to humanity. We strive to be a beacon of Islamic values while contributing positively to Canadian society.
              </p>
              
              <h2 className="text-2xl text-gray-900 mb-6">Our Vision</h2>
              <p className="text-gray-700 leading-relaxed">
                A thriving Muslim community that exemplifies the beauty of Islam through knowledge, compassion, and unity, while fostering interfaith dialogue and understanding in Greater Vancouver.
              </p>
            </div>
            
            <div>
              <h2 className="text-2xl text-gray-900 mb-6">Our Values</h2>
              <ul className="space-y-4 text-gray-700">
                <li className="flex items-start gap-3">
                  <span className="text-green-600 mt-1">🕌</span>
                  <div>
                    <strong className="text-gray-900">Faith:</strong> Deepening our relationship with Allah through worship and remembrance
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-green-600 mt-1">📚</span>
                  <div>
                    <strong className="text-gray-900">Knowledge:</strong> Pursuing Islamic education and understanding for all ages
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-green-600 mt-1">👥</span>
                  <div>
                    <strong className="text-gray-900">Community:</strong> Building strong bonds among Muslims and with our neighbors
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-green-600 mt-1">🤝</span>
                  <div>
                    <strong className="text-gray-900">Service:</strong> Contributing to society through charity and volunteer work
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-green-600 mt-1">🌟</span>
                  <div>
                    <strong className="text-gray-900">Unity:</strong> Embracing diversity within our Muslim community
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* History Section */}
      <section className="py-16 bg-green-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl text-center text-gray-900 mb-12">Our Journey</h2>
          <div className="space-y-8">
            <div className="bg-white rounded-lg p-8 shadow-sm">
              <h3 className="text-xl text-green-800 mb-4">Establishment & Growth</h3>
              <p className="text-gray-700 leading-relaxed">
                The New Westminster Islamic Society was founded to serve the growing Muslim population in the Greater Vancouver area. What started as a small gathering has grown into a vibrant community center serving hundreds of families.
              </p>
            </div>
            
            <div className="bg-white rounded-lg p-8 shadow-sm">
              <h3 className="text-xl text-green-800 mb-4">Community Impact</h3>
              <p className="text-gray-700 leading-relaxed">
                Over the years, we have established strong partnerships with local organizations, participated in interfaith dialogues, and contributed to various charitable causes. Our community members are active in local civic life, education, healthcare, and business.
              </p>
            </div>
            
            <div className="bg-white rounded-lg p-8 shadow-sm">
              <h3 className="text-xl text-green-800 mb-4">Future Vision</h3>
              <p className="text-gray-700 leading-relaxed">
                As we continue to grow, our focus remains on building a permanent mosque facility, expanding our educational programs, and strengthening our community bonds. We are committed to serving not just our Muslim community, but the broader society through service and positive engagement.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Leadership Section */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl text-center text-gray-900 mb-12">Community Leadership</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="text-center bg-gray-50 rounded-lg p-6">
              <h3 className="text-xl text-gray-900 mb-3">Board of Directors</h3>
              <p className="text-gray-700">
                Our elected board provides governance and strategic direction for the society, ensuring transparent and accountable leadership.
              </p>
            </div>
            <div className="text-center bg-gray-50 rounded-lg p-6">
              <h3 className="text-xl text-gray-900 mb-3">Religious Leadership</h3>
              <p className="text-gray-700">
                Qualified Islamic scholars and educators provide religious guidance, lead prayers, and deliver educational programs.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}