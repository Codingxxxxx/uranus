import { Toast } from 'bootstrap';
const toastContainer = document.querySelector('.toast-container');

export const NotificationType = {
  Success: 0,
  Error: 1
};

const NotificationClass = {
  0: 'toast-success',
  1: 'toast-danger'
};

function createNotificationEle() {
  const div = document.createElement('div');
  const notificationElString = (`
    <div class="toast" role="alert" aria-live="assertive" aria-atomic="true">
      <div class="toast-header">
        <strong class="me-auto">Message</strong>
        <button type="button" class="btn-close" data-bs-dismiss="toast" aria-label="Close"></button>
      </div>
      <div class="toast-body">
        <span class="toast-message"></span>
      </div>
    </div>
  `);
  div.innerHTML = notificationElString;
  return div.firstElementChild;
}

/**
 * Show notification
 * @param {'toast-success' | 'toast-danger'} type Notification type
 * @param {string} message
 */
export function showNotification(type, message) {
  const ntType = NotificationClass[type] || '';
  const notificationEl = createNotificationEle();
  const messageEl = notificationEl.querySelector('.toast-message');

  if (ntType) notificationEl.classList.add(ntType);

  messageEl.textContent = message;
  toastContainer.append(notificationEl);

  const bsToast = new Toast(notificationEl, { animation: true, autohide: true, delay: 3000 });
  notificationEl.addEventListener('hidden.bs.toast', () => {
    bsToast.dispose();
    notificationEl.remove();
  });
  bsToast.show();
}