import React, { useEffect, useMemo, useRef, useState } from "react";
import { createRoot } from "react-dom/client";
import "./styles.css";

const GMAIL =
  "https://mail.google.com/mail/?view=cm&fs=1&to=sashwat2005solanki@gmail.com&su=Portfolio%20Inquiry";

const API_BASE = (import.meta.env.VITE_API_URL || "").replace(/\/$/, "");

const projects = [
  {
    number: "01",
    title: "SRGPC",
    label: "FULL-STACK CERTIFICATE SYSTEM",
    color: "#a995ff",
    summary:
      "A complete digital certificate workflow for students and administrators — requests, templates, digital signatures, unique IDs, QR verification and downloads.",
    chips: ["PYTHON", "WEB APP", "AUTH", "QR", "PDF"],
    metric: "03",
    metricLabel: "CORE WORKFLOWS",
    shape: "certificate",
  },
  {
    number: "02",
    title: "WATERMARK",
    label: "IMAGE WATERMARKING TOOL",
    color: "#71e6ff",
    summary:
      "A Python desktop application for watermarking images and PDF documents with editable text and logo overlays, image adjustments, batch processing, metadata controls and optional encryption, plus a companion verifier.",
    chips: ["PYTHON", "TKINTER", "PDF", "AES-GCM", "BATCH"],
    metric: "02",
    metricLabel: "DESKTOP APPS",
    shape: "verify",
  },
  {
    number: "03",
    title: "SRGPC",
    label: "MOBILE APP",
    color: "#ffb17e",
    summary:
      "The mobile version of the certificate platform — Google sign-in, permissions, downloads and mobile-specific interface fixes.",
    chips: ["MOBILE APP", "GOOGLE SIGN-IN", "APK"],
    metric: "01",
    metricLabel: "MOBILE EXPERIENCE",
    shape: "mobile",
  },
];

const capabilities = [
  ["01", "Frontend", "Responsive UI, React, motion design"],
  ["02", "Backend", "Python, APIs, application logic"],
  ["03", "Data", "Database integration, structured workflows"],
  ["04", "Auth", "Google sign-in, sessions, user flows"],
  ["05", "AI", "AI-assisted development and debugging"],
  ["06", "Deploy", "GitHub, cloud deployment, app packaging"],
];

function clamp(v, min = 0, max = 1) {
  return Math.min(max, Math.max(min, v));
}

function lerp(a, b, t) {
  return a + (b - a) * t;
}

function useScrollProgress() {
  const ref = useRef(null);
  const [value, setValue] = useState(0);

  useEffect(() => {
    let raf = 0;
    const update = () => {
      const el = ref.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const travel = Math.max(1, el.offsetHeight - window.innerHeight);
      setValue(clamp(-rect.top / travel));
      raf = 0;
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    update();
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  return [ref, value];
}

function Reveal({ children, delay = 0, className = "" }) {
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.style.setProperty("--delay", `${delay}s`);
          el.classList.add("show");
          observer.disconnect();
        }
      },
      { threshold: 0.1, rootMargin: "0px 0px -50px" }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [delay]);
  return <div ref={ref} className={`reveal ${className}`}>{children}</div>;
}

function Icon({ name, size = 18 }) {
  const props = {
    width: size,
    height: size,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.6,
    strokeLinecap: "round",
    strokeLinejoin: "round",
    "aria-hidden": true,
  };
  const paths = {
    arrow: <><path d="M5 12h13"/><path d="m13 6 6 6-6 6"/></>,
    arrowUp: <><path d="M5 19 19 5"/><path d="M9 5h10v10"/></>,
    down: <><path d="M12 4v16"/><path d="m7 15 5 5 5-5"/></>,
    menu: <><path d="M4 7h16"/><path d="M4 12h16"/><path d="M4 17h16"/></>,
    x: <><path d="m6 6 12 12"/><path d="m18 6-12 12"/></>,
    github: <><path d="M15 22v-4.4a3.4 3.4 0 0 0-.9-2.5c2.9-.3 5.9-1.4 5.9-6.2a4.8 4.8 0 0 0-1.3-3.4 4.5 4.5 0 0 0-.1-3.4s-1.1-.4-3.6 1.3a12.4 12.4 0 0 0-6.6 0C5.9 2.5 4.8 3 4.8 3a4.5 4.5 0 0 0-.1 3.4 4.8 4.8 0 0 0-1.3 3.4c0 4.8 3 5.9 5.9 6.2a3.4 3.4 0 0 0-.9 2.5V22"/><path d="M8 18c-3 .9-3-1.5-4.2-2"/></>,
    linkedin: <><path d="M5 4h.01"/><path d="M4 8h2v12H4z"/><path d="M10 8h2v2.1A4.2 4.2 0 0 1 16 8c3 0 4 2 4 5v7h-2v-6.3c0-1.7-.6-3-2.2-3-1.7 0-2.8 1.2-2.8 3.4V20h-2z"/></>,
    mail: <><rect x="3" y="5" width="18" height="14" rx="2"/><path d="m3 7 9 6 9-6"/></>,
    grid: <><rect x="4" y="4" width="6" height="6"/><rect x="14" y="4" width="6" height="6"/><rect x="4" y="14" width="6" height="6"/><rect x="14" y="14" width="6" height="6"/></>,
    check: <><path d="m5 12 4 4L19 6"/></>,
    phone: <><rect x="7" y="2.5" width="10" height="19" rx="2"/><path d="M10 5h4"/><path d="M11 18.5h2"/></>,
    code: <><path d="m8 9-4 3 4 3"/><path d="m16 9 4 3-4 3"/><path d="m14 5-4 14"/></>,
    layers: <><path d="m12 3 8 4-8 4-8-4z"/><path d="m4 12 8 4 8-4"/><path d="m4 16 8 4 8-4"/></>,
  };
  return <svg {...props}>{paths[name]}</svg>;
}



function ReactorIntro() {
  const [ref, p] = useScrollProgress();

  const reveal = clamp(p / 0.12);
  const split = clamp((p - 0.08) / 0.24);
  const portal = clamp((p - 0.22) / 0.26);
  const tunnel = clamp((p - 0.43) / 0.34);
  const role = clamp((p - 0.63) / 0.22);
  const exit = clamp((p - 0.84) / 0.16);

  const nameX = split * 13;
  const nameSkew = split * 7;
  const nameScale = 1 + reveal * 0.025 + portal * 0.12;
  const portalScale = 0.08 + portal * 1.18;
  const portalRotate = -18 + portal * 52;
  const scanX = clamp((p - 0.14) / 0.34);
  const cameraTilt = tunnel * 8;

  const planes = Array.from({ length: 7 }, (_, i) => {
    const depth = i / 6;
    return {
      i,
      z: lerp(-520, 140, tunnel) + depth * 120,
      y: (i - 3) * 8 - tunnel * (i - 3) * 10,
      x: (i - 3) * 5 + tunnel * (i % 2 ? 8 : -8),
      rotate: (i - 3) * 1.8 - tunnel * (i - 3) * 4,
      opacity: clamp(0.08 + tunnel * (0.18 + (1 - Math.abs(i - 3) / 3) * 0.24)),
    };
  });

  return (
    <section ref={ref} id="home" className="reactor-intro">
      <div className="reactor-sticky">
        <div className="reactor-vignette" />
        <div className="reactor-grid" style={{ transform: `translate3d(${p * -6}%,${p * 8}%,0) rotate(${p * 1.8}deg) scale(${1 + p * .08})` }} />
        <div className="reactor-crosshair" style={{ opacity: .32 + portal * .5, transform: `scale(${.6 + portal * .8}) rotate(${portal * 45}deg)` }}>
          <i className="h" /><i className="v" /><b />
        </div>

        <div className="reactor-name-wrap" style={{ opacity: 1 - exit * .85, perspective: 1200 }}>
          <div
            className="reactor-name reactor-name-main"
            style={{
              transform: `translate3d(${nameX}vw,${-split * 2}vh,${portal * 180}px) scale(${nameScale}) skewX(${-nameSkew}deg)`,
              clipPath: `inset(${split * 4}% 0 ${split * 2}% 0)`,
            }}
          >SHASHWAT</div>
          <div
            className="reactor-name reactor-name-outline"
            style={{
              transform: `translate3d(${-nameX}vw,${split * 2.4}vh,${portal * 150}px) scale(${1 + reveal * .015 + portal * .11}) skewX(${nameSkew}deg)`,
              clipPath: `inset(${split * 2}% 0 0 0)`,
            }}
          >SOLANKI</div>
          <div className="reactor-name-sub" style={{ opacity: reveal * (1 - exit) }}>
            SOFTWARE DEVELOPER <span>/</span> PRODUCT BUILDER
          </div>
        </div>

        <div
          className="reactor-portal"
          style={{
            transform: `translate(-50%,-50%) scale(${portalScale}) rotate(${portalRotate}deg) skewX(${portal * 4}deg)`,
            opacity: .08 + portal * .88,
          }}
        >
          <div className="portal-square p1" />
          <div className="portal-square p2" />
          <div className="portal-square p3" />
          <div className="portal-square p4" />
          <div className="portal-diamond" />
          <div className="portal-core" />
        </div>

        <div className="reactor-scan" style={{ left: `${lerp(-10, 110, scanX)}%`, opacity: clamp((p - .11) / .06) * (1 - exit) }} />

        <div className="reactor-tunnel" style={{ opacity: tunnel * .95, transform: `rotateX(${cameraTilt}deg) scale(${.82 + tunnel * .25})` }}>
          {planes.map((plane) => (
            <div
              key={plane.i}
              className="reactor-plane"
              style={{
                transform: `translate3d(${plane.x}%,${plane.y}%,${plane.z}px) rotate(${plane.rotate}deg)`,
                opacity: plane.opacity,
              }}
            >
              <span>SHASHWAT</span>
              <i />
            </div>
          ))}
        </div>

        <div className="reactor-role" style={{ opacity: role, transform: `translateY(${(1 - role) * 70}px) scale(${.94 + role * .06})` }}>
          <div className="reactor-role-title">
            <span>SOFTWARE</span>
            <span>DEVELOPER</span>
          </div>
          <div className="reactor-role-meta">
            <p>I build digital products where code, interfaces and motion work as one system.</p>
          </div>
        </div>

        <div className="reactor-bottom-line" style={{ transform: `scaleX(${clamp((p - .42) / .25)})`, opacity: clamp((p - .4) / .08) * (1 - exit) }} />
      </div>
    </section>
  );
}

function ProjectArtwork({ project, local }) {
  const primary = project.color;
  return (
    <div className={`project-art art-${project.shape}`} style={{ "--project-color": primary }}>
      <div className="art-grid" />
      <div className="art-ghost">{project.number}</div>

      {project.shape === "certificate" && (
        <>
          <div className="paper-sheet" style={{ transform: `rotate(${lerp(-9, -2, local)}deg) scale(${.86 + local * .1})` }}>
            <div className="paper-top">SRGPC</div>
            <div className="paper-line wide" />
            <div className="paper-line" />
            <div className="paper-line short" />
            <div className="paper-seal">QR</div>
            <div className="paper-footer">CERTIFICATE / VERIFIED</div>
          </div>
          <div className="art-orbit orbit-a" style={{ transform: `translate(-50%,-50%) rotate(${local * 110}deg)` }} />
          <div className="art-orbit orbit-b" />
        </>
      )}

      {project.shape === "verify" && (
        <>
          <div className="watermark-board" style={{ transform: `rotate(${lerp(-5, 2, local)}deg) scale(${.92 + local * .08})` }}>
            <div className="wm-toolbar">
              <span>WATERMARK STUDIO</span>
              <b>READY</b>
            </div>
            <div className="wm-canvas">
              <div className="wm-photo" />
              <div className="wm-text">SHASHWAT</div>
              <div className="wm-corner">© 2026</div>
            </div>
            <div className="wm-controls">
              <span>OPACITY</span><i /><span>ROTATION</span><i /><span>EXPORT</span><b>PDF / PNG</b>
            </div>
          </div>
          <div className="watermark-stamp" style={{ transform: `translate(-50%,-50%) rotate(${-16 + local * 22}deg)` }}>
            PROTECTED
          </div>
        </>
      )}

      {project.shape === "mobile" && (
        <>
          <div className="phone-device" style={{ transform: `translateY(${lerp(30, -10, local)}px) rotate(${lerp(7, -1, local)}deg)` }}>
            <div className="phone-notch" />
            <div className="phone-ui">
              <span className="phone-brand">SRGPC</span>
              <div className="phone-card-big">MY CERTIFICATE</div>
              <div className="phone-row"><b>VERIFIED</b><span>QR</span></div>
              <div className="phone-row"><b>DOWNLOAD</b><span>PDF</span></div>
            </div>
          </div>
          <div className="phone-orbit" />
        </>
      )}
    </div>
  );
}

function ProjectReel({ projects: projectData = projects }) {
  const [ref, p] = useScrollProgress();
  const position = p * (projectData.length - 1);
  const current = Math.min(projectData.length - 1, Math.floor(position));
  const local = position - current;
  const next = Math.min(projectData.length - 1, current + 1);
  const currentProject = projectData[current];
  const nextProject = projectData[next];

  return (
    <section ref={ref} id="work" className="project-reel">
      <div className="sticky-project">
        <div className="project-heading">
          <div>
            <small>02 / SELECTED WORK</small>
            <h2>PROJECTS<br /><span>IN MOTION.</span></h2>
          </div>
          <div className="project-heading-meta">
            <b>{String(current + 1).padStart(2, "0")} / {projectData.length.toString().padStart(2, "0")}</b>
          </div>
        </div>

        <div className="project-stage">
          <div className="project-index">
            {projectData.map((project, i) => {
              const active = i === current || (i === next && local > .65);
              return (
                <button
                  key={project.number}
                  className={active ? "active" : ""}
                  onClick={() => {
                    const root = ref.current;
                    if (!root) return;
                    const target = root.offsetTop +
                      (i / (projectData.length - 1)) * (root.offsetHeight - window.innerHeight);
                    window.scrollTo({ top: target, behavior: "smooth" });
                  }}
                >
                  <span>{project.number}</span>
                  <small>{project.title}</small>
                  <em>{i === 2 ? "MOBILE APP" : project.label}</em>
                </button>
              );
            })}
          </div>

          <div className="project-frame">
            <div className="project-frame-inner">
              <article
                className="project-layer"
                style={{
                  opacity: 1 - local * .96,
                  transform: `translate3d(0,${-local * 75}px,0) scale(${1 - local * .06})`,
                  "--project-color": currentProject.color,
                }}
              >
                <div className="project-copy">
                  <small>{currentProject.number} / {currentProject.label}</small>
                  <h3>{currentProject.title}</h3>
                  <p>{currentProject.summary}</p>
                  <div className="chip-row">
                    {currentProject.chips.map((chip) => <span key={chip}>{chip}</span>)}
                  </div>
                  <div className="project-metric">
                    <strong>{currentProject.metric}</strong>
                    <span>{currentProject.metricLabel}</span>
                  </div>
                </div>
                <ProjectArtwork project={currentProject} local={local} />
              </article>

              {next !== current && (
                <article
                  className="project-layer next"
                  style={{
                    opacity: local,
                    transform: `translate3d(0,${(1 - local) * 100}px,0) scale(${.93 + local * .07})`,
                    "--project-color": nextProject.color,
                  }}
                >
                  <div className="project-copy">
                    <small>{nextProject.number} / {nextProject.label}</small>
                    <h3>{nextProject.title}</h3>
                    <p>{nextProject.summary}</p>
                    <div className="chip-row">
                      {nextProject.chips.map((chip) => <span key={chip}>{chip}</span>)}
                    </div>
                    <div className="project-metric">
                      <strong>{nextProject.metric}</strong>
                      <span>{nextProject.metricLabel}</span>
                    </div>
                  </div>
                  <ProjectArtwork project={nextProject} local={0} />
                </article>
              )}

              <div className="project-frame-footer">
                <span>{currentProject.label}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function WorkflowSection() {
  const [ref, p] = useScrollProgress();
  const steps = [
    ["REQUEST", "student submits a certificate request"],
    ["GENERATE", "admin selects a template and signs"],
    ["VERIFY", "unique ID and QR code become the proof"],
    ["DELIVER", "certificate is downloaded and stored"],
  ];
  return (
    <section ref={ref} className="workflow-reel">
      <div className="sticky-workflow">
        <div className="workflow-copy">
          <small>03 / FLAGSHIP PROJECT</small>
          <h2>FROM REQUEST<br /><span>TO VERIFIED.</span></h2>
          <p>
            A scroll-driven case study of the SRGPC Certificate System — the project
            that best represents how you approach real product problems.
          </p>
          <div className="workflow-number">{String(Math.min(4, Math.floor(p * 4) + 1)).padStart(2, "0")} / 04</div>
        </div>

        <div className="workflow-visual">
          <div className="workflow-canvas">
            <div className="workflow-grid" />
            <div className="workflow-core" style={{ transform: `translate(-50%,-50%) rotate(${p * 180}deg)` }}>
              <span>SRGPC</span>
              <b>VERIFY</b>
            </div>
            <div className="workflow-line" />
            {steps.map((step, i) => {
              const start = i / steps.length;
              const end = (i + 1) / steps.length;
              const visibility = clamp((p - start) / .18);
              const x = lerp(80, 0, visibility);
              const active = p >= start && p <= end + .08;
              return (
                <div
                  key={step[0]}
                  className={`workflow-step ${active ? "active" : ""}`}
                  style={{
                    opacity: visibility,
                    transform: `translate3d(${i % 2 === 0 ? -x : x}px,0,0)`,
                    top: `${18 + i * 21}%`,
                    left: i % 2 === 0 ? "8%" : "52%",
                  }}
                >
                  <span>{String(i + 1).padStart(2, "0")}</span>
                  <div>
                    <b>{step[0]}</b>
                    <small>{step[1]}</small>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}


function CapabilitiesReel({ capabilities: capabilityData = capabilities }) {
  const [ref, p] = useScrollProgress();
  const active = Math.min(capabilityData.length - 1, Math.floor(p * capabilityData.length));
  const local = p * capabilityData.length - active;

  return (
    <section ref={ref} className="capabilities-reel">
      <div className="sticky-capabilities">
        <div className="cap-back-number">{String(active + 1).padStart(2, "0")}</div>

        <div className="cap-head">
          <div>
            <small>06 / CAPABILITIES</small>
            <h2>WHAT I<br /><span>WORK WITH.</span></h2>
            <p>
              The toolkit behind the projects: interfaces, application logic,
              data, authentication, AI-assisted development and deployment.
            </p>
          </div>

        </div>

        <div className="cap-stage">
          <div className="cap-rail">
            <div className="cap-rail-fill" style={{ transform: `scaleX(${p})` }} />
          </div>

          <div className="cap-items">
            {capabilityData.map((capability, i) => {
              const { number: num, title, summary: text } = capability;
              const isActive = i === active;
              const entering = i === active + 1;
              const leaving = i === active - 1;

              let opacity = 0;
              let y = 90;
              let scale = 0.84;
              let rotate = 5;

              if (isActive) {
                opacity = 1;
                y = lerp(0, -70, local);
                scale = lerp(1, 0.94, local);
                rotate = lerp(0, -3, local);
              } else if (entering) {
                opacity = local;
                y = lerp(90, 0, local);
                scale = lerp(0.84, 1, local);
                rotate = lerp(5, 0, local);
              } else if (leaving) {
                opacity = (1 - local) * 0.4;
                y = lerp(-70, -120, local);
                scale = lerp(0.94, 0.9, local);
                rotate = -4;
              }

              return (
                <article
                  key={num}
                  className={`cap-item ${isActive ? "active" : ""}`}
                  style={{
                    opacity,
                    transform: `translate3d(0,${y}px,0) scale(${scale}) rotateX(${rotate}deg)`,
                    zIndex: isActive ? 3 : entering ? 2 : 1,
                  }}
                >
                  <div className="cap-item-no">{num}</div>
                  <div className="cap-item-copy">
                    <h3>{title}</h3>
                    <p>{text}</p>
                  </div>
                  <div className="cap-item-shape">
                    <span>{title.slice(0, 1)}</span>
                    <i />
                    <i />
                    <i />
                  </div>
                </article>
              );
            })}
          </div>
        </div>

      </div>
    </section>
  );
}

function AboutSection() {
  const [ref, p] = useScrollProgress();
  return (
    <section ref={ref} id="about" className="about-reel">
      <div className="sticky-about">
        <div className="about-big-number" style={{ transform: `translateY(${(1 - p) * 90}px)` }}>05</div>
        <div className="about-left">
          <small>05 / ABOUT</small>
          <h2>THE LAST<br /><span>10% MATTERS.</span></h2>
        </div>
        <div className="about-right">
          <p>
            I like taking messy ideas and turning them into software that another
            person can actually use — not just a demo that works once.
          </p>
          <p>
            My work spans frontend, backend, databases, authentication, QR
            verification, mobile apps, deployment and AI-assisted development.
          </p>
          <div className="principles">
            {[
              ["BUILD", "turn ideas into interfaces"],
              ["TEST", "use it like a real user"],
              ["FIX", "hunt the annoying details"],
              ["SHIP", "make it reachable"],
            ].map(([a,b], i) => (
              <div key={a} style={{ transform: `translateY(${(1 - clamp(p * 1.5 - i*.14)) * 22}px)`, opacity: clamp(p * 2 - i*.18) }}>
                <span>0{i+1}</span>
                <b>{a}</b>
                <small>{b}</small>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function InquiryForm() {
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState("idle");

  const submit = async (e) => {
    e.preventDefault();
    setStatus("sending");
    try {
      const response = await fetch(`${API_BASE}/api/contact`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (!response.ok) throw new Error("Unable to send");
      setStatus("sent");
      setForm({ name: "", email: "", message: "" });
    } catch {
      setStatus("error");
    }
  };

  if (!open) {
    return (
      <button type="button" className="inquiry-toggle" onClick={() => setOpen(true)}>
        SEND AN INQUIRY <Icon name="arrow" size={16} />
      </button>
    );
  }

  return (
    <form className="inquiry-form" onSubmit={submit}>
      <div className="inquiry-row">
        <label>NAME<input required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} maxLength={120} /></label>
        <label>EMAIL<input required type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} maxLength={180} /></label>
      </div>
      <label>MESSAGE<textarea required rows={4} value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} maxLength={2000} /></label>
      <div className="inquiry-actions">
        <button type="submit" disabled={status === "sending"}>
          {status === "sending" ? "SENDING…" : status === "sent" ? "SENT ✓" : "SEND MESSAGE"}
        </button>
        <button type="button" className="inquiry-close" onClick={() => setOpen(false)}>CLOSE</button>
        {status === "error" && <span role="status">Couldn&apos;t send — use Gmail above.</span>}
      </div>
    </form>
  );
}

function ContactSection() {
  const [ref, p] = useScrollProgress();
  return (
    <section ref={ref} id="contact" className="contact-reel">
      <div className="sticky-contact">
        <div className="contact-back" style={{ transform: `scale(${1 + p * .22}) translateY(${p * -50}px)` }}>
          LET&apos;S
        </div>
        <div className="contact-content">
          <small>07 / CONTACT</small>
          <h2>HAVE AN IDEA?<br /><span>LET&apos;S BUILD IT.</span></h2>
          <a className="contact-email" href={GMAIL} target="_blank" rel="noopener noreferrer">
            sashwat2005solanki@gmail.com <Icon name="arrowUp" size={18} />
          </a>
          <InquiryForm />
          <div className="contact-grid">
            <a href="https://github.com/shazzxz" target="_blank" rel="noopener noreferrer"><Icon name="github" size={16} /> GitHub</a>
            <a href="https://www.linkedin.com/in/shashwat-solanki-80a326390/" target="_blank" rel="noopener noreferrer"><Icon name="linkedin" size={16} /> LinkedIn</a>
            <a href={GMAIL} target="_blank" rel="noopener noreferrer"><Icon name="mail" size={16} /> Gmail</a>
            <a href="https://discord.com/users/wuk0nggg" target="_blank" rel="noopener noreferrer">◉ Discord</a>
          </div>
        </div>
      </div>
    </section>
  );
}

function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scroll, setScroll] = useState(0);
  const [cursor, setCursor] = useState({ x: 0, y: 0, active: false });
  const [projectData, setProjectData] = useState(projects);
  const [capabilityData, setCapabilityData] = useState(capabilities);

  useEffect(() => {
    let cancelled = false;
    fetch(`${API_BASE}/api/portfolio`)
      .then((response) => {
        if (!response.ok) throw new Error("Portfolio API unavailable");
        return response.json();
      })
      .then((payload) => {
        if (cancelled) return;
        if (Array.isArray(payload.projects) && payload.projects.length) setProjectData(payload.projects);
        if (Array.isArray(payload.capabilities) && payload.capabilities.length) setCapabilityData(payload.capabilities);
      })
      .catch(() => {})
      ;
    return () => { cancelled = true; };
  }, []);

  useEffect(() => {
    let raf = 0;
    const onScroll = () => {
      if (raf) return;
      raf = requestAnimationFrame(() => {
        const max = document.documentElement.scrollHeight - window.innerHeight;
        setScroll(max > 0 ? window.scrollY / max : 0);
        raf = 0;
      });
    };
    const onMove = (e) => {
      const target = e.target instanceof Element
        ? e.target.closest("button,a,.interactive")
        : null;
      setCursor({
        x: e.clientX / Math.max(window.innerWidth, 1),
        y: e.clientY / Math.max(window.innerHeight, 1),
        active: Boolean(target),
      });
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("pointermove", onMove, { passive: true });
    onScroll();
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("pointermove", onMove);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  const go = (id) => {
    setMenuOpen(false);
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="site">
      <div className="scrollbar" style={{ transform: `scaleX(${scroll})` }} />
      <div
        className={`cursor ${cursor.active ? "active" : ""}`}
        style={{ left: `${cursor.x * 100}%`, top: `${cursor.y * 100}%` }}
      />
      <div className="noise" />

      <header className="nav">
        <button type="button" className="brand" onClick={() => go("home")} aria-label="Go to home">
          <span className="brand-box">SS</span>
          <span>SHASHWAT.</span>
        </button>
        <div className="nav-center">SOFTWARE / MOTION / 2026</div>
        <nav className={menuOpen ? "open" : ""}>
          <button type="button" onClick={() => go("work")}>WORK</button>
          <button type="button" onClick={() => go("about")}>ABOUT</button>
          <button type="button" onClick={() => go("contact")}>CONTACT</button>
          <a href={GMAIL} target="_blank" rel="noopener noreferrer">LET&apos;S TALK ↗</a>
        </nav>
        <button type="button" className="menu" onClick={() => setMenuOpen(v => !v)} aria-label={menuOpen ? "Close menu" : "Open menu"}>
          <Icon name={menuOpen ? "x" : "menu"} size={20} />
        </button>
      </header>

      <main>
        <ReactorIntro />
        <ProjectReel projects={projectData} />
        <WorkflowSection />
        <CapabilitiesReel capabilities={capabilityData} />
        <AboutSection />
        <ContactSection />
      </main>

      <footer>
        <span>© 2026 SHASHWAT SOLANKI</span>
      </footer>
    </div>
  );
}

createRoot(document.getElementById("root")).render(<App />);