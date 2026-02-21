import { Navbar } from "./layout/Navbar"
import { Hero } from "./sections/Hero"
import { About } from "./sections/About"
import { Projects } from "./sections/Projects"
import { Skills } from "./sections/Skills"
import { Contact } from "./sections/Contacts"
import { ChatWidget } from "./Components/ChatWidget"

function App() {
  return (
    <div className="min-h-screen overflow-x-hidden">
      <Navbar />
      <main>
        <Hero />
        <About />
        <Projects />
        <Skills />
        <Contact />
      </main>
      <ChatWidget />
    </div>
  )
}

export default App
