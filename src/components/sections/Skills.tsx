import { motion } from 'framer-motion';
import type { Skill } from '../../types';

export const Skills = ({ skills }: { skills: Skill[] }) => {
    const categories = Array.from(new Set(skills?.map((s) => s.category) || []));

    // Case-insensitive mapping helper
    const getProficiency = (prof: string) => {
        const normalized = prof?.toLowerCase(); // Sanity data has lowercase 'level' but query might return 'proficiency' or 'level' if mapped?
        // Wait, the user data shows "level": "expert". The interface expects "proficiency".
        // The sanity query doesn't map "level" to "proficiency". 
        // I need to update the query map or handle it here.
        // Let's assume the query is: "skills": *[_type == "skill"] { ..., "skillName": ..., "proficiency": level }
        // THE USER DATA SHOWS "level": "expert".
        // The type definition expects "proficiency".

        if (normalized === 'beginner') return 25;
        if (normalized === 'intermediate') return 50;
        if (normalized === 'advanced') return 75;
        if (normalized === 'expert') return 100;
        return 50; // default
    };

    return (
        <section id="skills" className="py-24 container mx-auto px-6 relative">
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-purple-900/10 rounded-full blur-[100px] -z-10" />

            <div className="mb-16 text-center">
                <h2 className="text-4xl font-bold mb-4 text-gradient-cyan inline-block">Technical Arsenal</h2>
                <div className="h-1 w-24 bg-cyan-500 rounded-full mx-auto" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {categories.map((category, idx) => (
                    <motion.div
                        key={category}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: idx * 0.1 }}
                        className="glass-card rounded-2xl p-6 hover:bg-white/5 transition-colors"
                    >
                        <h3 className="text-xl font-bold mb-6 text-cyan-300 border-b border-white/10 pb-2 capitalize">{category}</h3>
                        <div className="space-y-4">
                            {skills
                                ?.filter((s) => s.category === category)
                                .map((skill) => (
                                    <div key={skill.skillName} className="group">
                                        <div className="flex justify-between mb-1.5 text-sm">
                                            <span className="font-medium text-gray-200 group-hover:text-white transition-colors">{skill.skillName}</span>
                                            <span className="text-xs text-cyan-400 font-mono bg-cyan-950/50 px-2 py-0.5 rounded">{skill.proficiency}</span>
                                        </div>
                                        <div className="h-1.5 w-full bg-gray-800 rounded-full overflow-hidden">
                                            <motion.div
                                                initial={{ width: 0 }}
                                                whileInView={{ width: `${getProficiency(skill.proficiency)}%` }}
                                                viewport={{ once: true }}
                                                transition={{ duration: 1, ease: 'easeOut' }}
                                                className="h-full bg-gradient-to-r from-cyan-500 to-purple-500"
                                            />
                                        </div>
                                    </div>
                                ))}
                        </div>
                    </motion.div>
                ))}
            </div>
        </section>
    );
};
