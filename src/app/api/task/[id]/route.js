import { NextResponse } from "next/server";
import { prisma } from '@/libs/prisma';


export async function GET(request, { params }) {

    const user = await prisma.task.findUnique({
        where: {
            id: Number(params.id)
        }
    });

    // console.log("user: ", user);
    // return NextResponse.json(`Obteniendo Tarea: ${params.id}`)
    return NextResponse.json(user)
}


export async function PUT(request, { params }) {
    const data = await request.json();
    const { title, description } = data
    const updateTask = await prisma.task.update({
        where: {
            id: Number(params.id)
        },
        data: {
            title, description
        }

    })
    return NextResponse.json(updateTask)
}



export async function DELETE(request, { params }) {
    try {
        const deleteTask = await prisma.task.delete({
            where: {
                id: Number(params.id)
            }
        })
        return NextResponse.json(deleteTask)

    } catch (error) {
        return NextResponse.json({
            message: `El id ${params.id} no existe en la DB`,
            error: error.message
        })

    }
}