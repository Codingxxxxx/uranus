import { jQuery } from '../../../shared/libs/jquery';
import { getDefaultContent } from '../core/constant';
import { createColumnImage } from '../core/custom-datatable';
import { getBrandImageObjectPath } from '../core/cdn';
import { formatTableDate } from '../core/date-utils';

const tableId = '#tableUser';

function initDataTable() {
  jQuery(tableId).DataTable({
    ajax: {
      url: '/admin/user/list'
    },
    columns: [
      {
        data: 'username'
      },
      {
        data: 'role',
        render: (data) => {
          if (!data) return;
          return data.roleName;
        }
      },
      {
        render: (data, type, row) => {
          return row.firstname + ' ' + row.lastname;
        }
      },
      {
        data: 'createdAt',
        render: (data) => {
          if (!data) return;
          return formatTableDate(data);
        }
      },
      {
        data: 'status',
        render: (data) => {
          if (!data) return;
          return (`
            <span class="badge rounded-pill ${data === 'ACTIVE' ? 'text-bg-success' : 'text-bg-danger'}">${data}</span>
          `);
        }
      },
      {
        data: 'lastLogin',
        render: (data) => {
          if (!data) return;
          return formatTableDate(data);
        }
      }
    ]
  });
}

initDataTable();