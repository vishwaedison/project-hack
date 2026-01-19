import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { TransactionData } from '@/lib/fraudDetection';
import { DollarSign, Globe, Clock, Smartphone, ShoppingBag } from 'lucide-react';

interface TransactionFormProps {
  onSubmit: (data: TransactionData) => void;
  isLoading?: boolean;
}

export function TransactionForm({ onSubmit, isLoading }: TransactionFormProps) {
  const [formData, setFormData] = useState({
    transactionAmount: '',
    averageAmount: '',
    transactionCountry: '',
    homeCountry: '',
    merchantCategory: '',
    timeSinceLastTransaction: '',
    isNewDevice: false,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({
      transactionAmount: parseFloat(formData.transactionAmount) || 0,
      averageAmount: parseFloat(formData.averageAmount) || 0,
      transactionCountry: formData.transactionCountry,
      homeCountry: formData.homeCountry,
      merchantCategory: formData.merchantCategory,
      timeSinceLastTransaction: parseFloat(formData.timeSinceLastTransaction) || 0,
      isNewDevice: formData.isNewDevice,
    });
  };

  const updateField = (field: string, value: string | boolean) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const isFormValid = 
    formData.transactionAmount && 
    formData.averageAmount && 
    formData.transactionCountry && 
    formData.homeCountry && 
    formData.merchantCategory && 
    formData.timeSinceLastTransaction !== '';

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Amount Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="transactionAmount" className="flex items-center gap-2 text-sm font-medium">
            <DollarSign className="w-4 h-4 text-fintech-slate" />
            Transaction Amount
          </Label>
          <div className="relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">$</span>
            <Input
              id="transactionAmount"
              type="number"
              step="0.01"
              min="0"
              placeholder="0.00"
              className="pl-7"
              value={formData.transactionAmount}
              onChange={(e) => updateField('transactionAmount', e.target.value)}
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="averageAmount" className="flex items-center gap-2 text-sm font-medium">
            <DollarSign className="w-4 h-4 text-fintech-slate" />
            Typical Average Amount
          </Label>
          <div className="relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">$</span>
            <Input
              id="averageAmount"
              type="number"
              step="0.01"
              min="0"
              placeholder="0.00"
              className="pl-7"
              value={formData.averageAmount}
              onChange={(e) => updateField('averageAmount', e.target.value)}
            />
          </div>
        </div>
      </div>

      {/* Location Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="transactionCountry" className="flex items-center gap-2 text-sm font-medium">
            <Globe className="w-4 h-4 text-fintech-slate" />
            Transaction Country
          </Label>
          <Input
            id="transactionCountry"
            type="text"
            placeholder="e.g., United States"
            value={formData.transactionCountry}
            onChange={(e) => updateField('transactionCountry', e.target.value)}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="homeCountry" className="flex items-center gap-2 text-sm font-medium">
            <Globe className="w-4 h-4 text-fintech-slate" />
            Home Country
          </Label>
          <Input
            id="homeCountry"
            type="text"
            placeholder="e.g., United States"
            value={formData.homeCountry}
            onChange={(e) => updateField('homeCountry', e.target.value)}
          />
        </div>
      </div>

      {/* Category and Time Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="merchantCategory" className="flex items-center gap-2 text-sm font-medium">
            <ShoppingBag className="w-4 h-4 text-fintech-slate" />
            Merchant Category
          </Label>
          <Select
            value={formData.merchantCategory}
            onValueChange={(value) => updateField('merchantCategory', value)}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select category" />
            </SelectTrigger>
            <SelectContent className="bg-card">
              <SelectItem value="groceries">Groceries</SelectItem>
              <SelectItem value="electronics">Electronics</SelectItem>
              <SelectItem value="travel">Travel</SelectItem>
              <SelectItem value="luxury">Luxury</SelectItem>
              <SelectItem value="other">Other</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="timeSinceLastTransaction" className="flex items-center gap-2 text-sm font-medium">
            <Clock className="w-4 h-4 text-fintech-slate" />
            Time Since Last Transaction
          </Label>
          <div className="relative">
            <Input
              id="timeSinceLastTransaction"
              type="number"
              min="0"
              placeholder="0"
              value={formData.timeSinceLastTransaction}
              onChange={(e) => updateField('timeSinceLastTransaction', e.target.value)}
            />
            <span className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground text-sm">min</span>
          </div>
        </div>
      </div>

      {/* Device Toggle */}
      <div className="flex items-center justify-between p-4 bg-secondary/50 rounded-lg">
        <div className="flex items-center gap-3">
          <Smartphone className="w-5 h-5 text-fintech-slate" />
          <div>
            <Label htmlFor="newDevice" className="text-sm font-medium">New Device</Label>
            <p className="text-sm text-muted-foreground">Is this transaction from a new device?</p>
          </div>
        </div>
        <Switch
          id="newDevice"
          checked={formData.isNewDevice}
          onCheckedChange={(checked) => updateField('isNewDevice', checked)}
        />
      </div>

      {/* Submit Button */}
      <Button 
        type="submit" 
        className="w-full h-12 text-base font-medium"
        disabled={!isFormValid || isLoading}
      >
        {isLoading ? 'Analyzing...' : 'Analyze Transaction'}
      </Button>
    </form>
  );
}
