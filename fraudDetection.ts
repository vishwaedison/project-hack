export interface TransactionData {
  transactionAmount: number;
  averageAmount: number;
  transactionCountry: string;
  homeCountry: string;
  merchantCategory: string;
  timeSinceLastTransaction: number;
  isNewDevice: boolean;
}

export interface FraudRule {
  id: string;
  name: string;
  points: number;
  triggered: boolean;
  explanation: string;
  suggestion: string;
}

export interface FraudResult {
  score: number;
  riskLevel: 'low' | 'medium' | 'high';
  triggeredRules: FraudRule[];
  suggestions: string[];
}

export function analyzeFraud(data: TransactionData): FraudResult {
  const rules: FraudRule[] = [];
  let totalScore = 0;

  // Rule 1: Transaction amount is more than 2× the user's average
  const amountRatio = data.transactionAmount / data.averageAmount;
  if (amountRatio > 2) {
    const points = 30;
    totalScore += points;
    rules.push({
      id: 'high-amount',
      name: 'Unusually High Amount',
      points,
      triggered: true,
      explanation: `The transaction amount ($${data.transactionAmount.toFixed(2)}) is ${amountRatio.toFixed(1)}× higher than your usual spending average ($${data.averageAmount.toFixed(2)}).`,
      suggestion: `Consider making smaller transactions closer to your usual spending of $${data.averageAmount.toFixed(2)}.`,
    });
  }

  // Rule 2: Transaction country differs from home country
  if (data.transactionCountry.toLowerCase().trim() !== data.homeCountry.toLowerCase().trim()) {
    const points = 25;
    totalScore += points;
    rules.push({
      id: 'foreign-country',
      name: 'International Transaction',
      points,
      triggered: true,
      explanation: `This transaction is from ${data.transactionCountry}, but your home country is ${data.homeCountry}.`,
      suggestion: `If traveling, notify your bank in advance about your travel plans to avoid flags on legitimate transactions.`,
    });
  }

  // Rule 3: New device used
  if (data.isNewDevice) {
    const points = 20;
    totalScore += points;
    rules.push({
      id: 'new-device',
      name: 'New Device Detected',
      points,
      triggered: true,
      explanation: 'This transaction was made from a device you haven\'t used before.',
      suggestion: 'Use a device you\'ve previously used for transactions, or verify your identity through your bank\'s app first.',
    });
  }

  // Rule 4: Time since last transaction is less than 5 minutes
  if (data.timeSinceLastTransaction < 5) {
    const points = 15;
    totalScore += points;
    rules.push({
      id: 'rapid-transaction',
      name: 'Rapid Consecutive Transaction',
      points,
      triggered: true,
      explanation: `Only ${data.timeSinceLastTransaction} minute${data.timeSinceLastTransaction === 1 ? '' : 's'} passed since your last transaction.`,
      suggestion: 'Wait at least 5 minutes between transactions to establish a normal spending pattern.',
    });
  }

  // Rule 5: Merchant category is luxury or travel
  if (['luxury', 'travel'].includes(data.merchantCategory.toLowerCase())) {
    const points = 10;
    totalScore += points;
    rules.push({
      id: 'high-risk-category',
      name: 'High-Risk Merchant Category',
      points,
      triggered: true,
      explanation: `${data.merchantCategory.charAt(0).toUpperCase() + data.merchantCategory.slice(1)} purchases are more frequently associated with fraud attempts.`,
      suggestion: 'For luxury or travel purchases, consider using a verified payment method or contacting your bank beforehand.',
    });
  }

  // Cap the total score at 100
  const cappedScore = Math.min(totalScore, 100);

  // Determine risk level
  let riskLevel: 'low' | 'medium' | 'high';
  if (cappedScore <= 30) {
    riskLevel = 'low';
  } else if (cappedScore <= 60) {
    riskLevel = 'medium';
  } else {
    riskLevel = 'high';
  }

  // Gather suggestions from triggered rules
  const suggestions = rules.map(rule => rule.suggestion);

  return {
    score: cappedScore,
    riskLevel,
    triggeredRules: rules,
    suggestions,
  };
}

export function getRiskLevelDisplay(level: 'low' | 'medium' | 'high') {
  switch (level) {
    case 'low':
      return { label: 'Low Risk', description: 'This transaction appears safe', color: 'low' };
    case 'medium':
      return { label: 'Medium Risk', description: 'Some concerns detected - review recommended', color: 'medium' };
    case 'high':
      return { label: 'High Risk', description: 'Multiple red flags detected - verification required', color: 'high' };
  }
}
