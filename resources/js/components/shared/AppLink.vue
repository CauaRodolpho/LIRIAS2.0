<script setup lang="ts">
import { Link } from '@inertiajs/vue3';

withDefaults(
    defineProps<{
        href: string;
        preserveScroll?: boolean;
    }>(),
    { preserveScroll: false },
);
</script>

<template>
    <Link :href="href" :preserve-scroll="preserveScroll">
        <slot />
    </Link>
</template>
