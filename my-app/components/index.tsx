import React from 'react'
import Head from 'next/head'
import MenuDisplay from '../components/MenuDisplay'

const Home: React.FC = () => {
  return (
    <div>
      <Head>
        <title>Lunch Menu Display</title>
        <meta name="description" content="Lunch Menu Display" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <h1 className="text-4xl font-bold text-center my-8">Lunch Menu</h1>
        <MenuDisplay />
      </main>
    </div>
  )
}

export default Home

