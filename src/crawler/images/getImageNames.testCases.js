/* eslint-disable max-len */
module.exports = [
  {
    description: 'works with no images',
    input: {
      folderName: 'post/path',
      imageUrls: []
    },
    output: []
  },
  {
    description: 'returns valid imageInfo for direct image',
    input: {
      folderName: 'post/path',
      imageUrls: [
        'http://a.com/image.jpeg'
      ]
    },
    output: [{
      imageUrl: 'http://a.com/image.jpeg',
      fullPath: 'post\\path\\a.com_image.jpeg'
    }]
  },
  {
    description: 'returns valid imageInfo for url with port',
    input: {
      folderName: 'post/path',
      imageUrls: [
        'http://a.com:1234/image.png'
      ]
    },
    output: [{
      imageUrl: 'http://a.com:1234/image.png',
      fullPath: 'post\\path\\a.com_1234_image.png'
    }]
  },
  {
    description: 'returns valid imageInfo for subfolder image',
    input: {
      folderName: 'post/path',
      imageUrls: [
        'http://a.com/assets/image.png'
      ]
    },
    output: [{
      imageUrl: 'http://a.com/assets/image.png',
      fullPath: 'post\\path\\a.com_assets_image.png'
    }]
  },
  {
    description: 'returns valid imageInfo for complicated image name',
    input: {
      folderName: 'post/path',
      imageUrls: [
        'http://a.com/assets/complicated image-name_bonus__double.png'
      ]
    },
    output: [{
      imageUrl: 'http://a.com/assets/complicated image-name_bonus__double.png',
      fullPath: 'post\\path\\a.com_assets_complicated image-name_bonus_double.png'
    }]
  },
  {
    description: 'returns valid imageInfos for images',
    input: {
      folderName: 'post/path',
      imageUrls: [
        'http://a.com/assets/image.png',
        'http://a.com/assets/image2.png'
      ]
    },
    output: [{
      imageUrl: 'http://a.com/assets/image.png',
      fullPath: 'post\\path\\a.com_assets_image.png'
    }, {
      imageUrl: 'http://a.com/assets/image2.png',
      fullPath: 'post\\path\\a.com_assets_image2.png'
    }]
  },
  {
    description: 'returns valid imageInfos for images with same id',
    input: {
      folderName: 'post/path',
      imageUrls: [
        'http://a.com/image.png',
        'http://other-domain.com/image.png'
      ]
    },
    output: [{
      imageUrl: 'http://a.com/image.png',
      fullPath: 'post\\path\\a.com_image.png'
    }, {
      imageUrl: 'http://other-domain.com/image.png',
      fullPath: 'post\\path\\other-domain.com_image.png'
    }]
  }
];
