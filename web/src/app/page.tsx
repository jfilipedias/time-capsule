import Image from 'next/image'
import { cookies } from 'next/headers'
import { EmptyMemories } from '@/components/EmptyMemories'
import { ArrowRight } from 'lucide-react'
import Link from 'next/link'

interface Memory {
  id: string
  createdAt: string
  coverUrl: string
  excerpt: string
}

export default async function Home() {
  const isAuthenticated = cookies().has('token')

  if (!isAuthenticated) {
    return <EmptyMemories />
  }

  const token = cookies().get('token')?.value

  const response = await fetch('http://localhost:3333/memories', {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })

  const memories = (await response.json()) as Memory[]

  if (memories.length === 0) {
    return <EmptyMemories />
  }

  console.log({ memories })

  return (
    <div className="flex flex-col gap-10 p-8">
      {memories.map((memory) => (
        <div key={memory.id} className="space-y-4">
          <time className="-ml-8 flex items-center gap-2 text-sm text-gray-100 before:h-px before:w-5 before:bg-gray-50">
            {new Intl.DateTimeFormat('pt-BR', {
              year: 'numeric',
              month: 'long',
              day: 'numeric',
            }).format(new Date(memory.createdAt))}
          </time>

          <Image
            src={memory.coverUrl}
            width={592}
            height={280}
            alt=""
            className="aspect-video w-full rounded-lg object-cover"
          />

          <p className="text-lg leading-relaxed text-gray-100">
            {memory.excerpt}
          </p>

          <Link
            href={`/memory/${memory.id}`}
            className="flex items-center gap-2 text-sm text-gray-200 transition-colors hover:text-gray-100"
          >
            Leia mais <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      ))}
    </div>
  )
}
