interface Livro {
  id: number;
  titulo: string;
  autor: string;
  ano: number;
  genero: string;
  quantidade: number;
}

export function LivroCard({ livro }: { livro: Livro }) {
  return (
    <div className="bg-white p-4 rounded-lg shadow-md border border-gray-200 hover:shadow-lg transition-shadow">
      <h3 className="font-bold text-lg text-blue-700 mb-2 line-clamp-2">
        {livro.titulo}
      </h3>
      <div className="space-y-1 text-sm text-gray-600">
        <p>
          <span className="font-semibold">Autor:</span> {livro.autor}
        </p>
        <p>
          <span className="font-semibold">Ano:</span> {livro.ano}
        </p>
        <p>
          <span className="font-semibold">Gênero:</span> {livro.genero}
        </p>
        <p className="pt-2">
          <span className="font-semibold text-green-600">
            Disponível: {livro.quantidade}
          </span>
        </p>
      </div>
    </div>
  );
}
