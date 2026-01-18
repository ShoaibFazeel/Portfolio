import { useState } from 'react';
import { ExternalLink, Github } from 'lucide-react';
import type { Project } from '../../types';
import { urlFor } from '../../lib/sanity';
import { Button, Card, Tag, Modal } from '../ui/Components';

export const Projects = ({ projects }: { projects: Project[] }) => {
    const [selectedProject, setSelectedProject] = useState<Project | null>(null);

    // Duplicate projects for infinite loop - enough to fill wide screens
    // If few projects, duplicate more. 
    const displayProjects = [...projects, ...projects, ...projects, ...projects];

    return (
        <section id="projects" className="py-24 overflow-hidden bg-[#030014] relative">
            <div className="container mx-auto px-6 mb-16 relative">
                <div className="flex flex-col items-start gap-4">
                    <h2 className="text-4xl md:text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">
                        Featured Work
                    </h2>
                    <div className="h-1 w-32 bg-purple-500 rounded-full" />
                    <p className="text-gray-400 mt-2">Click on any project to view details.</p>
                </div>
            </div>

            {/* Marquee Container with Checkered Mask */}
            <div className="w-full relative mask-gradient-h pause-on-hover cursor-pointer">
                <div className="flex gap-8 px-8 w-max animate-marquee">
                    {displayProjects.map((project, index) => (
                        <div
                            key={`${project.title}-${index}`}
                            className="mt-5 w-[320px] shrink-0 group relative"
                            onClick={() => setSelectedProject(project)}
                        >
                            <Card className="flex flex-col h-full overflow-hidden p-0 border-0 bg-[#0f111a] glass-card ring-1 ring-white/10 hover:ring-purple-500/50 transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl hover:shadow-purple-900/20">
                                {/* Window Header */}
                                <div className="h-8 bg-black/40 border-b border-white/5 flex items-center px-4 space-x-2 shrink-0">
                                    <div className="w-2.5 h-2.5 rounded-full bg-red-500/20 border border-red-500/50" />
                                    <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/20 border border-yellow-500/50" />
                                    <div className="w-2.5 h-2.5 rounded-full bg-green-500/20 border border-green-500/50" />
                                    <div className="ml-4 text-[10px] font-mono text-gray-500 flex-1 text-center pr-8 truncate">
                                        {project.title.toLowerCase().replace(/\s+/g, '-')}.tsx
                                    </div>
                                </div>

                                <div className="p-5 flex flex-col justify-between h-full bg-[#0f111a]/50">
                                    <div className="flex items-center justify-between mb-4">
                                        <h3 className="text-xl font-bold text-white group-hover:text-purple-300 transition-colors">
                                            {project.title}
                                        </h3>
                                        <ExternalLink size={16} className="text-gray-600 group-hover:text-purple-400 transition-colors opacity-0 group-hover:opacity-100" />
                                    </div>

                                    <div className="space-y-3">
                                        <div className="flex flex-wrap gap-1.5">
                                            {project.technologies.slice(0, 3).map((tech) => (
                                                <Tag key={tech} className="bg-purple-950/20 border-purple-900/30 text-purple-300 font-mono text-[10px] px-2 py-0.5">
                                                    {tech}
                                                </Tag>
                                            ))}
                                            {project.technologies.length > 3 && (
                                                <Tag className="bg-white/5 border-white/10 text-gray-500 font-mono text-[10px] px-2 py-0.5">
                                                    +{project.technologies.length - 3}
                                                </Tag>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </Card>
                        </div>
                    ))}
                </div>

                {/* Gradient Masks */}
                <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-[#030014] to-transparent z-10 pointer-events-none" />
                <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-[#030014] to-transparent z-10 pointer-events-none" />
            </div>

            {/* Project Details Modal */}
            <Modal isOpen={!!selectedProject} onClose={() => setSelectedProject(null)}>
                {selectedProject && (
                    <div className="flex flex-col h-full max-h-[90vh] w-full">
                        {/* Image Banner Section */}
                        <div className="w-full relative h-[40vh] min-h-[250px] shrink-0 bg-[#0e121b] border-b border-white/5">
                            {selectedProject.image ? (
                                <img
                                    src={urlFor(selectedProject.image).width(1920).height(1080).url()}
                                    alt={selectedProject.title}
                                    className="w-full h-full object-cover"
                                />
                            ) : (
                                <div className="absolute inset-0 bg-gray-900 flex items-center justify-center text-gray-700 font-mono">
                                    No Image Preview
                                </div>
                            )}
                            <div className="absolute inset-0 bg-gradient-to-t from-[#0e121b] to-transparent opacity-60" />
                        </div>

                        {/* Content Section */}
                        <div className="w-full p-8 overflow-y-auto bg-[#0e121b]">
                            <div className="max-w-4xl mx-auto">
                                <h2 className="text-3xl font-bold text-white mb-2">{selectedProject.title}</h2>
                                <div className="h-1 w-20 bg-purple-500 rounded-full mb-6" />

                                <div className="mb-8 space-y-4">
                                    <h3 className="text-xs uppercase tracking-wider text-gray-500 font-semibold mb-3">Technologies</h3>
                                    <div className="flex flex-wrap gap-2">
                                        {selectedProject.technologies.map(tech => (
                                            <Tag key={tech} className="bg-purple-900/20 border-purple-500/30 text-purple-300 text-xs py-1 px-2.5">
                                                {tech}
                                            </Tag>
                                        ))}
                                    </div>
                                </div>

                                <div className="mb-10">
                                    <h3 className="text-xs uppercase tracking-wider text-gray-500 font-semibold mb-3">About the Project</h3>
                                    <p className="text-gray-300 leading-relaxed text-sm">
                                        {selectedProject.description}
                                    </p>
                                </div>

                                <div className="flex flex-wrap gap-3 mt-auto">
                                    {selectedProject.liveDemoLink && (
                                        <Button
                                            size="lg"
                                            onClick={() => window.open(selectedProject.liveDemoLink, '_blank')}
                                            className="bg-purple-600 hover:bg-purple-500 text-white border-0 px-8 shadow-lg shadow-purple-900/20"
                                        >
                                            <ExternalLink className="mr-2" size={18} />
                                            Launch Demo
                                        </Button>
                                    )}
                                    {selectedProject.githubLink && (
                                        <Button
                                            size="lg"
                                            onClick={() => window.open(selectedProject.githubLink, '_blank')}
                                            className="bg-white/5 hover:bg-white/10 text-white border border-white/10 px-8"
                                        >
                                            <Github className="mr-2" size={18} />
                                            View Code
                                        </Button>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </Modal>
        </section>
    );
};
