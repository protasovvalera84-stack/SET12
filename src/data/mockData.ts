export interface Message {
  id: string;
  senderId: string;
  text: string;
  timestamp: string;
  read: boolean;
}

export interface Chat {
  id: string;
  name: string;
  avatar: string;
  type: "dm" | "group" | "channel";
  online?: boolean;
  lastMessage: string;
  lastMessageTime: string;
  unread: number;
  pinned?: boolean;
  members?: number;
  messages: Message[];
}

const ME = "me";

export const chats: Chat[] = [
  {
    id: "1",
    name: "Alice Nakamoto",
    avatar: "AN",
    type: "dm",
    online: true,
    lastMessage: "The relay node is syncing perfectly now",
    lastMessageTime: "2m",
    unread: 2,
    pinned: true,
    messages: [
      { id: "m1", senderId: "alice", text: "Hey, did you check the CRDT merge on the staging relay?", timestamp: "10:02 AM", read: true },
      { id: "m2", senderId: ME, text: "Yeah, ran it last night. Got some conflicts on the vector clocks though.", timestamp: "10:05 AM", read: true },
      { id: "m3", senderId: "alice", text: "That's expected for concurrent edits. Did the LWW fallback kick in?", timestamp: "10:06 AM", read: true },
      { id: "m4", senderId: ME, text: "It did. Merged cleanly after the second pass. I pushed the fix to the crdt crate.", timestamp: "10:10 AM", read: true },
      { id: "m5", senderId: "alice", text: "Nice! I'll pull and test with the 3-node mesh.", timestamp: "10:12 AM", read: true },
      { id: "m6", senderId: "alice", text: "The relay node is syncing perfectly now", timestamp: "10:30 AM", read: false },
      { id: "m7", senderId: "alice", text: "We should deploy to the testnet cluster next", timestamp: "10:31 AM", read: false },
    ],
  },
  {
    id: "2",
    name: "Core Dev Team",
    avatar: "CD",
    type: "group",
    lastMessage: "Bob: Pushed the libp2p QUIC upgrade",
    lastMessageTime: "15m",
    unread: 5,
    members: 8,
    messages: [
      { id: "m1", senderId: "bob", text: "Pushed the libp2p QUIC upgrade to the relay crate", timestamp: "9:45 AM", read: true },
      { id: "m2", senderId: "carol", text: "Does it handle NAT traversal for symmetric NATs now?", timestamp: "9:48 AM", read: true },
      { id: "m3", senderId: "bob", text: "Yes, added hole-punching via the DCUtR protocol", timestamp: "9:50 AM", read: true },
      { id: "m4", senderId: ME, text: "Great work. Let's run the fault sim tests before merging.", timestamp: "9:55 AM", read: true },
    ],
  },
  {
    id: "3",
    name: "# releases",
    avatar: "RE",
    type: "channel",
    lastMessage: "v0.3.0-alpha released with E2EE group chats",
    lastMessageTime: "1h",
    unread: 0,
    members: 142,
    messages: [
      { id: "m1", senderId: "system", text: "v0.3.0-alpha released\n\n- E2EE group chats (X3DH + Double Ratchet)\n- CRDT-based message ordering\n- File sharing via encrypted IPFS blobs\n- selfdeploy CLI v0.2", timestamp: "9:00 AM", read: true },
    ],
  },
  {
    id: "4",
    name: "Eve Torres",
    avatar: "ET",
    type: "dm",
    online: false,
    lastMessage: "Let me check the TURN server logs",
    lastMessageTime: "3h",
    unread: 0,
    messages: [
      { id: "m1", senderId: ME, text: "Voice calls are dropping after ~30s on the staging relay", timestamp: "7:00 AM", read: true },
      { id: "m2", senderId: "eve", text: "Could be a TURN allocation timeout. What's the config?", timestamp: "7:15 AM", read: true },
      { id: "m3", senderId: ME, text: "Default coturn settings, 300s lifetime", timestamp: "7:16 AM", read: true },
      { id: "m4", senderId: "eve", text: "Let me check the TURN server logs", timestamp: "7:20 AM", read: true },
    ],
  },
  {
    id: "5",
    name: "# security-audit",
    avatar: "SA",
    type: "channel",
    lastMessage: "CVE scan passed - 0 critical findings",
    lastMessageTime: "5h",
    unread: 0,
    members: 23,
    messages: [
      { id: "m1", senderId: "secbot", text: "Weekly Security Report\n\nSAST: 0 high, 2 medium\nSCA: 0 critical CVEs\nDependency audit: all clear\nBinary signatures: verified", timestamp: "6:00 AM", read: true },
    ],
  },
  {
    id: "6",
    name: "Mesh Network Lab",
    avatar: "ML",
    type: "group",
    lastMessage: "Dave: 50-node simulation completed",
    lastMessageTime: "1d",
    unread: 0,
    members: 12,
    messages: [
      { id: "m1", senderId: "dave", text: "50-node simulation completed. Average convergence: 340ms", timestamp: "Yesterday", read: true },
      { id: "m2", senderId: ME, text: "That's within our SLA target. What about partition healing?", timestamp: "Yesterday", read: true },
      { id: "m3", senderId: "dave", text: "Healed in under 2s for all tested topologies", timestamp: "Yesterday", read: true },
    ],
  },
];
