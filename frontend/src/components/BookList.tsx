import React, { Key, useEffect, useState } from 'react'
import { ScrollArea, ScrollBar } from './ui/scroll-area'
import { Card } from './ui/card'
import { Badge } from './ui/badge'
import { AspectRatio } from './ui/aspect-ratio'
import { fetchBooks } from '@/lib/data'
import { QueryProps } from '@/lib/interfaces'

export const BookList = ({ category, pageCount }: QueryProps) => {
  const [books, setBooks] = useState([])

  const fetchBook = async (category: string[], pagecount: number) => {
    const data = await fetchBooks(category, pagecount)
    setBooks(() => data)
  }

  useEffect(() => {
    fetchBook(category, pageCount)
  }, [category, pageCount])

  return (
    <>
      <ScrollArea className="container h-full whitespace-nowrap">
        <div className="flex flex-col h-full gap-2">
          {books.map((item: any, key: Key) => (
            <Card
              key={key}
              className="flex flex-row w-full p-2 gap-2 shadow-none select-none cursor-pointer hover:opacity-80 transition-all duration-200 ease-in-out"
            >
              <div className="w-[90px]">
                <AspectRatio
                  className="overflow-hidden rounded-md shadow-md"
                  ratio={3 / 4}
                >
                  <img
                    src={item.thumbnailUrl}
                    alt={item.isbn}
                    className="rounded-md select-none pointer-events-none object-cover"
                  />
                </AspectRatio>
              </div>
              <div className="flex flex-col gap-1">
                <span className="flex flex-row gap-2">
                  <h6 className="text-xs font-bold">
                    ISBN{' '}
                    <span className="font-normal">
                      {item.isbn ? item.isbn : '-'}
                    </span>
                  </h6>
                  <h6 className="text-xs font-bold">
                    Page Count{' '}
                    <span className="font-normal">{item.pageCount}</span>
                  </h6>
                </span>
                <h3 className="text-base font-bold">{item.title}</h3>
                <span className="flex text-sm">
                  {item.authors.map((name: any, key: Key) => {
                    if (parseInt(key.toString()) > 0) {
                      return <p key={key}>, {name}</p>
                    }
                    return <p key={key}>{name}</p>
                  })}
                </span>
                <div className="h-full">
                  <div className="h-full items-end flex gap-2 select-none bottom-0">
                    {item.categories.map((cat: any) => (
                      <Badge key={cat}>{cat}</Badge>
                    ))}
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>
        <ScrollBar orientation="vertical" />
      </ScrollArea>
    </>
  )
}
