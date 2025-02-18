
import { useState } from "react";
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
  ChevronDown
} from "lucide-react";

const Sidebar = ({ isCollapsed, setIsCollapsed }: { isCollapsed: boolean; setIsCollapsed: (value: boolean) => void }) => {
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  return (
    <div className={`h-screen ${isCollapsed ? 'w-20' : 'w-64'} bg-white border-r border-gray-200 p-4 transition-all duration-300 ease-in-out relative`}>
      {/* Company Logo */}
      <div className="flex items-center space-x-3 mb-8">
        <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center">
          <span className="text-white font-bold">S</span>
        </div>
        {!isCollapsed && <span className="font-semibold">StockAI</span>}
      </div>

      {/* New Chat Button */}
      <button className={`w-full bg-indigo-600 text-white rounded-lg p-2 flex items-center justify-center mb-6 hover:bg-indigo-700 transition-colors ${isCollapsed ? 'px-2' : 'px-4'}`}>
        <MessageSquarePlus size={20} />
        {!isCollapsed && <span className="ml-2">New Chat</span>}
      </button>

      {/* Starred Chats */}
      <div className="mb-6">
        <div className="flex items-center text-gray-600 mb-2">
          <Star size={16} />
          {!isCollapsed && <span className="ml-2 text-sm">Starred</span>}
        </div>
        {!isCollapsed && (
          <div className="space-y-2">
            <div className="text-sm text-gray-600 pl-6">NVDA Analysis</div>
            <div className="text-sm text-gray-600 pl-6">Portfolio Review</div>
          </div>
        )}
      </div>

      {/* Recent Chats */}
      <div>
        <div className="flex items-center text-gray-600 mb-2">
          <Clock size={16} />
          {!isCollapsed && <span className="ml-2 text-sm">Recent</span>}
        </div>
        {!isCollapsed && (
          <div className="space-y-2">
            <div className="text-sm text-gray-600 pl-6">Market Overview</div>
            <div className="text-sm text-gray-600 pl-6">Tech Sector Analysis</div>
            <div className="text-sm text-gray-600 pl-6">Dividend Stocks</div>
            <button className="text-sm text-indigo-600 pl-6 flex items-center">
              View all <ChevronRight size={14} className="ml-1" />
            </button>
          </div>
        )}
      </div>

      {/* Collapse Button */}
      <button 
        onClick={() => setIsCollapsed(!isCollapsed)}
        className="absolute top-1/2 -right-3 bg-white border border-gray-200 rounded-full p-1 shadow-sm"
      >
        {isCollapsed ? <ChevronRight size={16} /> : <ChevronLeft size={16} />}
      </button>

      {/* Profile Section */}
      <div className="absolute bottom-4 left-0 right-0 px-4">
        <div 
          className="flex items-center space-x-3 cursor-pointer"
          onClick={() => setIsProfileOpen(!isProfileOpen)}
        >
          <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center">
            <User size={20} className="text-gray-600" />
          </div>
          {!isCollapsed && (
            <>
              <div className="flex-1">
                <div className="text-sm font-medium">John Doe</div>
                <div className="text-xs text-gray-500">@johndoe</div>
              </div>
              <ChevronDown size={16} className="text-gray-500" />
            </>
          )}
        </div>
        {isProfileOpen && !isCollapsed && (
          <div className="absolute bottom-16 left-4 right-4 bg-white border border-gray-200 rounded-lg shadow-lg p-2">
            <button className="w-full text-left px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded flex items-center">
              <Home size={16} className="mr-2" /> Home
            </button>
            <button className="w-full text-left px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded flex items-center">
              <Vote size={16} className="mr-2" /> Vote
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

const StockCard = ({ symbol, name, price, change }: { symbol: string; name: string; price: string; change: string }) => (
  <div className="bg-white rounded-lg border border-gray-200 p-4 hover:shadow-md transition-shadow">
    <div className="flex justify-between items-start mb-2">
      <div>
        <h3 className="font-semibold text-lg">{symbol}</h3>
        <p className="text-sm text-gray-600">{name}</p>
      </div>
      <div className={`px-2 py-1 rounded-full text-sm ${parseFloat(change) >= 0 ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
        {change}%
      </div>
    </div>
    <div className="text-xl font-bold">${price}</div>
  </div>
);

const Index = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [inputValue, setInputValue] = useState("");

  const stocks = [
    { symbol: "NVDA", name: "NVIDIA Corporation", price: "476.57", change: "+2.45" },
    { symbol: "TSLA", name: "Tesla, Inc.", price: "207.83", change: "-1.23" },
    { symbol: "AAPL", name: "Apple Inc.", price: "171.48", change: "+0.89" },
    { symbol: "QCOM", name: "Qualcomm Inc.", price: "145.32", change: "+1.67" },
    { symbol: "MSFT", name: "Microsoft Corporation", price: "376.17", change: "+0.95" },
  ];

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar isCollapsed={isCollapsed} setIsCollapsed={setIsCollapsed} />
      
      <main className="flex-1 p-8 overflow-auto">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold text-gray-900 mb-8 text-center">Let's Research Stocks Together</h1>
          
          {/* Chat Input */}
          <div className="mb-8">
            <div className="relative">
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="Ask me anything about stocks..."
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-600 focus:border-transparent pr-12"
              />
              <button className="absolute right-2 top-1/2 transform -translate-y-1/2 text-indigo-600 hover:text-indigo-700">
                <Send size={20} />
              </button>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="flex flex-wrap gap-4 mb-12 justify-center">
            {["Rank My Stocks", "Rate My Stocks", "Learn About Key Metrics", "Discover Stocks"].map((text) => (
              <button
                key={text}
                className="px-6 py-2 bg-white text-gray-700 rounded-full border border-gray-300 hover:bg-gray-50 hover:border-gray-400 transition-colors"
              >
                {text}
              </button>
            ))}
          </div>

          {/* Stock Cards */}
          <div>
            <h2 className="text-2xl font-semibold text-gray-900 mb-6">This Week's Stocks</h2>
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
