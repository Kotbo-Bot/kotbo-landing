<script lang="ts">
  import Papicon from '../Papicon.svelte';
  import { mockAvatar } from '$lib/mockMedia';
  import { getLocale } from '$lib/i18n/state.svelte';

  let activeTab = $state('Membres');

  const membersData = [
    {
      name: 'Lena', handle: 'lena_adm', seed: 'Lena',
      gradeKey: 'manager', gradeStyle: 'border-rose-200 bg-rose-50 text-rose-600',
      hierarchyKey: 'chief', hierarchyColor: '#e11d48',
      warns: 0, tutor: false, online: true,
    },
    {
      name: 'Zenox', handle: 'zenox', seed: 'Zenox',
      gradeKey: 'admin', gradeStyle: 'border-indigo-200 bg-indigo-50 text-indigo-600',
      hierarchyKey: 'admin', hierarchyColor: '#6366f1',
      warns: 0, tutor: false, online: true,
    },
    {
      name: 'Aiden', handle: 'aiden_mod', seed: 'Aiden',
      gradeKey: 'moderator', gradeStyle: 'border-emerald-200 bg-emerald-50 text-emerald-600',
      hierarchyKey: null, warns: 1, tutor: true, online: true,
    },
    {
      name: 'Kylian', handle: 'kylian_h', seed: 'Kylian',
      gradeKey: 'helper', gradeStyle: 'border-amber-200 bg-amber-50 text-amber-600',
      hierarchyKey: null, warns: 0, tutor: true, online: false,
    },
    {
      name: 'Nora', handle: 'nora_test', seed: 'Nora',
      gradeKey: 'trialHelper', gradeStyle: 'border-slate-200 bg-slate-50 text-slate-500',
      hierarchyKey: null, warns: 0, tutor: false, online: true,
    },
  ];

  const TEXT = {
    fr: {
      tabs: [
        { id: 'Membres',      icon: 'users'          },
        { id: 'Rôles',        icon: 'shield'         },
        { id: 'Organigramme', icon: 'git-branch'     },
        { id: 'Avert.',       icon: 'alert-triangle' },
        { id: 'Sondages',     icon: 'check-square'   },
        { id: 'Leadership',   icon: 'bar-chart'      },
      ],
      headerTitle: 'Gestion du Personnel',
      headerSubtitle: 'Supervisez votre équipe de modération',
      addMemberBtn: '+ Ajouter un membre',
      listTitle: 'Membres du Personnel',
      listSubtitle: 'Gérez l\'équipe et leurs grades actuels.',
      memberCount: 'membres',
      grades: { manager: 'Responsable', admin: 'Administrateur', moderator: 'Modérateur', helper: 'Helper', trialHelper: 'Helper Test' },
      hierarchyGroups: { direction: 'Direction' },
      hierarchyGrades: { chief: 'Cheffe', admin: 'Admin' },
      warnBadge: 'AVERT.',
      tutorBadge: 'TUTORAT',
      actions: [['user', 'Profil'], ['chevrons-up', 'Promo'], ['chevrons-down', 'Démo'], ['more-horizontal', 'Plus']],
    },
    en: {
      tabs: [
        { id: 'Membres',      icon: 'users'          },
        { id: 'Rôles',        icon: 'shield'         },
        { id: 'Organigramme', icon: 'git-branch'     },
        { id: 'Avert.',       icon: 'alert-triangle' },
        { id: 'Sondages',     icon: 'check-square'   },
        { id: 'Leadership',   icon: 'bar-chart'      },
      ],
      headerTitle: 'Staff Management',
      headerSubtitle: 'Oversee your moderation team',
      addMemberBtn: '+ Add Member',
      listTitle: 'Staff Members',
      listSubtitle: 'Manage the team and their current ranks.',
      memberCount: 'members',
      grades: { manager: 'Manager', admin: 'Administrator', moderator: 'Moderator', helper: 'Helper', trialHelper: 'Trial Helper' },
      hierarchyGroups: { direction: 'Leadership' },
      hierarchyGrades: { chief: 'Chief', admin: 'Admin' },
      warnBadge: 'WARN',
      tutorBadge: 'MENTOR',
      actions: [['user', 'Profile'], ['chevrons-up', 'Promote'], ['chevrons-down', 'Demote'], ['more-horizontal', 'More']],
    },
  };

  const t = $derived(TEXT[getLocale()]);
  const tabs = $derived(t.tabs);

  const members = $derived(membersData.map(m => ({
    ...m,
    grade: t.grades[m.gradeKey as keyof typeof t.grades],
    hierarchy: m.hierarchyKey
      ? { name: t.hierarchyGroups.direction, grade: t.hierarchyGrades[m.hierarchyKey as keyof typeof t.hierarchyGrades], color: m.hierarchyColor }
      : null,
  })));
</script>

<div class="flex h-full flex-col font-body text-on-surface overflow-hidden">

  <!-- Header -->
  <div class="flex items-center justify-between border-b border-outline-variant/10 bg-linear-to-r from-surface-container/80 to-surface-container-low/50 px-5 py-3.5 shrink-0">
    <div class="flex items-center gap-3">
      <div class="flex h-8 w-8 items-center justify-center rounded-xl bg-primary/10 text-primary">
        <Papicon icon="users" size={16} />
      </div>
      <div>
        <p class="text-sm font-black leading-tight">{t.headerTitle}</p>
        <p class="text-[9px] text-on-surface-variant/60">{t.headerSubtitle}</p>
      </div>
    </div>
    <button class="rounded-lg border border-primary/20 bg-primary/8 px-3 py-2 text-[9px] font-black uppercase tracking-widest text-primary">
      {t.addMemberBtn}
    </button>
  </div>

  <!-- List header -->
  <div class="flex items-center justify-between border-b border-outline-variant/10 bg-surface-container-low/30 px-5 py-3 shrink-0">
    <div>
      <p class="text-sm font-black">{t.listTitle}</p>
      <p class="text-[9px] text-on-surface-variant/50">{t.listSubtitle}</p>
    </div>
    <span class="rounded-lg bg-surface-container px-2.5 py-1.5 text-[9px] font-bold text-on-surface-variant/60">
      {members.length} {t.memberCount}
    </span>
  </div>

  <!-- Member rows -->
  <div class="flex-1 divide-y divide-outline-variant/8 overflow-y-auto">
    {#each members as m}
      <div class="group flex items-center gap-4 px-5 py-4 transition-colors hover:bg-primary/[0.04]">

        <!-- Avatar + présence -->
        <div class="relative shrink-0">
          <div class="h-10 w-10 overflow-hidden rounded-full border border-outline-variant/20 bg-surface-container-high shadow-sm">
            <img src={mockAvatar(m.seed)} alt="" class="h-full w-full object-cover" />
          </div>
          <span class="absolute -bottom-0.5 -right-0.5 h-3 w-3 rounded-full border-2 border-white {m.online ? 'bg-emerald-400' : 'bg-gray-400'}"></span>
        </div>

        <!-- Info + badges -->
        <div class="min-w-0 flex-1">
          <div class="flex flex-wrap items-center gap-1.5 mb-1">
            <span class="text-sm font-black text-on-surface">{m.name}</span>

            <!-- Grade coloré -->
            <span class="rounded-full border px-2 py-0.5 text-[9px] font-black uppercase tracking-wide shrink-0 {m.gradeStyle}">
              {m.grade}
            </span>

            <!-- Hiérarchie -->
            {#if m.hierarchy}
              <span
                class="rounded-full border px-2 py-0.5 text-[9px] font-black uppercase tracking-wide shrink-0"
                style="border-color:{m.hierarchy.color}40;background:{m.hierarchy.color}18;color:{m.hierarchy.color}"
              >
                {m.hierarchy.name} · {m.hierarchy.grade}
              </span>
            {/if}

            <!-- Avertissements -->
            {#if m.warns}
              <span class="rounded-full border border-amber-200 bg-amber-100 px-2 py-0.5 text-[9px] font-black text-amber-700 shrink-0">
                {m.warns} {t.warnBadge}
              </span>
            {/if}

            <!-- Tutorat -->
            {#if m.tutor}
              <span class="rounded-full border border-violet-200 bg-violet-50 px-2 py-0.5 text-[9px] font-black text-violet-600 shrink-0">
                {t.tutorBadge}
              </span>
            {/if}
          </div>
          <p class="text-[10px] text-on-surface-variant/50">@{m.handle}</p>
        </div>

        <!-- Actions -->
        <div class="flex shrink-0 gap-1.5">
          {#each t.actions as [icon, label]}
            <button
              title={label}
              class="flex h-8 w-8 items-center justify-center rounded-lg border border-outline-variant/20 bg-surface text-on-surface-variant/60 transition-colors hover:border-primary/30 hover:bg-primary/10 hover:text-primary"
            >
              <Papicon {icon} size={13} />
            </button>
          {/each}
        </div>
      </div>
    {/each}
  </div>
</div>
