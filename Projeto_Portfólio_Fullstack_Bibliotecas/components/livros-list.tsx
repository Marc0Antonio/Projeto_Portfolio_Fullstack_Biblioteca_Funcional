"use client";

import { useState, useEffect } from "react";
import useSWR from "swr";
import { LivroForm } from "./livro-form";
import { LivroCard } from "./livro-card";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Trash2, Plus } from 'lucide-react';

interface Livro {
  id: number;
  titulo: string;
  autor: string;
  ano: number;
  genero: string;
  quantidade: number;
}

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export function LivrosList() {
  const { data: livros, mutate, isLoading } = useSWR<Livro[]>(
    "/api/livros",
    fetcher
  );
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [error, setError] = useState("");

  const handleDelete = async (id: number) => {
    try {
      const res = await fetch(`/api/livros/${id}`, { method: "DELETE" });
      if (!res.ok) throw new Error("Erro ao deletar");
      mutate();
      setError("");
    } catch (err) {
      setError("Erro ao deletar livro");
      console.error(err);
    }
  };

  const handleEditComplete = () => {
    setEditingId(null);
    mutate();
  };

  if (isLoading) {
    return <div className="text-center py-8">Carregando livros...</div>;
  }

  return (
    <div className="space-y-6">
      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">
          {error}
        </div>
      )}

      {!editingId && !showForm && (
        <Button
          onClick={() => setShowForm(true)}
          className="bg-blue-600 hover:bg-blue-700"
        >
          <Plus className="w-4 h-4 mr-2" />
          Adicionar Livro
        </Button>
      )}

      {showForm && (
        <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
          <LivroForm
            onSuccess={() => {
              setShowForm(false);
              mutate();
            }}
            onCancel={() => setShowForm(false)}
          />
        </div>
      )}

      {editingId && (
        <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
          <LivroForm
            livroId={editingId}
            onSuccess={handleEditComplete}
            onCancel={() => setEditingId(null)}
          />
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {livros && livros.length > 0 ? (
          livros.map((livro) => (
            <div key={livro.id} className="relative">
              <LivroCard livro={livro} />
              <div className="flex gap-2 mt-3">
                <Button
                  onClick={() => setEditingId(livro.id)}
                  className="flex-1 bg-amber-600 hover:bg-amber-700"
                >
                  Editar
                </Button>
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button
                      variant="destructive"
                      className="flex-1"
                    >
                      <Trash2 className="w-4 h-4 mr-2" />
                      Deletar
                    </Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogTitle>Confirmar exclusão</AlertDialogTitle>
                    <AlertDialogDescription>
                      Tem certeza que deseja deletar "{livro.titulo}"? Esta ação não pode ser desfeita.
                    </AlertDialogDescription>
                    <div className="flex gap-2 justify-end">
                      <AlertDialogCancel>Cancelar</AlertDialogCancel>
                      <AlertDialogAction
                        onClick={() => handleDelete(livro.id)}
                        className="bg-red-600 hover:bg-red-700"
                      >
                        Deletar
                      </AlertDialogAction>
                    </div>
                  </AlertDialogContent>
                </AlertDialog>
              </div>
            </div>
          ))
        ) : (
          <div className="col-span-full text-center py-12 text-gray-500">
            Nenhum livro cadastrado ainda
          </div>
        )}
      </div>
    </div>
  );
}
