/**
 * Format file size for readable
 * @param {number} bytes 
 * @returns {number}
 */
export function formatFileSize(bytes) {
  if (bytes >= 1048576) { // 1 MB = 1048576 bytes
    const size = bytes / 1048576;
    return size.toFixed(1) + ' MB';
  } else if (bytes >= 1024) { // 1 KB = 1024 bytes
    const size = bytes / 1024;
    return size.toFixed(0) + ' KB';
  } else {
    return bytes + ' B';
  }
}

/**
 * Convert mb to byte
 * @param {number} mb Size in megabytes
 * @returns {number}
 */
export function mbToByte(mb) {
  return mb * 1048576;
}