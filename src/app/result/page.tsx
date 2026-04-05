import type { AdvancedInput } from '@/types';
import ResultView from './ResultView';

const fallbackInput: AdvancedInput = {
  profile: { currentAge: 35, retirementAge: 55, lifeExpectancy: 90 },
  cashFlow: { annualIncome: 700, annualExpense: 420, retirementExpense: 300 },
  assets: [
    { id: 'nisa', label: 'NISA・インデックス投資', currentBalance: 800, annualContribution: 120, expectedReturn: 0.05 },
    { id: 'savings', label: '預貯金', currentBalance: 300, annualContribution: 60, expectedReturn: 0.001 },
  ],
  debts: [
    { id: 'mortgage', label: '住宅ローン', type: 'mortgage', startAge: 33, durationYears: 35, principal: 3500, annualRate: 0.005 },
  ],
  educationPlans: [
    { currentAge: 3, stages: { nursery: 'public', preschool: 'public', elementary: 'public', juniorHigh: 'public', highSchool: 'public', university: 'private' } },
  ],
};

export default function ResultPage() {
  return (
    <main className="max-w-3xl mx-auto px-4 py-8">
      <ResultView fallbackInput={fallbackInput} />
      <footer className="text-center mt-8 text-xs text-gray-400">
        ※ このシミュレーターは教育目的です。実際の投資判断は専門家にご相談ください。
      </footer>
    </main>
  );
}
