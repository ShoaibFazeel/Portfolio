import { motion, useScroll, useTransform } from 'framer-motion';
import { FileText, MapPin, ArrowRight } from 'lucide-react';
import type { AboutMe, Experience } from '../../types';
import { urlFor } from '../../lib/sanity';
import { Button } from '../ui/Components';

export const Hero = ({ aboutMe, experience }: { aboutMe: AboutMe; experience?: Experience[] }) => {
    const { scrollY } = useScroll();
    const y1 = useTransform(scrollY, [0, 500], [0, 100]);
    const y2 = useTransform(scrollY, [0, 500], [0, -100]);

    // Check if currently employed
    const currentJob = experience?.find(job => !job.endDate || job.endDate.toLowerCase() === 'present');
    const isEmployed = !!currentJob;

    return (
        <section className="relative min-h-[100vh] flex items-center overflow-hidden bg-[#030014] pt-24 pb-40">
            {/* Dynamic Background */}
            <div className="absolute inset-0 w-full h-full">
                <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-purple-600/30 rounded-full blur-[120px] mix-blend-screen animate-blob" />
                <div className="absolute top-[-10%] right-[-10%] w-[500px] h-[500px] bg-cyan-600/30 rounded-full blur-[120px] mix-blend-screen animate-blob animation-delay-2000" />
                <div className="absolute -bottom-32 left-[20%] w-[500px] h-[500px] bg-blue-600/30 rounded-full blur-[120px] mix-blend-screen animate-blob animation-delay-4000" />
                <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-20 bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))]" />
            </div>

            <div className="container mx-auto px-6 relative z-10">
                <div className="flex flex-col-reverse lg:grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
                    {/* Left: Typography & Content */}
                    <motion.div style={{ y: y1 }} className="flex flex-col items-center text-center lg:pl-12">
                        <motion.div
                            initial={{ opacity: 0, x: -50 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.8, ease: "easeOut" }}
                            className="relative"
                        >
                            <span className="inline-block py-1 px-3 rounded-full bg-cyan-950/30 border border-cyan-500/30 text-cyan-400 text-sm font-mono mb-6 backdrop-blur-md">
                                {aboutMe.role}
                            </span>

                            <h1 className="text-7xl lg:text-9xl font-bold tracking-tighter leading-tight lg:leading-[0.9] mb-6 text-transparent bg-clip-text bg-gradient-to-br from-white via-gray-200 to-gray-600">
                                {aboutMe.fullName.split(' ')[0]}
                                <br />
                                <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-600 tracking-normal lg:tracking-tighter relative">
                                    {aboutMe.fullName.split(' ').slice(1).join(' ')}
                                    <svg className="hidden lg:block absolute -bottom-4 left-1/2 -translate-x-1/2 w-full h-4 text-cyan-500/50" viewBox="0 0 100 10" preserveAspectRatio="none">
                                        <path d="M0 5 Q 50 10 100 5" stroke="currentColor" strokeWidth="2" fill="none" />
                                    </svg>
                                </span>
                            </h1>
                        </motion.div>

                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.4, duration: 0.8 }}
                            className="text-xl text-gray-400 max-w-xl leading-relaxed mb-10 mt-5 pl-0 text-justify hyphens-auto"
                        >
                            {aboutMe.shortBio}
                        </motion.p>

                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.6, duration: 0.8 }}
                            className="flex flex-wrap gap-4 items-center justify-center"
                        >
                            <Button
                                size="lg"
                                className="group bg-white text-black hover:bg-cyan-50 border-0 rounded-full px-8"
                                onClick={() => (window.location.href = `mailto:${aboutMe.email}`)}
                            >
                                Let's Talk <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                            </Button>

                            <div className="flex items-center gap-4 ml-4">
                                <Button
                                    size="lg"
                                    onClick={() => window.open(aboutMe.resumeLink, '_blank')}
                                    className="bg-white/5 hover:bg-white/10 text-gray-300 hover:text-cyan-400 border border-white/10 rounded-full px-6 transition-all"
                                >
                                    <FileText size={18} className="mr-2" />
                                    Resume
                                </Button>

                                <div className="h-8 w-[1px] bg-white/10" />
                                <div className="flex items-center gap-2 text-sm text-gray-500 font-mono">
                                    <MapPin size={14} className="text-cyan-500" />
                                    {aboutMe.location}
                                </div>
                            </div>
                        </motion.div>
                    </motion.div>

                    {/* Right: Floating Glass Card */}
                    {/* Adjusted position: 10% higher than baseline using negative margin */}
                    <motion.div style={{ y: y2 }} className="relative block perspective-1000 mt-0 lg:-mt-70">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.8, rotateY: -15, rotateX: 10 }}
                            animate={{ opacity: 1, scale: 1, rotateY: 0, rotateX: 0 }}
                            transition={{ delay: 0.2, duration: 1, type: "spring" }}
                            whileHover={{ rotateY: 5, rotateX: -5, scale: 1.02 }}
                            className="relative z-20 w-[300px] h-[380px] lg:w-[500px] lg:h-[600px] mx-auto lg:mx-0 glass-card-strong rounded-[30px] p-4 border border-white/10 shadow-2xl shadow-cyan-900/20"
                        >
                            <div className="absolute inset-0 bg-gradient-to-tr from-cyan-500/10 to-purple-500/10 rounded-[30px]" />

                            <div className="h-full w-full rounded-[20px] overflow-hidden relative group">
                                <img
                                    src={aboutMe.profilePicture ? urlFor(aboutMe.profilePicture).width(1000).height(1200).url() : '/placeholder-profile.jpg'}
                                    alt={aboutMe.fullName}
                                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-[#030014] via-transparent to-transparent opacity-60" />

                                <div className="absolute bottom-6 left-6 right-6">
                                    <div className="glass p-4 rounded-xl border-white/10 backdrop-blur-xl bg-black/30">
                                        <div className="flex items-center justify-between">
                                            <div>
                                                <p className="text-xs text-cyan-300 font-mono mb-1">CURRENTLY</p>
                                                <p className="font-semibold text-white">
                                                    {isEmployed ? `Building @ ${currentJob.company}` : 'Open to Opportunities'}
                                                </p>
                                            </div>
                                            {/* Show green pulse only if open to opportunities (not employed) */}
                                            {!isEmployed ? (
                                                <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse shadow-[0_0_10px_rgba(34,197,94,0.5)]" />
                                            ) : (
                                                <div className="w-2 h-2 rounded-full bg-purple-500 shadow-[0_0_10px_rgba(168,85,247,0.5)]" />
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </motion.div>

                        {/* Decor elements */}
                        <div className="absolute top-10 right-10 w-full h-full border border-white/5 rounded-[30px] -z-10 translate-x-10 translate-y-10" />
                        <div className="absolute bottom-0 right-[-50px] w-32 h-32 bg-cyan-500/30 rounded-full blur-3xl" />
                    </motion.div>
                </div>
            </div>
        </section>
    );
};
