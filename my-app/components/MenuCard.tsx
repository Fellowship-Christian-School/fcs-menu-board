'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { MenuItem } from '../types/menu'

interface MenuCardProps {
  items: MenuItem[]
  transitionDelay?: number
}

export function MenuCard({ items, transitionDelay = 0 }: MenuCardProps) {
  const [currentIndex, setCurrentIndex] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % items.length)
    }, 5000)
    return () => clearInterval(timer)
  }, [items.length])

  const currentItem = items[currentIndex]

  return (
    <div className="relative h-64 w-full overflow-hidden rounded-b-xl border border-[#002B5C] bg-white">
      <AnimatePresence mode="wait" initial={false}>
        <motion.div
          key={currentIndex}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ 
            duration: 0.3,
            ease: "easeInOut"
          }}
          className="relative h-full w-full"
        >
          <img
            src={currentItem.image || "/placeholder.svg"}
            alt={currentItem.name}
            className="h-full w-full object-cover"
          />
          <div className="absolute bottom-0 left-0 right-0 bg-[#002B5C] p-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-medium text-white">{currentItem.name}</h3>
              {currentItem.calories && (
                <span className="text-sm text-white/90">{currentItem.calories} Cal</span>
              )}
            </div>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  )
}

