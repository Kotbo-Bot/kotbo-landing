export const mockProfileData = {
  id: "23490234098234",
  username: "Arka",
  avatar: "https://cdn.discordapp.com/avatars/123/456.png",
  joinedAt: "2023-01-15T14:32:00Z",
  messages: 3452,
  invites: 12,
  voiceTime: 124500, // in seconds
  roles: [
    { id: "1", name: "Membre Actif", color: "#3498db" },
    { id: "2", name: "VIP", color: "#f1c40f" }
  ],
  sanctions: [
    { type: "warn", reason: "Spam dans le salon général", date: "2024-02-10T10:00:00Z", moderator: "Zenox" }
  ]
};

export const mockTicketData = [
  { id: "T-104", author: "Kylian", subject: "Candidature Staff", status: "open", priority: "high", category: "Recrutement", time: "10 min" },
  { id: "T-103", author: "Sarah", subject: "Problème de rôle VIP", status: "claimed", priority: "medium", category: "Support", time: "2h" },
  { id: "T-102", author: "Maxou", subject: "Joueur toxique en vocal", status: "closed", priority: "high", category: "Plainte", time: "1j" }
];

export const mockSanctionData = {
  id: "C-458",
  user: "ToxicoBoy",
  type: "Ban (7 jours)",
  reason: "Insultes répétées et refus de coopération",
  moderator: "Admin_Lena",
  date: "14 Juin 2026",
  status: "active",
  proofs: [
    { type: "image", url: "capture-insulte.png" },
    { type: "transcript", url: "ticket-transcript.txt" }
  ]
};

export const mockStaffData = [
  { id: "1", name: "Zenox", role: "Administrateur", status: "online", actions: 452 },
  { id: "2", name: "Lena", role: "Responsable Staff", status: "dnd", actions: 310 },
  { id: "3", name: "Aiden", role: "Modérateur", status: "offline", actions: 124 },
  { id: "4", name: "Mia", role: "Helpeur", status: "online", actions: 89 }
];
