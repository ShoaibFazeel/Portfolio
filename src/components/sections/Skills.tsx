import { motion } from 'framer-motion';
import type { Skill } from '../../types';

export const Skills = ({ skills }: { skills: Skill[] }) => {
    // Group skills by category dynamically
    const categories: Record<string, Skill[]> = {};

    skills.forEach(skill => {
        const category = skill.category;
        if (!categories[category]) {
            categories[category] = [];
        }
        categories[category].push(skill);
    });

    // Filter out empty categories and sort by desired order
    const categoryOrder = ['frontend', 'backend', 'database', 'devops', 'other'];
    const activeCategories = Object.entries(categories)
        .filter(([_, items]) => items && items.length > 0)
        .sort(([a], [b]) => {
            const indexA = categoryOrder.indexOf(a.toLowerCase());
            const indexB = categoryOrder.indexOf(b.toLowerCase());
            // If category not in order list, put it at the end
            if (indexA === -1) return 1;
            if (indexB === -1) return -1;
            return indexA - indexB;
        });

    // Helper function to get proficiency percentage
    const getProficiencyPercentage = (proficiency: string) => {
        const normalized = proficiency.toLowerCase();
        switch (normalized) {
            case 'expert': return 100;
            case 'advanced': return 80;
            case 'intermediate': return 60;
            case 'beginner': return 40;
            default: return 50;
        }
    };

    // Helper function to get proficiency color
    const getProficiencyColor = (proficiency: string) => {
        const normalized = proficiency.toLowerCase();
        switch (normalized) {
            case 'expert': return 'from-purple-500 to-purple-400';
            case 'advanced': return 'from-cyan-500 to-cyan-400';
            case 'intermediate': return 'from-blue-500 to-blue-400';
            case 'beginner': return 'from-gray-500 to-gray-400';
            default: return 'from-blue-500 to-blue-400';
        }
    };

    return (
        <section id="skills" className="py-24 relative overflow-hidden bg-[#030014]">
            {/* Background Ambience */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-[500px] bg-cyan-900/10 blur-[120px] -z-10 rounded-full" />
            <div className="absolute bottom-0 right-0 w-[300px] h-[300px] bg-purple-900/10 blur-[100px] -z-10 rounded-full" />

            <div className="container mx-auto px-6">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-16"
                >
                    <h2 className="text-4xl md:text-5xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-400 inline-block">
                        Technical Arsenal
                    </h2>
                    <div className="h-1 w-24 bg-gradient-to-r from-cyan-500 to-purple-500 rounded-full mx-auto" />
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-6 gap-6 max-w-7xl mx-auto">
                    {activeCategories.map(([category, items], idx) => (
                        <motion.div
                            key={category}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: idx * 0.1 }}
                            className={`${activeCategories.length === 5 && idx < 2
                                    ? 'md:col-span-3'
                                    : 'md:col-span-2'
                                }`}
                        >
                            <div className="h-full glass-card p-6 rounded-3xl border border-white/5 relative overflow-hidden group hover:border-cyan-500/30 transition-all duration-500">
                                {/* Subtle decorative gradient background */}
                                <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                                <h3 className="text-xl font-bold text-gray-200 mb-4 flex items-center gap-2">
                                    <span className="w-1.5 h-6 rounded-full bg-gradient-to-b from-cyan-400 to-purple-500" />
                                    {category.charAt(0).toUpperCase() + category.slice(1)}
                                    <span className="text-xs font-normal text-gray-500 ml-auto font-mono">{items.length} skills</span>
                                </h3>

                                <div className="space-y-3">
                                    {items.map((skill) => (
                                        <div key={skill.skillName} className="relative">
                                            <div className="flex items-center justify-between mb-1.5">
                                                <span className="text-xs font-medium text-gray-300">
                                                    {skill.skillName}
                                                </span>
                                                <span className="text-[10px] text-gray-500 font-mono">
                                                    {skill.proficiency}
                                                </span>
                                            </div>
                                            <div className="h-1.5 bg-white/5 rounded-full overflow-hidden">
                                                <motion.div
                                                    initial={{ width: 0 }}
                                                    whileInView={{ width: `${getProficiencyPercentage(skill.proficiency)}%` }}
                                                    viewport={{ once: true }}
                                                    transition={{ duration: 1, ease: 'easeOut', delay: idx * 0.1 }}
                                                    className={`h-full bg-gradient-to-r ${getProficiencyColor(skill.proficiency)} rounded-full`}
                                                />
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};
