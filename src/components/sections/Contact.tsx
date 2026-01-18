import { motion } from 'framer-motion';
import { Github, Linkedin, Twitter, Mail, FileText, ExternalLink } from 'lucide-react';
import type { AboutMe } from '../../types';
import { Button } from '../ui/Components';

export const Contact = ({ aboutMe }: { aboutMe: AboutMe }) => {
    return (
        <section id="contact" className="py-24 container mx-auto px-6 relative overflow-hidden">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-r from-blue-900/20 to-purple-900/20 rounded-full blur-[100px] -z-10" />

            <div className="max-w-4xl mx-auto glass-card rounded-3xl p-8 md:p-12 text-center border-white/5">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                >
                    <h2 className="text-4xl md:text-5xl font-bold mb-6 text-white">Let's Work Together</h2>
                    <p className="text-xl text-gray-400 mb-10 max-w-2xl mx-auto">
                        I'm currently available for freelance projects and full-time opportunities.
                        If you have a project that needs some creative touch, I'd love to hear about it.
                    </p>

                    <div className="flex flex-col md:flex-row justify-center items-center gap-6 mb-12">
                        <Button size="lg" className="w-full md:w-auto bg-white text-black hover:bg-gray-200" onClick={() => (window.location.href = `mailto:${aboutMe.email}`)}>
                            <Mail className="mr-2" size={20} />
                            Say Hello
                        </Button>
                        <Button variant="outline" size="lg" className="w-full md:w-auto border-white/20 text-white hover:bg-white/10" onClick={() => window.open(aboutMe.resumeLink, '_blank')}>
                            <FileText className="mr-2" size={20} />
                            View Resume
                        </Button>
                    </div>

                    <div className="flex justify-center gap-6">
                        {aboutMe.socialLinks.map((link) => (
                            <motion.a
                                key={link.platform}
                                href={link.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                whileHover={{ scale: 1.1, rotate: 5 }}
                                className="p-4 rounded-full bg-white/5 hover:bg-white/10 text-gray-400 hover:text-white transition-all border border-white/5"
                            >
                                {link.platform === 'GitHub' && <Github size={24} />}
                                {link.platform === 'LinkedIn' && <Linkedin size={24} />}
                                {link.platform === 'Twitter' && <Twitter size={24} />}
                                {/* Fallback for others */}
                                {['GitHub', 'LinkedIn', 'Twitter'].indexOf(link.platform) === -1 && <ExternalLink size={24} />}
                            </motion.a>
                        ))}
                    </div>
                </motion.div>
            </div>

            <footer className="mt-20 text-center text-gray-500 text-sm">
                <p>© {new Date().getFullYear()} {aboutMe.fullName}. All rights reserved.</p>
                <p className="mt-2 text-xs">Designed & Built with ❤️</p>
            </footer>
        </section>
    );
};
