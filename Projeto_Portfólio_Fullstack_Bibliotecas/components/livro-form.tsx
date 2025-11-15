"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface LivroFormProps {
  livroId?: number;
  onSuccess: () => void;
  onCancel: () => void;
}

interface Livro {
  id: number;
  titulo: string;
  autor: string;
  ano: number;
  genero: string;
  quantidade: number;
}

export function LivroForm({ livroId, onSuccess, onCancel }: LivroFormProps) {
  const [formData, setFormData] = useState({
    titulo: "",
    autor: "",
    ano: new Date().getFullYear(),
    genero: "",
    quantidade: 0,
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (livroId) {
      fetch(`/api/livros/${livroId}`)
        .then((res) => res.json())
        .then((data) => setFormData(data))
        .catch(() => setError("Erro ao carregar livro"));
    }
  }, [livroId]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const url = livroId ? `/api/livros/${livroId}` : "/api/livros";
      const method = livroId ? "PUT" : "POST";

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Erro ao salvar livro");
        return;
      }

      onSuccess();
    } catch (err) {
      setError("Erro ao salvar livro");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <h3 className="text-lg font-semibold">
        {livroId ? "Editar Livro" : "Adicionar Novo Livro"}
      </h3>

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-3 py-2 rounded text-sm">
          {error}
        </div>
      )}

      <div>
        <label className="block text-sm font-medium mb-1">Título</label>
        <Input
          type="text"
          placeholder="Ex: Dom Casmurro"
          value={formData.titulo}
          onChange={(e) =>
            setFormData({ ...formData, titulo: e.target.value })
          }
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">Autor</label>
        <Input
          type="text"
          placeholder="Ex: Machado de Assis"
          value={formData.autor}
          onChange={(e) =>
            setFormData({ ...formData, autor: e.target.value })
          }
          required
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium mb-1">Ano</label>
          <Input
            type="number"
            min="1000"
            max={new Date().getFullYear()}
            value={formData.ano}
            onChange={(e) =>
              setFormData({ ...formData, ano: parseInt(e.target.value) })
            }
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Quantidade</label>
          <Input
            type="number"
            min="0"
            value={formData.quantidade}
            onChange={(e) =>
              setFormData({ ...formData, quantidade: parseInt(e.target.value) })
            }
            required
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">Gênero</label>
        <select
          value={formData.genero}
          onChange={(e) =>
            setFormData({ ...formData, genero: e.target.value })
          }
          className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
          required
        >
          <option value="">Selecione um gênero</option>
          <option value="Romance">Romance</option>
          <option value="Ficção Científica">Ficção Científica</option>
          <option value="Fantasia">Fantasia</option>
          <option value="Mistério">Mistério</option>
          <option value="Poesia">Poesia</option>
          <option value="Drama">Drama</option>
          <option value="Infantil">Infantil</option>
          <option value="Educativo">Educativo</option>
          <option value="Outro">Outro</option>
        </select>
      </div>

      <div className="flex gap-2 pt-4">
        <Button
          type="submit"
          disabled={loading}
          className="flex-1 bg-green-600 hover:bg-green-700"
        >
          {loading ? "Salvando..." : livroId ? "Atualizar" : "Criar"}
        </Button>
        <Button
          type="button"
          onClick={onCancel}
          variant="outline"
          className="flex-1"
        >
          Cancelar
        </Button>
      </div>
    </form>
  );
}
