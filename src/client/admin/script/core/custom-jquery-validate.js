/**
 * 
 * @param {import('jquery')} jQuery 
 * @returns 
 */
export function customJqueryValidator(jQuery) {
  jQuery.ajaxSetup({
    contentType: 'application/json',
    accepts: 'application/json'
  });
  jQuery.validator.setDefaults({
    ignore: '.ignore-field',
    errorClass: 'invalid-field',
    errorPlacement: (error, elem) => {
      const formGroupEle = elem.closest('.form-group');
      formGroupEle.append(error);
    },
    highlight: (el, errorClass) => {
      el = jQuery(el);
      if (el.closest('.input-group').length > 0) el.closest('.input-group').addClass(errorClass);
      else if (el.closest('.custom-file-input').length > 0) el.closest('.custom-file-input').addClass(errorClass);
      else el.addClass(errorClass);
    },
    unhighlight: function(el, errorClass) {
      el = jQuery(el);
      if (el.closest('.input-group').length > 0) {
        el.closest('.input-group').removeClass(errorClass);
      } else if (el.closest('.custom-file-input').length > 0) {
        el.closest('.custom-file-input').removeClass(errorClass);
      } else {
        el.removeClass(errorClass);
      }
    }
  });

  addCustomMethods(jQuery);

  return jQuery;
}

function addCustomMethods(jQuery) {
  jQuery.validator.addMethod('fileRequired', function(val, elem, params) {
    if (typeof params === 'boolean' && !params) return true;
    return elem.customFiles.length > 0;
  }, 'This field is required.');

  jQuery.validator.addMethod('fileMaxSize', function(val, elem, params) {
    if (elem.customFiles.length <= 0) return true;
    return (elem.customFiles).some(f => f.size <= params);
  }, 'File size exceeded.');

  jQuery.validator.addMethod('fileExt', function(val, elem, params) {
    const exts = params.split(',').map(ext => ext.trim());
    if (elem.customFiles.length <= 0) return true;
    return elem.customFiles.some(f => exts.some(ext => f.type && ext.includes(f.type)));
  }, 'File type not supported, accept only {0}.');
}