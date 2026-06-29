import { useState } from "react";
import { 
  mockFacilitatorMessages,
  FacilitatorMessage 
} from "../../../data/mockFacilitator";
import { 
  Mail, 
  Send, 
  Search, 
  Paperclip, 
  MoreVertical, 
  Phone, 
  Video, 
  UserPlus,
  Circle
} from "lucide-react";

export function MessagesView() {
  const [localConversations, setLocalConversations] = useState<FacilitatorMessage[]>(mockFacilitatorMessages);
  const [activeConvId, setActiveConvId] = useState<string>("msg-101");
  const [typingText, setTypingText] = useState("");

  const activeConv = localConversations.find(c => c.id === activeConvId) || localConversations[0];

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!typingText.trim()) return;

    const newMsg = {
      id: `msg-item-${Date.now()}`,
      sender: "You" as const,
      content: typingText,
      time: "Just Now"
    };

    setLocalConversations(prev => prev.map(conv => {
      if (conv.id === activeConv.id) {
        return {
          ...conv,
          unread: false,
          lastMessage: typingText,
          timestamp: "Just Now",
          messages: [...conv.messages, newMsg]
        };
      }
      return conv;
    }));

    setTypingText("");
  };

  const handleSelectConv = (id: string) => {
    setActiveConvId(id);
    // Mark as read when selected
    setLocalConversations(prev => prev.map(conv => {
      if (conv.id === id) {
        return { ...conv, unread: false };
      }
      return conv;
    }));
  };

  return (
    <div className="space-y-6">
      
      {/* Page Title */}
      <div className="text-left space-y-1.5">
        <span className="text-[10px] font-bold text-sustain-primary uppercase tracking-widest font-mono block">
          TRAINER INBOX
        </span>
        <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight font-sans leading-tight">
          Facilitator Communication Center
        </h2>
        <p className="text-sm text-slate-500 font-medium">
          Send instant guidance to your active cohorts, respond to learner inquiries, and coordinate with local program managers.
        </p>
      </div>

      {/* Messaging split block */}
      <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm flex flex-col md:flex-row h-[550px]">
        
        {/* Left Side: Inbox Conversation List (Span 1/3) */}
        <div className="w-full md:w-80 border-r border-slate-200 flex flex-col h-full bg-slate-50/20 shrink-0">
          <div className="p-4 border-b border-slate-100 bg-white">
            <div className="relative">
              <Search className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
              <input
                type="text"
                placeholder="Search conversations..."
                className="w-full pl-9 pr-4 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-xs font-medium focus:outline-hidden focus:border-emerald-850 focus:bg-white"
              />
            </div>
          </div>

          <div className="flex-1 overflow-y-auto divide-y divide-slate-100">
            {localConversations.map((conv) => {
              const isActive = conv.id === activeConv.id;
              
              return (
                <div
                  key={conv.id}
                  onClick={() => handleSelectConv(conv.id)}
                  className={`p-4 flex gap-3 hover:bg-slate-50 transition-colors cursor-pointer text-left relative ${
                    isActive ? "bg-white border-l-4 border-emerald-800 pl-3" : ""
                  }`}
                >
                  {/* Avatar Initials */}
                  <div className="h-10 w-10 rounded-xl bg-slate-150 border border-slate-200/55 flex items-center justify-center font-bold text-xs text-slate-700 shrink-0 select-none">
                    {conv.avatarInitials}
                  </div>

                  <div className="flex-1 min-w-0 space-y-1">
                    <div className="flex justify-between items-baseline gap-1">
                      <h4 className="text-xs font-extrabold text-slate-900 truncate">
                        {conv.senderName}
                      </h4>
                      <span className="text-[9px] text-slate-400 font-bold font-mono shrink-0">
                        {conv.timestamp}
                      </span>
                    </div>

                    <p className={`text-[11px] leading-snug truncate ${conv.unread ? "text-slate-900 font-extrabold" : "text-slate-500 font-medium"}`}>
                      {conv.lastMessage}
                    </p>
                  </div>

                  {conv.unread && (
                    <span className="absolute right-4 top-1/2 -translate-y-1/2 h-2.5 w-2.5 bg-emerald-700 rounded-full" />
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Side: Active Chat Window (Span 2/3) */}
        <div className="flex-1 flex flex-col h-full bg-white text-left">
          
          {/* Header */}
          <div className="px-6 py-4 border-b border-slate-150/70 flex justify-between items-center bg-slate-50/30">
            <div className="flex items-center gap-3">
              <div className="h-9 w-9 rounded-xl bg-slate-100 border border-slate-200 flex items-center justify-center font-bold text-xs text-slate-600 select-none">
                {activeConv.avatarInitials}
              </div>
              <div className="space-y-0.5">
                <h3 className="text-xs font-extrabold text-slate-900">{activeConv.senderName}</h3>
                <span className="text-[9.5px] text-slate-400 uppercase font-mono font-bold block leading-none">
                  {activeConv.senderRole}
                </span>
              </div>
            </div>

            <div className="flex items-center gap-3.5 text-slate-400">
              <button 
                onClick={() => alert("Calls are handled on-hub in the physical centers.")}
                className="p-1.5 hover:text-slate-650 cursor-pointer"
              >
                <Phone className="h-4.5 w-4.5" />
              </button>
              <button 
                onClick={() => alert("Video support handled on-hub in the physical centers.")}
                className="p-1.5 hover:text-slate-650 cursor-pointer"
              >
                <Video className="h-4.5 w-4.5" />
              </button>
              <button className="p-1.5 hover:text-slate-650 cursor-pointer">
                <MoreVertical className="h-4.5 w-4.5" />
              </button>
            </div>
          </div>

          {/* Message Thread History Bubble List */}
          <div className="flex-1 overflow-y-auto p-6 space-y-4 bg-slate-50/20">
            {activeConv.messages.map((item) => {
              const isMe = item.sender === "You";
              
              return (
                <div 
                  key={item.id} 
                  className={`flex ${isMe ? "justify-end" : "justify-start"} text-xs leading-normal font-medium`}
                >
                  <div className={`max-w-[70%] space-y-1`}>
                    <div className={`p-3 rounded-2xl ${
                      isMe 
                        ? "bg-emerald-950 text-white rounded-tr-none" 
                        : "bg-slate-100 text-slate-700 rounded-tl-none border border-slate-150"
                    }`}>
                      <p className="whitespace-pre-line leading-relaxed">{item.content}</p>
                    </div>
                    <span className={`text-[9px] text-slate-400 font-bold font-mono block ${isMe ? "text-right" : "text-left"}`}>
                      {item.time}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Form Composer Footer */}
          <form onSubmit={handleSendMessage} className="p-4 border-t border-slate-150 bg-white">
            <div className="flex gap-2 bg-slate-50 border border-slate-200 rounded-xl p-1 items-center">
              <button 
                type="button" 
                onClick={() => alert("Files are attached via the local hub workstation.")}
                className="p-2 text-slate-400 hover:text-slate-600 cursor-pointer shrink-0"
              >
                <Paperclip className="h-5 w-5" />
              </button>
              
              <input
                type="text"
                value={typingText}
                onChange={(e) => setTypingText(e.target.value)}
                placeholder={`Compose message to ${activeConv.senderName.split(" ")[0]}...`}
                className="flex-1 border-0 bg-transparent py-2 px-3 text-xs focus:outline-hidden text-slate-700 font-medium"
              />

              <button
                type="submit"
                className="bg-emerald-950 hover:bg-emerald-900 text-white p-2 rounded-lg shrink-0 cursor-pointer shadow-3xs transition-all duration-200"
              >
                <Send className="h-4.5 w-4.5" />
              </button>
            </div>
          </form>

        </div>

      </div>

    </div>
  );
}
