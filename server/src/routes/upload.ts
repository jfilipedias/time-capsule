import { randomUUID } from 'crypto'
import { createWriteStream } from 'fs'
import { extname, resolve } from 'path'
import { pipeline } from 'stream'
import { promisify } from 'util'
import { FastifyInstance } from 'fastify'

const pump = promisify(pipeline)

export async function uploadRoutes(app: FastifyInstance) {
  app.post('/upload', async (request, reply) => {
    const uploadedFile = await request.file({
      limits: {
        fileSize: 5_242_880, // 5mb
      },
    })

    if (!uploadedFile) {
      return reply.status(400).send()
    }

    const mimetypeRegex = /^(image|video)\/[a-zA-Z]+/
    const isValidFileFormat = mimetypeRegex.test(uploadedFile.mimetype)

    if (!isValidFileFormat) {
      return reply.status(400).send()
    }

    const fileId = randomUUID()
    const extension = extname(uploadedFile.filename)
    const filename = fileId.concat(extension)

    const writeStream = createWriteStream(
      resolve(__dirname, '../../uploads/', filename),
    )

    await pump(uploadedFile.file, writeStream)

    const fullURl = request.protocol.concat('://').concat(request.hostname)
    const fileURL = new URL(`/uploads/${filename}`, fullURl).toString()

    return { fileURL }
  })
}
