import { motion } from 'framer-motion';
import { Briefcase, Calendar, MapPin, ChevronDown } from 'lucide-react';
import { useState } from 'react';
import type { Experience } from '../../types';
import { Card, Tag } from '../ui/Components';

export const ExperienceSection = ({ experience }: { experience: Experience[] }) => {
    const [expandedCards, setExpandedCards] = useState<Set<number>>(new Set());

    const toggleCard = (index: number) => {
        const newExpanded = new Set(expandedCards);
        if (newExpanded.has(index)) {
            newExpanded.delete(index);
        } else {
            newExpanded.add(index);
        }
        setExpandedCards(newExpanded);
    };

    return (
        <section id="experience" className="py-24 container mx-auto px-6 relative">
            <div className="absolute left-0 top-1/2 -translate-y-1/2 w-[400px] h-[800px] bg-blue-900/10 rounded-full blur-[100px] -z-10" />

            <div className="mb-16">
                <h2 className="text-4xl font-bold mb-4 text-gradient-cyan inline-block">Professional Journey</h2>
                <div className="h-1 w-24 bg-blue-500 rounded-full" />
            </div>

            <div className="relative max-w-4xl mx-auto space-y-8 before:absolute before:inset-0 before:ml-5 before:h-full before:w-0.5 before:-translate-x-px before:bg-gradient-to-b before:from-transparent before:via-gray-700 before:to-transparent md:before:ml-[10.5rem] md:space-y-12">
                {[...experience].sort((a, b) => {
                    const dateA = new Date(a.startDate).getTime();
                    const dateB = new Date(b.startDate).getTime();
                    // Handle invalid dates by placing them at the end
                    if (isNaN(dateA)) return 1;
                    if (isNaN(dateB)) return -1;
                    return dateB - dateA;
                }).map((exp, index) => {
                    const isExpanded = expandedCards.has(index);

                    return (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                            className="relative flex items-center justify-between md:justify-start group"
                        >
                            <span className="md:flex hidden shrink-0 items-center justify-center border border-gray-700 w-40 h-10 rounded-full text-xs font-medium text-gray-400 bg-black/50 backdrop-blur mr-8 whitespace-nowrap px-4">
                                {exp.startDate} - {exp.endDate}
                            </span>

                            <div className="absolute -left-2 md:left-[10rem] w-4 h-4 rounded-full border-2 border-blue-500 bg-black ring-4 ring-black" />

                            <Card className="flex-1 ml-6 md:ml-12 glass-card p-6 border-gray-800/50 hover:border-blue-500/30 transition-colors">
                                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-3">
                                    <div>
                                        <h3 className="text-lg font-bold text-white group-hover:text-blue-400 transition-colors">{exp.role}</h3>
                                        <p className="text-blue-300 font-medium flex items-center gap-2 text-sm">
                                            <Briefcase size={14} />
                                            {exp.company}
                                        </p>
                                    </div>
                                    <div className="flex flex-col sm:items-end gap-1 text-sm text-gray-400">
                                        <div className="flex items-center gap-1 md:hidden text-blue-400">
                                            <Calendar size={12} />
                                            <span className="text-xs">{exp.startDate} - {exp.endDate}</span>
                                        </div>
                                        <div className="flex items-center gap-1">
                                            <MapPin size={12} />
                                            <span className="text-xs">{exp.location}</span>
                                        </div>
                                    </div>
                                </div>

                                {isExpanded && (
                                    <motion.div
                                        initial={{ opacity: 0, height: 0 }}
                                        animate={{ opacity: 1, height: 'auto' }}
                                        exit={{ opacity: 0, height: 0 }}
                                        transition={{ duration: 0.3 }}
                                    >
                                        <p className="text-gray-400 mb-4 leading-relaxed whitespace-pre-line text-sm">{exp.description}</p>
                                    </motion.div>
                                )}

                                <div className="flex flex-wrap gap-2 mb-3">
                                    {exp.technologies?.slice(0, isExpanded ? undefined : 5).map((tech) => (
                                        <Tag key={tech} className="text-xs bg-blue-900/20 text-blue-200 border-blue-800/30">
                                            {tech}
                                        </Tag>
                                    ))}
                                    {!isExpanded && exp.technologies && exp.technologies.length > 5 && (
                                        <Tag className="text-xs bg-blue-900/20 text-blue-200 border-blue-800/30">
                                            +{exp.technologies.length - 5} more
                                        </Tag>
                                    )}
                                </div>

                                <button
                                    onClick={() => toggleCard(index)}
                                    className="flex items-center gap-2 text-xs text-blue-400 hover:text-blue-300 transition-colors font-medium"
                                >
                                    {isExpanded ? 'Show less' : 'Show details'}
                                    <ChevronDown
                                        size={14}
                                        className={`transition-transform duration-300 ${isExpanded ? 'rotate-180' : ''}`}
                                    />
                                </button>
                            </Card>
                        </motion.div>
                    );
                })}
            </div>
        </section>
    );
};
