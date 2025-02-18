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
        {isProfileOpen && (
          <div className={`absolute ${isCollapsed && !isMobile ? 'left-20 bottom-0 w-48' : 'bottom-16 left-4 right-4'} bg-zinc-800 border border-zinc-700 rounded-lg shadow-lg p-2`}>
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

export default Sidebar;
