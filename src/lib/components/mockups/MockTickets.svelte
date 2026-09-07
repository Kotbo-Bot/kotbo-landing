<script lang="ts">
  import Papicon from '../Papicon.svelte';
  import { getLocale } from '$lib/i18n/state.svelte';

  const TEXT = {
    fr: {
      header: { title: 'Système de Tickets', subtitle: 'Support en temps réel et gestion des demandes.', configBtn: 'Configuration' },
      subTabs: { support: 'Tickets support', transcripts: 'Transcriptions' },
      filters: { all: 'Tous', open: 'Ouverts', closed: 'Fermés' },
      noTickets: 'Aucun ticket',
      claimBtn: 'Prendre',
      closeBtn: 'Fermer',
      unassigned: 'non assigné',
      byPrefix: 'par',
      statusLabels: { 'Ouvert': 'Ouvert', 'Pris en charge': 'Pris en charge', 'Fermé': 'Fermé' } as Record<string, string>,
      inputClosedPlaceholder: 'Ce ticket est fermé',
      inputPlaceholder: 'Écrire un message…',
      systemClaimedMsg: 'Arka • Staff a pris en charge ce ticket.',
      systemClosedMsg: 'Le ticket a été fermé par Arka.',
      timeLocale: 'fr-FR',
      seed: {
        t104: [
          'Bonjour, je souhaite signaler un problème en vocal.',
          'Bonjour, je prends votre demande en charge.',
          'Merci, j’ai envoyé les captures.'
        ],
        t103: [
          'Est-ce qu\'il y a un salon vocal disponible pour le tournoi ?',
          'Oui, tous les salons "Tournoi" sont ouverts au public.',
          'Super, merci beaucoup !'
        ],
        t102: [
          'Mon grade n\'apparaît plus sur le discord.',
          'C\'est corrigé ! Ton grade VIP a été réassocié.',
          'Parfait, ça marche !'
        ],
      },
    },
    en: {
      header: { title: 'Ticket System', subtitle: 'Real-time support and request management.', configBtn: 'Settings' },
      subTabs: { support: 'Support Tickets', transcripts: 'Transcripts' },
      filters: { all: 'All', open: 'Open', closed: 'Closed' },
      noTickets: 'No tickets',
      claimBtn: 'Claim',
      closeBtn: 'Close',
      unassigned: 'unassigned',
      byPrefix: 'by',
      statusLabels: { 'Ouvert': 'Open', 'Pris en charge': 'Claimed', 'Fermé': 'Closed' } as Record<string, string>,
      inputClosedPlaceholder: 'This ticket is closed',
      inputPlaceholder: 'Write a message…',
      systemClaimedMsg: 'Arka • Staff has taken this ticket.',
      systemClosedMsg: 'This ticket was closed by Arka.',
      timeLocale: 'en-US',
      seed: {
        t104: [
          'Hi, I’d like to report an issue in voice chat.',
          'Hi, I’m looking into your request now.',
          'Thanks, I’ve sent the screenshots.'
        ],
        t103: [
          'Is there a voice channel available for the tournament?',
          'Yes, all the "Tournament" channels are open to everyone.',
          'Great, thanks so much!'
        ],
        t102: [
          'My rank no longer shows up on Discord.',
          'Fixed! Your VIP rank has been reassigned.',
          'Perfect, it works now!'
        ],
      },
    },
  };

  const t = $derived(TEXT[getLocale()]);

  function seedTickets() {
    return [
      {
        id: 'T-104',
        user: 'Maxou',
        status: 'Ouvert',
        claimedBy: null as string | null,
        channel: 'ticket-maxou',
        avatar: 'Maxou',
        messages: [
          { sender: 'Maxou', isStaff: false, time: '10:42', content: t.seed.t104[0] },
          { sender: 'Arka', isStaff: true, time: '10:43', content: t.seed.t104[1] },
          { sender: 'Maxou', isStaff: false, time: '10:44', content: t.seed.t104[2] }
        ]
      },
      {
        id: 'T-103',
        user: 'Sarah',
        status: 'Pris en charge',
        claimedBy: 'Lena',
        channel: 'ticket-sarah',
        avatar: 'Sarah',
        messages: [
          { sender: 'Sarah', isStaff: false, time: '09:15', content: t.seed.t103[0] },
          { sender: 'Lena', isStaff: true, time: '09:17', content: t.seed.t103[1] },
          { sender: 'Sarah', isStaff: false, time: '09:18', content: t.seed.t103[2] }
        ]
      },
      {
        id: 'T-102',
        user: 'Kylian',
        status: 'Fermé',
        claimedBy: 'Lena',
        channel: 'ticket-kylian',
        avatar: 'Kylian',
        messages: [
          { sender: 'Kylian', isStaff: false, time: '08:30', content: t.seed.t102[0] },
          { sender: 'Lena', isStaff: true, time: '08:35', content: t.seed.t102[1] },
          { sender: 'Kylian', isStaff: false, time: '08:37', content: t.seed.t102[2] }
        ]
      }
    ];
  }

  // State for tickets list
  let tickets = $state(seedTickets());

  $effect(() => {
    // Re-seed the demo conversation content whenever the locale changes,
    // so the mock chat matches the current UI language.
    tickets = seedTickets();
  });

  let activeTicketId = $state('T-104');
  let filterStatus = $state('ALL'); // ALL, OPEN, CLOSED
  let inputMessage = $state('');
  let mobileView = $state('list'); // 'list' | 'chat'

  const activeTicket = $derived(tickets.find(tk => tk.id === activeTicketId) || tickets[0]);

  const filteredTickets = $derived(
    tickets.filter(tk => {
      if (filterStatus === 'OPEN') return tk.status !== 'Fermé';
      if (filterStatus === 'CLOSED') return tk.status === 'Fermé';
      return true;
    })
  );

  function selectTicket(id: string) {
    activeTicketId = id;
    mobileView = 'chat';
  }

  function claimTicket() {
    const ticket = tickets.find(tk => tk.id === activeTicketId);
    if (ticket && ticket.status === 'Ouvert') {
      ticket.status = 'Pris en charge';
      ticket.claimedBy = 'Arka';
      ticket.messages.push({
        sender: 'Système',
        isStaff: true,
        time: new Date().toLocaleTimeString(t.timeLocale, { hour: '2-digit', minute: '2-digit' }),
        content: t.systemClaimedMsg
      });
    }
  }

  function closeTicket() {
    const ticket = tickets.find(tk => tk.id === activeTicketId);
    if (ticket && ticket.status !== 'Fermé') {
      ticket.status = 'Fermé';
      ticket.messages.push({
        sender: 'Système',
        isStaff: true,
        time: new Date().toLocaleTimeString(t.timeLocale, { hour: '2-digit', minute: '2-digit' }),
        content: t.systemClosedMsg
      });
    }
  }

  function sendMessage() {
    if (!inputMessage.trim()) return;
    const ticket = tickets.find(tk => tk.id === activeTicketId);
    if (ticket && ticket.status !== 'Fermé') {
      ticket.messages.push({
        sender: 'Arka',
        isStaff: true,
        time: new Date().toLocaleTimeString(t.timeLocale, { hour: '2-digit', minute: '2-digit' }),
        content: inputMessage.trim()
      });
      inputMessage = '';
    }
  }

  function getStatusClass(status: string) {
    if (status === 'Ouvert') return 'border-emerald-500/20 bg-emerald-500/10 text-emerald-600';
    if (status === 'Pris en charge') return 'border-amber-500/20 bg-amber-500/10 text-amber-600';
    return 'border-rose-500/20 bg-rose-500/10 text-rose-600';
  }
</script>

<div class="flex h-full flex-col gap-3 font-body text-on-surface">
  <div class="flex items-center justify-between">
    <div>
      <h2 class="text-xl font-black">{t.header.title}</h2>
      <p class="text-[9px] font-bold text-on-surface-variant/50">{t.header.subtitle}</p>
    </div>
    <button class="rounded-xl bg-primary px-3 py-2 text-[8px] font-black uppercase text-white hover:bg-primary/90 transition-colors">{t.header.configBtn}</button>
  </div>

  <div class="flex gap-2 border-b border-outline-variant/20 text-[8px] font-black uppercase">
    <span class="border-b-2 border-primary px-3 py-2 text-primary">{t.subTabs.support}</span>
    <span class="px-3 py-2 text-on-surface-variant/40">{t.subTabs.transcripts}</span>
  </div>

  <div class="grid min-h-0 flex-1 grid-cols-1 sm:grid-cols-[0.85fr_1.15fr] gap-3">
    <!-- Tickets List -->
    <div class="flex-col overflow-hidden rounded-2xl border border-outline-variant/20 bg-surface-container-lowest p-3 {mobileView === 'chat' ? 'hidden sm:flex' : 'flex'}">
      <div class="mb-3 flex gap-1 flex-wrap">
        <button 
          onclick={() => filterStatus = 'ALL'} 
          class="rounded-full px-2.5 py-1 text-[7px] font-black uppercase transition-all {filterStatus === 'ALL' ? 'bg-primary text-white shadow-sm' : 'bg-surface-container hover:bg-surface-container-high'}"
        >{t.filters.all}</button>
        <button
          onclick={() => filterStatus = 'OPEN'}
          class="rounded-full px-2.5 py-1 text-[7px] font-black uppercase transition-all {filterStatus === 'OPEN' ? 'bg-primary text-white shadow-sm' : 'bg-surface-container hover:bg-surface-container-high'}"
        >{t.filters.open}</button>
        <button
          onclick={() => filterStatus = 'CLOSED'}
          class="rounded-full px-2.5 py-1 text-[7px] font-black uppercase transition-all {filterStatus === 'CLOSED' ? 'bg-primary text-white shadow-sm' : 'bg-surface-container hover:bg-surface-container-high'}"
        >{t.filters.closed}</button>
      </div>

      <div class="space-y-1.5 flex-1 overflow-y-auto pr-0.5">
        {#each filteredTickets as ticket}
          <button 
            onclick={() => selectTicket(ticket.id)}
            class="w-full text-left rounded-xl border p-2.5 transition-all {activeTicketId === ticket.id ? 'border-primary bg-primary/5 shadow-sm' : 'border-outline-variant/15 bg-surface-container/20 hover:bg-surface-container-low/40'}"
          >
            <div class="flex items-start gap-2">
              <div class="flex size-7 shrink-0 items-center justify-center rounded-lg bg-primary/15 text-[9px] font-black text-primary">
                {ticket.user[0]}
              </div>
              <div class="min-w-0 flex-1">
                <div class="flex items-center justify-between gap-1">
                  <p class="truncate text-[9px] font-black">@{ticket.user}</p>
                  <span class="rounded-full border px-1.5 py-0.5 text-[6px] font-black uppercase tracking-wider {getStatusClass(ticket.status)}">
                    {t.statusLabels[ticket.status]}
                  </span>
                </div>
                <p class="mt-1 text-[7px] font-mono text-on-surface-variant/40">ID: {ticket.id}</p>
              </div>
            </div>
          </button>
        {/each}
        {#if filteredTickets.length === 0}
          <div class="py-10 text-center text-on-surface-variant/40 text-[9px] font-bold">{t.noTickets}</div>
        {/if}
      </div>
    </div>

    <!-- Active Chat View -->
    <div class="min-h-0 flex-col overflow-hidden rounded-2xl border border-outline-variant/20 bg-surface-container-lowest {mobileView === 'list' ? 'hidden sm:flex' : 'flex'}">
      <!-- Chat Header -->
      <div class="flex items-center justify-between border-b border-outline-variant/15 px-3 py-2.5 bg-surface/50">
        <div class="flex items-center gap-2">
          <button 
            type="button"
            onclick={() => mobileView = 'list'}
            class="sm:hidden text-primary p-1 hover:bg-surface-container rounded-lg mr-1 cursor-pointer"
          >
            <Papicon icon="arrow_back" size={10} />
          </button>
          <div class="flex size-7 items-center justify-center rounded-lg bg-primary/10 text-[9px] font-black text-primary shrink-0">
            {activeTicket.user[0]}
          </div>
          <div>
            <p class="text-[9px] font-black">{activeTicket.channel}</p>
            <p class="text-[7px] font-bold text-on-surface-variant/60">
              {#if activeTicket.status === 'Ouvert'}
                <span class="text-emerald-600 font-black">{t.statusLabels['Ouvert']}</span> • {t.unassigned}
              {:else}
                <span class="text-amber-600 font-black">{t.statusLabels['Pris en charge']}</span> {t.byPrefix} @{activeTicket.claimedBy}
              {/if}
            </p>
          </div>
        </div>
        <div class="flex gap-1.5">
          {#if activeTicket.status === 'Ouvert'}
            <button
              onclick={claimTicket}
              class="rounded-lg bg-primary px-2.5 py-1 text-[7px] font-black text-white hover:bg-primary/95 active:scale-95 transition-all"
            >{t.claimBtn}</button>
          {/if}
          {#if activeTicket.status !== 'Fermé'}
            <button
              onclick={closeTicket}
              class="rounded-lg bg-rose-500/10 px-2.5 py-1 text-[7px] font-black text-rose-600 hover:bg-rose-500/15 active:scale-95 transition-all"
            >{t.closeBtn}</button>
          {/if}
        </div>
      </div>

      <!-- Chat Messages -->
      <div class="flex-1 space-y-2 overflow-y-auto bg-surface-container-low/20 p-3">
        {#each activeTicket.messages as msg}
          {#if msg.sender === 'Système'}
            <div class="text-center my-2">
              <span class="inline-block rounded-md bg-outline-variant/10 px-2 py-0.5 text-[7px] font-black text-on-surface-variant/60 uppercase tracking-widest border border-outline-variant/15">
                {msg.content}
              </span>
            </div>
          {:else}
            <div class="flex flex-col {msg.isStaff ? 'items-end' : 'items-start'} animate-in fade-in duration-300">
              <div class="max-w-[78%] rounded-xl px-3 py-2 shadow-sm border border-outline-variant/5 {msg.isStaff ? 'bg-primary text-white rounded-tr-sm' : 'bg-surface-container-high text-on-surface rounded-tl-sm'}">
                <div class="flex justify-between gap-4 items-center">
                  <p class="text-[6.5px] font-black opacity-80">{msg.sender}</p>
                  <p class="text-[6px] opacity-50">{msg.time}</p>
                </div>
                <p class="mt-0.5 text-[8.5px] leading-relaxed font-semibold">{msg.content}</p>
              </div>
            </div>
          {/if}
        {/each}
      </div>

      <!-- Chat Input -->
      <form 
        onsubmit={(e) => { e.preventDefault(); sendMessage(); }}
        class="m-2 flex items-center gap-2 rounded-xl border border-outline-variant/20 bg-surface px-3 py-1.5 text-[8px] focus-within:border-primary/50 transition-colors"
      >
        <Papicon icon="paperclip" size={11} class="text-on-surface-variant/40" />
        {#if activeTicket.status === 'Fermé'}
          <input
            type="text"
            disabled
            placeholder={t.inputClosedPlaceholder}
            class="flex-1 bg-transparent py-0.5 text-on-surface-variant/40 outline-none border-none font-bold text-[8.5px]"
          />
        {:else}
          <input
            type="text"
            bind:value={inputMessage}
            placeholder={t.inputPlaceholder}
            class="flex-1 bg-transparent py-0.5 text-on-surface outline-none border-none font-bold text-[8.5px] placeholder-on-surface-variant/40"
          />
          <button type="submit" class="text-primary p-0.5 hover:scale-110 active:scale-95 transition-transform">
            <Papicon icon="send" size={11} />
          </button>
        {/if}
      </form>
    </div>
  </div>
</div>
