-- Criar tabela de livros
CREATE TABLE IF NOT EXISTS livros (
  id SERIAL PRIMARY KEY,
  titulo VARCHAR(255) NOT NULL,
  autor VARCHAR(255) NOT NULL,
  ano INTEGER NOT NULL CHECK (ano > 0 AND ano <= EXTRACT(YEAR FROM NOW())),
  genero VARCHAR(100) NOT NULL,
  quantidade INTEGER NOT NULL CHECK (quantidade >= 0),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Criar índices para melhor performance
CREATE INDEX IF NOT EXISTS idx_livros_titulo ON livros(titulo);
CREATE INDEX IF NOT EXISTS idx_livros_autor ON livros(autor);
CREATE INDEX IF NOT EXISTS idx_livros_genero ON livros(genero);

-- Dados iniciais de exemplo
INSERT INTO livros (titulo, autor, ano, genero, quantidade) VALUES
('O Cortiço', 'Aluísio Azevedo', 1890, 'Romance', 5),
('Dom Casmurro', 'Machado de Assis', 1899, 'Romance', 3),
('O Guarani', 'José de Alencar', 1857, 'Romance', 4),
('Harry Potter e a Pedra Filosofal', 'J.K. Rowling', 1997, 'Ficção Científica', 8),
('O Senhor dos Anéis', 'J.R.R. Tolkien', 1954, 'Fantasia', 6)
ON CONFLICT DO NOTHING;
