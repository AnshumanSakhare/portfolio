import { Navbar } from "./layout/Navbar"
import { Hero } from "./sections/Hero"
import { About } from "./sections/About"
import { Projects } from "./sections/Projects"
import { Experience } from "./sections/Experience"
import { Contact } from "./sections/Contacts"
import { Testimonials } from "./sections/Testimonials"


function App() {

  return (
    <>
    <div className="min-h-screen overflow-x-hidden">
      <Navbar></Navbar>
      <main>
        <Hero></Hero>
        <About></About>
        <Projects></Projects>
        <Experience></Experience>
        <Testimonials></Testimonials>
        <Contact></Contact>
      </main>
    </div>
    </>
  )
}

export default App
