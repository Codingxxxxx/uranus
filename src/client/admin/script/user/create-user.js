import { createLoadingButton } from '../core/form';
import { showNotification, NotificationType } from '../core/notification';
import { ErrorCode, getErrorMessage } from '../core/api';
import jQuery from 'jquery';
import 'jquery-validation';
import { customJqueryValidator } from '../core/custom-jquery-validate';
customJqueryValidator(jQuery);

const FORM_ID = '#formCreateUser';
const buttonLoadingInstance = createLoadingButton();
let validator = null;
const formCreateUserInput = {
  defaultPassword: document.querySelector('#password'),
  checkboxCustomDefaultPassword: document.querySelector('#checkboxCustomDefaultPassword')
};

function initForm() {
  validator = jQuery(FORM_ID).validate({
    rules: {
      firstname: {
        required: true,
        maxlength: 50,
        normalizer: (v) => v.trim()
      },
      lastname: {
        required: true,
        maxlength: 50,
        normalizer: (v) => v.trim()
      },
      username: {
        required: true,
        minlength: 5,
        maxlength: 15,
        normalizer: (val) => val.trim(),
        remote: {
          url: '/admin/user/check-username',
          method: 'GET',
          dataFilter: (response) => {
            const res = JSON.parse(response);
            console.debug(res.data.isUserExists);
            return !res.data.isUserExists;
          }
        }
      },
      password: {
        required: () => formCreateUserInput.checkboxCustomDefaultPassword.checked
      },
      role: {
        required: true
      }
    },
    messages: {
      username: {
        remote: 'Username already taken, please try another'
      }
    },
    submitHandler: (form) => {
      const formData = new FormData(form);
      const requestBody = {
        firstname: formData.get('firstname'),
        lastname: formData.get('lastname'),
        username: formData.get('username'),
        role: formData.get('role'),
        password: formCreateUserInput.checkboxCustomDefaultPassword.checked ? formData.get('password') : null
      };
      buttonLoadingInstance.enable();
      jQuery
        .ajax({
          url: '/admin/user/add',
          method: 'POST',
          contentType: 'application/json',
          accepts: 'application/json',
          data: JSON.stringify(requestBody)
        })
        .done(() => {
          showNotification(NotificationType.Success, 'A user has been created!');
        })
        .fail((error) => {
          const responseJson = error.responseJSON || {};
          showNotification(NotificationType.Error, responseJson.message);
        })
        .always(() => {
          buttonLoadingInstance.disable();
        });
    }
  });
}

function checkboxCustomDefaultPasswordChange() {
  formCreateUserInput.checkboxCustomDefaultPassword.addEventListener('change', function() {
    const isChecked = this.checked;
    formCreateUserInput.defaultPassword.disabled = !isChecked;
    // reset default password text
    if (!isChecked) formCreateUserInput.defaultPassword.value = '';
    if (!validator || !formCreateUserInput.defaultPassword) return;
    jQuery(formCreateUserInput.defaultPassword).valid();
  });
  // auto trigger change event for default value
  formCreateUserInput.checkboxCustomDefaultPassword.dispatchEvent(new Event('change'));
}

checkboxCustomDefaultPasswordChange();
initForm();