export function customJqueryValidator(jQuery) {
  jQuery.validator.setDefaults({
    errorClass: 'invalid-field',
    errorPlacement: (error, elem) => {
      const formGroupEle = elem.closest('.form-group');
      formGroupEle.append(error);
    },
    highlight: (el, errorClass) => {
      el = jQuery(el);
      if (el.closest('.input-group').length > 0) el.closest('.input-group').addClass(errorClass);
      else el.addClass(errorClass);
    },
    unhighlight: function(el, errorClass) {
      el = jQuery(el);
      if (el.closest('.input-group').length > 0) {
        el.closest('.input-group').removeClass(errorClass);
      } else {
        el.removeClass(errorClass);
      }
    }
  });
}