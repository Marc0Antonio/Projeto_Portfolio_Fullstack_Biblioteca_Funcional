import { neon } from "@neondatabase/serverless";

const sql = neon(process.env.DATABASE_URL!);

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;
    const livro = await sql("SELECT * FROM livros WHERE id = $1", [id]);

    if (livro.length === 0) {
      return Response.json(
        { error: "Livro não encontrado" },
        { status: 404 }
      );
    }

    return Response.json(livro[0]);
  } catch (error) {
    console.error("Erro ao buscar livro:", error);
    return Response.json(
      { error: "Erro ao buscar livro" },
      { status: 500 }
    );
  }
}

export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;
    const body = await request.json();
    const { titulo, autor, ano, genero, quantidade } = body;

    // Validações
    if (!titulo || !autor || !ano || !genero || quantidade === undefined) {
      return Response.json(
        { error: "Todos os campos são obrigatórios" },
        { status: 400 }
      );
    }

    if (titulo.trim().length === 0 || autor.trim().length === 0) {
      return Response.json(
        { error: "Título e autor não podem estar vazios" },
        { status: 400 }
      );
    }

    if (isNaN(ano) || ano < 1000 || ano > new Date().getFullYear()) {
      return Response.json(
        { error: "Ano inválido" },
        { status: 400 }
      );
    }

    if (isNaN(quantidade) || quantidade < 0) {
      return Response.json(
        { error: "Quantidade deve ser um número não negativo" },
        { status: 400 }
      );
    }

    const result = await sql(
      "UPDATE livros SET titulo = $1, autor = $2, ano = $3, genero = $4, quantidade = $5, updated_at = CURRENT_TIMESTAMP WHERE id = $6 RETURNING *",
      [titulo.trim(), autor.trim(), ano, genero.trim(), quantidade, id]
    );

    if (result.length === 0) {
      return Response.json(
        { error: "Livro não encontrado" },
        { status: 404 }
      );
    }

    return Response.json(result[0]);
  } catch (error) {
    console.error("Erro ao atualizar livro:", error);
    return Response.json(
      { error: "Erro ao atualizar livro" },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;

    const result = await sql(
      "DELETE FROM livros WHERE id = $1 RETURNING *",
      [id]
    );

    if (result.length === 0) {
      return Response.json(
        { error: "Livro não encontrado" },
        { status: 404 }
      );
    }

    return Response.json({ message: "Livro deletado com sucesso" });
  } catch (error) {
    console.error("Erro ao deletar livro:", error);
    return Response.json(
      { error: "Erro ao deletar livro" },
      { status: 500 }
    );
  }
}
