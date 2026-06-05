"use client";
import { useState } from "react";
import { Link2, Loader2, AlertCircle, RefreshCw } from "lucide-react";
import Sidebar from "@/components/Sidebar";
import Topbar from "@/components/Topbar";
import AnalysisResultCard from "@/components/fake-followers/AnalysisResultCard";
import { analyzeAccount } from "@/services/fakeFollowersService";
import type { FakeFollowersResult } from "@/types";

const COIN_COST = 15;

function ResultSkeleton() {
  return (
    <div className="w-full bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden animate-pulse">
      <div className="flex flex-col md:flex-row gap-6 p-6 pb-5 border-b border-gray-100">
        <div className="flex items-center gap-4 flex-1">
          <div className="w-[72px] h-[72px] rounded-full bg-gray-200 shrink-0" />
          <div className="flex flex-col gap-2 flex-1">
            <div className="h-5 bg-gray-200 rounded-full w-40" />
            <div className="h-3 bg-gray-200 rounded-full w-24" />
            <div className="h-3 bg-gray-200 rounded-full w-32" />
          </div>
        </div>
        <div className="flex items-center gap-8">
          {[1,2,3].map((i) => (
            <div key={i} className="flex flex-col items-center gap-1">
              <div className="h-5 bg-gray-200 rounded-full w-14" />
              <div className="h-3 bg-gray-200 rounded-full w-16" />
            </div>
          ))}
        </div>
      </div>
      <div className="flex flex-col md:flex-row gap-6 p-6 border-b border-gray-100">
        <div className="w-36 h-36 rounded-full bg-gray-200 mx-auto md:mx-0" />
        <div className="flex-1 flex flex-col gap-4 justify-center">
          <div className="h-4 bg-gray-200 rounded-full w-32" />
          <div className="h-4 bg-gray-200 rounded-full w-full" />
          <div className="h-3 bg-gray-200 rounded-full w-3/4" />
        </div>
      </div>
      <div className="grid grid-cols-3 divide-x divide-gray-100">
        {[1,2,3].map((i) => (
          <div key={i} className="flex flex-col items-center py-4 gap-1">
            <div className="h-5 bg-gray-200 rounded-full w-16" />
            <div className="h-3 bg-gray-200 rounded-full w-24" />
          </div>
        ))}
      </div>
    </div>
  );
}

export default function FakeFollowersPage() {
  const [url, setUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<FakeFollowersResult | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [inputError, setInputError] = useState<string | null>(null);

  const handleAnalyze = async () => {
    if (!url.trim()) {
      setInputError("Masukkan link profil terlebih dahulu.");
      return;
    }
    const isValidUrl =
      url.includes("instagram.com") || url.includes("tiktok.com") ||
      url.includes("youtube.com") || url.includes("youtu.be") ||
      url.startsWith("http");
    if (!isValidUrl) {
      setInputError("Link tidak valid. Masukkan URL Instagram, TikTok, atau YouTube.");
      return;
    }
    setInputError(null);
    setError(null);
    setResult(null);
    setLoading(true);
    try {
      const data = await analyzeAccount(url.trim());
      setResult(data);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Analisis gagal, coba lagi.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-50 font-['Inter']">
      <Sidebar />
      <div className="flex-1 flex flex-col min-w-0">
        <Topbar />
        <main className="flex-1 px-4 py-8 md:px-10 md:py-10 overflow-auto">
          <div className="text-center mb-8">
            <h1 className="text-2xl md:text-3xl font-bold text-gray-900">Fake Followers Detection</h1>
            <p className="text-gray-500 text-sm mt-1.5">
              Periksa keaslian audiens influencer sebelum melakukan kolaborasi.
            </p>
          </div>

          <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-5 mb-6">
            <div className="flex flex-col sm:flex-row gap-3">
              <div className="flex-1 relative">
                <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
                  <Link2 className="w-4 h-4 text-gray-400" />
                </div>
                <input
                  type="url" value={url}
                  onChange={(e) => { setUrl(e.target.value); setInputError(null); }}
                  onKeyDown={(e) => e.key === "Enter" && handleAnalyze()}
                  placeholder="Paste Instagram / TikTok / YouTube profile link"
                  className={`w-full pl-9 pr-4 py-2.5 rounded-xl text-sm border outline-none transition-colors
                    ${inputError ? "border-red-400 bg-red-50" : "border-gray-200 bg-gray-50 focus:border-blue-400 focus:bg-white"}`}
                  disabled={loading}
                />
              </div>
              <button onClick={handleAnalyze} disabled={loading}
                className="flex items-center justify-center gap-2 px-5 py-2.5 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white font-semibold text-sm rounded-xl transition-colors shrink-0 cursor-pointer disabled:cursor-not-allowed">
                {loading ? (
                  <><Loader2 className="w-4 h-4 animate-spin" /> Menganalisis...</>
                ) : (
                  <>Analyze Account
                    <span className="flex items-center gap-1 bg-blue-500 rounded-full px-2 py-0.5 text-xs">
                      <span className="w-3.5 h-3.5 rounded-full bg-white/20 flex items-center justify-center text-[9px] font-bold">$</span>
                      {COIN_COST}
                    </span>
                  </>
                )}
              </button>
            </div>
            {inputError && (
              <p className="flex items-center gap-1.5 mt-2.5 text-xs text-red-600">
                <AlertCircle className="w-3.5 h-3.5 shrink-0" />{inputError}
              </p>
            )}
          </div>

          <div className="max-w-3xl mx-auto w-full">
            {loading && <ResultSkeleton />}
            {!loading && error && (
              <div className="flex flex-col items-center gap-4 py-16 text-center">
                <AlertCircle className="w-12 h-12 text-red-400" />
                <p className="text-sm text-gray-500">{error}</p>
                <button onClick={handleAnalyze}
                  className="flex items-center gap-2 px-5 py-2 bg-blue-600 text-white rounded-xl text-sm font-medium hover:bg-blue-700">
                  <RefreshCw className="w-4 h-4" /> Coba Lagi
                </button>
              </div>
            )}
            {!loading && result && (
              <div className="flex flex-col gap-4">
                <AnalysisResultCard data={result} />
                <div className="flex justify-center">
                  <button onClick={() => { setResult(null); setUrl(""); }}
                    className="text-sm text-gray-500 hover:text-blue-600 underline underline-offset-2">
                    Analisis akun lain
                  </button>
                </div>
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
}
