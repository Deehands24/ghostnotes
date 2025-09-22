import React, { useState, useCallback } from 'react';
import { Page } from './types';
import MarketplacePage from './components/MarketplacePage';
import UploadPage from './components/UploadPage';
import Header from './components/Header';
import { AuthProvider, useAuth } from './lib/AuthContext';
import AuthPage from './components/AuthPage';

const AppContent: React.FC = () => {
  const { session, loading } = useAuth();
  const [currentPage, setCurrentPage] = useState<Page>(Page.Marketplace);

  const navigate = useCallback((page: Page) => {
    setCurrentPage(page);
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-xl">Loading...</div>
      </div>
    );
  }

  if (!session) {
    return <AuthPage />;
  }

  const renderContent = () => {
    switch (currentPage) {
      case Page.Marketplace:
        return <MarketplacePage />;
      case Page.Upload:
        return <UploadPage />;
      default:
        return <MarketplacePage />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 font-sans">
      <Header navigate={navigate} currentPage={currentPage} />
      <main className="container mx-auto p-4 md:p-8">
        {renderContent()}
      </main>
    </div>
  );
};

const App: React.FC = () => {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
};

export default App;
