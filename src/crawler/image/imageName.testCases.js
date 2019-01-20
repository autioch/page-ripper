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
      fullPath: 'post/path/image.jpeg'
    }]
  },
  {
    input: {
      folderName: 'post/path',
      imageUrls: [
        'https://youtu.be/cmh0YmoJrbs?t=311'
      ]
    },
    output: [{
      imageUrl: 'https://youtu.be/cmh0YmoJrbs?t=311',
      fullPath: 'post/path/cmh0YmoJrbs_t=311'
    }]
  },
  {
    input: {
      folderName: 'post/path',
      imageUrls: [
        'https://bit.ly/2SCAroJ'
      ]
    },
    output: [{
      imageUrl: 'https://bit.ly/2SCAroJ',
      fullPath: 'post/path/2SCAroJ'
    }]
  },
  {
    input: {
      folderName: 'post/path',
      imageUrls: [
        'https://podroze.onet.pl/polska/malopolskie/most-jana-stacha-w-znamirowicach-nad-jeziorem-roznowskim/hp511ye'
      ]
    },
    output: [{
      imageUrl: 'https://podroze.onet.pl/polska/malopolskie/most-jana-stacha-w-znamirowicach-nad-jeziorem-roznowskim/hp511ye',
      fullPath: 'post/path/polska_malopolskie_most-jana-stacha-w-znamirowicach-nad-jeziorem-roznowskim_hp511ye'
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
      fullPath: 'post/path/image.png'
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
      fullPath: 'post/path/assets_image.png'
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
      fullPath: 'post/path/assets_complicated image-name_bonus_double.png'
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
      fullPath: 'post/path/assets_image.png'
    }, {
      imageUrl: 'http://a.com/assets/image2.png',
      fullPath: 'post/path/assets_image2.png'
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
      fullPath: 'post/path/image.png'
    }, {
      imageUrl: 'http://other-domain.com/image.png',
      fullPath: 'post/path/image__2.png'
    }]
  }
];
