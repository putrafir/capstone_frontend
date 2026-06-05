"use client";
import { useState } from "react";
import type { InvoiceBreakdownItem } from "@/types";

interface InvoiceSummaryProps {
  breakdown: InvoiceBreakdownItem[];
  adminFee: number;
}

function formatRupiah(n: number): string {
  return `Rp ${n.toLocaleString("id-ID")}`;
}

function CollapsibleRow({ item }: { item: InvoiceBreakdownItem }) {
  const [open, setOpen] = useState<boolean>(true);
  const hasChildren = item.children && item.children.length > 0;

  return (
    <div className="border-b border-gray-100 last:border-0">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between py-3 text-left hover:bg-gray-50 transition-colors px-1 rounded"
      >
        <span className="text-sm font-semibold text-gray-900">{item.label}</span>
        <div className="flex items-center gap-2">
          <span className="text-sm font-bold text-gray-900">
            Total : {formatRupiah(item.amount)}
          </span>
          {hasChildren && (
            <span className="text-gray-400 text-xs">{open ? "∧" : "∨"}</span>
          )}
        </div>
      </button>
      {open && hasChildren && (
        <div className="pb-2 pl-2 space-y-1.5">
          {item.children!.map((child, idx) => (
            <div key={idx} className="flex items-center justify-between py-1">
              <span className="text-sm text-gray-600">{child.label}</span>
              <span className="text-sm text-gray-800">{formatRupiah(child.amount)}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

function FlatRow({ item }: { item: InvoiceBreakdownItem }) {
  return (
    <div className="border-b border-gray-100 last:border-0">
      <div className="flex flex-col gap-1 py-3">
        <div className="flex items-center justify-between">
          <span className="text-sm font-semibold text-gray-900">{item.label}</span>
        </div>
        {item.children?.map((child, idx) => (
          <div key={idx} className="flex items-center justify-between pl-1">
            <span className="text-sm text-gray-600">{child.label}</span>
            <span className="text-sm text-gray-800">{formatRupiah(child.amount)}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function InvoiceSummary({ breakdown, adminFee }: InvoiceSummaryProps) {
  const subtotal = breakdown.reduce((sum, b) => sum + b.amount, 0);
  const total = subtotal + adminFee;

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
      <div className="p-6">
        <h2 className="text-lg font-bold text-gray-900 text-center mb-4">Rincian Pembayaran</h2>
        <div className="divide-y divide-gray-100">
          {breakdown.map((item, idx) =>
            item.children && item.children.length > 0 ? (
              <CollapsibleRow key={idx} item={item} />
            ) : (
              <FlatRow key={idx} item={item} />
            )
          )}
        </div>

        {/* Add Ons flat display if not in breakdown */}
        <div className="mt-2 pt-4 border-t border-gray-200">
          <div className="flex items-center justify-between mb-3">
            <span className="text-sm font-semibold text-gray-900">Subtotal</span>
            <span className="text-sm font-bold text-gray-900">{formatRupiah(subtotal)}</span>
          </div>
          <div className="flex items-center justify-between mb-4">
            <span className="text-sm text-gray-600">Biaya Admin</span>
            <span className="text-sm text-gray-800">{formatRupiah(adminFee)}</span>
          </div>
          <div className="flex items-center justify-between pt-3 border-t border-gray-200">
            <span className="text-base font-bold text-gray-900">Total</span>
            <span className="text-base font-bold text-gray-900">{formatRupiah(total)}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
