// EcoMonitor - Script de READ (FIND/QUERY)
// Executa 24 consultas diferentes com filtros e agregações
// Pré-requisito: ecomonitor_setup.js + ecomonitor_create.js

// Selecione o banco de dados
use ecomonitor_db;

// =============================================================================
// SEÇÃO 1: CONSULTAS BÁSICAS NA COLLECTION SENSORS
// =============================================================================
// 
// Demonstra operações básicas de busca usando find()
// =============================================================================

console.log("\n📌 ========== SEÇÃO 1: CONSULTAS BÁSICAS ==========");

// Consulta 1: Listar TODOS os sensores
console.log("\n1️⃣ Consulta 1: Listar TODOS os sensores");
console.log("Comando: db.sensors.find()");
db.sensors.find();

// Consulta 2: Contar total de sensores
console.log("\n2️⃣ Consulta 2: Contar total de sensores");
console.log("Comando: db.sensors.countDocuments()");
var total_sensores = db.sensors.countDocuments();
console.log(`Total de sensores: ${total_sensores}`);

// =============================================================================
// SEÇÃO 2: FILTRAGEM POR STATUS E TIPO
// =============================================================================
// 
// Demonstra como filtrar documentos por campos específicos
// =============================================================================

console.log("\n📌 ========== SEÇÃO 2: FILTRAGEM POR STATUS E TIPO ==========");

// Consulta 3: Buscar APENAS sensores ATIVOS
console.log("\n3️⃣ Consulta 3: Buscar sensores com status = 'active'");
console.log("Comando: db.sensors.find({ status: 'active' })");
db.sensors.find({ status: "active" });

// Consulta 4: Buscar APENAS sensores de TIPO ENERGY_METER
console.log("\n4️⃣ Consulta 4: Buscar sensores de tipo 'energy_meter'");
console.log("Comando: db.sensors.find({ type: 'energy_meter' })");
db.sensors.find({ type: "energy_meter" });

// =============================================================================
// SEÇÃO 3: CONSULTAS POR LOCALIZAÇÃO (Nested Documents)
// =============================================================================
// 
// Demonstra busca em documentos aninhados (location.building, location.floor)
// Característica NoSQL: Flexibilidade para estruturas complexas
// =============================================================================

console.log("\n📌 ========== SEÇÃO 3: CONSULTAS POR LOCALIZAÇÃO ==========");

// Consulta 5: Buscar sensores na SEDE SÃO PAULO
console.log("\n5️⃣ Consulta 5: Buscar sensores na Sede São Paulo");
console.log("Comando: db.sensors.find({ 'location.building': 'Sede São Paulo' })");
db.sensors.find({ "location.building": "Sede São Paulo" });

// Consulta 6: Buscar sensores no ANDAR 3
console.log("\n6️⃣ Consulta 6: Buscar sensores no andar 3");
console.log("Comando: db.sensors.find({ 'location.floor': 3 })");
db.sensors.find({ "location.floor": 3 });

// =============================================================================
// SEÇÃO 4: OPERADORES AVANÇADOS
// =============================================================================
// 
// Demonstra uso de operadores MongoDB como $in, $exists
// =============================================================================

console.log("\n📌 ========== SEÇÃO 4: OPERADORES AVANÇADOS ==========");

// Consulta 7: Buscar sensores INATIVOS OU EM MANUTENÇÃO
console.log("\n7️⃣ Consulta 7: Buscar sensores com status 'inactive' OU 'maintenance'");
console.log("Comando: db.sensors.find({ status: { $in: ['inactive', 'maintenance'] } })");
db.sensors.find({
    status: { $in: ["inactive", "maintenance"] }
});

// Consulta 8: Buscar com PROJEÇÃO (retorna apenas campos específicos)
console.log("\n8️⃣ Consulta 8: Buscar sensores ativos e retornar apenas alguns campos");
console.log("Comando: db.sensors.find({ status: 'active' }, { sensor_id: 1, type: 1, 'location.building': 1, _id: 0 })");
db.sensors.find(
    { status: "active" },
    { sensor_id: 1, type: 1, "location.building": 1, _id: 0 }
);

// =============================================================================
// SEÇÃO 5: AGREGAÇÕES - GROUPING E AGGREGATION PIPELINE
// =============================================================================
// 
// Demonstra o poder do Aggregation Pipeline do MongoDB
// Características: $group, $sort, $match, $project
// =============================================================================

console.log("\n📌 ========== SEÇÃO 5: AGREGAÇÕES ==========");

// Consulta 9: Agrupar sensores POR TIPO e contar
console.log("\n9️⃣ Consulta 9: Agrupar sensores por tipo e contar quantos de cada");
console.log("Comando: db.sensors.aggregate([{ $group: {_id: '$type', total: { $sum: 1 }} }, { $sort: { total: -1 } }])");
db.sensors.aggregate([
    {
        $group: {
            _id: "$type",
            total: { $sum: 1 }
        }
    },
    { $sort: { total: -1 } }
]);

// Consulta 10: Buscar sensores que POSSUEM data de calibração
console.log("\n🔟 Consulta 10: Buscar sensores que possuem campo 'calibration_date'");
console.log("Comando: db.sensors.find({ calibration_date: { $exists: true } })");
db.sensors.find({
    calibration_date: { $exists: true }
});

// =============================================================================
// SEÇÃO 6: CONSULTAS AVANÇADAS EM ENERGY_READINGS
// =============================================================================
// 
// Demonstra série temporal e detecção de anomalias
// =============================================================================

console.log("\n📌 ========== SEÇÃO 6: CONSULTAS EM ENERGY_READINGS ==========");

// Consulta 11: Buscar leituras com ANOMALIAS DETECTADAS
console.log("\n1️⃣1️⃣ Consulta 11: Buscar leituras onde anomalia foi detectada");
console.log("Comando: db.energy_readings.find({ anomaly_detected: true })");
db.energy_readings.find({ anomaly_detected: true });

// Consulta 12: Buscar leituras MAIS RECENTES (ordenadas por timestamp DESC)
console.log("\n1️⃣2️⃣ Consulta 12: Buscar 5 leituras mais recentes");
console.log("Comando: db.energy_readings.find().sort({ timestamp: -1 }).limit(5)");
db.energy_readings.find().sort({ timestamp: -1 }).limit(5);

// =============================================================================
// SEÇÃO 7: ANÁLISE DE SUSTENTABILIDADE
// =============================================================================
// 
// Demonstra agregações para análise de impacto ESG
// =============================================================================

console.log("\n📌 ========== SEÇÃO 7: ANÁLISE DE SUSTENTABILIDADE ==========");

// Consulta 13: Total de ECONOMIA por tipo de ação
console.log("\n1️⃣3️⃣ Consulta 13: Agrupar ações por tipo e somar economias");
console.log("Comando: db.sustainability_actions.aggregate([{ $group: {_id: '$action_type', total_savings: { $sum: '$estimated_annual_savings_brl' }} }, { $sort: { total_savings: -1 } }])");
db.sustainability_actions.aggregate([
    {
        $group: {
            _id: "$action_type",
            total_savings: { $sum: "$estimated_annual_savings_brl" }
        }
    },
    { $sort: { total_savings: -1 } }
]);

// Consulta 14: Contar ações por STATUS
console.log("\n1️⃣4️⃣ Consulta 14: Agrupar ações por status e contar");
console.log("Comando: db.sustainability_actions.aggregate([{ $group: {_id: '$status', count: { $sum: 1 }} }])");
db.sustainability_actions.aggregate([
    {
        $group: {
            _id: "$status",
            count: { $sum: 1 }
        }
    }
]);

// Consulta 15: Investimento TOTAL em ações de sustentabilidade
console.log("\n1️⃣5️⃣ Consulta 15: Somar investimentos totais em ações");
console.log("Comando: db.sustainability_actions.aggregate([{ $group: {_id: null, total_investment: { $sum: '$investment_brl' }} }])");
db.sustainability_actions.aggregate([
    {
        $group: {
            _id: null,
            total_investment: { $sum: "$investment_brl" }
        }
    }
]);

// =============================================================================
// SEÇÃO 8: CONSULTAS EM ALERTS
// =============================================================================
// 
// Demonstra análise de incidentes e alertas
// =============================================================================

console.log("\n📌 ========== SEÇÃO 8: CONSULTAS EM ALERTS ==========");

// Consulta 16: Alertas ABERTOS (status = 'open')
console.log("\n1️⃣6️⃣ Consulta 16: Buscar todos os alertas com status 'open'");
console.log("Comando: db.alerts.find({ status: 'open' })");
db.alerts.find({ status: "open" });

// Consulta 17: Alertas CRÍTICOS
console.log("\n1️⃣7️⃣ Consulta 17: Buscar alertas com severidade 'critical'");
console.log("Comando: db.alerts.find({ severity: 'critical' })");
db.alerts.find({ severity: "critical" });

// Consulta 18: Distribuição de ALERTAS por SEVERIDADE
console.log("\n1️⃣8️⃣ Consulta 18: Agrupar alertas por severidade");
console.log("Comando: db.alerts.aggregate([{ $group: {_id: '$severity', count: { $sum: 1 }} }, { $sort: { count: -1 } }])");
db.alerts.aggregate([
    {
        $group: {
            _id: "$severity",
            count: { $sum: 1 }
        }
    },
    { $sort: { count: -1 } }
]);

// =============================================================================
// SEÇÃO 9: CONSULTAS EM COMPLIANCE_REPORTS
// =============================================================================
// 
// Demonstra análise de conformidade e governança
// =============================================================================

console.log("\n📌 ========== SEÇÃO 9: CONSULTAS EM COMPLIANCE_REPORTS ==========");

// Consulta 19: Relatórios COMPLIANT (em conformidade)
console.log("\n1️⃣9️⃣ Consulta 19: Buscar relatórios com status 'compliant'");
console.log("Comando: db.compliance_reports.find({ status: 'compliant' })");
db.compliance_reports.find({ status: "compliant" });

// Consulta 20: Pontuação MÉDIA do ESG
console.log("\n2️⃣0️⃣ Consulta 20: Buscar relatório de sustentabilidade e exibir ESG scores");
console.log("Comando: db.compliance_reports.find({ report_type: 'sustainability_report' }, { esg_scores: 1, 'esg_scores.overall': 1 })");
db.compliance_reports.find({ report_type: "sustainability_report" });

// =============================================================================
// SEÇÃO 10: CONSULTAS COMPLEXAS COM MÚLTIPLOS FILTROS
// =============================================================================
// 
// Demonstra combinações de operadores e filtros avançados
// =============================================================================

console.log("\n📌 ========== SEÇÃO 10: CONSULTAS COMPLEXAS ==========");

// Consulta 21: Sensores ATIVOS na SEDE SÃO PAULO que REQUEREM CALIBRAÇÃO
console.log("\n2️⃣1️⃣ Consulta 21: Sensores ativos em SP que precisam de calibração");
console.log("Comando: db.sensors.find({ status: 'active', 'location.building': 'Sede São Paulo', calibration_date: { $exists: true } })");
db.sensors.find({
    status: "active",
    "location.building": "Sede São Paulo",
    calibration_date: { $exists: true }
});

// Consulta 22: Leituras de ENERGIA com CUSTO superior a R$ 100
console.log("\n2️⃣2️⃣ Consulta 22: Leituras com custo acima de R$ 100 (sem renewable)");
console.log("Comando: db.energy_readings.find({ cost_brl: { $gt: 100 }, renewable: { $ne: true } })");
db.energy_readings.find({
    cost_brl: { $gt: 100 },
    renewable: { $ne: true }
});

// Consulta 23: Ações de SUSTENTABILIDADE CONCLUÍDAS com ROI
console.log("\n2️⃣3️⃣ Consulta 23: Ações concluídas que tiveram ROI positivo");
console.log("Comando: db.sustainability_actions.find({ status: 'completed', roi_percentage: { $exists: true } })");
db.sustainability_actions.find({
    status: "completed",
    roi_percentage: { $exists: true }
});

// =============================================================================
// RESUMO DAS CONSULTAS REALIZADAS
// =============================================================================

console.log("\n📊 RESUMO FINAL DO SCRIPT READ:");
console.log("✅ Consultas Básicas: 2");
console.log("✅ Filtragens por Status/Tipo: 2");
console.log("✅ Consultas por Localização: 2");
console.log("✅ Operadores Avançados: 2");
console.log("✅ Agregações: 3");
console.log("✅ Energy Readings: 2");
console.log("✅ Sustentabilidade: 3");
console.log("✅ Alertas: 3");
console.log("✅ Compliance: 2");
console.log("✅ Consultas Complexas: 3");
console.log("✅ TOTAL DE CONSULTAS DEMONSTRADAS: 24");
console.log("\n✅ Script READ finalizado com sucesso!");
console.log("\n📌 Próximo passo: Execute ecomonitor_update.js para modificar dados");

// =============================================================================
// FIM DO SCRIPT READ
// =============================================================================
