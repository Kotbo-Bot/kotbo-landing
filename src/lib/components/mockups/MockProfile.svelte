<script lang="ts">
  import Papicon from '../Papicon.svelte';
  import { mockAvatar, mockBanner } from '$lib/mockMedia';

  let { user = 'Arka', role = 'Fondateur', avatar = 'Arka' }: {
    user?: string;
    role?: string;
    avatar?: string;
  } = $props();

  let activeInnerTab = $state('resume');
  let viewingReportId = $state<string | null>(null);
  let analyticsLoading = $state(false);

  // Notes state
  let moderatorNoteInput = $state('');
  let noteFeedback = $state('');
  let noteBusy = $state(false);

  // Link accounts state
  let targetAccountId = $state('');
  let linkReason = $state('');
  let linkFeedback = $state('');
  let linkIsError = $state(false);
  let linkBusy = $state(false);

  // Mutable state for lists to make them functional
  let linkedAccountsList = $state<any[]>([]);
  let sanctionsList = $state<any[]>([]);

  type DailyTrendPoint = {
    dateKey: string;
    messages: number;
    voiceMinutes: number;
  };

  // Daily Trend generator helper to generate realistic, seed-based mock trend lines
  function getDailyTrend(seed: string, totalMessages: number, totalVoiceSeconds: number): DailyTrendPoint[] {
    const trend: DailyTrendPoint[] = [];
    const totalVoiceMinutes = Math.round(totalVoiceSeconds / 60);
    const avgMsg = totalMessages / 30;
    const avgVoc = totalVoiceMinutes / 30;
    
    // Simple hash for seed
    let hash = 0;
    for (let i = 0; i < seed.length; i++) {
      hash = seed.charCodeAt(i) + ((hash << 5) - hash);
    }
    
    for (let day = 30; day >= 1; day--) {
      const d = new Date("2026-06-14T13:52:26+02:00");
      d.setDate(d.getDate() - day);
      const dateKey = d.toISOString().split('T')[0];
      
      const factor1 = Math.abs(Math.sin(hash + day) * 1.3 + 0.3);
      const factor2 = Math.abs(Math.cos(hash - day) * 1.3 + 0.3);
      
      const messages = Math.round(avgMsg * factor1);
      const voiceMinutes = Math.round(avgVoc * factor2);
      
      trend.push({
        dateKey,
        messages,
        voiceMinutes
      });
    }
    return trend;
  }

  // Derived mock data depending on target username
  let caseData = $derived.by(() => {
    const u = user.toLowerCase();
    let data: any;
    if (u === 'arka') {
      data = {
        profile: {
          userId: '982349823492834',
          userTag: 'arka_boss',
          username: 'arka_boss',
          globalName: 'Arka',
          displayName: 'Arka',
          avatarUrl: mockAvatar('Arka'),
          bannerUrl: mockBanner('Arka'),
          locale: 'fr',
          isBot: false,
          accountCreatedAt: '2023-03-12T14:23:00.000Z',
          guildJoinedAt: '2024-05-04T09:15:00.000Z',
          guildLeftAt: null,
          firstSeenAt: '2024-05-04T09:15:00.000Z',
          lastSeenAt: '2026-06-14T13:45:00.000Z',
          messageCount: 3452,
          voiceTimeSeconds: 124500,
          rolesSnapshot: ['Fondateur', 'Tuteur', 'Staff'],
          presenceStatus: 'online',
          pronouns: 'He/Him',
          isTutor: true,
          staffGrade: 'Fondateur',
          moderatorNote: 'Fondateur historique du serveur.'
        },
        invite: {
          code: 'KOTBO',
          inviterId: 'lena',
          inviterTag: 'Lena',
          inviterAvatarUrl: mockAvatar('Lena'),
          joinedAt: '2024-05-04T09:15:00.000Z'
        },
        roles: [
          { id: 'r1', name: 'Fondateur', color: '#f59e0b' },
          { id: 'r2', name: 'Tuteur', color: '#6366f1' },
          { id: 'r3', name: 'Staff', color: '#10b981' }
        ],
        effectivePermissions: ['ADMINISTRATOR', 'MANAGE_GUILD', 'MANAGE_ROLES', 'KICK_MEMBERS', 'BAN_MEMBERS'],
        sanctions: [
          { id: 's1', type: 'WARN', status: 'RESOLVED', targetUserId: '982349823492834', targetTag: 'Arka', moderatorUserId: 'lena_id', moderatorTag: 'Lena', reason: 'Spam de mentions', createdAt: '2026-04-12T14:20:00.000Z', resolvedAt: '2026-04-12T15:20:00.000Z', resolutionNote: 'Excuses présentées' }
        ],
        logs: [
          { id: 'l1', user: 'Arka', action: 'Connexion au dashboard', module: 'Auth', source: 'dashboard', details: 'Connexion depuis l’IP 192.168.1.1 (France)', dateIso: '2026-06-14T13:40:00.000Z' },
          { id: 'l2', user: 'Arka', action: 'Modification de salon vocal', module: 'Channels', source: 'discord', details: 'Salon #Vocal-1 modifié', dateIso: '2026-06-14T12:15:00.000Z' },
          { id: 'l3', user: 'Arka', action: 'Ticket #104 fermé', module: 'Tickets', source: 'dashboard', details: 'Ticket résolu par Arka', dateIso: '2026-06-14T10:30:00.000Z' }
        ],
        messagesByChannel: [
          {
            channelId: 'c1',
            channelName: 'général',
            count: 1845,
            lastMessageAt: '2026-06-14T13:35:00.000Z',
            recentMessages: [
              { id: 'm1', content: 'Je pense qu\'on devrait automatiser l\'accueil des nouveaux.', dateIso: '2026-06-14T13:35:00.000Z', channelName: 'général' },
              { id: 'm1_2', content: 'Surtout avec le pic de membres ce weekend.', dateIso: '2026-06-14T13:34:00.000Z', channelName: 'général' }
            ]
          },
          {
            channelId: 'c2',
            channelName: 'développement',
            count: 1202,
            lastMessageAt: '2026-06-14T12:20:00.000Z',
            recentMessages: [
              { id: 'm2', content: 'Le bot Kotbo est prêt à être déployé sur le serveur principal.', dateIso: '2026-06-14T12:20:00.000Z', channelName: 'développement' }
            ]
          }
        ],
        recentMessageCount: 15,
        recentLogCount: 8,
        connections: [
          { name: 'arka_github', type: 'github', visible: true },
          { name: 'arka_spotify', type: 'spotify', visible: true }
        ],
        candidatures: [
          { id: 'cand1', status: 'APPROVED', notes: 'Excellent profil technique, motivé et dispo.', createdAt: '2024-05-01T00:00:00.000Z', oralResult: 'Validé' }
        ],
        linkedAccounts: [
          { userId: '98273498234', userTag: 'ArkaAlt', type: 'Alt Account', status: 'VALIDATED' }
        ],
        isSuspectedDC: false,
        interactionGraph: {
          nodes: [
            { id: 'arka', label: 'Arka', type: 'user' },
            { id: 'lena', label: 'Lena', type: 'target' },
            { id: 'zenox', label: 'Zenox', type: 'target' }
          ],
          edges: [
            { from: 'arka', to: 'lena', type: 'mention', count: 42 },
            { from: 'arka', to: 'zenox', type: 'reply', count: 15 }
          ]
        }
      };
    } else if (u === 'zenox') {
      data = {
        profile: {
          userId: '837492834928349',
          userTag: 'zenox_admin',
          username: 'zenox_admin',
          globalName: 'Zenox',
          displayName: 'Zenox',
          avatarUrl: mockAvatar('Zenox'),
          bannerUrl: mockBanner('Zenox'),
          locale: 'fr',
          isBot: false,
          accountCreatedAt: '2024-01-15T10:11:00.000Z',
          guildJoinedAt: '2025-02-10T11:20:00.000Z',
          guildLeftAt: null,
          firstSeenAt: '2025-02-10T11:20:00.000Z',
          lastSeenAt: '2026-06-14T13:20:00.000Z',
          messageCount: 1892,
          voiceTimeSeconds: 55200,
          rolesSnapshot: ['Administrateur', 'Staff'],
          presenceStatus: 'idle',
          pronouns: 'He/Him',
          isTutor: false,
          staffGrade: 'Administrateur',
          moderatorNote: 'Administrateur rigoureux, gère le pôle sanctions.'
        },
        invite: {
          code: 'ZEN',
          inviterId: 'arka',
          inviterTag: 'Arka',
          inviterAvatarUrl: mockAvatar('Arka'),
          joinedAt: '2025-02-10T11:20:00.000Z'
        },
        roles: [
          { id: 'r4', name: 'Administrateur', color: '#10b981' },
          { id: 'r3', name: 'Staff', color: '#10b981' }
        ],
        effectivePermissions: ['ADMINISTRATOR', 'MANAGE_GUILD', 'MANAGE_ROLES', 'KICK_MEMBERS', 'BAN_MEMBERS'],
        sanctions: [],
        logs: [
          { id: 'l4', user: 'Zenox', action: 'Ban appliqué', module: 'Sanctions', source: 'dashboard', details: 'A banni @InsulteurPro pour Propos injurieux', dateIso: '2026-06-14T13:20:00.000Z' },
          { id: 'l5', user: 'Zenox', action: 'Vocal rejoint', module: 'Voice', source: 'discord', details: 'Rejoint le salon vocal #Général', dateIso: '2026-06-14T13:15:00.000Z' }
        ],
        messagesByChannel: [
          {
            channelId: 'c1',
            channelName: 'général',
            count: 1205,
            lastMessageAt: '2026-06-14T11:40:00.000Z',
            recentMessages: [
              { id: 'm3', content: 'Le problème de spam a été réglé.', dateIso: '2026-06-14T11:40:00.000Z', channelName: 'général' }
            ]
          },
          {
            channelId: 'c3',
            channelName: 'aide-modération',
            count: 687,
            lastMessageAt: '2026-06-14T10:10:00.000Z',
            recentMessages: [
              { id: 'm4', content: 'Je vais traiter la candidature en attente.', dateIso: '2026-06-14T10:10:00.000Z', channelName: 'aide-modération' }
            ]
          }
        ],
        recentMessageCount: 8,
        recentLogCount: 5,
        connections: [
          { name: 'zenox_twitch', type: 'twitch', visible: true }
        ],
        candidatures: [
          { id: 'cand2', status: 'APPROVED', notes: 'Bonne expérience de modération sur d’autres serveurs.', createdAt: '2025-02-05T00:00:00.000Z', oralResult: 'Validé' }
        ],
        linkedAccounts: [],
        isSuspectedDC: false,
        interactionGraph: {
          nodes: [
            { id: 'zenox', label: 'Zenox', type: 'user' },
            { id: 'arka', label: 'Arka', type: 'target' }
          ],
          edges: [
            { from: 'zenox', to: 'arka', type: 'reply', count: 28 }
          ]
        }
      };
    } else if (u === 'lena') {
      data = {
        profile: {
          userId: '723849283492834',
          userTag: 'admin_lena',
          username: 'admin_lena',
          globalName: 'Lena',
          displayName: 'Lena',
          avatarUrl: mockAvatar('Lena'),
          bannerUrl: mockBanner('Lena'),
          locale: 'fr',
          isBot: false,
          accountCreatedAt: '2022-08-20T17:40:00.000Z',
          guildJoinedAt: '2023-10-10T12:00:00.000Z',
          guildLeftAt: null,
          firstSeenAt: '2023-10-10T12:00:00.000Z',
          lastSeenAt: '2026-06-14T13:48:00.000Z',
          messageCount: 5231,
          voiceTimeSeconds: 234000,
          rolesSnapshot: ['Responsable Staff', 'Tuteur', 'Staff'],
          presenceStatus: 'dnd',
          pronouns: 'She/Her',
          isTutor: true,
          staffGrade: 'Responsable Staff',
          moderatorNote: 'Responsable de l’animation de l’équipe et du tutorat.'
        },
        invite: {
          code: 'STAFF',
          inviterId: 'arka',
          inviterTag: 'Arka',
          inviterAvatarUrl: mockAvatar('Arka'),
          joinedAt: '2023-10-10T12:00:00.000Z'
        },
        roles: [
          { id: 'r5', name: 'Responsable Staff', color: '#ec4899' },
          { id: 'r2', name: 'Tuteur', color: '#6366f1' },
          { id: 'r3', name: 'Staff', color: '#10b981' }
        ],
        effectivePermissions: ['MANAGE_GUILD', 'MANAGE_ROLES', 'KICK_MEMBERS', 'BAN_MEMBERS', 'MANAGE_MESSAGES', 'MUTE_MEMBERS'],
        sanctions: [],
        logs: [
          { id: 'l6', user: 'Lena', action: 'Rôle attribué', module: 'Roles', source: 'dashboard', details: 'A attribué le rôle Modérateur à Aiden', dateIso: '2026-06-14T13:10:00.000Z' },
          { id: 'l7', user: 'Lena', action: 'Ticket #103 fermé', module: 'Tickets', source: 'dashboard', details: 'Résolu', dateIso: '2026-06-14T11:15:00.000Z' }
        ],
        messagesByChannel: [
          {
            channelId: 'c1',
            channelName: 'général',
            count: 3200,
            lastMessageAt: '2026-06-14T13:30:00.000Z',
            recentMessages: [
              { id: 'm5', content: 'N’hésitez pas à postuler dans le salon recrutement.', dateIso: '2026-06-14T13:30:00.000Z', channelName: 'général' }
            ]
          },
          {
            channelId: 'c4',
            channelName: 'candidatures',
            count: 2031,
            lastMessageAt: '2026-06-14T11:00:00.000Z',
            recentMessages: [
              { id: 'm6', content: 'Le profil de Zenox est très intéressant.', dateIso: '2026-06-14T11:00:00.000Z', channelName: 'candidatures' }
            ]
          }
        ],
        recentMessageCount: 22,
        recentLogCount: 14,
        connections: [
          { name: 'lena_twitter', type: 'twitter', visible: true }
        ],
        candidatures: [
          { id: 'cand3', status: 'APPROVED', notes: 'Très motivée, bon relationnel.', createdAt: '2023-10-01T00:00:00.000Z', oralResult: 'Validé' }
        ],
        linkedAccounts: [],
        isSuspectedDC: false,
        interactionGraph: {
          nodes: [
            { id: 'lena', label: 'Lena', type: 'user' },
            { id: 'arka', label: 'Arka', type: 'target' },
            { id: 'aiden', label: 'Aiden', type: 'target' }
          ],
          edges: [
            { from: 'lena', to: 'arka', type: 'mention', count: 87 },
            { from: 'lena', to: 'aiden', type: 'reply', count: 34 }
          ]
        }
      };
    } else {
      // default / Aiden
      data = {
        profile: {
          userId: '827364827364827',
          userTag: 'aiden_mod',
          username: 'aiden_mod',
          globalName: 'Aiden',
          displayName: 'Aiden',
          avatarUrl: mockAvatar('Aiden'),
          bannerUrl: mockBanner('Aiden'),
          locale: 'fr',
          isBot: false,
          accountCreatedAt: '2024-06-10T08:30:00.000Z',
          guildJoinedAt: '2025-03-01T14:40:00.000Z',
          guildLeftAt: null,
          firstSeenAt: '2025-03-01T14:40:00.000Z',
          lastSeenAt: '2026-06-14T13:46:00.000Z',
          messageCount: 451,
          voiceTimeSeconds: 9000,
          rolesSnapshot: ['Modérateur', 'Staff'],
          presenceStatus: 'online',
          pronouns: 'He/They',
          isTutor: false,
          staffGrade: 'Modérateur',
          moderatorNote: 'Modérateur fraîchement promu, en période de validation.'
        },
        invite: {
          code: 'A10',
          inviterId: 'lena',
          inviterTag: 'Lena',
          inviterAvatarUrl: mockAvatar('Lena'),
          joinedAt: '2025-03-01T14:40:00.000Z'
        },
        roles: [
          { id: 'r6', name: 'Modérateur', color: '#3b82f6' },
          { id: 'r3', name: 'Staff', color: '#10b981' }
        ],
        effectivePermissions: ['KICK_MEMBERS', 'BAN_MEMBERS', 'MANAGE_MESSAGES', 'MUTE_MEMBERS'],
        sanctions: [
          { id: 's2', type: 'WARN', status: 'ACTIVE', targetUserId: '827364827364827', targetTag: 'Aiden', moderatorUserId: 'lena_id', moderatorTag: 'Lena', reason: 'Spam vocal répété', createdAt: '2026-05-18T10:00:00.000Z', resolvedAt: null, resolutionNote: null }
        ],
        logs: [
          { id: 'l8', user: 'Aiden', action: 'Message supprimé', module: 'Moderation', source: 'discord', details: 'A supprimé un message de @ToxicGuy dans #général', dateIso: '2026-06-14T13:40:00.000Z' },
          { id: 'l9', user: 'Aiden', action: 'Salon vocal rejoint', module: 'Voice', source: 'discord', details: 'A rejoint #Aide', dateIso: '2026-06-14T12:00:00.000Z' }
        ],
        messagesByChannel: [
          {
            channelId: 'c1',
            channelName: 'général',
            count: 320,
            lastMessageAt: '2026-06-14T13:20:00.000Z',
            recentMessages: [
              { id: 'm7', content: 'Bonjour, bienvenue sur le serveur !', dateIso: '2026-06-14T13:20:00.000Z', channelName: 'général' }
            ]
          },
          {
            channelId: 'c3',
            channelName: 'aide-modération',
            count: 131,
            lastMessageAt: '2026-06-14T11:45:00.000Z',
            recentMessages: [
              { id: 'm8', content: 'Le salon vocal est calme pour l’instant.', dateIso: '2026-06-14T11:45:00.000Z', channelName: 'aide-modération' }
            ]
          }
        ],
        recentMessageCount: 4,
        recentLogCount: 3,
        connections: [],
        candidatures: [
          { id: 'cand4', status: 'APPROVED', notes: 'Candidature acceptée après entretien.', createdAt: '2025-02-20T00:00:00.000Z', oralResult: 'Validé' }
        ],
        linkedAccounts: [
          { userId: '827364827364', userTag: 'AidenAlt', type: 'Linked Account', status: 'PENDING' }
        ],
        isSuspectedDC: true,
        interactionGraph: {
          nodes: [
            { id: 'aiden', label: 'Aiden', type: 'user' },
            { id: 'lena', label: 'Lena', type: 'target' }
          ],
          edges: [
            { from: 'aiden', to: 'lena', type: 'mention', count: 12 }
          ]
        }
      };
    }
    data.dailyTrend = getDailyTrend(user, data.profile.messageCount, data.profile.voiceTimeSeconds);
    return data;
  });

  $effect(() => {
    // Sync interactive states on user change
    moderatorNoteInput = caseData.profile?.moderatorNote ?? '';
    noteFeedback = '';
    linkedAccountsList = [...caseData.linkedAccounts];
    sanctionsList = [...caseData.sanctions];
    viewingReportId = null;
  });

  const tabs = [
    { id: 'resume', label: 'Résumé', icon: 'layout' },
    { id: 'identite', label: 'Identité', icon: 'user' },
    { id: 'activite', label: 'Activité', icon: 'trending-up' },
    { id: 'analytics', label: 'Analytiques', icon: 'bar-chart-2' },
    { id: 'messages', label: 'Messages', icon: 'message-square' },
    { id: 'logs', label: 'Logs', icon: 'history' },
    { id: 'sanctions', label: 'Sanctions', icon: 'hammer' },
    { id: 'candidatures', label: 'Candidats', icon: 'user-check' },
    { id: 'invites', label: 'Invitations', icon: 'mail' },
    { id: 'notes', label: 'Notes', icon: 'edit-3' }
  ];

  function formatDateTime(value: string | null | undefined) {
    if (!value) return 'Inconnu';
    return new Date(value).toLocaleString('fr-FR');
  }

  function formatDateShort(value: string | null | undefined) {
    if (!value) return '—';
    return new Date(value).toLocaleDateString('fr-FR', { day: '2-digit', month: 'short', year: 'numeric' });
  }

  function formatDurationFromSeconds(seconds: number | null | undefined) {
    if (!seconds || seconds <= 0) return '0s';
    const totalSeconds = Math.floor(seconds);
    const days = Math.floor(totalSeconds / 86400);
    const hours = Math.floor((totalSeconds % 86400) / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const parts: string[] = [];
    if (days) parts.push(`${days}j`);
    if (hours) parts.push(`${hours}h`);
    if (minutes) parts.push(`${minutes}m`);
    if (parts.length === 0) parts.push(`${totalSeconds}s`);
    return parts.join(' ');
  }

  function formatRelative(value: string | null | undefined) {
    if (!value) return 'Jamais';
    const date = new Date(value);
    const now = new Date("2026-06-14T13:52:26+02:00");
    const diff = now.getTime() - date.getTime();
    const seconds = Math.floor(diff / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);

    if (seconds < 60) return "À l'instant";
    if (minutes < 60) return `Il y a ${minutes}m`;
    if (hours < 24) return `Il y a ${hours}h`;
    if (days < 7) return `Il y a ${days}j`;
    return date.toLocaleDateString('fr-FR', { day: '2-digit', month: 'short' });
  }

  function getDurationSince(value: string | null | undefined) {
    if (!value) return 'Inconnu';
    const start = new Date(value);
    const now = new Date("2026-06-14T13:52:26+02:00");
    let years = now.getFullYear() - start.getFullYear();
    let months = now.getMonth() - start.getMonth();
    
    if (months < 0) {
      years--;
      months += 12;
    }

    const parts: string[] = [];
    if (years > 0) parts.push(`${years} an${years > 1 ? 's' : ''}`);
    if (months > 0) parts.push(`${months} mois`);
    
    if (parts.length === 0) {
       const days = Math.floor((now.getTime() - start.getTime()) / 86400000);
       if (days <= 0) return "Auj.";
       return `${days} j`;
    }
    
    return parts.join(', ');
  }

  function getPresenceColor(status: string | null | undefined) {
    if (!status) return 'bg-slate-400';
    const s = status.toLowerCase();
    if (s === 'left') return 'bg-rose-500';
    if (s === 'online') return 'bg-emerald-500';
    if (s === 'idle') return 'bg-amber-500';
    if (s === 'dnd') return 'bg-red-500';
    return 'bg-slate-400';
  }

  function getPresenceLabel(status: string | null | undefined) {
    if (!status) return 'Hors ligne';
    const s = status.toLowerCase();
    if (s === 'left') return 'A quitté le serveur';
    if (s === 'online') return 'En ligne';
    if (s === 'idle') return 'Absent';
    if (s === 'dnd') return 'Ne pas déranger';
    return 'Hors ligne';
  }

  function getConnectionIcon(type: string) {
    const t = type.toLowerCase();
    if (t === 'youtube') return 'video';
    if (t === 'twitch') return 'tv';
    if (t === 'twitter' || t === 'x') return 'twitter';
    if (t === 'spotify') return 'music';
    if (t === 'github') return 'github';
    return 'link';
  }

  // Reactive SVG Line Chart calculations
  let dailyTrend: DailyTrendPoint[] = $derived(caseData?.dailyTrend || []);
  let maxMsg = $derived(Math.max(...dailyTrend.map(d => d.messages), 1));
  let maxVoc = $derived(Math.max(...dailyTrend.map(d => d.voiceMinutes), 1));

  function generatePath(values: number[], max: number, width = 760, height = 180) {
    if (values.length === 0) return '';
    const points = values.map((val, i) => {
      const x = (i / (values.length - 1)) * width;
      const y = height - 15 - (val / max) * (height - 30);
      return `${x},${y}`;
    });
    return `M ${points.join(' L ')}`;
  }

  function generateAreaPath(values: number[], max: number, width = 760, height = 180) {
    const p = generatePath(values, max, width, height);
    if (!p) return '';
    return `${p} L ${width},${height} L 0,${height} Z`;
  }
</script>

<div class="flex flex-col h-full w-full bg-surface-container-lowest text-on-surface font-body rounded-2xl overflow-hidden border border-outline-variant/10 shadow-lg select-none relative">
  
  <!-- Close button -->
  <button
    type="button"
    class="absolute top-4 right-4 z-50 flex h-9 w-9 items-center justify-center rounded-xl bg-black/25 text-white/80 backdrop-blur-lg transition-all hover:bg-black/40 hover:text-white hover:scale-110 active:scale-95 shadow-lg cursor-pointer"
    aria-label="Fermer"
  >
    <Papicon icon="x" size={18} />
  </button>

  <!-- ── Hero Section (Banner + Avatar + Username) ────────────────── -->
  <div class="relative overflow-hidden shrink-0" style="height: 165px;">
    {#if caseData.profile?.bannerUrl}
      <div class="absolute inset-0 bg-cover bg-center" style="background-image: url('{caseData.profile.bannerUrl}');"></div>
    {:else}
      <div class="absolute inset-0 bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500"></div>
    {/if}
    <div class="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-surface-container-lowest"></div>
  </div>

  <div class="relative z-10 flex items-end gap-5 px-6 pb-4 -mt-16 shrink-0">
    <div class="relative shrink-0">
      <div class="absolute -inset-1.5 rounded-3xl bg-white/20 blur-md animate-pulse"></div>
      <img
        src={caseData.profile?.avatarUrl}
        alt="Avatar"
        class="relative h-20 w-20 rounded-2xl border-4 border-surface-container-lowest object-cover shadow-2xl bg-surface-container-high"
      />
      <div class="absolute -bottom-1 -right-1 h-5 w-5 rounded-full border-3 border-surface-container-lowest {getPresenceColor(caseData.profile?.presenceStatus)}" title={getPresenceLabel(caseData.profile?.presenceStatus)}></div>
    </div>

    <div class="min-w-0 pb-1 flex-1 flex flex-col md:flex-row md:items-center justify-between gap-4">
      <div>
        <h3 class="text-2xl font-black text-on-surface tracking-tight truncate leading-none font-headline flex items-center gap-2">
          {caseData.profile?.displayName}
          {#if caseData.profile?.isBot}
            <span class="badge bg-primary/20 text-primary border border-primary/30 px-2 py-0.5 text-xs font-black uppercase">Bot</span>
          {/if}
        </h3>
        <div class="mt-1.5 flex flex-wrap items-center gap-2">
          <span class="text-sm font-semibold text-on-surface-variant/80">
            @{caseData.profile?.username}
          </span>
          {#if caseData.profile?.pronouns}
            <span class="badge bg-surface-container text-on-surface-variant px-2 py-0.5 text-xs font-bold">{caseData.profile.pronouns}</span>
          {/if}
          <span class="badge bg-surface-container text-on-surface-variant px-2 py-0.5 text-xs font-bold flex items-center gap-1">
            <span class="h-2 w-2 rounded-full {getPresenceColor(caseData.profile?.presenceStatus)}"></span>
            {getPresenceLabel(caseData.profile?.presenceStatus)}
          </span>
          {#if caseData.profile?.isTutor}
            <span class="badge bg-indigo-500/15 text-indigo-400 border border-indigo-500/30 px-2 py-0.5 text-xs font-black uppercase flex items-center gap-1">
              <Papicon icon="shield" size={11} />
              Tuteur
            </span>
          {/if}
          {#if caseData.profile?.staffGrade}
            <span class="badge bg-amber-500/15 text-amber-500 border border-amber-500/30 px-2 py-0.5 text-xs font-black uppercase flex items-center gap-1">
              <Papicon icon="star" size={11} />
              {caseData.profile.staffGrade}
            </span>
          {/if}
        </div>
      </div>
      
      {#if caseData.profile?.userId}
        <button
          type="button"
          class="inline-flex items-center gap-1.5 rounded-lg bg-white/15 backdrop-blur-md px-3 py-1.5 text-[10px] font-black text-white/80 uppercase tracking-widest transition-all hover:bg-white/25 hover:text-white hover:scale-[1.02] active:scale-[0.98] shadow-sm md:ml-auto cursor-pointer"
        >
          <Papicon icon="external-link" size={12} />
          Profil
        </button>
      {/if}
    </div>
  </div>

  <!-- ── Tab Navigation ────────────────── -->
  <div class="px-6 pt-3 pb-3 border-b border-outline-variant/5 shrink-0">
    <div class="tab-group flex gap-1 overflow-x-auto whitespace-nowrap scrollbar-none">
      {#each tabs as tab}
        <button
          type="button"
          onclick={() => {
            activeInnerTab = tab.id;
            viewingReportId = null;
            if (tab.id === 'analytics') {
              analyticsLoading = true;
              setTimeout(() => {
                analyticsLoading = false;
              }, 600);
            }
          }}
          class="tab-button flex items-center gap-2 px-4 py-2 text-xs font-bold rounded-lg transition-all {activeInnerTab === tab.id ? 'active' : ''}"
        >
          <Papicon icon={tab.icon} size={14} />
          <span>{tab.label}</span>
          {#if tab.id === 'messages'}
            {@const c = caseData.messagesByChannel.reduce((sum: number, c: { count: number }) => sum + c.count, 0)}
            {#if c > 0}
              <span class="flex h-5 min-w-5 items-center justify-center rounded-full text-[10px] font-black {activeInnerTab === tab.id ? 'bg-white/20 text-white' : 'bg-primary/10 text-primary'}">{c}</span>
            {/if}
          {:else if tab.id === 'logs'}
            {#if caseData.logs.length > 0}
              <span class="flex h-5 min-w-5 items-center justify-center rounded-full text-[10px] font-black {activeInnerTab === tab.id ? 'bg-white/20 text-white' : 'bg-primary/10 text-primary'}">{caseData.logs.length}</span>
            {/if}
          {:else if tab.id === 'sanctions'}
            {#if sanctionsList.length > 0}
              <span class="flex h-5 min-w-5 items-center justify-center rounded-full text-[10px] font-black {activeInnerTab === tab.id ? 'bg-white/20 text-white' : 'bg-primary/10 text-primary'}">{sanctionsList.length}</span>
            {/if}
          {:else if tab.id === 'candidatures'}
            {#if caseData.candidatures.length > 0}
              <span class="flex h-5 min-w-5 items-center justify-center rounded-full text-[10px] font-black {activeInnerTab === tab.id ? 'bg-white/20 text-white' : 'bg-primary/10 text-primary'}">{caseData.candidatures.length}</span>
            {/if}
          {/if}
        </button>
      {/each}
    </div>
  </div>

  <!-- ── Tab Content Area (Scrollable) ────────────────── -->
  <div class="flex-1 overflow-y-auto p-6 md:p-8 space-y-6">
    
    <!-- Suspected Alt warning -->
    {#if caseData.isSuspectedDC}
      <div class="rounded-4xl bg-rose-500/10 border-2 border-rose-500/20 p-6 flex items-center gap-6 animate-in zoom-in-95 duration-500">
        <div class="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-rose-500/20 text-rose-500 shadow-lg shadow-rose-500/20">
          <Papicon icon="alert-octagon" size={24} />
        </div>
        <div class="min-w-0 flex-1">
          <h4 class="text-sm font-black text-rose-600 uppercase tracking-widest">Suspicion de Double Compte</h4>
          <p class="text-xs font-bold text-rose-500/70 mt-1">Ce compte a été identifié comme un potentiel double compte automatique lors de son arrivée.</p>
        </div>
        <div class="flex gap-2">
          <span class="badge bg-rose-500/10 text-rose-500 border border-rose-500/20 px-2.5 py-1 text-xs uppercase font-black shrink-0">Suspect</span>
        </div>
      </div>
    {/if}

    {#if activeInnerTab === 'resume'}
      <!-- ── Tab: Résumé ── -->
      <div class="grid gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 animate-in fade-in duration-300">
        
        <!-- Account Identity Card (Bento Large) -->
        <div class="md:col-span-2 rounded-[2rem] bg-surface-container-low/50 p-6 border border-outline-variant/10 shadow-sm transition-all hover:shadow-md hover:bg-surface-container-low duration-500 group">
           <div class="flex items-center justify-between mb-6">
             <div class="flex items-center gap-3">
               <div class="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary group-hover:scale-105 transition-transform">
                 <Papicon icon="user" size={20} />
               </div>
               <div>
                 <p class="text-[10px] font-black uppercase tracking-[0.2em] text-primary">Informations Compte</p>
                 <p class="text-base font-black text-on-surface">Identité & Ancienneté</p>
               </div>
             </div>
           </div>

           <div class="grid grid-cols-2 gap-6">
             <div class="space-y-1">
               <p class="text-[10px] font-black uppercase tracking-widest text-on-surface-variant/40">Âge du compte</p>
               <p class="text-base font-black text-on-surface">{getDurationSince(caseData.profile?.accountCreatedAt)}</p>
               <p class="text-[10px] font-bold text-on-surface-variant/60">Créé le {formatDateShort(caseData.profile?.accountCreatedAt)}</p>
             </div>
             <div class="space-y-1">
               <p class="text-[10px] font-black uppercase tracking-widest text-on-surface-variant/40">Présence Serveur</p>
               <p class="text-base font-black text-on-surface">{getDurationSince(caseData.profile?.guildJoinedAt)}</p>
               <p class="text-[10px] font-bold text-on-surface-variant/60">Arrivé le {formatDateShort(caseData.profile?.guildJoinedAt)}</p>
             </div>
             <div class="space-y-1">
               <p class="text-[10px] font-black uppercase tracking-widest text-on-surface-variant/40">Invité par</p>
               {#if caseData.invite?.inviterTag}
                 <button
                   type="button"
                   class="flex items-center gap-2 hover:opacity-80 transition-opacity text-left focus:outline-hidden cursor-pointer"
                 >
                   {#if caseData.invite.inviterAvatarUrl}
                     <img
                       src={caseData.invite.inviterAvatarUrl}
                       alt={caseData.invite.inviterTag}
                       class="h-6 w-6 rounded-full object-cover border border-primary/10"
                     />
                   {:else}
                     <div class="h-6 w-6 rounded-full bg-primary/10 flex items-center justify-center text-[10px] font-bold text-primary">
                       {caseData.invite.inviterTag.slice(0, 1).toUpperCase()}
                     </div>
                   {/if}
                   <p class="text-sm font-black text-on-surface truncate">@{caseData.invite.inviterTag}</p>
                 </button>
               {:else}
                 <p class="text-sm font-bold text-on-surface-variant/40 italic">Origine inconnue</p>
               {/if}
             </div>
             <div class="space-y-1">
               <p class="text-[10px] font-black uppercase tracking-widest text-on-surface-variant/40">Code d'invitation</p>
               {#if caseData.invite?.code}
                 <button
                   type="button"
                   class="inline-block text-xs font-black text-primary bg-primary/10 px-2.5 py-0.5 rounded-lg border border-primary/10 hover:bg-primary/20 transition-colors cursor-pointer"
                 >
                   {caseData.invite.code}
                 </button>
               {:else}
                 <p class="text-sm font-black text-on-surface">—</p>
               {/if}
             </div>
           </div>
        </div>

        <!-- Sanctions Status Card -->
        <div class="rounded-[2rem] {sanctionsList.filter(s => s.status === 'ACTIVE').length > 0 ? 'bg-rose-500/5 border-rose-500/20' : 'bg-surface-container-low/50 border-outline-variant/10 shadow-sm'} p-6 border transition-all hover:shadow-md duration-500 group flex flex-col justify-between">
           <div class="flex items-center gap-3 mb-6">
             <div class="flex h-10 w-10 items-center justify-center rounded-xl {sanctionsList.filter(s => s.status === 'ACTIVE').length > 0 ? 'bg-rose-500/10 text-rose-500' : 'bg-amber-500/10 text-amber-500'} group-hover:rotate-12 transition-transform">
               <Papicon icon="hammer" size={20} />
             </div>
             <div>
               <p class="text-[10px] font-black uppercase tracking-[0.2em] {sanctionsList.filter(s => s.status === 'ACTIVE').length > 0 ? 'text-rose-500' : 'text-amber-500'}">Casier</p>
               <p class="text-base font-black text-on-surface">Sanctions</p>
             </div>
           </div>

           <div class="space-y-3">
             <div class="flex items-end justify-between">
                <span class="text-3xl font-black text-on-surface">{sanctionsList.length}</span>
                <span class="text-[10px] font-black uppercase tracking-widest text-on-surface-variant/40 pb-0.5">Total</span>
             </div>
             <div class="h-2 w-full rounded-full bg-on-surface/5 overflow-hidden">
                <div class="h-full bg-rose-500 transition-all duration-1000" style="width: {sanctionsList.length > 0 ? (sanctionsList.filter(s => s.status === 'ACTIVE').length / sanctionsList.length) * 100 : 0}%"></div>
             </div>
             <p class="text-xs font-bold {sanctionsList.filter(s => s.status === 'ACTIVE').length > 0 ? 'text-rose-500' : 'text-on-surface-variant/60'}">
                {sanctionsList.filter(s => s.status === 'ACTIVE').length} active(s)
             </p>
           </div>
        </div>

        <!-- Activity Summary Card -->
        <div class="rounded-[2rem] bg-surface-container-low/50 p-6 border border-outline-variant/10 shadow-sm transition-all hover:shadow-md duration-500 group flex flex-col justify-between">
           <div class="flex items-center gap-3 mb-6">
             <div class="flex h-10 w-10 items-center justify-center rounded-xl bg-secondary/10 text-secondary group-hover:scale-105 transition-transform">
               <Papicon icon="activity" size={20} />
             </div>
             <div>
               <p class="text-[10px] font-black uppercase tracking-[0.2em] text-secondary">Activité</p>
               <p class="text-base font-black text-on-surface">Engagement</p>
             </div>
           </div>

           <div class="grid grid-cols-1 gap-2.5">
             <div class="flex items-center justify-between text-xs">
               <span class="font-bold text-on-surface-variant/60">Messages</span>
               <span class="font-black text-on-surface">{caseData.profile?.messageCount?.toLocaleString('fr-FR') ?? 0}</span>
             </div>
             <div class="flex items-center justify-between text-xs">
               <span class="font-bold text-on-surface-variant/60">Vocal</span>
               <span class="font-black text-on-surface">{formatDurationFromSeconds(caseData.profile?.voiceTimeSeconds)}</span>
             </div>
             <div class="flex items-center justify-between text-xs">
               <span class="font-bold text-on-surface-variant/60">Dernier passage</span>
               <span class="font-black text-on-surface">{formatRelative(caseData.profile?.lastSeenAt)}</span>
             </div>
           </div>
        </div>

        <!-- Activity Chart (Bento Large) -->
        <div class="md:col-span-3 rounded-[2.5rem] bg-surface-container-low/30 p-6 border border-outline-variant/10 shadow-sm group">
          <div class="flex items-center justify-between mb-6">
             <div class="flex items-center gap-3">
               <div class="flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10 text-primary">
                 <Papicon icon="trending-up" size={22} />
               </div>
               <div>
                 <p class="text-[10px] font-black uppercase tracking-[0.25em] text-primary">Statistiques</p>
                 <h4 class="text-lg font-black text-on-surface font-headline">Tendance d'activité (30j)</h4>
               </div>
             </div>
             <div class="flex gap-4">
               <div class="flex flex-col items-end">
                 <p class="text-lg font-black text-primary leading-none">{caseData.profile?.messageCount.toLocaleString('fr-FR')}</p>
                 <p class="text-[9px] font-bold uppercase tracking-widest text-on-surface-variant/40 mt-1">Messages</p>
               </div>
               <div class="h-6 w-px bg-outline-variant/20 mx-1"></div>
               <div class="flex flex-col items-end">
                 <p class="text-lg font-black text-secondary leading-none">{Math.round((caseData.profile?.voiceTimeSeconds || 0) / 60)}m</p>
                 <p class="text-[9px] font-bold uppercase tracking-widest text-on-surface-variant/40 mt-1">Temps vocal</p>
               </div>
             </div>
          </div>
          <div class="h-[120px] w-full relative">
             <svg class="w-full h-full" viewBox="0 0 760 120" preserveAspectRatio="none">
               <defs>
                 <linearGradient id="gr-msg-resume" x1="0" y1="0" x2="0" y2="1">
                   <stop offset="0%" stop-color="#6366f1" stop-opacity="0.25"/>
                   <stop offset="100%" stop-color="#6366f1" stop-opacity="0"/>
                 </linearGradient>
                 <linearGradient id="gr-voc-resume" x1="0" y1="0" x2="0" y2="1">
                   <stop offset="0%" stop-color="#ec4899" stop-opacity="0.25"/>
                   <stop offset="100%" stop-color="#ec4899" stop-opacity="0"/>
                 </linearGradient>
               </defs>
               
               <!-- dashed grid lines -->
               <line x1="0" y1="30" x2="760" y2="30" stroke="var(--outline-variant)" stroke-opacity="0.1" stroke-dasharray="4" />
               <line x1="0" y1="60" x2="760" y2="60" stroke="var(--outline-variant)" stroke-opacity="0.1" stroke-dasharray="4" />
               <line x1="0" y1="90" x2="760" y2="90" stroke="var(--outline-variant)" stroke-opacity="0.1" stroke-dasharray="4" />
               
               <!-- Msg Path Area -->
               <path d={generateAreaPath(dailyTrend.map(d => d.messages), maxMsg, 760, 120)} fill="url(#gr-msg-resume)" />
               <!-- Voc Path Area -->
               <path d={generateAreaPath(dailyTrend.map(d => d.voiceMinutes), maxVoc, 760, 120)} fill="url(#gr-voc-resume)" />
               
               <!-- Line strokes -->
               <path d={generatePath(dailyTrend.map(d => d.messages), maxMsg, 760, 120)} fill="none" stroke="#6366f1" stroke-width="2" />
               <path d={generatePath(dailyTrend.map(d => d.voiceMinutes), maxVoc, 760, 120)} fill="none" stroke="#ec4899" stroke-width="2" />
             </svg>
             
             <!-- Dates on X Axis -->
             <div class="flex justify-between text-[9px] font-bold text-on-surface-variant/40 pt-1">
               <span>{dailyTrend[0]?.dateKey.slice(5)}</span>
               <span>{dailyTrend[7]?.dateKey.slice(5)}</span>
               <span>{dailyTrend[15]?.dateKey.slice(5)}</span>
               <span>{dailyTrend[22]?.dateKey.slice(5)}</span>
               <span>{dailyTrend[29]?.dateKey.slice(5)}</span>
             </div>
          </div>
        </div>

        <!-- Role & Permissions (Bento Side) -->
        <div class="rounded-[2rem] bg-surface-container-low/50 p-6 border border-outline-variant/10 shadow-sm transition-all hover:shadow-md duration-500 group overflow-hidden relative flex flex-col justify-between">
           <div class="absolute -right-6 -bottom-6 opacity-[0.03] rotate-12 pointer-events-none">
             <Papicon icon="shield" size={120} />
           </div>
           <div>
             <div class="flex items-center gap-3 mb-6">
               <div class="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-500/10 text-emerald-500 group-hover:scale-105 transition-transform">
                 <Papicon icon="shield" size={20} />
               </div>
               <div>
                 <p class="text-[10px] font-black uppercase tracking-[0.2em] text-emerald-500">Autorisations</p>
                 <p class="text-base font-black text-on-surface">Rôles & Accès</p>
               </div>
             </div>

             <div class="space-y-4">
               <div>
                 <p class="text-[9px] font-black uppercase tracking-widest text-on-surface-variant/40 mb-2">Rôles Principaux</p>
                 <div class="flex flex-wrap gap-1.5">
                   {#each caseData.roles.slice(0, 4) as role}
                     <span class="px-2.5 py-1 rounded-lg bg-surface-container-high text-[10px] font-bold text-on-surface border border-outline-variant/20 flex items-center gap-1.5">
                       {#if role.color && role.color !== '#000000'}
                         <span class="w-1.5 h-1.5 rounded-full shrink-0" style="background-color: {role.color}"></span>
                       {/if}
                       {role.name}
                     </span>
                   {/each}
                   {#if caseData.roles.length > 4}
                     <span class="px-2 py-1 rounded-lg bg-primary/10 text-[10px] font-black text-primary border border-primary/20">+{caseData.roles.length - 4}</span>
                   {/if}
                 </div>
               </div>
               <div>
                 <p class="text-[9px] font-black uppercase tracking-widest text-on-surface-variant/40 mb-2">Permissions Clés</p>
                 <div class="flex flex-wrap gap-x-3 gap-y-1">
                   {#each caseData.effectivePermissions.slice(0, 3) as perm}
                     <span class="text-[10px] font-black text-emerald-500 uppercase tracking-tighter flex items-center gap-1">
                       <Papicon icon="check_circle" size={10} /> {perm}
                     </span>
                   {/each}
                 </div>
               </div>
             </div>
           </div>
        </div>

        <!-- Recent Activity Feed (Wide Footer) -->
        <div class="md:col-span-4 rounded-[2.5rem] bg-surface-container-low/20 p-6 md:p-8 border border-outline-variant/10 group">
          <div class="flex items-center justify-between mb-6">
             <div class="flex items-center gap-3">
               <div class="flex h-11 w-11 items-center justify-center rounded-xl bg-on-surface/5 text-on-surface-variant">
                 <Papicon icon="history" size={22} />
               </div>
               <div>
                 <p class="text-[10px] font-black uppercase tracking-[0.25em] text-on-surface-variant/40">Timeline</p>
                 <h4 class="text-lg font-black text-on-surface font-headline">Activités récentes</h4>
               </div>
             </div>
             <button onclick={() => activeInnerTab = 'logs'} class="group/btn inline-flex items-center gap-1.5 rounded-xl bg-white px-4 py-2 text-xs font-black text-on-surface-variant uppercase tracking-widest border border-outline-variant/25 transition-all hover:bg-surface-container/20 hover:text-on-surface cursor-pointer">
               Voir tous les logs
               <Papicon icon="arrow_forward" size={12} class="group-hover/btn:translate-x-0.5 transition-transform" />
             </button>
          </div>

          <div class="grid gap-6 md:grid-cols-2">
            <div class="space-y-3">
               <p class="text-[10px] font-black uppercase tracking-[0.25em] text-primary px-1 mb-2">Derniers Messages</p>
               {#each caseData.messagesByChannel.slice(0, 3).flatMap((c: { recentMessages: any[] }) => c.recentMessages.slice(0, 1)) as msg}
                 <div class="rounded-2xl bg-surface-container-low/60 p-4 border border-outline-variant/5 transition-all hover:border-primary/20">
                    <div class="flex items-center justify-between mb-1.5 text-[10px]">
                       <span class="font-bold text-primary">#{msg.channelName}</span>
                       <span class="font-bold text-on-surface-variant/40">{formatRelative(msg.dateIso)}</span>
                    </div>
                    <p class="text-xs text-on-surface leading-relaxed italic">"{msg.content || 'Contenu vide'}"</p>
                 </div>
               {/each}
               {#if caseData.messagesByChannel.length === 0}
                 <p class="text-xs text-on-surface-variant/40 px-1">Aucun message récent détecté.</p>
               {/if}
            </div>

            <div class="space-y-3">
               <p class="text-[10px] font-black uppercase tracking-[0.25em] text-secondary px-1 mb-2">Derniers Logs</p>
               <div class="space-y-2 relative pl-4 border-l border-outline-variant/20 ml-2">
                 {#each caseData.logs.slice(0, 3) as log}
                   <div class="relative pb-3 text-xs">
                      <div class="absolute -left-[calc(1rem+4.5px)] top-1 h-2 w-2 rounded-full bg-secondary border-2 border-surface-container-lowest"></div>
                      <p class="font-black text-on-surface">{log.action}</p>
                      <p class="text-[10px] font-bold text-on-surface-variant/40 mt-0.5">{log.module} · {formatRelative(log.dateIso)}</p>
                   </div>
                 {/each}
               </div>
            </div>
          </div>
        </div>

        <!-- Profile Details & Visuels Card (Grid Layout at Bottom of Resume Tab) -->
        <div class="md:col-span-4 grid gap-6 md:grid-cols-2">
          <div class="rounded-[2rem] bg-surface-container-low/50 p-6 border border-outline-variant/10">
            <p class="text-[10px] font-black uppercase tracking-[0.2em] text-primary mb-6">Profil Discord</p>
            <dl class="space-y-4">
              <div class="flex items-center justify-between border-b border-outline-variant/5 pb-2">
                <dt class="text-xs font-bold text-on-surface-variant/60">Nom d'utilisateur</dt>
                <dd class="text-sm font-black text-on-surface">@{caseData.profile?.username ?? 'Inconnu'}</dd>
              </div>
              <div class="flex items-center justify-between border-b border-outline-variant/5 pb-2">
                <dt class="text-xs font-bold text-on-surface-variant/60">Nom global</dt>
                <dd class="text-sm font-black text-on-surface">{caseData.profile?.globalName ?? 'Inconnu'}</dd>
              </div>
              <div class="flex items-center justify-between border-b border-outline-variant/5 pb-2">
                <dt class="text-xs font-bold text-on-surface-variant/60">Affichage serveur</dt>
                <dd class="text-sm font-black text-on-surface">{caseData.profile?.displayName ?? 'Inconnu'}</dd>
              </div>
              <div class="flex items-center justify-between border-b border-outline-variant/5 pb-2">
                <dt class="text-xs font-bold text-on-surface-variant/60">Langue</dt>
                <dd class="text-sm font-black text-on-surface uppercase tracking-widest">{caseData.profile?.locale ?? 'Inconnue'}</dd>
              </div>
              <div class="flex items-center justify-between pb-1">
                <dt class="text-xs font-bold text-on-surface-variant/60">Pronoms</dt>
                <dd class="text-sm font-black text-on-surface">{caseData.profile?.pronouns ?? 'Non spécifiés'}</dd>
              </div>
            </dl>
          </div>
          
          <div class="rounded-[2rem] bg-surface-container-low/50 p-6 border border-outline-variant/10 space-y-6">
            <p class="text-[10px] font-black uppercase tracking-[0.2em] text-secondary mb-4">Visuels</p>
            {#if caseData.profile?.avatarUrl}
              <div class="flex items-center gap-4">
                <img src={caseData.profile?.avatarUrl} alt="Avatar" class="h-16 w-16 rounded-2xl object-cover shadow-lg border-2 border-surface-container-lowest" />
                <span class="text-xs font-bold text-on-surface-variant/60">Avatar personnalisé</span>
              </div>
            {/if}
            {#if caseData.profile?.bannerUrl}
              <div class="space-y-2">
                <span class="text-xs font-bold text-on-surface-variant/60 block">Bannière profil</span>
                <img src={caseData.profile?.bannerUrl} alt="Bannière" class="w-full h-24 rounded-2xl object-cover border border-outline-variant/10 shadow-xs" />
              </div>
            {/if}
          </div>
        </div>

      </div>

    {:else if activeInnerTab === 'identite'}
      <!-- ── Tab: Identité ── -->
      <div class="space-y-6 animate-in fade-in duration-300">
        
        <!-- Profil Complet Card -->
        <div class="rounded-[2rem] bg-surface-container-low/50 p-6 border border-outline-variant/10 shadow-sm space-y-4">
          <div class="flex items-center gap-3">
            <div class="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
              <Papicon icon="user" size={20} />
            </div>
            <div>
              <p class="text-[10px] font-black uppercase tracking-wider text-primary leading-none">Données Compte</p>
              <h4 class="text-base font-black text-on-surface mt-1">Profil Complet</h4>
            </div>
          </div>
          
          <div class="grid grid-cols-2 gap-4 text-xs md:text-sm">
            <div>
              <p class="text-[10px] text-on-surface-variant/40 font-black uppercase leading-none">ID Discord</p>
              <p class="font-black text-on-surface mt-1.5 font-mono select-all">{caseData.profile?.userId}</p>
            </div>
            <div>
              <p class="text-[10px] text-on-surface-variant/40 font-black uppercase leading-none">Nom d'utilisateur</p>
              <p class="font-black text-on-surface mt-1.5">@{caseData.profile?.username}</p>
            </div>
            <div>
              <p class="text-[10px] text-on-surface-variant/40 font-black uppercase leading-none">Nom global</p>
              <p class="font-black text-on-surface mt-1.5">{caseData.profile?.globalName}</p>
            </div>
            <div>
              <p class="text-[10px] text-on-surface-variant/40 font-black uppercase leading-none">Surnom Serveur</p>
              <p class="font-black text-on-surface mt-1.5">{caseData.profile?.displayName}</p>
            </div>
            <div>
              <p class="text-[10px] text-on-surface-variant/40 font-black uppercase leading-none">Langue (Locale)</p>
              <p class="font-black text-on-surface mt-1.5 uppercase">{caseData.profile?.locale || 'fr'}</p>
            </div>
            <div>
              <p class="text-[10px] text-on-surface-variant/40 font-black uppercase leading-none">Pronoms</p>
              <p class="font-black text-on-surface mt-1.5">{caseData.profile?.pronouns || 'Non spécifiés'}</p>
            </div>
          </div>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          
          <!-- Conditional Statut Staff Card -->
          {#if caseData.profile?.staffGrade}
            <div class="rounded-[2rem] bg-surface-container-low/50 p-6 border border-outline-variant/10 shadow-sm space-y-4">
              <div class="flex items-center gap-3">
                <div class="flex h-10 w-10 items-center justify-center rounded-xl bg-amber-500/10 text-amber-500">
                  <Papicon icon="star" size={20} />
                </div>
                <div>
                  <p class="text-[10px] font-black uppercase tracking-wider text-amber-500 leading-none">Administration</p>
                  <h4 class="text-base font-black text-on-surface mt-1">Statut Staff</h4>
                </div>
              </div>
              <div class="space-y-2.5 text-xs">
                <div class="flex justify-between border-b border-outline-variant/5 pb-2">
                  <span class="text-on-surface-variant/50 font-bold">Grade Actuel:</span>
                  <span class="font-black text-on-surface">{caseData.profile.staffGrade}</span>
                </div>
                <div class="flex justify-between">
                  <span class="text-on-surface-variant/50 font-bold">Statut Tuteur:</span>
                  <span class="font-black text-on-surface">{caseData.profile.isTutor ? "Oui (Actif)" : "Non"}</span>
                </div>
              </div>
            </div>
          {/if}

          <!-- Dates Clés Card -->
          <div class="rounded-[2rem] bg-surface-container-low/50 p-6 border border-outline-variant/10 shadow-sm space-y-4">
            <div class="flex items-center gap-3">
              <div class="flex h-10 w-10 items-center justify-center rounded-xl bg-secondary/10 text-secondary">
                <Papicon icon="calendar" size={20} />
              </div>
              <div>
                <p class="text-[10px] font-black uppercase tracking-wider text-secondary leading-none">Chronologie</p>
                <h4 class="text-base font-black text-on-surface mt-1">Dates Clés</h4>
              </div>
            </div>
            <div class="space-y-2.5 text-xs">
              <div class="flex justify-between border-b border-outline-variant/5 pb-1.5">
                <span class="text-on-surface-variant/50">Création compte:</span>
                <span class="font-bold text-on-surface">{formatDateShort(caseData.profile?.accountCreatedAt)}</span>
              </div>
              <div class="flex justify-between border-b border-outline-variant/5 pb-1.5">
                <span class="text-on-surface-variant/50">Arrivée serveur:</span>
                <span class="font-bold text-on-surface">{formatDateShort(caseData.profile?.guildJoinedAt)}</span>
              </div>
              {#if caseData.profile?.guildLeftAt}
                <div class="flex justify-between border-b border-outline-variant/5 pb-1.5 text-rose-500 font-bold">
                  <span>Dernier départ:</span>
                  <span>{formatDateShort(caseData.profile.guildLeftAt)}</span>
                </div>
              {/if}
              <div class="flex justify-between border-b border-outline-variant/5 pb-1.5">
                <span class="text-on-surface-variant/50">Première observation:</span>
                <span class="font-bold text-on-surface">{formatDateShort(caseData.profile?.firstSeenAt)}</span>
              </div>
              <div class="flex justify-between">
                <span class="text-on-surface-variant/50">Dernière observation:</span>
                <span class="font-bold text-on-surface">{formatDateShort(caseData.profile?.lastSeenAt)}</span>
              </div>
            </div>
          </div>

          <!-- Rôles Card -->
          <div class="rounded-[2rem] bg-surface-container-low/50 p-6 border border-outline-variant/10 shadow-sm space-y-4">
            <div class="flex items-center gap-3">
              <div class="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-500/10 text-emerald-500">
                <Papicon icon="shield" size={20} />
              </div>
              <div>
                <p class="text-[10px] font-black uppercase tracking-wider text-emerald-500 leading-none">Autorisations</p>
                <h4 class="text-base font-black text-on-surface mt-1">Rôles ({caseData.roles.length})</h4>
              </div>
            </div>
            <div class="flex flex-wrap gap-2">
              {#each caseData.roles as r}
                <span class="px-2.5 py-1 rounded-lg bg-surface-container text-xs font-bold flex items-center gap-1.5 border border-outline-variant/5">
                  {#if r.color}
                    <span class="size-2 rounded-full" style="background-color: {r.color}"></span>
                  {/if}
                  {r.name}
                </span>
              {/each}
              {#if caseData.roles.length === 0}
                <p class="text-xs text-on-surface-variant/40 italic">Aucun rôle attribué</p>
              {/if}
            </div>
          </div>

        </div>
      </div>

    {:else if activeInnerTab === 'activite'}
      <!-- ── Tab: Activité ── -->
      <div class="space-y-8 animate-in fade-in duration-300">
        <div class="grid gap-6 md:grid-cols-3">
          <div class="rounded-4xl bg-primary/5 p-6 border border-primary/10 text-center">
            <div class="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary mx-auto mb-4">
              <Papicon icon="message-square" size={20} />
            </div>
            <p class="text-2xl font-black text-on-surface">{caseData.profile?.messageCount ?? 0}</p>
            <p class="text-[9px] font-black uppercase tracking-widest text-primary/60 mt-1">Messages</p>
          </div>
          <div class="rounded-4xl bg-secondary/5 p-6 border border-secondary/10 text-center">
            <div class="flex h-10 w-10 items-center justify-center rounded-xl bg-secondary/10 text-secondary mx-auto mb-4">
              <Papicon icon="mic" size={20} />
            </div>
            <p class="text-2xl font-black text-on-surface">{formatDurationFromSeconds(caseData.profile?.voiceTimeSeconds)}</p>
            <p class="text-[9px] font-black uppercase tracking-widest text-secondary/60 mt-1">Temps vocal</p>
          </div>
          <div class="rounded-4xl bg-emerald-500/5 p-6 border border-emerald-500/10 text-center">
            <div class="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-500/10 text-emerald-500 mx-auto mb-4">
              <Papicon icon="eye" size={20} />
            </div>
            <p class="text-lg font-black text-on-surface">{formatDateShort(caseData.profile?.lastSeenAt)}</p>
            <p class="text-[9px] font-black uppercase tracking-widest text-emerald-500/60 mt-1">Dernière activité</p>
          </div>
        </div>

        <div class="rounded-[2.5rem] bg-surface-container-low/50 p-8 border border-outline-variant/10">
          <p class="text-[10px] font-black uppercase tracking-[0.2em] text-primary mb-8 px-2">Répartition par salon</p>
          <div class="space-y-6">
            {#each caseData.messagesByChannel || [] as channel}
              {@const max = Math.max(...(caseData.messagesByChannel || []).map((c: { count: number }) => c.count), 1)}
              <div class="space-y-2">
                <div class="flex items-center justify-between px-1">
                  <span class="text-sm font-black text-on-surface">#{channel.channelName}</span>
                  <span class="text-xs font-bold text-on-surface-variant/60">{channel.count} messages</span>
                </div>
                <div class="h-2 w-full rounded-full bg-surface-container-high overflow-hidden">
                  <div class="h-full bg-gradient-to-r from-primary to-secondary transition-all duration-1000" style="width: {(channel.count / max) * 100}%"></div>
                </div>
              </div>
            {/each}
          </div>
        </div>
      </div>

    {:else if activeInnerTab === 'analytics'}
      <!-- ── Tab: Analytiques ── -->
      <div class="space-y-8 animate-in fade-in duration-300">
        {#if analyticsLoading}
          <div class="flex flex-col items-center justify-center py-24 bg-surface-container-low/30 rounded-[3rem] border border-outline-variant/10">
            <div class="relative mb-6">
              <div class="absolute -inset-4 rounded-full bg-primary/10 blur-xl animate-pulse"></div>
              <Papicon icon="loader" size={48} class="animate-spin text-primary" />
            </div>
            <p class="text-xs font-black uppercase tracking-[0.3em] text-on-surface-variant/60">Analyse du comportement...</p>
          </div>
        {:else if dailyTrend && dailyTrend.length > 0 && (caseData.profile?.messageCount > 0 || caseData.profile?.voiceTimeSeconds > 0)}
          <div class="grid gap-6 lg:grid-cols-2">
             <div class="rounded-[2.5rem] bg-surface-container-low/50 p-8 border border-outline-variant/10 shadow-sm group">
               <div class="flex items-center justify-between mb-8">
                  <div>
                    <p class="text-[10px] font-black uppercase tracking-widest text-primary mb-1">Activité</p>
                    <h4 class="text-sm font-black text-on-surface uppercase tracking-widest font-headline">Volume Messages</h4>
                  </div>
                  <span class="text-[10px] font-bold text-on-surface-variant/40 bg-surface-container-high px-3 py-1 rounded-lg">30 derniers jours</span>
               </div>
               <div class="h-[180px] w-full relative">
                 <svg class="w-full h-full" viewBox="0 0 360 180" preserveAspectRatio="none">
                   <defs>
                     <linearGradient id="gr-msg-analytics" x1="0" y1="0" x2="0" y2="1">
                       <stop offset="0%" stop-color="#6366f1" stop-opacity="0.2"/>
                       <stop offset="100%" stop-color="#6366f1" stop-opacity="0"/>
                     </linearGradient>
                   </defs>
                   <line x1="0" y1="45" x2="360" y2="45" stroke="var(--outline-variant)" stroke-opacity="0.1" stroke-dasharray="4" />
                   <line x1="0" y1="90" x2="360" y2="90" stroke="var(--outline-variant)" stroke-opacity="0.1" stroke-dasharray="4" />
                   <line x1="0" y1="135" x2="360" y2="135" stroke="var(--outline-variant)" stroke-opacity="0.1" stroke-dasharray="4" />
                   
                   <path d={generateAreaPath(dailyTrend.map(d => d.messages), maxMsg, 360, 180)} fill="url(#gr-msg-analytics)" />
                   <path d={generatePath(dailyTrend.map(d => d.messages), maxMsg, 360, 180)} fill="none" stroke="#6366f1" stroke-width="2" />
                 </svg>
                 <div class="flex justify-between text-[8px] font-bold text-on-surface-variant/40 pt-1">
                   <span>{dailyTrend[0]?.dateKey.slice(5)}</span>
                   <span>{dailyTrend[15]?.dateKey.slice(5)}</span>
                   <span>{dailyTrend[29]?.dateKey.slice(5)}</span>
                 </div>
               </div>
             </div>

             <div class="rounded-[2.5rem] bg-surface-container-low/50 p-8 border border-outline-variant/10 shadow-sm group">
               <div class="flex items-center justify-between mb-8">
                  <div>
                    <p class="text-[10px] font-black uppercase tracking-widest text-secondary mb-1">Engagement</p>
                    <h4 class="text-sm font-black text-on-surface uppercase tracking-widest font-headline">Activité Vocal</h4>
                  </div>
                  <span class="text-[10px] font-bold text-on-surface-variant/40 bg-surface-container-high px-3 py-1 rounded-lg">Minutes / jour</span>
               </div>
               <div class="h-[180px] w-full relative">
                 <svg class="w-full h-full" viewBox="0 0 360 180" preserveAspectRatio="none">
                   <defs>
                     <linearGradient id="gr-voc-analytics" x1="0" y1="0" x2="0" y2="1">
                       <stop offset="0%" stop-color="#ec4899" stop-opacity="0.2"/>
                       <stop offset="100%" stop-color="#ec4899" stop-opacity="0"/>
                     </linearGradient>
                   </defs>
                   <line x1="0" y1="45" x2="360" y2="45" stroke="var(--outline-variant)" stroke-opacity="0.1" stroke-dasharray="4" />
                   <line x1="0" y1="90" x2="360" y2="90" stroke="var(--outline-variant)" stroke-opacity="0.1" stroke-dasharray="4" />
                   <line x1="0" y1="135" x2="360" y2="135" stroke="var(--outline-variant)" stroke-opacity="0.1" stroke-dasharray="4" />
                   
                   <path d={generateAreaPath(dailyTrend.map(d => d.voiceMinutes), maxVoc, 360, 180)} fill="url(#gr-voc-analytics)" />
                   <path d={generatePath(dailyTrend.map(d => d.voiceMinutes), maxVoc, 360, 180)} fill="none" stroke="#ec4899" stroke-width="2" />
                 </svg>
                 <div class="flex justify-between text-[8px] font-bold text-on-surface-variant/40 pt-1">
                   <span>{dailyTrend[0]?.dateKey.slice(5)}</span>
                   <span>{dailyTrend[15]?.dateKey.slice(5)}</span>
                   <span>{dailyTrend[29]?.dateKey.slice(5)}</span>
                 </div>
               </div>
             </div>
          </div>
        {:else}
          <div class="flex flex-col items-center justify-center py-24 text-center bg-surface-container-low/30 rounded-[3rem] border border-outline-variant/10">
            <div class="flex h-20 w-20 items-center justify-center rounded-3xl bg-surface-container-high text-on-surface-variant/20 mb-8">
              <Papicon icon="bar-chart-2" size={40} />
            </div>
            <h3 class="text-2xl font-black text-on-surface-variant font-headline">Aucune donnée analytique</h3>
            <p class="mt-2 text-sm text-on-surface-variant/60 max-w-sm mx-auto px-6">
              Nous n'avons pas encore assez de données d'activité pour générer des graphiques pour ce membre sur les 30 derniers jours.
            </p>
          </div>
        {/if}
      </div>

    {:else if activeInnerTab === 'messages'}
      <!-- ── Tab: Messages ── -->
      <div class="space-y-6 animate-in fade-in duration-300">
        {#each caseData.messagesByChannel as channel}
          <div class="rounded-4xl bg-surface-container-low/50 p-6 border border-outline-variant/10">
            <div class="flex items-center gap-3 mb-6 border-b border-outline-variant/10 pb-4">
              <div class="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10 text-primary">
                <Papicon icon="tag" size={16} />
              </div>
              <a 
                href="https://discord.com/channels/123456789012345678/{channel.channelId}" 
                target="_blank"
                class="text-sm font-black text-on-surface hover:text-primary transition-colors flex items-center gap-1.5"
              >
                {channel.channelName}
                <Papicon icon="external-link" size={12} class="opacity-30" />
              </a>
              <span class="ml-auto text-[10px] font-black bg-primary/5 text-primary px-3 py-1 rounded-full uppercase tracking-widest">{channel.count} msg</span>
            </div>
            <div class="space-y-3">
              {#each channel.recentMessages as msg}
                <div class="rounded-2xl bg-surface-container-high/30 p-4 border border-outline-variant/5">
                  <div class="flex items-center justify-between mb-2">
                     <span class="text-[10px] font-bold text-on-surface-variant/40">{formatDateTime(msg.dateIso)}</span>
                     <a href="https://discord.com/channels/123456789012345678/{channel.channelId}/{msg.id}" target="_blank" class="text-[9px] font-black text-primary hover:underline uppercase tracking-widest flex items-center gap-1">
                       Voir sur Discord
                       <Papicon icon="arrow-up-right" size={10} />
                     </a>
                  </div>
                  <p class="text-sm text-on-surface leading-relaxed">{@html msg.content || 'Contenu vide'}</p>
                </div>
              {/each}
            </div>
          </div>
        {/each}
        {#if caseData.messagesByChannel.length === 0}
          <div class="flex flex-col items-center justify-center py-24 text-center bg-surface-container-low/30 rounded-[3rem] border-2 border-dashed border-outline-variant/20">
            <div class="flex h-20 w-20 items-center justify-center rounded-3xl bg-surface-container-high text-on-surface-variant/20 mb-8">
              <Papicon icon="message-square" size={40} />
            </div>
            <h3 class="text-2xl font-black text-on-surface-variant font-headline">Silence radio</h3>
            <p class="mt-2 text-sm text-on-surface-variant/60 max-w-sm mx-auto px-6">
              Aucun message récent n'a été indexé pour ce membre dans les salons surveillés.
            </p>
          </div>
        {/if}
      </div>

    {:else if activeInnerTab === 'logs'}
      <!-- ── Tab: Logs ── -->
      <div class="animate-in fade-in duration-300">
        <div class="rounded-[2.5rem] bg-surface-container-low/50 p-8 border border-outline-variant/10">
          <div class="space-y-8 relative pl-6 border-l-2 border-outline-variant/20 ml-4">
            {#each caseData.logs as log}
              <div class="relative">
                <div class="absolute -left-[calc(1.5rem+5px)] top-1.5 h-3 w-3 rounded-full bg-primary border-2 border-surface shadow-sm"></div>
                <div class="flex items-start justify-between gap-4 mb-2">
                  <div>
                    <p class="text-sm font-black text-on-surface tracking-tight">{log.action}</p>
                    <p class="text-[10px] font-bold uppercase tracking-widest text-on-surface-variant/40 mt-1">{log.module} · {log.source}</p>
                  </div>
                  <span class="text-[10px] font-black text-on-surface-variant/30 uppercase tracking-widest">{formatDateTime(log.dateIso)}</span>
                </div>
                <div class="rounded-2xl bg-surface-container-high/30 p-4 text-xs text-on-surface-variant/80 italic leading-relaxed">
                  {@html log.details}
                </div>
              </div>
            {/each}
            {#if caseData.logs.length === 0}
              <div class="flex flex-col items-center justify-center py-10 text-on-surface-variant/20">
                 <Papicon icon="history" size={48} />
                 <p class="mt-4 text-sm font-black uppercase tracking-widest">Aucun log disponible</p>
              </div>
            {/if}
          </div>
        </div>
      </div>

    {:else if activeInnerTab === 'sanctions'}
      <!-- ── Tab: Sanctions ── -->
      <div class="animate-in fade-in duration-300">
        <div class="rounded-[2rem] bg-surface-container-low/50 border border-outline-variant/10 shadow-sm overflow-hidden">
          <table class="w-full text-left text-xs border-collapse">
            <thead>
              <tr class="bg-surface-container-high/30 border-b border-outline-variant/10 text-[10px] font-black uppercase text-on-surface-variant/40">
                <th class="p-4">Date</th>
                <th class="p-4">Action</th>
                <th class="p-4">Statut</th>
                <th class="p-4">Raison</th>
                <th class="p-4 text-right">Rapport</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-outline-variant/10">
              {#each sanctionsList as s}
                <tr class="hover:bg-surface-container/30 transition-colors">
                  <td class="p-4 font-bold text-on-surface-variant/60">{formatDateShort(s.createdAt)}</td>
                  <td class="p-4">
                    <span class="font-black text-rose-500 uppercase">{s.type}</span>
                    <p class="text-[9px] text-on-surface-variant/40 leading-none mt-1">@{s.moderatorTag}</p>
                  </td>
                  <td class="p-4">
                    <span class="px-2 py-0.5 rounded text-[10px] font-black uppercase {s.status === 'ACTIVE' ? 'bg-rose-500/10 text-rose-500' : 'bg-emerald-500/10 text-emerald-500'}">
                      {s.status === 'ACTIVE' ? 'Active' : 'Résolue'}
                    </span>
                  </td>
                  <td class="p-4 text-on-surface-variant truncate max-w-[120px]">{s.reason}</td>
                  <td class="p-4 text-right">
                    <button
                      type="button"
                      onclick={() => viewingReportId = s.id}
                      class="bg-primary text-white text-[10px] font-black uppercase px-3 py-1.5 rounded-lg hover:bg-primary/95 transition-colors cursor-pointer flex items-center gap-1.5 ml-auto"
                    >
                      <Papicon icon="file-text" size={10} /> Voir plus
                    </button>
                  </td>
                </tr>
              {/each}
            </tbody>
          </table>
          {#if sanctionsList.length === 0}
            <div class="p-8 text-center text-on-surface-variant/30 flex flex-col items-center justify-center">
              <Papicon icon="check-circle" size={32} class="text-on-surface-variant/20" />
              <p class="text-[10px] font-black uppercase tracking-wider mt-2.5">Dossier vierge</p>
            </div>
          {/if}
        </div>
      </div>

    {:else if activeInnerTab === 'candidatures'}
      <!-- ── Tab: Candidats ── -->
      <div class="space-y-4 animate-in fade-in duration-300">
        {#each caseData.candidatures as cand}
          <div class="rounded-[2rem] bg-surface-container-low/50 p-5 border border-outline-variant/10 shadow-xs space-y-3 text-xs">
            <div class="flex justify-between items-center">
              <div>
                <span class="text-[10px] font-black text-on-surface-variant/40 uppercase block leading-none mb-1">{formatDateShort(cand.createdAt)}</span>
                <span class="px-2.5 py-0.5 rounded-lg text-xs font-black uppercase {cand.status === 'APPROVED' ? 'bg-emerald-500/10 text-emerald-500 border border-emerald-500/20' : 'bg-rose-500/10 text-rose-500 border border-rose-500/20'}">
                  {cand.status === 'APPROVED' ? 'Acceptée' : 'Rejetée'}
                </span>
              </div>
              {#if cand.oralResult}
                <div class="text-right">
                  <span class="text-[10px] text-on-surface-variant/40 font-bold uppercase block leading-none mb-1">Résultat Oral</span>
                  <span class="font-black text-on-surface text-xs md:text-sm">{cand.oralResult}</span>
                </div>
              {/if}
            </div>
            <div class="rounded-xl bg-surface-container-high/20 p-4 text-on-surface-variant italic leading-normal border border-outline-variant/5">
              "{cand.notes}"
            </div>
          </div>
        {/each}
        {#if caseData.candidatures.length === 0}
          <div class="p-8 text-center text-on-surface-variant/30 flex flex-col items-center justify-center">
            <Papicon icon="user-check" size={32} class="text-on-surface-variant/20" />
            <p class="text-[10px] font-black uppercase tracking-wider mt-2.5">Aucune candidature archivée</p>
          </div>
        {/if}
      </div>

    {:else if activeInnerTab === 'invites'}
      <!-- ── Tab: Invitations ── -->
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6 animate-in fade-in duration-300">
        
        <!-- Source d'invitation Card -->
        <div class="rounded-[2rem] bg-surface-container-low/50 p-5 border border-outline-variant/10 shadow-sm space-y-3">
          <p class="text-[10px] font-black uppercase tracking-wider text-primary">Source d'invitation</p>
          <div class="space-y-2 text-xs">
            <div class="flex justify-between items-center">
              <span class="text-on-surface-variant/50 font-bold">Code utilisé:</span>
              {#if caseData.invite.code}
                <button
                  type="button"
                  class="font-black text-primary bg-primary/10 px-2.5 py-0.5 rounded-lg text-xs font-mono border border-primary/10 hover:bg-primary/20 transition-colors cursor-pointer"
                >
                  {caseData.invite.code}
                </button>
              {:else}
                <span class="font-bold text-on-surface-variant/40">Inconnu</span>
              {/if}
            </div>
            <div class="flex justify-between items-center">
              <span class="text-on-surface-variant/50 font-bold">Créateur:</span>
              {#if caseData.invite.inviterTag}
                <button
                  type="button"
                  class="flex items-center gap-1.5 hover:opacity-80 transition-opacity cursor-pointer focus:outline-hidden text-left"
                >
                  {#if caseData.invite.inviterAvatarUrl}
                    <img src={caseData.invite.inviterAvatarUrl} alt="" class="w-5 h-5 rounded-full object-cover" />
                  {/if}
                  <span class="font-black text-on-surface">@{caseData.invite.inviterTag}</span>
                </button>
              {:else}
                <span class="font-bold text-on-surface-variant/40">Inconnu</span>
              {/if}
            </div>
            <div class="flex justify-between items-center">
              <span class="text-on-surface-variant/50">Date d'utilisation:</span>
              <span class="font-bold text-on-surface">{formatDateTime(caseData.invite.joinedAt)}</span>
            </div>
          </div>
        </div>

        <!-- Mouvements Serveur Card -->
        <div class="rounded-[2rem] bg-surface-container-low/50 p-5 border border-outline-variant/10 shadow-sm space-y-3">
          <p class="text-[10px] font-black uppercase tracking-wider text-secondary">Mouvements Serveur</p>
          <div class="space-y-2 text-xs">
            <div class="flex justify-between">
              <span class="text-on-surface-variant/50">Première observation:</span>
              <span class="font-bold text-on-surface">{formatDateTime(caseData.profile?.firstSeenAt)}</span>
            </div>
            <div class="flex justify-between">
              <span class="text-on-surface-variant/50 font-bold">Dernière arrivée:</span>
              <span class="font-bold text-on-surface">{formatDateShort(caseData.profile?.guildJoinedAt)}</span>
            </div>
            <div class="flex justify-between">
              <span class="text-on-surface-variant/50 font-bold">Dernier départ:</span>
              <span class="font-bold text-on-surface">{caseData.profile?.guildLeftAt ? formatDateShort(caseData.profile.guildLeftAt) : 'Aucun'}</span>
            </div>
            <div class="flex justify-between">
              <span class="text-on-surface-variant/50">Dernière observation:</span>
              <span class="font-bold text-on-surface">{formatDateTime(caseData.profile?.lastSeenAt)}</span>
            </div>
          </div>
        </div>
      </div>

    {:else if activeInnerTab === 'notes'}
      <!-- ── Tab: Notes ── -->
      <div class="rounded-[2rem] bg-surface-container-low/50 p-6 border border-outline-variant/10 shadow-sm space-y-4 animate-in fade-in duration-300">
        <div class="flex items-center gap-3">
          <div class="flex h-9 w-9 items-center justify-center rounded-xl bg-primary/10 text-primary">
            <Papicon icon="edit-3" size={16} />
          </div>
          <div>
            <p class="text-[10px] font-black uppercase text-primary leading-none">Modération</p>
            <h4 class="text-xs font-black text-on-surface mt-1">Notes Modérateur</h4>
          </div>
        </div>
        
        <p class="text-xs text-on-surface-variant/65">
          Ces notes sont strictement confidentielles et ne sont visibles que par l'équipe d'administration et de modération.
        </p>

        <div class="relative">
          <textarea 
            id="moderator-note-textarea"
            bind:value={moderatorNoteInput}
            placeholder="Ajouter des notes internes sur ce membre..."
            rows="4"
            class="w-full rounded-xl bg-surface-container-high/60 p-4 text-xs text-on-surface border border-outline-variant/10 focus:border-primary/50 outline-hidden resize-none leading-relaxed"
          ></textarea>
        </div>
        {#if noteFeedback}
          <p class="text-xs font-bold text-emerald-400 leading-none">{noteFeedback}</p>
        {/if}
        <div class="flex justify-end">
          <button
            type="button"
            onclick={async () => {
              noteBusy = true;
              noteFeedback = '';
              await new Promise(r => setTimeout(r, 400));
              noteBusy = false;
              noteFeedback = 'Note enregistrée avec succès.';
            }}
            class="bg-primary text-white text-xs font-black uppercase px-4 py-2 rounded-lg hover:bg-primary/95 transition-colors cursor-pointer flex items-center gap-1.5"
            disabled={noteBusy}
          >
            <Papicon icon="check_circle" size={12} />
            {noteBusy ? 'Enregistrement...' : 'Sauvegarder'}
          </button>
        </div>
      </div>
    {/if}

  </div>

  <!-- Detailed Sanction Report sub-modal overlay -->
  {#if viewingReportId}
    {@const selectedSanction = sanctionsList.find(s => s.id === viewingReportId)}
    {#if selectedSanction}
      <div class="absolute inset-0 bg-black/40 backdrop-blur-xs z-50 flex items-center justify-center p-6 animate-in fade-in duration-300">
        <div class="w-full max-w-2xl bg-surface-container-lowest rounded-[2rem] border border-outline-variant/10 p-6 shadow-2xl space-y-4 text-xs md:text-sm animate-in zoom-in-95 duration-300 relative">
          <!-- Close button -->
          <button 
            type="button"
            onclick={() => viewingReportId = null}
            class="absolute top-4 right-4 flex h-8 w-8 items-center justify-center rounded-xl bg-on-surface/5 text-on-surface-variant hover:bg-on-surface/10 hover:text-on-surface transition-colors cursor-pointer"
          >
            <Papicon icon="x" size={16} />
          </button>
          
          <div class="flex items-center gap-3 border-b border-outline-variant/10 pb-3">
            <div class="flex h-10 w-10 items-center justify-center rounded-xl bg-rose-500/10 text-rose-500">
              <Papicon icon="hammer" size={20} />
            </div>
            <div>
              <p class="text-[10px] font-black uppercase tracking-wider text-rose-500">Rapport de Sanction</p>
              <h4 class="text-base font-black text-on-surface">Sanction #{selectedSanction.id} · {selectedSanction.type}</h4>
            </div>
          </div>

          <div class="grid grid-cols-2 gap-4">
            <div>
              <p class="text-[10px] text-on-surface-variant/40 font-bold uppercase leading-none">Date de l'incident</p>
              <p class="font-black mt-1.5">{formatDateTime(selectedSanction.createdAt)}</p>
            </div>
            <div>
              <p class="text-[10px] text-on-surface-variant/40 font-bold uppercase leading-none">Modérateur référent</p>
              <p class="font-black mt-1.5">@{selectedSanction.moderatorTag}</p>
            </div>
          </div>
          
          <div class="space-y-1">
            <p class="text-[10px] text-on-surface-variant/40 font-bold uppercase leading-none">Règles enfreintes</p>
            <span class="inline-block bg-rose-500/10 text-rose-500 border border-rose-500/20 rounded-lg px-2.5 py-0.5 text-xs font-bold font-sans">Règle 2.1 - Respect & Courtoisie</span>
          </div>

          <div class="space-y-1">
            <p class="text-[10px] text-on-surface-variant/40 font-bold uppercase leading-none">Raison détaillée</p>
            <div class="bg-surface-container-high/40 rounded-xl p-4 italic text-on-surface-variant border border-outline-variant/5">
              "{selectedSanction.reason}. Comportement inapproprié persistant."
            </div>
          </div>

          <div class="space-y-1">
            <p class="text-[10px] text-on-surface-variant/40 font-bold uppercase leading-none">Pièces jointes / Preuves</p>
            <div class="flex gap-2">
              <span class="inline-flex items-center gap-1.5 bg-surface-container rounded-lg px-3 py-1 text-xs font-bold text-primary border border-outline-variant/10">
                <Papicon icon="link" size={10} /> capture_de_l_abus.png
              </span>
            </div>
          </div>
          
          <div class="flex justify-end gap-3 pt-2">
            <button 
              type="button"
              onclick={() => viewingReportId = null}
              class="px-4 py-2 bg-surface-container text-on-surface hover:bg-surface-container-high rounded-lg font-bold transition-colors cursor-pointer"
            >
              Fermer
            </button>
          </div>
        </div>
      </div>
    {/if}
  {/if}
</div>

<style>
  .tab-group {
    display: flex;
    flex-wrap: nowrap;
    gap: 0.25rem;
    padding: 0.25rem;
    background: var(--surface-container);
    border-radius: 0.75rem;
    border: 1px solid var(--outline-variant);
  }

  .tab-button {
    display: inline-flex;
    align-items: center;
    gap: 0.375rem;
    padding: 0.5rem 0.875rem;
    border-radius: 0.5rem;
    font-size: 11px;
    font-weight: 700;
    transition: all 0.25s ease;
    color: var(--on-surface-variant);
    background: transparent;
    border: none;
    cursor: pointer;
    white-space: nowrap;
  }

  .tab-button:hover {
    background: var(--surface-hover);
    color: var(--on-surface);
  }

  .tab-button.active {
    background: var(--color-primary);
    color: var(--color-on-primary);
    box-shadow: 0 4px 12px rgba(51, 69, 87, 0.2);
  }

  .badge {
    display: inline-flex;
    align-items: center;
    border-radius: 9999px;
    font-weight: 800;
    text-transform: uppercase;
    letter-spacing: 0.05em;
  }

  .scrollbar-none::-webkit-scrollbar {
    display: none;
  }
  .scrollbar-none {
    -ms-overflow-style: none;
    scrollbar-width: none;
  }
</style>
