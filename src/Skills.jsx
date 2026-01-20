import { motion } from "framer-motion";
import {
    SiTailwindcss,
    SiPhp,
    SiMongodb,
    SiOracle,
    SiSqlite,
    SiMysql,
    SiExpress,
    SiHtml5,
    SiCss3,
    SiTypescript,
    SiJavascript,
    SiFirebase,
    SiVuedotjs,
    SiSupabase,
    SiReact,
    SiDocker,
    SiFigma,
} from "react-icons/si";
import { FaNodeJs, FaReact, FaGitAlt, FaGithub,FaServer,FaTools,FaGlobe   } from "react-icons/fa";
import { BiLogoPostgresql } from "react-icons/bi";
import { TbApi } from "react-icons/tb";
import { Code, Database, Wrench, Smartphone } from 'lucide-react';
import java from './assets/images/java.png';
// Animation variants
const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.08,
            delayChildren: 0.1
        }
    }
};

const itemVariants = {
    hidden: { 
        y: 40, 
        opacity: 0,
        scale: 0.8 
    },
    visible: {
        y: 0,
        opacity: 1,
        scale: 1,
        transition: {
            type: "spring",
            stiffness: 120,
            damping: 15,
            mass: 0.8
        }
    }
};

const skillHoverVariants = {
    initial: { 
        scale: 1, 
        rotate: 0,
        y: 0 
    },
    hover: { 
        scale: 1.15,
        rotate: 5,
        y: -12,
        transition: {
            type: "spring",
            stiffness: 500,
            damping: 20
        }
    }
};

const iconFloatVariants = {
    float: {
        y: [0, -8, 0],
        transition: {
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut"
        }
    }
};

const categoryTitleVariants = {
    hidden: { 
        opacity: 0, 
        x: -50 
    },
    visible: { 
        opacity: 1, 
        x: 0,
        transition: {
            type: "spring",
            stiffness: 100,
            delay: 0.2
        }
    }
};

const SkillCategory = ({ title, children, icon: Icon, color }) => {
    return (
        <motion.div 
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            className="mb-20 last:mb-0"
        >
            <motion.div 
                variants={categoryTitleVariants}
                className="flex items-center mb-12"
            >
                <motion.div
                    whileHover={{ rotate: 360 }}
                    transition={{ duration: 0.6 }}
                    className="mr-4 p-3 rounded-xl bg-gradient-to-br from-gray-800 to-gray-900 shadow-lg"
                >
                    <Icon className={`size-8 ${color}`} />
                </motion.div>
                <div>
                    <h3 className="text-3xl font-bold text-white mb-2">{title}</h3>
                    <motion.div 
                        initial={{ width: 0 }}
                        whileInView={{ width: "80px" }}
                        transition={{ delay: 0.3, duration: 0.8 }}
                        className="h-1 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full"
                    />
                </div>
            </motion.div>
            
            <motion.div 
                variants={containerVariants}
                className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6"
            >
                {children}
            </motion.div>
        </motion.div>
    );
};

const SkillCard = ({ 
    icon: Icon, 
    label, 
    color, 
    gradient = "from-blue-500/20 to-purple-600/20",
    delay = 0 
}) => {
    return (
        <motion.div
            variants={itemVariants}
            custom={delay}
            whileHover="hover"
            className="group relative"
        >
            <div className={`absolute -inset-2 bg-gradient-to-br ${gradient} rounded-3xl blur-xl opacity-0 group-hover:opacity-100 transition-all duration-500`} />
            
            <motion.div 
                variants={skillHoverVariants}
                className="relative bg-gradient-to-br from-gray-800/90 to-gray-900/90 backdrop-blur-xl p-6 rounded-2xl border border-gray-700/50 group-hover:border-gray-600/80 shadow-2xl shadow-black/20"
            >
                <div className="flex flex-col items-center gap-4">
                    <motion.div
                        variants={iconFloatVariants}
                        animate="float"
                        className={`p-4 rounded-2xl bg-gradient-to-br from-gray-800 to-gray-900 shadow-inner ${color} transform transition-all duration-300 group-hover:shadow-lg`}
                    >
                        <Icon className="size-8" />
                    </motion.div>
                    
                    <div className="text-center">
                        <span className="text-white font-semibold text-sm tracking-wide">
                            {label}
                        </span>
                        <motion.div 
                            initial={{ width: 0, opacity: 0 }}
                            whileInView={{ width: "100%", opacity: 1 }}
                            transition={{ delay: delay + 0.3, duration: 0.6 }}
                            className="mt-2 h-0.5 bg-gradient-to-r from-blue-500/50 to-purple-600/50 rounded-full"
                        />
                    </div>
                </div>
            </motion.div>
        </motion.div>
    );
};

const Skills = () => {
    const categories = [
        {
            title: "Langages de Programmation",
            icon: Code,
            color: "text-blue-400",
            skills: [
                { icon: () => <img src="src/assets/images/java.png" alt="Java" className="size-8" />, label: "Java", color: "text-red-500", gradient: "from-red-500/20 to-orange-500/20" },
                { icon: () => <img src="src/assets/images/python.png" alt="Python" className="size-8" />, label: "Python", color: "text-blue-400", gradient: "from-blue-500/20 to-cyan-500/20" },
                { icon: () => <img src="src/assets/images/c-.png" alt="C++" className="size-8" />, label: "C++", color: "text-blue-600", gradient: "from-blue-600/20 to-indigo-500/20" },
                { icon: SiJavascript, label: "Javascript", color: "text-yellow-400", gradient: "from-yellow-500/20 to-yellow-500/20" },
                { icon: SiPhp, label: "PHP", color: "text-purple-500", gradient: "from-purple-500/20 to-pink-500/20" },
            ]
        },
        {
            title: "Frameworks & Bibliothèques",
            icon: Smartphone,
            color: "text-cyan-400",
            skills: [
                { icon: FaNodeJs, label: "Node.js", color: "text-green-500", gradient: "from-green-500/20 to-emerald-500/20" },
                { icon: SiTailwindcss, label: "Tailwind CSS", color: "text-cyan-400", gradient: "from-cyan-500/20 to-blue-500/20" },
                { icon: FaReact, label: "React Native", color: "text-blue-400", gradient: "from-blue-400/20 to-cyan-400/20" },
                { icon: () => <img src="src/images/flutter.png" alt="Flutter" className="size-8" />, label: "Flutter", color: "text-blue-300", gradient: "from-blue-300/20 to-indigo-400/20" },
                { icon: SiVuedotjs, label: "Vue.js", color: "text-green-400", gradient: "from-green-400/20 to-teal-500/20" },
                { icon: SiExpress, label: "Express", color: "text-gray-300", gradient: "from-gray-500/20 to-gray-700/20" },
            ]
        },
        {
            title: "Bases de Données",
            icon: Database,
            color: "text-blue-500",
            skills: [
                { icon: BiLogoPostgresql, label: "PostgreSQL", color: "text-blue-600", gradient: "from-blue-600/20 to-indigo-500/20" },
                { icon: SiMongodb, label: "MongoDB", color: "text-green-500", gradient: "from-green-500/20 to-emerald-500/20" },
                { icon: SiMysql, label: "MySQL", color: "text-blue-500", gradient: "from-blue-500/20 to-cyan-500/20" },
                { icon: SiSqlite, label: "SQLite", color: "text-blue-400", gradient: "from-blue-400/20 to-cyan-400/20" },
                { icon: SiOracle, label: "Oracle", color: "text-red-500", gradient: "from-red-500/20 to-orange-500/20" },
            ]
        },
        {
            title: "Technologies Web",
            icon: FaGlobe ,
            color: "text-orange-400",
            skills: [
                { icon: SiHtml5, label: "HTML5", color: "text-orange-500", gradient: "from-orange-500/20 to-red-500/20" },
                { icon: SiCss3, label: "CSS3", color: "text-blue-500", gradient: "from-blue-500/20 to-indigo-500/20" },
                { icon: SiTypescript, label: "TypeScript", color: "text-blue-600", gradient: "from-blue-600/20 to-cyan-500/20" },
                { icon: TbApi, label: "REST API", color: "text-gray-300", gradient: "from-gray-500/20 to-gray-700/20" },
                { icon: SiReact, label: "React", color: "text-cyan-400", gradient: "from-cyan-400/20 to-blue-400/20" },
            ]
        },
        {
            title: "Cloud & Backend",
            icon: FaServer ,
            color: "text-yellow-400",
            skills: [
                { icon: SiFirebase, label: "Firebase", color: "text-yellow-500", gradient: "from-yellow-500/20 to-orange-500/20" },
                { icon: SiSupabase, label: "Supabase", color: "text-green-400", gradient: "from-green-400/20 to-emerald-500/20" },
                { icon: FaGitAlt, label: "Git", color: "text-orange-500", gradient: "from-orange-500/20 to-red-500/20" },
                { icon: FaGithub, label: "GitHub", color: "text-gray-300", gradient: "from-gray-600/20 to-gray-800/20" },
            ]
        },
        {
            title: "Outils & DevOps",
            icon: FaTools ,
            color: "text-blue-300",
            skills: [
                { icon: SiDocker, label: "Docker", color: "text-blue-400", gradient: "from-blue-400/20 to-cyan-500/20" },
                { icon: () => <img src="src/assets/images/figma.png" alt="figma" className="size-8" />, label: "Figma", color: "text-purple-400", gradient: "from-purple-400/20 to-pink-500/20" },
                { icon: () => <img src="src/assets/images/vscode.png" alt="VS Code" className="size-8" />, label: "VS Code", color: "text-blue-500", gradient: "from-blue-500/20 to-cyan-500/20" },
                { icon: () => <img src="src/assets/images/linux.png" alt="Linux" className="size-8" />, label: "Linux", color: "text-yellow-500", gradient: "from-yellow-500/20 to-orange-500/20" },
                { icon: () => <img src="src/assets/images/iot.png" alt="IoT" className="size-8" />, label: "IoT", color: "text-blue-300", gradient: "from-blue-300/20 to-indigo-400/20" },
            ]
        }
    ];

    return (
        <section id="skills"  className="relative py-24 bg-gradient-to-b from-gray-900 via-gray-900 to-black overflow-hidden">
            {/* Background effects */}
            <div className="absolute inset-0 bg-grid-white/[0.02] bg-[size:20px_20px]" />
            <div className="absolute top-0 left-0 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse" />
            <div className="absolute bottom-0 right-0 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse" />
            
            <div className="container relative mx-auto px-4 md:px-8">
                {/* Header */}
                <motion.div 
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    viewport={{ once: true }}
                    className="text-center mb-20"
                >
                    <div className="inline-block relative mb-8">
                        <motion.div
                            initial={{ scale: 0 }}
                            whileInView={{ scale: 1 }}
                            transition={{ delay: 0.3, duration: 0.6, type: "spring" }}
                            className="absolute -inset-4 bg-gradient-to-r from-blue-500/20 via-purple-500/20 to-pink-500/20 blur-xl rounded-full"
                        />
                        <h1 className="text-5xl md:text-7xl font-bold relative">
                            <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent animate-gradient">
                                Compétences
                            </span>
                        </h1>
                    </div>
                    
                    <motion.p 
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        transition={{ delay: 0.5, duration: 0.8 }}
                        className="text-xl text-gray-400 max-w-3xl mx-auto"
                    >
                        Une palette complète de technologies modernes que je maîtrise pour créer des solutions innovantes et performantes
                    </motion.p>
                    
                    <motion.div 
                        initial={{ width: 0 }}
                        whileInView={{ width: "200px" }}
                        transition={{ delay: 0.7, duration: 1 }}
                        className="h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 mx-auto mt-8 rounded-full"
                    />
                </motion.div>

                {/* Skills Grid */}
                <div className="space-y-16">
                    {categories.map((category, index) => (
                        <SkillCategory 
                            key={index}
                            title={category.title}
                            icon={category.icon}
                            color={category.color}
                        >
                            {category.skills.map((skill, skillIndex) => (
                                <SkillCard
                                    key={skillIndex}
                                    icon={skill.icon}
                                    label={skill.label}
                                    color={skill.color}
                                    gradient={skill.gradient}
                                    delay={skillIndex * 0.1}
                                />
                            ))}
                        </SkillCategory>
                    ))}
                </div>

                {/* Stats Footer */}
                <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.8, duration: 0.6 }}
                    className="mt-24 pt-12 border-t border-gray-800"
                >
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                        <div className="text-center">
                            <motion.div 
                                initial={{ scale: 0 }}
                                whileInView={{ scale: 1 }}
                                transition={{ delay: 0.9, type: "spring" }}
                                className="text-4xl font-bold bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent mb-2"
                            >
                                25+
                            </motion.div>
                            <div className="text-gray-400">Technologies</div>
                        </div>
                        <div className="text-center">
                            <motion.div 
                                initial={{ scale: 0 }}
                                whileInView={{ scale: 1 }}
                                transition={{ delay: 1.0, type: "spring" }}
                                className="text-4xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent mb-2"
                            >
                                6
                            </motion.div>
                            <div className="text-gray-400">Catégories</div>
                        </div>
                        <div className="text-center">
                            <motion.div 
                                initial={{ scale: 0 }}
                                whileInView={{ scale: 1 }}
                                transition={{ delay: 1.1, type: "spring" }}
                                className="text-4xl font-bold bg-gradient-to-r from-green-400 to-emerald-400 bg-clip-text text-transparent mb-2"
                            >
                                Full-Stack
                            </motion.div>
                            <div className="text-gray-400">Expertise</div>
                        </div>
                        <div className="text-center">
                            <motion.div 
                                initial={{ scale: 0 }}
                                whileInView={{ scale: 1 }}
                                transition={{ delay: 1.2, type: "spring" }}
                                className="text-4xl font-bold bg-gradient-to-r from-orange-400 to-red-400 bg-clip-text text-transparent mb-2"
                            >
                                ∞
                            </motion.div>
                            <div className="text-gray-400">Apprentissage</div>
                        </div>
                    </div>
                </motion.div>
            </div>

            {/* CSS Animation */}
            <style jsx>{`
                @keyframes gradient {
                    0%, 100% { background-position: 0% 50%; }
                    50% { background-position: 100% 50%; }
                }
                .animate-gradient {
                    background-size: 200% 200%;
                    animation: gradient 3s ease infinite;
                }
            `}</style>
        </section>
    );
};

export default Skills;