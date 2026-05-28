"use client";

import { useEffect, useState } from "react";
import { adminFetch } from "@/lib/admin-api";

interface Transaction {
  id: string;
  user_id: string;
  email: string;
  stripe_session_id: string;
  amount_total: number;
  currency: string;
  status: string;
  plan_name: string;
  created_at: string;
}

export default function AdminPaymentsPage() {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadTransactions() {
      try {
        const res = await adminFetch("/payments/transactions");
        if (res.ok) {
          const data = await res.json();
          setTransactions(data);
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    loadTransactions();
  }, []);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bricolage font-medium mb-1">Stripe Payment Logs</h1>
        <p className="text-white/50 text-sm">Audit completed purchases, customer emails, Stripe sessions, and license distributions.</p>
      </div>

      {loading ? (
        <div className="text-white/40 font-mono text-sm">Loading transactions log...</div>
      ) : (
        <div className="bg-white/5 border border-white/10 rounded-2xl overflow-hidden">
          <table className="w-full text-left">
            <thead className="bg-white/5 text-white/50 text-xs uppercase tracking-wider font-mono">
              <tr>
                <th className="px-6 py-4 font-medium">Date</th>
                <th className="px-6 py-4 font-medium">Customer Email</th>
                <th className="px-6 py-4 font-medium">Plan</th>
                <th className="px-6 py-4 font-medium">Amount</th>
                <th className="px-6 py-4 font-medium">Stripe Session</th>
                <th className="px-6 py-4 font-medium">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5 text-sm">
              {transactions.map((tx) => (
                <tr key={tx.id} className="hover:bg-white/[0.02] transition-colors">
                  <td className="px-6 py-4 font-mono text-xs text-white/50">
                    {new Date(tx.created_at).toLocaleString()}
                  </td>
                  <td className="px-6 py-4">
                    <div>
                      <span className="text-white block font-medium">{tx.email || "N/A"}</span>
                      <span className="text-[10px] font-mono text-white/30 block">User: {tx.user_id}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="font-semibold text-emerald-400">{tx.plan_name}</span>
                  </td>
                  <td className="px-6 py-4 font-mono">
                    {tx.currency.toUpperCase()} ${(tx.amount_total / 100).toFixed(2)}
                  </td>
                  <td className="px-6 py-4 font-mono text-xs text-white/40">
                    <span className="truncate max-w-xs block" title={tx.stripe_session_id}>
                      {tx.stripe_session_id}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span className="px-2 py-0.5 rounded-full text-xs font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                      {tx.status}
                    </span>
                  </td>
                </tr>
              ))}
              {transactions.length === 0 && (
                <tr>
                  <td colSpan={6} className="px-6 py-10 text-center text-white/40 font-mono text-sm">
                    No payment logs recorded.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
