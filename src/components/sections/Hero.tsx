import { motion } from 'framer-motion';
import { Mail, FileText, MapPin } from 'lucide-react';
import type { AboutMe } from '../../types';
import { urlFor } from '../../lib/sanity';
import { Button } from '../ui/Components';

export const Hero = ({ aboutMe }: { aboutMe: AboutMe }) => {
    return (
        <section className="relative min-h-screen flex flex-col justify-center py-20 overflow-hidden">
            {/* Background decoration */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-indigo-900/20 rounded-full blur-[120px] -z-10" />
            <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-cyan-900/10 rounded-full blur-[100px] -z-10" />

            <motion.div
                className="container mx-auto px-6 relative z-10"
            >
                <div className="flex flex-col-reverse md:flex-row items-center gap-12 lg:gap-20">
                    <div className="flex-1 text-center md:text-left">
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.2 }}
                            className="inline-block px-4 py-2 rounded-full glass border-cyan-500/30 text-cyan-300 text-sm font-medium mb-8"
                        >
                            🚀 {aboutMe.role}
                        </motion.div>

                        <h1 className="text-6xl md:text-8xl font-bold mb-8 tracking-tighter leading-tight">
                            Hi, I'm <br />
                            <span className="text-gradient-cyan">{aboutMe.fullName}</span>
                        </h1>

                        <p className="text-xl md:text-2xl text-gray-400 mb-10 max-w-2xl leading-relaxed">
                            {aboutMe.shortBio}
                        </p>

                        <div className="flex flex-wrap justify-center md:justify-start gap-4 mb-12">
                            <div className="flex items-center gap-2 text-gray-400 bg-white/5 px-4 py-2 rounded-lg">
                                <MapPin size={18} className="text-cyan-400" />
                                <span>{aboutMe.location}</span>
                            </div>
                            <div className="flex items-center gap-2 text-gray-400 bg-white/5 px-4 py-2 rounded-lg">
                                <Mail size={18} className="text-purple-400" />
                                <span>{aboutMe.email}</span>
                            </div>
                        </div>

                        <div className="flex flex-wrap justify-center md:justify-start gap-6">
                            <Button size="lg" className="bg-cyan-600 hover:bg-cyan-500 text-white border-0 shadow-lg shadow-cyan-900/20" onClick={() => window.open(aboutMe.resumeLink, '_blank')}>
                                <FileText className="mr-2" size={20} />
                                View Resume
                            </Button>
                            <Button variant="outline" size="lg" className="border-purple-500/50 text-purple-300 hover:bg-purple-950/30" onClick={() => (window.location.href = `mailto:${aboutMe.email}`)}>
                                <Mail className="mr-2" size={20} />
                                Get in Touch
                            </Button>
                        </div>
                    </div>

                    <motion.div
                        initial={{ scale: 0.8, opacity: 0, rotate: -5 }}
                        animate={{ scale: 1, opacity: 1, rotate: 0 }}
                        transition={{ delay: 0.4, type: 'spring', stiffness: 100 }}
                        className="relative"
                    >
                        <div className="absolute inset-0 bg-gradient-to-tr from-cyan-500 to-purple-600 rounded-[2rem] blur-2xl opacity-40 animate-pulse" />
                        <div className="relative w-72 h-72 md:w-96 md:h-96 rounded-[2rem] overflow-hidden glass p-3 border-white/10 ring-1 ring-white/20">
                            {/* Using specific image builder to ensure valid URL */}
                            <img
                                src={aboutMe.profilePicture ? urlFor(aboutMe.profilePicture).width(800).height(800).url() : '/placeholder-profile.jpg'}
                                alt={aboutMe.fullName}
                                className="w-full h-full object-cover rounded-2xl bg-gray-900"
                            />
                        </div>
                    </motion.div>
                </div>
            </motion.div>
        </section>
    );
};
