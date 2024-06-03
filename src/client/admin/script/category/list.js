import { jQuery } from '../../../shared/libs/jquery';
import { createColumnImage } from '../core/custom-datatable';
import { getUserImageObjectPath } from '../core/cdn';
import { formatTableDate } from '../core/date-utils';

const tableId = '#tableCategory';

function initDataTable() {
  jQuery(tableId).DataTable({
    ajax: {
      url: '/admin/category/list'
    },
    columns: [
      {
        data: 'categoryName'
      },
      {
        data: 'createdBy',
        render: (data) => {
          if (!data || !data.avatar) return;
          const src = getUserImageObjectPath(data.avatar.fileUrl);
          return createColumnImage(src);
        }
      },
      {
        data: 'createdAt',
        render: (data) => formatTableDate(data)
      },
      {
        render: (data) => {
          return (`
          <div class="dropdown">
            <button class="btn btn-light btn-sm" type="button" data-bs-toggle="dropdown" aria-expanded="false">
              <span class="iconify" data-icon="fa-regular:edit"></span>
            </button>
            <ul class="dropdown-menu">
              <li><a class="dropdown-item fs-tiny" href="#">Update</a></li>
              <li><a class="dropdown-item fs-tiny" href="#">Delete</a></li>
              <li><a class="dropdown-item fs-tiny" href="#">Details</a></li>
            </ul>
          </div>
          `);
        }
      }
    ]
  });
}

initDataTable();