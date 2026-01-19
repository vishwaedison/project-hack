import { FraudResult, getRiskLevelDisplay } from '@/lib/fraudDetection';
import { Shield, ShieldAlert, ShieldCheck, ShieldX } from 'lucide-react';

interface RiskScoreDisplayProps {
  result: FraudResult;
}

export function RiskScoreDisplay({ result }: RiskScoreDisplayProps) {
  const { score, riskLevel } = result;
  const display = getRiskLevelDisplay(riskLevel);

  const getRiskIcon = () => {
    switch (riskLevel) {
      case 'low':
        return <ShieldCheck className="w-8 h-8" />;
      case 'medium':
        return <ShieldAlert className="w-8 h-8" />;
      case 'high':
        return <ShieldX className="w-8 h-8" />;
      default:
        return <Shield className="w-8 h-8" />;
    }
  };

  const getScoreBarColor = () => {
    switch (riskLevel) {
      case 'low':
        return 'bg-risk-low';
      case 'medium':
        return 'bg-risk-medium';
      case 'high':
        return 'bg-risk-high';
    }
  };

  const getBadgeClass = () => {
    switch (riskLevel) {
      case 'low':
        return 'risk-badge-low';
      case 'medium':
        return 'risk-badge-medium';
      case 'high':
        return 'risk-badge-high';
    }
  };

  const getIconColor = () => {
    switch (riskLevel) {
      case 'low':
        return 'text-risk-low';
      case 'medium':
        return 'text-risk-medium';
      case 'high':
        return 'text-risk-high';
    }
  };

  return (
    <div className="fintech-card-elevated animate-slide-up">
      <div className="flex items-start justify-between mb-6">
        <div>
          <h2 className="font-display text-xl font-semibold mb-1">Risk Assessment</h2>
          <p className="text-muted-foreground text-sm">{display.description}</p>
        </div>
        <div className={`${getBadgeClass()}`}>
          {getRiskIcon()}
          <span>{display.label}</span>
        </div>
      </div>

      {/* Score Display */}
      <div className="mb-6">
        <div className="flex items-end justify-between mb-2">
          <span className="text-sm font-medium text-muted-foreground">Fraud Risk Score</span>
          <span className={`font-display text-4xl font-bold ${getIconColor()}`}>{score}</span>
        </div>
        
        {/* Score Bar */}
        <div className="relative h-3 bg-secondary rounded-full overflow-hidden">
          <div 
            className={`absolute left-0 top-0 h-full ${getScoreBarColor()} rounded-full animate-score-fill transition-all duration-1000`}
            style={{ width: `${score}%` }}
          />
          {/* Risk thresholds markers */}
          <div className="absolute top-0 left-[30%] w-px h-full bg-border" />
          <div className="absolute top-0 left-[60%] w-px h-full bg-border" />
        </div>
        
        {/* Score Legend */}
        <div className="flex justify-between mt-2 text-xs text-muted-foreground">
          <span>0</span>
          <span className="text-risk-low">Low (0-30)</span>
          <span className="text-risk-medium">Medium (31-60)</span>
          <span className="text-risk-high">High (61-100)</span>
          <span>100</span>
        </div>
      </div>

      {/* Summary Stats */}
      <div className="grid grid-cols-3 gap-4 pt-4 border-t border-border">
        <div className="text-center">
          <div className="text-2xl font-display font-bold text-foreground">{result.triggeredRules.length}</div>
          <div className="text-xs text-muted-foreground">Rules Triggered</div>
        </div>
        <div className="text-center">
          <div className="text-2xl font-display font-bold text-foreground">
            {result.triggeredRules.reduce((sum, rule) => sum + rule.points, 0)}
          </div>
          <div className="text-xs text-muted-foreground">Total Points</div>
        </div>
        <div className="text-center">
          <div className={`text-2xl font-display font-bold ${getIconColor()}`}>
            {riskLevel.charAt(0).toUpperCase() + riskLevel.slice(1)}
          </div>
          <div className="text-xs text-muted-foreground">Risk Level</div>
        </div>
      </div>
    </div>
  );
}
