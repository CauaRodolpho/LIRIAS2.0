<script setup lang="ts">
withDefaults(defineProps<{ compact?: boolean }>(), { compact: false });
</script>

<template>
    <span class="inline-flex items-center gap-3" aria-label="LIRIAS">
        <span
            class="relative grid h-9 w-9 place-items-center rounded-lg border border-primary/30 bg-primary/10 text-primary-light"
            aria-hidden="true"
        >
            <span class="h-3 w-3 rotate-45 border border-current" />
            <span class="absolute h-1.5 w-1.5 rounded-full bg-current" />
        </span>
        <strong
            v-if="!compact"
            class="font-display text-lg tracking-[0.16em] text-foreground"
        >
            LIRIAS
        </strong>
    </span>
</template>
