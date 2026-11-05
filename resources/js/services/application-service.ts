import {
    APPLICATION_CATALOG,
    type CatalogApplication,
} from '@/data/application-catalog';

export interface ApplicationInstallInput {
    serverId: string;
    applicationSlug: string;
    hostname: string;
}

export interface ApplicationDeployment {
    id: string;
    status: 'queued' | 'installing' | 'ready' | 'failed';
    applicationSlug: string;
    serverId: string;
}

export interface ApplicationService {
    list(): Promise<CatalogApplication[]>;
    install(input: ApplicationInstallInput): Promise<ApplicationDeployment>;
}

/**
 * Implementação local usada apenas pela demonstração do front-end.
 * No backend, mantenha o contrato acima e substitua este objeto por chamadas HTTP.
 */
export const demoApplicationService: ApplicationService = {
    async list() {
        return APPLICATION_CATALOG;
    },
    async install(input) {
        return {
            id: `demo-${input.applicationSlug}`,
            status: 'ready',
            applicationSlug: input.applicationSlug,
            serverId: input.serverId,
        };
    },
};
