// EcoMonitor - Script de SETUP
// Cria o banco de dados e as 5 collections do projeto
// Executar primeiro antes dos demais scripts

// ============================================================
// PASSO 1: Selecionar/Criar o Banco de Dados
// ============================================================
// Esta operação cria o banco de dados "ecomonitor_db"
// Se já existir, simplesmente o seleciona

use ecomonitor_db;

// ============================================================
// PASSO 2: Criar as 5 Collections do Projeto
// ============================================================
// Cada collection representa um aspecto importante do projeto

// Collection 1: SENSORS
// Armazena o cadastro de todos os dispositivos IoT
// Pilar ESG: Ambiental
db.createCollection("sensors");

// Collection 2: ENERGY_READINGS
// Registra leituras de consumo energético em tempo real
// Pilar ESG: Ambiental
db.createCollection("energy_readings");

// Collection 3: ALERTS
// Gerencia alertas de consumo excessivo e anomalias
// Pilares ESG: Ambiental + Governança
db.createCollection("alerts");

// Collection 4: SUSTAINABILITY_ACTIONS
// Registra ações de sustentabilidade executadas
// Pilares ESG: Ambiental + Social
db.createCollection("sustainability_actions");

// Collection 5: COMPLIANCE_REPORTS
// Consolida relatórios de conformidade e auditorias
// Pilar ESG: Governança
db.createCollection("compliance_reports");

// ============================================================
// PASSO 3: Validar as Collections Criadas
// ============================================================
// Execute um dos comandos abaixo para ver a lista de collections

show collections;

// Alternativa (mais detalhada):
db.getCollectionNames();

// ============================================================
// FIM DO SCRIPT DE SETUP
// ============================================================
//
// ✅ Próximos passos:
// 1. Execute: ecomonitor_create.js (para inserir dados)
// 2. Execute: ecomonitor_read.js (para consultar dados)
// 3. Execute: ecomonitor_update.js (para atualizar dados)
// 4. Execute: ecomonitor_delete.js (para excluir dados)
//
// =============================================================================
