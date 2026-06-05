"use client";

import { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import Sidebar from "@/components/Sidebar";
import Topbar from "@/components/Topbar";
import StepIndicator from "@/components/budget/StepIndicator";
import Step1InputData from "@/components/budget/Step1InputData";
import Step2Strategy from "@/components/budget/Step2Strategy";
import Step3SmartMatching from "@/components/budget/Step3SmartMatching";
import Step4Briefing from "@/components/budget/Step4Briefing";
import {
  fetchStrategies,
  fetchInfluencers,
  fetchBriefingTemplates,
  createBriefingTemplate,
} from "@/services/budgetService";
import { createCampaignFromBudgetForm } from "@/services/managedCampaignService";
import { notifyManagedCampaignsUpdated } from "@/hooks/useManagedCampaigns";
import { useBudgetForm, validateStep1 } from "@/hooks/useBudgetForm";
import type {
  Strategy,
  Influencer,
  BriefingTemplate,
  CampaignFormErrors,
} from "@/types";

export default function BudgetPage() {
  const router = useRouter();
  const { form, setForm, resetForm } = useBudgetForm();
  const [step, setStep] = useState(0);
  const [step1Errors, setStep1Errors] = useState<CampaignFormErrors>({});

  // Step 2 — Strategies
  const [strategies, setStrategies] = useState<Strategy[]>([]);
  const [strategiesLoading, setStrategiesLoading] = useState(false);
  const [strategiesError, setStrategiesError] = useState<string | null>(null);
  const [selectedStrategyId, setSelectedStrategyId] = useState<string | null>(null);

  // Step 3 — Influencers
  const [influencers, setInfluencers] = useState<Influencer[]>([]);
  const [influencersLoading, setInfluencersLoading] = useState(false);
  const [influencersError, setInfluencersError] = useState<string | null>(null);
  // Influencer yang dipilih user di Step 3
  const [selectedInfluencers, setSelectedInfluencers] = useState<Influencer[]>([]);

  // Step 4 — Templates
  const [templates, setTemplates] = useState<BriefingTemplate[]>([]);
  const [templatesLoading, setTemplatesLoading] = useState(false);
  const [templatesError, setTemplatesError] = useState<string | null>(null);

  const [generating, setGenerating] = useState(false);
  const [finishing, setFinishing] = useState(false);

  const loadStrategies = useCallback(async () => {
    setStrategiesLoading(true);
    setStrategiesError(null);
    try {
      const data = await fetchStrategies();
      setStrategies(data);
    } catch (e) {
      setStrategiesError(e instanceof Error ? e.message : "Gagal memuat strategi");
    } finally {
      setStrategiesLoading(false);
    }
  }, []);

  const loadInfluencers = useCallback(async () => {
    setInfluencersLoading(true);
    setInfluencersError(null);
    try {
      const data = await fetchInfluencers();
      setInfluencers(data);
    } catch (e) {
      setInfluencersError(e instanceof Error ? e.message : "Gagal memuat influencer");
    } finally {
      setInfluencersLoading(false);
    }
  }, []);

  const loadTemplates = useCallback(async () => {
    setTemplatesLoading(true);
    setTemplatesError(null);
    try {
      const data = await fetchBriefingTemplates();
      setTemplates(data);
    } catch (e) {
      setTemplatesError(e instanceof Error ? e.message : "Gagal memuat template");
    } finally {
      setTemplatesLoading(false);
    }
  }, []);

  useEffect(() => {
    if (step === 1 && strategies.length === 0) loadStrategies();
    if (step === 2 && influencers.length === 0) loadInfluencers();
    if (step === 3 && templates.length === 0) loadTemplates();
  }, [step, strategies.length, influencers.length, templates.length, loadStrategies, loadInfluencers, loadTemplates]);

  
  const handleGenerateStrategy = async () => {
    const errors = validateStep1(form);
    if (Object.keys(errors).length > 0) {
      setStep1Errors(errors);
      const firstErrorKey = Object.keys(errors)[0];
      const el = document.getElementById(`field-${firstErrorKey}`);
      if (el) el.focus();
      return;
    }
    setStep1Errors({});
    setGenerating(true);
    await new Promise((r) => setTimeout(r, 1200));
    setGenerating(false);
    setStep(1);
  };

  const handlePilihStrategy = (id: string) => {
    setSelectedStrategyId(id);
    setStep(2);
  };

  const selectedStrategy =
    strategies.find((s) => s.id === selectedStrategyId) ?? strategies[0];

  const handleSaveTemplate = async (data: Omit<BriefingTemplate, "id">) => {
    const newTpl = await createBriefingTemplate(data);
    setTemplates((prev) => [...prev, newTpl]);
  };

  
  const handleFinish = async () => {
    if (finishing) return;
    setFinishing(true);
    try {
      await createCampaignFromBudgetForm({
        form,
        selectedStrategy: selectedStrategy ?? null,
        selectedInfluencers,
        briefingText: `Briefing untuk kampanye "${form.namaCampaign}"`,
      });
      
      notifyManagedCampaignsUpdated();
      
      setStep(0);
      resetForm();
      setSelectedStrategyId(null);
      setSelectedInfluencers([]);
      
      router.push("/campaigns");
    } catch (e) {
      console.error("Gagal membuat kampanye:", e);
      alert("Gagal menyimpan kampanye. Silakan coba lagi.");
    } finally {
      setFinishing(false);
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-50 font-['Inter']">
      <Sidebar />

      <div className="flex-1 flex flex-col min-w-0">
        <Topbar />

        {/* Sticky Wizard */}
        <div className="sticky top-16 z-20 bg-gray-50 border-b border-gray-100 px-6 pt-4 pb-3">
          <div className="flex items-center gap-2 mb-3">
            <h1 className="text-xl font-bold text-gray-900">Budget Optimization</h1>
            {finishing && (
              <span className="text-sm text-blue-600 animate-pulse ml-2">
                Menyimpan kampanye…
              </span>
            )}
          </div>
          <StepIndicator currentStep={step} />
        </div>

        {/* Scrollable content */}
        <main className="flex-1 overflow-auto p-6 md:p-8">
          {step === 0 && (
            <Step1InputData
              form={form}
              errors={step1Errors}
              onChange={setForm}
              onNext={handleGenerateStrategy}
              loading={generating}
            />
          )}

          {step === 1 && (
            <Step2Strategy
              strategies={strategies}
              loading={strategiesLoading}
              error={strategiesError}
              form={form}
              onPilih={handlePilihStrategy}
            />
          )}

          {step === 2 && selectedStrategy && (
            <Step3SmartMatching
              strategy={selectedStrategy}
              influencers={influencers}
              loading={influencersLoading}
              error={influencersError}
              onBack={() => setStep(1)}
              onNext={(selected?: Influencer[]) => {
                // Step3SmartMatching mungkin meneruskan influencer terpilih.
                // Jika tidak, kita simpan semua influencer yang sudah di-fetch.
                if (selected && selected.length > 0) {
                  setSelectedInfluencers(selected);
                } else if (influencers.length > 0) {
                  setSelectedInfluencers(influencers.slice(0, 3));
                }
                setStep(3);
              }}
            />
          )}

          {step === 3 && (
            <Step4Briefing
              templates={templates}
              loading={templatesLoading}
              error={templatesError}
              onBack={() => setStep(2)}
              onFinish={handleFinish}
              onSaveTemplate={handleSaveTemplate}
            />
          )}
        </main>
      </div>
    </div>
  );
}