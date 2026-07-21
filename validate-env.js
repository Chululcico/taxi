// ============================================
// Taxi Badalona Aeropuerto - validacion de entorno
// ============================================
// Ejecutar antes de cada deploy para verificar que todas
// las variables de entorno necesarias estan configuradas.
// 
// Uso: node validate-env.js
// Requiere: Node.js 14+
// ============================================

const fs = require('fs');
const path = require('path');

// Colores para la consola
const colors = {
    reset: '\x1b[0m',
    green: '\x1b[32m',
    yellow: '\x1b[33m',
    red: '\x1b[31m',
    cyan: '\x1b[36m',
    bold: '\x1b[1m'
};

// Variables de entorno requeridas (valor: [fallback, descripcion, obligatorio])
const requiredEnvVars = {
    // Core
    NODE_ENV: [null, 'Modo de operacion (development/testing/production)', true],
    SITE_DOMAIN: ['taxibadalonaaeropuerto.com', 'Dominio del sitio', true],
    SITE_URL: ['https://taxibadalonaaeropuerto.com', 'URL completa del sitio', true],
    
    // Contacto taxi
    TAXI_PHONE: ['+34628175162', 'Telefono del taxi en formato internacional', true],
    TAXI_PHONE_DISPLAY: ['628 17 51 62', 'Telefono para mostrar', true],
    TAXI_WHATSAPP_MESSAGE: [null, 'Mensaje predefinido de WhatsApp', true],
    
    // Email
    CONTACT_EMAIL: ['info@taxibadalonaaeropuerto.com', 'Email de contacto', true],
    
    // Desarrollador
    DEV_NAME: ['Diego Alejandro Acosta Paramo', 'Nombre del desarrollador', true],
    DEV_PHONE: ['+34675370050', 'Telefono del desarrollador', true],
    
    // Negocio
    BUSINESS_NAME: ['Taxi Badalona Aeropuerto', 'Nombre del negocio', true],
    BUSINESS_ADDRESS: ['Calle Industria 75 1o 1a', 'Direccion del negocio', true],
    BUSINESS_POSTAL: ['08914', 'Codigo postal', true],
    BUSINESS_CITY: ['Badalona', 'Ciudad', true],
    BUSINESS_PROVINCE: ['Barcelona', 'Provincia', true],
    BUSINESS_REGION: ['ES-CT', 'Region ISO', true],
    
    // Google Maps
    GOOGLE_MAPS_LAT: ['41.452759', 'Latitud de Google Maps', true],
    GOOGLE_MAPS_LNG: ['2.2347481', 'Longitud de Google Maps', true],
    GOOGLE_MAPS_URL: [null, 'URL de Google Maps', true],
    
    // SEO
    SEO_TITLE: ['Taxi Badalona Aeropuerto', 'Titulo SEO', true],
    SEO_DESCRIPTION: [null, 'Meta descripcion SEO', true],
    
    // Seguridad
    RATE_LIMIT_REQUESTS: ['60', 'Maximo de peticiones por ventana', true],
    RATE_LIMIT_WINDOW: ['60000', 'Ventana de tiempo en ms', true],
    CORS_ORIGIN: ['https://taxibadalonaaeropuerto.com', 'Origen permitido CORS', true],
    HSTS_MAX_AGE: ['31536000', 'Tiempo maximo HSTS en segundos', true],
    
    // Opcionales
    LOGO_URL: ['https://i.postimg.cc/C1b9L7d8/Chat-GPT-Image-9-jul-2026-01-01-41.png', 'URL del logo', false],
    HERO_IMAGE: [null, 'URL de la imagen hero', false],
    CSP_REPORT_URI: ['', 'URI de reporte CSP', false],
};

function loadEnvFile(filePath) {
    if (!fs.existsSync(filePath)) return {};
    
    const content = fs.readFileSync(filePath, 'utf8');
    const vars = {};
    
    content.split('\n').forEach(line => {
        line = line.trim();
        if (!line || line.startsWith('#')) return;
        
        const eqIndex = line.indexOf('=');
        if (eqIndex === -1) return;
        
        const key = line.substring(0, eqIndex).trim();
        const value = line.substring(eqIndex + 1).trim();
        vars[key] = value;
    });
    
    return vars;
}

function validateEnv() {
    console.log(`\n${colors.cyan}${colors.bold}=== Validacion de Variables de Entorno ===${colors.reset}\n`);
    
    // Intentar cargar .env
    const envPath = path.join(__dirname, '.env');
    const envVars = loadEnvFile(envPath);
    
    if (Object.keys(envVars).length === 0) {
        console.log(`${colors.yellow}AVISO: No se encontro archivo .env${colors.reset}`);
        console.log(`${colors.yellow}Usando variables de entorno del sistema o valores por defecto${colors.reset}\n`);
    } else {
        console.log(`${colors.green}Archivo .env cargado correctamente${colors.reset}\n`);
    }
    
    let errors = 0;
    let warnings = 0;
    let passed = 0;
    
    // Validar cada variable
    Object.entries(requiredEnvVars).forEach(([key, [fallback, description, required]]) => {
        const value = envVars[key] || process.env[key] || fallback;
        
        if (!value && required) {
            console.log(`${colors.red}FALTANTE ${colors.reset} ${key}`);
            console.log(`         ${colors.red}> ${description}${colors.reset}`);
            errors++;
        } else if (!value && !required) {
            console.log(`${colors.yellow}OPCIONAL ${colors.reset} ${key}`);
            console.log(`         ${colors.yellow}> ${description}${colors.reset}`);
            warnings++;
        } else {
            // Ocultar valores sensibles
            let displayValue = value;
            if (key.includes('PHONE') || key.includes('EMAIL') || key.includes('PASSWORD') || key.includes('SECRET')) {
                displayValue = value.substring(0, 4) + '***';
            }
            console.log(`${colors.green}OK ${colors.reset} ${key} = ${displayValue}`);
            passed++;
        }
    });
    
    // Verificar .gitignore
    console.log(`\n${colors.cyan}${colors.bold}=== Verificando archivos de seguridad ===${colors.reset}\n`);
    
    const gitignorePath = path.join(__dirname, '.gitignore');
    if (fs.existsSync(gitignorePath)) {
        const gitignore = fs.readFileSync(gitignorePath, 'utf8');
        const hasEnv = gitignore.includes('.env');
        const hasGit = gitignore.includes('.git');
        const hasNodeModules = gitignore.includes('node_modules');
        
        console.log(`${hasEnv ? colors.green : colors.red}${hasEnv ? 'OK' : 'FALTANTE'} ${colors.reset} .env en .gitignore`);
        console.log(`${hasGit ? colors.green : colors.red}${hasGit ? 'OK' : 'FALTANTE'} ${colors.reset} .git en .gitignore`);
        console.log(`${hasNodeModules ? colors.green : colors.red}${hasNodeModules ? 'OK' : colors.yellow}INFO'} ${colors.reset} node_modules en .gitignore`);
        
        if (!hasEnv) errors++;
        if (!hasGit) warnings++;
        if (!hasNodeModules) warnings++;
    } else {
        console.log(`${colors.red}FALTANTE${colors.reset} .gitignore no existe`);
        errors++;
    }
    
    // Verificar .htaccess
    const htaccessPath = path.join(__dirname, '.htaccess');
    if (fs.existsSync(htaccessPath)) {
        const htaccess = fs.readFileSync(htaccessPath, 'utf8');
        const hasSecurityHeaders = htaccess.includes('X-Frame-Options');
        const hasCSP = htaccess.includes('Content-Security-Policy');
        const hasHSTS = htaccess.includes('Strict-Transport-Security');
        const hasEnvProtection = htaccess.includes('.env');
        
        console.log(`${hasSecurityHeaders ? colors.green : colors.red}${hasSecurityHeaders ? 'OK' : 'FALTANTE'} ${colors.reset} Cabeceras de seguridad en .htaccess`);
        console.log(`${hasCSP ? colors.green : colors.red}${hasCSP ? 'OK' : 'FALTANTE'} ${colors.reset} Content-Security-Policy en .htaccess`);
        console.log(`${hasHSTS ? colors.green : colors.red}${hasHSTS ? 'OK' : 'FALTANTE'} ${colors.reset} HSTS en .htaccess`);
        console.log(`${hasEnvProtection ? colors.green : colors.red}${hasEnvProtection ? 'OK' : 'FALTANTE'} ${colors.reset} Proteccion .env en .htaccess`);
    } else {
        console.log(`${colors.red}FALTANTE${colors.reset} .htaccess no existe`);
        errors++;
    }
    
    // Verificar robots.txt
    const robotsPath = path.join(__dirname, 'robots.txt');
    if (fs.existsSync(robotsPath)) {
        const robots = fs.readFileSync(robotsPath, 'utf8');
        const hasSitemap = robots.includes('Sitemap:');
        const blocksEnv = robots.includes('.env');
        
        console.log(`${hasSitemap ? colors.green : colors.yellow}${hasSitemap ? 'OK' : 'WARN'} ${colors.reset} Sitemap en robots.txt`);
        console.log(`${blocksEnv ? colors.green : colors.yellow}${blocksEnv ? 'OK' : 'WARN'} ${colors.reset} Bloqueo .env en robots.txt`);
    }
    
    // Verificar sitemap.xml
    const sitemapPath = path.join(__dirname, 'sitemap.xml');
    if (fs.existsSync(sitemapPath)) {
        console.log(`${colors.green}OK ${colors.reset} sitemap.xml existe`);
    } else {
        console.log(`${colors.yellow}WARN${colors.reset} sitemap.xml no existe`);
        warnings++;
    }
    
    // Verificar .env.example
    const envExamplePath = path.join(__dirname, '.env.example');
    if (fs.existsSync(envExamplePath)) {
        console.log(`${colors.green}OK ${colors.reset} .env.example existe`);
    } else {
        console.log(`${colors.yellow}WARN${colors.reset} .env.example no existe`);
        warnings++;
    }
    
    // Resumen
    console.log(`\n${colors.cyan}${colors.bold}=== RESUMEN ===${colors.reset}\n`);
    console.log(`${colors.green}OK: ${passed}${colors.reset}`);
    console.log(`${colors.yellow}Warnings: ${warnings}${colors.reset}`);
    console.log(`${colors.red}Errors: ${errors}${colors.reset}`);
    
    if (errors > 0) {
        console.log(`\n${colors.red}${colors.bold}VALIDACION FALLIDA - Corregir errores antes de deploy${colors.reset}\n`);
        process.exit(1);
    } else {
        console.log(`\n${colors.green}${colors.bold}VALIDACION EXITOSA - Listo para deploy${colors.reset}\n`);
        process.exit(0);
    }
}

validateEnv();
