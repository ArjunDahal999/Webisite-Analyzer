import React from 'react'


import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Clock, HardDrive, Network, } from "lucide-react"

interface PerformanceData {
  loadTime: string
  pageSize: string
  requestCount: number
}



const Statistics = (performanceData:PerformanceData) => {
  return (
    <>
    <section className=' flex  justify-center flex-wrap items-center  gap-4 p-4'>
          <Card className=' w-64'>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Clock className="w-5 h-5 text-blue-500" />
                Load Time
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-blue-600 mb-2">{performanceData.loadTime}s</div>
        
            </CardContent>
          </Card>

          <Card className=' w-64'>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <HardDrive className="w-5 h-5 text-green-500" />
                Page Size
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-green-600 mb-2">
                {(Number.parseFloat(performanceData.pageSize) / 1024).toFixed(1)}MB
              </div>
              <p className="text-sm text-gray-600">Target: {"<"} 3.0MB</p>
            </CardContent>
          </Card>

          <Card className=' w-64'>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Network className="w-5 h-5 text-orange-500" />
                HTTP Requests
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-orange-600 mb-2">{performanceData.requestCount}</div>
            </CardContent>
          </Card>
     </section>
    </>
  )
}

export default Statistics