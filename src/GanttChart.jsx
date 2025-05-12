import React, { useEffect, useRef, useState, useMemo, useCallback } from 'react';
import { Timeline } from 'vis-timeline/standalone';
import 'vis-timeline/styles/vis-timeline-graph2d.min.css';
import data from './data.json';

const ZOOM_LEVELS = [
  { label: '12 hours', ms: 1000 * 60 * 60 * 12 },
  { label: '4 hours', ms: 1000 * 60 * 60 * 4 },
  { label: '2 hours', ms: 1000 * 60 * 60 * 2 },
  { label: '1 hour', ms: 1000 * 60 * 60 },
  { label: '30 minutes', ms: 1000 * 60 * 30 },
];

const GanttChart = () => {
  const containerRef = useRef(null);
  const timelineRef = useRef(null);
  const [zoomIndex, setZoomIndex] = useState(0);

  const parseTime = useCallback((timeStr) => {
    const [time, modifier] = timeStr.split(' ');
    let [hours, minutes] = time.split(':').map(Number);

    if (modifier === 'PM' && hours !== 12) hours += 12;
    if (modifier === 'AM' && hours === 12) hours = 0;

    const now = new Date();
    now.setHours(hours, minutes, 0, 0);
    return new Date(now);
  }, []);

  const items = useMemo(() => {
    return (data.routes || []).flatMap((route, routeIndex) =>
      route.route.map((entry) => ({
        id: `route${routeIndex}-task${entry.seq}`,
        content: `Route ${routeIndex + 1} - Task ${entry.seq}`,
        start: parseTime(entry.start_time),
        end: parseTime(entry.end_time),
        group: `route-${routeIndex}`,
      }))
    );
  }, [parseTime]);

  const groups = useMemo(() => {
    return (data.routes || []).map((_, idx) => ({
      id: `route-${idx}`,
      content: `Route ${idx + 1}`,
    }));
  }, []);

  useEffect(() => {
    if (!containerRef.current) return;

    const now = Date.now();
    const range = ZOOM_LEVELS[zoomIndex].ms;

    const options = {
      start: new Date(now - range / 2),
      end: new Date(now + range / 2),
      zoomable: true,
      moveable: true,
      stack: true,
      groupOrder: 'content',
      editable: false,
      orientation: { axis: 'top' },
      showCurrentTime: true,
    };

    const timeline = new Timeline(containerRef.current, items, groups, options);
    timelineRef.current = timeline;

    return () => timeline.destroy();
  }, [items, groups]); // Only recreate on data changes

  useEffect(() => {
    if (!timelineRef.current) return;

    const now = Date.now();
    const range = ZOOM_LEVELS[zoomIndex].ms;
    const newStart = new Date(now - range / 2);
    const newEnd = new Date(now + range / 2);

    timelineRef.current.setWindow(newStart, newEnd, { animation: true });
  }, [zoomIndex]);

  return (
    <div>
      <div style={{ marginBottom: '1rem' }}>
        <label>
          Zoom Level:
          <input
            type="range"
            min="0"
            max={ZOOM_LEVELS.length - 1}
            step="1"
            value={zoomIndex}
            onChange={(e) => setZoomIndex(Number(e.target.value))}
            style={{ width: '300px', marginLeft: '1rem' }}
          />
          <span style={{ marginLeft: '1rem' }}>{ZOOM_LEVELS[zoomIndex].label}</span>
        </label>
      </div>
      <div
        ref={containerRef}
        style={{ height: '400px', border: '1px solid #ccc', overflowY: 'auto' }}
      />
    </div>
  );
};

export default GanttChart;
