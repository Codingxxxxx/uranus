import { Tooltip } from 'bootstrap';

/**
 * Initialize bootstrap tooltips
 * @param {HTMLElement[]} tooltips Tooltip elements
 */
export function initTooltip(tooltips) {
  return Array.from(tooltips)
    .map(tooltip => new Tooltip(tooltip, { container: 'body' }));
}