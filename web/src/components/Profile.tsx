import Image from 'next/image'
import { getUser } from '@/lib/auth'

export function Profile() {
  const { name, avatarUrl } = getUser()

  return (
    <div className="flex items-center gap-3 text-left">
      <Image
        src={avatarUrl}
        alt=""
        width={40}
        height={40}
        className="h-10 w-10 rounded-full"
      />

      <span className="max-w-[140px] text-sm leading-snug">
        {name}
        <a
          href="/api/auth/logout"
          className="block text-red-400 transition-colors hover:text-red-300"
        >
          Quero sair
        </a>
      </span>
    </div>
  )
}
