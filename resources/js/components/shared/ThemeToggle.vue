<script setup lang="ts">
import { Moon, Sun } from '@lucide/vue';
import { onMounted, ref } from 'vue';

const dark = ref(true);

function applyTheme(value: boolean) {
    dark.value = value;
    document.documentElement.classList.toggle('dark', value);
    document.documentElement.dataset.theme = value ? 'dark' : 'light';
    localStorage.setItem('lirias-theme', value ? 'dark' : 'light');
}

onMounted(() => {
    const stored = localStorage.getItem('lirias-theme');
    applyTheme(stored ? stored === 'dark' : true);
});
</script>

<template>
    <button
        type="button"
        class="grid h-11 w-11 place-items-center rounded-lg border border-border bg-card text-muted-foreground transition hover:border-primary/40 hover:text-foreground focus-visible:ring-2 focus-visible:ring-primary focus-visible:outline-none"
        :aria-label="dark ? 'Ativar tema claro' : 'Ativar tema escuro'"
        @click="applyTheme(!dark)"
    >
        <Sun v-if="dark" class="h-4 w-4" />
        <Moon v-else class="h-4 w-4" />
    </button>
</template>
