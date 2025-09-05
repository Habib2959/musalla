import { ProgramsSection } from '../ProgramsSection';

export function ProgramsPage() {
  return (
    <div className="min-h-screen bg-white/95 backdrop-blur-sm relative">
      {/* Hero Section */}
      <section className="py-24 bg-gradient-to-br from-green-700 via-green-600 to-green-800 text-white relative">
        <div className="absolute inset-0 bg-black opacity-20"></div>
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl mb-6">Islamic Education Programs</h1>
          <p className="text-xl md:text-2xl max-w-2xl mx-auto">
            Comprehensive Islamic education and Quran learning for all ages and levels
          </p>
        </div>
      </section>

      {/* Programs Content */}
      <div className="py-0">
        <ProgramsSection />
      </div>

      {/* Additional Information */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-green-50 rounded-lg p-6">
              <h3 className="text-xl text-green-800 mb-4">Why Choose Our Programs?</h3>
              <ul className="space-y-2 text-gray-700">
                <li>• Qualified and experienced instructors</li>
                <li>• Small class sizes for personalized attention</li>
                <li>• Flexible scheduling options</li>
                <li>• Modern teaching methods and resources</li>
                <li>• Supportive learning environment</li>
                <li>• Regular progress assessments</li>
              </ul>
            </div>
            
            <div className="bg-blue-50 rounded-lg p-6">
              <h3 className="text-xl text-blue-800 mb-4">Scholarship Opportunities</h3>
              <p className="text-gray-700 mb-4">
                We believe Islamic education should be accessible to all. Financial assistance is available for families in need.
              </p>
              <ul className="space-y-2 text-gray-700">
                <li>• Need-based scholarships available</li>
                <li>• Flexible payment plans</li>
                <li>• Community sponsorship programs</li>
              </ul>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}