/**
 * /start page
 * First step: Select countdown type/label
 */

'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { StepLayout } from '@/components/ui/StepLayout';
import { useCountdownStore } from '@/lib/store';

const PRESET_TYPES = ['Birthday', 'Anniversary', 'Event', 'Holiday', 'Launch'];

export default function StartPage() {
  const router = useRouter();
  const { type: selectedType, label, setType, setLabel } = useCountdownStore();
  const [showCustom, setShowCustom] = useState(false);
  const [customLabel, setCustomLabel] = useState(label);
  const [error, setError] = useState('');

  const handleTypeSelect = (selectedPreset: string) => {
    setShowCustom(false);
    setType(selectedPreset as 'Birthday' | 'Anniversary' | 'Event' | 'Holiday' | 'Launch' | 'Custom');
    setLabel(selectedPreset);
  };

  const handleCustomLabelChange = (value: string) => {
    setCustomLabel(value);
  };

  const handleCustomSubmit = () => {
    if (!customLabel.trim()) {
      setError('Please enter a label');
      return;
    }
    setType('Custom');
    setLabel(customLabel);
    setShowCustom(false);
  };

  const handleNext = () => {
    const finalLabel = showCustom ? customLabel : label;
    if (!finalLabel.trim()) {
      setError('Please select or enter a label');
      return;
    }
    router.push('/date');
  };

  return (
    <StepLayout step={1} totalSteps={3} title="What are we counting down?">
      <div className="space-y-4">
        {/* Preset options */}
        {PRESET_TYPES.map((preset) => (
          <button
            key={preset}
            onClick={() => handleTypeSelect(preset)}
            className={`w-full p-4 rounded-lg border-2 text-left font-semibold transition-all duration-200 ${
              selectedType === preset && !showCustom
                ? 'border-blue-600 bg-blue-50 text-blue-900'
                : 'border-slate-200 text-slate-700 hover:border-slate-300'
            }`}
          >
            {preset === 'Birthday' && '🎂'} {preset === 'Anniversary' && '💕'}{' '}
            {preset === 'Event' && '🎉'} {preset === 'Holiday' && '🎄'}{' '}
            {preset === 'Launch' && '🚀'} {preset}
          </button>
        ))}

        {/* Custom option */}
        {!showCustom ? (
          <button
            onClick={() => setShowCustom(true)}
            className="w-full p-4 rounded-lg border-2 border-slate-300 text-left font-semibold text-slate-700 hover:border-slate-400 transition-all duration-200"
          >
            ✏️ Custom Label
          </button>
        ) : (
          <div className="space-y-3 p-4 bg-slate-50 rounded-lg border-2 border-slate-300">
            <label className="block text-sm font-semibold text-slate-700">
              Enter custom label:
            </label>
            <input
              type="text"
              value={customLabel}
              onChange={(e) => handleCustomLabelChange(e.target.value)}
              placeholder="e.g., Mom's Birthday"
              className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
              autoFocus
            />
            <div className="flex gap-2">
              <button
                onClick={handleCustomSubmit}
                className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-lg transition-colors"
              >
                Set Label
              </button>
              <button
                onClick={() => {
                  setShowCustom(false);
                  setCustomLabel('');
                }}
                className="flex-1 bg-slate-300 hover:bg-slate-400 text-slate-800 font-semibold py-2 rounded-lg transition-colors"
              >
                Cancel
              </button>
            </div>
          </div>
        )}

        {error && <p className="text-red-600 text-sm font-semibold">{error}</p>}
      </div>

      <button
        onClick={handleNext}
        className="w-full mt-8 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg transition-colors"
      >
        Next →
      </button>
    </StepLayout>
  );
}
