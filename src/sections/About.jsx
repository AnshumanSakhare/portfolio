export const About = () => (
    <section id="about" className="container mx-auto px-6 py-20">
        <div className="text-center mb-12 animate-fade-in">
            <h2 className="text-4xl font-bold font-serif">
                About <span className="text-primary">Me</span>
            </h2>
            <p className="text-muted-foreground mt-2">A little bit about me</p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Column: Text */}
            <div className="space-y-6 animate-slide-in-left animation-delay-200">
                <p className="text-lg text-muted-foreground leading-relaxed">
                    Hello! I'm Anshuman, a passionate software developer with a knack for creating elegant and efficient solutions. My journey in tech started with a fascination for how things work, which led me to pursue a degree in computer science. Today, I thrive on turning complex problems into beautiful, intuitive, and scalable web applications.
                </p>
                <p className="text-lg text-muted-foreground leading-relaxed">
                    I have a strong foundation in both front-end and back-end development, allowing me to build complete, end-to-end products. I'm always eager to learn new technologies and improve my skills to keep up with the ever-evolving world of software engineering.
                </p>
            </div>

            {/* Right Column: Stats */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 animate-slide-in-right animation-delay-400">
                <div className="glass rounded-2xl p-6 text-center glow-border col-span-1 md:col-span-2">
                    <h3 className="text-2xl font-bold text-primary">BE in Computer Science</h3>
            
                </div>
            </div>
        </div>
    </section>
);