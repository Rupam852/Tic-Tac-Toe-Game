/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from "react";
import { motion } from "motion/react";
import { X, Volume2, Moon, Sun, ShieldAlert, Sliders } from "lucide-react";
import { UserSettings } from "../types";
import { playSound } from "../utils/audio";

interface SettingsMenuProps {
  settings: UserSettings;
  setSettings: (settings: UserSettings) => void;
  onClose: () => void;
}

export default function SettingsMenu({ settings, setSettings, onClose }: SettingsMenuProps) {
  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = parseFloat(e.target.value);
    const updated = { ...settings, soundVolume: val };
    setSettings(updated);
    playSound("click", val);
  };

  const toggleDarkMode = () => {
    const updated = { ...settings, darkMode: !settings.darkMode };
    setSettings(updated);
    playSound("click", settings.soundVolume);
  };

  const handleReset = () => {
    const defaults: UserSettings = {
      darkMode: true,
      soundVolume: 0.5,
      hapticFeedback: true,
    };
    setSettings(defaults);
    playSound("click", 0.5);
  };

  return (
    <div id="settings-overlay" className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs">
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 15 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 15 }}
        transition={{ duration: 0.2, ease: "easeOut" }}
        className="relative w-full max-w-md overflow-hidden rounded-2xl bg-white p-6 shadow-2xl transition-colors duration-200 dark:bg-slate-900 border border-slate-200 dark:border-slate-800"
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-100 pb-4 dark:border-slate-800">
          <div className="flex items-center gap-2">
            <Sliders className="h-5 w-5 text-blue-500" />
            <span className="text-lg font-semibold tracking-tight text-slate-900 dark:text-white">
              Preferences & Design
            </span>
          </div>
          <button
            id="close-settings-btn"
            onClick={() => {
              playSound("click", settings.soundVolume);
              onClose();
            }}
            className="rounded-lg p-1 text-slate-400 hover:bg-slate-100 hover:text-slate-600 dark:hover:bg-slate-800 dark:hover:text-slate-300 transition-all hover:scale-110 duration-155 active:scale-95"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Settings Entries */}
        <div className="mt-5 space-y-6">
          {/* Theme Row */}
          <div className="flex items-center justify-between">
            <div className="flex flex-col">
              <span className="text-sm font-medium text-slate-800 dark:text-slate-100">
                Visual Contrast Mode
              </span>
              <span className="text-xs text-slate-500 dark:text-slate-400">
                Toggle dark background for visual comfort
              </span>
            </div>
            <button
              id="theme-toggle"
              onClick={toggleDarkMode}
              className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-350 transition-all hover:bg-slate-200 dark:hover:bg-slate-700 hover:scale-105 active:scale-95 duration-155"
            >
              {settings.darkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
            </button>
          </div>

          {/* Sound FX Row */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <div className="flex flex-col">
                <span className="text-sm font-medium text-slate-800 dark:text-slate-100">
                  Game Sound Effects
                </span>
                <span className="text-xs text-slate-500 dark:text-slate-400">
                  Adjust the Synthesizer sound level
                </span>
              </div>
              <div className="flex items-center gap-1.5 text-slate-500 dark:text-slate-400">
                <Volume2 className="h-4 w-4" />
                <span className="text-xs font-mono">
                  {Math.round(settings.soundVolume * 100)}%
                </span>
              </div>
            </div>
            <input
              id="volume-slider"
              type="range"
              min="0"
              max="1"
              step="0.05"
              value={settings.soundVolume}
              onChange={handleVolumeChange}
              className="h-2 w-full cursor-pointer appearance-none rounded-lg bg-slate-200 accent-blue-500 dark:bg-slate-800"
            />
          </div>

          {/* Accessibility Info Card */}
          <div className="rounded-xl bg-slate-50 p-4 border border-slate-200/50 dark:bg-[#0B1120]/40 dark:border-slate-800/50">
            <div className="flex gap-2.5">
              <ShieldAlert className="h-4 w-4 shrink-0 text-amber-500 mt-0.5" />
              <div className="space-y-1">
                <h4 className="text-xs font-semibold text-slate-800 dark:text-slate-205">
                  Responsive & Inclusive Controls
                </h4>
                <p className="text-xs leading-relaxed text-slate-500 dark:text-slate-400">
                  Designed for both dynamic mouse layouts and standard finger touch targets. Target cells are sized to conform to 44px boundaries to boost overall responsiveness.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-8 flex gap-3 border-t border-slate-105 pt-4 dark:border-slate-800">
          <button
            id="reset-preferences-btn"
            onClick={handleReset}
            className="flex-1 rounded-xl bg-slate-100 py-2.5 text-xs font-semibold text-slate-655 dark:bg-slate-800 dark:text-slate-350 transition-all hover:bg-slate-200 dark:hover:bg-slate-700 hover:scale-[1.02] active:scale-[0.98] duration-155"
          >
            Reset Defaults
          </button>
          <button
            id="save-preferences-btn"
            onClick={() => {
              playSound("click", settings.soundVolume);
              onClose();
            }}
            className="flex-1 rounded-xl bg-blue-600 py-2.5 text-xs font-semibold text-white transition-all hover:bg-blue-500 hover:scale-[1.02] active:scale-[0.98] duration-155 shadow-md shadow-blue-500/10"
          >
            Done
          </button>
        </div>
      </motion.div>
    </div>
  );
}
