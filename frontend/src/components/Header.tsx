import React from 'react'
import { PiBooksBold } from 'react-icons/pi'
import { Link } from 'react-router-dom'

export const Header: React.FC = () => {
  return (
    <>
      <header className="fixed top-0 z-50 w-full min-w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-14 w-full min-w-max items-center">
          <section className="flex flex-row items-center gap-2 [&>svg]:text-2xl [&>p]:font-bold [&>p]:select-none [&>p>span]:text-slate-700/60 hover:opacity-80 transition-all duration-200 ease-in-out">
            <PiBooksBold />
            <p>
              Book/<span>Frontend</span>
            </p>
          </section>
        </div>
      </header>
    </>
  )
}
