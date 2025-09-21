import React, { useState } from 'react';
import { AuthProvider } from './lib/AuthContext';
import { useAuth } from './lib/AuthContext';
import Header from './components/Header';
import MarketplacePage from './components/MarketplacePage';
import UploadPage from './components/UploadPage';
import AuthPage from './components/AuthPage';
import { Page } from './types';

const AppContent: React.FC = () => {
  const { session, loading } = useAuth();
  const [currentPage, setCurrentPage] = useState<Page>(Page.Marketplace);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-900">
        <div className="text-white text-xl">Loading...</div>
      </div>
    );
  }

  if (!session) {
    return <AuthPage />;
  }

  const navigate = (page: Page) => {
    setCurrentPage(page);
  };

  return (
    <div className="min-h-screen bg-gray-900">
      <Header navigate={navigate} currentPage={currentPage} />
      <main className="container mx-auto px-4 py-8">
        {currentPage === Page.Marketplace && <MarketplacePage />}
        {currentPage === Page.Upload && <UploadPage />}
      </main>
    </div>
  );
};

export default function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}