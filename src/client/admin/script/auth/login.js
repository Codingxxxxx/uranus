import jQuery from 'jquery';
import 'jquery-validation';
import { customJqueryValidator } from '../core/custom-jquery-validate';
import { createLoadingButton } from '../core/form';
import { showNotification, NotificationType } from '../core/notification';
customJqueryValidator(jQuery);

const formId = '#formLogin';

function initForm() {
  jQuery(formId).validate({
    rules: {
      username: {
        required: true
      },
      password: {
        required: true
      }
    },
    submitHandler: (form) => {
      const loadingButtonInstance = createLoadingButton();
      const formData = new FormData(form);
      const requestBody = {
        username: formData.get('username').trim(),
        password: formData.get('password')
      };
      loadingButtonInstance.enable();

      jQuery
        .ajax({
          url: '/admin/login',
          method: 'POST',
          contentType: 'application/json',
          accepts: 'application/json',
          data: JSON.stringify(requestBody)
        })
        .done((res) => {
          showNotification(NotificationType.Success, 'Login succeed');
          const redirectUrl = res.data.redirectUrl || '/admin';
          window.location.href = redirectUrl;
        })
        .fail((error) => {
          const response = error.responseJSON || {};
          const message = response.message;
          showNotification(NotificationType.Error, message);
        })
        .always(() => {
          loadingButtonInstance.disable();
        });
    }
  });
}

initForm();