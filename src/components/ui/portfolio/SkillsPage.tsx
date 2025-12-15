'use client';

const skills = [
  { category: 'Frontend', items: ['React', 'Next.js', 'TypeScript', 'TailwindCSS', 'Three.js'] },
  { category: 'Backend', items: ['Node.js', 'Python', 'PostgreSQL', 'MongoDB'] },
  { category: 'Tools', items: ['Git', 'Docker', 'AWS', 'Figma'] },
  { category: '3D Graphics', items: ['React Three Fiber', 'Blender', 'GLTF'] },
];

export default function SkillsPage() {
  return (
    <div className="p-6 text-white">
      <h1 className="text-3xl font-bold mb-6">Skills</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {skills.map((skill) => (
          <div key={skill.category} className="bg-gray-800 p-4 rounded-lg">
            <h2 className="text-xl font-semibold mb-3 text-blue-400">{skill.category}</h2>
            <div className="flex flex-wrap gap-2">
              {skill.items.map((item) => (
                <span
                  key={item}
                  className="px-3 py-1 bg-gray-700 rounded-full text-sm"
                >
                  {item}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

