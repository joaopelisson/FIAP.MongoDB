// EcoMonitor - Script de DELETE
// Executa 6 operações de exclusão com deleteOne e deleteMany
// AVISO: Este script deleta dados. Use apenas em ambiente de teste.
// Pré-requisito: Todos os scripts anteriores

// Selecione o banco de dados
use ecomonitor_db;

// =============================================================================
// SEÇÃO 1: DELETAR UM ÚNICO DOCUMENTO (deleteOne)
// =============================================================================
// 
// Demonstra como deletar um documento específico
// Caso de uso: Remover um sensor específico
// =============================================================================

console.log("\n📌 ========== SEÇÃO 1: DELETAR UM ÚNICO DOCUMENTO ==========");

// Exclusão 1: Buscar documento antes de deletar
console.log("\n1️⃣ Exclusão 1: Deletar sensor ENERGY_001");
console.log("Primeira ação: Verificar se o sensor existe");
console.log("Comando: db.sensors.find({ sensor_id: 'ENERGY_001' })");

var sensor_check = db.sensors.findOne({ sensor_id: "ENERGY_001" });

if (sensor_check) {
    console.log("✅ Sensor encontrado! Procedendo com exclusão...");
    console.log("\nDados encontrados:");
    printjson(sensor_check);

    // Agora deletar o sensor
    console.log("\nComando de Exclusão: db.sensors.deleteOne({ sensor_id: 'ENERGY_001' })");
    var result = db.sensors.deleteOne({ sensor_id: "ENERGY_001" });

    console.log("✅ Sensor ENERGY_001 deletado!");
    console.log(`Documentos deletados: ${result.deletedCount}`);
} else {
    console.log("❌ Sensor não encontrado!");
}

// =============================================================================
// SEÇÃO 2: VERIFICAR ANTES DE DELETAR EM LOTE
// =============================================================================
// 
// Demonstra boas práticas: sempre verificar antes de deletar em lote
// =============================================================================

console.log("\n📌 ========== SEÇÃO 2: DELETAR MÚLTIPLOS DOCUMENTOS (deleteMany) ==========");

// Exclusão 2: Contar sensores em manutenção antes de deletar
console.log("\n2️⃣ Exclusão 2: Deletar todos os sensores em MANUTENÇÃO");
console.log("Primeira ação: Contar sensores em manutenção");
console.log("Comando: db.sensors.countDocuments({ status: 'maintenance' })");

var count_maintenance = db.sensors.countDocuments({ status: "maintenance" });
console.log(`Sensores em manutenção encontrados: ${count_maintenance}`);

if (count_maintenance > 0) {
    console.log("\nSegunda ação: Listar sensores em manutenção");
    console.log("Comando: db.sensors.find({ status: 'maintenance' })");
    db.sensors.find({ status: "maintenance" });

    // Agora deletar
    console.log("\nTerceira ação: Deletar sensores em manutenção");
    console.log("Comando: db.sensors.deleteMany({ status: 'maintenance' })");
    var result = db.sensors.deleteMany({ status: "maintenance" });

    console.log("✅ Sensores em manutenção deletados!");
    console.log(`Documentos deletados: ${result.deletedCount}`);
} else {
    console.log("ℹ️ Nenhum sensor em manutenção encontrado para deletar");
}

// =============================================================================
// SEÇÃO 3: DELETAR ALERTAS ANTIGOS/RESOLVIDOS
// =============================================================================
// 
// Demonstra deleção de dados históricos
// Caso de uso: Limpeza de alertas resolvidos
// =============================================================================

console.log("\n📌 ========== SEÇÃO 3: DELETAR ALERTAS ANTIGOS ==========");

// Exclusão 3: Deletar alertas RESOLVIDOS para limpeza
console.log("\n3️⃣ Exclusão 3: Deletar alertas com status RESOLVED");
console.log("Primeira ação: Contar alertas resolvidos");
console.log("Comando: db.alerts.countDocuments({ status: 'resolved' })");

var count_resolved = db.alerts.countDocuments({ status: "resolved" });
console.log(`Alertas resolvidos encontrados: ${count_resolved}`);

if (count_resolved > 0) {
    console.log("\nSegunda ação: Listar alertas resolvidos");
    console.log("Comando: db.alerts.find({ status: 'resolved' })");
    db.alerts.find({ status: "resolved" });

    // Agora deletar
    console.log("\nTerceira ação: Deletar alertas resolvidos");
    console.log("Comando: db.alerts.deleteMany({ status: 'resolved' })");
    var result = db.alerts.deleteMany({ status: "resolved" });

    console.log("✅ Alertas resolvidos deletados!");
    console.log(`Documentos deletados: ${result.deletedCount}`);
} else {
    console.log("ℹ️ Nenhum alerta resolvido encontrado");
}

// =============================================================================
// SEÇÃO 4: DELETAR COM MÚLTIPLAS CONDIÇÕES
// =============================================================================
// 
// Demonstra deleção com filtros complexos
// =============================================================================

console.log("\n📌 ========== SEÇÃO 4: DELETAR COM MÚLTIPLAS CONDIÇÕES ==========");

// Exclusão 4: Deletar leituras de energia com custo zero (impossíveis)
console.log("\n4️⃣ Exclusão 4: Deletar leituras de energia com custo R$ 0 (dados inválidos)");
console.log("Primeira ação: Contar leituras com custo zero");
console.log("Comando: db.energy_readings.countDocuments({ cost_brl: 0.0 })");

var count_zero_cost = db.energy_readings.countDocuments({ cost_brl: 0.0 });
console.log(`Leituras com custo zero encontradas: ${count_zero_cost}`);

if (count_zero_cost > 0) {
    console.log("\nSegunda ação: Listar essas leituras");
    console.log("Comando: db.energy_readings.find({ cost_brl: 0.0 })");
    db.energy_readings.find({ cost_brl: 0.0 });

    // Agora deletar
    console.log("\nTerceira ação: Deletar leituras com custo zero");
    console.log("Comando: db.energy_readings.deleteMany({ cost_brl: 0.0 })");
    var result = db.energy_readings.deleteMany({ cost_brl: 0.0 });

    console.log("✅ Leituras inválidas deletadas!");
    console.log(`Documentos deletados: ${result.deletedCount}`);
} else {
    console.log("ℹ️ Nenhuma leitura com custo zero encontrada");
}

// =============================================================================
// SEÇÃO 5: DELETAR COM OPERADORES COMPLEXOS
// =============================================================================
// 
// Demonstra deleção com operadores como $lt, $gt, etc
// Caso de uso: Remover dados antigos
// =============================================================================

console.log("\n📌 ========== SEÇÃO 5: DELETAR DADOS ANTIGOS ==========");

// Exclusão 5: Deletar compliance_reports gerados antes de 2026
console.log("\n5️⃣ Exclusão 5: Deletar relatórios antigos (antes de 2026-01-01)");
console.log("Primeira ação: Contar relatórios antigos");
console.log("Comando: db.compliance_reports.countDocuments({ generated_at: { $lt: ISODate('2026-01-01') } })");

var count_old = db.compliance_reports.countDocuments({ generated_at: { $lt: ISODate("2026-01-01") } });
console.log(`Relatórios antigos encontrados: ${count_old}`);

if (count_old > 0) {
    console.log("\nSegunda ação: Listar relatórios antigos");
    db.compliance_reports.find({ generated_at: { $lt: ISODate("2026-01-01") } });

    // Agora deletar
    console.log("\nTerceira ação: Deletar relatórios antigos");
    var result = db.compliance_reports.deleteMany({ generated_at: { $lt: ISODate("2026-01-01") } });

    console.log("✅ Relatórios antigos deletados!");
    console.log(`Documentos deletados: ${result.deletedCount}`);
} else {
    console.log("ℹ️ Nenhum relatório anterior a 2026 encontrado");
}

// =============================================================================
// SEÇÃO 6: DELETAR DOCUMENTOS ARQUIVADOS
// =============================================================================
// 
// Demonstra deleção de dados marcados para arquivo
// =============================================================================

console.log("\n📌 ========== SEÇÃO 6: DELETAR SENSORES ARQUIVADOS ==========");

// Exclusão 6: Deletar sensores com status "archived"
console.log("\n6️⃣ Exclusão 6: Deletar sensores com status ARCHIVED");
console.log("Primeira ação: Contar sensores arquivados");
console.log("Comando: db.sensors.countDocuments({ status: 'archived' })");

var count_archived = db.sensors.countDocuments({ status: "archived" });
console.log(`Sensores arquivados encontrados: ${count_archived}`);

if (count_archived > 0) {
    console.log("\nSegunda ação: Listar sensores arquivados");
    console.log("Comando: db.sensors.find({ status: 'archived' })");
    db.sensors.find({ status: "archived" });

    // Agora deletar
    console.log("\nTerceira ação: Deletar sensores arquivados");
    console.log("Comando: db.sensors.deleteMany({ status: 'archived' })");
    var result = db.sensors.deleteMany({ status: "archived" });

    console.log("✅ Sensores arquivados deletados!");
    console.log(`Documentos deletados: ${result.deletedCount}`);
} else {
    console.log("ℹ️ Nenhum sensor arquivado encontrado");
}

// =============================================================================
// SEÇÃO 7: RELATÓRIO FINAL - CONTAGEM DE DOCUMENTOS
// =============================================================================
// 
// Demonstra estado final do banco após todas as deleções
// =============================================================================

console.log("\n📌 ========== SEÇÃO 7: RELATÓRIO FINAL DO BANCO ==========");

console.log("\n7️⃣ Contagem de documentos por collection após exclusões:");

var final_sensors = db.sensors.countDocuments();
var final_energy = db.energy_readings.countDocuments();
var final_alerts = db.alerts.countDocuments();
var final_actions = db.sustainability_actions.countDocuments();
var final_reports = db.compliance_reports.countDocuments();

console.log(`📊 Sensores: ${final_sensors}`);
console.log(`📊 Leituras de Energia: ${final_energy}`);
console.log(`📊 Alertas: ${final_alerts}`);
console.log(`📊 Ações de Sustentabilidade: ${final_actions}`);
console.log(`📊 Relatórios de Compliance: ${final_reports}`);

var total_final = final_sensors + final_energy + final_alerts + final_actions + final_reports;
console.log(`\n📊 TOTAL DE DOCUMENTOS NO BANCO: ${total_final}`);

// =============================================================================
// SEÇÃO 8: EXEMPLOS DE DELEÇÃO SEGURA
// =============================================================================
// 
// Demonstra boas práticas para evitar deleção acidental
// =============================================================================

console.log("\n📌 ========== SEÇÃO 8: BOAS PRÁTICAS ==========");

console.log("\n8️⃣ Boas Práticas para Deleção Segura:");
console.log("\n1️⃣ SEMPRE verificar antes de deletar em lote:");
console.log("   db.collection.countDocuments({ filter }) // ver quantos documentos");
console.log("   db.collection.find({ filter }) // verificar quais são");
console.log("   db.collection.deleteMany({ filter }) // depois deletar");

console.log("\n2️⃣ Use filtros específicos:");
console.log("   // BOM: filtro preciso");
console.log("   db.sensors.deleteOne({ sensor_id: 'ENERGY_001' })");
console.log("   // RUIM: filtro genérico");
console.log("   db.sensors.deleteMany({ type: 'energy_meter' })");

console.log("\n3️⃣ Considere usar soft delete (marcar como deleted):");
console.log("   db.collection.updateOne({ id: 'xxx' }, { $set: { deleted: true } })");
console.log("   // Depois deletar fisicamente em lote periodicamente");

console.log("\n4️⃣ Sempre fazer backup antes de operações em lote:");
console.log("   // mongodump --db ecomonitor_db");

console.log("\n5️⃣ Usar transações em operações críticas:");
console.log("   session = db.getMongo().startSession()");
console.log("   session.startTransaction()");
console.log("   // operações...");
console.log("   session.commitTransaction()");

// =============================================================================
// RESUMO DAS EXCLUSÕES REALIZADAS
// =============================================================================

console.log("\n📊 RESUMO FINAL DO SCRIPT DELETE:");
console.log("✅ Exclusão de documento individual (deleteOne): 1");
console.log("✅ Exclusão de múltiplos documentos (deleteMany): 5");
console.log("✅ Exclusões com verificação prévia: 6");
console.log("✅ Exclusões com operadores complexos: 1");
console.log("✅ Relatório final de estado: 1");
console.log("✅ Demonstração de boas práticas: 1");
console.log("✅ TOTAL DE OPERAÇÕES DELETE: 6");

console.log("\n✅ Script DELETE finalizado com sucesso!");
console.log("\n📌 Próxima etapa: Revisar todos os scripts executados");

console.log("\n" + "=".repeat(80));
console.log("🎓 TODOS OS SCRIPTS CRUD FORAM EXECUTADOS COM SUCESSO!");
console.log("=".repeat(80));
console.log("\nOrdem de Execução Recomendada:");
console.log("1️⃣ ecomonitor_setup.js   - Criar banco e collections");
console.log("2️⃣ ecomonitor_create.js  - Inserir 60 documentos");
console.log("3️⃣ ecomonitor_read.js    - Executar 24 consultas");
console.log("4️⃣ ecomonitor_update.js  - Realizar 10 atualizações");
console.log("5️⃣ ecomonitor_delete.js  - Deletar 6 operações");
console.log("\n✅ Documentação completa pronta para entregar em Word/PDF!");

// =============================================================================
// FIM DO SCRIPT DELETE
// =============================================================================
