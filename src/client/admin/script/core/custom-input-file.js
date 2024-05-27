import { formatFileSize } from '../core/file';
import { initTooltip } from '../core/tooltip';
import { jQuery } from '../../../shared/libs/jquery';

/**
 * @param {string} fileSize
 * @param {string} mimetype
 * @param {string} imageUrl
 * @returns {HTMLElement}
 */
function createFileEl(fileSize, mimetype, imageUrl) {
  const isImage = mimetype.startsWith('image');
  const elAsString = (`
    <div class="file border ${!isImage && 'rounded'}">
      ${(() => {
        if (isImage) return `<img class="file-image" src="${imageUrl}" />`;
        return '<span class="iconify display-1 d-block py-2 file-general" data-icon="pepicons-pop:file"></span>';
      })()}
      <button class="btn-delete" type="button" data-bs-toggle="tooltip" data-manual-init data-bs-title="Remove file" data-bs-custom-class="form-tooltip">
        <span class="iconify" data-icon="material-symbols:close"></span>
      </button>
      <span class="badge file-size">${fileSize}</span>
    </div>
  `);

  const div = document.createElement('div');
  div.innerHTML = elAsString;
  return div.children[0];
}

/**
 * 
 * @param {File | null} file 
 * @param {string} type 
 * @param {number} size 
 * @param {string | null} fileUrl 
 * @returns 
 */
function createFileObj(file, type, size, fileUrl) {
  return {
    id: Date.now(),
    file,
    type, 
    size,
    fileUrl
  };
}

export function initInputFile(ele) {
  ele = ele || document.querySelector('.custom-file-input');
  const fileInputContainer = ele;
  /**
   * @type {HTMLDivElement}
   */
  const fileContainer = fileInputContainer.querySelector('.file-list');

  /**
    * @type {{ id: string, file: File, fileUrl: string }[]}
  */
  let files = [];
  let initialFiles = null;

  let shouldValidate = true;

  /**
   * @type {HTMLElement}
   */
  const inputFile = fileInputContainer.querySelector('input[type="file"]');
  inputFile.customFiles = files;
  inputFile.addEventListener('change', (evt) => {
    shouldValidate = true;
    /**
     * @type {{ id: string, file: File, fileUrl: string }[]}
     */
    let inputFiles = [];

    if (initialFiles) {
      inputFiles = initialFiles;
      initialFiles = null;
    } else {
      inputFiles = Array.from(evt.currentTarget.files)
        .map(f => {
          return createFileObj(
            f,
            f.type,
            f.size,
            f.type.startsWith('image') && URL.createObjectURL(f)
          );
        });
    }
    
    files.push(...inputFiles);
  
    if (files.length > 0) fileContainer.classList.add('show');

    inputFiles.forEach(({ id, file, fileUrl }) => {
      const fileEl = createFileEl(formatFileSize(file.size), file.type, fileUrl);
      const btnDelete = fileEl.querySelector('.btn-delete');
      const tooltipHandler = initTooltip([btnDelete])[0];

      btnDelete.addEventListener('click', (evt) => {
        const idx = files.findIndex(f => f.id === id);
        files.splice(idx, 1);

        fileEl.remove();  
        tooltipHandler.dispose();
        if (files.length <= 0) fileContainer.classList.remove('show');
        if (fileUrl) URL.revokeObjectURL(fileUrl);
        if (files.length <= 0 && shouldValidate) jQuery(inputFile).valid();
      });

      fileContainer.append(fileEl);
    });

    jQuery(inputFile).valid();
  });

  return {
    getFiles() {
      return files;
    },
    setFiles(f) {
      files = f;
      inputFile.dispatchEvent(new Event('change'));
    },
    reset() {
      shouldValidate = false;
      for (const child of fileContainer.children) {
        child.querySelector('.btn-delete').dispatchEvent(new Event('click'));
      }
    }
  };
}