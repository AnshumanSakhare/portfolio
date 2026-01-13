import { Button } from "../Components/Button";
import { ArrowRight } from "lucide-react";

const projects = [
    {
        title: "E-commerce Platform",
        description: "A full-stack e-commerce website built with the MERN stack. Features include product catalog, user authentication, and a shopping cart.",
        image: "https://picsum.photos/seed/project1/300/200",
        link: "#"
    },
    {
        title: "Task Management App",
        description: "A React-based task management application with a drag-and-drop interface. It uses Firebase for real-time data synchronization.",
        image: "https://picsum.photos/seed/project2/300/200",
        link: "#"
    },
    {
        title: "Portfolio Website",
        description: "A personal portfolio website (the one you're looking at!) built with React and Tailwind CSS, designed to be fully responsive.",
        image: "https://picsum.photos/seed/project3/300/200",
        link: "#"
    }
];

export const Projects = () => (
    <section id="projects" className="container mx-auto px-6 py-20">
        <div className="text-center mb-12 animate-fade-in">
            <h2 className="text-4xl font-bold font-serif">
                My <span className="text-primary">Projects</span>
            </h2>
            <p className="text-muted-foreground mt-2">Here are some of my recent works</p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project, index) => (
                <div key={index} className="glass rounded-2xl p-6 text-center glow-border animate-fade-in transition-transform duration-300 transform hover:-translate-y-2" style={{ animationDelay: `${index * 0.1}s` }}>
                    <img src={project.image} alt={project.title} className="rounded-lg mb-4" />
                    <h3 className="text-2xl font-bold text-primary mb-2">{project.title}</h3>
                    <p className="text-muted-foreground mb-4">{project.description}</p>
                    <Button variant="outline" size="sm">
                        View Project <ArrowRight className="w-4 h-4 ml-2" />
                    </Button>
                </div>
            ))}
        </div>
    </section>
);
