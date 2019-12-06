class UtilityService {
  flashMessage(message: string, alertType: string = 'primary', duration: number = 3) {
    duration = parseInt(String(duration + '000'), 10);
    message = message.trim();
    const id = (Math.random().toString(36).substr(2, 34) + Date.now());

    const el = window.document.createElement('div');
    el.innerHTML = `
    <div id="${id}" class="notification app-notification ${alertType} ghost transition">
      <p><strong>${message}</strong></p>
    </div>
    `;

    WindowObj.document.getElementById('notifications-box').appendChild(el);
    const msgBox = window.document.getElementById(id);

    setTimeout(() => {
      msgBox && msgBox.classList.remove('ghost');
      setTimeout(() => {
        msgBox && msgBox.classList.add('ghost');
        setTimeout(() => {
          el.remove();
        }, 100);
      }, duration);
    }, 100);
  }

  getFormValue(ngForm: any) {
    const dataObj: any = {};

    for (const control of ngForm.$$controls) {
      dataObj[control.$name] = control.$modelValue;
    }

    return dataObj;
  }

  ngFormToFormData(ngForm: any) {
    const formElement = ngForm.$$element[0];
    const formData = new FormData(formElement);
    return formData;
  }
}

App.service('utilityService', UtilityService);
