"use client";


import { useState } from "react";
import type { BriefingTemplate } from "@/types";
import { Plus, Search, Camera, Music2, Eye } from "lucide-react";

// ── Modal Buat Template ──────────────────────────────────────
interface BriefingModalProps {
  onClose: () => void;
  onSave: (data: Omit<BriefingTemplate, "id">) => void;
  saving: boolean;
}

type ModalStep = 1 | 2;

function BriefingModal({ onClose, onSave, saving }: BriefingModalProps) {
  const [modalStep, setModalStep] = useState<ModalStep>(1);
  const [form, setForm] = useState({
    namaBrand: "",
    namaTemplate: "",
    hashtags: "",
    tagAccount: "",
    linkYellowCart: "",
    draftSubmission: "",
    draftPost: "",
    dos: "",
    donts: "",
  });

  const handleSave = () => {
    onSave({
      ...form,
      platform: {
        instagram: { video: 1, story: 1 },
        tiktok: { video: 1, story: 1 },
      },
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl">
        <div className="flex items-center justify-between px-6 pt-6 pb-4">
          <h3 className="text-lg font-bold text-gray-900">Briefing Kampanye</h3>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center hover:bg-gray-200 text-gray-500 text-lg font-bold"
          >
            ×
          </button>
        </div>

        <div className="px-6 pb-2">
          {modalStep === 1 ? (
            <div className="bg-white rounded-xl border border-gray-100 p-5 space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">Nama Brand</label>
                  <input
                    placeholder="Enter your brand name"
                    value={form.namaBrand}
                    onChange={(e) => setForm((f) => ({ ...f, namaBrand: e.target.value }))}
                    className="w-full px-3.5 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">Nama Template Brief</label>
                  <input
                    placeholder="Enter your campaign name"
                    value={form.namaTemplate}
                    onChange={(e) => setForm((f) => ({ ...f, namaTemplate: e.target.value }))}
                    className="w-full px-3.5 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>

              <div>
                <h4 className="text-sm font-bold text-gray-800 mb-3">Technical Mandatory</h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">Hashtags</label>
                    <input
                      placeholder="Enter your campaign name"
                      value={form.hashtags}
                      onChange={(e) => setForm((f) => ({ ...f, hashtags: e.target.value }))}
                      className="w-full px-3.5 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">Tag Account</label>
                    <input
                      placeholder="Enter tag account"
                      value={form.tagAccount}
                      onChange={(e) => setForm((f) => ({ ...f, tagAccount: e.target.value }))}
                      className="w-full px-3.5 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>
                <div className="mt-3">
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">Link/Yellow Cart</label>
                  <input
                    placeholder="Enter your industry/niche"
                    value={form.linkYellowCart}
                    onChange={(e) => setForm((f) => ({ ...f, linkYellowCart: e.target.value }))}
                    className="w-full px-3.5 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>
            </div>
          ) : (
            <div className="bg-white rounded-xl border border-gray-100 p-5 space-y-4">
              <div>
                <h4 className="text-sm font-bold text-gray-800 mb-3">Timeline</h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">Draft Submission</label>
                    <input
                      type="date"
                      value={form.draftSubmission}
                      onChange={(e) => setForm((f) => ({ ...f, draftSubmission: e.target.value }))}
                      className="w-full px-3.5 py-2.5 border border-gray-200 rounded-lg text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">Draft Post</label>
                    <input
                      type="date"
                      value={form.draftPost}
                      onChange={(e) => setForm((f) => ({ ...f, draftPost: e.target.value }))}
                      className="w-full px-3.5 py-2.5 border border-gray-200 rounded-lg text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>
              </div>
              <div>
                <h4 className="text-sm font-bold text-gray-800 mb-3">{"Do's & Don'ts"}</h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">{"Do's"}</label>
                    <textarea
                      placeholder="Enter your product description here"
                      value={form.dos}
                      onChange={(e) => setForm((f) => ({ ...f, dos: e.target.value }))}
                      rows={4}
                      className="w-full px-3.5 py-2.5 border border-gray-200 rounded-lg text-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">{"Don'ts"}</label>
                    <textarea
                      placeholder="Enter your product description here"
                      value={form.donts}
                      onChange={(e) => setForm((f) => ({ ...f, donts: e.target.value }))}
                      rows={4}
                      className="w-full px-3.5 py-2.5 border border-gray-200 rounded-lg text-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                    />
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="flex gap-3 px-6 py-4">
          <button
            onClick={modalStep === 1 ? onClose : () => setModalStep(1)}
            className="flex items-center gap-1.5 px-6 py-2.5 bg-blue-600 text-white font-semibold rounded-full hover:bg-blue-700 transition-colors"
          >
            « Kembali
          </button>
          {modalStep === 1 ? (
            <button
              onClick={() => setModalStep(2)}
              className="flex items-center gap-1.5 px-6 py-2.5 bg-blue-600 text-white font-semibold rounded-full hover:bg-blue-700 transition-colors"
            >
              Lanjutkan »
            </button>
          ) : (
            <button
              onClick={handleSave}
              disabled={saving}
              className="flex items-center gap-1.5 px-6 py-2.5 bg-blue-600 text-white font-semibold rounded-full hover:bg-blue-700 transition-colors disabled:opacity-60"
            >
              {saving ? (
                <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
              ) : null}
              Simpan Template
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

// ── Template Row ──────────────────────────────────────────────
function TemplateRow({
  template,
  onGunakan,
}: {
  template: BriefingTemplate;
  onGunakan: () => void;
}) {
  const igPlatform = template.platform.instagram;
  const ttPlatform = template.platform.tiktok;

  return (
    <div className="flex items-center justify-between px-5 py-4 bg-white border border-gray-200 rounded-xl hover:border-blue-200 transition-colors">
      <span className="text-sm font-semibold text-gray-900 min-w-[140px]">
        {template.namaTemplate}
      </span>
      <div className="flex items-center gap-4 text-xs text-gray-500 flex-1 justify-center flex-wrap gap-y-1">
        {igPlatform && (
          <span className="flex items-center gap-1">
            <Camera className="w-3.5 h-3.5" />
            {igPlatform.video} video {igPlatform.story} story
          </span>
        )}
        {ttPlatform && (
          <span className="flex items-center gap-1">
            <Music2 className="w-3.5 h-3.5" />
            {ttPlatform.video} video {ttPlatform.story} story
          </span>
        )}
      </div>
      <div className="flex gap-2 shrink-0">
        <button className="flex items-center gap-1 px-4 py-1.5 bg-amber-400 text-white text-xs font-semibold rounded-full hover:bg-amber-500 transition-colors">
          <Eye className="w-3.5 h-3.5" />
          Lihat
        </button>
        <button
          onClick={onGunakan}
          className="flex items-center gap-1 px-4 py-1.5 bg-blue-600 text-white text-xs font-semibold rounded-full hover:bg-blue-700 transition-colors"
        >
          Gunakan →
        </button>
      </div>
    </div>
  );
}

// ── Main Step4 ────────────────────────────────────────────────
interface Step4Props {
  templates: BriefingTemplate[];
  loading: boolean;
  error: string | null;
  onBack: () => void;
  onFinish: () => void;
  onSaveTemplate: (data: Omit<BriefingTemplate, "id">) => Promise<void>;
}

export default function Step4Briefing({
  templates,
  loading,
  error,
  onBack,
  onFinish,
  onSaveTemplate,
}: Step4Props) {
  const [showModal, setShowModal] = useState(false);
  const [saving, setSaving] = useState(false);
  const [search, setSearch] = useState("");

  const filtered = templates.filter((t) =>
    t.namaTemplate.toLowerCase().includes(search.toLowerCase())
  );

  const handleSave = async (data: Omit<BriefingTemplate, "id">) => {
    setSaving(true);
    try {
      await onSaveTemplate(data);
      setShowModal(false);
    } finally {
      setSaving(false);
    }
  };

  return (
    <>
      {showModal && (
        <BriefingModal
          onClose={() => setShowModal(false)}
          onSave={handleSave}
          saving={saving}
        />
      )}

      <div className="space-y-5">
        {/* Header */}
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-bold text-gray-900">Briefing Kampanye</h2>
          <button
            onClick={() => setShowModal(true)}
            className="flex items-center gap-1.5 text-sm font-semibold text-gray-700 hover:text-blue-600 transition-colors"
          >
            Buat Template <Plus className="w-4 h-4" />
          </button>
        </div>

        {/* Search */}
        <div className="flex gap-2">
          <div className="relative flex-1">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Cari template yang sudah ada"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <button className="px-5 py-2.5 bg-blue-600 text-white text-sm font-semibold rounded-xl hover:bg-blue-700 transition-colors">
            Cari
          </button>
        </div>

        {/* Loading */}
        {loading && (
          <div className="space-y-3">
            {[1, 2, 3].map((i) => (
              <div key={i} className="h-16 bg-gray-100 rounded-xl animate-pulse" />
            ))}
          </div>
        )}

        {/* Error */}
        {error && (
          <div className="bg-red-50 border border-red-200 rounded-xl p-6 text-center">
            <p className="text-red-600 text-sm">{error}</p>
          </div>
        )}

        {/* Empty state */}
        {!loading && !error && filtered.length === 0 && (
          <div className="flex flex-col items-center justify-center py-20 gap-4">
            <div className="w-16 h-16 text-blue-500">
              <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect x="8" y="12" width="40" height="40" rx="4" stroke="currentColor" strokeWidth="2.5" fill="none"/>
                <path d="M18 24h24M18 32h16" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"/>
                <circle cx="46" cy="46" r="12" fill="white" stroke="currentColor" strokeWidth="2.5"/>
                <path d="M46 41v10M41 46h10" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"/>
              </svg>
            </div>
            <div className="text-center">
              <p className="text-blue-600 font-semibold">Template kamu masih kosong!</p>
              <p className="text-sm text-gray-500 mt-1">
                Yuk buat template brief mu sekarang, agar lebih cepat dan mudah mmelakukan kampanye
              </p>
            </div>
          </div>
        )}

        {/* Template list */}
        {!loading && !error && filtered.length > 0 && (
          <div className="space-y-3">
            {filtered.map((t) => (
              <TemplateRow key={t.id} template={t} onGunakan={onFinish} />
            ))}
          </div>
        )}

        {/* Navigation */}
        <div className="flex gap-3 pt-2">
          <button
            onClick={onBack}
            className="flex items-center gap-1.5 px-6 py-2.5 bg-blue-600 text-white font-semibold rounded-full hover:bg-blue-700 transition-colors"
          >
            « Kembali
          </button>
          <button
            onClick={onFinish}
            className="flex items-center gap-1.5 px-6 py-2.5 bg-blue-600 text-white font-semibold rounded-full hover:bg-blue-700 transition-colors"
          >
            Lanjutkan »
          </button>
        </div>
      </div>
    </>
  );
}
