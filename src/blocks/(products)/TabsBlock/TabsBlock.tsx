'use client'

import React, { useState } from 'react'
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs'
import MaterialCarousel from './MaterialCarousel'
import type { TabsBlock as TabsBlockType } from '@/payload-types'
import type { Media } from '@/payload-types'

interface Material {
  id?: string
  title?: string
  image?: Media | null
}

export const TabsBlock: React.FC<TabsBlockType> = ({ category }) => {
  const [activeTab, setActiveTab] = useState(category?.[0]?.id)

  return (
    <div className="container p-16">
      <Tabs
        defaultValue={category && category[0] && category[0].id ? category[0].id : undefined}
        value={activeTab!}
        onValueChange={setActiveTab}
        className="w-full"
      >
        <TabsList className="w-full flex justify-between border-b rounded-none h-auto p-0 bg-transparent">
          {category?.map((tab) => (
            <TabsTrigger
              key={tab.id}
              value={tab.id!}
              className={`flex-1 py-4 px-2 text-sm font-medium rounded-none border-b-2 border-transparent data-[state=active]:border-black data-[state=active]:shadow-none ${
                activeTab === tab.id ? 'border-black' : 'border-transparent'
              }`}
            >
              {tab.tabName}
            </TabsTrigger>
          ))}
        </TabsList>
        {category?.map((tab) => (
          <TabsContent key={tab.id} value={tab.id!} className="pt-8">
            <MaterialCarousel materials={tab.finishes! as Material[]} />
          </TabsContent>
        ))}
      </Tabs>
    </div>
  )
}
