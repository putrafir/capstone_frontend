"use client";


import { useState, useEffect } from "react";
import type { CampaignFormData, CampaignFormErrors } from "@/types";

const STORAGE_KEY = "budget_form_v1";

const INITIAL_FORM: CampaignFormData = {
  namaCampaign: "",
  industryNiche: "",
  deskripsiProduk: "",
  usiaDari: "",
  usiaHingga: "",
  lokasiTarget: "",
  jenisKelamin: "",
  tujuanCampaign: "",
  totalAnggaran: "",
  tanggalMulai: "",
  tanggalSelesai: "",
  platform: { instagram: false, tiktok: false },
};

function loadFromStorage(): CampaignFormData {
  if (typeof window === "undefined") return INITIAL_FORM;
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return INITIAL_FORM;
    return { ...INITIAL_FORM, ...JSON.parse(raw) };
  } catch {
    return INITIAL_FORM;
  }
}

function saveToStorage(form: CampaignFormData): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(form));
  } catch {
    
  }
}

export function clearBudgetStorage(): void {
  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch {
    
  }
}


export function validateStep1(form: CampaignFormData): CampaignFormErrors {
  const errors: CampaignFormErrors = {};

  
  if (!form.namaCampaign.trim()) {
    errors.namaCampaign = "Nama kampanye wajib diisi";
  } else if (form.namaCampaign.trim().length < 3) {
    errors.namaCampaign = "Nama kampanye minimal 3 karakter";
  }

  
  if (!form.industryNiche) {
    errors.industryNiche = "Industry/Niche wajib dipilih";
  }

  
  if (!form.deskripsiProduk.trim()) {
    errors.deskripsiProduk = "Deskripsi produk wajib diisi";
  } else if (form.deskripsiProduk.trim().length < 20) {
    errors.deskripsiProduk = "Deskripsi produk minimal 20 karakter";
  }

  
  if (form.usiaDari === "" || form.usiaDari === null || form.usiaDari === undefined) {
    errors.usiaDari = "Usia minimum wajib diisi";
  }

  
  if (form.usiaHingga === "" || form.usiaHingga === null || form.usiaHingga === undefined) {
    errors.usiaHingga = "Usia maksimum wajib diisi";
  }

  
  if (
    form.usiaDari !== "" &&
    form.usiaHingga !== "" &&
    Number(form.usiaDari) > Number(form.usiaHingga)
  ) {
    errors.usiaRange = "Usia minimum tidak boleh lebih besar dari usia maksimum";
  }

  
  if (!form.lokasiTarget) {
    errors.lokasiTarget = "Lokasi target wajib dipilih";
  }

  
  if (!form.jenisKelamin) {
    errors.jenisKelamin = "Jenis kelamin wajib dipilih";
  }

  
  if (!form.tujuanCampaign) {
    errors.tujuanCampaign = "Tujuan kampanye wajib dipilih";
  }

  
  if (!form.totalAnggaran.trim()) {
    errors.totalAnggaran = "Total anggaran wajib diisi";
  } else {
    const angka = Number(form.totalAnggaran.replace(/[^0-9]/g, ""));
    if (isNaN(angka) || angka <= 0) {
      errors.totalAnggaran = "Total anggaran harus berupa angka lebih dari 0";
    }
  }

  
  if (!form.tanggalMulai) {
    errors.tanggalMulai = "Tanggal mulai wajib diisi";
  }

  
  if (!form.tanggalSelesai) {
    errors.tanggalSelesai = "Tanggal selesai wajib diisi";
  }

  
  if (form.tanggalMulai && form.tanggalSelesai) {
    if (new Date(form.tanggalSelesai) <= new Date(form.tanggalMulai)) {
      errors.tanggalRange = "Tanggal selesai harus lebih besar dari tanggal mulai";
    }
  }

  
  if (!form.platform.instagram && !form.platform.tiktok) {
    errors.platform = "Minimal satu platform harus dipilih";
  }

  return errors;
}

export function useBudgetForm() {
  const [form, setFormRaw] = useState<CampaignFormData>(INITIAL_FORM);
  const [hydrated, setHydrated] = useState(false);

  
  useEffect(() => {
    setFormRaw(loadFromStorage());
    setHydrated(true);
  }, []);

  
  useEffect(() => {
    if (hydrated) {
      saveToStorage(form);
    }
  }, [form, hydrated]);

  const setForm = (updated: Partial<CampaignFormData>) => {
    setFormRaw((prev) => ({ ...prev, ...updated }));
  };

  const resetForm = () => {
    setFormRaw(INITIAL_FORM);
    clearBudgetStorage();
  };

  return { form, setForm, resetForm, hydrated };
}