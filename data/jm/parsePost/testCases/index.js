const fs = require('fs');
const path = require('path');

const loadHtm = (fileName) => fs.readFileSync(path.join(__dirname, `${fileName}.htm`)); // eslint-disable-line no-sync

module.exports = [
  {
    url: 'http://joemonster.org/art/40836/Mistrzowie_internetu_XXXIV_Swiezak_Viagra_Wladyslaw',
    htm: loadHtm('Mistrzowie_internetu_XXXIV_Swiezak_Viagra_Wladyslaw'),
    id: '40836',
    nextUrls: [
      '/art/40835/Jak_los_sie_do_mnie_usmiechnal_prawie_trafilem_do_telewizji_i_zostalem_Zbyszkiem_z_Sieradza',
      '/art/24889/Kompilacja_rodzicow_na_medal_II'
    ],
    imageUrls: [
      'https://img.joemonster.org/images/vad/img_41871/5b2a34a116eca0342944916541cdc895.jpg?1505890440',
      'https://img.joemonster.org/images/vad/img_41871/f92c2445a9435cb9c74f0fb5fe014e8b.jpg?1505925919',
      'https://img.joemonster.org/images/vad/img_41871/0510d917c5383661c63ebb738240aee6.jpg?1505906656',
      'https://img.joemonster.org/images/vad/img_41871/a6be9697f2c1e17ae9c0347972599eb0.jpg?1505853077',
      'https://img.joemonster.org/images/vad/img_41871/7fca6879995893675aa241bdcae7847b.jpg?1505760854',
      'https://img.joemonster.org/images/vad/img_41871/36dc2941f12f8238573df5747bac6fe3.jpg?1505929547',
      'https://img.joemonster.org/images/vad/img_41871/ce9e4295b482b51c1364fda57dd91bc1.jpg?1506096755',
      'https://img.joemonster.org/images/vad/img_41871/70c3434386d658e05e706b4400372293.jpg?1504808991',
      'https://img.joemonster.org/images/vad/img_41871/5847a6d2bee975116dcf2355448b12d9.jpg?1505387745',
      'https://img.joemonster.org/images/vad/img_41871/24aa5c8d5603f84dbb58926b550d5b74.jpg?1505931545',
      'https://img.joemonster.org/images/vad/img_41871/74c15c93c0c4d1442618bf9e035bbf7b.jpg?1506014188',
      'https://img.joemonster.org/images/vad/img_41871/0defb6edd9df9c1a889bfafded1f623b.jpg?1506016620',
      'https://img.joemonster.org/images/vad/img_41871/fa2465782dbc876f9eb1af55fceeb3e5.jpg?1505936263',
      'https://img.joemonster.org/images/vad/img_41871/093083f63e026745a122fde137d39116.jpg?1505842912',
      'https://img.joemonster.org/images/vad/img_41871/0965e456fe3086354031cd3de443fe27.jpg?1506077831',
      'https://img.joemonster.org/images/vad/img_41871/149d74521b02d099a229db8afca4e2a3.jpg?1505485035',
      'https://img.joemonster.org/images/vad/img_41871/362618d810c83ec79b4a99111bf574f8.jpg?1505908928',
      'https://img.joemonster.org/images/vad/img_41871/19f683c554e0bacc465dcb420b901e39.jpg?1505993003',
      'https://img.joemonster.org/images/vad/img_41871/d51f2090942e2a31aed9f50ea3a19b7a.jpg?1505335664',
      'https://img.joemonster.org/images/vad/img_41871/af0ff794a7c68d96e0301c7ef17496b7.jpg?1505476582',
      'https://img.joemonster.org/images/vad/img_41871/d6f5cbde1e36bc427f10322ee0813505.jpg?1505484805',
      'https://img.joemonster.org/images/vad/img_41871/3805d87af16a07aa360d4b48315acac2.jpg?1505907554',
      'https://img.joemonster.org/images/vad/img_41871/d051520a6fde341e71eeb92cdb236d2e.jpg?1505754988',
      'https://img.joemonster.org/images/vad/img_41871/ee7bb32c26215a5360b59aad2284e965.jpg?1505766428',
      'https://img.joemonster.org/images/vad/img_41871/3dffa63bac64d1bc78666b1babef9a83.jpg?1505890936',
      'https://img.joemonster.org/images/vad/img_41871/c9759f942e8faee4347316dedfd2485c.jpg?1505909116',
      'https://img.joemonster.org/images/vad/img_41871/965f49ddc48be468f1dced65e67ff21f.jpg?1505909943',
      'https://img.joemonster.org/images/vad/img_41871/4bd8630aa87398a4e44ad2330197e836.jpg?1505765470',
      'https://img.joemonster.org/images/vad/img_41871/6714b3a3d46caf8e3f130facf50b1ddf.jpg?1505934418',
      'https://img.joemonster.org/images/vad/img_41871/a0ee2507586a1150582a117aabc6de95.jpg?1505925833'
    ]
  }
];
