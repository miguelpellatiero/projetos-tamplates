/* ==========================================================================
   OKKII — script.js
   Sem dependências externas. Comentado para facilitar manutenção.
   ========================================================================== */
(function () {
  "use strict";

  /* ------------------------------------------------------------------
     Menu mobile
     ------------------------------------------------------------------ */
  const navToggle = document.getElementById("navToggle");
  const navMobile = document.getElementById("navMobile");

  if (navToggle && navMobile) {
    navToggle.addEventListener("click", () => {
      const isOpen = navMobile.classList.toggle("open");
      navToggle.setAttribute("aria-expanded", String(isOpen));
    });
    navMobile.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () => {
        navMobile.classList.remove("open");
        navToggle.setAttribute("aria-expanded", "false");
      });
    });
  }

  /* ------------------------------------------------------------------
     FAQ accordion
     ------------------------------------------------------------------ */
  document.querySelectorAll(".faq-item").forEach((item) => {
    const btn = item.querySelector(".faq-q");
    const answer = item.querySelector(".faq-a");
    btn.addEventListener("click", () => {
      const isOpen = item.classList.contains("open");
      document.querySelectorAll(".faq-item.open").forEach((openItem) => {
        if (openItem !== item) {
          openItem.classList.remove("open");
          openItem.querySelector(".faq-a").style.maxHeight = null;
          openItem.querySelector(".faq-q").setAttribute("aria-expanded", "false");
        }
      });
      item.classList.toggle("open", !isOpen);
      btn.setAttribute("aria-expanded", String(!isOpen));
      answer.style.maxHeight = !isOpen ? answer.scrollHeight + "px" : null;
    });
  });

  /* ------------------------------------------------------------------
     Ano dinâmico no rodapé
     ------------------------------------------------------------------ */
  const yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  /* ------------------------------------------------------------------
     Rede de nós (elemento visual assinatura, inspirado em fluxos n8n)
     Gerado em JS para ser leve (sem imagens) e variar a cada carregamento.
     ------------------------------------------------------------------ */
  const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  function buildNodeNetwork(svgEl, { count, w, h, colors, animate }) {
    if (!svgEl) return;
    const ns = "http://www.w3.org/2000/svg";
    const nodes = Array.from({ length: count }, () => ({
      x: Math.random() * w,
      y: Math.random() * h,
      r: 2 + Math.random() * 2.4,
    }));

    // Conecta cada nó aos 2 mais próximos para simular um grafo de automação
    const lines = [];
    nodes.forEach((n, i) => {
      const distances = nodes
        .map((m, j) => ({ j, d: Math.hypot(n.x - m.x, n.y - m.y) }))
        .filter((d) => d.j !== i)
        .sort((a, b) => a.d - b.d)
        .slice(0, 2);
      distances.forEach(({ j }) => {
        const key = [i, j].sort().join("-");
        if (!lines.find((l) => l.key === key)) lines.push({ key, a: nodes[i], b: nodes[j] });
      });
    });

    const frag = document.createDocumentFragment();
    lines.forEach(({ a, b }) => {
      const line = document.createElementNS(ns, "line");
      line.setAttribute("x1", a.x);
      line.setAttribute("y1", a.y);
      line.setAttribute("x2", b.x);
      line.setAttribute("y2", b.y);
      line.setAttribute("stroke", "rgba(120,140,220,0.25)");
      line.setAttribute("stroke-width", "1");
      frag.appendChild(line);
    });

    nodes.forEach((n, i) => {
      const circle = document.createElementNS(ns, "circle");
      circle.setAttribute("cx", n.x);
      circle.setAttribute("cy", n.y);
      circle.setAttribute("r", n.r);
      circle.setAttribute("fill", colors[i % colors.length]);
      if (animate && !prefersReducedMotion) {
        const anim = document.createElementNS(ns, "animate");
        anim.setAttribute("attributeName", "opacity");
        anim.setAttribute("values", "0.35;1;0.35");
        anim.setAttribute("dur", `${3 + Math.random() * 3}s`);
        anim.setAttribute("repeatCount", "indefinite");
        circle.appendChild(anim);
      }
      frag.appendChild(circle);
    });

    svgEl.setAttribute("viewBox", `0 0 ${w} ${h}`);
    svgEl.appendChild(frag);
  }

  const palette = ["#4f86ff", "#9b6bff", "#2fe8b0"];

  buildNodeNetwork(document.getElementById("heroNet"), { count: 26, w: 1200, h: 700, colors: palette, animate: true });
  buildNodeNetwork(document.getElementById("diffNet"), { count: 16, w: 420, h: 360, colors: palette, animate: true });
  buildNodeNetwork(document.getElementById("automationNet"), { count: 14, w: 380, h: 240, colors: palette, animate: true });

  /* ------------------------------------------------------------------
     Banner de cookies — consentimento LGPD
     Guarda a escolha localmente (apenas no navegador do usuário).
     ------------------------------------------------------------------ */
  const cookieBanner = document.getElementById("cookieBanner");
  const cookieAccept = document.getElementById("cookieAccept");
  const cookieReject = document.getElementById("cookieReject");
  const COOKIE_KEY = "okkii_cookie_consent";

  function getConsent() {
    try {
      return localStorage.getItem(COOKIE_KEY);
    } catch (e) {
      return null;
    }
  }
  function setConsent(value) {
    try {
      localStorage.setItem(COOKIE_KEY, value);
    } catch (e) {
      /* localStorage indisponível — o banner voltará a aparecer, o que é seguro. */
    }
  }

  if (cookieBanner && !getConsent()) {
    cookieBanner.classList.add("show");
  }
  if (cookieAccept) {
    cookieAccept.addEventListener("click", () => {
      setConsent("all");
      cookieBanner.classList.remove("show");
      // TODO: inicialize aqui scripts de analytics/marketing, somente após o aceite.
    });
  }
  if (cookieReject) {
    cookieReject.addEventListener("click", () => {
      setConsent("essential");
      cookieBanner.classList.remove("show");
    });
  }

  /* ------------------------------------------------------------------
     Formulário de contato
     ------------------------------------------------------------------
     Este formulário está pronto para ser conectado a um webhook do n8n
     (ou a qualquer backend próprio). Basta preencher CONTACT_ENDPOINT
     abaixo com a URL do seu webhook.

     Exemplo de fluxo no n8n: Webhook -> validação -> grava em planilha/CRM
     -> envia notificação por e-mail/WhatsApp.

     Enquanto CONTACT_ENDPOINT estiver vazio, o formulário apenas valida
     os campos e mostra uma mensagem de sucesso simulada — nenhum dado é
     enviado para fora do navegador.
     ------------------------------------------------------------------ */
  const CONTACT_ENDPOINT = ""; // ex: "https://seu-n8n.app.n8n.cloud/webhook/contato"

  const form = document.getElementById("contactForm");
  const status = document.getElementById("formStatus");

  if (form) {
    form.addEventListener("submit", async (e) => {
      e.preventDefault();
      status.className = "form-status";

      if (!form.checkValidity()) {
        form.reportValidity();
        return;
      }

      const consentimento = document.getElementById("consentimento");
      if (!consentimento.checked) {
        status.textContent = "É necessário aceitar o uso dos dados para enviarmos o formulário.";
        status.classList.add("show", "err");
        return;
      }

      const payload = {
        nome: form.nome.value.trim(),
        email: form.email.value.trim(),
        telefone: form.telefone.value.trim(),
        tipo: form.tipo.value,
        mensagem: form.mensagem.value.trim(),
        consentimentoLGPD: true,
        origem: "site-okkii",
        enviadoEm: new Date().toISOString(),
      };

      const submitBtn = form.querySelector("button[type=submit]");
      submitBtn.disabled = true;

      try {
        if (CONTACT_ENDPOINT) {
          const res = await fetch(CONTACT_ENDPOINT, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(payload),
          });
          if (!res.ok) throw new Error("Falha no envio");
        } else {
          // Modo demonstração (sem backend configurado ainda)
          await new Promise((resolve) => setTimeout(resolve, 500));
          console.info("[OKKII] Formulário validado. Configure CONTACT_ENDPOINT em js/script.js para enviar de verdade.", payload);
        }

        status.textContent = "Recebemos sua solicitação! Em breve entraremos em contato.";
        status.classList.add("show", "ok");
        form.reset();
      } catch (err) {
        status.textContent = "Não foi possível enviar agora. Tente novamente em instantes.";
        status.classList.add("show", "err");
      } finally {
        submitBtn.disabled = false;
      }
    });
  }
})();