# DAD-G2
Desenvolvimento de Aplicações Disitribuidas - Grupo 2

## Projeto - Gestão de conteúdo programático 

A gestão do conteúdo em uma plataforma de ensino é de suma importância, pois através dela conseguimos realizar atividades como: - Criação e gerência de listas - Realização de downloads e uploads - Consulta e acesso ao conteúdo desejado.
 	
Com a falta de um local para gerir tais conteúdos, o processo de acompanhamento do conteúdo pelos alunos e professores acaba se descentralizando em diferentes plataformas e se tornando mais difícil. 
     
Para solucionar este problema, o Grupo 2 desenvolverá para o Sistema Educacional a gestão de conteúdo programático, com a criação por usuário autorizado (professor) e visualização aos usuários finais (alunos). A criação de artefatos compreenderá diferentes maneiras de input, como: texto, imagens, vídeos, ou arquivos carregados pelo usuário. Além disso, a visualização permitirá a categorização do conteúdo para facilitar a navegação do usuário final, entrega uma experiência intuitiva, tendo como o público alvo tanto os alunos quanto os professores.

## Personas

1. Victor Marx tem 28 anos, atualmente é um estudante do curso Sistemas de Informação a distância em uma universidade. Como estudante, e fazendo diversas disciplinas por semestre, Victor precisa ter acesso fácil e objetivo aos diversos conteúdos propostos pelos orientadores das suas disciplinas.
2. Eduardo Augusto de 43 anos, é professor no curso de Sistemas de Informação a distância em uma determinada disciplina. Para lecionar a disciplina, ele necessita publicar diversos conteúdos categorizados por tipo e módulo, e verificar o progresso de seus alunos com relação a esses conteúdos.
3. Marcos de 30 anos trabalha na universidade como analista de sistemas, ele tem como uma de suas principais funções, gerenciar algumas permissões aos usuários em sistemas, e um dos casos é gerenciar conteúdos de alunos e professores.

## Histórias de Usuários

| EU COMO...    | QUERO/PRECISO ...                                                                                         | PARA ...                                                                                        |
|---------------|-----------------------------------------------------------------------------------------------------------|-------------------------------------------------------------------------------------------------|
| Orientador    | Organizar por tópicos os conteúdos a serem delegados aos meus alunos.                                     | Que possam acompanhar o fluxo da matéria, resultando em um maior aproveitamento de aprendizado. |
| Aluno         | Ter a capacidade de gerenciar e organizar meus conteúdos e tópicos já lidos dos que ainda estão pendentes | Facilitar meu controle de materiais didáticos.                                                  |
| Administrador | Ter a possibilidade de cadastrar diferentes tipos de matéria.                                             | Aproveitamento futuro de professores e alunos.                                                  |
| Aluno         | Acompanhar em forma de porcentagem o meu progresso de estudo dentro de um tópico.                         | Uma melhor visibilidade e entendimento de meu progresso.                                        |
| Aluno         | Ser capaz de anexar comentários relacionados a minha experiência em um determinado tópico ou matéria.     | Compartilhar experiências com os demais alunos.                                                 |
| Orientador    | Identificar quais tópicos tiveram menor aproveitamento nos quizz.					    | Rever o conteúdo e o deixar mais claro e didático.					      |


## Requistos
As tabelas que se seguem apresentam os requisitos funcionais e não funcionais que detalham o escopo do projeto.

### Requisitos Funcionais

| DESCRIÇÃO DO REQUISITO                                                                                                            | PRIORIDADE |
|-----------------------------------------------------------------------------------------------------------------------------------|------------|
| Inserção, edição e gerenciamento de arquivos e textos por parte do orientador.                                                    | Alto       |
| Criação e gerenciamento de seções e tópicos por parte do orientador.                                                              | Alto       |
| Os alunos poderem adicionar comentários nos tópicos disponibilizados pelo professor.                                              | Baixo      |
| Os alunos podem marcar diferentes arquivos como concluídos, e assim será contabilizado na porcentagem concluída do tópico.        | Baixo      |
| O administrador poderá cadastrar matérias, sendo ele o responsável por distribuir quem serão os alunos e o professor(es).         | Alto       |
| O sistema deverá consultar as notas de quizzes de acordo com as matérias, e dependendo da nota, emitir um aviso para o professor. | Médio      |

### Requisitos não Funcionais

| DESCRIÇÃO DO REQUISITO                         | PRIORIDADE |
|------------------------------------------------|------------|
| Disponibilidade da API de 90% ou mais.         | Alto       |
| Tempo de resposta menor do que 5 segundos.     | Alto       |
| Nossa aplicação deve rodar em um servidor WEB. | Baixo      |
| O sistema deve ser responsivo.                 | Médio      |




