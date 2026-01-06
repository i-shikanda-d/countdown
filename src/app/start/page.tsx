'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { StepLayout } from '@/components/ui/StepLayout';
import { useCountdownStore, CountdownType } from '@/lib/store';

const PRESET_TYPES: CountdownType[] = [
  'Birthday',
  'Anniversary',
  'Event',
  'Holiday',
  'Launch',
];

export default function StartPage() {
  const router = useRouter();
  const {
    type: selectedType,
    label,
    setType,
    setLabel,
  } = useCountdownStore();
  const [isEditingCustom, setIsEditingCustom] = useState(false);
  const [customValue, setCustomValue] = useState(label || '');
  const [error, setError] = useState('');

  const handlePresetClick = (preset: CountdownType) => {
    setIsEditingCustom(false);
    setType(preset);
    setLabel(preset);
    setError('');
  };

  const handleCustomClick = () => {
    setIsEditingCustom(true);
    if (selectedType === 'Custom') {
      setCustomValue(label);
    }
  };

  const handleCustomSave = () => {
    if (!customValue.trim()) {
      setError('Please enter a label');
      return;
    }
    setType('Custom');
    setLabel(customValue.trim());
    setIsEditingCustom(false);
    setError('');
  };

  const handleNext = () => {
    if (!label.trim()) {
      setError('Please select or enter a label');
      return;
    }
    router.push('/date');
  };

  return (
    <StepLayout step={1} totalSteps={3} title="What are we counting down?">
      <div className="space-y-4">
        {/* Presets */}
        <fieldset className="space-y-2" aria-label="Preset countdown types">
          {PRESET_TYPES.map((preset) => (
            <label
              key={preset}
              className={`w-full p-4 rounded-lg border-2 flex items-center gap-3 cursor-pointer transition-all duration-200 ${
                selectedType === preset
                  ? 'border-blue-600 bg-blue-50 text-blue-900 dark:bg-[color:var(--surface)] dark:text-[color:var(--accent)]'
                  : 'border-slate-200 text-slate-700 hover:border-slate-300 dark:border-[color:var(--muted)] dark:text-[color:var(--muted)] dark:hover:border-[color:var(--muted)]'
              }`}
            >
              <input
                type="radio"
                name="preset"
                value={preset}
                checked={selectedType === preset}
                onChange={() => handlePresetClick(preset)}
                className="sr-only"
                aria-checked={selectedType === preset}
              />
              <span className="flex-1">{preset}</span>
              <span className="text-sm text-slate-500">{selectedType === preset ? 'Selected' : ''}</span>
            </label>
          ))}
        </fieldset>

        {/* Custom UI */}
        {isEditingCustom ? (
          <div className="space-y-3 p-4 bg-slate-50 rounded-lg border-2 border-slate-300">
            <label className="block text-sm font-semibold text-slate-700">
              Enter custom label
            </label>
            <input
              type="text"
              value={customValue}
              onChange={(e) => setCustomValue(e.target.value)}
              className="w-full text-black px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-600"
              autoFocus
              placeholder="e.g., Mom's Birthday"
            />
            <div className="flex gap-2">
              <button
                onClick={handleCustomSave}
                className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-lg"
              >
                Save
              </button>
              <button
                onClick={() => setIsEditingCustom(false)}
                className="flex-1 bg-slate-300 hover:bg-slate-400 text-slate-800 font-semibold py-2 rounded-lg"
              >
                Cancel
              </button>
            </div>
          </div>
        ) : (
          <button
            onClick={handleCustomClick}
            className={`w-full p-4 rounded-lg border-2 text-left font-semibold transition-all duration-200 ${
              selectedType === 'Custom'
                ? 'border-blue-600 bg-blue-50 text-blue-900'
                : 'border-slate-300 text-slate-700 hover:border-slate-400'
            }`}
          >
            {selectedType === 'Custom'
              ? `✏️ ${label}`
              : '✏️ Custom Label'}
          </button>
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