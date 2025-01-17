'use client'

import { useState, useEffect } from 'react'
import { MenuCard } from './MenuCard'
import { Settings } from '../types/menu'
import { format } from 'date-fns'

export function MenuDisplay({ settings }: { settings: Settings }) {
  const [currentDate, setCurrentDate] = useState(new Date())

  useEffect(() => {
    setCurrentDate(new Date())
  }, [])

  return (
    <div className="min-h-screen bg-white p-6">
      <div className="mx-auto w-full max-w-none">
        <div className="mb-8 flex items-center justify-between">
          <h1 className="text-2xl font-bold text-[#002B5C]">{format(currentDate, settings.dateFormat)}</h1>
          <div className="rounded-full bg-[#FF5722] px-4 py-2 text-white text-sm">
            {settings.madeByText}
          </div>
        </div>

        <h2 className="text-3xl font-bold text-[#002B5C] mb-6">{settings.pageTitle}</h2>

        {/* Menu Sections */}
        <div className="flex flex-wrap items-start gap-6">
          {settings.menuSections.map((section, index) => (
            <div 
              key={section.title} 
              className="flex min-w-[300px] flex-1 flex-col gap-4"
            >
              <h3 className="text-xl font-medium text-white bg-[#002B5C] px-4 py-2 rounded-t-lg">
                {section.title}
              </h3>
              <MenuCard 
                items={section.items}
                transitionDelay={index * 0.5}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

