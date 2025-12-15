'use client';

const projects = [
  {
    title: 'Project 1',
    description: 'A description of your first project. Showcase your best work here.',
    tech: ['React', 'TypeScript', 'Next.js'],
  },
  {
    title: 'Project 2',
    description: 'Another amazing project that demonstrates your skills and creativity.',
    tech: ['Three.js', 'R3F', 'Node.js'],
  },
  {
    title: 'Project 3',
    description: 'A third project that highlights your versatility as a developer.',
    tech: ['Python', 'PostgreSQL', 'Docker'],
  },
];

export default function ProjectsPage() {
  return (
    <div className="p-6 text-white">
      <h1 className="text-3xl font-bold mb-6">Projects</h1>
      <div className="space-y-4">
        {projects.map((project, index) => (
          <div
            key={index}
            className="bg-gray-800 p-5 rounded-lg border border-gray-700 hover:border-blue-500 transition-colors"
          >
            <h2 className="text-xl font-semibold mb-2 text-blue-400">{project.title}</h2>
            <p className="text-gray-300 mb-3">{project.description}</p>
            <div className="flex flex-wrap gap-2">
              {project.tech.map((tech) => (
                <span
                  key={tech}
                  className="px-2 py-1 bg-gray-700 rounded text-xs"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

