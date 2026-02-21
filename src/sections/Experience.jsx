const experiences = [
    {
        role: "Software Engineer",
        company: "Tech Solutions Inc.",
        date: "Jan 2022 - Present",
        description: "Developed and maintained web applications using React, Node.js, and MongoDB. Collaborated with cross-functional teams to deliver high-quality software."
    },
    {
        role: "Junior Developer",
        company: "Innovate Co.",
        date: "Jun 2020 - Dec 2021",
        description: "Assisted in the development of new features for the company's flagship product. Gained experience with agile methodologies and version control systems."
    }
];

export const Experience = () => (
    <section id="experience" className="container mx-auto px-6 py-20">
        <div className="text-center mb-12 animate-fade-in">
            <h2 className="text-4xl font-bold font-serif">
                Work <span className="text-primary">Experience</span>
            </h2>
            <p className="text-muted-foreground mt-2">My professional journey so far</p>
        </div>

        <div className="relative">
            {/* Vertical line */}
            <div className="absolute left-1/2 -translate-x-1/2 w-0.5 h-full bg-border"></div>

            {experiences.map((exp, index) => (
                <div key={index} className={`mb-8 flex justify-between items-center w-full ${index % 2 === 0 ? 'flex-row-reverse' : ''}`}>
                    <div className="w-5/12"></div>
                    <div className="z-10 flex items-center justify-center w-8 h-8 bg-primary rounded-full ring-8 ring-background">
                    </div>
                    <div className="w-5/12">
                        <div className="glass rounded-2xl p-6 glow-border animate-fade-in" style={{ animationDelay: `${index * 0.1}s` }}>
                            <h3 className="text-xl font-bold">{exp.role}</h3>
                            <p className="text-primary mb-2">{exp.company}</p>
                            <p className="text-sm text-muted-foreground mb-4">{exp.date}</p>
                            <p className="text-muted-foreground">{exp.description}</p>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    </section>
);
