<script lang="ts">
  import * as LucideIcons from "@lucide/svelte";

  let { 
    icon = "", 
    size = 24, 
    class: className = "" 
  }: { 
    icon?: string; 
    size?: number; 
    class?: string; 
    children?: import('svelte').Snippet;
  } = $props();

  const iconAliases: Record<string, string> = {
    "alert-triangle": "AlertTriangle",
    "gavel": "Gavel",
    "policy": "Lock",
    "admin_panel_settings": "Lock",
    "book": "Book",
    "settings": "Settings",
    "search": "Search",
    "chartlineup": "TrendingUp",
    "chatcircledots": "MessageCircle",
    "microphone": "Mic",
    "usersfour": "Users",
    "shieldwarning": "ShieldAlert",
    "shieldcheck": "ShieldCheck",
    "mailopen": "MailOpen",
    "chartpieslice": "PieChart",
    "lightning": "Zap",
    "alert-octagon": "AlertOctagon",
    "close": "X",
    "x": "X",
    "delete": "Trash",
    "edit": "Pen",
    "forum": "MessageSquare",
    "check_circle": "Check",
    "cancel": "X",
    "error": "AlertCircle",
    "warning": "AlertTriangle",
    "info": "Info",
    "help": "HelpCircle",
    "notifications": "Bell",
    "mail": "Mail",
    "person": "User",
    "group": "Users",
    "add": "Plus",
    "remove": "Minus",
    "arrow_forward": "ArrowRight",
    "arrow_back": "ArrowLeft",
    "expand_more": "ChevronDown",
    "expand_less": "ChevronUp",
    "chevron_right": "ChevronRight",
    "chevron_left": "ChevronLeft",
    "menu": "Menu",
    "more_vert": "MoreVertical",
    "refresh": "RefreshCcw",
    "sync": "RefreshCw",
    "done": "Check",
    "Crown": "Crown",
    "Badge": "BadgeCheck",
    "MessageSquare": "MessageSquare",
    "Mic": "Mic",
    "User": "User",
    "Inbox": "Inbox",
    "Filter": "Filter",
    "ShieldAlert": "ShieldAlert",
    "Image": "Image",
    "FileText": "FileText",
    "Users": "Users",
    "Activity": "Activity"
  };

  function toPascalCase(str: string) {
    if (!str) return "";
    return str
      .split(/[-_]+/)
      .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
      .join('');
  }

  const safeIcon = $derived(typeof icon === "string" ? icon : "");
  
  const lucideIconName = $derived(() => {
    const aliased = iconAliases[safeIcon.toLowerCase()] || iconAliases[safeIcon] || safeIcon;
    return toPascalCase(aliased);
  });

  const LucideComponent = $derived((LucideIcons as any)[lucideIconName()] || (LucideIcons as any)[safeIcon] || LucideIcons.HelpCircle);

</script>

<LucideComponent size={size} class={className} strokeWidth={2.5} />
