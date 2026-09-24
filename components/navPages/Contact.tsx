"use client";
import { useState } from "react";
import { Mail, Send } from "lucide-react";
import { jetbrainsMono } from "@/app/font";
import { toast } from "sonner";
import { useLanguage } from "@/lib/language";

export default function Contact() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [loading, setLoading] = useState(false);
  const { t } = useLanguage();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });

      const data = await response.json();

      if (!response.ok) {
        if (response.status === 401) {
          throw new Error("Gmail chưa xác thực. Hãy dùng App Password 16 ký tự trong file .env.local.");
        }

        if (response.status === 503) {
          throw new Error("Form chưa được cấu hình email. Hãy thêm App Password vào .env.local rồi khởi động lại server.");
        }

        throw new Error(data.error || t.contact.errorMsg);
      }

      toast.success(t.contact.successMsg);
      setForm({ name: "", email: "", message: "" });
    } catch (error) {
      console.error("Contact form error:", error);
      toast.error(error instanceof Error ? error.message : t.contact.errorMsg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div id="contact" className={`${jetbrainsMono.className} w-full max-w-4xl px-6 py-16 md:py-24 text-foreground`}>
      <div className="mx-auto text-center">
        <h2 className={`text-4xl md:text-6xl font-bold mb-6`}>
          <Mail className="inline-block mr-2" /> {t.contact.title}
        </h2>
        <p className="text-muted-foreground mb-10">{t.contact.subtitle}</p>
      </div>

      <form
        onSubmit={handleSubmit}
        className="mx-auto flex flex-col gap-4"
      >
        <input
          type="text"
          name="name"
          placeholder={t.contact.namePlaceholder}
          required
          value={form.name}
          onChange={handleChange}
          className="rounded-lg p-3 bg-background border border-border focus:border-[#e8390d] focus:ring-[#e8390d] outline-none transition-colors duration-300"
        />

        <input
          type="email"
          name="email"
          placeholder={t.contact.emailPlaceholder}
          required
          value={form.email}
          onChange={handleChange}
          className="rounded-lg p-3 bg-background border border-border focus:border-[#e8390d] focus:ring-[#e8390d] outline-none transition-colors duration-300"
        />

        <textarea
          name="message"
          rows={5}
          placeholder={t.contact.messagePlaceholder}
          required
          value={form.message}
          onChange={handleChange}
          className="rounded-lg p-3 bg-background border border-border focus:border-[#e8390d] focus:ring-[#e8390d] outline-none transition-colors duration-300"
        />

        <button
          type="submit"
          disabled={loading}
          className="mt-4 self-end flex items-center gap-2 px-6 py-3 rounded-full bg-foreground text-background hover:opacity-80 transition-all cursor-pointer disabled:opacity-50"
        >
          {loading ? t.contact.sending : t.contact.sendBtn} <Send size={16} />
        </button>
      </form>
    </div>
  );
}
