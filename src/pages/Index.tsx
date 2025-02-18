
import { useState, useEffect } from "react";
import { 
  MessageSquarePlus, 
  Star, 
  Clock, 
  ChevronRight, 
  Send, 
  User,
  Home,
  Vote,
  ChevronLeft,
  ChevronDown,
  Menu
} from "lucide-react";

const Sidebar = ({ isCollapsed, setIsCollapsed, isMobile }: { isCollapsed: boolean; setIsCollapsed: (value: boolean) => void; isMobile: boolean }) => {
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  if (isMobile && isCollapsed) return null;

  return (
    <div className={`${isMobile ? 'fixed inset-0 z-50' : 'h-screen'} ${isCollapsed && !isMobile ? 'w-20' : 'w-64'} bg-zinc-800 border-r border-zinc-700 p-4 transition-all duration-300 ease-in-out relative`}>
      {/* Company Logo */}
      <div className="flex items-center space-x-3 mb-8">
        <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
          <span className="text-primary-dark font-bold">S</span>
        </div>
        {(!isCollapsed || isMobile) && <span className="font-semibold text-text-header">StockAI</span>}
      </div>

      {/* New Chat Button */}
      <button className={`w-full bg-primary text-primary-dark rounded-lg p-2 flex items-center justify-center mb-6 hover:bg-primary/90 transition-colors ${isCollapsed && !isMobile ? 'px-2' : 'px-4'}`}>
        <MessageSquarePlus size={20} />
        {(!isCollapsed || isMobile) && <span className="ml-2">New Chat</span>}
      </button>

      {/* Starred Chats */}
      <div className="mb-6">
        <div className="flex items-center text-zinc-400 mb-2">
          <Star size={16} className="text-secondary" />
          {(!isCollapsed || isMobile) && <span className="ml-2 text-sm">Starred</span>}
        </div>
        {(!isCollapsed || isMobile) && (
          <div className="space-y-2">
            <div className="text-sm text-zinc-400 pl-6">NVDA Analysis</div>
            <div className="text-sm text-zinc-400 pl-6">Portfolio Review</div>
          </div>
        )}
      </div>

      {/* Recent Chats */}
      <div>
        <div className="flex items-center text-zinc-400 mb-2">
          <Clock size={16} className="text-tertiary" />
          {(!isCollapsed || isMobile) && <span className="ml-2 text-sm">Recent</span>}
        </div>
        {(!isCollapsed || isMobile) && (
          <div className="space-y-2">
            <div className="text-sm text-zinc-400 pl-6">Market Overview</div>
            <div className="text-sm text-zinc-400 pl-6">Tech Sector Analysis</div>
            <div className="text-sm text-zinc-400 pl-6">Dividend Stocks</div>
            <button className="text-sm text-primary pl-6 flex items-center">
              View all <ChevronRight size={14} className="ml-1" />
            </button>
          </div>
        )}
      </div>

      {/* Collapse Button */}
      {!isMobile && (
        <button 
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="absolute top-1/2 -right-3 bg-zinc-800 border border-zinc-700 rounded-full p-1 shadow-sm"
        >
          {isCollapsed ? <ChevronRight size={16} className="text-primary" /> : <ChevronLeft size={16} className="text-primary" />}
        </button>
      )}

      {/* Profile Section */}
      <div className="absolute bottom-4 left-0 right-0 px-4">
        <div 
          className="flex items-center space-x-3 cursor-pointer"
          onClick={() => setIsProfileOpen(!isProfileOpen)}
        >
          <div className="w-8 h-8 bg-zinc-700 rounded-full flex items-center justify-center">
            <User size={20} className="text-zinc-300" />
          </div>
          {(!isCollapsed || isMobile) && (
            <>
              <div className="flex-1">
                <div className="text-sm font-medium text-zinc-300">John Doe</div>
                <div className="text-xs text-zinc-500">@johndoe</div>
              </div>
              <ChevronDown size={16} className="text-zinc-500" />
            </>
          )}
        </div>
        {isProfileOpen && (!isCollapsed || isMobile) && (
          <div className="absolute bottom-16 left-4 right-4 bg-zinc-800 border border-zinc-700 rounded-lg shadow-lg p-2">
            <button className="w-full text-left px-3 py-2 text-sm text-zinc-300 hover:bg-zinc-700 rounded flex items-center">
              <Home size={16} className="mr-2 text-primary" /> Home
            </button>
            <button className="w-full text-left px-3 py-2 text-sm text-zinc-300 hover:bg-zinc-700 rounded flex items-center">
              <Vote size={16} className="mr-2 text-secondary" /> Vote
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

const StockCard = ({ symbol, name, price, change }: { symbol: string; name: string; price: string; change: string }) => (
  <div className="bg-zinc-800 rounded-lg border border-zinc-700 p-4 hover:border-zinc-600 transition-colors">
    <div className="flex justify-between items-start mb-2">
      <div>
        <h3 className="font-semibold text-lg text-zinc-200">{symbol}</h3>
        <p className="text-sm text-zinc-400">{name}</p>
      </div>
      <div className={`px-2 py-1 rounded-full text-sm ${parseFloat(change) >= 0 ? 'bg-green-900/50 text-green-300' : 'bg-red-900/50 text-red-300'}`}>
        {change}%
      </div>
    </div>
    <div className="text-xl font-bold text-zinc-100">${price}</div>
  </div>
);

const VotingTimer = () => {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0
  });

  useEffect(() => {
    // Set end date to 7 days from now for demo purposes
    const endDate = new Date();
    endDate.setDate(endDate.getDate() + 7);

    const updateTimer = () => {
      const now = new Date();
      const difference = endDate.getTime() - now.getTime();

      const days = Math.floor(difference / (1000 * 60 * 60 * 24));
      const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));

      setTimeLeft({ days, hours, minutes });
    };

    updateTimer();
    const interval = setInterval(updateTimer, 60000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="text-center mb-8">
      <h2 className="text-2xl font-semibold text-zinc-200 mb-4">Voting Closes in</h2>
      <div className="flex justify-center gap-4 text-zinc-100">
        <div className="bg-zinc-800 px-4 py-2 rounded-lg border border-zinc-700">
          <span className="text-2xl font-bold">{timeLeft.days}</span>
          <span className="text-sm block text-zinc-400">Days</span>
        </div>
        <div className="bg-zinc-800 px-4 py-2 rounded-lg border border-zinc-700">
          <span className="text-2xl font-bold">{timeLeft.hours}</span>
          <span className="text-sm block text-zinc-400">Hours</span>
        </div>
        <div className="bg-zinc-800 px-4 py-2 rounded-lg border border-zinc-700">
          <span className="text-2xl font-bold">{timeLeft.minutes}</span>
          <span className="text-sm block text-zinc-400">Minutes</span>
        </div>
      </div>
    </div>
  );
};

const Index = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [isMobile, setIsMobile] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const stocks = [
    { symbol: "NVDA", name: "NVIDIA Corporation", price: "476.57", change: "+2.45" },
    { symbol: "TSLA", name: "Tesla, Inc.", price: "207.83", change: "-1.23" },
    { symbol: "AAPL", name: "Apple Inc.", price: "171.48", change: "+0.89" },
    { symbol: "QCOM", name: "Qualcomm Inc.", price: "145.32", change: "+1.67" },
    { symbol: "MSFT", name: "Microsoft Corporation", price: "376.17", change: "+0.95" },
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Sidebar Backdrop for Mobile */}
      {isMobile && isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* Mobile Navigation */}
      {isMobile && (
        <nav className="fixed top-0 left-0 right-0 h-16 bg-zinc-800 border-b border-zinc-700 flex items-center justify-between px-4 z-40">
          <button 
            onClick={() => setIsSidebarOpen(!isSidebarOpen)} 
            className="text-zinc-300 p-2"
          >
            <Menu size={24} />
          </button>
          <div className="flex items-center">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
              <span className="text-primary-dark font-bold">S</span>
            </div>
            <span className="ml-2 font-semibold text-text-header">StockAI</span>
          </div>
          <div className="w-10" /> {/* Spacer for centering */}
        </nav>
      )}
      
      {/* Sidebar */}
      <div className={`fixed inset-y-0 left-0 ${isMobile ? 'top-0' : ''} transition-transform duration-300 ease-in-out z-50
        ${isMobile ? (isSidebarOpen ? 'translate-x 0' : '-translate-x-full') : (isCollapsed ? 'w-20' : 'w-64')}`}
      >
        <Sidebar 
          isCollapsed={isMobile ? false : isCollapsed} 
          setIsCollapsed={isMobile ? setIsSidebarOpen : setIsCollapsed}
          isMobile={isMobile}
        />
      </div>

      {/* Desktop Sidebar Toggle Button */}
      {!isMobile && (
        <button 
          onClick={() => setIsCollapsed(!isCollapsed)}
          className={`fixed top-1/2 z-50 bg-zinc-800 border border-zinc-700 rounded-full p-1 shadow-sm transition-all duration-300
            ${isCollapsed ? 'left-16' : 'left-60'}`}
        >
          {isCollapsed ? (
            <ChevronRight size={16} className="text-primary" />
          ) : (
            <ChevronLeft size={16} className="text-primary" />
          )}
        </button>
      )}
      
      {/* Main Content */}
      <main className={`w-full min-h-screen ${isMobile ? 'pt-16' : ''}`}>
        <div className="max-w-4xl mx-auto p-8">
          <h1 className="text-4xl font-bold text-text-header mb-8 text-center">Let's Research Stocks Together</h1>
          
          {/* Chat Input */}
          <div className="mb-8">
            <div className="relative">
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="Ask me anything about stocks..."
                className="w-full px-4 py-3 rounded-lg border border-zinc-700 bg-zinc-800 text-zinc-100 focus:ring-2 focus:ring-primary focus:border-transparent pr-12 placeholder:text-zinc-500"
              />
              <button className="absolute right-2 top-1/2 transform -translate-y-1/2 text-primary hover:text-primary/80">
                <Send size={20} />
              </button>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="flex flex-wrap gap-4 mb-12 justify-center">
            {["Rank My Stocks", "Rate My Stocks", "Learn About Key Metrics", "Discover Stocks"].map((text) => (
              <button
                key={text}
                className="px-6 py-2 bg-zinc-800 text-zinc-300 rounded-full border border-zinc-700 hover:bg-zinc-700 hover:border-zinc-600 transition-colors"
              >
                {text}
              </button>
            ))}
          </div>

          {/* Voting Timer */}
          <VotingTimer />

          {/* Stock Cards */}
          <div>
            <h2 className="text-2xl font-semibold text-zinc-200 mb-6">This Week's Stocks</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {stocks.map((stock) => (
                <StockCard key={stock.symbol} {...stock} />
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Index;
