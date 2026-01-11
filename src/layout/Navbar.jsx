import { useState } from "react";
import { Menu, X } from "lucide-react";
import { Button } from "../Components/Button.jsx";

const navLinks = [
    {href: "#about", label: "About"},
    {href: "#projects", label: "Projects"},
    {href: "#experience", label: "Experience"},
    {href: "#testimonials", label: "Testimonials"}
];


export const Navbar = () => {
    const [isMobileMeunOpen, setIsMobileMenuOpen] = useState(false);
    return (<header className="fixed top-0 left-0 right-0 bg-transparent py-5">
        <nav className="container mx-auto px-6 flex items-center justify-between">
            <a href="#" className="text-xl font-bold tracking-tight hover:text-primary">AS<span className="text-primary">.</span>
            </a>
            {/*desktopnav*/}
            <div className="hidden md:flex items-center gap-1">
                <div className="glass rounded-full px-2 py-1 flex items-center gap-1">
                    {navLinks.map((Link,index) => (
                        <a href={Link.href} key={index} className="py-4 px-2 text-sm text-muted-foreground hover:text-foreground rounded-full hover:bg-surface" >{Link.label}</a>
                    ))}

                </div>
            </div>
            {/*CTA BUTTON nav*/}
            <div className="hidden md:block"><Button size="sm">Contact me</Button></div>
            {/*mobile nav*/}
            <button className="md:hidden p-2 text-foreground cursor-pointer" onClick={() => setIsMobileMenuOpen((prev)=>!prev)}>
                {isMobileMeunOpen?<X size={24}/>:<Menu size={24}/>}
            </button>
            
        </nav>
        {/*mobile menu*/}
        {isMobileMeunOpen && (
        <div className="md:hidden glass-strong animate-fade-in">
            <div className="container mx-auto px-6 py-6 flex flex-col gap-4">
                {navLinks.map((Link,index) => (
                        <a href={Link.href} key={index} className="text-lg text-muted-foreground hover:text-foreground py-2" >{Link.label}</a>
                    ))}
                    <Button size="sm">Contact me</Button>
                    
            </div>
        </div>
      )}
        
    </header>
    );
};