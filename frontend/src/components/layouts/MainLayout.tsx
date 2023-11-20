import React from 'react'
import { Header } from '../Header'

export const MainLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <Header />
      <main className="mt-14">{children}</main>
    </>
  )
}
