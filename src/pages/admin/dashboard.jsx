"use client"

import { useState } from "react"
import Sidebar from "./sidebar"

const WelcomePage = () => {
  return (
    <div className="flex min-h-screen">
      <Sidebar /> {/* Sidebar remains the same */}
      <div className="flex-1 p-6">
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <h1 className="text-2xl font-bold">Vítejte na stránce!</h1>
            <p className="text-lg">Tato stránka zobrazuje jednoduchý uvítací text.</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default WelcomePage
