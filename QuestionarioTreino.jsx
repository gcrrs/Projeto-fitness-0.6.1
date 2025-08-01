
import React, { useState } from 'react';

const QuestionarioTreino = ({ onProgramaGerado }) => {
  const [objetivo, setObjetivo] = useState('ganhar_massa');
  const [experiencia, setExperiencia] = useState('iniciante');
  const [equipamentos, setEquipamentos] = useState([]);
  const [split, setSplit] = useState('abc');

  const todosEquipamentos = [
    'barra', 'halteres', 'maquina', 'body_only', 'barra_fixa'
  ];

  const handleCheckboxChange = (equip) => {
    setEquipamentos(prev =>
      prev.includes(equip) ? prev.filter(e => e !== equip) : [...prev, equip]
    );
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const perfil = {
      objetivo,
      experiencia,
      equipamentos,
      split
    };
    onProgramaGerado(perfil);
  };

  return (
    <div className="max-w-2xl mx-auto bg-white shadow-md rounded-lg p-6 mt-10">
      <h2 className="text-2xl font-bold mb-4 text-gray-800">Montar Treino Personalizado</h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block font-medium text-gray-700">Objetivo:</label>
          <select value={objetivo} onChange={e => setObjetivo(e.target.value)} className="mt-1 w-full border rounded-md px-3 py-2">
            <option value="ganhar_massa">Ganhar Massa</option>
            <option value="definir">Definir</option>
            <option value="emagrecer">Emagrecer</option>
            <option value="manter">Manter</option>
          </select>
        </div>

        <div>
          <label className="block font-medium text-gray-700">Nível de Experiência:</label>
          <select value={experiencia} onChange={e => setExperiencia(e.target.value)} className="mt-1 w-full border rounded-md px-3 py-2">
            <option value="iniciante">Iniciante</option>
            <option value="intermediario">Intermediário</option>
            <option value="avancado">Avançado</option>
          </select>
        </div>

        <div>
          <label className="block font-medium text-gray-700">Equipamentos Disponíveis:</label>
          <div className="flex flex-wrap gap-3 mt-2">
            {todosEquipamentos.map(equip => (
              <label key={equip} className="inline-flex items-center">
                <input
                  type="checkbox"
                  checked={equipamentos.includes(equip)}
                  onChange={() => handleCheckboxChange(equip)}
                  className="mr-2"
                />
                {equip.replace(/_/g, ' ')}
              </label>
            ))}
          </div>
        </div>

        <div>
          <label className="block font-medium text-gray-700">Divisão de Treino (Split):</label>
          <select value={split} onChange={e => setSplit(e.target.value)} className="mt-1 w-full border rounded-md px-3 py-2">
            <option value="full_body">Full Body</option>
            <option value="ab">Upper/Lower (AB)</option>
            <option value="abc">Push/Pull/Legs (ABC)</option>
            <option value="abcd">ABCD</option>
            <option value="abcde">ABCDE</option>
          </select>
        </div>

        <button type="submit" className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition">
          Gerar Treino
        </button>
      </form>
    </div>
  );
};

export default QuestionarioTreino;
