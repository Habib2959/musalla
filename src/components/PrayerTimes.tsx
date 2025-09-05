import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Clock } from 'lucide-react';

export function PrayerTimes() {
  const prayerTimes = [
    { name: 'Fajr', time: '5:15 AM' },
    { name: 'Dhuhr', time: '12:45 PM' },
    { name: 'Asr', time: '3:45 PM' },
    { name: 'Maghrib', time: '6:15 PM' },
    { name: 'Isha', time: '7:45 PM' },
  ];

  const today = new Date().toLocaleDateString('en-US', { 
    weekday: 'long', 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
  });

  return (
    <Card className="w-full max-w-md">
      <CardHeader className="pb-4">
        <CardTitle className="flex items-center gap-2 text-green-700">
          <Clock className="h-5 w-5" />
          Prayer Times
        </CardTitle>
        <p className="text-sm text-gray-600">{today}</p>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {prayerTimes.map((prayer, index) => (
            <div key={index} className="flex justify-between items-center py-2 border-b border-gray-100 last:border-b-0">
              <span className="font-medium text-gray-700">{prayer.name}</span>
              <span className="font-semibold text-green-600">{prayer.time}</span>
            </div>
          ))}
        </div>
        <div className="mt-4 p-3 bg-green-50 rounded-lg">
          <p className="text-sm text-green-800 text-center">
            Location: Marpole Musalla<br />
            8879 Selkirk Street, Vancouver, BC V6P 4J6
          </p>
        </div>
      </CardContent>
    </Card>
  );
}