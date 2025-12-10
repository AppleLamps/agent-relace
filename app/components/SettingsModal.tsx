'use client';

import { useState, useEffect } from 'react';
import { AVAILABLE_MODELS } from '../lib/constants';

interface SettingsModalProps {
    isOpen: boolean;
    onClose: () => void;
    currentModel: string;
    onModelChange: (modelId: string) => void;
}

export default function SettingsModal({ isOpen, onClose, currentModel, onModelChange }: SettingsModalProps) {
    const [selectedModel, setSelectedModel] = useState(currentModel);

    useEffect(() => {
        setSelectedModel(currentModel);
    }, [currentModel]);

    const handleSave = () => {
        onModelChange(selectedModel);
        onClose();
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
            {/* Backdrop */}
            <div
                className="absolute inset-0 bg-black/50 backdrop-blur-sm"
                onClick={onClose}
            />

            {/* Modal */}
            <div className="relative bg-white rounded-2xl shadow-2xl max-w-lg w-full mx-4 max-h-[90vh] overflow-hidden">
                {/* Header */}
                <div className="flex items-center justify-between p-6 border-b border-gray-100">
                    <div>
                        <h2 className="text-xl font-semibold text-gray-900 tracking-tight">Settings</h2>
                        <p className="text-sm text-gray-500 mt-1">Configure your chat experience</p>
                    </div>
                    <button
                        onClick={onClose}
                        className="p-2 rounded-xl hover:bg-gray-100 transition-colors"
                        aria-label="Close settings"
                    >
                        <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>

                {/* Content */}
                <div className="p-6 overflow-y-auto max-h-[60vh]">
                    <div className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-3">
                                AI Model
                            </label>
                            <div className="space-y-2">
                                {AVAILABLE_MODELS.map((model) => (
                                    <button
                                        key={model.id}
                                        onClick={() => setSelectedModel(model.id)}
                                        className={`w-full p-4 rounded-xl border-2 text-left transition-all duration-200 ${selectedModel === model.id
                                                ? 'border-gray-900 bg-gray-50'
                                                : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                                            }`}
                                    >
                                        <div className="flex items-start justify-between">
                                            <div className="flex-1">
                                                <div className="flex items-center gap-2">
                                                    <span className="font-medium text-gray-900">{model.name}</span>
                                                    {model.badge && (
                                                        <span className="px-2 py-0.5 text-xs font-medium bg-green-100 text-green-700 rounded-full">
                                                            {model.badge}
                                                        </span>
                                                    )}
                                                </div>
                                                <p className="text-xs text-gray-500 mt-0.5">{model.provider}</p>
                                                <p className="text-sm text-gray-600 mt-1">{model.description}</p>
                                                <div className="flex gap-3 mt-2">
                                                    <span className="text-xs text-gray-400">
                                                        Context: <span className="text-gray-600 font-medium">{model.context}</span>
                                                    </span>
                                                    <span className="text-xs text-gray-400">
                                                        Output: <span className="text-gray-600 font-medium">{model.output}</span>
                                                    </span>
                                                </div>
                                            </div>
                                            <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0 mt-1 ${selectedModel === model.id
                                                    ? 'border-gray-900 bg-gray-900'
                                                    : 'border-gray-300'
                                                }`}>
                                                {selectedModel === model.id && (
                                                    <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                                                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                                    </svg>
                                                )}
                                            </div>
                                        </div>
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Footer */}
                <div className="flex items-center justify-end gap-3 p-6 border-t border-gray-100 bg-gray-50">
                    <button
                        onClick={onClose}
                        className="px-4 py-2.5 text-sm font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-100 rounded-xl transition-colors"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={handleSave}
                        className="px-5 py-2.5 text-sm font-medium text-white bg-gray-900 hover:bg-gray-800 rounded-xl transition-colors shadow-lg shadow-gray-900/20"
                    >
                        Save Changes
                    </button>
                </div>
            </div>
        </div>
    );
}
