import { Tooltip } from 'bootstrap';

/**
 * Initialize bootstrap tooltips
 * @param {HTMLElement[]} tooltips Tooltip elements
 */
export function initTooltip(tooltips) {
  tooltips.forEach(tooltip => new Tooltip(tooltip, { container: 'body' }));
}