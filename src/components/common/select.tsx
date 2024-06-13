'use client'

import { cn } from '@/utils/cn'
import { ChevronDownIcon, XIcon as XMarkIcon } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'

export interface OptionType {
  label: string
  value: string
}

interface MultiSelectProps {
  options?: OptionType[]
  selectedOptions?: OptionType[]
  setSelected?: (selectedOptions: OptionType[]) => void
  error?: string
  className?: string
}

export function MultiSelect ({
  className,
  options = [],
  selectedOptions = [],
  setSelected,
  error
}: MultiSelectProps) {
  const hasError = Boolean(error)
  const divRef = useRef<HTMLDivElement | null>(null)
  const listRef = useRef<HTMLDivElement | null>(null)
  const [show, setShow] = useState(false)

  useEffect(() => {
    const handler = (event: MouseEvent) => {
      if (divRef.current === null || listRef.current === null) return

      if (divRef.current.contains(event.target as Node)) return

      if (listRef.current.contains(event.target as Node)) return

      setShow(false)
    }
    window.addEventListener('click', handler)

    return () => { window.removeEventListener('click', handler) }
  }, [listRef.current])

  const handleRemove = (value: string) => {
    setSelected?.(
      selectedOptions.filter(
        ({ value: selectedValue }) => selectedValue !== value
      )
    )
  }

  const toggleOptions = () => {
    setShow(!show)
  }

  const handleClick = (event: React.MouseEvent<HTMLDivElement>) => {
    if (divRef.current === null) return

    if (divRef.current !== event.target) return

    toggleOptions()
  }

  const unselectedOptions = options.filter(option =>
    !selectedOptions.some(selectedOption => selectedOption.value === option.value)
  )

  const handleSelect = (option: OptionType) => (event: React.MouseEvent) => {
    event.stopPropagation()
    const newSelectedOptions = [...selectedOptions, option]
    setSelected?.(newSelectedOptions)

    if (newSelectedOptions.length === options.length) {
      setShow(false)
      return
    }

    setShow(true)
  }

  return (
    <div
      className={cn(
        'min-h-9 w-full appearance-none rounded-md border border-contrast bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 focus:outline-contrast focus:ring-accent focus-visible:outline-accent focus-visible:ring-1 inline-flex justify-between relative',
        hasError &&
          'animate-shake border-red-500 focus:outline-red-500 focus:ring-red-500 focus-visible:outline-red-500 focus-visible:ring-red-500',
        className
      )}
    >
      <div className='z-10 flex flex-1 flex-row flex-wrap items-center gap-2' ref={divRef} onClick={handleClick} >
        {selectedOptions.map(({ label, value }) => (
          <div
            key={value}
            className='flex items-center rounded-lg bg-gray-300 text-center text-sm'
          >
            <span className='p-[2px] px-2'>{label}</span>
            <button
              onClick={() => {
                handleRemove(value)
              }}
              className='h-full pr-1'
              type='button'
            >
              {' '}
              <XMarkIcon className='size-4' />
            </button>
          </div>
        ))}
      </div>

      <div className='z-10 flex items-center divide-x divide-dotted'>
        {selectedOptions.length > 0 && (
          <button
            className='mr-1'
            type='button'
            onClick={() => {
              setSelected?.([])
            }}
          >
            <XMarkIcon />
          </button>
        )}
        <button className='pl-1' type='button' onClick={(event) => {
          event.stopPropagation()
          toggleOptions()
        }}>
          <ChevronDownIcon />
        </button>
      </div>

      <div ref={listRef} className={cn('absolute left-0 z-10 top-10 ease-in-out w-full duration-300 transition-all overflow-y-auto bg-gray-200 rounded-lg scrollbar-thin scrollbar-white', show ? 'h-fit max-h-48 px-1 py-2' : 'h-0 p-0')}>
        {unselectedOptions.map(({ label, value }) => (
          <div key={value} className='cursor-pointer rounded-lg p-2 hover:bg-gray-100' onClick={handleSelect({ label, value })}>
            {label}
          </div>
        ))}
      </div>
    </div>
  )
}

interface SelectInputProps extends Omit<MultiSelectProps, 'selectedOptions' | 'setSelected'> {
  selectedOption?: OptionType
  changeSelected?: (selectedOption: OptionType) => void
}

export function SelectInput ({ changeSelected, className, error, options = [], selectedOption }: SelectInputProps) {
  const hasError = Boolean(error)
  const divRef = useRef<HTMLDivElement | null>(null)
  const listRef = useRef<HTMLDivElement | null>(null)
  const [show, setShow] = useState(false)

  useEffect(() => {
    const handler = (event: MouseEvent) => {
      if (divRef.current === null || listRef.current === null) return

      if (divRef.current.contains(event.target as Node)) return

      if (listRef.current.contains(event.target as Node)) return

      setShow(false)
    }
    window.addEventListener('click', handler)

    return () => { window.removeEventListener('click', handler) }
  }, [listRef.current])

  const toggleOptions = () => {
    setShow(!show)
  }

  const handleClick = (event: React.MouseEvent<HTMLDivElement>) => {
    if (divRef.current === null) return

    if (divRef.current !== event.target) return

    toggleOptions()
  }

  const unselectedOptions = options.filter(option =>
    option.value !== selectedOption?.value
  )

  const handleSelect = (option: OptionType) => (event: React.MouseEvent) => {
    event.stopPropagation()
    changeSelected?.(option)
    setShow(false)
  }

  return (
    <div
      className={cn(
        'min-h-9 w-full appearance-none rounded-md border border-contrast bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 focus:outline-contrast focus:ring-accent focus-visible:outline-accent focus-visible:ring-1 inline-flex justify-between relative',
        hasError &&
          'animate-shake border-red-500 focus:outline-red-500 focus:ring-red-500 focus-visible:outline-red-500 focus-visible:ring-red-500',
        className
      )}
    >
      <div className='z-10 flex flex-1 flex-row flex-wrap items-center justify-between gap-2' ref={divRef} onClick={handleClick} >
        {selectedOption !== undefined && (
          <div
            className='flex items-center rounded-lg bg-gray-300 text-center text-sm'
          >
            <span className='p-[2px] px-2'>{selectedOption.label}</span>

          </div>
        )}

        {selectedOption === undefined && (
          <div
            className='flex items-center text-center text-sm'
          >
            <span className='cursor-default p-[2px] px-2 opacity-90'>Selecciona un edificio</span>
          </div>
        )}

        <button className='pl-1' type='button' onClick={(event) => {
          event.stopPropagation()
          toggleOptions()
        }}>
          <ChevronDownIcon />
        </button>
      </div>

      {/* <div className='z-10 flex items-center divide-x divide-dotted'>
        {selectedOptions.length > 0 && (
          <button
            className='mr-1'
            type='button'
            onClick={() => {
              setSelected?.([])
            }}
          >
            <XMarkIcon />
          </button>
        )}
        <button className='pl-1' type='button' onClick={(event) => {
          event.stopPropagation()
          toggleOptions()
        }}>
          <ChevronDownIcon />
        </button>
      </div> */}

      <div ref={listRef} className={cn('absolute left-0 z-10 top-10 ease-in-out w-full duration-300 transition-all overflow-y-auto bg-gray-200 rounded-lg scrollbar-thin scrollbar-white', show ? 'h-fit max-h-48 px-1 py-2' : 'h-0 p-0')}>
        {unselectedOptions.map(({ label, value }) => (
          <div key={value} className='cursor-pointer rounded-lg p-2 hover:bg-gray-100' onClick={handleSelect({ label, value })}>
            {label}
          </div>
        ))}
      </div>
    </div>
  )
}
