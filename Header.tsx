import { Shield, Eye } from 'lucide-react';

export function Header() {
  return (
    <header className="border-b border-border bg-card/80 backdrop-blur-sm sticky top-0 z-10">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-primary">
              <Shield className="w-6 h-6 text-primary-foreground" />
            </div>
            <div>
              <h1 className="font-display text-xl font-bold text-foreground">FraudGuard</h1>
              <p className="text-xs text-muted-foreground">Explainable Fraud Detection</p>
            </div>
          </div>
          
          <div className="flex items-center gap-2 px-3 py-1.5 bg-secondary rounded-full">
            <Eye className="w-4 h-4 text-primary" />
            <span className="text-sm font-medium text-foreground">100% Transparent</span>
          </div>
        </div>
      </div>
    </header>
  );
}
