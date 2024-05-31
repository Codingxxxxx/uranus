import { jQuery } from '../../../shared/libs/jquery';


export function customDataTable(dataTable) {
  Object.assign(dataTable.defaults, {
    process: true,
    serverSide: true,
    ajax: {
      dataFilter: (res) => {
        res = JSON.parse(res);
        const pagination = res.data.pagination;
        const list = res.data.list;
        return JSON.stringify({
          draw: pagination.draw,
          recordsTotal: pagination.docLength,
          recordsFiltered: pagination.docLength,
          data: list
        });
      }
    },
    searching: false,
    sort: false,
    info: false,
    language: {
      lengthMenu: '_MENU_'
    },
    dom: '<"top"i>rt<"table-footer"pl>',
    initComplete: function(_, json) {
      const pageLength = this.api().page.info().pages;
      const paginationEl = this.closest('.dt-container').find('.pagination');
      const paginationWrapper = this.closest('.dt-container').find('.dt-paging');
      // remove pagination if three is only one page
      if (pageLength <= 1) paginationWrapper.remove();
      paginationEl.addClass('pagination-sm me-2');
    }
  });
  
  return dataTable;
}

export function createColumnImage(src) {
  const html = (`
    <span class="column-file" role="button">
      <a class="image-link" data-mfp-src="${src}">
        <img class="column-image" width="46px" src="${src}" />
      </a>
    </span>
  `);

  const div = document.createElement('div');
  div.innerHTML = html;
  const imagePreviewEl = div.firstElementChild;
  jQuery(imagePreviewEl).find('.image-link').magnificPopup({
    type: 'image',
    removalDelay: 300, // Delay in milliseconds before popup is removed
    mainClass: 'mfp-zoom-in' // This class is for CSS animation below
  });

  return imagePreviewEl;
}