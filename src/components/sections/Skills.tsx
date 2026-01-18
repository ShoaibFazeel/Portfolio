import { motion } from 'framer-motion';
import type { Skill } from '../../types';

export const Skills = ({ skills }: { skills: Skill[] }) => {
    // Group skills by category or just flatten them if we want a mix
    // The user asked for "right to left in loop". 
    // To make it look cool, we can have two rows moving in opposite directions or same direction.
    // Let's do two rows for visual density.

    // Split skills into two roughly equal chunks
    const mid = Math.ceil(skills.length / 2);
    const row1 = skills.slice(0, mid);
    const row2 = skills.slice(mid);

    // Duplicate arrays to create the infinite loop effect
    // We need enough copies to fill the screen width + buffer. 
    // Usually 2 or 3 copies is enough depending on content width.
    const row1Display = [...row1, ...row1, ...row1, ...row1];
    const row2Display = [...row2, ...row2, ...row2, ...row2];

    const MarqueeRow = ({ items, direction = 'left', speed = 20 }: { items: Skill[], direction?: 'left' | 'right', speed?: number }) => (
        <div className="flex overflow-hidden relative w-full py-4 mask-gradient-h">
            <motion.div
                className="flex gap-6 whitespace-nowrap"
                initial={{ x: direction === 'left' ? 0 : '-50%' }}
                animate={{ x: direction === 'left' ? '-50%' : 0 }}
                transition={{
                    duration: speed,
                    repeat: Infinity,
                    ease: "linear"
                }}
            >
                {items.map((skill, idx) => (
                    <div
                        key={`${skill.skillName}-${idx}`}
                        className="relative group shrink-0"
                    >
                        <div className="glass-card px-6 py-3 rounded-full border border-white/5 hover:border-cyan-500/30 hover:bg-white/5 transition-all flex items-center gap-2">
                            <div className={`w-2 h-2 rounded-full ${skill.proficiency === 'Expert' ? 'bg-purple-500' :
                                    skill.proficiency === 'Advanced' ? 'bg-cyan-500' :
                                        'bg-blue-500'
                                }`} />
                            <span className="text-gray-200 font-medium">{skill.skillName}</span>
                            <span className="text-xs text-gray-500 font-mono ml-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                {skill.proficiency}
                            </span>
                        </div>
                    </div>
                ))}
            </motion.div>
            {/* Gradient Masks */}
            <div className="absolute inset-y-0 left-0 w-20 bg-gradient-to-r from-[#030014] to-transparent z-10" />
            <div className="absolute inset-y-0 right-0 w-20 bg-gradient-to-l from-[#030014] to-transparent z-10" />
        </div>
    );

    return (
        <section id="skills" className="py-24 relative overflow-hidden bg-[#030014]">
            {/* Background Ambience */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-[300px] bg-cyan-900/10 blur-[100px] -z-10 rounded-[100%]" />

            <div className="container mx-auto px-6 mb-12 text-center">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                >
                    <h2 className="text-4xl md:text-5xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-400">
                        Technical Arsenal
                    </h2>
                    <p className="text-gray-400">The tools I use to build the future.</p>
                </motion.div>
            </div>

            <div className="flex flex-col gap-8">
                <MarqueeRow items={row1Display} direction="left" speed={40} />
                <MarqueeRow items={row2Display} direction="left" speed={50} />
                {/* Note: User asked for "right to left in loop". So both are direction="left". 
                    Different speeds add depth. */}
            </div>
        </section>
    );
};
