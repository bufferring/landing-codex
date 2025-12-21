import AvatarPhoto from '@/components/AvatarPhoto'
import { FaGoogle, FaGithub, FaInstagram } from 'react-icons/fa'

function Landing() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100 p-6">
      <div className="grid w-full max-w-6xl grid-cols-1 overflow-hidden rounded-xl bg-white shadow-2xl md:grid-cols-2">
        <div className="flex flex-col justify-between p-10 md:p-14">
          <div>
            <div className="mb-6 flex items-center gap-3">
              <span className="text-lg font-semibold">UNEFA Codex</span>
            </div>

            <h1 className="mb-2 text-3xl font-bold">Welcome Back</h1>

            <label className="mb-3 block text-sm text-gray-500">Workspace</label>
            <div className="flex items-center rounded-xl border border-gray-100 bg-gray-50 p-2 shadow-sm">
              <label>Elige un Workspace:</label>
            </div>

            <button className="mt-6 w-full rounded-lg bg-gradient-to-r from-blue-600 to-blue-500 py-3 font-semibold text-white shadow-md hover:from-blue-700">
              Continue
            </button>

            <div className="my-6 flex items-center text-sm text-gray-400">
              <div className="h-px flex-1 bg-gray-200" />
              <span className="px-3">sigue a bufferring </span>
              <div className="h-px flex-1 bg-gray-200" />
            </div>

            <div className="flex gap-4">
              <button className="rounded-full border p-3 shadow-sm transition hover:scale-105">
                <FaGoogle />
              </button>
              <button className="rounded-full bg-black p-3 text-white shadow-sm transition hover:scale-105">
                <FaGithub />
              </button>
              <button className="rounded-full bg-blue-500 p-3 text-white shadow-sm transition hover:scale-105">
                <FaInstagram />
              </button>
            </div>
          </div>

          <p className="mt-4 text-xs text-gray-400">Somo la cabra lo reye con lo dioses</p>
        </div>

        <div className="bg-gradient-to-br from-blue-50 to-blue-200">
          <div className="relative flex h-full w-full items-center justify-end">
            <div className="absolute left-12 h-48 w-48 -translate-x-1/4 bg-blue-300 opacity-30 blur-3xl" />

            <div className="relative z-10">
              <AvatarPhoto alt="Mauricio" size={260} />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Landing
