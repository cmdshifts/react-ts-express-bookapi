import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from './ui/sheet'
import { Button } from './ui/button'
import { Label } from './ui/label'
import { Input } from './ui/input'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from './ui/select'
import { RiFilterLine } from 'react-icons/ri'
import { useEffect, useState } from 'react'
import { fetchCategoryList } from '@/lib/data'
import { Filter } from '@/lib/interfaces'

export const FilterPanel = ({ getCategory, getPageCount }: Filter) => {
  const [categories, setCategories] = useState<string[]>([])
  const [selectedCategory, setSelectedCategory] = useState<string[]>([])
  const [pageCount, setPageCount] = useState<number>(0)

  const fetchCategory = async () => {
    const data = await fetchCategoryList()
    setCategories(() => data)
  }

  const handleSaveChanges = () => {
    getCategory(selectedCategory)
    getPageCount(pageCount)
  }

  useEffect(() => {
    fetchCategory()
  })

  return (
    <>
      <Sheet>
        <SheetTrigger asChild>
          <Button variant="default" className="flex items-center gap-2">
            <RiFilterLine />
            Add Filter
          </Button>
        </SheetTrigger>
        <SheetContent side={'left'}>
          <SheetHeader>
            <SheetTitle>Add Filter</SheetTitle>
            <SheetDescription>
              The interactive filters make it simple to drill down and explore
              the book collection.
            </SheetDescription>
          </SheetHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-3 items-center gap-4">
              <Label
                htmlFor="category"
                className="text-right whitespace-nowrap"
              >
                Category
              </Label>
              <Select
                onValueChange={(value) => setSelectedCategory(() => [value])}
              >
                <SelectTrigger className="col-span-2">
                  <SelectValue placeholder="Select a category" />
                </SelectTrigger>
                <SelectContent side="left">
                  <SelectGroup>
                    <SelectLabel>Category</SelectLabel>
                    {categories.map((item: any, index: number) => (
                      <SelectItem key={index} value={item}>
                        {item}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
            <div className="grid grid-cols-3 items-center gap-4">
              <Label
                htmlFor="page_count"
                className="text-right whitespace-nowrap"
              >
                Page Count
              </Label>
              <Input
                id="page_count"
                type="number"
                className="col-span-2"
                onChange={(e) => setPageCount(parseInt(e.currentTarget.value))}
                min={0}
              />
            </div>
          </div>
          <SheetFooter>
            <SheetClose asChild>
              <Button type="submit" onClick={() => handleSaveChanges()}>
                Save changes
              </Button>
            </SheetClose>
          </SheetFooter>
        </SheetContent>
      </Sheet>
    </>
  )
}
