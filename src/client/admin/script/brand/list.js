import { jQuery } from '../../../shared/libs/jquery';
import { getDefaultContent } from '../core/constant';
import { createColumnImage } from '../core/custom-datatable';
import { getBrandImageObjectPath } from '../core/cdn';
import { formaTableDate } from '../core/date-utils';

const tableId = '#tableBrand';

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
          if (!data) return getDefaultContent();
          const src = getBrandImageObjectPath(row._id, data.fileUrl);
          return createColumnImage(src);
        }
      },
      {
        data: 'createdBy',
        render: (data) => {
          return `<a class="" role="button">${data.username}</a>` || getDefaultContent();
        }
      },
      {
        data: 'createdAt',
        render: (data) => {
          return formaTableDate(data) || getDefaultContent();
        }
      },
      {
        data: 'lastUpdatedAt',
        render: (data) => {
          return data || getDefaultContent();
        }
      },
      {
        data: 'lastUpdatedBy',
        render: (data) => {
          return data || getDefaultContent();
        }
      }
    ]
  });
}

initDataTable();