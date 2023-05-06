import React from 'react'
import {data as articles} from '../../data/science'
import ScienceCard from '../cards/ScienceCard'

function Science() {
  return (
    <div className="w-full flex flex-col items-center">
      <div className="w-full max-w-screen-lg flex flex-col gap-4 p-2">
        <div className="flex flex-row gap-2">
          <div className=" w-[4px] bg-indigo-600"></div>
          <h2 className=" self-start text-2xl lg:text-4xl font-bold">
            Academic repository 📰
          </h2>
        </div>
        <div className="flex flex-col w-full gap-4">
          {articles.sort(/* sort by date */ 
            (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
          ).map((article, index) => (
            <ScienceCard article={article} key={index} />
          ))}
        </div>
      </div>
    </div>
  )
}

export default Science