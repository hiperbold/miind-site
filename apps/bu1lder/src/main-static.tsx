import "./review-navigation";
import React, { useEffect } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { LazyMotion, domAnimation } from "framer-motion";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import "./styles.css";
import "./miind-ds.css";
import { Route as Agency } from "./routes/bu1lders.agencia-marketing";
import { Route as Home } from "./routes/index";
import { Route as Partners } from "./routes/bu1lders.index";
import { Route as P0 } from "./routes/bu1lders.beleza";
import { Route as P1 } from "./routes/bu1lders.odontologia";
import { Route as P2 } from "./routes/bu1lders.saude";
import { Route as P3 } from "./routes/bu1lders.oficinas";
import { Route as P4 } from "./routes/bu1lders.pet";
import { Route as P5 } from "./routes/bu1lders.restaurantes";
import { Route as P6 } from "./routes/bu1lders.imobiliarias";
import { Route as P7 } from "./routes/bu1lders.academias";
import { Route as P8 } from "./routes/bu1lders.contabilidade";
import { Route as P9 } from "./routes/bu1lders.varejo";
import { niches } from "./data/niches";

// Landing pages always open in light mode. The visitor can switch to dark on the page.
const initialSlug = window.location.pathname.replace(/\/+$/, "").split("/").pop();
if (niches.some((niche) => niche.slug === initialSlug) || initialSlug === "agencia-marketing") {
  document.documentElement.classList.add("light");
  document.documentElement.style.colorScheme = "light";
}
const queryClient = new QueryClient();
function Page({ config }: any) {
  const location = useLocation();
  useEffect(() => {
    const path = location.pathname.replace(/\/$/, "") || "/";
    if (["/", "/parceiros", "/contabilidade", "/agencia-marketing"].includes(path)) {
      document.documentElement.dataset.miindDs = "true";
    } else {
      delete document.documentElement.dataset.miindDs;
    }
    const head = config.head?.();
    document.title = head?.meta?.find((x: any) => x.title)?.title || "Bu1lder by MIIND";
    window.scrollTo(0, 0);
  }, [location.pathname]);
  const Component = config.component;
  return <Component />;
}
createRoot(document.getElementById("root")!).render(
  <QueryClientProvider client={queryClient}>
    <LazyMotion features={domAnimation}>
      <BrowserRouter basename={import.meta.env.BASE_URL.replace(/\/$/, "")}>
        <Routes>
          <Route path="/" element={<Page config={Home} />} />
          <Route path="/parceiros" element={<Page config={Partners} />} />
          <Route path="/beleza" element={<Page config={P0} />} />
          <Route path="/odontologia" element={<Page config={P1} />} />
          <Route path="/saude" element={<Page config={P2} />} />
          <Route path="/oficinas" element={<Page config={P3} />} />
          <Route path="/pet" element={<Page config={P4} />} />
          <Route path="/restaurantes" element={<Page config={P5} />} />
          <Route path="/imobiliarias" element={<Page config={P6} />} />
          <Route path="/academias" element={<Page config={P7} />} />
          <Route path="/contabilidade" element={<Page config={P8} />} />
          <Route path="/agencia-marketing" element={<Page config={Agency} />} />
          <Route path="/varejo" element={<Page config={P9} />} />
          <Route
            path="*"
            element={
              <div style={{ padding: 80, color: "white" }}>
                Página não encontrada. <a href={import.meta.env.BASE_URL}>Voltar ao Bu1lder</a>
              </div>
            }
          />
        </Routes>
      </BrowserRouter>
    </LazyMotion>
  </QueryClientProvider>,
);
