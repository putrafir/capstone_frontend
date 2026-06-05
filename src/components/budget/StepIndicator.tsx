"use client";

import { Rocket, CheckCircle, Zap, FileText } from "lucide-react";

interface Step {
  label: string;
  sub: string;
  icon: React.ReactNode;
}

const STEPS: Step[] = [
  { label: "Input Data", sub: "Persiapan", icon: <Rocket className="w-4 h-4" /> },
  { label: "Memulai Optimasi", sub: "Memilih Strategi Kampanye", icon: <CheckCircle className="w-4 h-4" /> },
  { label: "Smart Matching", sub: "List influencer yang sesuai strategi", icon: <Zap className="w-4 h-4" /> },
  { label: "Briefing Kampanye", sub: "Kasih tau apa yang harus di lakukan influencer", icon: <FileText className="w-4 h-4" /> },
];

interface StepIndicatorProps {
  currentStep: number; // 0-based
}

export default function StepIndicator({ currentStep }: StepIndicatorProps) {
  return (
    <div className="flex items-start justify-center gap-0">
      {STEPS.map((step, i) => {
        const done = i < currentStep;
        const active = i === currentStep;
        return (
          <div key={i} className="flex items-start">
            {/* Step node */}
            <div className="flex flex-col items-center gap-1.5">
              <div
                className={`w-9 h-9 rounded-full flex items-center justify-center border-2 transition-all z-10 ${
                  done || active
                    ? "bg-blue-600 border-blue-600 text-white"
                    : "bg-white border-gray-300 text-gray-400"
                }`}
              >
                {done ? <CheckCircle className="w-4 h-4" /> : step.icon}
              </div>
              <div className="text-center max-w-[100px]">
                <p className={`text-xs font-semibold leading-tight ${active || done ? "text-gray-800" : "text-gray-400"}`}>
                  {step.label}
                </p>
                <p className="text-[10px] text-gray-400 leading-tight mt-0.5">{step.sub}</p>
              </div>
            </div>
            {/* Connector line */}
            {i < STEPS.length - 1 && (
              <div className={`h-0.5 w-16 md:w-24 mt-4 mx-1 flex-shrink-0 ${i < currentStep ? "bg-blue-600" : "bg-gray-200"}`} />
            )}
          </div>
        );
      })}
    </div>
  );
}