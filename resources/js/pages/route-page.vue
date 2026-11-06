<script setup lang="ts">
import { Head } from '@inertiajs/vue3';
import { computed, markRaw } from 'vue';
import DashboardLayout from '@/components/layout/DashboardLayout.vue';
import MarketingLayout from '@/components/layout/MarketingLayout.vue';
import ApplicationsPage from '@/pages/ApplicationsPage.vue';
import AuthPage from '@/pages/AuthPage.vue';
import CheckoutPage from '@/pages/CheckoutPage.vue';
import DashboardPage from '@/pages/DashboardPage.vue';
import HomePage from '@/pages/HomePage.vue';
import KnowledgePage from '@/pages/KnowledgePage.vue';
import PlaceholderPage from '@/pages/PlaceholderPage.vue';
import PricingPage from '@/pages/PricingPage.vue';
import SolutionPage from '@/pages/SolutionPage.vue';
import StatusPage from '@/pages/StatusPage.vue';
import VpsPage from '@/pages/VpsPage.vue';

const props = defineProps<{
    screen: string;
    title?: string;
    route?: {
        name?: string;
        params?: Record<string, string>;
        query?: Record<string, string>;
    };
}>();

const dashboardScreens = new Set([
    'dashboard',
    'dashboard-placeholder',
    'server-list',
    'server-overview',
    'monitoring',
    'docker',
    'dashboard-applications',
    'server-activity',
    'server-access',
    'operating-system',
    'backups',
    'security',
    'firewall',
    'malware',
    'dns',
    'server-settings',
    'domains',
    'api-tokens',
    'billing',
    'account',
    'dashboard-support',
    'network',
]);

const pageTitle = computed(() => props.title ?? 'LIRIAS');
const isDashboard = computed(() => dashboardScreens.has(props.screen));
const isAuth = computed(() => props.screen === 'auth');

const resolved = computed(() => {
    const screen = props.screen;
    if (screen === 'home')
        return { component: markRaw(HomePage), pageProps: {} };
    if (screen === 'pricing')
        return { component: markRaw(PricingPage), pageProps: {} };
    if (screen === 'applications' || screen === 'application-detail')
        return { component: markRaw(ApplicationsPage), pageProps: {} };
    if (
        screen === 'automation' ||
        screen === 'agents' ||
        screen === 'ecommerce'
    )
        return {
            component: markRaw(SolutionPage),
            pageProps: { variant: screen },
        };
    if (screen === 'vps-linux' || screen === 'vps-windows')
        return {
            component: markRaw(VpsPage),
            pageProps: {
                system: screen === 'vps-windows' ? 'windows' : 'linux',
            },
        };
    if (screen === 'status')
        return { component: markRaw(StatusPage), pageProps: {} };
    if (
        screen === 'docs' ||
        screen === 'support-center' ||
        screen === 'developers' ||
        screen === 'launchpad'
    ) {
        const variants = {
            docs: 'docs',
            'support-center': 'support',
            developers: 'developers',
            launchpad: 'launchpad',
        } as const;
        return {
            component: markRaw(KnowledgePage),
            pageProps: { variant: variants[screen] },
        };
    }
    if (screen === 'auth')
        return {
            component: markRaw(AuthPage),
            pageProps: {
                mode: props.route?.name === 'register' ? 'register' : 'login',
            },
        };
    if (
        screen === 'checkout' ||
        screen === 'provisioning' ||
        screen === 'first-access'
    )
        return {
            component: markRaw(CheckoutPage),
            pageProps: { stage: screen },
        };
    if (dashboardScreens.has(screen))
        return {
            component: markRaw(DashboardPage),
            pageProps: { screen, title: props.title },
        };
    return {
        component: markRaw(PlaceholderPage),
        pageProps: { title: props.title, notFound: screen === 'not-found' },
    };
});
</script>

<template>
    <Head :title="pageTitle" />
    <component
        v-if="isAuth"
        :is="resolved.component"
        v-bind="resolved.pageProps"
    />
    <DashboardLayout v-else-if="isDashboard">
        <component :is="resolved.component" v-bind="resolved.pageProps" />
    </DashboardLayout>
    <MarketingLayout v-else>
        <component :is="resolved.component" v-bind="resolved.pageProps" />
    </MarketingLayout>
</template>
