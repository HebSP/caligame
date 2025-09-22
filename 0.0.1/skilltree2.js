import React from "react";

// Exemplo de paleta de cores do basestile1
const colors = {
  background: "#181c20",
  block: "#23272b",
  border: "#3a3f44",
  accent: "#ffb347",
  text: "#f5f5f5",
};

const skills = [
  { id: "barra_australiana", label: "Barra Australiana", x: 100, y: 200, reqs: [] },
  { id: "barra", label: "Barra", x: 300, y: 200, reqs: ["barra_australiana"] },
  { id: "skin_the_cat", label: "Skin the Cat", x: 500, y: 100, reqs: ["barra"] },
  { id: "muscle_up", label: "Muscle Up", x: 500, y: 300, reqs: ["barra"] },
];

function getSkillById(id) {
  return skills.find((s) => s.id === id);
}

export default function SkillTree() {
  return (
    <svg width={700} height={400} style={{ background: colors.background }}>
      {/* Linhas de conexão */}
      {skills.map((skill) =>
        skill.reqs.map((reqId) => {
          const req = getSkillById(reqId);
          return (
            <line
              key={skill.id + "-" + reqId}
              x1={req.x + 80}
              y1={req.y + 25}
              x2={skill.x}
              y2={skill.y + 25}
              stroke={colors.accent}
              strokeWidth={3}
              markerEnd="url(#arrow)"
            />
          );
        })
      )}
      {/* Definição de seta */}
      <defs>
        <marker
          id="arrow"
          markerWidth="10"
          markerHeight="10"
          refX="10"
          refY="5"
          orient="auto"
        >
          <polygon points="0,0 10,5 0,10" fill={colors.accent} />
        </marker>
      </defs>
      {/* Blocos de habilidades */}
      {skills.map((skill) => (
        <g key={skill.id}>
          <rect
            x={skill.x}
            y={skill.y}
            width={160}
            height={50}
            rx={12}
            fill={colors.block}
            stroke={colors.border}
            strokeWidth={2}
            style={{ filter: "drop-shadow(0 2px 4px #0008)" }}
          />
          <text
            x={skill.x + 80}
            y={skill.y + 30}
            fill={colors.text}
            fontSize={18}
            fontFamily="sans-serif"
            textAnchor="middle"
          >
            {skill.label}
          </text>
        </g>
      ))}
    </svg>
  );
}