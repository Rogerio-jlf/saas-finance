import { createUserSchema } from '@/schemas/userSchema';
import bcrypt from 'bcryptjs';
import { NextResponse } from 'next/server';
import { prismaDatabase } from '../../../lib/prisma';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const result = createUserSchema.safeParse(body);

    if (!result.success) {
      return NextResponse.json(
        { error: result.error.format() },
        { status: 400 },
      );
    }

    // Desestrutura os dados validados
    const { name, email, password } = result.data;

    // Verifica se o email já existe no banco de dados
    const checkIfUserExists = await prismaDatabase.users.findUnique({
      where: {
        email,
      },
    });

    if (checkIfUserExists) {
      return NextResponse.json(
        { error: 'Usuário já cadastrado no banco de dados.' },
        { status: 400 },
      );
    }

    // Criptografa a senha antes de armazená-la
    const hashedPassword = await bcrypt.hash(password, 10);

    // Cria o usuário no banco de dados
    const createUser = await prismaDatabase.users.create({
      data: {
        name,
        email,
        password: hashedPassword,
      },
    });
    return NextResponse.json(
      { message: 'Usuário criado com sucesso!', createUser },
      { status: 201 },
    );
  } catch (error) {
    console.error('Error creating user:', error);
    return NextResponse.json(
      { error: 'Erro ao tentar criar o usuário.' },
      { status: 500 },
    );
  }
}
