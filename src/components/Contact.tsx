"use client";

import { FormEvent, useState } from "react";
import Reveal from "./Reveal";

export default function Contact() {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">(
    "idle",
  );
  const [message, setMessage] = useState("");

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("loading");
    setMessage("");

    const form = e.currentTarget;
    const data = new FormData(form);

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: data.get("name"),
          email: data.get("email"),
          subject: data.get("subject"),
          message: data.get("message"),
        }),
      });

      if (!res.ok) throw new Error("Failed to send");

      setStatus("success");
      setMessage("Message sent. We will get back to you shortly.");
      form.reset();
    } catch {
      setStatus("error");
      setMessage("Unable to send. Please email info@adamitcorp.com.");
    }
  }

  return (
    <section id="contact" className="section contact">
      <div className="container">
        <Reveal className="section-head">
          <p className="eyebrow">Contact</p>
          <h2>Start a conversation</h2>
          <p>Tell us about your project, systems landscape, or support needs.</p>
        </Reveal>

        <div className="contact-layout">
          <Reveal>
            <dl className="contact-details">
              <div className="contact-detail">
                <dt>Address</dt>
                <dd>304 Faxton Way, Holly Springs, NC 27540</dd>
              </div>
              <div className="contact-detail">
                <dt>Email</dt>
                <dd>
                  <a href="mailto:info@adamitcorp.com">info@adamitcorp.com</a>
                </dd>
              </div>
              <div className="contact-detail">
                <dt>Phone</dt>
                <dd>
                  <a href="tel:+18019575245">(801) 957-5245</a>
                </dd>
              </div>
            </dl>
          </Reveal>

          <Reveal delay={100}>
            <form className="contact-form" onSubmit={onSubmit} noValidate>
              <div
                className={`form-status${status === "success" || status === "error" ? " is-visible" : ""}${status === "success" ? " is-success" : ""}${status === "error" ? " is-error" : ""}`}
                role="status"
              >
                {message}
              </div>

              <div className="form-row">
                <div className="field">
                  <label htmlFor="name">Name</label>
                  <input id="name" name="name" type="text" required />
                </div>
                <div className="field">
                  <label htmlFor="email">Email</label>
                  <input id="email" name="email" type="email" required />
                </div>
              </div>

              <div className="field">
                <label htmlFor="subject">Subject</label>
                <input id="subject" name="subject" type="text" required />
              </div>

              <div className="field">
                <label htmlFor="message">Message</label>
                <textarea id="message" name="message" rows={5} required />
              </div>

              <div>
                <button
                  type="submit"
                  className="btn btn-primary"
                  disabled={status === "loading"}
                >
                  {status === "loading" ? "Sending…" : "Send message"}
                </button>
              </div>
            </form>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
