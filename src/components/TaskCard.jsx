"use client"
import { useRouter } from "next/navigation"


const TaskCard = ({ task }) => {

    const router = useRouter()

    return (
        <div className="bg-slate-900 p-3 hover:bg-slate-800 cursor-pointer"
            onClick={(event) => {
                router.push(`/task/edit/${task.id}`)
            }}
        >
            <h3 className="text-2xl font-bold mb-2">{task.title}</h3>
            <p className="">{task.description}</p>
            <p className="">{new Date(task.createdAt).toLocaleDateString()}</p>
        </div>
    )
}

export default TaskCard