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
      'home.optional': 'Optional: set Home to start the survey near takeoff. The CSV contains survey waypoints only.',
      'home.pickHint': 'Choose a point on the map to set home.',
      'home.ready': 'Home set. Drag its marker to move it. The survey starts near Home.', 'home.popup': 'Home',
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
      title: 'Σχέδιο πτήσης drone | Survey Planner',
      description: 'Ορίστε την περιοχή πτήσης, δείτε το σχέδιο στον χάρτη και κατεβάστε τα σημεία σε CSV.',
      'aria.controls': 'Στοιχεία σχεδίου πτήσης', 'aria.map': 'Χάρτης σχεδίου πτήσης',
      'aria.preferences': 'Προτιμήσεις προβολής', 'aria.language': 'Γλώσσα', 'aria.appearance': 'Θέμα',
      'label.language': 'Γλώσσα', 'label.appearance': 'Θέμα',
      'theme.system': 'Συσκευή', 'theme.light': 'Φωτεινό', 'theme.dark': 'Σκοτεινό',
      eyebrow: 'ΣΧΕΔΙΟ ΠΤΗΣΗΣ', heading: 'Σχεδιάστε την πτήση σας',
      introduction: 'Σημειώστε την περιοχή στον χάρτη, ορίστε το ύψος πτήσης και ελέγξτε το σχέδιο πριν το κατεβάσετε.',
      'area.title': 'Περιοχή πτήσης', 'flight.title': 'Στοιχεία πτήσης',
      'altitude.label': 'Ύψος πτήσης από το έδαφος', 'altitude.unit': 'μέτρα',
      'home.set': 'Σημείο απογείωσης', 'home.pick': 'Επιλέξτε στον χάρτη', 'home.clear': 'Αφαίρεση',
      'home.setTitle': 'Ορίστε το σημείο απογείωσης στον χάρτη', 'home.clearTitle': 'Αφαιρέστε το σημείο απογείωσης',
      'home.optional': 'Προαιρετικά: ορίστε την απογείωση ώστε το σχέδιο να αρχίζει κοντά της. Το CSV περιέχει μόνο τα σημεία αποτύπωσης.',
      'home.pickHint': 'Επιλέξτε το σημείο απογείωσης στον χάρτη.',
      'home.ready': 'Ορίστηκε η απογείωση. Σύρετε το εικονίδιο για αλλαγή. Η αποτύπωση ξεκινά κοντά της.', 'home.popup': 'Απογείωση',
      // Keep camera controls and their technical labels in English.
      'settings.toggle': 'Camera and overlap settings', 'settings.title': 'Camera and overlap',
      'settings.close': 'Close', 'settings.sensor': 'Sensor W/H (mm)',
      'settings.sensorWidth': 'Sensor width in millimetres', 'settings.sensorHeight': 'Sensor height in millimetres',
      'settings.focal': 'Focal length (mm)', 'settings.image': 'Image W/H (px)',
      'settings.imageWidth': 'Image width in pixels', 'settings.imageHeight': 'Image height in pixels',
      'settings.overlap': 'Overlap F/S (%)', 'settings.frontOverlap': 'Front overlap percentage',
      'settings.sideOverlap': 'Side overlap percentage', 'settings.turnaround': 'Turnaround (m)',
      'settings.gsd': 'Estimated ground resolution',
      'settings.hint': 'These settings apply when you generate the route.',
      'route.title': 'Δημιουργία σχεδίου πτήσης', 'route.generate': 'Δημιουργία σχεδίου πτήσης',
      'route.start': 'Πρώτα ορίστε την περιοχή στον χάρτη.',
      'route.changed': 'Η περιοχή άλλαξε. Δημιουργήστε νέο σχέδιο πτήσης.',
      'route.noExport': 'Δημιουργήστε σχέδιο πτήσης πριν κατεβάσετε τα σημεία.',
      'route.noArea': 'Ορίστε πρώτα την περιοχή πτήσης.',
      'route.altitude': 'Το ύψος πτήσης πρέπει να είναι από 1 έως 500 μέτρα.',
      'route.calculating': 'Δημιουργείται το σχέδιο πτήσης…',
      'route.empty': 'Δεν βρέθηκαν σημεία πτήσης. Αλλάξτε την περιοχή ή τις ρυθμίσεις και δοκιμάστε ξανά.',
      'route.ready': 'Το σχέδιο πτήσης είναι έτοιμο. Ελέγξτε τα σημεία στον χάρτη και κατεβάστε το CSV.',
      'route.failed': 'Δεν δημιουργήθηκε σχέδιο πτήσης. Δοκιμάστε ξανά.',
      'route.waypoints': 'Σημεία πτήσης', 'route.length': 'Συνολική απόσταση',
      'route.csv': 'Λήψη σημείων σε CSV',
      'route.safety': 'Πριν πετάξετε, ελέγξτε το ανάγλυφο, τον εναέριο χώρο και τα όρια του drone.',
      'waypoints.title': 'Σημεία πτήσης',
      'waypoints.hint': 'Επιλέξτε ένα σημείο για να το δείτε στον χάρτη. Το CSV περιέχει όλα τα σημεία.',
      'waypoints.previous': 'Προηγούμενα', 'waypoints.next': 'Επόμενα',
      'waypoints.range': '{start}–{end} από {total}',
      'waypoints.label': 'Σημείο {number}: {type}',
      'waypoints.altitude': 'Ύψος {altitude} m',
      'waypoints.summary': '{count} σημεία πτήσης · {distance}',
      'type.SurveyEntry': 'Αρχή γραμμής', 'type.SurveyExit': 'Τέλος γραμμής',
      'type.Turnaround': 'Στροφή', 'type.InteriorTrigger': 'Φωτογράφιση',
      'type.Waypoint': 'Σημείο πτήσης',
      'map.full': 'Πλήρης χάρτης', 'map.close': 'Κλείσιμο χάρτη', 'map.open': 'Άνοιγμα πλήρους χάρτη',
      'map.draw': 'Ορισμός περιοχής', 'map.undo': 'Αναίρεση', 'map.finish': 'Ολοκλήρωση', 'map.cancel': 'Ακύρωση',
      'map.viewWaypoints': 'Σημεία πτήσης',
      'map.startTouch': 'Πατήστε «Ορισμός περιοχής» και σημειώστε τα όρια στον χάρτη.',
      'map.startMouse': 'Επιλέξτε «Ορισμός περιοχής» και σημειώστε τα όρια στον χάρτη.',
      'map.placeTouch': 'Πατήστε στον χάρτη για νέα γωνία. Σύρετε τον χάρτη για μετακίνηση.',
      'map.placeMouse': 'Κάντε κλικ για νέα γωνία. Σύρετε τον χάρτη για μετακίνηση.',
      'map.drawingTouch': 'Γωνίες: {count}. Πατήστε για την επόμενη ή σύρετε μια γωνία για διόρθωση.',
      'map.drawingMouse': 'Γωνίες: {count}. Κάντε κλικ για την επόμενη ή σύρετε μια γωνία για διόρθωση.',
      'map.areaReady': 'Η περιοχή ορίστηκε. Σύρετε μια γωνία αν θέλετε να τη διορθώσετε.',
      'map.routeReady': 'Το σχέδιο πτήσης είναι έτοιμο. Επιλέξτε σημείο για λεπτομέρειες.',
      'map.instructionsTouch': 'Πατήστε «Ορισμός περιοχής» και σημειώστε τα όρια με αγγίγματα. Σύρετε μια γωνία για διόρθωση.',
      'map.instructionsMouse': 'Επιλέξτε «Ορισμός περιοχής» και σημειώστε τα όρια με κλικ. Σύρετε μια γωνία για διόρθωση.',
      'map.dragCorner': 'Σύρετε τη γωνία {number}',
      'area.none': 'Δεν έχει οριστεί περιοχή', 'area.placed': 'Γωνίες: {count}',
      'area.selected': 'Περιοχή με {count} γωνίες', 'area.cornerOne': 'γωνία', 'area.cornerMany': 'γωνίες',
      'gsd.altitude': 'Ύψος πτήσης {altitude} m',
      'error.invalidRequest': 'Δεν στάλθηκαν σωστά τα στοιχεία. Δοκιμάστε ξανά.',
      'error.polygonCount': 'Η περιοχή πρέπει να έχει από 3 έως 200 γωνίες.',
      'error.polygonCoordinates': 'Κάποια σημεία της περιοχής δεν είναι έγκυρα.'
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
