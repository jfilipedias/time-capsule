import Link from 'next/link'

export function EmptyMemories() {
  return (
    <div className="flex flex-1 items-center justify-center">
      <p className="w-[360px] text-center leading-relaxed">
        Você ainda não registrou nenhuma lembrança.{' '}
        <Link
          href=""
          className="underline  transition-colors hover:text-gray-50"
        >
          Comece a criar agora!
        </Link>
      </p>
    </div>
  )
}
