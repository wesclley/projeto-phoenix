# Portfólio de integrações e automações

Estudos de caso da minha atuação com ChatGuru e n8n da equipe. Meu trabalho conecta sistemas, traduz regras de negócio em fluxos executáveis e trata situações como dados inconsistentes, eventos repetidos e falhas de APIs.

Esta seleção reúne **13 workflows em 10 casos**, organizados por solução de negócio. Quatro workflows pertencem à mesma jornada de agenda de saúde. As descrições foram revisadas em setembro de 2026 a partir dos fluxos e da documentação disponível no editor.

## Casos

| Caso | Solução | Aspectos técnicos |
| --- | --- | --- |
| [01](#01-cobrança-com-base-em-planilha) | Cobrança com base em planilha | Agendamento, JavaScript, rotas por situação financeira e erros |
| [02](#02-jornada-comercial-integrada-ao-pipedrive) | Jornada comercial com Pipedrive | Webhooks, enriquecimento de contatos e roteamento |
| [03](#03-eventos-de-crm-com-deduplicação-e-estado) | RD Station com deduplicação e estado | Supabase/PostgreSQL, unicidade, estado e autenticação |
| [04](#04-captação-de-leads-do-facebook) | Facebook Lead Ads integrado ao atendimento | Validação de webhook, consulta de leads e normalização |
| [05](#05-jornada-de-agenda-no-segmento-de-saúde) | Consulta e gestão de agenda com SHOSP | Regras de calendário, persistência e operações de agenda |
| [06](#06-roteamento-de-atendimento-educacional) | Distribuição de contatos por setor | Webhooks e roteamento condicional |
| [07](#07-orquestração-de-atendimento-com-erp-escolar) | Atendimento integrado a ERP escolar | Separação de responsabilidades e subworkflows |
| [08](#08-aplicação-base44-integrada-à-chatguru) | Aplicação Base44 integrada ao atendimento | Tratamento de entrada e validação de telefone |
| [09](#09-consulta-de-documentos-de-transporte) | Consulta de documentos no Bsoft | Normalização de período, seleção de CT-e e respostas |
| [10](#10-importação-de-contatos-com-fila-e-histórico) | Importação controlada de contatos | Lotes, cadência, fila e histórico por item |

## 01. Cobrança com base em planilha

**Problema:** transformar registros financeiros de uma planilha em comunicações adequadas ao momento de cada cobrança.

**Minha contribuição:** desenvolvimento da automação entre Google Sheets e ChatGuru, com tratamento dos registros em JavaScript e caminhos para comunicação preventiva, vencimento no dia e atraso.

**Solução observada:** disparo agendado, leitura e filtragem da planilha, limitação dos registros processados, loop, roteamento por regras, atualização de campos e execução de diálogos. Há caminhos de erro e atualização da planilha para acompanhamento.

**Valor da entrega:** automatizar a preparação e o encaminhamento das cobranças, mantendo registro do processamento. Economia de tempo e recuperação financeira ainda não estão quantificadas neste portfólio.

## 02. Jornada comercial integrada ao Pipedrive

**Problema:** relacionar acontecimentos do processo comercial a ações de atendimento, preservando os dados do contato e o contexto da etapa.

**Minha contribuição:** integração Pipedrive–ChatGuru por webhook, com regras de roteamento, busca de pessoa vinculada ao negócio e normalização de telefone.

**Solução observada:** diferentes caminhos de atendimento, incluindo abordagem, apresentação e ausência em reunião; consulta de atividades, atualização de campos personalizados e execução de diálogos. O fluxo também apresenta gravação de dados e caminhos de sucesso e erro.

**Valor da entrega:** conectar as etapas comerciais às ações de comunicação. Aumento de conversão não foi medido na revisão.

## 03. Eventos de CRM com deduplicação e estado

**Problema:** webhooks repetidos e alterações de campos ou tags poderiam provocar mensagens duplicadas. Mudanças reais de etapa, inclusive retornos a etapas anteriores, precisavam continuar sendo processadas.

**Minha contribuição:** integração RD Station–ChatGuru com regras em JavaScript, roteamento por funil e serviço, renovação de autenticação e persistência de eventos e estado em Supabase/PostgreSQL.

**Solução documentada:** uma primeira camada tenta registrar uma chave de evento com restrição de unicidade. Uma segunda consulta a última etapa persistida para decidir se houve mudança relevante. O fluxo possui caminhos de criação e atualização de registros, além das ações de comunicação.

**Decisão arquitetural:** separar repetição técnica de evento da regra de negócio de mudança de etapa. São problemas diferentes e exigem critérios diferentes.

**Limites a considerar:** a documentação descreve uma chave composta pelo negócio e pelo horário arredondado ao minuto. Essa granularidade precisa ser avaliada contra eventos legítimos próximos. Deduplicação de entrada, isoladamente, não garante envio exatamente uma vez: falhas entre persistência e comunicação externa e concorrência nas atualizações de estado também exigem validação.

**Valor da entrega:** introduzir controle explícito sobre eventos repetidos e mudanças de etapa. Não são declaradas garantias de disponibilidade ou de ausência total de duplicação.

## 04. Captação de leads do Facebook

**Problema:** levar leads recebidos em formulários de anúncios ao atendimento com dados utilizáveis e identificação do formulário de origem.

**Minha contribuição:** integração Facebook Lead Ads–ChatGuru, incluindo o fluxo de verificação do webhook, consulta de dados do lead e tratamento em JavaScript.

**Solução observada:** recepção de eventos, validação de formulário, busca do lead via API, organização dos dados e cadastro de contato. O projeto também contém etapas de configuração da assinatura de eventos da página.

**Valor da entrega:** automatizar a passagem entre captação e atendimento. Tempo até o primeiro contato e conversão são indicadores a medir, não resultados comprovados aqui.

## 05. Jornada de agenda no segmento de saúde

**Problema:** conectar o atendimento conversacional às consultas de disponibilidade e às ações sobre agendamentos.

**Minha contribuição:** desenvolvimento de quatro workflows complementares entre ChatGuru, SHOSP, persistência de dados e planilhas.

**Componentes observados:**

- Consulta de horários disponíveis, com tratamento de entrada, consultas a registros persistidos e ramificações condicionais.
- Cancelamento e reagendamento, com roteamento por operação e atualização de registros.
- Consulta programada de agenda, regras de dias e especialidades, processamento de itens e acionamento de diálogo.
- Preparação de contatos para confirmação, com leitura, tratamento e movimentação de registros em planilha.

**Decisão arquitetural:** manter operações com responsabilidades distintas em workflows separados. Isso permite explicar e revisar cada etapa da jornada individualmente.

**Valor da entrega:** integrar tarefas de agenda e comunicação. Não foram auditados prontuários nem mensuradas redução de faltas ou horas economizadas.

## 06. Roteamento de atendimento educacional

**Problema:** distribuir solicitações entre os setores responsáveis pelo atendimento.

**Minha contribuição:** fluxo iniciado por webhook, com regras para encaminhamento a comercial, secretaria, coordenação e estágio.

**Solução observada:** roteamento condicional e preparação de dados por destino antes da chamada de integração.

**Valor da entrega:** padronizar o encaminhamento conforme a categoria da solicitação. O caso demonstra tradução de uma regra operacional em fluxo executável.

## 07. Orquestração de atendimento com ERP escolar

**Problema:** coordenar identificação de aluno e consulta financeira a partir de mensagens recebidas no atendimento.

**Minha contribuição:** construção de um workflow roteador com tratamento de entrada, decisões condicionais e chamadas a subworkflows especializados.

**Solução observada:** o fluxo principal delega a identificação do aluno e a consulta financeira a componentes separados, com caminhos de sucesso e erro nas integrações.

**Decisão arquitetural:** separar o roteamento da execução das operações de domínio. A evidência revisada cobre o orquestrador; a implementação interna dos subworkflows não faz parte desta seleção.

**Valor da entrega:** organizar a jornada em componentes com responsabilidades explícitas, facilitando a compreensão e a manutenção do fluxo principal.

## 08. Aplicação Base44 integrada à ChatGuru

**Problema:** encaminhar dados de uma aplicação Base44 ao atendimento, tratando variações no telefone e no destino da comunicação.

**Minha contribuição:** desenvolvimento de uma integração por webhook com tratamento de entrada, adequação de telefone e roteamento por regras.

**Solução documentada:** o código central organiza os dados, trata o nono dígito e valida o telefone em relação ao identificador de canal. O fluxo prepara o cadastro na ChatGuru e a comunicação correspondente.

**Valor da entrega:** conectar uma aplicação de negócio ao atendimento com validações anteriores ao envio à API.

## 09. Consulta de documentos de transporte

**Problema:** disponibilizar informações de documentos de transporte a partir de uma solicitação recebida no bot.

**Minha contribuição:** integração ChatGuru–Bsoft, com normalização de entrada e período, consulta externa, seleção de CT-e e composição de mensagens.

**Solução observada:** webhook de entrada, tratamento dos parâmetros, chamada de API com caminhos de sucesso e erro e condição para encaminhar a resposta.

**Valor da entrega:** transformar uma consulta iniciada no atendimento em uma busca estruturada no sistema externo, com preparação da resposta para o usuário.

## 10. Importação de contatos com fila e histórico

**Problema:** importar contatos de planilhas, acompanhar falhas individuais e controlar a cadência quando a importação também dispara mensagens.

**Minha contribuição:** automação Google Sheets–ChatGuru com seleção explícita dos registros, processamento em lotes e histórico por contato.

**Solução observada:** caminhos distintos para cadastro simples e cadastro acompanhado de comunicação, controle por checkbox, atualização de fila, esperas e registro de erros. A documentação descreve continuidade do processamento dos demais contatos após falhas individuais.

**Decisão arquitetural:** diferenciar o ritmo de importação do ritmo de comunicação e acompanhar o resultado por item. Os intervalos devem ser revisados conforme a configuração efetiva e os limites das APIs.

**Valor da entrega:** oferecer uma operação acompanhável de importação e comunicação. Os limites configurados não são apresentados como throughput medido.

## Evidências e resultados

A leitura dos 13 workflows cobriu o canvas, as conexões, os nomes de etapas e a documentação disponível. Não houve execução de fluxos de produção, testes de carga ou auditoria completa de código e configurações. Descrições de intenção foram identificadas como documentadas; resultados quantitativos só devem ser adicionados com medições verificáveis.

Para aprofundar os casos, os indicadores mais úteis são tempo de atendimento antes e depois, volume processado por período, taxa de sucesso, duplicações detectadas, falhas recuperadas e esforço manual por operação.

## Contexto profissional e confidencialidade

As soluções foram desenvolvidas no contexto de trabalho com ChatGuru e executadas no n8n da equipe. Este portfólio apresenta descrições técnicas anonimizadas; não distribui código proprietário, exports dos workflows, dados de clientes, credenciais ou endereços do ambiente operacional.

Minha experiência prática em integrações é a base da evolução para engenharia backend. Uso de JavaScript nos nós do n8n não é apresentado como equivalente a domínio avançado de desenvolvimento de serviços independentes em Node.js.
