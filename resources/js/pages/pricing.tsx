import { ComparisonTable, FaqSection } from '@/components/marketing';
import { CustomVpsBuilder, PricingSection } from '@/components/pricing';

export default function PricingPage() {
    return (
        <>
            <div className="pt-24">
                <div className="mx-auto max-w-3xl px-4 pt-12 text-center sm:px-6 lg:px-8">
                    <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
                        Preços simples e transparentes
                    </h1>
                    <p className="mt-4 text-lg text-muted-foreground">
                        Sem taxas escondidas, sem contratos longos. Cancele
                        quando quiser.
                    </p>
                </div>
            </div>
            <PricingSection />
            <CustomVpsBuilder />
            <ComparisonTable />
            <FaqSection />
        </>
    );
}
