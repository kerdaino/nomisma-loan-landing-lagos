import "./style.css";
import { NOMISMA_CONFIG as config } from "./config.js";

const money = (value) =>
  new Intl.NumberFormat("en-NG", {
    style: "currency",
    currency: "NGN",
    maximumFractionDigits: 0,
  }).format(value);
const arrow = '<span aria-hidden="true">↗</span>';
const whatsappMessage =
  "Hello Nomisma, I would like to apply for a loan through the Lagos application page. Please assist me with the next steps.";
const applicationUrl = `https://wa.me/${config.whatsappNumber}?text=${encodeURIComponent(whatsappMessage)}`;
const applicationLinkAttributes = `href="${applicationUrl}" target="_blank" rel="noopener noreferrer"`;

document.querySelector("#app").innerHTML = `
<a class="skip-link" href="#main">Skip to content</a>
<div class="announcement">Your next move starts with a conversation.</div>
<header class="container header"><a href="#" aria-label="Nomisma Financial Services home"><img class="logo" src="/assets/nomisma-logo.jpeg" width="1280" height="475" alt="Nomisma — ...adding value"></a><nav aria-label="Main navigation"><a class="nav-link" href="#how-it-works">How it works</a><a class="button primary" ${applicationLinkAttributes}>Apply Now ${arrow}</a></nav></header>
<main id="main">
<section class="hero"><div class="container hero-grid">
<div class="hero-copy"><h1>Making your <em>financial goals easier</em></h1><p class="lead">Whether you are a salary earner or a business owner, start your loan application with Nomisma.</p>
<section class="financing-terms" aria-labelledby="terms-title"><h2 id="terms-title" class="eyebrow">Interest rates</h2><dl><div><dt>${config.shortTermLabel}</dt><dd>${config.rateShortTerm}% monthly</dd></div><div><dt>${config.longTermLabel}</dt><dd>${config.rateLongTerm}% monthly</dd></div></dl></section>
<div class="actions"><a class="button primary" ${applicationLinkAttributes}>Apply Now ${arrow}</a></div></div>
<section class="application-card" aria-labelledby="application-title"><div class="application-heading"><p class="eyebrow">Let’s get started</p><span class="application-tag">Loan application</span></div><h2 id="application-title">Start your loan application.</h2><p>Chat with the Lagos team on WhatsApp to begin your application and receive the next steps.</p><p class="application-range">Available loan range: <strong>${money(config.loanMin)}–${money(config.loanMax)}</strong></p><a class="button primary application-button" ${applicationLinkAttributes}>Apply Now ${arrow}</a><p class="application-footnote">A loan application is the first step. It is not a loan approval.</p></section></div></section>
<section class="container serve section" aria-labelledby="serve-title"><div class="section-heading"><div><p class="eyebrow">Who we serve</p><h2 id="serve-title">Different goals.<br>The same thoughtful approach.</h2></div><p>Personal priorities or business possibilities.<br>Tell us what moving forward means to you.</p></div><div class="serve-grid"><article class="serve-card"><div class="card-top"><span class="line-icon" aria-hidden="true">♙</span><span class="card-label">Personal needs</span></div><h3>Salary Earners</h3><p>Explore loan options for important personal needs and planned expenses, subject to an assessment of your circumstances.</p><a ${applicationLinkAttributes}>Apply as a Salary Earner ${arrow}</a></article><article class="serve-card business"><div class="card-top"><span class="line-icon" aria-hidden="true">▤</span><span class="card-label">Business goals</span></div><h3>Business Owners</h3><p>Start a conversation about working capital, expansion or other eligible needs for the business you are building.</p><a ${applicationLinkAttributes}>Apply as a Business Owner ${arrow}</a></article></div></section>
<section class="process section" id="how-it-works"><div class="container"><p class="eyebrow">How it works</p><h2>A clear place to start</h2><ol class="steps"><li><span>01</span><h3>Start your application</h3><p>Contact the Lagos team directly on WhatsApp.</p></li><li><span>02</span><h3>Eligibility review</h3><p>Nomisma reviews your application as the first step in assessing eligibility.</p></li><li><span>03</span><h3>Discuss your next steps</h3><p>A Nomisma representative contacts you with the appropriate next steps.</p></li></ol></div></section>
<section class="container disclosure"><span class="notice-icon" aria-hidden="true">i</span><div><h2>Before you apply</h2><p>Submitting a loan application does not constitute loan approval. Loan amount, eligibility, documentation requirements, repayment terms and final approval are subject to Nomisma’s assessment and applicable terms. Advertised rates are based on the selected repayment duration.</p></div></section>
<section class="container final-cta"><div><h2>So what’s next?</h2><p>Start your loan application.</p></div><div class="actions"><a class="button lime" ${applicationLinkAttributes}>Apply Now ${arrow}</a></div></section>
</main><footer class="container footer"><div><strong>Nomisma Financial Services</strong><p class="tagline">...adding value</p></div><p class="copyright">© ${new Date().getFullYear()} Nomisma Financial Services.<br>All rights reserved.</p></footer>
<nav class="mobile-bar" aria-label="Quick action"><a class="button primary" ${applicationLinkAttributes}>Apply Now ${arrow}</a></nav>`;

// Keep the quick action available on mobile without covering key content.
if (typeof IntersectionObserver !== "undefined") {
  const mobileBar = document.querySelector(".mobile-bar");
  const visibleSections = new Set();
  const observer = new IntersectionObserver((entries) => {
    for (const entry of entries) {
      if (entry.isIntersecting) visibleSections.add(entry.target);
      else visibleSections.delete(entry.target);
    }
    mobileBar.hidden = visibleSections.size > 0;
  });
  for (const section of document.querySelectorAll(
    ".application-card, .financing-terms, .disclosure, .footer",
  )) {
    observer.observe(section);
  }
}
