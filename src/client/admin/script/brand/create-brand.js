import { initInputFile } from '../core/custom-input-file';
import { showNotification, NotificationType } from '../core/notification';
import { mbToByte } from '../core/file';
import { jQuery } from '../../../shared/libs/jquery';
import { createLoadingButton } from '../core/form';

const formId = '#formCreateBrand';
const inputFileHandler = initInputFile();
const loadingBtnInstance = createLoadingButton();

function initForm() {
  jQuery(formId).validate({
    rules: {
      brandName: {
        required: true,
        remote: {
          url: '/admin/brand/check-name',
          method: 'GET',
          dataFilter: (res) => {
            res = JSON.parse(res);
            return !res.data.isExists;
          }
        },
        normalizer: (val) => val.trim()
      },
      brandImage: {
        fileRequired: true,
        fileMaxSize: mbToByte(2),
        fileExt: 'image/png, image/jpg, image/jpeg'
      }
    },
    messages: {
      brandName: {
        remote: 'This brand name is already taken, please try another.'
      },
      brandImage: {
        fileMaxSize: 'File size must not more than 2mb.',
        fileExt: 'File type not supported, accept only PNG, JPG, JPEG.'
      }
    },
    submitHandler: (form) => {
      loadingBtnInstance.enable();
      const formData = new FormData(form);
      const fileFormData = new FormData();
      fileFormData.append('brandImage', inputFileHandler.getFiles()[0].file);

      const requestBody = {
        brandName: formData.get('brandName').trim(),
        fileUUID: ''
      };

      function uploadFile(file) {
        return jQuery
          .ajax({
            url: '/admin/upload/brand',
            method: 'POST',
            processData: false,
            contentType: false,
            data: file
          });
      }

      function createBrand(requestBody) {
        return jQuery
          .ajax({
            url: '/admin/brand/add',
            method: 'POST',
            contentType: 'application/json',
            data: JSON.stringify(requestBody)
          });
      }

      uploadFile(fileFormData)
        .then(res => {
          requestBody.fileUUID = res.data.fileUUID;
          return createBrand(requestBody);
        })
        .then(() => {
          form.reset();
          inputFileHandler.reset();
          showNotification(NotificationType.Success, 'Brand has bean created');
        })
        .catch(error => {
          const response = error.responseJSON || {};
          showNotification(NotificationType.Error, response.messages);
        })
        .always(() => {
          loadingBtnInstance.disable();
        });
    }
  });
}

initForm();