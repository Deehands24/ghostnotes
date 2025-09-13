
import React, { useState, useCallback } from 'react';
import { Page } from './types';
import SubscriptionPage from './components/SubscriptionPage';
import MarketplacePage from './components/MarketplacePage';
import UploadPage from './components/UploadPage';
import Header from './components/Header';

const App: React.FC = () => {
  const [isSubscribed, setIsSubscribed] = useState<boolean>(false);
  const [currentPage, setCurrentPage] = useState<Page>(Page.Marketplace);

  const handleSubscribe = useCallback(() => {
    setIsSubscribed(true);
  }, []);

  const navigate = useCallback((page: Page) => {
    setCurrentPage(page);
  }, []);

  const renderContent = () => {
    if (!isSubscribed) {
      return <SubscriptionPage onSubscribe={handleSubscribe} />;
    }

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
      {isSubscribed && <Header navigate={navigate} currentPage={currentPage} />}
      <main className="container mx-auto p-4 md:p-8">
        {renderContent()}
      </main>
    </div>
  );
};

export default App;
