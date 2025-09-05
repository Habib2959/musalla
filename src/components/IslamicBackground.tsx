export function IslamicBackground() {
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {/* Crescent Moon and Stars Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-10 right-10 w-8 h-8">
          <svg viewBox="0 0 24 24" fill="currentColor" className="text-green-600">
            <path d="M12 2.5c-1.5 0-2.9.3-4.2.9.8 1.1 1.2 2.4 1.2 3.8 0 3.6-2.9 6.5-6.5 6.5-.4 0-.8 0-1.2-.1.9 2.8 3.1 5.1 5.9 6 .6.2 1.2.4 1.8.4 5 0 9-4 9-9s-4-9-9-9z"/>
          </svg>
        </div>
        <div className="absolute top-32 left-20 w-2 h-2 bg-green-600 rounded-full"></div>
        <div className="absolute top-20 left-32 w-1 h-1 bg-green-600 rounded-full"></div>
        <div className="absolute top-40 right-40 w-1 h-1 bg-green-600 rounded-full"></div>
        <div className="absolute bottom-32 left-16 w-2 h-2 bg-green-600 rounded-full"></div>
        <div className="absolute bottom-20 right-20 w-1 h-1 bg-green-600 rounded-full"></div>
        
        {/* Additional decorative stars */}
        <div className="absolute top-60 left-10 w-1 h-1 bg-green-600 rounded-full"></div>
        <div className="absolute top-80 right-32 w-1 h-1 bg-green-600 rounded-full"></div>
        <div className="absolute bottom-60 left-40 w-1 h-1 bg-green-600 rounded-full"></div>
        <div className="absolute bottom-40 right-60 w-2 h-2 bg-green-600 rounded-full"></div>
      </div>

      {/* Mosque Silhouette */}
      <div className="absolute bottom-0 right-0 opacity-3">
        <svg 
          width="400" 
          height="300" 
          viewBox="0 0 400 300" 
          fill="none" 
          className="text-green-600"
        >
          {/* Main mosque structure */}
          <path 
            d="M50 250 L50 180 Q50 170 60 170 L120 170 Q130 170 130 180 L130 250 Z" 
            fill="currentColor"
          />
          <path 
            d="M130 250 L130 160 Q130 150 140 150 L200 150 Q210 150 210 160 L210 250 Z" 
            fill="currentColor"
          />
          <path 
            d="M210 250 L210 180 Q210 170 220 170 L280 170 Q290 170 290 180 L290 250 Z" 
            fill="currentColor"
          />
          
          {/* Domes */}
          <circle cx="90" cy="170" r="25" fill="currentColor"/>
          <circle cx="170" cy="150" r="30" fill="currentColor"/>
          <circle cx="250" cy="170" r="25" fill="currentColor"/>
          
          {/* Minarets */}
          <rect x="45" y="120" width="10" height="60" fill="currentColor"/>
          <rect x="285" y="120" width="10" height="60" fill="currentColor"/>
          <circle cx="50" cy="115" r="8" fill="currentColor"/>
          <circle cx="290" cy="115" r="8" fill="currentColor"/>
          
          {/* Central minaret */}
          <rect x="165" y="100" width="10" height="50" fill="currentColor"/>
          <circle cx="170" cy="95" r="8" fill="currentColor"/>
          
          {/* Crescent on main dome */}
          <path 
            d="M170 120 Q175 115 170 110 Q165 115 170 120" 
            fill="currentColor"
          />
          
          {/* Base ground */}
          <rect x="0" y="250" width="400" height="50" fill="currentColor"/>
        </svg>
      </div>

      {/* Left side decorative pattern */}
      <div className="absolute top-1/2 left-0 transform -translate-y-1/2 opacity-3">
        <svg width="200" height="400" viewBox="0 0 200 400" className="text-green-600">
          {/* Islamic geometric pattern */}
          <defs>
            <pattern id="islamicPattern" x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse">
              <circle cx="20" cy="20" r="2" fill="currentColor"/>
              <path d="M10 20 L30 20 M20 10 L20 30" stroke="currentColor" strokeWidth="0.5"/>
            </pattern>
          </defs>
          <rect width="200" height="400" fill="url(#islamicPattern)"/>
        </svg>
      </div>
    </div>
  );
}