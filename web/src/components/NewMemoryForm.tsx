'use client'

import { FormEvent } from 'react'
import { useRouter } from 'next/navigation'
import { Camera } from 'lucide-react'
import Cookie from 'js-cookie'
import { MediaPicker } from '@/components/MideaPicker'

export function NewMemoryForm() {
  const router = useRouter()

  async function handleCreateMemory(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    const formData = new FormData(event.currentTarget)

    const fileToUpload = formData.get('coverUrl')

    let coverUrl = ''

    if (fileToUpload) {
      const uploadFormData = new FormData()
      uploadFormData.set('file', fileToUpload)

      const uploadResponse = await fetch('http://localhost:3333/upload', {
        method: 'POST',
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        body: uploadFormData,
      })

      const uploadedResponseData = await uploadResponse.json()

      coverUrl = uploadedResponseData.fileURL
    }

    const response = await fetch('http://localhost:3333/memories', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${Cookie.get('token')}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        coverUrl,
        content: formData.get('content'),
        isPublic: Boolean(formData.get('isPublic')),
      }),
    })

    router.push('/')
  }

  return (
    <form onSubmit={handleCreateMemory} className="flex flex-1 flex-col gap-2">
      <div className="flex items-center gap-4">
        <label
          htmlFor="media"
          className="flex cursor-pointer items-center gap-1.5 text-sm text-gray-200 transition-colors hover:text-gray-100"
        >
          <Camera className="h-4 w-4" />
          Anexar mídia
        </label>

        <label
          htmlFor="isPublic"
          className="flex items-center gap-1.5 text-sm text-gray-200 transition-colors hover:text-gray-100"
        >
          <input
            type="checkbox"
            name="isPublic"
            id="isPublic"
            value="true"
            className="h-4 w-4 rounded border-gray-400 bg-gray-700 text-purple-500"
          />
          Tornar memória pública
        </label>
      </div>

      <MediaPicker />

      <textarea
        name="content"
        spellCheck="false"
        className="w-full flex-1 resize-none rounded border-gray-700 bg-transparent p-0 px-4 py-3 leading-relaxed text-gray-100 placeholder:text-gray-400"
        placeholder="Fique livre para adicionar fotos, vídeos e relatos sobre essa experiência que você quer lembrar para sempre."
      />

      <button
        type="submit"
        className="inline-block self-end rounded-full bg-green-500 px-5 py-3 font-alt text-sm uppercase leading-none text-black transition-colors hover:bg-green-600"
      >
        Salvar
      </button>
    </form>
  )
}
