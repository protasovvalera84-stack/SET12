import { useState } from "react";
import { X, Hash, Users, Image, Camera } from "lucide-react";
import { Chat } from "@/data/mockData";

interface CreateChatDialogProps {
  open: boolean;
  type: "group" | "channel";
  onClose: () => void;
  onCreate: (chat: Chat) => void;
}

export function CreateChatDialog({ open, type, onClose, onCreate }: CreateChatDialogProps) {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  if (!open) return null;

  const handleCreate = () => {
    if (!name.trim()) return;

    const initials = name
      .split(" ")
      .map((w) => w[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);

    const newChat: Chat = {
      id: `chat-${Date.now()}`,
      name: type === "channel" ? `# ${name.trim()}` : name.trim(),
      avatar: initials || "??",
      type,
      lastMessage: description.trim() || "Chat created",
      lastMessageTime: "now",
      unread: 0,
      members: 1,
      messages: [
        {
          id: `msg-${Date.now()}`,
          senderId: "system",
          text: description.trim()
            ? `${type === "channel" ? "Channel" : "Group"} created\n\n${description.trim()}`
            : `${type === "channel" ? "Channel" : "Group"} "${name.trim()}" created. Start sharing!`,
          timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
          read: true,
        },
      ],
    };

    onCreate(newChat);
    setName("");
    setDescription("");
    onClose();
  };

  const handleClose = () => {
    setName("");
    setDescription("");
    onClose();
  };

  const isChannel = type === "channel";

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 animate-fade-in-up"
      onClick={handleClose}
    >
      <div className="absolute inset-0 bg-background/70 backdrop-blur-sm" />
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-md rounded-3xl glass-strong border border-border/60 shadow-elegant p-6"
      >
        {/* Header */}
        <div className="flex items-center justify-between mb-5">
          <h2 className="text-xl font-serif italic gradient-text">
            {isChannel ? "New Channel" : "New Group"}
          </h2>
          <button
            onClick={handleClose}
            className="rounded-lg p-1.5 hover:bg-surface-hover transition-colors"
          >
            <X className="h-4 w-4 text-muted-foreground" />
          </button>
        </div>

        <div className="space-y-4">
          {/* Avatar preview */}
          <div className="flex justify-center">
            <div className="relative group cursor-pointer">
              <div className={`flex h-20 w-20 items-center justify-center rounded-3xl text-xl font-bold transition-transform group-hover:scale-105 ${
                isChannel
                  ? "bg-gradient-to-br from-accent/30 to-accent/10 text-accent border border-accent/20"
                  : "bg-gradient-to-br from-primary/30 to-primary-glow/10 text-primary border border-primary/20"
              }`}>
                {name.trim()
                  ? name.split(" ").map((w) => w[0]).join("").toUpperCase().slice(0, 2)
                  : isChannel ? <Hash className="h-8 w-8" /> : <Users className="h-8 w-8" />
                }
              </div>
              <div className="absolute -bottom-1 -right-1 flex h-7 w-7 items-center justify-center rounded-full gradient-primary shadow-glow">
                <Camera className="h-3.5 w-3.5 text-primary-foreground" />
              </div>
            </div>
          </div>

          {/* Name */}
          <div>
            <label className="text-[10px] font-mono uppercase tracking-[0.15em] text-muted-foreground mb-1.5 block">
              {isChannel ? "Channel name" : "Group name"}
            </label>
            <input
              type="text"
              placeholder={isChannel ? "e.g. announcements" : "e.g. Project Alpha"}
              value={name}
              onChange={(e) => setName(e.target.value)}
              autoFocus
              className="w-full rounded-2xl glass border border-border/50 px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground outline-none focus:border-primary/50 focus:shadow-glow transition-all bg-transparent"
            />
          </div>

          {/* Description */}
          <div>
            <label className="text-[10px] font-mono uppercase tracking-[0.15em] text-muted-foreground mb-1.5 block">
              Description (optional)
            </label>
            <textarea
              placeholder="What is this about?"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={3}
              className="w-full rounded-2xl glass border border-border/50 px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground outline-none focus:border-primary/50 focus:shadow-glow transition-all bg-transparent resize-none"
            />
          </div>

          {/* Media permissions info */}
          <div className="flex items-center gap-2 px-3 py-2 rounded-xl bg-primary/5 border border-primary/10">
            <Image className="h-4 w-4 text-primary flex-shrink-0" />
            <p className="text-[11px] text-muted-foreground">
              Members can share photos, videos, and audio files
            </p>
          </div>

          {/* Create button */}
          <button
            onClick={handleCreate}
            disabled={!name.trim()}
            className={`w-full rounded-2xl py-3 text-sm font-semibold transition-all ${
              name.trim()
                ? "gradient-primary text-primary-foreground shadow-glow hover:scale-[1.02]"
                : "bg-secondary text-muted-foreground cursor-not-allowed"
            }`}
          >
            Create {isChannel ? "Channel" : "Group"}
          </button>
        </div>
      </div>
    </div>
  );
}
