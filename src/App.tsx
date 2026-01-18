import { usePortfolioData } from './hooks/usePortfolioData';
import { Hero } from './components/sections/Hero';
import { Skills } from './components/sections/Skills';
import { ExperienceSection } from './components/sections/Experience';
import { Projects } from './components/sections/Projects';
import { EducationSection } from './components/sections/Education';
import { Contact } from './components/sections/Contact';

import { Button } from './components/ui/Components';

function App() {
  const { data, loading, error } = usePortfolioData();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#0a0a0a] text-white">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin" />
          <p className="text-sm font-medium animate-pulse">Loading portfolio...</p>
        </div>
      </div>
    );
  }

  if (error || !data || !data.aboutMe) {
    const missingData = !data ? 'All Data' : !data.aboutMe ? 'About Me section' : '';

    return (
      <div className="min-h-screen flex items-center justify-center bg-[#0a0a0a] text-white p-6 text-center">
        <div className="max-w-md">
          <h1 className="text-2xl font-bold mb-4">Connection Successful, but...</h1>
          <p className="text-muted-foreground mb-6">
            We connected to Sanity, but the <strong>{missingData}</strong> project data is missing or not published.
          </p>

          <div className="glass p-6 rounded-xl text-left space-y-4 border-blue-500/30">
            <h3 className="font-semibold text-blue-400">Next Steps:</h3>
            <ol className="list-decimal list-inside text-sm text-muted-foreground space-y-2">
              <li>Open your Sanity Studio.</li>
              <li>Create a document of type <strong>"aboutMe"</strong>.</li>
              <li>Ensure it has <strong>fullName</strong> and <strong>role</strong> filled in.</li>
              <li>Click <strong>Publish</strong>.</li>
            </ol>
          </div>

          {error && (
            <div className="mt-6 glass p-4 rounded-lg text-left">
              <p className="text-xs font-mono text-red-400">Technical Error: {error.message}</p>
            </div>
          )}
        </div>
      </div>
    );
  }

  return (
    <main className="min-h-screen text-white selection:bg-cyan-500/30">
      <nav className="fixed top-0 w-full z-50 glass border-x-0 border-t-0 py-4 transition-all duration-300">
        <div className="container mx-auto px-6 flex justify-between items-center">
          <span className="text-2xl font-bold tracking-tighter">
            {data.aboutMe.fullName?.split(' ').map(n => n[0]).join('')}
            <span className="text-cyan-400">.</span>
          </span>
          <div className="hidden md:flex gap-8 text-sm font-medium text-gray-400">
            <a href="#skills" className="hover:text-cyan-400 transition-colors">Skills</a>
            <a href="#projects" className="hover:text-cyan-400 transition-colors">Projects</a>
            <a href="#experience" className="hover:text-cyan-400 transition-colors">Experience</a>
            <a href="#education" className="hover:text-cyan-400 transition-colors">Education</a>
            <a href="#contact" className="hover:text-cyan-400 transition-colors">Contact</a>
          </div>
          <Button variant="outline" size="sm" onClick={() => window.open(data.aboutMe.resumeLink, '_blank')} className="border-cyan-500/50 text-cyan-400 hover:bg-cyan-950">
            Resume
          </Button>
        </div>
      </nav>

      <Hero aboutMe={data.aboutMe} />
      {data.skills?.length > 0 && <Skills skills={data.skills} />}
      {data.projects?.length > 0 && <Projects projects={data.projects} />}
      {data.experience?.length > 0 && <ExperienceSection experience={data.experience} />}
      {data.education?.length > 0 && <EducationSection education={data.education} />}
      <Contact aboutMe={data.aboutMe} />
    </main>
  );
}

export default App;
