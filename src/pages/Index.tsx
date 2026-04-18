import { useState } from "react";
import { ChatSidebar } from "@/components/ChatSidebar";
import { ChatView } from "@/components/ChatView";
import { EmptyChat } from "@/components/EmptyChat";
import { chats as initialChats, Chat, Message, MediaAttachment } from "@/data/mockData";

const Index = () => {
  const [chatList, setChatList] = useState<Chat[]>(initialChats);
  const [selectedChatId, setSelectedChatId] = useState<string | null>(null);
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const selectedChat = chatList.find((c) => c.id === selectedChatId) ?? null;

  const handleSelectChat = (id: string) => {
    setSelectedChatId(id);
    if (window.innerWidth < 768) {
      setSidebarOpen(false);
    }
  };

  const handleSendMessage = (chatId: string, text: string, media?: MediaAttachment[]) => {
    const newMessage: Message = {
      id: `msg-${Date.now()}`,
      senderId: "me",
      text,
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      read: false,
      media,
    };

    const lastMsg = media && media.length > 0 && !text
      ? `[${media[0].type === "image" ? "Photo" : media[0].type === "video" ? "Video" : "Audio"}]`
      : text;

    setChatList((prev) =>
      prev.map((chat) =>
        chat.id === chatId
          ? {
              ...chat,
              messages: [...chat.messages, newMessage],
              lastMessage: lastMsg,
              lastMessageTime: "now",
            }
          : chat,
      ),
    );
  };

  const handleCreateChat = (chat: Chat) => {
    setChatList((prev) => [chat, ...prev]);
    setSelectedChatId(chat.id);
    if (window.innerWidth < 768) {
      setSidebarOpen(false);
    }
  };

  const handleBack = () => {
    setSidebarOpen(true);
  };

  return (
    <div className="flex h-screen w-full overflow-hidden">
      <div
        className={`${
          sidebarOpen ? "flex" : "hidden"
        } md:flex w-full md:w-auto flex-shrink-0`}
      >
        <ChatSidebar
          chats={chatList}
          selectedChatId={selectedChatId}
          onSelectChat={handleSelectChat}
          onCreateChat={handleCreateChat}
        />
      </div>

      <div
        className={`${
          !sidebarOpen ? "flex" : "hidden"
        } md:flex flex-1 min-w-0`}
      >
        {selectedChat ? (
          <ChatView
            chat={selectedChat}
            onSendMessage={handleSendMessage}
            onBack={handleBack}
          />
        ) : (
          <EmptyChat />
        )}
      </div>
    </div>
  );
};

export default Index;
