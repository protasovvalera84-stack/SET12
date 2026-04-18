import { useState } from "react";
import { X, Hash, Users, Image, Camera } from "lucide-react";
import { Chat } from "@/data/mockData";

interface CreateChatDialogProps {
  open: boolean;
  onClose: () => void;
  onCreate: (chat: Chat) => void;
}

export function CreateChatDialog({ open, onClose, onCreate }: CreateChatDialogProps) {
  const [step, setStep] = useState<"type" | "details">("type");
  const [chatType, setChatType] = useState<"group" | "channel">("group");
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
      name: chatType === "channel" ? `# ${name.trim()}` : name.trim(),
      avatar: initials || "??",
      type: chatType,
      lastMessage: description.trim() || "Chat created",
      lastMessageTime: "now",
      unread: 0,
      members: 1,
      messages: [
        {
          id: `msg-${Date.now()}`,
          senderId: "system",
          text: description.trim()
            ? `${chatType === "channel" ? "Channel" : "Group"} created\n\n${description.trim()}`
            : `${chatType === "channel" ? "Channel" : "Group"} "${name.trim()}" created. Start sharing!`,
          timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
          read: true,
        },
      ],
    };

    onCreate(newChat);
    // Reset
    setStep("type");
    setName("");
    setDescription("");
    onClose();
  };

  const handleBack = () => {
    if (step === "details") {
      setStep("type");
    } else {
      onClose();
      setStep("type");
      setName("");
      setDescription("");
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 animate-fade-in-up"
      onClick={handleBack}
    >
      <div className="absolute inset-0 bg-background/70 backdrop-blur-sm" />
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-md rounded-3xl glass-strong border border-border/60 shadow-elegant p-6"
      >
        {/* Header */}
        <div className="flex items-center justify-between mb-5">
          <h2 className="text-xl font-serif italic gradient-text">
            {step === "type" ? "Create New" : chatType === "channel" ? "New Channel" : "New Group"}
          </h2>
          <button
            onClick={handleBack}
            className="rounded-lg p-1.5 hover:bg-surface-hover transition-colors"
          >
            <X className="h-4 w-4 text-muted-foreground" />
          </button>
        </div>

        {step === "type" ? (
          /* Step 1: Choose type */
          <div className="space-y-3">
            <p className="text-xs text-muted-foreground mb-4">
              Choose what you want to create
            </p>

            <button
              onClick={() => { setChatType("group"); setStep("details"); }}
              className="group flex w-full items-center gap-4 rounded-2xl border border-border/50 p-4 text-left transition-all hover:border-primary/40 hover:shadow-glow hover:-translate-y-0.5"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-primary/30 to-primary-glow/10 border border-primary/20 group-hover:scale-110 transition-transform">
                <Users className="h-5 w-5 text-primary" />
              </div>
              <div>
                <p className="text-sm font-semibold text-foreground">Group</p>
                <p className="text-[11px] text-muted-foreground">Private group for up to 200 members</p>
              </div>
            </button>

            <button
              onClick={() => { setChatType("channel"); setStep("details"); }}
              className="group flex w-full items-center gap-4 rounded-2xl border border-border/50 p-4 text-left transition-all hover:border-accent/40 hover:shadow-glow hover:-translate-y-0.5"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-accent/30 to-accent/10 border border-accent/20 group-hover:scale-110 transition-transform">
                <Hash className="h-5 w-5 text-accent" />
              </div>
              <div>
                <p className="text-sm font-semibold text-foreground">Channel</p>
                <p className="text-[11px] text-muted-foreground">Public broadcast channel, unlimited subscribers</p>
              </div>
            </button>
          </div>
        ) : (
          /* Step 2: Details */
          <div className="space-y-4">
            {/* Avatar preview */}
            <div className="flex justify-center">
              <div className="relative group cursor-pointer">
                <div className={`flex h-20 w-20 items-center justify-center rounded-3xl text-xl font-bold transition-transform group-hover:scale-105 ${
                  chatType === "channel"
                    ? "bg-gradient-to-br from-accent/30 to-accent/10 text-accent border border-accent/20"
                    : "bg-gradient-to-br from-primary/30 to-primary-glow/10 text-primary border border-primary/20"
                }`}>
                  {name.trim()
                    ? name.split(" ").map((w) => w[0]).join("").toUpperCase().slice(0, 2)
                    : chatType === "channel" ? <Hash className="h-8 w-8" /> : <Users className="h-8 w-8" />
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
                {chatType === "channel" ? "Channel name" : "Group name"}
              </label>
              <input
                type="text"
                placeholder={chatType === "channel" ? "e.g. announcements" : "e.g. Project Alpha"}
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
              Create {chatType === "channel" ? "Channel" : "Group"}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
