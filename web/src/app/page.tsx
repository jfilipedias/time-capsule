import { User } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import nlwLogo from '../assets/nlw-spacetime-logo.svg'

export default function Home() {
  return (
    <main className="grid h-screen grid-cols-2">
      <div className="relative flex flex-col items-start justify-between overflow-hidden border-r border-white/10 bg-[url(../assets/bg-stars.svg)] bg-cover px-28 py-16">
        <div className="absolute right-0 top-1/2 h-[288px] w-[526px] -translate-y-1/2 translate-x-1/2 rounded-full bg-purple-700 opacity-50 blur-full" />
        <div className="absolute inset-y-0 right-2 w-2 bg-stripes" />

        <Link
          href=""
          className="flex items-center gap-3 text-left transition-colors hover:text-gray-50"
        >
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-400">
            <User className="h-5" />
          </div>

          <p className="max-w-[140px] text-sm leading-snug">
            <span className="underline">Crie sua conta</span> e salve suas
            memórias!
          </p>
        </Link>

        <div className="space-y-5">
          <Image src={nlwLogo} alt="NLW Spacetime" />

          <div className="max-w-md space-y-4">
            <h1 className="text-5xl font-bold leading-tight text-gray-50">
              Sua cápsula do tempo
            </h1>

            <p className="text-lg leading-relaxed">
              Colecione momentos marcantes da sua jornada e compartilhe (se
              quiser) com o mundo!
            </p>
          </div>

          <Link
            href=""
            className="inline-block rounded-full bg-green-500 px-5 py-3 font-alt text-sm uppercase leading-none text-black transition-colors hover:bg-green-600"
          >
            CADASTRAR LEMBRANÇA
          </Link>
        </div>

        <div className="text-sm leading-relaxed text-gray-200">
          Feito com 💜 no NLW da{' '}
          <a
            href="https://rocketseat.com.br"
            target="_blank"
            rel="noreferrer"
            className="underline  transition-colors hover:text-gray-100"
          >
            Rocketseat
          </a>
        </div>
      </div>

      <div className="flex flex-col bg-[url(../assets/bg-stars.svg)] bg-cover p-16">
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
      </div>
    </main>
  )
}
