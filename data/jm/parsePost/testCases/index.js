/* eslint-disable max-lines */
/* eslint-disable max-len */
/* eslint-disable no-magic-numbers */
const fs = require('fs');
const path = require('path');

const loadHtm = (fileName) => fs.readFileSync(path.join(__dirname, `${fileName}.htm`)); // eslint-disable-line no-sync

module.exports = [
  {
    /* Input */
    url: 'http://joemonster.org/art/40836/Mistrzowie_internetu_XXXIV_Swiezak_Viagra_Wladyslaw',
    htm: loadHtm('Mistrzowie_internetu_XXXIV_Swiezak_Viagra_Wladyslaw'),

    /* Required */
    id: '40836',
    folderName: 'Mistrzowie_internetu_XXXIV_Swiezak_Viagra_Wladyslaw',
    nextUrls: [
      'http://joemonster.org/art/22104/Problemy%20wsp%C3%B3%C5%82czesnego%20%C5%9Bwiata',
      'http://joemonster.org/art/24889/Kompilacja_rodzicow_na_medal_II',
      'http://joemonster.org/art/25961/Dobre%20i%20z%C5%82e%20strony%20posiadania%20s%C4%85siad%C3%B3w',
      'http://joemonster.org/art/26004/Wyj%C4%85tkowe%20zdj%C4%99cia,%20kt%C3%B3rych%20nie%20mo%C5%BCesz%20nie%20zobaczy%C4%87',
      'http://joemonster.org/art/26071/23%20gify,%20od%20kt%C3%B3rych%20nie%20b%C4%99dziesz%20m%C3%B3g%C5%82%20si%C4%99%20oderwa%C4%87',
      'http://joemonster.org/art/30548/Aktorzy,%20kt%C3%B3rzy%20prawie%20stracili%20%C5%BCycie%20na%20planie',
      'http://joemonster.org/art/34829/Zaslyszane_w_aptece_czyli_autentyczne_teksty_jakie_slysza_farmaceuci',
      'http://joemonster.org/art/38465/Japonia%20to%20stan%20umys%C5%82u,%20a%20Japo%C5%84czycy%20to%20prawdziwe%20szajbusy%20III',
      'http://joemonster.org/art/38544/Pracujac_w_tych_zawodach_bedziesz_mial_do_czynienia_z_najwieksza_iloscia_idiotow',
      'http://joemonster.org/art/40835/Jak_los_sie_do_mnie_usmiechnal_prawie_trafilem_do_telewizji_i_zostalem_Zbyszkiem_z_Sieradza',
      'http://joemonster.org/art/45484/Co_sprawilo_ze_skorupa_auta_za_ktora_jej_wlasciciel_chcial_700_dolarow_sprzedala_sie_za_ponad_200_000_dolarow_',
      'http://joemonster.org/art/45485/Mistrzowie_internetu_CLXVIII_Rozenek_i_Majdan_wystawili_na_aukcje_swoje_oddechy',
      'http://joemonster.org/art/45486/Najwieksze_obciachy_ostatnich_dni_Seksualny_problem_24_letniej_milionerki',
      'http://joemonster.org/art/45493/Marzenie_wielu_byc_wiecznie_mlodym._A_te_gwiazdy_wygladaja_jakby_to_marzenie_spelnily',
      'http://joemonster.org/art/45496/Rzeczy_ktorych_nie_widuje_sie_na_co_dzien_XLVII_pierwsza_w_historii_roslina_na_Ksiezycu',
      'http://joemonster.org/art/45497/Faktopedia_DCXIV_na_Mazowszu_odkryto_grobowiec_sprzed_niemal_2000_lat',
      'http://joemonster.org/art/45499/20_tekstow_ktore_swietnie_obrazuja_jak_to_jest_byc_rodzicem_VI',
      'http://joemonster.org/art/45501/Przypadki_fatalnych_projektow_zabawek_na_placach_zabaw_dla_dzieci',
      'http://joemonster.org/art/45502/Glebokie_przemyslenia_internautow_LII',
      'http://joemonster.org/art/45503/Personel_pokladowy_marzy_zeby_pasazerowie_przestali_robic_te_rzeczy',
      'http://joemonster.org/art/45504/Najglupsze_rzeczy_jakie_zrobilem_bedac_dzieckiem_wspomnienia_internautow',
      'http://joemonster.org/art/45505/7_pokreconych_faktow_ze_zwariowanej_historii_motoryzacji',
      'http://joemonster.org/art/45506/Byla_wzieta_modelka_dzis_opowiada_na_nasze_pytania',
      'http://joemonster.org/art/45507/Miliony_Polakow_dostalo_od_amerykanskiego_giganta_darmowy_prezent._Asystent_odpowie_na_prawie_kazde_pytanie',
      'http://joemonster.org/art/45508/Najglupszy_ban_jaki_dostalem_na_Facebooku',
      'http://joemonster.org/art/45509/Najmocniejsze_cytaty_ostatnich_dni_Zaskakujace_wyznanie_bylej_gwiazdy_p0rno',
      'http://joemonster.org/art/45510/Moje_zdanie_o_calej_tej_gownoburzy_jaka_urodzila_sie_po_tym_jak_swiat_obejrzal_nowa_reklame_Gillette',
      'http://joemonster.org/art/45511/Przerobcie_moje_zdjecie_Czesc_XIX',
      'http://joemonster.org/art/45512/Chcial_sie_pochwalic_kasa_jaka_wydaje_na_ubrania_ale_mistrzowska_riposta_sprowadzila_go_na_ziemie',
      'http://joemonster.org/art/45513/Wielopak_Weekendowy_DCCCIX',
      'http://joemonster.org/art/45514/Postanowilem_zebrac_swoje_mysli_i_wyjsc_do_Ciebie_z_pewna_inicjatywa._Wchodzisz_w_to_',
      'http://joemonster.org/art/45515/7_ciekawych_faktow_o_tym_co_pachnie_i_co_delikatnie_mowiac_nie_pachnie_',
      'http://joemonster.org/art/45516/Janusze_turystyki_czyli_wspomnienia_przewodniczki_wycieczek_po_Turcji',
      'http://joemonster.org/art/45517/Mistrzowie_internetu_CLXIX_Znaleziono_bursztynowa_komnate_'
    ],
    imageUrls: [
      'https://img.joemonster.org/images/vad/img_41871/5b2a34a116eca0342944916541cdc895.jpg',
      'https://img.joemonster.org/images/vad/img_41871/f92c2445a9435cb9c74f0fb5fe014e8b.jpg',
      'https://img.joemonster.org/images/vad/img_41871/0510d917c5383661c63ebb738240aee6.jpg',
      'https://img.joemonster.org/images/vad/img_41871/a6be9697f2c1e17ae9c0347972599eb0.jpg',
      'https://img.joemonster.org/images/vad/img_41871/7fca6879995893675aa241bdcae7847b.jpg',
      'https://img.joemonster.org/images/vad/img_41871/36dc2941f12f8238573df5747bac6fe3.jpg',
      'https://img.joemonster.org/images/vad/img_41871/ce9e4295b482b51c1364fda57dd91bc1.jpg',
      'https://img.joemonster.org/images/vad/img_41871/70c3434386d658e05e706b4400372293.jpg',
      'https://img.joemonster.org/images/vad/img_41871/5847a6d2bee975116dcf2355448b12d9.jpg',
      'https://img.joemonster.org/images/vad/img_41871/24aa5c8d5603f84dbb58926b550d5b74.jpg',
      'https://img.joemonster.org/images/vad/img_41871/74c15c93c0c4d1442618bf9e035bbf7b.jpg',
      'https://img.joemonster.org/images/vad/img_41871/0defb6edd9df9c1a889bfafded1f623b.jpg',
      'https://img.joemonster.org/images/vad/img_41871/fa2465782dbc876f9eb1af55fceeb3e5.jpg',
      'https://img.joemonster.org/images/vad/img_41871/093083f63e026745a122fde137d39116.jpg',
      'https://img.joemonster.org/images/vad/img_41871/0965e456fe3086354031cd3de443fe27.jpg',
      'https://img.joemonster.org/images/vad/img_41871/149d74521b02d099a229db8afca4e2a3.jpg',
      'https://img.joemonster.org/images/vad/img_41871/362618d810c83ec79b4a99111bf574f8.jpg',
      'https://img.joemonster.org/images/vad/img_41871/19f683c554e0bacc465dcb420b901e39.jpg',
      'https://img.joemonster.org/images/vad/img_41871/d51f2090942e2a31aed9f50ea3a19b7a.jpg',
      'https://img.joemonster.org/images/vad/img_41871/af0ff794a7c68d96e0301c7ef17496b7.jpg',
      'https://img.joemonster.org/images/vad/img_41871/d6f5cbde1e36bc427f10322ee0813505.jpg',
      'https://img.joemonster.org/images/vad/img_41871/3805d87af16a07aa360d4b48315acac2.jpg',
      'https://img.joemonster.org/images/vad/img_41871/d051520a6fde341e71eeb92cdb236d2e.jpg',
      'https://img.joemonster.org/images/vad/img_41871/ee7bb32c26215a5360b59aad2284e965.jpg',
      'https://img.joemonster.org/images/vad/img_41871/3dffa63bac64d1bc78666b1babef9a83.jpg',
      'https://img.joemonster.org/images/vad/img_41871/c9759f942e8faee4347316dedfd2485c.jpg',
      'https://img.joemonster.org/images/vad/img_41871/965f49ddc48be468f1dced65e67ff21f.jpg',
      'https://img.joemonster.org/images/vad/img_41871/4bd8630aa87398a4e44ad2330197e836.jpg',
      'https://img.joemonster.org/images/vad/img_41871/6714b3a3d46caf8e3f130facf50b1ddf.jpg',
      'https://img.joemonster.org/images/vad/img_41871/a0ee2507586a1150582a117aabc6de95.jpg'
    ],

    /* extra details */
    title: 'Mistrzowie internetu XXXIV - Świeżak Viagra Władysław',
    author: 'Kosciarz',
    addedDate: '2017-09-23 06:00',
    tags: ['mistrzowie', 'cięte', 'riposty', 'świeżaki', 'viagra', 'ciężarek'],
    commentCount: 25,
    commentLinks: [
      'https://olxpl-ring04.akamaized.net/images_tablicapl/592486594_1_261x203_swiezak-groszek-juniorzy-wroclaw.jpg',
      'https://i.imgur.com/eemdALy.jpg'
    ]
  }
];
