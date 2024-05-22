/**
 * Create icon loading element
 * @returns {HTMLDivElement}
 */
function createBtnIconLoading() {
  const div = document.createElement('div');
  div.classList.add('form-submit-loading', 'spinner-border', 'text-primary', 'spinner-border-sm', 'text-white');
  div.setAttribute('role', 'status');
  div.innerHTML = '<span class="visually-hidden">Loading...</span>';
  return div;
}

export function createLoadingButton(btnSelector = '#btnSubmit') {
  /**
   * @type {HTMLButtonElement}
   */
  const btnLoading = document.querySelector(btnSelector);
  const btnLoadingIcon = createBtnIconLoading();
  const btnTextContent = btnLoading.textContent;

  return {
    enable() {
      btnLoading.disabled = true;
      btnLoading.textContent = '';
      btnLoading.append(btnLoadingIcon);
    },
    disable() {
      btnLoading.disabled = false;
      btnLoading.textContent = btnTextContent;
      btnLoadingIcon.remove();
    }
  };
}