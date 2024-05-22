import '../../style/main.scss';
import { initTooltip } from './tooltip';
// auto initialize tooltips
initTooltip(document.querySelectorAll('[data-bs-toggle="tooltip"]'));