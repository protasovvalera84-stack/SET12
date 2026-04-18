import { useState } from "react";
import { ChatSidebar } from "@/components/ChatSidebar";
import { ChatView } from "@/components/ChatView";
import { EmptyChat } from "@/components/EmptyChat";
import { chats } from "@/data/mockData";

const Index = () => {
  const [selectedChatId, setSelectedChatId] = useState<string | null>(null);
  const selectedChat = chats.find((c) => c.id === selectedChatId) ?? null;

  return (
    <div className="flex h-screen w-full overflow-hidden">
      <ChatSidebar
        chats={chats}
        selectedChatId={selectedChatId}
        onSelectChat={setSelectedChatId}
      />
      {selectedChat ? <ChatView chat={selectedChat} /> : <EmptyChat />}
    </div>
  );
};

export default Index;
