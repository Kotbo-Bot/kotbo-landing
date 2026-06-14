<script lang="ts">
  import Papicon from '../Papicon.svelte';
  
  let { onSelectMember }: {
    onSelectMember?: (name: string, role: string, avatarSeed: string) => void;
  } = $props();

  const staff = [
    ['Zenox','Administrateur','452','Zenox','bg-emerald-500'],
    ['Lena','Responsable Staff','310','Lena','bg-rose-500'],
    ['Aiden','Modérateur','124','Aiden','bg-emerald-500']
  ];
</script>

<div class="flex h-full flex-col gap-3 font-body text-on-surface">
  <div class="flex items-end justify-between">
    <div>
      <h2 class="text-xl font-black">Gestion du Staff</h2>
      <p class="text-[9px] font-bold text-on-surface-variant/50">Supervisez votre équipe, les permissions et les périodes de test.</p>
    </div>
    <button class="rounded-xl bg-primary px-3 py-2 text-[8px] font-black uppercase text-white hover:bg-primary/95 transition-colors">Ajouter un membre</button>
  </div>
  
  <div class="grid grid-cols-3 gap-2">
    {#each [['Membres','18','users'],['Grades','6','badge'],['Avertissements','2','alert-triangle']] as stat}
      <div class="flex items-center gap-2 rounded-xl border border-outline-variant/20 bg-surface-container-lowest p-3 shadow-inner">
        <div class="flex size-7 items-center justify-center rounded-lg bg-primary/10 text-primary">
          <Papicon icon={stat[2]} size={13}/>
        </div>
        <div>
          <p class="text-[7px] font-black uppercase text-on-surface-variant/40">{stat[0]}</p>
          <p class="text-base font-black leading-none">{stat[1]}</p>
        </div>
      </div>
    {/each}
  </div>

  <div class="flex-1 rounded-2xl border border-outline-variant/20 bg-surface-container-lowest p-3 overflow-hidden flex flex-col">
    <div class="mb-2 flex items-center justify-between">
      <div>
        <p class="text-[10px] font-black">Membres du staff</p>
        <p class="text-[7px] text-on-surface-variant/40">Gérez l’équipe et leurs grades actuels.</p>
      </div>
      <span class="rounded-lg bg-surface-container px-2 py-1 text-[7px] font-bold">Équipe active</span>
    </div>

    <div class="space-y-1.5 flex-1 overflow-y-auto pr-0.5">
      {#each staff as member}
        <div class="grid grid-cols-[1.5fr_1.3fr_.8fr] sm:grid-cols-[1.5fr_1.3fr_.7fr_.8fr] items-center gap-2 rounded-xl border border-outline-variant/10 bg-surface-container-low/40 px-3 py-2 hover:bg-surface-container-low/80 transition-colors">
          <div class="flex items-center gap-2">
            <div class="relative flex size-7 shrink-0 items-center justify-center rounded-lg bg-primary text-[8px] font-black text-white overflow-hidden shadow-inner">
              <img src="https://api.dicebear.com/7.x/avataaars/svg?seed={member[3]}" alt="" class="w-full h-full object-cover" />
              <span class="absolute -bottom-0.5 -right-0.5 size-2 rounded-full border border-white {member[4]}"></span>
            </div>
            <div class="min-w-0">
              <p class="text-[8px] font-black truncate">{member[0]}</p>
              <p class="text-[6px] text-on-surface-variant/40 truncate">@{member[0].toLowerCase()}</p>
            </div>
          </div>
          
          <span class="w-fit rounded-lg bg-primary/10 px-2 py-1 text-[6px] font-black uppercase text-primary truncate">
            {member[1]}
          </span>
          
          <span class="flex items-center gap-1 text-[7px] font-bold shrink-0 hidden sm:flex">
            <Papicon icon="activity" size={10} />
            {member[2]}
          </span>
          
          <div class="flex justify-end gap-1.5 shrink-0">
            <button 
              type="button"
              onclick={() => onSelectMember && onSelectMember(member[0], member[1], member[3])}
              class="rounded-lg bg-surface-container hover:bg-surface-container-high px-1.5 py-1 text-[6px] font-black cursor-pointer transition-colors"
            >
              Profil
            </button>
            <span class="rounded-lg bg-surface-container px-1.5 py-1 text-[6px] font-black">•••</span>
          </div>
        </div>
      {/each}
    </div>
  </div>
</div>
