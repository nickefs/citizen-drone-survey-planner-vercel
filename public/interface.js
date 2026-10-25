(() => {
  const workspace = document.querySelector('.workspace');
  const expandButton = document.getElementById('expandMapBtn');
  const mapHint = document.getElementById('mapHint');
  const startAreaButton = document.getElementById('startAreaBtn');
  const cornerControls = document.getElementById('cornerControls');
  const undoButton = document.getElementById('undoCornerBtn');
  const finishButton = document.getElementById('finishAreaBtn');
  const cancelButton = document.getElementById('cancelAreaBtn');
  const mapSummary = document.getElementById('mapRouteSummary');
  const mapSummaryText = document.getElementById('mapRouteSummaryText');
  const waypointPanel = document.getElementById('waypointPanel');
  const waypointList = document.getElementById('waypointList');
  const selectedWaypoint = document.getElementById('selectedWaypoint');
  const prevButton = document.getElementById('waypointPrev');
  const nextButton = document.getElementById('waypointNext');
  const waypointRange = document.getElementById('waypointRange');
  const mobile = window.matchMedia('(pointer: coarse)').matches;
  const embedded = window.self !== window.top;
  const settingIds = ['altInput', 'sensorWidthInput', 'sensorHeightInput', 'focalLengthInput', 'imageWidthInput', 'imageHeightInput', 'frontOverlapInput', 'sideOverlapInput', 'turnaroundInput'];

  function planForNewTab() {
    const polygon = getMainPolygonLatLngs();
    return {
      polygon: polygon?.map(point => [Number(point.lat.toFixed(7)), Number(point.lon.toFixed(7))]) || null,
      home: homeLatLng ? [Number(homeLatLng.lat.toFixed(7)), Number(homeLatLng.lng.toFixed(7))] : null,
      settings: settingIds.map(id => document.getElementById(id).value),
      routeReady: lastWaypoints.length > 0,
      center: [map.getCenter().lat, map.getCenter().lng],
      zoom: map.getZoom()
    };
  }
  function restorePlan(raw) {
    if (!raw || raw.length > 20000) return;
    try {
      const plan = JSON.parse(raw);
      if (!Array.isArray(plan.settings) || plan.settings.length !== settingIds.length) return;
      settingIds.forEach((id, index) => {
        const value = Number(plan.settings[index]);
        if (Number.isFinite(value)) document.getElementById(id).value = String(value);
      });
      updateGsdReadout();
      if (Array.isArray(plan.polygon) && plan.polygon.length >= 3 && plan.polygon.length <= 200 && plan.polygon.every(point => Array.isArray(point) && point.length === 2 && Number.isFinite(point[0]) && Number.isFinite(point[1]) && Math.abs(point[0]) <= 90 && Math.abs(point[1]) <= 180)) {
        map.fire(L.Draw.Event.CREATED, { layer: L.polygon(plan.polygon) });
      }
      if (Array.isArray(plan.home) && plan.home.length === 2 && Number.isFinite(plan.home[0]) && Number.isFinite(plan.home[1]) && Math.abs(plan.home[0]) <= 90 && Math.abs(plan.home[1]) <= 180) {
        setHome(L.latLng(plan.home[0], plan.home[1]));
        clearHomeBtn.disabled = false;
        homeStatus.textContent = 'Home point set. Drag its marker to move it.';
      }
      if (Array.isArray(plan.center) && plan.center.length === 2 && Number.isFinite(plan.center[0]) && Number.isFinite(plan.center[1]) && Number.isFinite(plan.zoom)) map.setView(plan.center, plan.zoom);
      if (plan.routeReady && drawnItems.getLayers().length) setTimeout(() => sendPolygonToServer(), 200);
    } catch (error) {
      console.warn('Could not restore the map plan:', error);
    }
  }

  function setFullMap(expanded) {
    workspace.classList.toggle('map-expanded', expanded);
    document.body.classList.toggle('map-expanded', expanded);
    expandButton.setAttribute('aria-pressed', String(expanded));
    expandButton.innerHTML = expanded ? 'Close full map <span aria-hidden="true">×</span>' : 'Full map <span aria-hidden="true">⤢</span>';
    requestAnimationFrame(() => map.invalidateSize());
    setTimeout(() => {
      map.invalidateSize();
      if (expanded && lastWaypoints.length) map.fitBounds(L.latLngBounds(lastWaypoints.map(point => [point.lat, point.lon])), { padding: [32, 32] });
      else if (expanded && drawnItems.getLayers().length) map.fitBounds(drawnItems.getBounds(), { padding: [32, 32] });
    }, 150);
  }
  if (embedded) expandButton.innerHTML = 'Open full map <span aria-hidden="true">↗</span>';
  expandButton.addEventListener('click', () => {
    if (embedded) {
      const plan = encodeURIComponent(JSON.stringify(planForNewTab()));
      window.open(`${location.origin}${location.pathname}?map=full&plan=${plan}`, '_blank', 'noopener');
      return;
    }
    setFullMap(!workspace.classList.contains('map-expanded'));
  });
  const params = new URLSearchParams(location.search);
  if (params.get('map') === 'full' && !embedded) setFullMap(true);
  document.addEventListener('keydown', event => {
    if (event.key === 'Escape' && workspace.classList.contains('map-expanded')) setFullMap(false);
  });

  // Use the same drawing controls on mouse and touch. A point is added only
  // after a short stationary press, so panning never creates corners.
  let drawing = false;
  let corners = [];
  let pointerStart = null;
  const draftLayers = L.layerGroup().addTo(map);
  const draftShapes = L.layerGroup().addTo(draftLayers);
  const draftHandles = L.layerGroup().addTo(draftLayers);
  const areaHandles = L.layerGroup().addTo(map);
  function cornerHandle(corner, index, onMove) {
    const marker = L.marker(corner, {
      draggable: true,
      keyboard: false,
      title: `Drag corner ${index + 1}`,
      icon: L.divIcon({ className: 'area-corner-marker', html: '<span></span>', iconSize: [28, 28], iconAnchor: [14, 14] })
    });
    marker.on('drag', () => onMove(marker.getLatLng(), index));
    return marker;
  }
  function renderDraftShape() {
    draftShapes.clearLayers();
    if (corners.length >= 3) {
      L.polygon(corners, { color: '#fff', weight: 5, fillOpacity: 0, interactive: false }).addTo(draftShapes);
      L.polygon(corners, { color: '#111113', weight: 2.5, fillColor: '#fff', fillOpacity: .12, interactive: false }).addTo(draftShapes);
    } else if (corners.length === 2) {
      L.polyline(corners, { color: '#fff', weight: 5, interactive: false }).addTo(draftShapes);
      L.polyline(corners, { color: '#111113', weight: 2.5, interactive: false }).addTo(draftShapes);
    }
  }
  function updateDraft() {
    renderDraftShape();
    draftHandles.clearLayers();
    corners.forEach((corner, index) => cornerHandle(corner, index, (latlng, movedIndex) => {
      corners[movedIndex] = latlng;
      renderDraftShape();
    }).addTo(draftHandles));
    undoButton.disabled = corners.length === 0;
    finishButton.disabled = corners.length < 3;
    if (drawing) {
      const count = corners.length;
      const action = mobile ? 'Tap' : 'Click';
      mapHint.textContent = count ? `${count} ${count === 1 ? 'corner' : 'corners'} placed. ${action} the map to add another, or drag a corner to move it.` : `${action} the map to place a corner. Drag to move the map.`;
      areaStatus.textContent = `${count} ${count === 1 ? 'corner' : 'corners'} placed`;
      areaStatus.classList.toggle('ready', count >= 3);
    }
  }
  function stopDrawing() {
    drawing = false;
    pointerStart = null;
    corners = [];
    draftShapes.clearLayers();
    draftHandles.clearLayers();
    map.doubleClickZoom.enable();
    startAreaButton.hidden = false;
    cornerControls.hidden = true;
    map.getContainer().classList.remove('is-drawing');
    mapHint.textContent = 'Drag a corner to adjust the area, then generate a route.';
  }
  function updateAreaHandles(layer) {
    areaHandles.clearLayers();
    if (!layer) return;
    const vertices = layer.getLatLngs()[0];
    vertices.forEach((corner, index) => {
      const handle = cornerHandle(corner, index, (latlng, movedIndex) => {
        const updated = layer.getLatLngs()[0].slice();
        updated[movedIndex] = latlng;
        layer.setLatLngs(updated);
      }).addTo(areaHandles);
      handle.on('dragstart', () => { if (lastWaypoints.length) clearRoute(); });
      handle.on('dragend', () => {
        areaStatus.textContent = `${layer.getLatLngs()[0].length} corners selected`;
      });
    });
  }
  map.on(L.Draw.Event.CREATED, event => updateAreaHandles(event.layer));
  map.on(L.Draw.Event.DELETED, () => areaHandles.clearLayers());
  document.getElementById('areaInstructions').textContent = `${mobile ? 'Tap' : 'Click'} Draw area, then ${mobile ? 'tap' : 'click'} the map to place corners. Drag any corner to adjust it.`;
  mapHint.textContent = `${mobile ? 'Tap' : 'Click'} Draw area to start. Drag the map to look around.`;
  startAreaButton.addEventListener('click', () => {
    drawing = true;
    map.doubleClickZoom.disable();
    pickHomeMode = false;
    setHomeBtn.classList.remove('active');
    setHomeBtn.textContent = 'Set home point';
    corners = [];
    drawnItems.clearLayers();
    areaHandles.clearLayers();
    clearRoute();
    startAreaButton.hidden = true;
    cornerControls.hidden = false;
    map.getContainer().classList.add('is-drawing');
    updateDraft();
  });
  undoButton.addEventListener('click', () => { corners.pop(); updateDraft(); });
  finishButton.addEventListener('click', () => {
    if (corners.length < 3) return;
    const polygon = L.polygon(corners, { color: '#111113', weight: 3, fillColor: '#fff', fillOpacity: .18 });
    stopDrawing();
    map.fire(L.Draw.Event.CREATED, { layer: polygon });
    map.stop();
    map.fitBounds(polygon.getBounds(), { padding: [24, 24], animate: false });
  });
  cancelButton.addEventListener('click', () => {
    stopDrawing();
    areaStatus.textContent = 'No area drawn yet';
    areaStatus.classList.remove('ready');
  });
  const container = map.getContainer();
  container.addEventListener('pointerdown', event => {
    if (!drawing || event.target.closest('.leaflet-control, .area-corner-marker')) return;
    pointerStart = { id: event.pointerId, x: event.clientX, y: event.clientY, time: performance.now(), scrollY: window.scrollY, moved: false };
  }, { passive: true });
  container.addEventListener('pointermove', event => {
    if (pointerStart && event.pointerId === pointerStart.id && Math.hypot(event.clientX - pointerStart.x, event.clientY - pointerStart.y) > 8) pointerStart.moved = true;
  }, { passive: true });
  container.addEventListener('pointerup', event => {
    if (!drawing || !pointerStart || event.pointerId !== pointerStart.id) return;
    const tapped = window.isStationaryTap(pointerStart, event, performance.now() - pointerStart.time, window.scrollY);
    pointerStart = null;
    if (!tapped) return;
    const point = map.mouseEventToLatLng(event);
    if (corners.length && map.distance(corners[corners.length - 1], point) < .5) return;
    corners.push(point);
    updateDraft();
  }, { passive: true });
  container.addEventListener('pointercancel', () => { pointerStart = null; }, { passive: true });
  if (!embedded) restorePlan(params.get('plan'));

  let points = [];
  let markers = [];
  let selectedMarker = null;
  let selectedIndex = 0;
  let pageIndex = 0;
  const PAGE_SIZE = 20;
  function waypointType(type) {
    return String(type || 'Waypoint').replace(/([a-z])([A-Z])/g, '$1 $2');
  }
  function routeDistance(waypoints) {
    let metres = 0;
    for (let index = 1; index < waypoints.length; index++) {
      metres += map.distance([waypoints[index - 1].lat, waypoints[index - 1].lon], [waypoints[index].lat, waypoints[index].lon]);
    }
    return metres >= 1000 ? `${(metres / 1000).toFixed(2)} km` : `${Math.round(metres)} m`;
  }
  function renderList() {
    waypointList.replaceChildren();
    const start = pageIndex * PAGE_SIZE;
    const end = Math.min(start + PAGE_SIZE, points.length);
    for (let index = start; index < end; index++) {
      const waypoint = points[index];
      const item = document.createElement('li');
      const button = document.createElement('button');
      button.type = 'button';
      button.setAttribute('aria-current', String(index === selectedIndex));
      button.setAttribute('aria-label', `Waypoint ${index + 1}: ${waypointType(waypoint.type)}`);
      const number = document.createElement('span');
      number.className = 'waypoint-index';
      number.textContent = String(index + 1).padStart(2, '0');
      const type = document.createElement('span');
      type.className = 'waypoint-type';
      type.textContent = waypointType(waypoint.type);
      const altitude = document.createElement('span');
      altitude.className = 'waypoint-alt';
      altitude.textContent = `${waypoint.alt_m} m`;
      button.append(number, type, altitude);
      button.addEventListener('click', () => selectWaypoint(index, true));
      item.append(button);
      waypointList.append(item);
    }
    waypointRange.textContent = `${start + 1}–${end} of ${points.length}`;
    prevButton.disabled = pageIndex === 0;
    nextButton.disabled = end >= points.length;
  }
  function selectWaypoint(index, moveMap = false) {
    selectedIndex = index;
    const point = points[index];
    selectedWaypoint.replaceChildren();
    const title = document.createElement('strong');
    title.textContent = `#${index + 1} ${waypointType(point.type)}`;
    const altitude = document.createElement('span');
    altitude.textContent = `${point.alt_m} m altitude`;
    const coordinates = document.createElement('small');
    coordinates.textContent = `${Number(point.lat).toFixed(6)}, ${Number(point.lon).toFixed(6)}`;
    selectedWaypoint.append(title, altitude, coordinates);
    if (selectedMarker && selectedMarker !== markers[index]) {
      const previousIndex = markers.indexOf(selectedMarker);
      if (!isKeyWaypoint(points[previousIndex], previousIndex)) surveyLayer.removeLayer(selectedMarker);
      else selectedMarker.setStyle({ radius: 3.5, color: '#fff', fillColor: '#111113' });
    }
    selectedMarker = markers[index];
    if (!surveyLayer.hasLayer(selectedMarker)) selectedMarker.addTo(surveyLayer);
    selectedMarker.setStyle({ radius: 7, color: '#111113', fillColor: '#fff' });
    selectedMarker.bringToFront();
    if (moveMap) {
      map.panTo(markers[index].getLatLng());
      markers[index].openPopup();
    }
    pageIndex = Math.floor(index / PAGE_SIZE);
    renderList();
  }
  prevButton.addEventListener('click', () => { pageIndex--; renderList(); });
  nextButton.addEventListener('click', () => { pageIndex++; renderList(); });
  document.getElementById('showWaypointsBtn').addEventListener('click', () => {
    if (workspace.classList.contains('map-expanded')) setFullMap(false);
    waypointPanel.scrollIntoView({ behavior: 'smooth', block: 'start' });
  });
  document.addEventListener('survey:clear', () => {
    points = [];
    markers = [];
    selectedMarker = null;
    waypointPanel.hidden = true;
    mapSummary.hidden = true;
    waypointList.replaceChildren();
    selectedWaypoint.replaceChildren();
    document.getElementById('routeDistance').textContent = '0 m';
    mapHint.textContent = drawnItems.getLayers().length ? 'Drag a corner to adjust the area, then generate a route.' : `${mobile ? 'Tap' : 'Click'} Draw area to start. Drag the map to look around.`;
  });
  function isKeyWaypoint(point, index) {
    return index === 0 || index === points.length - 1 || point.type === 'Turnaround' || point.type === 'SurveyEntry';
  }
  document.addEventListener('survey:route', event => {
    points = event.detail.waypoints;
    selectedMarker = null;
    selectedIndex = 0;
    pageIndex = 0;
    const latlngs = points.map(point => [point.lat, point.lon]);
    L.polyline(latlngs, { color: '#fff', weight: 6, opacity: .95 }).addTo(surveyLayer);
    L.polyline(latlngs, { color: '#111113', weight: 3, opacity: .95 }).addTo(surveyLayer);
    markers = points.map((point, index) => {
      const marker = L.circleMarker([point.lat, point.lon], { radius: 3.5, color: '#fff', fillColor: '#111113', fillOpacity: 1, weight: 1.5 });
      if (isKeyWaypoint(point, index)) marker.addTo(surveyLayer);
      const popup = document.createElement('div');
      popup.textContent = `#${index + 1} ${waypointType(point.type)} · ${point.alt_m} m`;
      marker.bindPopup(popup);
      marker.on('click', () => selectWaypoint(index));
      return marker;
    });
    const distance = routeDistance(points);
    document.getElementById('routeDistance').textContent = distance;
    mapSummaryText.textContent = `${points.length} waypoints · ${distance}`;
    mapSummary.hidden = false;
    waypointPanel.hidden = false;
    mapHint.textContent = 'Route ready. Select a waypoint to inspect it.';
    selectWaypoint(0);
  });
})();
