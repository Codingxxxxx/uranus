import { jQuery } from '../../../shared/libs/jquery';
import { getDefaultContent } from '../core/constant';
import { createColumnImage } from '../core/custom-datatable';
import { getBrandImageObjectPath } from '../core/cdn';
import { formaTableDate } from '../core/date-utils';

const tableId = '#brandTable';

function initDataTable() {
  jQuery(tableId).DataTable({
    ajax: {
      url: '/admin/brand/list'
    },
    columns: [
      {
        data: 'brandName'
      },
      {
        width: '200px',
        data: 'brandImage',
        render: (data, type, row) => {
          if (!data) return;
          const src = getBrandImageObjectPath(row._id, data.fileUrl);
          return createColumnImage(src);
        }
      },
      {
        data: 'createdBy',
        render: (data) => {
          if (!data) return;
          return `<a class="" role="button">${data.username}</a>`;
        }
      },
      {
        data: 'createdAt',
        render: (data) => {
          if (!data) return;
          return formaTableDate(data) || getDefaultContent();
        }
      },
      {
        data: 'lastUpdatedAt',
        render: (data) => {
          if (!data) return;
          return data || getDefaultContent();
        }
      },
      {
        data: 'lastUpdatedBy',
        render: (data) => {
          if (!data) return;
          return data || getDefaultContent();
        }
      }
    ]
  });
}

initDataTable();