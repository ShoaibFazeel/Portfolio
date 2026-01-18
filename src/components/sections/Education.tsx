import { motion } from 'framer-motion';
import { GraduationCap, Calendar } from 'lucide-react';
import type { Education } from '../../types';
import { Card } from '../ui/Components';

export const EducationSection = ({ education }: { education: Education[] }) => {
    return (
        <section id="education" className="py-24 container mx-auto px-6 bg-black/20">
            <div className="mb-16">
                <h2 className="text-4xl font-bold mb-4 text-gradient-cyan inline-block">Education</h2>
                <div className="h-1 w-24 bg-green-500 rounded-full" />
            </div>

            <div className="grid grid-cols-1 gap-6 max-w-4xl mx-auto">
                {[...education].sort((a, b) => new Date(b.startDate).getTime() - new Date(a.startDate).getTime()).map((edu, index) => (
                    <motion.div
                        key={index}
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: index * 0.1 }}
                    >
                        <Card className="flex flex-col md:flex-row gap-6 items-start p-8 glass-card border-l-4 border-l-green-500">
                            <div className="p-4 rounded-full bg-green-500/10 text-green-400 shrink-0">
                                <GraduationCap size={32} />
                            </div>
                            <div className="flex-1">
                                <div className="flex flex-col md:flex-row md:items-center justify-between mb-2">
                                    <h3 className="text-2xl font-bold text-white">{edu.institution}</h3>
                                    <div className="flex items-center gap-2 text-sm text-green-400 font-mono bg-green-900/20 px-3 py-1 rounded-full mt-2 md:mt-0 w-fit">
                                        <Calendar size={14} />
                                        <span>{edu.startDate} - {edu.endDate}</span>
                                    </div>
                                </div>
                                <p className="text-lg text-gray-300 font-medium mb-2">{edu.degree}</p>
                                <p className="text-gray-400">Major in {edu.major}</p>
                            </div>
                        </Card>
                    </motion.div>
                ))}
            </div>
        </section>
    );
};
