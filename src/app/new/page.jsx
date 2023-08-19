"use client"
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
const NewPage = ({ params }) => {

    const router = useRouter()
    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')

    useEffect(() => {
        // console.log(params)
        fetch(`/api/task/${params.id}`)
            .then(res => res.json())
            .then(data => {
                // console.log(data)
                setTitle(data.title)
                setDescription(data.description)
            })
    }, []);



    const onSubmit = async (e) => {
        e.preventDefault();
        // console.log(e)
        // const title = e.target.title.value;
        // const description = e.target.description.value;
        // console.log('title: ', title);
        // console.log('description: ', description);
        if (params.id) {
            const res = await fetch(`/api/task/${params.id}`, {
                method: 'PUT',
                body: JSON.stringify({ title, description }),
                headers: {
                    'Content-type': 'application/json'
                }
            })
            const data = await res.json();
            // console.log("data-update: ", data)

        } else {

            const res = await fetch(`/api/task`, {
                method: 'POST',
                body: JSON.stringify({ title, description }),
                headers: {
                    'Content-type': 'application/json'
                }
            })
            const data = await res.json();
        }

        // console.log(data)
        router.refresh()
        router.push('/')

    }

    const deleteTask = async (id) => {
        await fetch(`/api/task/${id}`, {
            method: "DELETE"
        })

        router.refresh()
        router.push('/')

    }



    return (
        <div className="h-screen flex justify-center items-center">
            <form className="bg-slate-800 p-10 w-full md:w-1/2"
                onSubmit={onSubmit}
            >
                <label htmlFor="title" className="font-bold text-sm">
                    Título de la tarea
                </label>
                <input type="text"
                    id="title"
                    className="border border-gray-400 p-2 mb-4 w-full text-black"
                    placeholder="Título"
                    onChange={(e) => setTitle(e.target.value)}
                    value={title}
                />


                <label htmlFor="description" className="font-bold text-sm">
                    Descripción de la tarea
                </label>
                <textarea rows="3"
                    id="description"
                    className="border border-gray-400 p-2 mb-4 w-full text-black"
                    placeholder="Describe tu tarea"
                    onChange={(e) => setDescription(e.target.value)}
                    value={description}
                ></textarea>

                <div className="flex justify-between">
                    {params.id ? (
                        <button
                            type="submit"
                            className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
                        >
                            Actualizar
                        </button>
                    ) : (
                        <button
                            type="submit"
                            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                        >
                            Crear
                        </button>
                    )}


                    {params.id && (
                        <button
                            type="button"
                            className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                            onClick={(e) => deleteTask(params.id)}
                        >
                            Eliminar
                        </button>

                    )}
                </div>

            </form>
        </div>
    )
}

export default NewPage