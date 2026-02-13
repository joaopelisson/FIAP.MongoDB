// EcoMonitor - Script de UPDATE
// Realiza 10 operações de atualização com diversos operadores ($set, $inc, $push, $unset)
// Pré-requisito: ecomonitor_setup.js + ecomonitor_create.js

// Selecione o banco de dados
use ecomonitor_db;

// =============================================================================
// SEÇÃO 1: ATUALIZAR UM ÚNICO DOCUMENTO (updateOne)
// =============================================================================
// 
// Demonstra como atualizar um documento específico
// Operador: $set
// =============================================================================

console.log("\n📌 ========== SEÇÃO 1: ATUALIZAR UM ÚNICO DOCUMENTO ==========");

// Atualização 1: Atualizar status de um sensor específico
console.log("\n1️⃣ Atualização 1: Atualizar sensor MOTION_001");
console.log("Ação: Mudar status para 'active' e adicionar data de manutenção");
console.log("Comando: db.sensors.updateOne({ sensor_id: 'MOTION_001' }, { $set: { status: 'active', last_maintenance: ISODate('2026-11-20') } })");

db.sensors.updateOne(
    { sensor_id: "MOTION_001" },
    {
        $set: {
            status: "active",
            last_maintenance: ISODate("2026-11-20")
        }
    }
);

// Verificar a atualização
console.log("✅ Sensor MOTION_001 atualizado!");
db.sensors.findOne({ sensor_id: "MOTION_001" });

// =============================================================================
// SEÇÃO 2: ATUALIZAR MÚLTIPLOS DOCUMENTOS (updateMany)
// =============================================================================
// 
// Demonstra como atualizar vários documentos que atendem a um critério
// =============================================================================

console.log("\n📌 ========== SEÇÃO 2: ATUALIZAR MÚLTIPLOS DOCUMENTOS ==========");

// Atualização 2: Atualizar todos os sensores INATIVOS
console.log("\n2️⃣ Atualização 2: Arquivar sensores inativos");
console.log("Ação: Alterar status de 'inactive' para 'archived'");
console.log("Comando: db.sensors.updateMany({ status: 'inactive' }, { $set: { status: 'archived', archived_date: ISODate('2026-11-20') } })");

db.sensors.updateMany(
    { status: "inactive" },
    {
        $set: {
            status: "archived",
            archived_date: ISODate("2026-11-20")
        }
    }
);

console.log("✅ Sensores inativos arquivados!");

// Verificar a atualização
console.log("Sensores arquivados:");
db.sensors.find({ status: "archived" });

// =============================================================================
// SEÇÃO 3: ATUALIZAR ALERTAS - FECHANDO INCIDENTES
// =============================================================================
// 
// Demonstra atualização com múltiplos campos
// Caso de uso: Fechar alerta ALT_001 com ações tomadas
// =============================================================================

console.log("\n📌 ========== SEÇÃO 3: ATUALIZAR ALERTAS ==========");

// Atualização 3: Fechar o alerta ALT_001 com ações
console.log("\n3️⃣ Atualização 3: Resolver alerta ALT_001");
console.log("Ação: Fechar alerta e registrar ação tomada");
console.log("Comando: db.alerts.updateOne({ alert_id: 'ALT_001' }, { $set: { status: 'resolved', actions_taken: [...], resolution_timestamp: ... } })");

db.alerts.updateOne(
    { alert_id: "ALT_001" },
    {
        $set: {
            status: "resolved",
            actions_taken: [
                { action: "Redução de carga energética", timestamp: ISODate("2026-11-20T16:00:00Z") },
                { action: "Revisão de distribuição de energia", timestamp: ISODate("2026-11-20T16:30:00Z") },
                { action: "Teste de normalização bem-sucedido", timestamp: ISODate("2026-11-20T17:00:00Z") }
            ],
            resolution_timestamp: ISODate("2026-11-20T17:00:00Z"),
            resolution_time_minutes: 75
        }
    }
);

console.log("✅ Alerta ALT_001 resolvido!");
db.alerts.findOne({ alert_id: "ALT_001" });

// =============================================================================
// SEÇÃO 4: ATUALIZAR COMPLIANCE_REPORTS - VERIFICAÇÃO
// =============================================================================
// 
// Demonstra atualização de relatórios de conformidade
// =============================================================================

console.log("\n📌 ========== SEÇÃO 4: ATUALIZAR COMPLIANCE_REPORTS ==========");

// Atualização 4: Atualizar relatório REP_005 com verificação
console.log("\n4️⃣ Atualização 4: Verificar relatório REP_005");
console.log("Ação: Marcar como verificado e adicionar informações");
console.log("Comando: db.compliance_reports.updateOne({ report_id: 'REP_005' }, { $set: { status: 'verified', verified_by: ..., verification_date: ... } })");

db.compliance_reports.updateOne(
    { report_id: "REP_005" },
    {
        $set: {
            status: "verified",
            verified_by: "Auditor Certificado - FIAP",
            verification_date: ISODate("2026-12-01T10:00:00Z"),
            verification_notes: "Todos os requisitos atendidos com excelência. Documentação completa e evidências disponíveis."
        }
    }
);

console.log("✅ Relatório REP_005 verificado!");
db.compliance_reports.findOne({ report_id: "REP_005" });

// =============================================================================
// SEÇÃO 5: ATUALIZAR MÚLTIPLOS RELATÓRIOS - CONFORMIDADE ISO
// =============================================================================
// 
// Demonstra atualização em lote de relatórios certificados
// =============================================================================

console.log("\n📌 ========== SEÇÃO 5: ATUALIZAR MÚLTIPLOS RELATÓRIOS ISO ==========");

// Atualização 5: Atualizar todos os relatórios ISO com certificação válida
console.log("\n5️⃣ Atualização 5: Marcar relatórios ISO como conformes");
console.log("Ação: Atualizar múltiplos relatórios ISO 50001 e ISO 14001");
console.log("Comando: db.compliance_reports.updateMany({ report_type: { $in: ['ISO_50001', 'ISO_14001'] }, auditor: { $exists: true } }, { $set: { compliance_verified: true, final_audit_date: ... } })");

db.compliance_reports.updateMany(
    {
        report_type: { $in: ["ISO_50001", "ISO_14001"] },
        auditor: { $exists: true }
    },
    {
        $set: {
            compliance_verified: true,
            final_audit_date: ISODate("2026-12-20"),
            verification_status: "approved"
        }
    }
);

console.log("✅ Relatórios ISO atualizados!");
db.compliance_reports.find({ report_type: { $in: ["ISO_50001", "ISO_14001"] } });

// =============================================================================
// SEÇÃO 6: INCREMENTAR VALORES - AÇÕES DE SUSTENTABILIDADE
// =============================================================================
// 
// Demonstra uso do operador $inc para incrementar campos numéricos
// Caso de uso: Adicionar mais sensores instalados em uma ação
// =============================================================================

console.log("\n📌 ========== SEÇÃO 6: INCREMENTAR VALORES ==========");

// Atualização 6: Aumentar número de sensores instalados em ACT_003
console.log("\n6️⃣ Atualização 6: Incrementar sensores instalados em ACT_003");
console.log("Ação: Adicionar 5 novos sensores ao projeto");
console.log("Comando: db.sustainability_actions.updateOne({ action_id: 'ACT_003' }, { $inc: { sensors_installed: 5 } })");

db.sustainability_actions.updateOne(
    { action_id: "ACT_003" },
    {
        $inc: { sensors_installed: 5 }
    }
);

console.log("✅ Contagem de sensores incrementada!");
db.sustainability_actions.findOne({ action_id: "ACT_003" });

// =============================================================================
// SEÇÃO 7: MODIFICAR ARRAYS - ADICIONAR ELEMENTO
// =============================================================================
// 
// Demonstra uso do operador $push para adicionar elementos a um array
// Caso de uso: Adicionar ação a um alerta
// =============================================================================

console.log("\n📌 ========== SEÇÃO 7: MODIFICAR ARRAYS ==========");

// Atualização 7: Adicionar ação ao alerta ALT_005
console.log("\n7️⃣ Atualização 7: Adicionar ação ao alerta ALT_005");
console.log("Ação: Registrar novo passo de resolução");
console.log("Comando: db.alerts.updateOne({ alert_id: 'ALT_005' }, { $push: { actions_taken: { action: '...', timestamp: ... } } })");

db.alerts.updateOne(
    { alert_id: "ALT_005" },
    {
        $push: {
            actions_taken: {
                action: "Análise concluída - Vazamento identificado em conexão",
                timestamp: ISODate("2026-11-21T03:00:00Z")
            }
        }
    }
);

console.log("✅ Ação adicionada ao alerta!");
db.alerts.findOne({ alert_id: "ALT_005" });

// =============================================================================
// SEÇÃO 8: ANINHADO - ATUALIZAR CAMPOS EM SUBDOCUMENTOS
// =============================================================================
// 
// Demonstra atualização de campos em documentos aninhados
// Caso de uso: Atualizar próxima data de calibração
// =============================================================================

console.log("\n📌 ========== SEÇÃO 8: ATUALIZAR SUBDOCUMENTOS ==========");

// Atualização 8: Atualizar data de próxima calibração
console.log("\n8️⃣ Atualização 8: Atualizar próxima data de calibração do sensor TEMP_001");
console.log("Ação: Agendar próxima calibração");
console.log("Comando: db.sensors.updateOne({ sensor_id: 'TEMP_001' }, { $set: { 'next_calibration': ISODate(...) } })");

db.sensors.updateOne(
    { sensor_id: "TEMP_001" },
    {
        $set: {
            "next_calibration": ISODate("2027-02-01"),
            "calibration_status": "scheduled",
            "calibration_technician": "ClimaTech Ltda"
        }
    }
);

console.log("✅ Calibração agendada!");
db.sensors.findOne({ sensor_id: "TEMP_001" });

// =============================================================================
// SEÇÃO 9: SUBSTITUIR CAMPO - USAR $UNSET
// =============================================================================
// 
// Demonstra remoção de campos usando $unset
// Caso de uso: Remover campo que não é mais necessário
// =============================================================================

console.log("\n📌 ========== SEÇÃO 9: REMOVER CAMPOS ==========");

// Atualização 9: Remover campo deprecated
console.log("\n9️⃣ Atualização 9: Remover campo 'maintenance_reason'");
console.log("Ação: Limpar campos obsoletos após manutenção");
console.log("Comando: db.sensors.updateOne({ sensor_id: 'ENERGY_004', status: 'maintenance' }, { $unset: { maintenance_reason: '' } })");

db.sensors.updateOne(
    { sensor_id: "ENERGY_004", status: "maintenance" },
    {
        $unset: { maintenance_reason: "" }
    }
);

console.log("✅ Campo removido!");

// =============================================================================
// SEÇÃO 10: ATUALIZAR MÚLTIPLOS CAMPOS COMPLEXOS
// =============================================================================
// 
// Demonstra atualização de múltiplos campos aninhados
// =============================================================================

console.log("\n📌 ========== SEÇÃO 10: ATUALIZAR MÚLTIPLOS CAMPOS ==========");

// Atualização 10: Atualizar métricas de sustentabilidade
console.log("\n1️⃣0️⃣ Atualização 10: Atualizar métricas de ação ACT_004");
console.log("Ação: Registrar nova medição após manutenção");
console.log("Comando: db.sustainability_actions.updateOne({ action_id: 'ACT_004' }, { $set: { 'metrics_after.average_consumption_kwh': 87.5, 'metrics_after.efficiency_percentage': 90 } })");

db.sustainability_actions.updateOne(
    { action_id: "ACT_004" },
    {
        $set: {
            "metrics_after.average_consumption_kwh": 87.5,
            "metrics_after.efficiency_percentage": 90,
            "updated_at": ISODate("2026-11-20T10:00:00Z")
        }
    }
);

console.log("✅ Métricas atualizadas!");
db.sustainability_actions.findOne({ action_id: "ACT_004" });

// =============================================================================
// RESUMO DAS ATUALIZAÇÕES REALIZADAS
// =============================================================================

console.log("\n📊 RESUMO FINAL DO SCRIPT UPDATE:");
console.log("✅ Atualização de sensor individual (updateOne): 1");
console.log("✅ Atualização de sensores em lote (updateMany): 1");
console.log("✅ Atualização de alertas: 1");
console.log("✅ Atualização de relatórios de conformidade: 2");
console.log("✅ Incremento de campos numéricos ($inc): 1");
console.log("✅ Modificação de arrays ($push): 1");
console.log("✅ Atualização de subdocumentos: 1");
console.log("✅ Remoção de campos ($unset): 1");
console.log("✅ Atualização múltipla complexa: 1");
console.log("✅ TOTAL DE OPERAÇÕES UPDATE: 10");
console.log("\n✅ Script UPDATE finalizado com sucesso!");
console.log("\n📌 Próximo passo: Execute ecomonitor_delete.js para deletar dados");

// =============================================================================
// FIM DO SCRIPT UPDATE
// =============================================================================
