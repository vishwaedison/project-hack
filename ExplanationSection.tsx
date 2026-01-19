import { FraudRule } from '@/lib/fraudDetection';
import { AlertCircle, Info, CheckCircle2 } from 'lucide-react';

interface ExplanationSectionProps {
  triggeredRules: FraudRule[];
}

export function ExplanationSection({ triggeredRules }: ExplanationSectionProps) {
  if (triggeredRules.length === 0) {
    return (
      <div className="fintech-card animate-fade-in">
        <div className="flex items-start gap-3">
          <div className="p-2 rounded-full bg-risk-low-bg">
            <CheckCircle2 className="w-5 h-5 text-risk-low" />
          </div>
          <div>
            <h3 className="font-display text-lg font-semibold mb-1">No Concerns Detected</h3>
            <p className="text-muted-foreground">
              This transaction matches your typical spending patterns. No risk factors were identified.
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="fintech-card animate-fade-in">
      <div className="flex items-center gap-2 mb-4">
        <AlertCircle className="w-5 h-5 text-risk-medium" />
        <h3 className="font-display text-lg font-semibold">Why This Transaction Was Flagged</h3>
      </div>
      
      <p className="text-muted-foreground text-sm mb-4">
        Our transparent analysis identified the following concerns. Each factor is clearly explained below.
      </p>

      <div className="space-y-3">
        {triggeredRules.map((rule, index) => (
          <div 
            key={rule.id} 
            className="explanation-card explanation-card-triggered animate-fade-in"
            style={{ animationDelay: `${index * 100}ms` }}
          >
            <div className="flex items-start justify-between mb-2">
              <h4 className="font-medium text-foreground flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-primary text-primary-foreground text-xs flex items-center justify-center font-bold">
                  {index + 1}
                </span>
                {rule.name}
              </h4>
              <span className="text-sm font-medium text-risk-medium">+{rule.points} points</span>
            </div>
            <p className="text-muted-foreground text-sm pl-8">
              {rule.explanation}
            </p>
          </div>
        ))}
      </div>

      {/* Plain Language Summary */}
      <div className="mt-6 p-4 bg-secondary/50 rounded-lg">
        <div className="flex items-center gap-2 mb-2">
          <Info className="w-4 h-4 text-fintech-slate" />
          <h4 className="font-medium text-sm">In Simple Terms</h4>
        </div>
        <p className="text-muted-foreground text-sm">
          {triggeredRules.length === 1 
            ? "One factor raised a concern about this transaction."
            : `${triggeredRules.length} factors combined raised concerns about this transaction.`}
          {" "}
          {triggeredRules.length > 1 && "When multiple factors occur together, the overall risk increases."}
        </p>
      </div>
    </div>
  );
}
