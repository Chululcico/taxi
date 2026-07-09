$files = Get-ChildItem "C:\Users\diego\Desktop\Personal\taxi\*.html"

$map = [System.Collections.Specialized.OrderedDictionary]@{}
$pairs = @(
  # á replacements
  'est?s', 'estás'
  'est?', 'está'
  'est?n', 'están'
  'alg?n', 'algún'
  'Llegar?s', 'Llegarás'
  'tendr?s', 'tendrás'
  'Recibir?s', 'Recibirás'
  'usar?n', 'usarán'
  'ayudar?', 'ayudará'
  'esperar?', 'esperará'
  'autom?tico', 'automático'
  'pr?ctica', 'práctica'
  'm?xima', 'máxima'
  'm?ximo', 'máximo'
  'm?nimo', 'mínimo'
  'r?pidos', 'rápidos'
  'p?blico', 'público'
  'p?rdida', 'pérdida'
  'p?rdidas', 'pérdidas'
  'emblem?ticos', 'emblemáticos'
  'm?dica', 'médica'
  'm?dicas', 'médicas'
  'm?dico', 'médico'
  'av?sanos', 'avísanos'
  'dep?sitos', 'depósitos'
  'despu?', 'después'
  'atr?s', 'atrás'
  'arn?s', 'arnés'
  'estr?s', 'estrés'
  'inter?s', 'interés'
  'autob?s', 'autobús'
  'autom?tico', 'automático'
  'h?brido', 'híbrido'
  'neum?tica', 'neumática'
  'peri?dicamente', 'periódicamente'
  'peri?dicas', 'periódicas'
  'd?a', 'día'
  'd?as', 'días'

  # é replacements
  'beb?', 'bebé'
  'c?ntimo', 'céntimo'
  'lleg?', 'llegó'
  'Conf?a', 'Confía'
  'aqu?', 'aquí'

  # ó replacements 
  'lleg?', 'llegó'

  # í replacements
  'Dal?', 'Dalí'
  'aqu?', 'aquí'

  # ú replacements
  'seg?n', 'según'
  'alg?n', 'algún'
  'c?modo', 'cómodo'
  'c?modamente', 'cómodamente'
  'autob?s', 'autobús'
  't? ', 'tú '
  'T? ', 'Tú '
  't?\'', 'tú\''

  # è/à/ò
  'Vall?s', 'Vallès'
  'Adri?', 'Adrià'
  'Barcelon?s', 'Barcelonès'

  # ñ
  'Catalu?a', 'Cataluña'
  'monta?a', 'montaña'
  'tama?o', 'tamaño'
  'dise?o', 'diseño'
  'dise?ado', 'diseñado'
  'redise?ado', 'rediseñado'
  'se?alizadas', 'señalizadas'
  'acompa?antes', 'acompañantes'
  'peque?os', 'pequeños'
  'peque?o', 'pequeño'
  'peque?a', 'pequeña'
  'ni?os', 'niños'
  'a?os', 'años'
  'rese?as', 'reseñas'
  'Rese?as', 'Reseñas'
  'Espa?a', 'España'
  'Espa?ola', 'Española'
  'espa?ola', 'española'
  'espa?ol', 'español'
  'compa??a', 'compañía'
  'compa?ero', 'compañero'
  'acompa?amiento', 'acompañamiento'

  # ¿
  '?Hablamos', '¿Hablamos'
  '?Necesitas', '¿Necesitas'
  '?Llegas', '¿Llegas'
  '?Cubres', '¿Cubres'
  '?Tienes', '¿Tienes'
  '?Vuelves', '¿Vuelves'
  '?Qu?', '¿Qué'
  '?Qu', '¿Qué'
  '?C', '¿C'
  '?H', '¿H'
  '?P', '¿P'
  '?D', '¿D'
  '?A', '¿A'
  '?S', '¿S'
  '?E', '¿E'
  '?T', '¿T'

  # ç
  '?gil', 'ágil'

  # -ción words
  'atenci?n', 'atención'
  'facturaci?n', 'facturación'
  'conexi?n', 'conexión'
  'informaci?n', 'información'
  'navegaci?n', 'navegación'
  'situaci?n', 'situación'
  'configuraci?n', 'configuración'
  'actualizaci?n', 'actualización'
  'direcci?n', 'dirección'
  'promoci?n', 'promoción'
  'reproducci?n', 'reproducción'
  'distribuci?n', 'distribución'
  'modificaci?n', 'modificación'
  'modificacio?n', 'modificación'
  'autorizaci?n', 'autorización'
  'exenci?n', 'exención'
  'legislaci?n', 'legislación'
  'conservaci?n', 'conservación'
  'ejecuci?n', 'ejecución'
  'contrataci?n', 'contratación'
  'geograf?a', 'geografía'
  'infracci?n', 'infracción'
  'Instrucci?n', 'Instrucción'
  'instrucci?n', 'instrucción'
  'secci?n', 'sección'
  'petici?n', 'petición'
  'comunicaci?n', 'comunicación'
  'personalizaci?n', 'personalización'
  'aceptaci?n', 'aceptación'
  'cancelaci?n', 'cancelación'
  'excursi?n', 'excursión'
  'ocasi?n', 'ocasión'
  'antelaci?n', 'antelación'
  'valoraci?n', 'valoración'
  'valoraci?nes', 'valoraciones'
  'Confirmaci?n', 'Confirmación'
  'formaci?n', 'formación'
  'climatizaci?n', 'climatización'
  'regulaci?n', 'regulación'
  'supresi?n', 'supresión'
  'obligaci?n', 'obligación'
  'reclamaci?n', 'reclamación'
  'reclamaci?nes', 'reclamaciones'
  'Protecci?n', 'Protección'
  'documentaci?n', 'documentación'
  'conducci?n', 'conducción'
  'estaci?n', 'estación'
  'regi?n', 'región'
  'relaci?n', 'relación'
  'sujeci?n', 'sujeción'
  'suspensi?n', 'suspensión'
  'vinculaci?n', 'vinculación'
  'monitorizaci?n', 'monitorización'
  'insonorizaci?n', 'insonorización'
  'Legitimaci?n', 'Legitimación'
  'Conservaci?n', 'Conservación'

  # Others
  'trav?s', 'través'
  'tambi?n', 'también'
  'Tambi?n', 'También'
  'Gesti?n', 'Gestión'
  'Duraci?n', 'Duración'
  'Pol?tica', 'Política'
  'pol?tica', 'política'
  'pol?ticas', 'políticas'
  '?rea', 'Área'
  'im?genes', 'imágenes'
  'Men?', 'Menú'
  'Ll?manos', 'Llámanos'
  '?ltima', 'Última'
  'da?os', 'daños'
  'c?mo', 'cómo'
  'C?mo', 'Cómo'
  'd?nde', 'dónde'
  'D?nde', 'Dónde'
  'cu?ndo', 'cuándo'
  'Cu?ndo', 'Cuándo'
  'M?laga', 'Málaga'
  'avi?n', 'avión'
  'espec?fica', 'específica'
  'espec?ficas', 'específicas'
  'espec?ficos', 'específicos'
  'Anal?ticas', 'Analíticas'
  'an?nima', 'anónima'
  'b?sico', 'básico'
  't?cnicas', 'técnicas'
  't?cnicos', 'técnicos'
  't?cnica', 'técnica'
  't?cnico', 'técnico'
  'Secci?n', 'Sección'
  'Cont?ctanos', 'Contáctanos'
  'Descripci?n', 'Descripción'
  'tr?fico', 'tráfico'
  'p?gina', 'página'
  's? ', 'sí '
  'S? ', 'Sí '
  'Qu?', 'Qué'
  'garant?as', 'garantías'
  'garant?a', 'garantía'
  'el?ctrica', 'eléctrica'
  'el?ctrico', 'eléctrico'
  'leg?timo', 'legítimo'
  'Bel?n', 'Belén'
  'monovol?menes', 'monovolúmenes'
  'Monovol?menes', 'Monovolúmenes'
  'Sesi?n', 'Sesión'
  'autob?s', 'autobús'
  'autob?sp', 'autobús'
  'Vall?sp', 'Vallès'
  'repetir?', 'repetirá'
  'peque?ap', 'pequeña'
  'atr?sp', 'atrás'
  'despu?sp', 'después'
  'alteraci?np', 'alteración'
  'Barcelona?', 'Barcelona'
  'crucero?', 'crucero'
  'servicio?', 'servicio'
  'nacional?', 'nacional'
  'ciudad?h2', 'ciudad'
)

for ($i = 0; $i -lt $pairs.Count; $i += 2) {
  $key = $pairs[$i]
  $val = $pairs[$i+1]
  if (!$map.Contains($key)) {
    $map[$key] = $val
  }
}

$totalFixes = 0
$fixedFiles = 0

foreach ($f in $files) {
  $path = $f.FullName
  $bytes = [System.IO.File]::ReadAllBytes($path)
  $text = [System.Text.Encoding]::UTF8.GetString($bytes)
  $original = $text
  $fileFixes = 0
  foreach ($key in $map.Keys) {
    $val = $map[$key]
    if ($text.Contains($key)) {
      $count = [regex]::Matches($text, [regex]::Escape($key)).Count
      $text = $text -replace [regex]::Escape($key), $val
      $fileFixes += $count
    }
  }
  if ($fileFixes -gt 0) {
    [System.IO.File]::WriteAllText($path, $text, [System.Text.Encoding]::UTF8)
    Write-Output "✓ $($f.Name) ($fileFixes fixes)"
    $fixedFiles++
    $totalFixes += $fileFixes
  }
}

Write-Output "Total: $totalFixes fixes in $fixedFiles files"

# Save to summary
$summary = @{}
foreach ($f in $files) {
  $path = $f.FullName
  $text = [System.Text.Encoding]::UTF8.GetString([System.IO.File]::ReadAllBytes($path))
  $lines = $text -split "`n"
  for ($i = 0; $i -lt $lines.Count; $i++) {
    if ($lines[$i] -match '\?' -and $lines[$i] -notmatch 'https?://' -and $lines[$i] -notmatch 'text=Hola') {
      $summary[$f.Name] = $summary[$f.Name] + 1 | Out-Null
    }
  }
}
Write-Output "Files with remaining ?: $($summary.Count)"
$summary.Keys | ForEach-Object { Write-Output "  $_: $($summary[$_])" }
