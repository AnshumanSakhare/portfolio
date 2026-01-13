import React from 'react';
import { FaHtml5, FaCss3Alt, FaJs, FaBootstrap, FaReact, FaSass, FaNodeJs, FaPython, FaGitAlt, FaGithub, FaAws, FaDocker, FaWordpress, FaShopify } from 'react-icons/fa';
import { SiExpress, SiDjango, SiGraphql, SiSocketdotio, SiPostman, SiVercel, SiFirebase, SiMongodb, SiMysql, SiRedux, SiNextdotjs, SiTailwindcss, SiVite  } from "react-icons/si";
import {  TbApi } from "react-icons/tb";
import { DiRedis } from "react-icons/di";


const skills = [
  { name: 'HTML', icon: <FaHtml5 className="text-orange-500" /> },
  { name: 'CSS', icon: <FaCss3Alt className="text-blue-500" /> },
  { name: 'JavaScript', icon: <FaJs className="text-yellow-400" /> },
  { name: 'Bootstrap', icon: <FaBootstrap className="text-purple-500" /> },
  { name: 'React Js', icon: <FaReact className="text-blue-300" /> },
  { name: 'Redux', icon: <SiRedux className="text-purple-400" /> },
  { name: 'Next Js', icon: <SiNextdotjs className="text-white" /> },
  { name: 'Tailwind CSS', icon: <SiTailwindcss className="text-teal-400" /> },
  { name: 'Vite', icon: <SiVite className="text-purple-400" /> },
  { name: 'Node Js', icon: <FaNodeJs className="text-green-500" /> },
  { name: 'Express Js', icon: <SiExpress className="text-white" /> },
  { name: 'Python', icon: <FaPython className="text-blue-400" /> },
  { name: 'Django', icon: <SiDjango className="text-green-800" /> },
  { name: 'REST API', icon: <TbApi className="text-green-400" /> },
  { name: 'Socket.IO', icon: <SiSocketdotio className="text-white" /> },
  { name: 'GraphQL', icon: <SiGraphql className="text-pink-500" /> },
  { name: 'Git', icon: <FaGitAlt className="text-orange-600" /> },
  { name: 'GitHub', icon: <FaGithub className="text-white" /> },

  { name: 'MongoDB', icon: <SiMongodb className="text-green-500" /> },
  { name: 'MySQL', icon: <SiMysql className="text-blue-300" /> },
  { name: 'Redis', icon: <DiRedis className="text-red-500" /> },
  { name: 'Wordpress', icon: <FaWordpress className="text-blue-200" /> },
  { name: 'Shopify', icon: <FaShopify className="text-green-300" /> },
];

export const Skills = () => {
  return (
    <section id="skills" className="py-20 bg-gray-900 text-white">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold text-center mb-12">My Skills</h2>
        <div className="flex flex-wrap justify-center items-center gap-8">
          {skills.map((skill, index) => (
            <div 
              key={index} 
              className="group relative flex flex-col items-center justify-center w-32 h-32 bg-gray-800 rounded-full border-2 border-gray-700 transition-all duration-300 hover:border-cyan-400 hover:scale-110 glow"
            >
              <div className="text-5xl mb-2 transition-transform duration-300 group-hover:-translate-y-2">
                {skill.icon}
              </div>
              <span className="absolute bottom-4 text-sm font-semibold opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                {skill.name}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};