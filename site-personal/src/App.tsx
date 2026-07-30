import { useState, useEffect, useRef } from "react"

// ─── data ────────────────────────────────────────────────────────────────────

const NAV_LINKS = ["Sobre", "Projetos", "Habilidades", "Contato"]

const PROJECTS = [
  {
    id: 1,
    title: "FinanceFlow",
    tag: "WEBAPP",
    year: "2024",
    desc: "Plataforma de gestão financeira pessoal com dashboards em tempo real, análise preditiva e relatórios exportáveis.",
    stack: ["React", "TypeScript", "Node.js", "PostgreSQL"],
    img: "https://images.unsplash.com/photo-1760224254228-78ca793b7f6d?w=800&h=500&fit=crop&auto=format",
    accent: "#0077ff",
  },
  {
    id: 2,
    title: "CodeReview AI",
    tag: "FERRAMENTA",
    year: "2024",
    desc: "Assistente inteligente que analisa pull requests e sugere melhorias de performance, legibilidade e segurança.",
    stack: ["Python", "FastAPI", "LLM", "Docker"],
    img: "https://images.unsplash.com/photo-1604591259403-81d6c9cf87d7?w=800&h=500&fit=crop&auto=format",
    accent: "#00c9ff",
  },
  {
    id: 3,
    title: "ArcMotion",
    tag: "MOBILE",
    year: "2023",
    desc: "App de rastreamento de treinos com visualização 3D de movimentos, histórico semanal e metas adaptativas.",
    stack: ["React Native", "Three.js", "Firebase", "Redux"],
    img: "https://images.unsplash.com/photo-1776875097847-49bd9bcf1eca?w=800&h=500&fit=crop&auto=format",
    accent: "#7b5cfa",
  },
  {
    id: 4,
    title: "Horizon CMS",
    tag: "PLATAFORMA",
    year: "2023",
    desc: "Sistema de gerenciamento de conteúdo headless com editor visual drag-and-drop e suporte a múltiplos idiomas.",
    stack: ["Next.js", "GraphQL", "Prisma", "AWS"],
    img: "https://images.unsplash.com/photo-1650661926447-9efb2610f64c?w=800&h=500&fit=crop&auto=format",
    accent: "#00e5a0",
  },
]

const SKILLS = [
  { name: "React / Next.js", level: 95 },
  { name: "TypeScript", level: 92 },
  { name: "Node.js / Express", level: 88 },
  { name: "Python / FastAPI", level: 82 },
  { name: "PostgreSQL / Redis", level: 80 },
  { name: "Docker / CI-CD", level: 78 },
  { name: "AWS / GCP", level: 74 },
  { name: "Three.js / WebGL", level: 68 },
]

const STATS = [
  { value: "47+", label: "Projetos entregues" },
  { value: "12+", label: "Clientes satisfeitos" },
  { value: "6", label: "Anos de experiência" },
  { value: "99%", label: "Uptime médio" },
]

// ─── subcomponents ────────────────────────────────────────────────────────────

function NavBar({ active }: { active: string }) {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener("scroll", onScroll)
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  return (
    <nav
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 100,
        background: scrolled ? "rgba(7,11,20,0.92)" : "transparent",
        backdropFilter: scrolled ? "blur(14px)" : "none",
        borderBottom: scrolled ? "1px solid rgba(255,255,255,0.06)" : "none",
        transition: "background 0.3s, border 0.3s",
      }}
    >
      <div
        style={{
          maxWidth: 1280,
          margin: "0 auto",
          padding: "0 32px",
          height: 64,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <a
          href="#hero"
          style={{
            fontWeight: 800,
            fontSize: 22,
            letterSpacing: "-0.03em",
            color: "#fff",
            textDecoration: "none",
          }}
        >
          alex<span style={{ color: "#0077ff" }}>.</span>dev
        </a>

        <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
          {NAV_LINKS.map((l) => (
            <a
              key={l}
              href={`#${l.toLowerCase()}`}
              style={{
                color: active === l ? "#0077ff" : "#8b9ab5",
                fontSize: 13,
                fontWeight: 600,
                letterSpacing: "0.08em",
                textTransform: "uppercase",
                textDecoration: "none",
                padding: "6px 16px",
                borderRadius: 4,
                transition: "color 0.2s",
              }}
              onMouseEnter={(e) => {
                if (active !== l) (e.currentTarget as HTMLElement).style.color = "#c8d8f0"
              }}
              onMouseLeave={(e) => {
                if (active !== l) (e.currentTarget as HTMLElement).style.color = "#8b9ab5"
              }}
            >
              {l}
            </a>
          ))}
          <a
            href="#contato"
            style={{
              marginLeft: 8,
              background: "#0077ff",
              color: "#fff",
              fontSize: 13,
              fontWeight: 700,
              letterSpacing: "0.06em",
              textTransform: "uppercase",
              textDecoration: "none",
              padding: "8px 20px",
              borderRadius: 4,
              transition: "background 0.2s, transform 0.15s",
            }}
            onMouseEnter={(e) => {
              ;(e.currentTarget as HTMLElement).style.background = "#1a8fff"
            }}
            onMouseLeave={(e) => {
              ;(e.currentTarget as HTMLElement).style.background = "#0077ff"
            }}
          >
            Contratar
          </a>
        </div>
      </div>
    </nav>
  )
}

function HeroSection() {
  return (
    <section
      id="hero"
      style={{
        position: "relative",
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        overflow: "hidden",
      }}
    >
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage:
            "url(https://images.unsplash.com/photo-1611924707078-da8777fc99cb?w=1600&h=900&fit=crop&auto=format)",
          backgroundSize: "cover",
          backgroundPosition: "center",
          opacity: 0.22,
        }}
      />
      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "linear-gradient(105deg, #070b14 42%, rgba(7,11,20,0.6) 70%, rgba(7,11,20,0.2) 100%)",
        }}
      />
      <div
        style={{
          position: "absolute",
          bottom: "-20%",
          left: "30%",
          width: 700,
          height: 500,
          background: "radial-gradient(ellipse, rgba(0,119,255,0.12) 0%, transparent 70%)",
          pointerEvents: "none",
        }}
      />

      <div
        style={{
          position: "relative",
          maxWidth: 1280,
          margin: "0 auto",
          padding: "120px 32px 80px",
          width: "100%",
        }}
      >
        <div
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 8,
            background: "rgba(0,119,255,0.12)",
            border: "1px solid rgba(0,119,255,0.3)",
            borderRadius: 3,
            padding: "5px 14px",
            marginBottom: 28,
          }}
        >
          <span
            style={{
              width: 7,
              height: 7,
              borderRadius: "50%",
              background: "#00e5a0",
              display: "inline-block",
              boxShadow: "0 0 8px #00e5a0",
            }}
          />
          <span
            style={{
              fontSize: 11,
              fontWeight: 700,
              letterSpacing: "0.14em",
              textTransform: "uppercase",
              color: "#8bb8ff",
            }}
          >
            Disponível para projetos
          </span>
        </div>

        <h1
          style={{
            fontSize: "clamp(42px, 7vw, 88px)",
            fontWeight: 900,
            lineHeight: 1.0,
            letterSpacing: "-0.04em",
            margin: "0 0 24px",
            color: "#fff",
            maxWidth: 820,
          }}
        >
          Desenvolvedor
          <br />
          <span style={{ color: "#0077ff" }}>Full-Stack</span>
          <br />
          <span style={{ color: "#c8d8f0", fontWeight: 300 }}>&amp; Engenheiro</span>
        </h1>

        <p
          style={{
            fontSize: 18,
            lineHeight: 1.75,
            color: "#6b7a96",
            maxWidth: 520,
            margin: "0 0 44px",
          }}
        >
          Transformo ideias complexas em produtos digitais precisos. Especializado em
          sistemas de alta performance com React, Node.js e infraestrutura em nuvem.
        </p>

        <div style={{ display: "flex", gap: 16, flexWrap: "wrap" }}>
          <a
            href="#projetos"
            style={{
              background: "#0077ff",
              color: "#fff",
              fontWeight: 700,
              fontSize: 14,
              letterSpacing: "0.06em",
              textTransform: "uppercase",
              textDecoration: "none",
              padding: "14px 32px",
              borderRadius: 4,
              display: "inline-flex",
              alignItems: "center",
              gap: 10,
              transition: "background 0.2s, transform 0.15s",
            }}
            onMouseEnter={(e) => {
              ;(e.currentTarget as HTMLElement).style.background = "#1a8fff"
              ;(e.currentTarget as HTMLElement).style.transform = "translateY(-2px)"
            }}
            onMouseLeave={(e) => {
              ;(e.currentTarget as HTMLElement).style.background = "#0077ff"
              ;(e.currentTarget as HTMLElement).style.transform = "translateY(0)"
            }}
          >
            Ver Projetos
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </a>
          <a
            href="#contato"
            style={{
              background: "transparent",
              color: "#c8d8f0",
              fontWeight: 600,
              fontSize: 14,
              letterSpacing: "0.06em",
              textTransform: "uppercase",
              textDecoration: "none",
              padding: "14px 32px",
              borderRadius: 4,
              border: "1px solid rgba(255,255,255,0.14)",
              display: "inline-flex",
              alignItems: "center",
              gap: 10,
              transition: "border-color 0.2s, color 0.2s",
            }}
            onMouseEnter={(e) => {
              ;(e.currentTarget as HTMLElement).style.borderColor = "rgba(0,119,255,0.5)"
              ;(e.currentTarget as HTMLElement).style.color = "#fff"
            }}
            onMouseLeave={(e) => {
              ;(e.currentTarget as HTMLElement).style.borderColor = "rgba(255,255,255,0.14)"
              ;(e.currentTarget as HTMLElement).style.color = "#c8d8f0"
            }}
          >
            Falar Comigo
          </a>
        </div>

        <div style={{ display: "flex", gap: 40, marginTop: 72, flexWrap: "wrap" }}>
          {STATS.map((s) => (
            <div key={s.label}>
              <div
                style={{
                  fontSize: 32,
                  fontWeight: 800,
                  color: "#fff",
                  letterSpacing: "-0.03em",
                  lineHeight: 1,
                }}
              >
                {s.value}
              </div>
              <div
                style={{
                  fontSize: 12,
                  fontWeight: 500,
                  color: "#4a5a70",
                  letterSpacing: "0.06em",
                  textTransform: "uppercase",
                  marginTop: 6,
                }}
              >
                {s.label}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          height: 120,
          background: "linear-gradient(to bottom, transparent, #070b14)",
          pointerEvents: "none",
        }}
      />
    </section>
  )
}

function AboutSection() {
  return (
    <section id="sobre" style={{ padding: "120px 32px", maxWidth: 1280, margin: "0 auto" }}>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: 80,
          alignItems: "center",
        }}
      >
        <div style={{ position: "relative" }}>
          <div
            style={{
              position: "absolute",
              top: -20,
              left: -20,
              right: 20,
              bottom: 20,
              border: "1px solid rgba(0,119,255,0.25)",
              borderRadius: 4,
            }}
          />
          <div
            style={{
              position: "relative",
              borderRadius: 4,
              overflow: "hidden",
              aspectRatio: "4/5",
            }}
          >
            <img
              src="https://images.unsplash.com/photo-1508174516034-a466529afd78?w=700&h=900&fit=crop&auto=format"
              alt="Ambiente de trabalho noturno"
              style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
            />
            <div
              style={{
                position: "absolute",
                inset: 0,
                background: "linear-gradient(to top, rgba(7,11,20,0.7) 0%, transparent 50%)",
              }}
            />
          </div>
          <div
            style={{
              position: "absolute",
              bottom: 20,
              left: 0,
              width: 3,
              height: "60%",
              background: "linear-gradient(to bottom, #0077ff, transparent)",
            }}
          />
        </div>

        <div>
          <p
            style={{
              fontSize: 11,
              fontWeight: 700,
              letterSpacing: "0.18em",
              textTransform: "uppercase",
              color: "#0077ff",
              marginBottom: 16,
            }}
          >
            Sobre mim
          </p>
          <h2
            style={{
              fontSize: "clamp(32px, 4vw, 52px)",
              fontWeight: 800,
              letterSpacing: "-0.03em",
              lineHeight: 1.1,
              color: "#fff",
              margin: "0 0 28px",
            }}
          >
            Código que escala.
            <br />
            <span style={{ color: "#6b7a96", fontWeight: 300 }}>Produtos que importam.</span>
          </h2>
          <p style={{ fontSize: 16, lineHeight: 1.8, color: "#6b7a96", margin: "0 0 20px" }}>
            Sou Alexandre Costa, desenvolvedor full-stack com 6 anos de experiência construindo
            aplicações de alta performance para startups e empresas de médio porte.
          </p>
          <p style={{ fontSize: 16, lineHeight: 1.8, color: "#6b7a96", margin: "0 0 36px" }}>
            Minha abordagem combina rigor técnico com sensibilidade de produto — escrevo sistemas
            que não só funcionam no lançamento, mas evoluem sem virar dívida técnica.
          </p>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: 16,
              marginBottom: 40,
            }}
          >
            {[
              ["Localização", "São Paulo, BR"],
              ["Experiência", "6 anos"],
              ["Idiomas", "PT · EN · ES"],
              ["Foco atual", "Sistemas AI"],
            ].map(([label, val]) => (
              <div key={label} style={{ borderLeft: "2px solid rgba(0,119,255,0.35)", paddingLeft: 14 }}>
                <div style={{ fontSize: 11, color: "#4a5a70", letterSpacing: "0.1em", textTransform: "uppercase", fontWeight: 600 }}>
                  {label}
                </div>
                <div style={{ fontSize: 14, color: "#c8d8f0", fontWeight: 600, marginTop: 3 }}>
                  {val}
                </div>
              </div>
            ))}
          </div>

          <a
            href="/cv.pdf"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 8,
              color: "#0077ff",
              fontSize: 13,
              fontWeight: 700,
              letterSpacing: "0.08em",
              textTransform: "uppercase",
              textDecoration: "none",
              borderBottom: "1px solid rgba(0,119,255,0.4)",
              paddingBottom: 4,
            }}
          >
            Baixar Currículo
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path d="M7 1v8M3 9l4 4 4-4M1 13h12" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </a>
        </div>
      </div>
    </section>
  )
}

function ProjectCard({ p, index }: { p: (typeof PROJECTS)[0]; index: number }) {
  const [hovered, setHovered] = useState(false)

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: "#0d1525",
        border: `1px solid ${hovered ? p.accent + "40" : "rgba(255,255,255,0.06)"}`,
        borderRadius: 4,
        overflow: "hidden",
        transition: "border-color 0.3s, transform 0.25s, box-shadow 0.3s",
        transform: hovered ? "translateY(-6px)" : "translateY(0)",
        boxShadow: hovered ? `0 24px 60px ${p.accent}18` : "none",
        cursor: "pointer",
      }}
    >
      <div style={{ position: "relative", overflow: "hidden", aspectRatio: "16/9" }}>
        <img
          src={p.img}
          alt={p.title}
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            display: "block",
            transition: "transform 0.5s",
            transform: hovered ? "scale(1.06)" : "scale(1)",
          }}
        />
        <div
          style={{
            position: "absolute",
            inset: 0,
            background: "linear-gradient(to bottom, transparent 40%, #0d1525 100%)",
          }}
        />
        <div
          style={{
            position: "absolute",
            top: 16,
            left: 16,
            background: "rgba(7,11,20,0.75)",
            border: `1px solid ${p.accent}50`,
            borderRadius: 3,
            padding: "3px 10px",
            fontSize: 10,
            fontWeight: 700,
            letterSpacing: "0.14em",
            color: p.accent,
          }}
        >
          {p.tag}
        </div>
        <div style={{ position: "absolute", top: 16, right: 16, color: "#4a5a70", fontSize: 12, fontWeight: 600 }}>
          {p.year}
        </div>
      </div>

      <div style={{ padding: "24px 28px 28px" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 10 }}>
          <span style={{ fontSize: 13, fontWeight: 400, color: "#4a5a70" }}>
            {String(index + 1).padStart(2, "0")}
          </span>
          <h3
            style={{
              fontSize: 22,
              fontWeight: 800,
              color: "#fff",
              letterSpacing: "-0.02em",
              margin: 0,
            }}
          >
            {p.title}
          </h3>
        </div>
        <p style={{ fontSize: 14, lineHeight: 1.7, color: "#6b7a96", margin: "0 0 20px" }}>
          {p.desc}
        </p>
        <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
          {p.stack.map((s) => (
            <span
              key={s}
              style={{
                fontSize: 11,
                fontWeight: 600,
                letterSpacing: "0.08em",
                color: "#4a5a70",
                background: "rgba(255,255,255,0.04)",
                border: "1px solid rgba(255,255,255,0.07)",
                borderRadius: 3,
                padding: "3px 10px",
              }}
            >
              {s}
            </span>
          ))}
        </div>
      </div>
    </div>
  )
}

function ProjectsSection() {
  return (
    <section
      id="projetos"
      style={{
        padding: "120px 32px",
        background: "#0d1525",
        borderTop: "1px solid rgba(255,255,255,0.05)",
        borderBottom: "1px solid rgba(255,255,255,0.05)",
      }}
    >
      <div style={{ maxWidth: 1280, margin: "0 auto" }}>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-end",
            marginBottom: 64,
            flexWrap: "wrap",
            gap: 24,
          }}
        >
          <div>
            <p style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.18em", textTransform: "uppercase", color: "#0077ff", marginBottom: 12 }}>
              Portfólio
            </p>
            <h2 style={{ fontSize: "clamp(32px, 4vw, 52px)", fontWeight: 800, letterSpacing: "-0.03em", color: "#fff", margin: 0 }}>
              Projetos Selecionados
            </h2>
          </div>
          <a
            href="#"
            style={{
              fontSize: 13,
              fontWeight: 700,
              letterSpacing: "0.08em",
              textTransform: "uppercase",
              color: "#0077ff",
              textDecoration: "none",
              display: "flex",
              alignItems: "center",
              gap: 8,
              borderBottom: "1px solid rgba(0,119,255,0.4)",
              paddingBottom: 4,
            }}
          >
            Ver todos
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path d="M2 7h10M8 3l4 4-4 4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </a>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(340px, 1fr))", gap: 24 }}>
          {PROJECTS.map((p, i) => (
            <ProjectCard key={p.id} p={p} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}

function SkillsSection() {
  const [animated, setAnimated] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setAnimated(true) },
      { threshold: 0.2 }
    )
    if (ref.current) obs.observe(ref.current)
    return () => obs.disconnect()
  }, [])

  return (
    <section id="habilidades" style={{ padding: "120px 32px" }}>
      <div ref={ref} style={{ maxWidth: 1280, margin: "0 auto" }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 80, alignItems: "start" }}>
          <div>
            <p style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.18em", textTransform: "uppercase", color: "#0077ff", marginBottom: 16 }}>
              Stack Técnica
            </p>
            <h2 style={{ fontSize: "clamp(32px, 4vw, 52px)", fontWeight: 800, letterSpacing: "-0.03em", color: "#fff", margin: "0 0 28px", lineHeight: 1.1 }}>
              Tecnologias que
              <br />
              <span style={{ color: "#6b7a96", fontWeight: 300 }}>domino de verdade.</span>
            </h2>
            <p style={{ fontSize: 16, lineHeight: 1.8, color: "#6b7a96", maxWidth: 420 }}>
              Cada percentual reflete projetos reais em produção — não tutoriais ou projetos
              pessoais, mas sistemas que atendem usuários todos os dias.
            </p>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 10, marginTop: 36 }}>
              {["Git", "Linux", "Figma", "Jest", "Playwright", "Terraform"].map((t) => (
                <span
                  key={t}
                  style={{
                    fontSize: 12,
                    fontWeight: 600,
                    color: "#8b9ab5",
                    background: "rgba(255,255,255,0.04)",
                    border: "1px solid rgba(255,255,255,0.08)",
                    borderRadius: 3,
                    padding: "6px 14px",
                    letterSpacing: "0.06em",
                  }}
                >
                  {t}
                </span>
              ))}
            </div>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
            {SKILLS.map((s, i) => (
              <div key={s.name}>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 8 }}>
                  <span style={{ fontSize: 13, fontWeight: 600, color: "#c8d8f0" }}>{s.name}</span>
                  <span style={{ fontSize: 13, color: "#0077ff", fontWeight: 700 }}>{s.level}%</span>
                </div>
                <div style={{ height: 3, background: "rgba(255,255,255,0.06)", borderRadius: 2, overflow: "hidden" }}>
                  <div
                    style={{
                      height: "100%",
                      width: animated ? `${s.level}%` : "0%",
                      background: "linear-gradient(90deg, #0077ff, #1a8fff)",
                      borderRadius: 2,
                      transition: `width 1s cubic-bezier(0.22, 1, 0.36, 1) ${i * 0.07}s`,
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

function ContactSection() {
  const [sent, setSent] = useState(false)
  const [form, setForm] = useState({ name: "", email: "", message: "" })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setSent(true)
  }

  return (
    <section
      id="contato"
      style={{
        padding: "120px 32px",
        background: "#0d1525",
        borderTop: "1px solid rgba(255,255,255,0.05)",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <div
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: 800,
          height: 500,
          background: "radial-gradient(ellipse, rgba(0,119,255,0.07) 0%, transparent 70%)",
          pointerEvents: "none",
        }}
      />

      <div style={{ maxWidth: 680, margin: "0 auto", position: "relative" }}>
        <p style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.18em", textTransform: "uppercase", color: "#0077ff", marginBottom: 16, textAlign: "center" }}>
          Contato
        </p>
        <h2 style={{ fontSize: "clamp(32px, 4vw, 52px)", fontWeight: 800, letterSpacing: "-0.03em", color: "#fff", textAlign: "center", margin: "0 0 16px", lineHeight: 1.1 }}>
          Vamos construir algo
          <br />
          <span style={{ color: "#0077ff" }}>extraordinário.</span>
        </h2>
        <p style={{ fontSize: 16, lineHeight: 1.75, color: "#6b7a96", textAlign: "center", margin: "0 0 56px" }}>
          Respondo em até 24h. Projetos sérios, parceria de longo prazo ou só uma conversa
          técnica — todas as mensagens são bem-vindas.
        </p>

        {sent ? (
          <div style={{ textAlign: "center", padding: "60px 40px", background: "rgba(0,119,255,0.07)", border: "1px solid rgba(0,119,255,0.25)", borderRadius: 4 }}>
            <div style={{ width: 52, height: 52, borderRadius: "50%", background: "rgba(0,229,160,0.12)", border: "1px solid rgba(0,229,160,0.35)", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 20px" }}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path d="M5 12l5 5 9-9" stroke="#00e5a0" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
            <p style={{ fontSize: 18, fontWeight: 700, color: "#fff", margin: "0 0 8px" }}>Mensagem enviada!</p>
            <p style={{ fontSize: 14, color: "#6b7a96", margin: 0 }}>Retorno em breve. Obrigado pelo contato.</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: 18 }}>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 18 }}>
              {(["name", "email"] as const).map((field) => (
                <div key={field}>
                  <label style={{ display: "block", fontSize: 11, fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: "#4a5a70", marginBottom: 8 }}>
                    {field === "name" ? "Nome" : "E-mail"}
                  </label>
                  <input
                    type={field === "email" ? "email" : "text"}
                    required
                    value={form[field]}
                    onChange={(e) => setForm((f) => ({ ...f, [field]: e.target.value }))}
                    placeholder={field === "name" ? "Alexandre Costa" : "alex@exemplo.com"}
                    style={{ width: "100%", background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.09)", borderRadius: 4, padding: "12px 16px", fontSize: 14, color: "#c8d8f0", outline: "none", transition: "border-color 0.2s", fontFamily: "inherit" }}
                    onFocus={(e) => (e.currentTarget.style.borderColor = "rgba(0,119,255,0.5)")}
                    onBlur={(e) => (e.currentTarget.style.borderColor = "rgba(255,255,255,0.09)")}
                  />
                </div>
              ))}
            </div>

            <div>
              <label style={{ display: "block", fontSize: 11, fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: "#4a5a70", marginBottom: 8 }}>
                Mensagem
              </label>
              <textarea
                required
                rows={5}
                value={form.message}
                onChange={(e) => setForm((f) => ({ ...f, message: e.target.value }))}
                placeholder="Conte sobre seu projeto, prazo e orçamento estimado..."
                style={{ width: "100%", background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.09)", borderRadius: 4, padding: "12px 16px", fontSize: 14, color: "#c8d8f0", outline: "none", resize: "vertical", fontFamily: "inherit", transition: "border-color 0.2s" }}
                onFocus={(e) => (e.currentTarget.style.borderColor = "rgba(0,119,255,0.5)")}
                onBlur={(e) => (e.currentTarget.style.borderColor = "rgba(255,255,255,0.09)")}
              />
            </div>

            <button
              type="submit"
              style={{ background: "#0077ff", color: "#fff", fontWeight: 700, fontSize: 14, letterSpacing: "0.08em", textTransform: "uppercase", padding: "14px 32px", borderRadius: 4, border: "none", cursor: "pointer", fontFamily: "inherit", alignSelf: "flex-start", display: "flex", alignItems: "center", gap: 10, transition: "background 0.2s, transform 0.15s" }}
              onMouseEnter={(e) => {
                ;(e.currentTarget as HTMLElement).style.background = "#1a8fff"
                ;(e.currentTarget as HTMLElement).style.transform = "translateY(-2px)"
              }}
              onMouseLeave={(e) => {
                ;(e.currentTarget as HTMLElement).style.background = "#0077ff"
                ;(e.currentTarget as HTMLElement).style.transform = "translateY(0)"
              }}
            >
              Enviar Mensagem
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M2 8h12M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
          </form>
        )}
      </div>
    </section>
  )
}

function Footer() {
  return (
    <footer style={{ borderTop: "1px solid rgba(255,255,255,0.05)", padding: "32px", maxWidth: 1280, margin: "0 auto", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 16 }}>
      <span style={{ fontSize: 18, fontWeight: 800, color: "#fff", letterSpacing: "-0.03em" }}>
        alex<span style={{ color: "#0077ff" }}>.</span>dev
      </span>
      <span style={{ fontSize: 12, color: "#4a5a70" }}>
        © 2024 Alexandre Costa — Todos os direitos reservados
      </span>
      <div style={{ display: "flex", gap: 20 }}>
        {["GitHub", "LinkedIn", "Twitter"].map((s) => (
          <a
            key={s}
            href="#"
            style={{ fontSize: 12, fontWeight: 600, color: "#4a5a70", textDecoration: "none", letterSpacing: "0.06em", transition: "color 0.2s" }}
            onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.color = "#0077ff")}
            onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.color = "#4a5a70")}
          >
            {s}
          </a>
        ))}
      </div>
    </footer>
  )
}

// ─── main ─────────────────────────────────────────────────────────────────────

export default function App() {
  const [activeSection, setActiveSection] = useState("")

  useEffect(() => {
    const sections = document.querySelectorAll("section[id]")
    const obs = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            const id = e.target.getAttribute("id") ?? ""
            const label = NAV_LINKS.find((l) => l.toLowerCase() === id)
            if (label) setActiveSection(label)
          }
        }
      },
      { threshold: 0.4 }
    )
    sections.forEach((s) => obs.observe(s))
    return () => obs.disconnect()
  }, [])

  return (
    <div style={{ background: "#070b14", minHeight: "100vh" }}>
      <NavBar active={activeSection} />
      <HeroSection />
      <AboutSection />
      <ProjectsSection />
      <SkillsSection />
      <ContactSection />
      <Footer />
    </div>
  )
}
