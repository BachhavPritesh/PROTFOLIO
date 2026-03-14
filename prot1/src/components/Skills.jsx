import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import {
    FaReact,
    FaNodeJs,
    FaPython,
    FaDatabase,
    FaHtml5,
    FaCss3Alt,
    FaJs,
    FaGitAlt,
} from 'react-icons/fa';
import {
    SiMongodb,
    SiExpress,
    SiTailwindcss,
    SiTypescript,
} from 'react-icons/si';
import './Skills.css';

const Skills = () => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: '-100px' });

    const skills = [
        { name: 'React', icon: FaReact, color: '#61DAFB' },
        { name: 'Node.js', icon: FaNodeJs, color: '#339933' },
        { name: 'Python', icon: FaPython, color: '#3776AB' },
        { name: 'MongoDB', icon: SiMongodb, color: '#47A248' },
        { name: 'Express', icon: SiExpress, color: '#000000' },
        { name: 'TypeScript', icon: SiTypescript, color: '#3178C6' },
        { name: 'HTML5', icon: FaHtml5, color: '#E34F26' },
        { name: 'CSS3', icon: FaCss3Alt, color: '#1572B6' },
        { name: 'JavaScript', icon: FaJs, color: '#F7DF1E' },
        { name: 'Tailwind', icon: SiTailwindcss, color: '#06B6D4' },
        { name: 'Git', icon: FaGitAlt, color: '#F05032' },
        { name: 'SQL', icon: FaDatabase, color: '#4479A1' },
    ];

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1,
            },
        },
    };

    const itemVariants = {
        hidden: { opacity: 0, scale: 0.8 },
        visible: {
            opacity: 1,
            scale: 1,
            transition: { duration: 0.5 },
        },
    };

    return (
        <section id="skills" className="skills section" ref={ref}>
            <div className="container">
                <motion.h2
                    className="section-title"
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                    transition={{ duration: 0.6 }}
                >
                    Skills & Technologies
                </motion.h2>

                <motion.div
                    className="skills-grid"
                    initial="hidden"
                    animate={isInView ? 'visible' : 'hidden'}
                    variants={containerVariants}
                >
                    {skills.map((skill, index) => (
                        <motion.div
                            key={skill.name}
                            className="skill-card glass"
                            variants={itemVariants}
                            whileHover={{ scale: 1.05, y: -5 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            <skill.icon className="skill-icon" style={{ color: skill.color }} />
                            <h3 className="skill-name">{skill.name}</h3>
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
};

export default Skills;
