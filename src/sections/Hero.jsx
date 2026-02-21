import { ArrowRight, Github, Linkedin } from "lucide-react";
import { Button } from "../Components/Button.jsx";
import { FaHtml5, FaCss3Alt, FaJs, FaReact, FaNodeJs, FaPython, FaDocker, FaAws, FaGithub } from 'react-icons/fa';
import { SiTypescript, SiNextdotjs, SiTailwindcss, SiMongodb, SiPostgresql, SiRedux, SiExpress, SiDjango, SiFastapi, SiPrisma, SiFirebase, SiVercel, SiGraphql, SiRedis } from 'react-icons/si';

const techStack = [
  { name: "HTML",        icon: <FaHtml5      className="text-orange-500" />, },
  { name: "CSS",         icon: <FaCss3Alt    className="text-blue-500"  />, },
  { name: "JavaScript",  icon: <FaJs         className="text-yellow-400"/>, },
  { name: "TypeScript",  icon: <SiTypescript className="text-blue-500"  />, },
  { name: "React",       icon: <FaReact      className="text-blue-300"  />, },
  { name: "Next.js",     icon: <SiNextdotjs  className="text-white"     />, },
  { name: "Redux",       icon: <SiRedux      className="text-purple-400"/>, },
  { name: "Tailwind",    icon: <SiTailwindcss className="text-teal-400" />, },
  { name: "Node.js",     icon: <FaNodeJs     className="text-green-500" />, },
  { name: "Express",     icon: <SiExpress    className="text-white"     />, },
  { name: "Python",      icon: <FaPython     className="text-blue-400"  />, },
  { name: "Django",      icon: <SiDjango     className="text-green-600" />, },
  { name: "FastAPI",     icon: <SiFastapi    className="text-teal-400"  />, },
  { name: "GraphQL",     icon: <SiGraphql    className="text-pink-500"  />, },
  { name: "MongoDB",     icon: <SiMongodb    className="text-green-500" />, },
  { name: "PostgreSQL",  icon: <SiPostgresql className="text-blue-400"  />, },
  { name: "Prisma",      icon: <SiPrisma     className="text-white"     />, },
  { name: "Firebase",    icon: <SiFirebase   className="text-yellow-500"/>, },
  { name: "Redis",       icon: <SiRedis      className="text-red-500"   />, },
  { name: "Docker",      icon: <FaDocker     className="text-blue-400"  />, },
  { name: "AWS",         icon: <FaAws        className="text-orange-400"/>, },
  { name: "Vercel",      icon: <SiVercel     className="text-white"     />, },
  { name: "GitHub",      icon: <FaGithub     className="text-white"     />, },
];

export const Hero = () => (
    <section className="relative min-h-screen flex items-center overflow-hidden">
        {/*bg*/}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
            {[...Array(30)].map((_, index) => (
                <div key={index} className="absolute w-1.5 h-1.5 rounded-full opacity-60"
                     style={{
                        backgroundColor: "#20B2A6",
                        left: `${Math.random() * 100}%`,
                        top: `${Math.random() * 100}%`,
                        animation: `slow-drift ${15 + Math.random() * 20}s ease-in-out infinite`,
                        animationDelay: `${Math.random()*5}s`
                     }}
                />
            ))}
        </div>
        {/*content*/}
        <div className="container mx-auto px-6 pt-32 pb-20 relative z-10">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
                {/* left column text*/}
                <div className="space-y-8 ">
                    <div className="animate-fade-in">
                        <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass text-sm text-primary">
                            <span className="w-2 h-2 bg-primary rounded-full animate-pulse" />
                            Software Engineer
                        </span>
                        <br />
                        <br />


                        {/*heading*/}
                        <div className="space-y-4">
                            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold leading-tight animate-fade-in animation-delay-100">
                                Crafting <span className="text-primary glow-text">digital</span>
                                <br/>
                                experiences with
                                <br/>
                                <span className="font-serif italic font-normal text-white">precision.</span>
                            </h1>
                            <p className="text-muted-foreground max-w-lg animate-fade-in animation-delay-200">Hi, I’m Anshuman, a full-stack developer who enjoys building scalable, reliable web applications. I like turning ideas into clean, well-designed systems and am currently exploring Generative AI to add smart, practical features to products. When I’m not coding, you’ll usually find me working on my fitness or just enjoying the process of getting a little better every day.</p>
                        </div>
                        <br />
                        
                        {/*cta button*/}
                        <div className="flex flex-wrap gap-4 animate-fade-in animation-delay-300">
                            <a href="#contact"><Button size="lg">Contact me <ArrowRight className="w-5 h-5"/></Button></a>
                            <a href="/Anshuman_cv.pdf" download>
                                <Button size="lg" variant="outline">Download CV</Button>
                            </a>
                        </div>
                    </div>
                    {/*social links */}
                    <div className="flex items-center gap-4 animate-fade-in animation-delay-400">
                        <span className="text-sm text-muted-foreground">Follow me: </span>
                        {[
                            {icon: <Github />, href:"https://github.com/AnshumanSakhare"},
                            {icon: <Linkedin />, href:"https://www.linkedin.com/in/anshuman-sakhare-59b695185/"} 
                        ].map((item,index) => (
                            <a href={item.href} key={index} target="_blank" rel="noopener noreferrer" className="p-2 rounded-full glass hover:bg-primary/10 hover:text-primary transition-all duration-300" >{item.icon}</a>
                        ))}  

                    </div>
                </div>
                {/*right column image*/}
                <div className="relative animate-fade-in animation-delay-300">
                    {/*image*/}
                    <div className=" absolute inset-0 rounder-3xl bg-gradient-to-br from-primary/30 via-transparent to-primary/10 blur-2xl animate-pulse-glow"/>
                    <div className=" relative glass rounded-3xl p-2 glow-border">
                        <img src="/profile-photo.png" alt="profile photo" className="w-full aspect-[4/5]  object - cover rounded-2xl animate-fade-in"></img>
                        {/*floating badge*/}
                        <div className="absolute -bottom-4 -right-4 glass rounded-xl px-4 py-3 animate-float">
                            <div className="flex items-center gap-3">
                                <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"/>
                                <span className="text-sm font-medium">Available for work</span>
                            </div>
                        </div>
                        {/*stats badge*/}
                    </div>
                </div>
            </div>
            {/*tech stack strip*/}
            <div className="pt-16 animate-fade-in animation-delay-500">
                <p className="text-center text-sm text-muted-foreground mb-6 tracking-widest uppercase">Technologies I work with</p>
                <div className="flex flex-wrap justify-center gap-3">
                    {techStack.map((tech, index) => (
                        <div key={index} className="flex items-center gap-2 px-3 py-2 glass rounded-full text-sm hover:border-primary/50 hover:text-primary transition-all duration-200 cursor-default">
                            <span className="text-base">{tech.icon}</span>
                            <span className="text-muted-foreground">{tech.name}</span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    </section>
);
    
