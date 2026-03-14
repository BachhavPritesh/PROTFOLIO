import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { FaGithub, FaExternalLinkAlt, FaReact, FaNodeJs, FaPython, FaStripe, FaDatabase } from 'react-icons/fa';
import { SiMongodb, SiFirebase, SiTailwindcss, SiJavascript, SiPostgresql, SiD3DotJs } from 'react-icons/si';
import './Projects.css';

const techIcons = {
    'React': { icon: FaReact, color: '#61DAFB' },
    'Node.js': { icon: FaNodeJs, color: '#339933' },
    'MongoDB': { icon: SiMongodb, color: '#47A248' },
    'Stripe': { icon: FaStripe, color: '#6772E5' },
    'Firebase': { icon: SiFirebase, color: '#FFCA28' },
    'Tailwind CSS': { icon: SiTailwindcss, color: '#06B6D4' },
    'Python': { icon: FaPython, color: '#3776AB' },
    'PostgreSQL': { icon: SiPostgresql, color: '#336791' },
    'D3.js': { icon: SiD3DotJs, color: '#F9A03C' },
    'JavaScript': { icon: SiJavascript, color: '#F7DF1E' },
    'SQL': { icon: FaDatabase, color: '#4479A1' },
};

const Projects = () => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: '-100px' });

    const projects = [
        {
            title: 'E-Commerce Platform',
            description:
                'A full-stack e-commerce solution with payment integration, user authentication, and admin dashboard.',
            technologies: ['React', 'Node.js', 'MongoDB', 'Stripe'],
            github: 'https://github.com',
            demo: 'https://demo.com',
        },
        {
            title: 'Task Management App',
            description:
                'Collaborative task management tool with real-time updates, drag-and-drop functionality, and team collaboration features.',
            technologies: ['React', 'Firebase', 'Tailwind CSS'],
            github: 'https://github.com',
            demo: 'https://demo.com',
        },
        {
            title: 'Weather Dashboard',
            description:
                'Real-time weather application with location-based forecasts, interactive maps, and weather alerts.',
            technologies: ['React', 'OpenWeather API', 'Chart.js'],
            github: 'https://github.com',
            demo: 'https://demo.com',
        },
        {
            title: 'Social Media Analytics',
            description:
                'Analytics dashboard for tracking social media metrics, engagement rates, and audience insights.',
            technologies: ['Python', 'Django', 'PostgreSQL', 'D3.js'],
            github: 'https://github.com',
            demo: 'https://demo.com',
        },
    ];

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.2,
            },
        },
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 30 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.6 },
        },
    };

    return (
        <section id="projects" className="projects section" ref={ref}>
            <div className="container">
                <motion.h2
                    className="section-title"
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                    transition={{ duration: 0.6 }}
                >
                    Featured Projects
                </motion.h2>

                <motion.div
                    className="projects-grid"
                    initial="hidden"
                    animate={isInView ? 'visible' : 'hidden'}
                    variants={containerVariants}
                >
                    {projects.map((project, index) => (
                        <motion.div
                            key={index}
                            className="project-card glass"
                            variants={itemVariants}
                            whileHover={{ y: -10 }}
                        >
                            <div className="project-content">
                                <h3 className="project-title">{project.title}</h3>
                                <p className="project-description">{project.description}</p>
                                <div className="project-tech">
                                    {project.technologies.map((tech, i) => {
                                        const TechData = techIcons[tech];
                                        return (
                                            <span key={i} className="tech-tag">
                                                {TechData && <TechData.icon style={{ marginRight: '6px', color: TechData.color }} />}
                                                {tech}
                                            </span>
                                        );
                                    })}
                                </div>
                            </div>
                            <div className="project-links">
                                <a
                                    href={project.github}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="project-link"
                                >
                                    <FaGithub /> Code
                                </a>
                                <a
                                    href={project.demo}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="project-link"
                                >
                                    <FaExternalLinkAlt /> Demo
                                </a>
                            </div>
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
};

export default Projects;
