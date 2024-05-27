import $ from 'jquery';
import 'jquery-validation';
import 'jquery-validation/dist/additional-methods';
import { customJqueryValidator } from '../../admin/script/core/custom-jquery-validate';

/**
 * @type {import('jquery')}
 */
export const jQuery = customJqueryValidator($);