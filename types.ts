import { TABS } from './constants';

export type ActiveTab = typeof TABS[keyof typeof TABS];

export interface PhishingCharacteristic {
  feature: string;
  explanation: string;
  suspiciousText: string;
}

export interface AnalysisResultType {
  riskLevel: 'Low' | 'Medium' | 'High';
  summary: string;
  characteristics: PhishingCharacteristic[];
}