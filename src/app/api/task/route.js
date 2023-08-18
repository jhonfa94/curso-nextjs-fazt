import { NextResponse } from "next/server";
import { prisma } from '@/libs/prisma';

export async function GET() {
    const tasks = await prisma.task.findMany();
    // console.log(tasks);


    return NextResponse.json(tasks)
}

export async function POST(request) {
    const { title, description } = await request.json();
    // console.log(data);
    const createTask = await prisma.task.create({
        data: {
            title, description
        }
    });

    return NextResponse.json({
        message: 'Creando tareas',
        data: createTask
    })
}