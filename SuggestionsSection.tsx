import { FraudRule } from '@/lib/fraudDetection';
import { Lightbulb, ArrowRight } from 'lucide-react';

interface SuggestionsSectionProps {
  triggeredRules: FraudRule[];
}

export function SuggestionsSection({ triggeredRules }: SuggestionsSectionProps) {
  if (triggeredRules.length === 0) {
    return null;
  }

  return (
    <div className="fintech-card animate-fade-in">
      <div className="flex items-center gap-2 mb-4">
        <div className="p-2 rounded-full bg-secondary">
          <Lightbulb className="w-5 h-5 text-primary" />
        </div>
        <div>
          <h3 className="font-display text-lg font-semibold">How Could This Transaction Be Considered Safe?</h3>
          <p className="text-muted-foreground text-sm">Simple changes that would reduce the risk score</p>
        </div>
      </div>

      <div className="space-y-3">
        {triggeredRules.map((rule, index) => (
          <div 
            key={rule.id} 
            className="suggestion-card flex items-start gap-3 animate-fade-in"
            style={{ animationDelay: `${index * 100}ms` }}
          >
            <div className="mt-1">
              <ArrowRight className="w-4 h-4 text-risk-low" />
            </div>
            <div>
              <h4 className="font-medium text-sm text-foreground mb-1">
                To address: {rule.name}
              </h4>
              <p className="text-muted-foreground text-sm">
                {rule.suggestion}
              </p>
              <span className="inline-block mt-2 text-xs text-risk-low font-medium">
                Would reduce score by {rule.points} points
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* General Tips */}
      <div className="mt-6 p-4 bg-risk-low-bg rounded-lg border border-risk-low/20">
        <h4 className="font-medium text-risk-low text-sm mb-2">General Security Tips</h4>
        <ul className="text-sm text-muted-foreground space-y-1">
          <li>• Keep your bank informed about travel plans</li>
          <li>• Use familiar devices for financial transactions</li>
          <li>• Avoid multiple rapid transactions in succession</li>
          <li>• For large purchases, contact your bank beforehand</li>
        </ul>
      </div>
    </div>
  );
}
