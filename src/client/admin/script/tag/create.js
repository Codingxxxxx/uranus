import { createLoadingButton } from '../core/form';
import { NotificationType, showNotification } from '../core/notification';
import { jQuery } from '../../../shared/libs/jquery';

const formId = '#formCreateTag';

function initForm() {
  jQuery(formId).validate({
    rules: {
      tagName: {
        required: true,
        maxlength: 25,
        normalizer: (val) => val.trim(),
        remote: {
          url: '/admin/tag/check-name',
          method: 'GET',
          dataFilter: (res) => {
            res = JSON.parse(res);
            return !res.data.isExists;
          }
        }
      }
    },
    messages: {
      tagName: {
        remote: 'This tag name is already taken, please try another.'
      }
    },
    submitHandler: (form) => {
      const btnLoading = createLoadingButton();
      const formData = new FormData(form);
      btnLoading.enable();
      jQuery
        .ajax({
          url: '/admin/tag/add',
          method: 'POST',
          data: JSON.stringify({
            tagName: formData.get('tagName')
          })
        })
        .done(() => {
          showNotification(NotificationType.Success, 'Tag name has been created.');
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