import { useEffect, useState } from "react";
import { API_URL } from "../constants";

export type CodePlan = "GRATUIT" | "STARTER" | "BUSINESS" | "ENTERPRISE";

// Prix mensuels réellement facturés par l'application (modifiés dans
// Super-admin › Abonnements). null tant qu'ils ne sont pas chargés : la page
// affiche alors ceux relevés au build (src/prix-plans.json).
export function usePrixPlans(): Partial<Record<CodePlan, number | null>> | null {
  const [prix, setPrix] = useState<Partial<Record<CodePlan, number | null>> | null>(null);

  useEffect(() => {
    let annule = false;
    fetch(`${API_URL}/public/tarifs`)
      .then((r) => (r.ok ? r.json() : Promise.reject(r.status)))
      .then((tarifs: { plan: CodePlan; prixMensuel: number | null }[]) => {
        if (!annule) setPrix(Object.fromEntries(tarifs.map((t) => [t.plan, t.prixMensuel])));
      })
      .catch(() => { /* API indisponible : prix relevés au build */ });
    return () => { annule = true; };
  }, []);

  return prix;
}
