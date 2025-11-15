"use client";

import { LivrosList } from "@/components/livros-list";

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 py-8">
      <div className="max-w-6xl mx-auto px-4">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-blue-900 mb-2">
            Biblioteca Escolar
          </h1>
          <p className="text-gray-600">
            Sistema de gerenciamento de livros
          </p>
        </div>

        <div className="bg-white rounded-lg shadow-lg p-6">
          <LivrosList />
        </div>
      </div>
    </main>
  );
}

