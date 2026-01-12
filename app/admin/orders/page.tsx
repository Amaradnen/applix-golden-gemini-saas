import { supabaseAdmin } from "@/lib/supabase/server";

export default async function AdminOrdersPage({ searchParams }: { searchParams?: SearchParams }) {
  type SearchParams = { [key: string]: string | string[] | undefined };
}) {
  const token = typeof searchParams.token === "string" ? searchParams.token : "";
  if (!process.env.ADMIN_TOKEN || token !== process.env.ADMIN_TOKEN) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center p-8">
        <div className="max-w-md w-full rounded-2xl border border-white/10 bg-white/5 p-6">
          <h1 className="text-2xl font-black">Accès refusé</h1>
          <p className="text-white/70 mt-2">Ajoute ?token=... dans l'URL (ADMIN_TOKEN).</p>
        </div>
      </div>
    );
  }

  const sb = supabaseAdmin();
  const { data: orders, error } = await sb
    .from("orders")
    .select("id, status, customer_name, customer_email, customer_phone, amount_total, currency, created_at")
    .order("created_at", { ascending: false })
    .limit(100);

  return (
    <div className="min-h-screen bg-black text-white p-8">
      <div className="max-w-5xl mx-auto">
        <div className="flex items-end justify-between gap-4 mb-6">
          <div>
            <h1 className="text-3xl font-black">Orders</h1>
            <p className="text-white/70">Dernières commandes (max 100)</p>
          </div>
          <a
            className="px-4 py-2 rounded-xl border border-white/10 bg-white/5 hover:bg-white/10"
            href="/"
          >
            Retour
          </a>
        </div>

        {error ? (
          <pre className="text-red-300">{String(error.message)}</pre>
        ) : (
          <div className="overflow-x-auto rounded-2xl border border-white/10">
            <table className="min-w-full text-sm">
              <thead className="bg-white/5 text-white/80">
                <tr>
                  <th className="text-left p-3">ID</th>
                  <th className="text-left p-3">Status</th>
                  <th className="text-left p-3">Client</th>
                  <th className="text-left p-3">Email</th>
                  <th className="text-left p-3">Total</th>
                  <th className="text-left p-3">Date</th>
                </tr>
              </thead>
              <tbody>
                {(orders || []).map((o) => (
                  <tr key={o.id} className="border-t border-white/10">
                    <td className="p-3 font-mono text-xs">{o.id}</td>
                    <td className="p-3">{o.status}</td>
                    <td className="p-3">{o.customer_name}</td>
                    <td className="p-3">{o.customer_email}</td>
                    <td className="p-3">
                      {(o.amount_total / 100).toFixed(2)} {String(o.currency).toUpperCase()}
                    </td>
                    <td className="p-3">{new Date(o.created_at).toLocaleString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
