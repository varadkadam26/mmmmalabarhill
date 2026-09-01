const db = require('../config/db');

// Ganeshotsav Event Schedule Data for Malabar Hill Cha Raja
const SCHEDULE_LOCATION_EN = 'Ganesh Chowk, Bhaji Galli, Shankar Sheth Road, Grant Road (W), Mumbai-400007';
const SCHEDULE_LOCATION_MR = 'गणेश चौक, भाजी गल्ली, शंकर शेट रोड, ग्रँट रोड (पश्चिम), मुंबई - ४००००७';

const scheduleData = [
  { day:1, dateMr:'सोमवार, १४-०९-२०२६', dateEn:'Monday, 14-09-2026', titleMr:'श्री गणेश मूर्ती प्राणप्रतिष्ठा', titleEn:'Shree Ganesh Idol Pratishthapana', locationMr:SCHEDULE_LOCATION_MR, locationEn:SCHEDULE_LOCATION_EN, halt_location:SCHEDULE_LOCATION_EN, timeMr:'सकाळी', timeEn:'Morning', emergency_contact:'+91 93261 50793' },
  { day:2, dateMr:'मंगळवार, १५-०९-२०२६', dateEn:'Tuesday, 15-09-2026', titleMr:'स्थानिक कार्यक्रम', titleEn:'Local Cultural Programs', locationMr:SCHEDULE_LOCATION_MR, locationEn:SCHEDULE_LOCATION_EN, halt_location:SCHEDULE_LOCATION_EN, timeMr:'दिवसभर', timeEn:'Full Day', emergency_contact:'+91 93261 50793' },
  { day:3, dateMr:'बुधवार, १६-०९-२०२६', dateEn:'Wednesday, 16-09-2026', titleMr:'स्थानिक कार्यक्रम', titleEn:'Local Cultural Programs', locationMr:SCHEDULE_LOCATION_MR, locationEn:SCHEDULE_LOCATION_EN, halt_location:SCHEDULE_LOCATION_EN, timeMr:'दिवसभर', timeEn:'Full Day', emergency_contact:'+91 93261 50793' },
  { day:4, dateMr:'गुरुवार, १७-०९-२०२६', dateEn:'Thursday, 17-09-2026', titleMr:'स्थानिक कार्यक्रम', titleEn:'Local Cultural Programs', locationMr:SCHEDULE_LOCATION_MR, locationEn:SCHEDULE_LOCATION_EN, halt_location:SCHEDULE_LOCATION_EN, timeMr:'दिवसभर', timeEn:'Full Day', emergency_contact:'+91 93261 50793' },
  { day:5, dateMr:'शुक्रवार, १८-०९-२०२६', dateEn:'Friday, 18-09-2026', titleMr:'स्थानिक कार्यक्रम', titleEn:'Local Cultural Programs', locationMr:SCHEDULE_LOCATION_MR, locationEn:SCHEDULE_LOCATION_EN, halt_location:SCHEDULE_LOCATION_EN, timeMr:'दिवसभर', timeEn:'Full Day', emergency_contact:'+91 93261 50793' },
  { day:6, dateMr:'शनिवार, १९-०९-२०२६', dateEn:'Saturday, 19-09-2026', titleMr:'स्थानिक कार्यक्रम', titleEn:'Local Cultural Programs', locationMr:SCHEDULE_LOCATION_MR, locationEn:SCHEDULE_LOCATION_EN, halt_location:SCHEDULE_LOCATION_EN, timeMr:'दिवसभर', timeEn:'Full Day', emergency_contact:'+91 93261 50793' },
  { day:7, dateMr:'रविवार, २०-०९-२०२६', dateEn:'Sunday, 20-09-2026', titleMr:'चित्रकला स्पर्धा', titleEn:'Drawing Competition', locationMr:SCHEDULE_LOCATION_MR, locationEn:SCHEDULE_LOCATION_EN, halt_location:SCHEDULE_LOCATION_EN, timeMr:'सकाळी ११:०० वा.', timeEn:'11:00 AM', emergency_contact:'+91 93261 50793' },
  { day:8, dateMr:'सोमवार, २१-०९-२०२६', dateEn:'Monday, 21-09-2026', titleMr:'पाककला व हळदीकुंकू', titleEn:'Cooking Competition & Haldi Kumkum', locationMr:SCHEDULE_LOCATION_MR, locationEn:SCHEDULE_LOCATION_EN, halt_location:SCHEDULE_LOCATION_EN, timeMr:'संध्याकाळी ७:०० वा.', timeEn:'7:00 PM', emergency_contact:'+91 93261 50793' },
  { day:9, dateMr:'मंगळवार, २२-०९-२०२६', dateEn:'Tuesday, 22-09-2026', titleMr:'महाप्रसाद', titleEn:'Grand Mahaprasad', locationMr:SCHEDULE_LOCATION_MR, locationEn:SCHEDULE_LOCATION_EN, halt_location:SCHEDULE_LOCATION_EN, timeMr:'दुपारी १२:०० वा.', timeEn:'12:00 PM', emergency_contact:'+91 93261 50793' },
  { day:10, dateMr:'बुधवार, २३-०९-२०२६', dateEn:'Wednesday, 23-09-2026', titleMr:'होम हवन', titleEn:'Hom Havan Ritual', locationMr:SCHEDULE_LOCATION_MR, locationEn:SCHEDULE_LOCATION_EN, halt_location:SCHEDULE_LOCATION_EN, timeMr:'दुपारी ४:०० वा.', timeEn:'4:00 PM', emergency_contact:'+91 93261 50793' },
  { day:11, dateMr:'गुरुवार, २४-०९-२०२६', dateEn:'Thursday, 24-09-2026', titleMr:'बक्षीस समारंभ', titleEn:'Prize Distribution Ceremony', locationMr:SCHEDULE_LOCATION_MR, locationEn:SCHEDULE_LOCATION_EN, halt_location:SCHEDULE_LOCATION_EN, timeMr:'रात्री ८:०० वा.', timeEn:'8:00 PM', emergency_contact:'+91 93261 50793' },
  { day:12, dateMr:'शुक्रवार, २५-०९-२०२६', dateEn:'Friday, 25-09-2026', titleMr:'विसर्जन सोहळा', titleEn:'Grand Visarjan Procession', locationMr:SCHEDULE_LOCATION_MR, locationEn:SCHEDULE_LOCATION_EN, halt_location:SCHEDULE_LOCATION_EN, timeMr:'सकाळी १०:०० वा.', timeEn:'10:00 AM', emergency_contact:'+91 93261 50793' }
];

// Glimpses over a Decade (10+ Years Historical Retrospective Data)
const glimpsesData = [
  {year:'2025',category:'idols',titleMr:'रौप्यवर्णी महादेव अवतार',titleEn:'Silver Mahadev Avatar',themeMr:'शिव-गणेश रूप',themeEn:'Shiva-Ganesha Fusion',height:'—',artistMr:'मंडळ कारागीर',artistEn:'Mandal Artisans',image:'/images/glimpses/final_2025.jpg',descMr:'हातात त्रिशूळ, डमरू आणि शिवलिंगावर विराजमान झालेले चांदीच्या रंगातील श्रीरूप.',descEn:'A stunning silver-hued Ganesha holding a Trishul and Damaru, resting on a Shiva Linga.'},
  {year:'2024',category:'idols',titleMr:'शेषनागाच्या छायेत निळे श्रीरूप',titleEn:'Blue Ganesha with Sheshnag',themeMr:'पौराणिक देवत्व',themeEn:'Divine Mythology',height:'—',artistMr:'मंडळ सेवा पथक',artistEn:'Mandal Seva Team',image:'/images/glimpses/final_2024.jpg',descMr:'विशाल शेषनागाच्या छायेत विराजमान झालेले श्रींचे सुंदर निळे रूप.',descEn:'A crafted blue-hued Ganesha seated under the massive canopy of Sheshnag.'},
  {year:'2023',category:'idols',titleMr:'वीणाधारी सरस्वती अवतार',titleEn:'Saraswati Avatar with Veena',themeMr:'संगीत आणि ज्ञानाचे प्रतीक',themeEn:'Music and Knowledge',height:'—',artistMr:'मंडळ कारागीर',artistEn:'Mandal Artisans',image:'/images/glimpses/final_2023.jpg',descMr:'हातात वीणा आणि सोबत हंस असलेले श्रींचे संगीतमय पांढरे रूप.',descEn:'A pure white depiction of Ganesha holding a Veena, symbolizing knowledge and music.'},
  {year:'2022',category:'idols',titleMr:'देवीच्या पार्श्वभूमीवरील श्री दर्शन',titleEn:'Ganesha with Goddess Aura',themeMr:'शक्ती आणि बुद्धीचा संगम',themeEn:'Shakti and Wisdom',height:'—',artistMr:'मंडळ कारागीर',artistEn:'Mandal Artisans',image:'/images/glimpses/final_2022.jpg',descMr:'मातेच्या रौद्र आणि विशाल चेहऱ्याच्या पार्श्वभूमीवर विराजमान झालेले श्री.',descEn:'Ganesha positioned against a giant, powerful backdrop of the Mother Goddess.'},
  {year:'2021',category:'idols',titleMr:'श्री दर्शन (२०२१)',titleEn:'Ganesha Darshan (2021)',themeMr:'पारंपारिक दर्शन',themeEn:'Traditional Darshan',height:'—',artistMr:'मंडळ कारागीर',artistEn:'Mandal Artisans',image:'/images/glimpses/final_2021.jpg',descMr:'२०२१ सालचे सुंदर श्री रूप.',descEn:'Ganesha idol from 2021.', hideFromReel: true},
  {year:'2019',category:'idols',titleMr:'शिवछत्रपती राजमुद्रा व राजेशाही सिंहासन',titleEn:'Shivchhatrapati Rajmudra & Royal Throne',themeMr:'शिवराज्यभिषेक व छत्रपती राजमुद्रा',themeEn:'Shivrajyabhishek & Chhatrapati Rajmudra Arch',height:'—',artistMr:'मंडळ कारागीर',artistEn:'Mandal Artisans',image:'/images/glimpses/2019.jpg',descMr:'शिवछत्रपती शिवरायांच्या सुवर्ण राजमुद्रेच्या भव्य कमानीत आणि राजेशाही सिंहासनावर विराजमान श्रींचे मनमोहक रूप.',descEn:'Divine Ganesha seated on a magnificent royal throne backed by Chhatrapati Shivaji Maharaj\'s sacred Rajmudra seal arch.'},
  {year:'2018',category:'idols',titleMr:'श्री दर्शन (२०१८)',titleEn:'Ganesha Darshan (2018)',themeMr:'पारंपारिक दर्शन',themeEn:'Traditional Darshan',height:'—',artistMr:'मंडळ कारागीर',artistEn:'Mandal Artisans',image:'/images/glimpses/2018.jpg',descMr:'२०१८ सालचे सुंदर श्री रूप.',descEn:'Ganesha idol from 2018.', hideFromReel: true},
  {year:'2017',category:'idols',titleMr:'श्री दर्शन (२०१७)',titleEn:'Ganesha Darshan (2017)',themeMr:'पारंपारिक दर्शन',themeEn:'Traditional Darshan',height:'—',artistMr:'मंडळ कारागीर',artistEn:'Mandal Artisans',image:'/images/glimpses/2017.jpg',descMr:'२०१७ सालचे सुंदर श्री रूप.',descEn:'Ganesha idol from 2017.', hideFromReel: true},
  {year:'2016',category:'idols',titleMr:'श्री दर्शन (२०१६)',titleEn:'Ganesha Darshan (2016)',themeMr:'पारंपारिक दर्शन',themeEn:'Traditional Darshan',height:'—',artistMr:'मंडळ कारागीर',artistEn:'Mandal Artisans',image:'/images/glimpses/2016.jpg',descMr:'२०१६ सालचे सुंदर श्री रूप.',descEn:'Ganesha idol from 2016.', hideFromReel: true},
  {year:'2015',category:'idols',titleMr:'श्री दर्शन (२०१५)',titleEn:'Ganesha Darshan (2015)',themeMr:'पारंपारिक दर्शन',themeEn:'Traditional Darshan',height:'—',artistMr:'मंडळ कारागीर',artistEn:'Mandal Artisans',image:'/images/glimpses/2015.jpg',descMr:'२०१५ सालचे सुंदर श्री रूप.',descEn:'Ganesha idol from 2015.', hideFromReel: true},
  {year:'2014',category:'idols',titleMr:'श्री दर्शन (२०१४)',titleEn:'Ganesha Darshan (2014)',themeMr:'पारंपारिक दर्शन',themeEn:'Traditional Darshan',height:'—',artistMr:'मंडळ कारागीर',artistEn:'Mandal Artisans',image:'/images/glimpses/2014.jpg',descMr:'२०१४ सालचे सुंदर श्री रूप.',descEn:'Ganesha idol from 2014.', hideFromReel: true},
  {year:'2013',category:'idols',titleMr:'श्री दर्शन (२०१३)',titleEn:'Ganesha Darshan (2013)',themeMr:'पारंपारिक दर्शन',themeEn:'Traditional Darshan',height:'—',artistMr:'मंडळ कारागीर',artistEn:'Mandal Artisans',image:'/images/glimpses/2013.jpg',descMr:'२०१३ सालचे सुंदर श्री रूप.',descEn:'Ganesha idol from 2013.', hideFromReel: true},
  {year:'2012',category:'idols',titleMr:'श्री दर्शन (२०१२)',titleEn:'Ganesha Darshan (2012)',themeMr:'पारंपारिक दर्शन',themeEn:'Traditional Darshan',height:'—',artistMr:'मंडळ कारागीर',artistEn:'Mandal Artisans',image:'/images/glimpses/2012.jpg',descMr:'२०१२ सालचे सुंदर श्री रूप.',descEn:'Ganesha idol from 2012.', hideFromReel: true},
  {year:'2011',category:'idols',titleMr:'श्री दर्शन (२०११)',titleEn:'Ganesha Darshan (2011)',themeMr:'पारंपारिक दर्शन',themeEn:'Traditional Darshan',height:'—',artistMr:'मंडळ कारागीर',artistEn:'Mandal Artisans',image:'/images/glimpses/2011.jpg',descMr:'२०११ सालचे सुंदर श्री रूप.',descEn:'Ganesha idol from 2011.', hideFromReel: true},
  {year:'2010',category:'idols',titleMr:'श्री दर्शन (२०१०)',titleEn:'Ganesha Darshan (2010)',themeMr:'पारंपारिक दर्शन',themeEn:'Traditional Darshan',height:'—',artistMr:'मंडळ कारागीर',artistEn:'Mandal Artisans',image:'/images/glimpses/2010.jpg',descMr:'२०१० सालचे सुंदर श्री रूप.',descEn:'Ganesha idol from 2010.', hideFromReel: true},
  {year:'2009',category:'idols',titleMr:'श्री दर्शन (२००९)',titleEn:'Ganesha Darshan (2009)',themeMr:'पारंपारिक दर्शन',themeEn:'Traditional Darshan',height:'—',artistMr:'मंडळ कारागीर',artistEn:'Mandal Artisans',image:'/images/glimpses/2009.jpg',descMr:'२००९ सालचे सुंदर श्री रूप.',descEn:'Ganesha idol from 2009.', hideFromReel: true},
  {year:'2008',category:'idols',titleMr:'श्री दर्शन (२००८)',titleEn:'Ganesha Darshan (2008)',themeMr:'पारंपारिक दर्शन',themeEn:'Traditional Darshan',height:'—',artistMr:'मंडळ कारागीर',artistEn:'Mandal Artisans',image:'/images/glimpses/2008.jpg',descMr:'२००८ सालचे सुंदर श्री रूप.',descEn:'Ganesha idol from 2008.', hideFromReel: true},
  {year:'2007',category:'idols',titleMr:'श्री दर्शन (२००७)',titleEn:'Ganesha Darshan (2007)',themeMr:'पारंपारिक दर्शन',themeEn:'Traditional Darshan',height:'—',artistMr:'मंडळ कारागीर',artistEn:'Mandal Artisans',image:'/images/glimpses/2007.jpg',descMr:'२००७ सालचे सुंदर श्री रूप.',descEn:'Ganesha idol from 2007.', hideFromReel: true},
  {year:'2006',category:'idols',titleMr:'श्री दर्शन (२००६)',titleEn:'Ganesha Darshan (2006)',themeMr:'पारंपारिक दर्शन',themeEn:'Traditional Darshan',height:'—',artistMr:'मंडळ कारागीर',artistEn:'Mandal Artisans',image:'/images/glimpses/2006.jpg',descMr:'२००६ सालचे सुंदर श्री रूप.',descEn:'Ganesha idol from 2006.', hideFromReel: true},
  {year:'2005',category:'idols',titleMr:'श्री दर्शन (२००५)',titleEn:'Ganesha Darshan (2005)',themeMr:'पारंपारिक दर्शन',themeEn:'Traditional Darshan',height:'—',artistMr:'मंडळ कारागीर',artistEn:'Mandal Artisans',image:'/images/glimpses/2005.jpg',descMr:'२००५ सालचे सुंदर श्री रूप.',descEn:'Ganesha idol from 2005.', hideFromReel: true},
  {year:'2004',category:'idols',titleMr:'श्री दर्शन (२००४)',titleEn:'Ganesha Darshan (2004)',themeMr:'पारंपारिक दर्शन',themeEn:'Traditional Darshan',height:'—',artistMr:'मंडळ कारागीर',artistEn:'Mandal Artisans',image:'/images/glimpses/2004.jpg',descMr:'२००४ सालचे सुंदर श्री रूप.',descEn:'Ganesha idol from 2004.', hideFromReel: true},
  {year:'2003',category:'idols',titleMr:'श्री दर्शन (२००३)',titleEn:'Ganesha Darshan (2003)',themeMr:'पारंपारिक दर्शन',themeEn:'Traditional Darshan',height:'—',artistMr:'मंडळ कारागीर',artistEn:'Mandal Artisans',image:'/images/glimpses/2003.jpg',descMr:'२००३ सालचे सुंदर श्री रूप.',descEn:'Ganesha idol from 2003.', hideFromReel: true},
  {year:'2002',category:'idols',titleMr:'श्री दर्शन (२००२)',titleEn:'Ganesha Darshan (2002)',themeMr:'पारंपारिक दर्शन',themeEn:'Traditional Darshan',height:'—',artistMr:'मंडळ कारागीर',artistEn:'Mandal Artisans',image:'/images/glimpses/2002.jpg',descMr:'२००२ सालचे सुंदर श्री रूप.',descEn:'Ganesha idol from 2002.', hideFromReel: true},
  {year:'2001',category:'idols',titleMr:'श्री दर्शन (२००१)',titleEn:'Ganesha Darshan (2001)',themeMr:'पारंपारिक दर्शन',themeEn:'Traditional Darshan',height:'—',artistMr:'मंडळ कारागीर',artistEn:'Mandal Artisans',image:'/images/glimpses/2001.jpg',descMr:'२००१ सालचे सुंदर श्री रूप.',descEn:'Ganesha idol from 2001.', hideFromReel: true},
  {year:'2000',category:'idols',titleMr:'श्री दर्शन (२०००)',titleEn:'Ganesha Darshan (2000)',themeMr:'पारंपारिक दर्शन',themeEn:'Traditional Darshan',height:'—',artistMr:'मंडळ कारागीर',artistEn:'Mandal Artisans',image:'/images/glimpses/2000.jpg',descMr:'२००० सालचे सुंदर श्री रूप.',descEn:'Ganesha idol from 2000.', hideFromReel: true},
  {year:'1999',category:'idols',titleMr:'श्री दर्शन (१९९९)',titleEn:'Ganesha Darshan (1999)',themeMr:'पारंपारिक दर्शन',themeEn:'Traditional Darshan',height:'—',artistMr:'मंडळ कारागीर',artistEn:'Mandal Artisans',image:'/images/glimpses/1999.jpg',descMr:'१९९९ सालचे सुंदर श्री रूप.',descEn:'Ganesha idol from 1999.', hideFromReel: true},
  {year:'1998',category:'idols',titleMr:'श्री दर्शन (१९९८)',titleEn:'Ganesha Darshan (1998)',themeMr:'पारंपारिक दर्शन',themeEn:'Traditional Darshan',height:'—',artistMr:'मंडळ कारागीर',artistEn:'Mandal Artisans',image:'/images/glimpses/1998.jpg',descMr:'१९९८ सालचे सुंदर श्री रूप.',descEn:'Ganesha idol from 1998.', hideFromReel: true},
  {year:'1997',category:'idols',titleMr:'श्री दर्शन (१९९७)',titleEn:'Ganesha Darshan (1997)',themeMr:'पारंपारिक दर्शन',themeEn:'Traditional Darshan',height:'—',artistMr:'मंडळ कारागीर',artistEn:'Mandal Artisans',image:'/images/glimpses/1997.jpg',descMr:'१९९७ सालचे सुंदर श्री रूप.',descEn:'Ganesha idol from 1997.', hideFromReel: true},
  {year:'1996',category:'idols',titleMr:'श्री दर्शन (१९९६)',titleEn:'Ganesha Darshan (1996)',themeMr:'पारंपारिक दर्शन',themeEn:'Traditional Darshan',height:'—',artistMr:'मंडळ कारागीर',artistEn:'Mandal Artisans',image:'/images/glimpses/1996.jpg',descMr:'१९९६ सालचे सुंदर श्री रूप.',descEn:'Ganesha idol from 1996.', hideFromReel: true},
  {year:'1995',category:'idols',titleMr:'श्री दर्शन (१९९५)',titleEn:'Ganesha Darshan (1995)',themeMr:'पारंपारिक दर्शन',themeEn:'Traditional Darshan',height:'—',artistMr:'मंडळ कारागीर',artistEn:'Mandal Artisans',image:'/images/glimpses/1995.jpg',descMr:'१९९५ सालचे सुंदर श्री रूप.',descEn:'Ganesha idol from 1995.', hideFromReel: true},
  {year:'1994',category:'idols',titleMr:'श्री दर्शन (१९९४)',titleEn:'Ganesha Darshan (1994)',themeMr:'पारंपारिक दर्शन',themeEn:'Traditional Darshan',height:'—',artistMr:'मंडळ कारागीर',artistEn:'Mandal Artisans',image:'/images/glimpses/1994.jpg',descMr:'१९९४ सालचे सुंदर श्री रूप.',descEn:'Ganesha idol from 1994.', hideFromReel: true},
  {year:'1993',category:'idols',titleMr:'श्री दर्शन (१९९३)',titleEn:'Ganesha Darshan (1993)',themeMr:'पारंपारिक दर्शन',themeEn:'Traditional Darshan',height:'—',artistMr:'मंडळ कारागीर',artistEn:'Mandal Artisans',image:'/images/glimpses/1993.jpg',descMr:'१९९३ सालचे सुंदर श्री रूप.',descEn:'Ganesha idol from 1993.', hideFromReel: true},
  {year:'1992',category:'idols',titleMr:'श्री दर्शन (१९९२)',titleEn:'Ganesha Darshan (1992)',themeMr:'पारंपारिक दर्शन',themeEn:'Traditional Darshan',height:'—',artistMr:'मंडळ कारागीर',artistEn:'Mandal Artisans',image:'/images/glimpses/1992.jpg',descMr:'१९९२ सालचे सुंदर श्री रूप.',descEn:'Ganesha idol from 1992.', hideFromReel: true},
  {year:'1991',category:'idols',titleMr:'श्री दर्शन (१९९१)',titleEn:'Ganesha Darshan (1991)',themeMr:'पारंपारिक दर्शन',themeEn:'Traditional Darshan',height:'—',artistMr:'मंडळ कारागीर',artistEn:'Mandal Artisans',image:'/images/glimpses/1991.jpg',descMr:'१९९१ सालचे सुंदर श्री रूप.',descEn:'Ganesha idol from 1991.', hideFromReel: true},
  {year:'1990',category:'idols',titleMr:'श्री दर्शन (१९९०)',titleEn:'Ganesha Darshan (1990)',themeMr:'पारंपारिक दर्शन',themeEn:'Traditional Darshan',height:'—',artistMr:'मंडळ कारागीर',artistEn:'Mandal Artisans',image:'/images/glimpses/1990.jpg',descMr:'१९९० सालचे सुंदर श्री रूप.',descEn:'Ganesha idol from 1990.', hideFromReel: true}
];

// Social Work Data
const socialWorkData = [
  {
    id: 'tulsi-vatap',
    title: 'तुळशी वाटप - आषाढी एकादशी', titleMr: 'तुळशी वाटप - आषाढी एकादशी', titleEn: 'Tulsi Vatap - Ashadhi Ekadashi',
    category: 'Environment', categoryMr: 'पर्यावरण', categoryEn: 'Environment',
    image: '/images/tulsi_vatap.png',
    desc: 'आषाढी एकादशी निमित्त मंडळातर्फे तुळशी वाटप. प्रमुख पाहुणे श्री. अरुण भाई दुधवडकर यांच्या हस्ते भाविकांना तुळशी रोपांचे वाटप.', descMr: 'आषाढी एकादशी निमित्त मंडळातर्फे तुळशी वाटप. प्रमुख पाहुणे श्री. अरुण भाई दुधवडकर यांच्या हस्ते भाविकांना तुळशी रोपांचे वाटप.', descEn: 'Tulsi vatap from mandal on the occasion of Ashadhi Ekadashi. Special guest Mr. Arun Bhai Dudhwadkar distributed tulsi saplings to everyone.'
  },
  {
    id: 'school-kits',
    title: 'शालेय साहित्य वाटप', titleMr: 'शालेय साहित्य वाटप', titleEn: 'School Kits Distribution',
    category: 'Education', categoryMr: 'शैक्षणिक मदत', categoryEn: 'Education',
    image: '/images/school_kits.png',
    desc: 'परिसरातील सर्व विद्यार्थ्यांसाठी शालेय साहित्याचे वाटप.', descMr: 'परिसरातील सर्व विद्यार्थ्यांसाठी शालेय साहित्याचे वाटप.', descEn: 'School kits drive in our area for all the students.'
  },
  {
    id: '2017-rain-relief',
    title: '२०१७ अतिवृष्टी मदत - अन्न व निवारा', titleMr: '२०१७ अतिवृष्टी मदत - अन्न व निवारा', titleEn: '2017 Heavy Rain Relief - Food & Shelter',
    category: 'Disaster Relief', categoryMr: 'आपत्कालीन मदत', categoryEn: 'Disaster Relief',
    image: '/images/2017_rain_relief.png',
    desc: '२०१७ च्या मुसळधार पावसात गणेशोत्सवादरम्यान रेल्वे स्थानकावर अडकलेल्या नागरिकांसाठी अन्न आणि जवळच्या शाळेत निवाऱ्याची सोय.', descMr: '२०१७ च्या मुसळधार पावसात गणेशोत्सवादरम्यान रेल्वे स्थानकावर अडकलेल्या नागरिकांसाठी अन्न आणि जवळच्या शाळेत निवाऱ्याची सोय.', descEn: 'During the 2017 heavy rains in Mumbai amidst Ganeshotsav, provided meals and arranged shelter in a nearby school for people stranded at the railway station.'
  },
  {
    id: 'food-distribution-nov2025',
    title: 'भाजी गल्ली, गणेश चौक अन्नदान', titleMr: 'भाजी गल्ली, गणेश चौक अन्नदान', titleEn: 'Food Distribution at Bhajji Galli, Ganesh Chowk',
    category: 'Food Security', categoryMr: 'अन्नसुरक्षा', categoryEn: 'Food Security',
    date: 'Nov 2025', dateMr: 'नोव्हेंबर २०२५', dateEn: 'Nov 2025',
    image: '/images/food_distribution_nov2025.png',
    desc: 'भाजी गल्लीतील गणेश चौकात नागरिकांसाठी अन्न वाटपाचा उपक्रम.', descMr: 'भाजी गल्लीतील गणेश चौकात नागरिकांसाठी अन्न वाटपाचा उपक्रम.', descEn: 'Food distribution drive conducted at Bhajji Galli, near Ganesh Chowk for the local community.'
  },
  {
    id: 'escalator-request-dec2025',
    title: 'ग्रँट रोड स्टेशन एस्केलेटर मागणी', titleMr: 'ग्रँट रोड स्टेशन एस्केलेटर मागणी', titleEn: 'Grant Road Station Escalator Request',
    category: 'Civic Issue', categoryMr: 'नागरी सुविधा', categoryEn: 'Civic Issue',
    date: 'Dec 2025', dateMr: 'डिसेंबर २०२५', dateEn: 'Dec 2025',
    image: '/images/grant_road_escalator.png',
    desc: 'स्थानिक रहिवासी आणि प्रवाशांच्या सोयीसाठी ग्रँट रोड स्टेशनवर एस्केलेटर बसवण्याची मागणी करणारे पत्र रेल्वे स्टेशन मास्तर यांना देण्यात आले.', descMr: 'स्थानिक रहिवासी आणि प्रवाशांच्या सोयीसाठी ग्रँट रोड स्टेशनवर एस्केलेटर बसवण्याची मागणी करणारे पत्र रेल्वे स्टेशन मास्तर यांना देण्यात आले.', descEn: 'Submitted a formal request letter to the Railway Station Master on behalf of local residents and commuters to install an escalator at Grant Road Station.'
  },
  {
    id: 'food-distribution-jan2026',
    title: 'किंग जॉर्ज मेमोरियल स्कूल अन्नदान', titleMr: 'किंग जॉर्ज मेमोरियल स्कूल अन्नदान', titleEn: 'Food Distribution at King George Memorial School',
    category: 'Food Security', categoryMr: 'अन्नसुरक्षा', categoryEn: 'Food Security',
    date: 'Jan 2026', dateMr: 'जानेवारी २०२६', dateEn: 'Jan 2026',
    image: '/images/food_distribution_jan2026.png',
    desc: 'किंग जॉर्ज मेमोरियल स्कूल येथे विद्यार्थी आणि गरजू लोकांसाठी अन्न वाटपाचा उपक्रम राबविण्यात आला.', descMr: 'किंग जॉर्ज मेमोरियल स्कूल येथे विद्यार्थी आणि गरजू लोकांसाठी अन्न वाटपाचा उपक्रम राबविण्यात आला.', descEn: 'Conducted a food distribution drive at King George Memorial School for students and those in need.'
  },
  {
    id: 'khichadi-vatap-feb2026',
    title: 'महाशिवरात्री निमित्त खिचडी वाटप', titleMr: 'महाशिवरात्री निमित्त खिचडी वाटप', titleEn: 'Mahashivratri Khichadi Vatap',
    category: 'Food Security', categoryMr: 'अन्नसुरक्षा', categoryEn: 'Food Security',
    date: 'Feb 2026', dateMr: 'फेब्रुवारी २०२६', dateEn: 'Feb 2026',
    image: '/images/khichadi_vatap_feb2026.png',
    desc: 'महाशिवरात्रीच्या निमित्ताने विजयदत्त स्वामी समर्थ मठ, करी रोड येथे १००० लोकांसाठी उपवासाची खिचडी वाटप.', descMr: 'महाशिवरात्रीच्या निमित्ताने विजयदत्त स्वामी समर्थ मठ, करी रोड येथे १००० लोकांसाठी उपवासाची खिचडी वाटप.', descEn: 'Distributed Upwas Khichadi to 1000 people on the occasion of Mahashivratri at Vijaydatta Swami Samarth Math, Curry Road.'
  },
  {
    id: 'blind-school-donation-march2026',
    title: 'व्हिक्टोरिया मेमोरियल स्कूल अंधांसाठी मदत', titleMr: 'व्हिक्टोरिया मेमोरियल स्कूल अंधांसाठी मदत', titleEn: 'Donation at Victoria Memorial School for Blind',
    category: 'Education & Essentials', categoryMr: 'शिक्षण आणि आवश्यक वस्तू', categoryEn: 'Education & Essentials',
    date: 'March 2026', dateMr: 'मार्च २०२६', dateEn: 'March 2026',
    image: '/images/blind_school_march2026.png',
    desc: 'व्हिक्टोरिया मेमोरियल स्कूलमधील अंध विद्यार्थ्यांसाठी अन्नधान्य, जीवनावश्यक वस्तू आणि अभ्यास संचांचे वाटप.', descMr: 'व्हिक्टोरिया मेमोरियल स्कूलमधील अंध विद्यार्थ्यांसाठी अन्नधान्य, जीवनावश्यक वस्तू आणि अभ्यास संचांचे वाटप.', descEn: 'Provided food ingredients, various essential items, and study kits to blind students at the Victoria Memorial School for the Blind.'
  },
  {
    id: 'chappan-bhog-april2026',
    title: 'गणेश चौकात ५६ भोग प्रसाद', titleMr: 'गणेश चौकात ५६ भोग प्रसाद', titleEn: '56 Bhog Prasad at Ganesh Chowk',
    category: 'Religious Event', categoryMr: 'धार्मिक कार्यक्रम', categoryEn: 'Religious Event',
    date: 'April 2026', dateMr: 'एप्रिल २०२६', dateEn: 'April 2026',
    image: '/images/chappan_bhog_april2026.png',
    desc: 'गणेश चौक येथे गणपती बाप्पाला ५६ भोगाचा प्रसाद अर्पण करण्यात आला.', descMr: 'गणेश चौक येथे गणपती बाप्पाला ५६ भोगाचा प्रसाद अर्पण करण्यात आला.', descEn: 'Offered 56 Bhog Prasad to our Ganpati at Ganesh Chowk.'
  },
  {
    id: 'khichadi-vatap-july2026',
    title: 'आषाढी एकादशी निमित्त खिचडी वाटप', titleMr: 'आषाढी एकादशी निमित्त खिचडी वाटप', titleEn: 'Ashadhi Ekadashi Khichadi Vatap',
    category: 'Food Security', categoryMr: 'अन्नसुरक्षा', categoryEn: 'Food Security',
    date: 'July 2026', dateMr: 'जुलै २०२६', dateEn: 'July 2026',
    image: '/images/khichadi_vatap_july2026.png',
    desc: 'आषाढी एकादशीच्या निमित्ताने विजयदत्त स्वामी समर्थ मठ, करी रोड येथे स्वामी समर्थ आणि विठ्ठलाच्या १५०० भक्तांसाठी खिचडी वाटप.', descMr: 'आषाढी एकादशीच्या निमित्ताने विजयदत्त स्वामी समर्थ मठ, करी रोड येथे स्वामी समर्थ आणि विठ्ठलाच्या १५०० भक्तांसाठी खिचडी वाटप.', descEn: 'Distributed Khichadi to 1500 devotees of Swami Samarth and Vitthal on the occasion of Ashadhi Ekadashi at Vijaydatta Swami Samarth Math, Curry Road.'
  }
];

// Committee Members Data - 2025-26
const committeeData = [
  { number: 1, nameMr: 'श्री. केतन जमनादास पटेल', nameEn: 'Shri Ketan Jamnadas Patel', designationMr: 'कार्याध्यक्ष', designationEn: 'Working President', image: '/images/committee/ketan_patel.png' },
  { number: 2, nameMr: 'श्री. परेश रमेश परब', nameEn: 'Shri Paresh Ramesh Parab', designationMr: 'अध्यक्ष', designationEn: 'President' },
  { number: 3, nameMr: 'श्री. आदित्य पवार', nameEn: 'Shri Aditya Pawar', designationMr: 'उपाध्यक्ष', designationEn: 'Vice President', image: '/images/committee/aditya_pawar.png' },
  { number: 4, nameMr: 'श्री. अभिषेक उगले', nameEn: 'Shri Abhishek Ugale', designationMr: 'उपाध्यक्ष', designationEn: 'Vice President', image: '/images/committee/abhishek_ugale.png' },
  { number: 5, nameMr: 'श्री. चंद्रकांत सांगळे', nameEn: 'Shri Chandrakant Sangale', designationMr: 'उपाध्यक्ष', designationEn: 'Vice President', image: '/images/committee/chandrakant_sangle.png' },
  { number: 7, nameMr: 'श्री. निलेश पटेल', nameEn: 'Shri Nilesh Patel', designationMr: 'सचिव', designationEn: 'Secretary', image: '/images/committee/nilesh_patel.png' },
  { number: 9, nameMr: 'श्री. महेश यमकर', nameEn: 'Shri Mahesh Yamkar', designationMr: 'सहसचिव', designationEn: 'Joint Secretary', image: '/images/committee/mahesh_yamkar.png' },
  { number: 10, nameMr: 'श्री. भुपेंद्र पवार', nameEn: 'Shri Bhupendra Pawar', designationMr: 'सहसचिव', designationEn: 'Joint Secretary', image: '/images/committee/bhupendra_pawar.png' },
  { number: 11, nameMr: 'श्री. सुनिल घुगे', nameEn: 'Shri Sunil Ghuge', designationMr: 'सहसचिव', designationEn: 'Joint Secretary', image: '/images/committee/sunil_ghuge.png' },
  { number: 12, nameMr: 'श्री. सर्वेश सांगळे', nameEn: 'Shri Sarvesh Sangale', designationMr: 'सहसचिव', designationEn: 'Joint Secretary', image: '/images/committee/sarvesh_sangle.jpg' },
  { number: 13, nameMr: 'श्री. शिवकुमार पांडे', nameEn: 'Shri Shivkumar Pande', designationMr: 'खजिनदार', designationEn: 'Treasurer', image: '/images/committee/shivkumar_pande.png' },
  { number: 14, nameMr: 'श्री. निखिल परब', nameEn: 'Shri Nikhil Parab', designationMr: 'खजिनदार', designationEn: 'Treasurer', image: '/images/committee/nikhil_parab_real.png' },
  { number: 15, nameMr: 'श्री. हर्ष पटेल', nameEn: 'Shri Harsh Patel', designationMr: 'खजिनदार', designationEn: 'Treasurer', image: '/images/committee/harsh_patel.png' },
  { number: 16, nameMr: 'श्री. क्षितीज सांगळे', nameEn: 'Shri Kshitij Sangale', designationMr: 'सह खजिनदार', designationEn: 'Joint Treasurer', image: '/images/committee/kshitij_sangale.png' },
  { number: 17, nameMr: 'श्री. अभिषेक पांडे', nameEn: 'Shri Abhishek Pande', designationMr: 'सह खजिनदार', designationEn: 'Joint Treasurer', image: '/images/committee/abhishek_pande.png' },
  { number: 18, nameMr: 'श्री. अमित उपाध्याय', nameEn: 'Shri Amit Upadhyay', designationMr: 'सह खजिनदार', designationEn: 'Joint Treasurer', image: '/images/committee/amit_upadhyay.png' },
  { number: 19, nameMr: 'श्री. राजेश पटेल', nameEn: 'Shri Rajesh Patel', designationMr: 'संयोजक', designationEn: 'Coordinator', image: '/images/committee/rajesh_patel.jpg' },
  { number: 20, nameMr: 'श्री. संतोष सांगळे', nameEn: 'Shri Santosh Sangale', designationMr: 'संयोजक', designationEn: 'Coordinator', image: '/images/committee/santosh_sangale.png' },
  { number: 21, nameMr: 'श्री. अंश जैन', nameEn: 'Shri Ansh Jain', designationMr: 'संयोजक', designationEn: 'Coordinator', image: '/images/committee/ansh_jain.png' },
  { number: 22, nameMr: 'श्री. किशोर शेट्टी कटील', nameEn: 'Shri Kishor Shetty Katil', designationMr: 'स्मरणिका प्रमुख', designationEn: 'Souvenir Head', image: '/images/committee/kishore_shetty_katil.png', objectPosition: 'left center' },
  { number: 23, nameMr: 'श्री. प्रथमेश वारंग', nameEn: 'Shri Prathamesh Warang', designationMr: 'स्मरणिका प्रमुख', designationEn: 'Souvenir Head', image: '/images/committee/prathamesh_warang.png' },
  { number: 25, nameMr: 'श्री. ओम बोले', nameEn: 'Shri Om Bole', designationMr: 'स्मरणिका प्रमुख', designationEn: 'Souvenir Head', image: '/images/committee/om_bole.png' },
  { number: 26, nameMr: 'श्री. प्रथमेश सांगळे', nameEn: 'Shri Prathamesh Sangale', designationMr: 'स्मरणिका प्रमुख', designationEn: 'Souvenir Head', image: '/images/committee/prathamesh_sangale.jpg' },
  { number: 27, nameMr: 'श्री. भौमिक शिर्के', nameEn: 'Shri Bhaumik Shirke', designationMr: 'संयोजक', designationEn: 'Coordinator', image: '/images/committee/bhaumik_shirke.png' }
];

module.exports = {
  // Render Home Page
  renderHomePage(req, res) {
    const status = db.getYatraStatus();
    res.render('index', {
      title: 'Malabar Hill Cha Raja | Shree Bal Gopal Ganeshutsav Mandal, Mumbai',
      metaDescription: 'Official Portal of Malabar Hill Cha Raja (Shree Bal Gopal Ganeshutsav Mandal, Est. 1973, Reg. F-11518). Daily Ganeshotsav live darshan, schedule, historical gallery, social work & 80G tax exempt donations.',
      activeTab: 'home',
      yatraStatus: status,
      scheduleData: scheduleData.slice(0, 4),
      glimpsesData,
      socialWorkData
    });
  },

  // Render About Us Page
  renderAboutPage(req, res) {
    res.render('about', {
      title: 'About Us — History & Legacy | Malabar Hill Cha Raja',
      metaDescription: 'Explore the 50+ year legacy of Shree Bal Gopal Ganeshutsav Mandal (Est. 1973) at Ganesh Chowk, Bhaji Galli, Grant Road (W), Mumbai. Discover our history, vision, and 365-day social work.',
      activeTab: 'about'
    });
  },

  // Render Schedule Page
  renderSchedulePage(req, res) {
    const status = db.getYatraStatus();
    res.render('schedule', {
      title: 'Ganeshotsav 2026 Schedule & Maha Aarti Timings | Malabar Hill Cha Raja',
      metaDescription: 'Official 12-day Ganeshotsav 2026 festival schedule for Malabar Hill Cha Raja. Morning & Evening Maha Aarti timings, Annadan Mahaprasad, cultural events, Hom Havan & Visarjan procession.',
      activeTab: 'schedule',
      yatraStatus: status,
      scheduleData
    });
  },

  // Render Glimpses Page
  renderGlimpsesPage(req, res) {
    res.render('glimpses', {
      title: 'Historical Photo Gallery & Idol Glimpses | Malabar Hill Cha Raja',
      metaDescription: 'Browse the 20+ year historical photo gallery and idol themes of Malabar Hill Cha Raja from 1990 to 2025 by Shree Bal Gopal Ganeshutsav Mandal, Mumbai.',
      activeTab: 'glimpses',
      glimpsesData
    });
  },

  // Render Decade Gallery (Renamed from Photo Booth)
  renderPhotoBoothPage(req, res) {
    res.render('photo-booth', {
      title: 'Decade Glimpses Archive (2015-2025) | Malabar Hill Cha Raja',
      metaDescription: 'View historical retrospective photos and iconic themes of Malabar Hill Cha Raja over the past decade (2015-2025).',
      activeTab: 'photobooth',
      glimpsesData
    });
  },

  // Render Social Work Page
  renderSocialWorkPage(req, res) {
    res.render('social-work', {
      title: 'Social Initiatives & Community Service | Malabar Hill Cha Raja',
      metaDescription: 'Discover community welfare programs by Shree Bal Gopal Ganeshutsav Mandal including Tulsi Vatap, student school kits, 2017 flood relief, and food security drives in Mumbai.',
      activeTab: 'socialwork',
      socialWorkData
    });
  },

  renderCommitteePage(req, res) {
    res.render('committee', {
      title: 'Executive Committee & Trustees | Malabar Hill Cha Raja',
      metaDescription: 'Meet the executive committee members, office bearers, advisory board, and karyakartas of Shree Bal Gopal Ganeshutsav Mandal, Grant Road, Mumbai.',
      activeTab: 'committee',
      committeeData
    });
  },

  // Live Status API
  getLiveStatusApi(req, res) {
    const status = db.getYatraStatus();
    res.json({ success: true, status });
  }
};
