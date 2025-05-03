import { prismaDatabase } from '@/lib/prisma';
import { loginFormSchema } from '@/schemas/loginFormSchema';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { NextResponse } from 'next/server';

// Chave secreta para assinar o JWT
const JWT_SECRET = process.env.JWT_SECRET || 'default_secret';

// Função para lidar com a requisição POST para login
export const POST = async (request: Request) => {
  try {
    // Extrai o corpo da requisição
    const body = await request.json();
    // Valida o corpo da requisição usando o schema definido
    const resultBody = loginFormSchema.safeParse(body);

    if (!resultBody.success) {
      return NextResponse.json(
        { error: resultBody.error.format() },
        { status: 400 },
      );
    }

    // Desestrutura os dados validados
    const { email, password } = resultBody.data;

    // Verifica se o usuário existe no banco de dados
    const checkUserExists = await prismaDatabase.users.findUnique({
      where: {
        email,
      },
    });

    if (!checkUserExists) {
      return NextResponse.json(
        { error: 'Usuário não encontrado.' },
        { status: 400 },
      );
    }

    // Verifica se a senha confere com a senha armazenada no banco de dados
    const checkUserPassword = await bcrypt.compare(
      password,
      checkUserExists.password,
    );

    if (!checkUserPassword) {
      return NextResponse.json({ error: 'Senha incorreta.' }, { status: 400 });
    }

    // Gera um token JWT com o ID do usuário
    const tokenJWT = jwt.sign(
      {
        userId: checkUserExists.id,
      },
      JWT_SECRET,
      { expiresIn: '7d' },
    );

    // Retorna uma resposta JSON com o token JWT
    const response = NextResponse.json(
      { message: 'Login realizado com sucesso!', tokenJWT },
      { status: 200 },
    );

    // Define o cookie com o token JWT na resposta
    response.cookies.set('tokenJWT', tokenJWT, {
      httpOnly: false, // Permite acesso via JavaScript (não recomendado) - use true em produção
      secure: process.env.NODE_ENV === 'production', // Apenas HTTPS em produção
      sameSite: 'strict', // Proteção contra CSRF
      path: '/', // Disponível para todas as rotas
      maxAge: 7 * 24 * 60 * 60, // Expira em 7 dias
    });

    // Retorna a resposta com o cookie
    return response;
  } catch (error) {
    console.error('Error logging in user:', error);
    return NextResponse.json(
      { error: 'Erro ao tentar fazer login.' },
      { status: 500 },
    );
  }
};
