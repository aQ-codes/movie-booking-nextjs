import Image from "next/image";
import React from "react";

type ButtonProps = {
    type: 'button' | 'submit';
    title: string;
    label?:string;
    icon?: string; 
    variant: string[];
    onClick?: () => void; 
};

const Button = ({ type, title, icon, variant, label, onClick }: ButtonProps) => {
    return (
        <button
            className={`${variant.join(' ')}`}
            type={type}
            onClick={onClick} 
        >
            {icon && <Image src={icon} alt={title} width={24} height={24} />}
            <label>{label}</label>
        </button>
    );
};

export default Button;
