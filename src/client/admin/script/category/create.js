import { createLoadingButton } from '../core/form';
import { NotificationType, showNotification } from '../core/notification';
import { jQuery } from '../../../shared/libs/jquery';

const formId = '#formCreateCategory';

function initForm() {
  jQuery(formId).validate({
    rules: {
      categoryName: {
        required: true,
        maxlength: 25,
        normalizer: (val) => val.trim(),
        remote: {
          url: '/admin/category/check-name',
          method: 'GET',
          dataFilter: (res) => {
            res = JSON.parse(res);
            return !res.data.isExists;
          }
        }
      }
    },
    messages: {
      categoryName: {
        remote: 'This category name is already taken, please try another.'
      }
    },
    submitHandler: (form) => {
      const btnLoading = createLoadingButton();
      const formData = new FormData(form);
      btnLoading.enable();
      jQuery
        .ajax({
          url: '/admin/category/add',
          method: 'POST',
          data: JSON.stringify({
            categoryName: formData.get('categoryName')
          })
        })
        .done(() => {
          showNotification(NotificationType.Success, 'Category has been created.');
          form.reset();
        })
        .fail((err) => {
          const response = err.responseJSON || {};
          showNotification(NotificationType.Error, response.message);
        })
        .always(() => {
          btnLoading.disable();
        });
    }
  });
}

initForm();