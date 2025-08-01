
import React, { useState } from 'react';
import { gerarProgramaAvancado } from '../utils/geradorAvancado';
import ModalExercicio from './ModalExercicio.jsx';
import Card from './ui/Card.jsx';
import QuestionarioTreino from './QuestionarioTreino.jsx';
import ModalSubstituirExercicio from './ModalSubstituirExercicio.jsx';

const Treino = ({ userProfile }) => {
  const [programa, setPrograma] = useState(() => {
    const saved = localStorage.getItem('fitcoreProgramaTreino');
    return saved ? JSON.parse(saved) : null;
  });
  const [diaAtivo, setDiaAtivo] = useState(0);
  const [exercicioDetalhe, setExercicioDetalhe] = useState(null);
  const [exercicioSubstituir, setExercicioSubstituir] = useState(null);

  const handleTrocarPrograma = () => {
    setPrograma(null);
    localStorage.removeItem('fitcoreProgramaTreino');
  };

  const handleSubstituirExercicio = (exAtual, novoEx) => {
    const novoPrograma = { ...programa };
    novoPrograma.divisao[diaAtivo].exercicios = novoPrograma.divisao[diaAtivo].exercicios.map(ex =>
      ex.id === exAtual.id ? { ...novoEx, ...exAtual } : ex
    );
    setPrograma(novoPrograma);
    setExercicioSubstituir(null);
    localStorage.setItem('fitcoreProgramaTreino', JSON.stringify(novoPrograma));
  };

  if (!programa) {
    return (
      <QuestionarioTreino
        onProgramaGerado={(perfil) => {
          const novo = gerarProgramaAvancado(perfil, perfil.split);
          setPrograma(novo);
          localStorage.setItem('fitcoreProgramaTreino', JSON.stringify(novo));
          setDiaAtivo(0);
        }}
      />
    );
  }

  if (!programa.divisao || !programa.divisao[diaAtivo]) {
    return <p className="text-center mt-10 text-gray-600">Nenhum treino gerado ainda. Preencha o questionário.</p>;
  }

  const treinoDoDia = programa.divisao[diaAtivo];

  return (
    <>
      <Card>
        <div className="flex flex-col sm:flex-row justify-between sm:items-center mb-6 gap-4">
          <div>
            <h2 className="text-3xl font-bold text-gray-800">{programa.nomePrograma}</h2>
            <p className="text-gray-500">Sua ficha de treino salva. Clique em um exercício para ver os detalhes ou substituí-lo.</p>
          </div>
          <button onClick={handleTrocarPrograma} className="px-4 py-2 bg-red-100 text-red-800 text-sm font-semibold rounded-lg hover:bg-red-200 transition-colors">
            Criar Nova Ficha
          </button>
        </div>

        <div className="border-b border-gray-200 mb-4">
          <nav className="-mb-px flex space-x-6 overflow-x-auto">
            {programa.divisao.map((dia, index) => (
              <button key={index} onClick={() => setDiaAtivo(index)} className={`whitespace-nowrap py-3 px-2 border-b-2 font-medium text-sm ${diaAtivo === index ? 'border-blue-500 text-blue-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}`}>
                {dia.nome.split(' - ')[0]}
              </button>
            ))}
          </nav>
        </div>

        <div>
          <h3 className="text-xl font-semibold text-gray-700 mb-4">{treinoDoDia.nome}</h3>
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white">
              <thead className="bg-gray-100">
                <tr>
                  <th className="py-3 px-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Exercício</th>
                  <th className="py-3 px-4 text-center text-xs">Séries</th>
                  <th className="py-3 px-4 text-center text-xs">Reps</th>
                  <th className="py-3 px-4 text-center text-xs">Desc.</th>
                  <th className="py-3 px-4 text-center text-xs">Cad.</th>
                  <th className="py-3 px-4 text-center text-xs">Carga</th>
                  <th className="py-3 px-4 text-center text-xs">Ações</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {treinoDoDia.exercicios.map((ex) => (
                  <tr key={ex.id} className="hover:bg-gray-50">
                    <td className="py-4 px-4">
                      <div className="font-medium text-gray-800 cursor-pointer" onClick={() => setExercicioDetalhe(ex)}>{ex.nome}</div>
                      <div className="text-xs text-gray-500 capitalize">{ex.musculo_principal}</div>
                    </td>
                    <td className="text-center">{ex.series}</td>
                    <td className="text-center">{ex.repeticoes}</td>
                    <td className="text-center">{ex.descanso}</td>
                    <td className="text-center">{ex.cadencia}</td>
                    <td className="text-center">{ex.carga}</td>
                    <td className="text-center">
                      <button onClick={() => setExercicioSubstituir(ex)} className="text-blue-600 hover:underline text-sm">⟳ Substituir</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </Card>

      {exercicioDetalhe && (
        <ModalExercicio exercicio={exercicioDetalhe} onClose={() => setExercicioDetalhe(null)} />
      )}

      {exercicioSubstituir && (
        <ModalSubstituirExercicio
          exercicioAtual={exercicioSubstituir}
          userProfile={userProfile}
          onClose={() => setExercicioSubstituir(null)}
          onSelecionar={(novoEx) => handleSubstituirExercicio(exercicioSubstituir, novoEx)}
        />
      )}
    </>
  );
};

export default Treino;
