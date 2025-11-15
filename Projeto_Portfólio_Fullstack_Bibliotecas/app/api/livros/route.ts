import { neon } from "@neondatabase/serverless";

const sql = neon(process.env.DATABASE_URL!);

export async function GET() {
  try {
    const livros = await sql("SELECT * FROM livros ORDER BY id DESC");
    return Response.json(livros);
  } catch (error) {
    console.error("Erro ao buscar livros:", error);
    return Response.json({ error: "Erro ao buscar livros" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
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
      "INSERT INTO livros (titulo, autor, ano, genero, quantidade) VALUES ($1, $2, $3, $4, $5) RETURNING *",
      [titulo.trim(), autor.trim(), ano, genero.trim(), quantidade]
    );

    return Response.json(result[0], { status: 201 });
  } catch (error) {
    console.error("Erro ao criar livro:", error);
    return Response.json(
      { error: "Erro ao criar livro" },
      { status: 500 }
    );
  }
}
