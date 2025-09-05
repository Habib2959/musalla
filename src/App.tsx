import { RouterProvider, useRouter } from './components/Router';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { IslamicBackground } from './components/IslamicBackground';
import { HomePage } from './components/pages/HomePage';
import { EventsPage } from './components/pages/EventsPage';
import { DonatePage } from './components/pages/DonatePage';
import { ContactPage } from './components/pages/ContactPage';
import { MosqueProjectPage } from './components/pages/MosqueProjectPage';
import { SubscribePage } from './components/pages/SubscribePage';

function AppContent() {
  const { currentPage } = useRouter();

  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return <HomePage />;
      case 'mosque-project':
        return <MosqueProjectPage />;
      case 'events':
        return <EventsPage />;
      case 'donate':
        return <DonatePage />;
      case 'subscribe':
        return <SubscribePage />;
      case 'contact':
        return <ContactPage />;
      default:
        return <HomePage />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-green-50 relative">
      {/* Islamic Background */}
      <IslamicBackground />
      
      {/* Main Content */}
      <div className="relative z-10">
        <Header />
        <main>
          {renderPage()}
        </main>
        <Footer />
      </div>
    </div>
  );
}

export default function App() {
  return (
    <RouterProvider>
      <AppContent />
    </RouterProvider>
  );
}