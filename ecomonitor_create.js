// EcoMonitor - Script de CREATE (INSERT)
// Insere 60 documentos em 5 collections
// Pré-requisito: ecomonitor_setup.js

// Selecione o banco de dados
use ecomonitor_db;

// =============================================================================
// SEÇÃO 1: Inserir SENSORES (Collection: sensors)
// =============================================================================
// 
// Descrição: Armazena o cadastro de todos os dispositivos IoT instalados
// ESG: 🌍 Ambiental
// 
// Padrão: insertMany para inserção em lote (melhor performance)
// Quantidade: 12 sensores com diferentes tipos
// =============================================================================

console.log("📌 Inserindo 12 sensores IoT na collection 'sensors'...");

db.sensors.insertMany([
    {
        sensor_id: "ENERGY_001",
        type: "energy_meter",
        location: { building: "Sede São Paulo", floor: 3, department: "TI", zone: "Datacenter" },
        status: "active",
        installation_date: ISODate("2026-01-15"),
        specs: { max_power_kw: 100, voltage_range: [110, 220], protocol: "Modbus TCP", manufacturer: "Schneider Electric" }
    },
    {
        sensor_id: "ENERGY_002",
        type: "energy_meter",
        location: { building: "Sede São Paulo", floor: 2, department: "Administrativo", zone: "Open Space" },
        status: "active",
        installation_date: ISODate("2026-01-20"),
        specs: { max_power_kw: 50, voltage_range: [110, 220], protocol: "Modbus RTU", manufacturer: "ABB" }
    },
    {
        sensor_id: "TEMP_001",
        type: "temperature",
        location: { building: "Sede São Paulo", floor: 3, department: "TI", zone: "Datacenter" },
        status: "active",
        installation_date: ISODate("2026-02-01"),
        specs: { range_celsius: [-10, 50], accuracy: 0.5, unit: "celsius", manufacturer: "Honeywell" },
        calibration_date: ISODate("2026-02-01"),
        next_calibration: ISODate("2025-02-01")
    },
    {
        sensor_id: "LIGHT_001",
        type: "light_sensor",
        location: { building: "Sede São Paulo", floor: 2, department: "Administrativo", zone: "Sala de Reuniões A" },
        status: "active",
        installation_date: ISODate("2026-02-10"),
        specs: { range_lux: [0, 10000], response_time_ms: 100, manufacturer: "Philips" }
    },
    {
        sensor_id: "ENERGY_003",
        type: "energy_meter",
        location: { building: "Filial Rio de Janeiro", floor: 1, department: "Produção", zone: "Linha de Montagem 1" },
        status: "active",
        installation_date: ISODate("2026-03-01"),
        specs: { max_power_kw: 200, voltage_range: [220, 380], protocol: "Modbus TCP", manufacturer: "Siemens", three_phase: true }
    },
    {
        sensor_id: "TEMP_002",
        type: "temperature",
        location: { building: "Filial Rio de Janeiro", floor: 1, department: "Produção", zone: "Linha de Montagem 1" },
        status: "active",
        installation_date: ISODate("2026-03-05"),
        specs: { range_celsius: [0, 80], accuracy: 1.0, unit: "celsius", manufacturer: "Omega" },
        calibration_date: ISODate("2026-03-05")
    },
    {
        sensor_id: "ENERGY_004",
        type: "energy_meter",
        location: { building: "Sede São Paulo", floor: 1, department: "Facilities", zone: "Ar Condicionado Central" },
        status: "maintenance",
        installation_date: ISODate("2026-01-10"),
        specs: { max_power_kw: 150, voltage_range: [220, 380], protocol: "BACnet", manufacturer: "Johnson Controls" },
        maintenance_reason: "Calibração preventiva",
        maintenance_start: ISODate("2026-11-18")
    },
    {
        sensor_id: "HUMID_001",
        type: "humidity",
        location: { building: "Sede São Paulo", floor: 3, department: "TI", zone: "Datacenter" },
        status: "active",
        installation_date: ISODate("2026-02-15"),
        specs: { range_percentage: [0, 100], accuracy: 2.0, manufacturer: "Vaisala" }
    },
    {
        sensor_id: "ENERGY_005",
        type: "energy_meter",
        location: { building: "Sede São Paulo", floor: -1, department: "Facilities", zone: "Estacionamento - Iluminação" },
        status: "active",
        installation_date: ISODate("2026-04-01"),
        specs: { max_power_kw: 30, voltage_range: [110, 220], protocol: "MQTT", manufacturer: "Shelly", smart_control: true }
    },
    {
        sensor_id: "MOTION_001",
        type: "motion_detector",
        location: { building: "Sede São Paulo", floor: 2, department: "Administrativo", zone: "Corredor Principal" },
        status: "active",
        installation_date: ISODate("2026-04-10"),
        specs: { detection_range_meters: 10, field_of_view_degrees: 120, manufacturer: "Bosch" }
    },
    {
        sensor_id: "SOLAR_001",
        type: "solar_panel_monitor",
        location: { building: "Sede São Paulo", floor: 5, department: "Facilities", zone: "Telhado - Painéis Solares" },
        status: "active",
        installation_date: ISODate("2026-05-01"),
        specs: { panel_capacity_kw: 50, efficiency_percentage: 22, manufacturer: "Canadian Solar", inverter_model: "SMA Sunny Tripower" },
        renewable_energy: true
    },
    {
        sensor_id: "ENERGY_006",
        type: "energy_meter",
        location: { building: "Filial Rio de Janeiro", floor: 2, department: "Comercial", zone: "Sala de Vendas" },
        status: "inactive",
        installation_date: ISODate("2023-12-01"),
        specs: { max_power_kw: 40, voltage_range: [110, 220], protocol: "Modbus TCP", manufacturer: "ABB" },
        deactivation_date: ISODate("2026-10-15"),
        deactivation_reason: "Área desativada temporariamente"
    }
]);

console.log("✅ 12 sensores inseridos com sucesso!");

// =============================================================================
// SEÇÃO 2: Inserir LEITURAS DE ENERGIA (Collection: energy_readings)
// =============================================================================
// 
// Descrição: Registra leituras de consumo energético em tempo real
// ESG: 🌍 Ambiental
// 
// Padrão: insertMany para inserção em lote
// Quantidade: 15 leituras com metadados variados
// Características: Série temporal, anomalias, condições ambientais
// =============================================================================

console.log("📌 Inserindo 15 leituras de energia na collection 'energy_readings'...");

db.energy_readings.insertMany([
    {
        sensor_id: "ENERGY_001",
        timestamp: ISODate("2026-11-20T08:00:00Z"),
        consumption_kwh: 45.7,
        voltage_v: 220,
        current_a: 15.2,
        power_factor: 0.95,
        cost_brl: 38.52
    },
    {
        sensor_id: "ENERGY_002",
        timestamp: ISODate("2026-11-20T08:00:00Z"),
        consumption_kwh: 22.3,
        voltage_v: 218,
        current_a: 7.8,
        power_factor: 0.92,
        cost_brl: 18.79
    },
    {
        sensor_id: "ENERGY_001",
        timestamp: ISODate("2026-11-20T14:30:00Z"),
        consumption_kwh: 78.5,
        voltage_v: 221,
        current_a: 26.1,
        power_factor: 0.94,
        cost_brl: 66.17,
        peak_hour: true,
        notes: "Processamento de backup completo"
    },
    {
        sensor_id: "ENERGY_002",
        timestamp: ISODate("2026-11-20T15:45:00Z"),
        consumption_kwh: 152.3,
        voltage_v: 218,
        current_a: 48.5,
        power_factor: 0.87,
        cost_brl: 128.44,
        anomaly_detected: true,
        anomaly_type: "spike",
        metadata: { weather_condition: "heat_wave", external_temperature_celsius: 38, ac_systems_running: 12 }
    },
    {
        sensor_id: "ENERGY_003",
        timestamp: ISODate("2026-11-20T09:00:00Z"),
        consumption_kwh: 145.8,
        voltage_v: 380,
        current_a: 28.3,
        power_factor: 0.96,
        cost_brl: 122.89,
        production_shift: "morning",
        machines_active: 8
    },
    {
        sensor_id: "ENERGY_003",
        timestamp: ISODate("2026-11-20T14:00:00Z"),
        consumption_kwh: 167.2,
        voltage_v: 378,
        current_a: 32.5,
        power_factor: 0.97,
        cost_brl: 140.87,
        production_shift: "afternoon",
        machines_active: 10
    },
    {
        sensor_id: "ENERGY_001",
        timestamp: ISODate("2026-11-20T22:00:00Z"),
        consumption_kwh: 18.2,
        voltage_v: 220,
        current_a: 6.1,
        power_factor: 0.93,
        cost_brl: 15.35,
        off_peak: true
    },
    {
        sensor_id: "ENERGY_004",
        timestamp: ISODate("2026-11-15T13:00:00Z"),
        consumption_kwh: 98.5,
        voltage_v: 380,
        current_a: 19.1,
        power_factor: 0.91,
        cost_brl: 83.02,
        equipment_type: "HVAC",
        outdoor_temp_celsius: 32
    },
    {
        sensor_id: "ENERGY_005",
        timestamp: ISODate("2026-11-20T19:00:00Z"),
        consumption_kwh: 12.4,
        voltage_v: 220,
        current_a: 4.1,
        power_factor: 0.88,
        cost_brl: 10.46,
        lighting_mode: "automatic",
        occupancy_detected: true
    },
    {
        sensor_id: "SOLAR_001",
        timestamp: ISODate("2026-11-20T12:00:00Z"),
        generation_kwh: 38.7,
        voltage_v: 220,
        current_a: -12.9,
        power_factor: 0.99,
        savings_brl: 32.61,
        solar_irradiance: 850,
        panel_temperature_celsius: 45,
        renewable: true
    },
    {
        sensor_id: "ENERGY_002",
        timestamp: ISODate("2026-11-20T16:00:00Z"),
        consumption_kwh: 28.9,
        voltage_v: 219,
        current_a: 9.7,
        power_factor: 0.93,
        cost_brl: 24.36,
        occupancy_percentage: 85
    },
    {
        sensor_id: "ENERGY_001",
        timestamp: ISODate("2026-11-23T10:00:00Z"),
        consumption_kwh: 32.1,
        voltage_v: 220,
        current_a: 10.7,
        power_factor: 0.94,
        cost_brl: 27.07,
        weekend: true,
        reduced_load: true
    },
    {
        sensor_id: "ENERGY_003",
        timestamp: ISODate("2026-11-20T21:00:00Z"),
        consumption_kwh: 124.5,
        voltage_v: 379,
        current_a: 24.2,
        power_factor: 0.95,
        cost_brl: 104.99,
        production_shift: "night",
        machines_active: 6,
        night_differential_discount: 0.15
    },
    {
        sensor_id: "ENERGY_005",
        timestamp: ISODate("2026-11-20T03:00:00Z"),
        consumption_kwh: 0.0,
        voltage_v: 220,
        current_a: 0.0,
        power_factor: 0.0,
        cost_brl: 0.0,
        lighting_mode: "off",
        auto_shutdown: true
    },
    {
        sensor_id: "SOLAR_001",
        timestamp: ISODate("2026-11-20T13:30:00Z"),
        generation_kwh: 42.3,
        voltage_v: 221,
        current_a: -14.1,
        power_factor: 0.99,
        savings_brl: 35.64,
        solar_irradiance: 920,
        panel_temperature_celsius: 48,
        renewable: true,
        peak_generation: true
    }
]);

console.log("✅ 15 leituras de energia inseridas com sucesso!");

// =============================================================================
// SEÇÃO 3: Inserir ALERTAS (Collection: alerts)
// =============================================================================
// 
// Descrição: Gerencia alertas de consumo, anomalias e manutenção
// ESG: 🌍 Ambiental + ⚖️ Governança
// 
// Padrão: insertMany
// Quantidade: 12 alertas com diferentes tipos e severidades
// Campos flexíveis: ações tomadas, resoluções, timestamps
// =============================================================================

console.log("📌 Inserindo 12 alertas na collection 'alerts'...");

db.alerts.insertMany([
    {
        alert_id: "ALT_001",
        sensor_id: "ENERGY_002",
        alert_type: "high_consumption",
        severity: "critical",
        threshold_kwh: 100,
        actual_kwh: 152.3,
        timestamp: ISODate("2026-11-20T15:45:00Z"),
        status: "open",
        assigned_to: "manutencao@empresa.com",
        notification_sent: true,
        actions_taken: []
    },
    {
        alert_id: "ALT_002",
        sensor_id: "TEMP_001",
        alert_type: "high_temperature",
        severity: "high",
        threshold_celsius: 28,
        actual_celsius: 31.5,
        timestamp: ISODate("2026-11-19T14:30:00Z"),
        status: "resolved",
        assigned_to: "ti@empresa.com",
        notification_sent: true,
        actions_taken: [
            { action: "Acionamento de ventiladores adicionais", timestamp: ISODate("2026-11-19T14:35:00Z") },
            { action: "Monitoramento intensificado", timestamp: ISODate("2026-11-19T14:40:00Z") }
        ],
        resolution_timestamp: ISODate("2026-11-19T15:00:00Z"),
        resolution_time_minutes: 30
    },
    {
        alert_id: "ALT_003",
        sensor_id: "ENERGY_004",
        alert_type: "sensor_offline",
        severity: "medium",
        timestamp: ISODate("2026-11-18T08:00:00Z"),
        status: "acknowledged",
        assigned_to: "ti@empresa.com",
        notification_sent: true,
        last_communication: ISODate("2026-11-18T07:45:00Z"),
        actions_taken: [
            { action: "Reset remoto do sensor", timestamp: ISODate("2026-11-18T08:10:00Z") },
            { action: "Verificação de conectividade", timestamp: ISODate("2026-11-18T08:15:00Z") },
            { action: "Escalação para suporte técnico", timestamp: ISODate("2026-11-18T08:20:00Z") }
        ]
    },
    {
        alert_id: "ALT_004",
        sensor_id: "ENERGY_003",
        alert_type: "consumption_peak",
        severity: "low",
        threshold_kwh: 150,
        actual_kwh: 167.2,
        timestamp: ISODate("2026-11-20T14:00:00Z"),
        status: "closed",
        assigned_to: null,
        notification_sent: false,
        expected_behavior: true,
        notes: "Pico esperado durante turno de produção"
    },
    {
        alert_id: "ALT_005",
        sensor_id: "ENERGY_005",
        alert_type: "energy_leak",
        severity: "high",
        baseline_kwh: 0.0,
        actual_kwh: 3.2,
        timestamp: ISODate("2026-11-21T02:30:00Z"),
        status: "open",
        assigned_to: "facilities@empresa.com",
        notification_sent: true,
        actions_taken: [],
        notes: "Consumo detectado fora do horário de operação"
    },
    {
        alert_id: "ALT_006",
        sensor_id: "SOLAR_001",
        alert_type: "low_generation",
        severity: "medium",
        expected_generation_kwh: 40,
        actual_generation_kwh: 18.5,
        timestamp: ISODate("2026-11-22T12:00:00Z"),
        status: "open",
        assigned_to: "facilities@empresa.com",
        notification_sent: true,
        weather_condition: "cloudy",
        actions_taken: []
    },
    {
        alert_id: "ALT_007",
        sensor_id: "MOTION_001",
        alert_type: "communication_failure",
        severity: "medium",
        timestamp: ISODate("2026-11-17T11:20:00Z"),
        status: "resolved",
        assigned_to: "ti@empresa.com",
        notification_sent: true,
        actions_taken: [
            { action: "Reinicialização do roteador wireless", timestamp: ISODate("2026-11-17T11:25:00Z") },
            { action: "Reestabelecimento de conexão", timestamp: ISODate("2026-11-17T11:30:00Z") },
            { action: "Teste de comunicação bem-sucedido", timestamp: ISODate("2026-11-17T11:35:00Z") }
        ],
        resolution_timestamp: ISODate("2026-11-17T11:40:00Z"),
        resolution_time_minutes: 20
    },
    {
        alert_id: "ALT_008",
        sensor_id: null,
        alert_type: "savings_goal_achieved",
        severity: "info",
        goal_reduction_percentage: 10,
        actual_reduction_percentage: 12.5,
        timestamp: ISODate("2026-11-30T23:59:00Z"),
        status: "closed",
        assigned_to: "sustainability@empresa.com",
        notification_sent: true,
        celebration: true,
        month: "November 2026"
    },
    {
        alert_id: "ALT_009",
        sensor_id: "TEMP_002",
        alert_type: "calibration_required",
        severity: "low",
        last_calibration: ISODate("2026-03-05"),
        next_calibration_due: ISODate("2027-03-05"),
        days_until_due: 113,
        timestamp: ISODate("2026-11-12T00:00:00Z"),
        status: "open",
        assigned_to: "manutencao@empresa.com",
        notification_sent: true,
        actions_taken: []
    },
    {
        alert_id: "ALT_010",
        sensor_id: "HUMID_001",
        alert_type: "high_humidity",
        severity: "critical",
        threshold_percentage: 70,
        actual_percentage: 82,
        timestamp: ISODate("2026-11-16T16:00:00Z"),
        status: "resolved",
        assigned_to: "ti@empresa.com",
        notification_sent: true,
        actions_taken: [
            { action: "Acionamento de desumidificadores", timestamp: ISODate("2026-11-16T16:30:00Z") },
            { action: "Nível de umidade normalizado", timestamp: ISODate("2026-11-16T18:00:00Z") }
        ],
        resolution_timestamp: ISODate("2026-11-16T18:00:00Z"),
        resolution_time_minutes: 120,
        equipment_risk: "high"
    },
    {
        alert_id: "ALT_011",
        sensor_id: "ENERGY_001",
        alert_type: "unusual_pattern",
        severity: "medium",
        timestamp: ISODate("2026-11-23T03:00:00Z"),
        status: "investigating",
        assigned_to: "security@empresa.com",
        notification_sent: true,
        actions_taken: [
            { action: "Análise de padrão iniciada", timestamp: ISODate("2026-11-23T03:15:00Z") }
        ],
        pattern_deviation: "consumption_during_closed_hours",
        notes: "Verificar possível acesso não autorizado"
    },
    {
        alert_id: "ALT_012",
        sensor_id: "ENERGY_002",
        alert_type: "low_power_factor",
        severity: "medium",
        threshold_power_factor: 0.90,
        actual_power_factor: 0.87,
        timestamp: ISODate("2026-11-20T15:45:00Z"),
        status: "open",
        assigned_to: "facilities@empresa.com",
        notification_sent: true,
        actions_taken: [],
        potential_fine_brl: 450.00,
        recommendation: "Instalar banco de capacitores"
    }
]);

console.log("✅ 12 alertas inseridos com sucesso!");

// =============================================================================
// SEÇÃO 4: Inserir AÇÕES DE SUSTENTABILIDADE (Collection: sustainability_actions)
// =============================================================================
// 
// Descrição: Registra ações de sustentabilidade executadas
// ESG: 🌍 Ambiental + 👥 Social
// 
// Padrão: insertMany
// Quantidade: 11 ações com diferentes tipos
// Características: ROI, payback, métricas before/after, gamificação
// =============================================================================

console.log("📌 Inserindo 11 ações de sustentabilidade na collection 'sustainability_actions'...");

db.sustainability_actions.insertMany([
    {
        action_id: "ACT_001",
        action_type: "automatic_shutdown",
        trigger: "idle_detection",
        timestamp: ISODate("2026-11-20T18:00:00Z"),
        affected_sensors: ["ENERGY_005"],
        location: "Estacionamento - Iluminação",
        estimated_savings_kwh: 12.4,
        estimated_savings_brl: 10.46,
        status: "completed",
        automated: true
    },
    {
        action_id: "ACT_002",
        action_type: "awareness_campaign",
        title: "Campanha Luz Apagada - Novembro 2026",
        start_date: ISODate("2026-11-01"),
        end_date: ISODate("2026-11-30"),
        participants: 150,
        departments: ["TI", "RH", "Financeiro", "Comercial"],
        metrics: {
            baseline_consumption_kwh: 5000,
            final_consumption_kwh: 4388,
            reduction_kwh: 612,
            reduction_percentage: 12.24,
            savings_brl: 674.40
        },
        gamification: {
            points_awarded: 3000,
            challenges_completed: 12,
            top_performer: "Departamento de TI",
            prizes_distributed: true
        },
        status: "completed"
    },
    {
        action_id: "ACT_003",
        action_type: "infrastructure_upgrade",
        title: "Instalação de Sensores de Presença",
        timestamp: ISODate("2026-04-10"),
        investment_brl: 15000,
        affected_areas: ["Corredores", "Banheiros", "Salas de Reunião"],
        sensors_installed: 25,
        estimated_annual_savings_kwh: 8500,
        estimated_annual_savings_brl: 7165,
        payback_period_months: 25,
        status: "completed",
        roi_percentage: 47.77
    },
    {
        action_id: "ACT_004",
        action_type: "preventive_maintenance",
        title: "Limpeza e Calibração de Ar Condicionado",
        timestamp: ISODate("2026-11-15"),
        equipment: "HVAC - Ar Condicionado Central",
        sensor_id: "ENERGY_004",
        technician: "Empresa ClimaTech Ltda",
        cost_brl: 3500,
        metrics_before: { average_consumption_kwh: 105.2, efficiency_percentage: 75 },
        metrics_after: { average_consumption_kwh: 89.7, efficiency_percentage: 88 },
        improvement_percentage: 14.7,
        estimated_monthly_savings_brl: 389.73,
        status: "completed"
    },
    {
        action_id: "ACT_005",
        action_type: "renewable_energy",
        title: "Instalação de Sistema Fotovoltaico",
        timestamp: ISODate("2026-05-01"),
        investment_brl: 250000,
        installed_capacity_kw: 50,
        sensor_id: "SOLAR_001",
        annual_generation_estimated_kwh: 65000,
        annual_savings_estimated_brl: 54775,
        carbon_offset_kg_year: 32500,
        payback_period_months: 54,
        status: "active",
        renewable: true,
        certifications: ["ANEEL", "INMETRO"]
    },
    {
        action_id: "ACT_006",
        action_type: "equipment_replacement",
        title: "Substituição de Lâmpadas Fluorescentes por LED",
        timestamp: ISODate("2026-02-20"),
        investment_brl: 12000,
        units_replaced: 450,
        locations: ["Sede São Paulo - Todos os andares"],
        metrics: { power_before_w: 40, power_after_w: 9, reduction_percentage: 77.5, estimated_annual_savings_brl: 12139.20 },
        payback_period_months: 11,
        status: "completed",
        environmental_impact: { mercury_eliminated_kg: 0.225, lifespan_increase_percentage: 400 }
    },
    {
        action_id: "ACT_007",
        action_type: "automation",
        title: "Automação de Temperatura por Ocupação",
        timestamp: ISODate("2026-06-01"),
        investment_brl: 8000,
        affected_sensors: ["TEMP_001", "TEMP_002", "MOTION_001"],
        logic: "Ajustar temperatura baseado em presença e horário",
        estimated_annual_savings_kwh: 18000,
        estimated_annual_savings_brl: 15174,
        status: "active",
        automated: true
    },
    {
        action_id: "ACT_008",
        action_type: "waste_management",
        title: "Programa de Coleta Seletiva Corporativa",
        start_date: ISODate("2026-03-01"),
        participants: 200,
        materials_collected: [
            { type: "papel", weight_kg: 1850, recycling_percentage: 95 },
            { type: "plastico", weight_kg: 420, recycling_percentage: 80 },
            { type: "metal", weight_kg: 180, recycling_percentage: 99 },
            { type: "eletronico", weight_kg: 95, recycling_percentage: 70 }
        ],
        total_weight_kg: 2545,
        carbon_offset_kg: 3817.5,
        revenue_brl: 1272.50,
        status: "ongoing",
        partner: "EcoRecicla Brasil"
    },
    {
        action_id: "ACT_009",
        action_type: "training",
        title: "Treinamento de Boas Práticas de Sustentabilidade",
        timestamp: ISODate("2026-07-15"),
        participants: 180,
        duration_hours: 4,
        topics: ["Eficiência Energética", "Gestão de Resíduos", "Mobilidade Sustentável", "Compliance Ambiental"],
        cost_brl: 5400,
        satisfaction_score: 4.7,
        certificates_issued: 180,
        status: "completed"
    },
    {
        action_id: "ACT_010",
        action_type: "carbon_offset",
        title: "Compra de Créditos de Carbono",
        timestamp: ISODate("2026-10-01"),
        investment_brl: 35000,
        vendor: "Carbon Trust International",
        credits_purchased: 1000,
        carbon_offset_kg: 1000000,
        certification: "VCS (Verified Carbon Standard)",
        status: "completed",
        monitoring_reports: 2
    },
    {
        action_id: "ACT_011",
        action_type: "partnership",
        title: "Parceria com Fornecedor Sustentável",
        timestamp: ISODate("2026-08-20"),
        partner_name: "EnergiaPura Ltda",
        energy_source_type: "renewable",
        percentage_reduction: 20,
        estimated_annual_savings_brl: 40000,
        contract_duration_months: 36,
        status: "active",
        automated: true
    }
]);

console.log("✅ 11 ações de sustentabilidade inseridas com sucesso!");

// =============================================================================
// SEÇÃO 5: Inserir RELATÓRIOS DE COMPLIANCE (Collection: compliance_reports)
// =============================================================================
// 
// Descrição: Consolida relatórios de conformidade e auditorias
// ESG: ⚖️ Governança
// 
// Padrão: insertMany
// Quantidade: 10 relatórios com diferentes tipos
// Características: ISO 50001, ISO 14001, pegada de carbono, ESG scores
// =============================================================================

console.log("📌 Inserindo 10 relatórios de compliance na collection 'compliance_reports'...");

db.compliance_reports.insertMany([
    {
        report_id: "REP_001",
        report_type: "ISO_50001",
        title: "Relatório de Conformidade ISO 50001 - 2026",
        compliance_period: "2026-01-01 até 2026-11-30",
        organization: "Empresa Sustentável LTDA",
        auditor: "Auditor Certificado - DNV GL",
        audit_date: ISODate("2026-11-25"),
        status: "compliant",
        findings: 0,
        observations: 2,
        energy_baseline_kwh: 85000,
        energy_consumption_kwh: 79200,
        improvement_percentage: 6.82,
        cost_savings_brl: 28344,
        certifications_valid: true,
        next_audit_date: ISODate("2027-11-25"),
        generated_at: ISODate("2026-11-10")
    },
    {
        report_id: "REP_002",
        report_type: "ISO_14001",
        title: "Relatório de Conformidade ISO 14001 - Gestão Ambiental",
        compliance_period: "2026-01-01 até 2026-11-30",
        organization: "Empresa Sustentável LTDA",
        auditor: "Auditor Certificado - SGS",
        audit_date: ISODate("2026-12-05"),
        status: "compliant",
        findings: 0,
        observations: 1,
        environmental_aspects_evaluated: 15,
        non_conformances: 0,
        waste_reduction_percentage: 18.5,
        emission_reduction_percentage: 12.3,
        stakeholders_engaged: true,
        certifications_valid: true,
        next_audit_date: ISODate("2027-12-05"),
        generated_at: ISODate("2026-12-05")
    },
    {
        report_id: "REP_003",
        report_type: "carbon_footprint",
        title: "Relatório de Pegada de Carbono - Novembro 2026",
        reporting_period: "2026-11-01 até 2026-11-30",
        total_emissions_kg_co2e: 18500,
        scope_1_kg_co2e: 2100,
        scope_2_kg_co2e: 14200,
        scope_3_kg_co2e: 2200,
        intensity_per_employee: 42.5,
        targets_met: true,
        reduction_vs_previous_year: 15.8,
        renewable_energy_percentage: 22,
        generated_at: ISODate("2026-12-01")
    },
    {
        report_id: "REP_004",
        report_type: "sustainability_report",
        title: "Relatório de Sustentabilidade Anual - 2026",
        reporting_period: "2026-01-01 até 2026-11-30",
        organization: "Empresa Sustentável LTDA",
        esg_scores: { environmental: 8.7, social: 8.2, governance: 8.5, overall: 8.47 },
        material_topics: ["Eficiência Energética", "Gestão de Resíduos", "Engajamento de Stakeholders", "Ética Corporativa", "Direitos Humanos"],
        stakeholders_surveyed: 250,
        satisfaction_score: 4.6,
        reporting_standard: "GRI Standards 2021",
        assurance_level: "moderate",
        generated_at: ISODate("2026-10-25")
    },
    {
        report_id: "REP_005",
        report_type: "monthly_energy",
        title: "Relatório Mensal de Consumo Energético - Novembro 2026",
        reporting_month: "2026-11",
        total_consumption_kwh: 52340,
        total_cost_brl: 63456.48,
        renewable_generation_kwh: 9850,
        renewable_savings_brl: 8316.75,
        peak_demand_kw: 185.4,
        average_demand_kw: 72.1,
        consumption_vs_forecast: -2.5,
        alerts_generated: 12,
        actions_completed: 8,
        savings_achieved_brl: 15233,
        recipients: ["CEO", "CFO", "Sustainability Officer"]
    },
    {
        report_id: "REP_006",
        report_type: "facilities_audit",
        title: "Auditoria de Facilities - 4º Trimestre 2026",
        audit_date: ISODate("2026-11-20"),
        facilities_inspected: 5,
        equipment_checked: 87,
        equipment_compliant: 84,
        compliance_percentage: 96.6,
        maintenance_due: 3,
        upgrades_recommended: 2,
        energy_efficiency_rating: "A++",
        certifications_status: "valid",
        next_audit_scheduled: ISODate("2027-02-20"),
        generated_at: ISODate("2026-11-30")
    },
    {
        report_id: "REP_007",
        report_type: "renewable_performance",
        title: "Relatório de Performance Solar - Novembro 2026",
        reporting_month: "2026-11",
        solar_system_capacity_kw: 50,
        expected_generation_kwh: 3500,
        actual_generation_kwh: 3420,
        performance_ratio: 97.7,
        system_efficiency: 94.2,
        peak_production_time: "12:30",
        weather_impact: "7 dias nublados",
        maintenance_performed: true,
        maintenance_type: "Limpeza de painéis",
        next_maintenance: ISODate("2027-02-20"),
        annual_co2_avoided_kg: 25650,
        generated_at: ISODate("2026-12-01")
    },
    {
        report_id: "REP_008",
        report_type: "third_party_audit",
        title: "Auditoria de Terceiros - Conformidade ESG",
        audit_firm: "Ernst & Young - Sustainability Advisory",
        audit_date: ISODate("2026-12-10"),
        audit_scope: ["Energy", "Environment", "Social", "Governance"],
        overall_rating: "A",
        recommendations_count: 8,
        critical_findings: 0,
        non_conformances: 1,
        improvement_areas: ["Board Diversity", "Supply Chain Transparency"],
        strength_areas: ["Energy Efficiency", "Waste Management"],
        certifications_recommended: ["B Corp", "ISO 50001 Advanced"],
        generated_at: ISODate("2026-12-10")
    },
    {
        report_id: "REP_009",
        report_type: "water_consumption",
        title: "Relatório de Consumo de Água - Novembro 2026",
        reporting_month: "2026-11",
        total_consumption_m3: 2450,
        consumption_per_employee: 5.6,
        comparison_with_sector: -12.3,
        rainwater_harvesting_m3: 180,
        recycled_water_m3: 120,
        water_stress_risk: "low",
        treatment_cost_brl: 7350,
        initiatives_active: 3,
        generated_at: ISODate("2026-12-15")
    },
    {
        report_id: "REP_010",
        report_type: "stakeholder_communication",
        title: "Relatório de Engajamento de Stakeholders - 2026",
        reporting_year: 2026,
        stakeholder_groups: ["Funcionários", "Clientes", "Fornecedores", "Comunidade Local", "Órgãos Reguladores"],
        engagement_events: 24,
        total_participants: 850,
        satisfaction_score: 4.7,
        key_concerns_addressed: 12,
        commitments_made: 15,
        commitments_fulfilled: 14,
        fulfillment_percentage: 93.3,
        feedback_channels_active: 7,
        generated_at: ISODate("2026-12-20")
    }
]);

console.log("✅ 10 relatórios de compliance inseridos com sucesso!");

// =============================================================================
// RESUMO DOS INSERTS REALIZADOS
// =============================================================================

console.log("\n📊 RESUMO FINAL DO SCRIPT CREATE:");
console.log("✅ Total de Sensores: 12");
console.log("✅ Total de Leituras de Energia: 15");
console.log("✅ Total de Alertas: 12");
console.log("✅ Total de Ações de Sustentabilidade: 11");
console.log("✅ Total de Relatórios de Compliance: 10");
console.log("✅ TOTAL DE DOCUMENTOS INSERIDOS: 60");
console.log("\n✅ Script CREATE finalizado com sucesso!");
console.log("\n📌 Próximo passo: Execute ecomonitor_read.js para consultar os dados");

// =============================================================================
// FIM DO SCRIPT CREATE
// =============================================================================
