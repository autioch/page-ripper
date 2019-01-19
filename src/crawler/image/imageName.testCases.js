module.exports = [
  {
    description: 'works with no images',
    input: {
      folderPath: 'post/path',
      imageUrls: []
    },
    output: []
  },
  {
    description: 'returns valid imageInfo for direct image',
    input: {
      folderPath: 'post/path',
      imageUrls: [
        'http://a.com/image.jpeg'
      ]
    },
    output: [{
      imageUrl: 'http://a.com/image.jpeg',
      fullPath: 'post/path/image.jpeg'
    }]
  },
  {
    description: 'returns valid imageInfo for url with port',
    input: {
      folderPath: 'post/path',
      imageUrls: [
        'http://a.com:1234/image.png'
      ]
    },
    output: [{
      imageUrl: 'http://a.com:1234/image.png',
      fullPath: 'post/path/image.png'
    }]
  },
  {
    description: 'returns valid imageInfo for subfolder image',
    input: {
      folderPath: 'post/path',
      imageUrls: [
        'http://a.com/assets/image.png'
      ]
    },
    output: [{
      imageUrl: 'http://a.com/assets/image.png',
      fullPath: 'post/path/assets_image.png'
    }]
  },
  {
    description: 'returns valid imageInfo for complicated image name',
    input: {
      folderPath: 'post/path',
      imageUrls: [
        'http://a.com/assets/complicated image-name_bonus__double.png'
      ]
    },
    output: [{
      imageUrl: 'http://a.com/assets/complicated image-name_bonus__double.png',
      fullPath: 'post/path/assets_complicated_image-name_bonus_double.png'
    }]
  },
  {
    description: 'returns valid imageInfos for images',
    input: {
      folderPath: 'post/path',
      imageUrls: [
        'http://a.com/assets/image.png',
        'http://a.com/assets/image2.png'
      ]
    },
    output: [{
      imageUrl: 'http://a.com/assets/image.png',
      fullPath: 'post/path/assets_image.png'
    }, {
      imageUrl: 'http://a.com/assets/image2.png',
      fullPath: 'post/path/assets_image2.png'
    }]
  },
  {
    description: 'returns valid imageInfos for images with same id',
    input: {
      folderPath: 'post/path',
      imageUrls: [
        'http://a.com/image.png',
        'http://other-domain.com/image.png'
      ]
    },
    output: [{
      imageUrl: 'http://a.com/image.png',
      fullPath: 'post/path/image.png'
    }, {
      imageUrl: 'http://other-domain.com/image.png',
      fullPath: 'post/path/image__2.png'
    }]
  }
];
