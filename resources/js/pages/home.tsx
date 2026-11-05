import {
    DashboardPreview,
    FaqSection,
    FeaturesGrid,
    Hero,
    SecuritySection,
    TechnicalStrip,
    UseCasesSection,
} from '@/components/marketing';

import { PricingSection } from '@/components/pricing';

export default function HomePage() {
    return (
        <div className="home-page-flow">
            <Hero />
            <TechnicalStrip />
            <PricingSection />
            <FeaturesGrid />
            <DashboardPreview />
            <UseCasesSection />
            <SecuritySection />
            <FaqSection />
        </div>
    );
}
