
export const Button = ({className = "",size="default", variant = "primary", children}) =>{
    const baseClasses = "relative overflow-hidden rounded-full font-medium focus:outline-none focus-visible:ring-primary shadow-lg shadow-primary/25";
    
    const sizeClasses = {
        sm:"px-4 py-2 text-sm",
        default:"px-6 py-3 text-base",
        lg:"px-8 py-4 text-lg",
    };

    const variantClasses = {
        primary:"bg-primary text-primary-foreground hover:bg-primary/90",
        outline:"bg-transparent border border-primary text-primary hover:bg-primary hover:text-primary-foreground"
    }

    const classes = `${baseClasses} ${sizeClasses[size]} ${variantClasses[variant]} ${className}`;
    return (<button className={classes}><span className="relative flex items-center justify-center gap-2">{children}</span></button>);
};
