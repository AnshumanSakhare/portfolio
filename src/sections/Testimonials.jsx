const testimonials = [
    {
        name: "Jane Doe",
        title: "CEO, Tech Solutions Inc.",
        quote: "Anshuman is a highly skilled and dedicated developer. He was instrumental in the success of our latest project and I would highly recommend him to anyone."
    },
    {
        name: "John Smith",
        title: "Project Manager, Innovate Co.",
        quote: "Working with Anshuman was a pleasure. He is a great team player and always goes the extra mile to ensure the job gets done right."
    },
    {
        name: "Emily White",
        title: "Designer, Creative Studio",
        quote: "Anshuman has a great eye for detail and a deep understanding of design principles. He is able to translate complex designs into beautiful and functional user interfaces."
    }
];

export const Testimonials = () => (
    <section id="testimonials" className="container mx-auto px-6 py-20">
        <div className="text-center mb-12 animate-fade-in">
            <h2 className="text-4xl font-bold font-serif">
                What <span className="text-primary">Others Say</span>
            </h2>
            <p className="text-muted-foreground mt-2">Testimonials from people I've worked with</p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
                <div key={index} className="glass rounded-2xl p-6 glow-border animate-fade-in" style={{ animationDelay: `${index * 0.1}s` }}>
                    <p className="text-muted-foreground mb-4">"{testimonial.quote}"</p>
                    <div className="flex items-center">
                        <div>
                            <p className="font-bold text-primary">{testimonial.name}</p>
                            <p className="text-sm text-muted-foreground">{testimonial.title}</p>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    </section>
);
