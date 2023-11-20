import React, { useState } from 'react'
import { MainLayout } from './components/layouts/MainLayout'
import { FilterPanel } from './components/FilterPanel'
import { BookList } from './components/BookList'

export const App: React.FC = () => {
  const [category, setCategory] = useState<string[]>([''])
  const [pageCount, setPageCount] = useState<number>(0)

  return (
    <>
      <MainLayout>
        <section className="container">
          <div className="p-3">
            <FilterPanel
              getCategory={(val) => setCategory(val)}
              getPageCount={(val) => setPageCount(val)}
            />
          </div>
        </section>
        <section>
          <BookList category={category} pageCount={pageCount} />
        </section>
      </MainLayout>
    </>
  )
}
