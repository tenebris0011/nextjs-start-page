import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import search from '../components/search'
import Weather from '../components/weather'

export default function Home() {
  return (
    <div className="bg-neutral-900">
      <Head>
        <title>Start</title>
        <meta name="description" content="Custom start page" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="grid h-screen place-items-center">

        <container className="grid grid-rows-3 grid-flow-col gap-4">
          <div className="row-span-3 bg-slate-700 rounded p-5 bg-opacity-50 grid place-items-center">
            <ul className="p-6">
              <li><Link className="text-white hover:text-xl" href="https://www.reddit.com" target="_blank">Reddit</Link></li>
              <li><Link className="text-white hover:text-xl" href="http://192.168.1.145" target="_blank">Server</Link></li>
              <li><Link className="text-white hover:text-xl" href="https://login.tailscale.com/" target="_blank">Tailscale</Link></li>
              <li><Link className="text-white hover:text-xl" href="https://mail.google.com" target="_blank">Gmail</Link></li>
              <li><Link className="text-white hover:text-xl" href="https://accounts.zoho.com/signin?serviceurl=https://mail.zoho.com" target="_blank">ZoHo</Link></li>
            </ul>
          </div>
          <div className="col-span-2 grid-rows-1 bg-slate-700 rounded p-5 bg-opacity-50 grid place-items-center">
            <form className="grid grid-cols-3 grid-flow-col gap-2 has-tooltip" onSubmit={search}>
              <input type="text" id="searchTerm" className="rounded col-span-2" placeholder="Search..."></input>
              <ul className='tooltip rounded shadow-lg p-1 bg-gray-100 bg-opacity-50 -mt-16'>
                <li>"g:" for Google</li>
                <li>"s:" for Stack Overflow</li>
              </ul>
              <button type="submit" className='col-span-1 bg-slate-900 rounded text-white hover:bg-slate-500'>Search</button>
            </form>
          </div>
          <div className="row-span-2 col-span-2 bg-slate-700 rounded p-5 bg-opacity-50">
            <Weather>

            </Weather>
          </div>
        </container>
      </main>
    </div>
  )
}