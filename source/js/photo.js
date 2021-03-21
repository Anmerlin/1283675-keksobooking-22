const FILE_TYPES = ['jpg', 'png'];

/**
 * Function for setting the image
 * @param  {object} field     file upload field
 * @param  {object} preview   element to show preview
 */
const setPhoto = (field, preview) => {
  const file = field.files[0];
  const fileName = file.name.toLowerCase();

  const matches = FILE_TYPES.some((it) => {
    return fileName.endsWith(it);
  });

  if (matches) {
    const reader = new FileReader();

    reader.addEventListener('load', () => {
      const image = preview.querySelector('img');

      if (image) {
        image.src = reader.result;
      } else {
        const img = document.createElement('img');

        img.width = 70;
        img.height = 70;
        img.src = reader.result;

        preview.append(img);
      }
    });

    reader.readAsDataURL(file);
  }
};

/**
 * Function for setting the default image
 * @param  {object} field             file upload field
 * @param  {object} preview           element to show preview
 * @param  {boolean} isDefaultImage   default image
 * @param  {string} defaultImage      path to default image
 */
const setDefaultPhoto = (field, preview, isDefaultImage = false, defaultImage) => {
  const image = preview.querySelector('img')
  field.value = '';

  if (image && isDefaultImage) {
    return image.src = defaultImage;
  }

  if (image) {
    return image.remove();
  }
};

/**
 * Function for upload photos
 * @param  {object} field     file upload field
 * @param  {object} preview   element to show preview
 */
const changePhotoHandler = (field, preview) => {
  field.addEventListener('change', () => {
    setPhoto(field, preview);
  });
};

export {setDefaultPhoto, changePhotoHandler};
