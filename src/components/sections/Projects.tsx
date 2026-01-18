import { motion } from 'framer-motion';
import { ExternalLink, Github } from 'lucide-react';
import type { Project } from '../../types';
import { urlFor } from '../../lib/sanity';
import { Button, Card, Tag } from '../ui/Components';

export const Projects = ({ projects }: { projects: Project[] }) => {
    return (
        <section id="projects" className="py-24 container mx-auto px-6">
            <div className="mb-16">
                <h2 className="text-4xl font-bold mb-4 text-gradient-cyan inline-block">Featured Work</h2>
                <div className="h-1 w-24 bg-purple-500 rounded-full" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
                {projects.map((project, index) => (
                    <motion.div
                        key={project.title}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: index * 0.1 }}
                        className="group"
                    >
                        <Card className="flex flex-col h-full overflow-hidden p-0 border-0 bg-[#0f111a] glass-card ring-1 ring-white/10 hover:ring-cyan-500/50 transition-all duration-300">
                            {/* Window Header */}
                            <div className="h-10 bg-black/40 border-b border-white/5 flex items-center px-4 space-x-2 shrink-0">
                                <div className="w-3 h-3 rounded-full bg-red-500/20 border border-red-500/50" />
                                <div className="w-3 h-3 rounded-full bg-yellow-500/20 border border-yellow-500/50" />
                                <div className="w-3 h-3 rounded-full bg-green-500/20 border border-green-500/50" />
                                <div className="ml-4 text-xs font-mono text-gray-500 flex-1 text-center pr-12">
                                    {project.title.toLowerCase().replace(/\s+/g, '-')}.tsx
                                </div>
                            </div>

                            {/* Project Image (Preview) */}
                            {project.image && (
                                <div className="relative h-48 w-full overflow-hidden border-b border-white/5 group-hover:opacity-90 transition-opacity">
                                    <div className="absolute inset-0 bg-blue-500/10 z-10 mix-blend-overlay" />
                                    <img
                                        src={urlFor(project.image).width(800).height(450).url()}
                                        alt={project.title}
                                        className="w-full h-full object-cover"
                                    />
                                </div>
                            )}

                            <div className="p-8 flex flex-col flex-1 relative">
                                <h3 className="text-2xl font-bold mb-3 text-white group-hover:text-cyan-300 transition-colors flex items-center gap-3">
                                    <span className="text-cyan-500 opacity-60">function</span> {project.title}<span className="text-purple-400">()</span>
                                </h3>

                                <p className="text-gray-400 mb-8 flex-1 leading-relaxed border-l-2 border-white/5 pl-4 ml-1">
                                    <span className="text-gray-600 select-none mr-2">{'//'}</span>
                                    {project.description}
                                </p>

                                <div className="space-y-6">
                                    <div className="flex flex-wrap gap-2">
                                        {project.technologies.map((tech) => (
                                            <Tag key={tech} className="bg-blue-950/30 border-blue-900/50 text-blue-300 font-mono text-xs">
                                                {tech}
                                            </Tag>
                                        ))}
                                    </div>

                                    <div className="flex gap-4 pt-4 border-t border-white/5">
                                        {project.githubLink && (
                                            <Button size="sm" onClick={() => window.open(project.githubLink, '_blank')} className="bg-white/5 hover:bg-white/10 text-white border-0 flex-1">
                                                <Github size={16} className="mr-2" />
                                                View Source
                                            </Button>
                                        )}
                                        {project.liveDemoLink && (
                                            <Button size="sm" onClick={() => window.open(project.liveDemoLink, '_blank')} className="bg-cyan-600/20 hover:bg-cyan-600/30 text-cyan-300 border-0 flex-1">
                                                <ExternalLink size={16} className="mr-2" />
                                                Live Demo
                                            </Button>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </Card>
                    </motion.div>
                ))}
            </div>
        </section>
    );
};
