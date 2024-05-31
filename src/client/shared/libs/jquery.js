import $ from 'jquery';
import 'jquery-validation';
import 'jquery-validation/dist/additional-methods';
import { customJqueryValidator } from '../../admin/script/core/custom-jquery-validate';
import { customDataTable } from '../../admin/script/core/custom-datatable';
import dataTable from 'datatables.net-bs5';
import 'datatables.net-fixedcolumns-bs5';
import 'magnific-popup';

/**
 * @type {import('jquery')}
 */
export const jQuery = customJqueryValidator($);
export const DataTable = customDataTable(dataTable);