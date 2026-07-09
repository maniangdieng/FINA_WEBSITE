import { useState, useCallback } from "react";
import type { Message, ContactFormData } from "../types";

const KEY = "gpme_messages";

function load(): Message[] {
  try {
    return JSON.parse(localStorage.getItem(KEY) ?? "[]") as Message[];
  } catch {
    return [];
  }
}

function save(msgs: Message[]) {
  localStorage.setItem(KEY, JSON.stringify(msgs));
}

export function useMessages() {
  const [messages, setMessages] = useState<Message[]>(load);

  const addMessage = useCallback((data: ContactFormData): Message => {
    const msg: Message = {
      id: crypto.randomUUID(),
      name: data.name,
      email: data.email,
      phone: data.phone || undefined,
      subject: data.subject,
      category: data.category,
      body: data.body,
      date: new Date().toISOString(),
      read: false,
    };
    setMessages((prev) => {
      const next = [msg, ...prev];
      save(next);
      return next;
    });
    return msg;
  }, []);

  const markRead = useCallback((id: string) => {
    setMessages((prev) => {
      const next = prev.map((m) => (m.id === id ? { ...m, read: true } : m));
      save(next);
      return next;
    });
  }, []);

  const markAllRead = useCallback(() => {
    setMessages((prev) => {
      const next = prev.map((m) => ({ ...m, read: true }));
      save(next);
      return next;
    });
  }, []);

  const deleteMessage = useCallback((id: string) => {
    setMessages((prev) => {
      const next = prev.filter((m) => m.id !== id);
      save(next);
      return next;
    });
  }, []);

  const deleteAll = useCallback(() => {
    setMessages([]);
    localStorage.removeItem(KEY);
  }, []);

  const refresh = useCallback(() => {
    setMessages(load());
  }, []);

  return {
    messages,
    unreadCount: messages.filter((m) => !m.read).length,
    addMessage,
    markRead,
    markAllRead,
    deleteMessage,
    deleteAll,
    refresh,
  };
}
