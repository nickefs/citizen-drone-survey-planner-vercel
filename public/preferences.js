(() => {
  const copy = {
    en: {
      title: 'UAV Survey Planner | Plan and export waypoints',
      description: 'Draw a survey area, generate UAV waypoints and export a flight route for review.',
      'aria.controls': 'Survey controls', 'aria.map': 'Interactive survey map',
      'aria.preferences': 'Display preferences', 'aria.language': 'Language', 'aria.appearance': 'Appearance',
      'label.language': 'Language', 'label.appearance': 'Appearance',
      'theme.system': 'Auto', 'theme.light': 'Light', 'theme.dark': 'Dark',
      eyebrow: 'Flight planning', heading: 'Plan your survey',
      introduction: 'Draw an area, choose your flight settings, and review the route before exporting it.',
      'area.title': 'Survey area', 'flight.title': 'Flight settings',
      'altitude.label': 'Altitude above ground', 'altitude.unit': 'metres',
      'home.set': 'Set home point', 'home.pick': 'Select on map', 'home.clear': 'Clear',
      'home.setTitle': 'Choose a takeoff point on the map', 'home.clearTitle': 'Remove the home point',
      'home.optional': 'Optional: choose where the aircraft starts.',
      'home.pickHint': 'Choose a point on the map to set home.',
      'home.ready': 'Home point set. Drag its marker to move it.', 'home.popup': 'Home',
      'settings.toggle': 'Camera and overlap settings', 'settings.title': 'Camera and overlap',
      'settings.close': 'Close', 'settings.sensor': 'Sensor W/H (mm)',
      'settings.sensorWidth': 'Sensor width in millimetres', 'settings.sensorHeight': 'Sensor height in millimetres',
      'settings.focal': 'Focal length (mm)', 'settings.image': 'Image W/H (px)',
      'settings.imageWidth': 'Image width in pixels', 'settings.imageHeight': 'Image height in pixels',
      'settings.overlap': 'Overlap F/S (%)', 'settings.frontOverlap': 'Front overlap percentage',
      'settings.sideOverlap': 'Side overlap percentage', 'settings.turnaround': 'Turnaround (m)',
      'settings.gsd': 'Estimated ground resolution',
      'settings.hint': 'These settings apply when you generate the route.',
      'route.title': 'Generate route', 'route.generate': 'Generate survey route',
      'route.start': 'Draw an area to get started.', 'route.changed': 'Area changed. Generate a new route to continue.',
      'route.noExport': 'Generate a route before downloading waypoints.',
      'route.noArea': 'Draw a survey area first.', 'route.altitude': 'Enter an altitude between 1 and 500 metres.',
      'route.calculating': 'Calculating your survey route…',
      'route.empty': 'No waypoints were generated. Try another area or flight setting.',
      'route.ready': 'Route ready. Review it on the map, then download the waypoints.',
      'route.failed': 'The route could not be generated. Please try again.',
      'route.waypoints': 'Waypoints', 'route.length': 'Route length',
      'route.csv': 'Download waypoint CSV',
      'route.safety': 'Review the route against terrain, airspace, and aircraft limits before flying.',
      'waypoints.title': 'Waypoints',
      'waypoints.hint': 'Select a waypoint to locate it on the map. The CSV contains the full route.',
      'waypoints.previous': 'Previous', 'waypoints.next': 'Next',
      'waypoints.range': '{start}–{end} of {total}',
      'waypoints.label': 'Waypoint {number}: {type}',
      'waypoints.altitude': '{altitude} m altitude',
      'waypoints.summary': '{count} waypoints · {distance}',
      'type.SurveyEntry': 'Survey entry', 'type.SurveyExit': 'Survey exit',
      'type.Turnaround': 'Turnaround', 'type.InteriorTrigger': 'Photo trigger',
      'type.Waypoint': 'Waypoint',
      'map.full': 'Full map', 'map.close': 'Close full map', 'map.open': 'Open full map',
      'map.draw': 'Draw area', 'map.undo': 'Undo', 'map.finish': 'Finish area', 'map.cancel': 'Cancel',
      'map.viewWaypoints': 'View waypoints',
      'map.zoomIn': 'Zoom in', 'map.zoomOut': 'Zoom out',
      'map.startTouch': 'Tap Draw area to start. Drag the map to look around.',
      'map.startMouse': 'Click Draw area to start. Drag the map to look around.',
      'map.placeTouch': 'Tap the map to place a corner. Drag to move the map.',
      'map.placeMouse': 'Click the map to place a corner. Drag to move the map.',
      'map.drawingTouch': '{count} {corners} placed. Tap the map to add another, or drag a corner to move it.',
      'map.drawingMouse': '{count} {corners} placed. Click the map to add another, or drag a corner to move it.',
      'map.areaReady': 'Drag a corner to adjust the area, then generate a route.',
      'map.routeReady': 'Route ready. Select a waypoint to inspect it.',
      'map.instructionsTouch': 'Tap Draw area, then tap the map to place corners. Drag any corner to adjust it.',
      'map.instructionsMouse': 'Click Draw area, then click the map to place corners. Drag any corner to adjust it.',
      'map.dragCorner': 'Drag corner {number}',
      'area.none': 'No area drawn yet', 'area.placed': '{count} {corners} placed',
      'area.selected': '{count} corners selected', 'area.cornerOne': 'corner', 'area.cornerMany': 'corners',
      'gsd.altitude': 'at {altitude} m altitude',
      'error.invalidRequest': 'Invalid request',
      'error.polygonCount': 'The area needs between 3 and 200 corners.',
      'error.polygonCoordinates': 'The area contains invalid coordinates.'
    },
    el: {
      title: 'Σχεδιαστής εναέριας αποτύπωσης | Σχεδιασμός και εξαγωγή σημείων διαδρομής',
      description: 'Ορίστε την περιοχή αποτύπωσης, δημιουργήστε σημεία διαδρομής για το drone και εξαγάγετε τη διαδρομή πτήσης.',
      'aria.controls': 'Ρυθμίσεις αποτύπωσης', 'aria.map': 'Διαδραστικός χάρτης αποτύπωσης',
      'aria.preferences': 'Προτιμήσεις εμφάνισης', 'aria.language': 'Γλώσσα', 'aria.appearance': 'Εμφάνιση',
      'label.language': 'Γλώσσα', 'label.appearance': 'Εμφάνιση',
      'theme.system': 'Αυτόματο', 'theme.light': 'Φωτεινό', 'theme.dark': 'Σκοτεινό',
      eyebrow: 'ΣΧΕΔΙΑΣΜΟΣ ΠΤΗΣΗΣ', heading: 'Σχεδιάστε την αποτύπωσή σας',
      introduction: 'Ορίστε μια περιοχή, επιλέξτε τις ρυθμίσεις πτήσης και ελέγξτε τη διαδρομή πριν την εξαγάγετε.',
      'area.title': 'Περιοχή αποτύπωσης', 'flight.title': 'Ρυθμίσεις πτήσης',
      'altitude.label': 'Ύψος πάνω από το έδαφος', 'altitude.unit': 'μέτρα',
      'home.set': 'Ορισμός αφετηρίας', 'home.pick': 'Πατήστε στον χάρτη', 'home.clear': 'Αφαίρεση',
      'home.setTitle': 'Επιλέξτε σημείο απογείωσης στον χάρτη', 'home.clearTitle': 'Αφαιρέστε την αφετηρία',
      'home.optional': 'Προαιρετικά, ορίστε το σημείο εκκίνησης του αεροσκάφους.',
      'home.pickHint': 'Πατήστε σε ένα σημείο του χάρτη για να ορίσετε την αφετηρία.',
      'home.ready': 'Η αφετηρία ορίστηκε. Σύρετε τον δείκτη της για να τη μετακινήσετε.', 'home.popup': 'Αφετηρία',
      'settings.toggle': 'Ρυθμίσεις κάμερας και επικάλυψης', 'settings.title': 'Κάμερα και επικάλυψη',
      'settings.close': 'Κλείσιμο', 'settings.sensor': 'Αισθητήρας Π/Υ (mm)',
      'settings.sensorWidth': 'Πλάτος αισθητήρα σε χιλιοστά', 'settings.sensorHeight': 'Ύψος αισθητήρα σε χιλιοστά',
      'settings.focal': 'Εστιακή απόσταση (mm)', 'settings.image': 'Εικόνα Π/Υ (px)',
      'settings.imageWidth': 'Πλάτος εικόνας σε pixel', 'settings.imageHeight': 'Ύψος εικόνας σε pixel',
      'settings.overlap': 'Επικάλυψη εμπρός/πλάγια (%)', 'settings.frontOverlap': 'Ποσοστό εμπρόσθιας επικάλυψης',
      'settings.sideOverlap': 'Ποσοστό πλευρικής επικάλυψης', 'settings.turnaround': 'Απόσταση στροφής (m)',
      'settings.gsd': 'Εκτιμώμενη ανάλυση εδάφους',
      'settings.hint': 'Οι ρυθμίσεις αυτές εφαρμόζονται κατά τη δημιουργία της διαδρομής.',
      'route.title': 'Δημιουργία διαδρομής', 'route.generate': 'Δημιουργία διαδρομής αποτύπωσης',
      'route.start': 'Ορίστε μια περιοχή για να ξεκινήσετε.',
      'route.changed': 'Η περιοχή άλλαξε. Δημιουργήστε ξανά τη διαδρομή.',
      'route.noExport': 'Δημιουργήστε διαδρομή πριν εξαγάγετε τα σημεία.',
      'route.noArea': 'Ορίστε πρώτα μια περιοχή αποτύπωσης.',
      'route.altitude': 'Εισαγάγετε ύψος από 1 έως 500 μέτρα.',
      'route.calculating': 'Υπολογίζεται η διαδρομή αποτύπωσης…',
      'route.empty': 'Δεν δημιουργήθηκαν σημεία διαδρομής. Δοκιμάστε άλλη περιοχή ή ρύθμιση πτήσης.',
      'route.ready': 'Η διαδρομή είναι έτοιμη. Ελέγξτε την στον χάρτη και εξαγάγετε τα σημεία.',
      'route.failed': 'Δεν ήταν δυνατή η δημιουργία της διαδρομής. Δοκιμάστε ξανά.',
      'route.waypoints': 'Σημεία διαδρομής', 'route.length': 'Μήκος διαδρομής',
      'route.csv': 'Λήψη σημείων σε CSV',
      'route.safety': 'Πριν από την πτήση, ελέγξτε τη διαδρομή με βάση το ανάγλυφο, τον εναέριο χώρο και τα όρια του αεροσκάφους.',
      'waypoints.title': 'Σημεία διαδρομής',
      'waypoints.hint': 'Επιλέξτε σημείο για να το βρείτε στον χάρτη. Το CSV περιλαμβάνει ολόκληρη τη διαδρομή.',
      'waypoints.previous': 'Προηγούμενα', 'waypoints.next': 'Επόμενα',
      'waypoints.range': '{start}–{end} από {total}',
      'waypoints.label': 'Σημείο {number}: {type}',
      'waypoints.altitude': 'Ύψος {altitude} m',
      'waypoints.summary': '{count} σημεία · {distance}',
      'type.SurveyEntry': 'Έναρξη αποτύπωσης', 'type.SurveyExit': 'Λήξη αποτύπωσης',
      'type.Turnaround': 'Σημείο στροφής', 'type.InteriorTrigger': 'Λήψη φωτογραφίας',
      'type.Waypoint': 'Σημείο διαδρομής',
      'map.full': 'Πλήρης χάρτης', 'map.close': 'Κλείσιμο χάρτη', 'map.open': 'Άνοιγμα πλήρους χάρτη',
      'map.draw': 'Σχεδίαση περιοχής', 'map.undo': 'Αναίρεση', 'map.finish': 'Ολοκλήρωση περιοχής', 'map.cancel': 'Ακύρωση',
      'map.viewWaypoints': 'Προβολή σημείων',
      'map.zoomIn': 'Μεγέθυνση', 'map.zoomOut': 'Σμίκρυνση',
      'map.startTouch': 'Πατήστε Σχεδίαση περιοχής για να ξεκινήσετε. Σύρετε τον χάρτη για να μετακινηθείτε.',
      'map.startMouse': 'Επιλέξτε Σχεδίαση περιοχής για να ξεκινήσετε. Σύρετε τον χάρτη για να μετακινηθείτε.',
      'map.placeTouch': 'Πατήστε στον χάρτη για να προσθέσετε γωνία. Σύρετε για να μετακινήσετε τον χάρτη.',
      'map.placeMouse': 'Κάντε κλικ στον χάρτη για να προσθέσετε γωνία. Σύρετε για να μετακινήσετε τον χάρτη.',
      'map.drawingTouch': 'Γωνίες: {count}. Πατήστε στον χάρτη για άλλη μία ή σύρετε μια γωνία για να τη μετακινήσετε.',
      'map.drawingMouse': 'Γωνίες: {count}. Κάντε κλικ στον χάρτη για άλλη μία ή σύρετε μια γωνία για να τη μετακινήσετε.',
      'map.areaReady': 'Σύρετε μια γωνία για να αλλάξετε την περιοχή και έπειτα δημιουργήστε διαδρομή.',
      'map.routeReady': 'Η διαδρομή είναι έτοιμη. Επιλέξτε σημείο για να το δείτε.',
      'map.instructionsTouch': 'Πατήστε Σχεδίαση περιοχής και μετά στον χάρτη για να προσθέσετε γωνίες. Σύρετε μια γωνία για να τη μετακινήσετε.',
      'map.instructionsMouse': 'Επιλέξτε Σχεδίαση περιοχής και κάντε κλικ στον χάρτη για να προσθέσετε γωνίες. Σύρετε μια γωνία για να τη μετακινήσετε.',
      'map.dragCorner': 'Σύρετε τη γωνία {number}',
      'area.none': 'Δεν έχει οριστεί περιοχή', 'area.placed': 'Γωνίες: {count}',
      'area.selected': 'Επιλέχθηκαν {count} γωνίες', 'area.cornerOne': 'γωνία', 'area.cornerMany': 'γωνίες',
      'gsd.altitude': 'σε ύψος {altitude} m',
      'error.invalidRequest': 'Μη έγκυρο αίτημα',
      'error.polygonCount': 'Η περιοχή χρειάζεται από 3 έως 200 γωνίες.',
      'error.polygonCoordinates': 'Η περιοχή περιέχει μη έγκυρες συντεταγμένες.'
    }
  };
  const saved = key => { try { return localStorage.getItem(key); } catch { return null; } };
  const save = (key, value) => { try { localStorage.setItem(key, value); } catch { /* Storage can be disabled. */ } };
  const queryLanguage = new URLSearchParams(location.search).get('lang');
  let language = ['en', 'el'].includes(queryLanguage) ? queryLanguage : (saved('survey-language') || (navigator.language.toLowerCase().startsWith('el') ? 'el' : 'en'));
  if (!copy[language]) language = 'en';
  if (['en', 'el'].includes(queryLanguage)) save('survey-language', language);
  let theme = ['system', 'light', 'dark'].includes(saved('survey-theme')) ? saved('survey-theme') : 'system';
  const deviceDark = matchMedia('(prefers-color-scheme: dark)');
  const applyTheme = () => {
    document.documentElement.dataset.effectiveTheme = theme === 'system' ? (deviceDark.matches ? 'dark' : 'light') : theme;
    document.querySelectorAll('[data-theme-choice]').forEach(button => button.setAttribute('aria-pressed', String(button.dataset.themeChoice === theme)));
  };
  applyTheme();
  deviceDark.addEventListener('change', () => { if (theme === 'system') applyTheme(); });
  const t = (key, params = {}) => (copy[language][key] || copy.en[key] || key).replace(/\{(\w+)\}/g, (_, name) => String(params[name] ?? ''));
  const message = (element, key, params = {}) => {
    element.dataset.messageKey = key;
    element.dataset.messageParams = JSON.stringify(params);
    element.textContent = t(key, params);
  };
  const labels = [
    ['.sidebar', 'aria.controls', 'aria-label'], ['.map-pane', 'aria.map', 'aria-label'],
    ['.preferences', 'aria.preferences', 'aria-label'],
    ['.preference-row:first-child .preference-options', 'aria.language', 'aria-label'],
    ['.preference-row:last-child .preference-options', 'aria.appearance', 'aria-label'],
    ['.preference-label.language', 'label.language'], ['.preference-label.appearance', 'label.appearance'],
    ['[data-theme-choice="system"]', 'theme.system'], ['[data-theme-choice="light"]', 'theme.light'], ['[data-theme-choice="dark"]', 'theme.dark'],
    ['.sidebar-heading .eyebrow', 'eyebrow'], ['.sidebar-heading h1', 'heading'], ['.sidebar-heading p', 'introduction'],
    ['#area-title', 'area.title'], ['#flight-title', 'flight.title'], ['#route-title', 'route.title'], ['#waypoints-title', 'waypoints.title'],
    ['.field-label[for="altInput"]', 'altitude.label', 'first'], ['.field-label[for="altInput"] span', 'altitude.unit'],
    ['#setHomeBtn', 'home.setTitle', 'title'], ['#clearHomeBtn', 'home.clear'], ['#clearHomeBtn', 'home.clearTitle', 'title'],
    ['#settingsBtn', 'settings.toggle', 'first'], ['#settingsTitle', 'settings.title'], ['#closeSettingsBtn', 'settings.close'],
    ['#closeSettingsBtn', 'settings.close', 'aria-label'],
    ['label[for="sensorWidthInput"]', 'settings.sensor'], ['#sensorWidthInput', 'settings.sensorWidth', 'aria-label'],
    ['#sensorHeightInput', 'settings.sensorHeight', 'aria-label'], ['label[for="focalLengthInput"]', 'settings.focal'],
    ['label[for="imageWidthInput"]', 'settings.image'], ['#imageWidthInput', 'settings.imageWidth', 'aria-label'],
    ['#imageHeightInput', 'settings.imageHeight', 'aria-label'], ['label[for="frontOverlapInput"]', 'settings.overlap'],
    ['#frontOverlapInput', 'settings.frontOverlap', 'aria-label'], ['#sideOverlapInput', 'settings.sideOverlap', 'aria-label'],
    ['label[for="turnaroundInput"]', 'settings.turnaround'], ['.gsdReadout span', 'settings.gsd'], ['.settingsHint', 'settings.hint'],
    ['#floatingSurveyBtn', 'route.generate', 'first'], ['#routeResult > div:first-child span', 'route.waypoints'],
    ['#routeResult > div:last-child span', 'route.length'], ['#exportCsvBtn', 'route.csv', 'first'], ['.safety-note', 'route.safety'],
    ['#waypointPanel > p', 'waypoints.hint'], ['#waypointPrev', 'waypoints.previous'], ['#waypointNext', 'waypoints.next'],
    ['#waypointPrev', 'waypoints.previous', 'aria-label'], ['#waypointNext', 'waypoints.next', 'aria-label'],
    ['#startAreaBtn', 'map.draw'], ['#undoCornerBtn', 'map.undo'], ['#finishAreaBtn', 'map.finish'],
    ['#cancelAreaBtn', 'map.cancel'], ['#showWaypointsBtn', 'map.viewWaypoints']
  ];
  const render = () => {
    document.documentElement.lang = language;
    document.title = t('title');
    document.querySelector('meta[name="description"]').content = t('description');
    for (const [selector, key, property] of labels) {
      const element = document.querySelector(selector);
      if (!element) continue;
      if (property === 'first') element.firstChild.nodeValue = `${t(key)} `;
      else if (property) element.setAttribute(property, t(key));
      else element.textContent = t(key);
    }
    document.querySelectorAll('[data-message-key]').forEach(element => {
      element.textContent = t(element.dataset.messageKey, JSON.parse(element.dataset.messageParams || '{}'));
    });
    document.querySelectorAll('[data-language-choice]').forEach(button => button.setAttribute('aria-pressed', String(button.dataset.languageChoice === language)));
    applyTheme();
  };
  const setLanguage = value => {
    if (!copy[value] || language === value) return;
    language = value;
    save('survey-language', language);
    render();
    document.dispatchEvent(new Event('survey:language'));
  };
  const setTheme = value => {
    if (!['system', 'light', 'dark'].includes(value)) return;
    theme = value;
    save('survey-theme', theme);
    applyTheme();
  };
  const init = () => {
    document.querySelectorAll('[data-language-choice]').forEach(button => button.addEventListener('click', () => setLanguage(button.dataset.languageChoice)));
    document.querySelectorAll('[data-theme-choice]').forEach(button => button.addEventListener('click', () => setTheme(button.dataset.themeChoice)));
    render();
  };
  window.ui = { t, message, init, setLanguage, setTheme, get language() { return language; }, get theme() { return theme; } };
})();
