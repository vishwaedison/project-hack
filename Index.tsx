import { useState } from 'react';
import { Header } from '@/components/Header';
import { TransactionForm } from '@/components/TransactionForm';
import { RiskScoreDisplay } from '@/components/RiskScoreDisplay';
import { ExplanationSection } from '@/components/ExplanationSection';
import { SuggestionsSection } from '@/components/SuggestionsSection';
import { TransactionData, FraudResult, analyzeFraud } from '@/lib/fraudDetection';
import { FileText, CheckCircle, AlertTriangle, XCircle, ArrowRight, Shield } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Index = () => {
  const [result, setResult] = useState<FraudResult | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const handleSubmit = async (data: TransactionData) => {
    setIsAnalyzing(true);
    // Simulate a brief analysis delay for UX
    await new Promise(resolve => setTimeout(resolve, 800));
    const fraudResult = analyzeFraud(data);
    setResult(fraudResult);
    setIsAnalyzing(false);
  };

  const handleReset = () => {
    setResult(null);
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container mx-auto px-4 py-8 max-w-6xl">
        {/* Hero Section */}
        <div className="text-center mb-10">
          
          <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-3">
            Fraud Detection You Can Understand
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Every decision is transparent and explainable. See exactly why a transaction is flagged, 
            with clear reasoning suitable for customers, staff, and regulators.
          </p>
        </div>

        {/* How It Works */}
        {!result && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-10">
            <div className="fintech-card text-center">
              <div className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center mx-auto mb-3">
                <FileText className="w-5 h-5 text-primary" />
              </div>
              <h3 className="font-display font-semibold mb-1">1. Enter Transaction</h3>
              <p className="text-sm text-muted-foreground">Provide details about the transaction to analyze</p>
            </div>
            <div className="fintech-card text-center">
              <div className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center mx-auto mb-3">
                <ArrowRight className="w-5 h-5 text-primary" />
              </div>
              <h3 className="font-display font-semibold mb-1">2. Rule-Based Analysis</h3>
              <p className="text-sm text-muted-foreground">Transparent rules evaluate each risk factor</p>
            </div>
            <div className="fintech-card text-center">
              <div className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center mx-auto mb-3">
                <CheckCircle className="w-5 h-5 text-primary" />
              </div>
              <h3 className="font-display font-semibold mb-1">3. Clear Explanation</h3>
              <p className="text-sm text-muted-foreground">Understand exactly why in plain language</p>
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left Column - Form */}
          <div>
            <div className="fintech-card-elevated">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2 className="font-display text-xl font-semibold">Transaction Details</h2>
                  <p className="text-sm text-muted-foreground">Enter the transaction information to analyze</p>
                </div>
                {result && (
                  <Button variant="outline" size="sm" onClick={handleReset}>
                    New Analysis
                  </Button>
                )}
              </div>
              <TransactionForm onSubmit={handleSubmit} isLoading={isAnalyzing} />
            </div>

            {/* Risk Rules Reference */}
            <div className="fintech-card mt-6">
              <h3 className="font-display font-semibold mb-3 flex items-center gap-2">
                <AlertTriangle className="w-4 h-4 text-risk-medium" />
                Risk Scoring Rules
              </h3>
              <p className="text-sm text-muted-foreground mb-3">
                Our system uses these transparent, documented rules:
              </p>
              <ul className="space-y-2 text-sm">
                <li className="flex items-center justify-between py-2 border-b border-border">
                  <span className="text-muted-foreground">Amount &gt; 2× average</span>
                  <span className="font-medium text-risk-medium">+30 pts</span>
                </li>
                <li className="flex items-center justify-between py-2 border-b border-border">
                  <span className="text-muted-foreground">Foreign country transaction</span>
                  <span className="font-medium text-risk-medium">+25 pts</span>
                </li>
                <li className="flex items-center justify-between py-2 border-b border-border">
                  <span className="text-muted-foreground">New device used</span>
                  <span className="font-medium text-risk-medium">+20 pts</span>
                </li>
                <li className="flex items-center justify-between py-2 border-b border-border">
                  <span className="text-muted-foreground">Transaction within 5 minutes</span>
                  <span className="font-medium text-risk-medium">+15 pts</span>
                </li>
                <li className="flex items-center justify-between py-2">
                  <span className="text-muted-foreground">Luxury or travel category</span>
                  <span className="font-medium text-risk-medium">+10 pts</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Right Column - Results */}
          <div className="space-y-6">
            {!result && !isAnalyzing && (
              <div className="fintech-card h-[400px] flex flex-col items-center justify-center text-center">
                <div className="p-4 rounded-full bg-secondary mb-4">
                  <Shield className="w-10 h-10 text-fintech-slate" />
                </div>
                <h3 className="font-display text-lg font-semibold mb-2">Ready to Analyze</h3>
                <p className="text-muted-foreground text-sm max-w-xs">
                  Enter transaction details on the left and click "Analyze Transaction" to see the risk assessment.
                </p>
              </div>
            )}

            {isAnalyzing && (
              <div className="fintech-card h-[400px] flex flex-col items-center justify-center text-center">
                <div className="relative mb-4">
                  <div className="w-16 h-16 rounded-full border-4 border-secondary border-t-primary animate-spin" />
                </div>
                <h3 className="font-display text-lg font-semibold mb-2">Analyzing Transaction</h3>
                <p className="text-muted-foreground text-sm">
                  Applying transparent risk rules...
                </p>
              </div>
            )}

            {result && (
              <>
                <RiskScoreDisplay result={result} />
                <ExplanationSection triggeredRules={result.triggeredRules} />
                <SuggestionsSection triggeredRules={result.triggeredRules} />
              </>
            )}
          </div>
        </div>

        {/* Footer Trust Badge */}
        <div className="mt-12 text-center">
          <div className="inline-flex items-center gap-4 px-6 py-3 bg-card rounded-full border border-border">
            <div className="flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-risk-low" />
              <span className="text-sm text-muted-foreground">No Hidden Logic</span>
            </div>
            <div className="w-px h-4 bg-border" />
            <div className="flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-risk-low" />
              <span className="text-sm text-muted-foreground">100% Traceable</span>
            </div>
            <div className="w-px h-4 bg-border" />
            <div className="flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-risk-low" />
              <span className="text-sm text-muted-foreground">Regulator Ready</span>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Index;
