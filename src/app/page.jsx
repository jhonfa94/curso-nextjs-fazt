import TaskCard from '@/components/TaskCard';
import { prisma } from '@/libs/prisma';
const loadTask = async () => {
  // const url = `${process.env.APP_URL}/api/task`
  return await prisma.task.findMany();
  // const url = 'http://localhost:3000/api/task'  
  // console.log('URL: ', `${process.env.APP_URL}/api/task`)
  // const res = await fetch(url)
  // console.log(res)
  // console.log(tasks)
}

// export const revalidad = 60;
export const revalidad = 'force-dynamic';

const Page = async () => {
  const tasks = await loadTask();
  return (
    <section className="container mx-auto">
      <div className="grid grid-cols-3 gap-3 mt-10">
        {tasks.map(task => (
          <TaskCard key={task.id} task={task} />

        ))}
      </div>
    </section>
  )
}

export default Page