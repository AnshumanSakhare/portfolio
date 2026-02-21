import { Button } from "../Components/Button";
import { ArrowRight } from "lucide-react";

const projects = [
    {
        title: "EducadorAI",
        description: "Uploads PDFs and auto-generates concise study notes plus Q&A flashcards using AI. Built for fast learning and review.",
        image: "https://picsum.photos/seed/educadorai/300/200",
        link: "https://educadorai.vercel.app"
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
                    <a href={project.link} target="_blank" rel="noopener noreferrer">
                        <Button variant="outline" size="sm">
                            View Project <ArrowRight className="w-4 h-4 ml-2" />
                        </Button>
                    </a>
                </div>
            ))}
        </div>
    </section>
);
