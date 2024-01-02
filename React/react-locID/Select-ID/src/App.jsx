import './App.css'
import { useState, useEffect } from 'react';

function App() {

const tong = [
100004705052224,
100000218696598,
100041428565676,
100004309960476,
1681728825,
100038194550286,
100002713270645,
100014779746703,
100088864309327,
100007119334742,
100003158376431,
100007025283596,
100083626836869,
100041273483603,
100035441738285,
100020015844033,
100068514837191,
100093125230935,
100035655592403,
100051850657218,
100068613703532,
100005018353016,
100011505616522,
100091365803662,
100009513053882,
100000048781079,
100077064046539,
100073961023780,
100081075759696,
100009504613284,
100041609315654,
100004454763308,
100010094853020,
100005072499152,
61552500869174,
100035690832521,
100004417421580,
100004062438983,
100019752900202,
100010965823147,
100070044017192,
100071829682539,
100081078634557,
100002867145315,
100027496921792,
100023723150481,
100017655540041,
100004649460955,
100084147580025,
100031399654192,
100025371378928,
100036092327023,
100015729131658,
61551823920848,
100073204665624,
100002887280446,
100038221771365,
100075107468945,
100001609834883,
100009443082885,
100006052026570,
100011959212667,
100044087539739,
100081911251251,
100000170624260,
100035481494624,
100083606569956,
100064844435433,
100030268820013,
100004024232741,
100058206782613,
100068177496214,
61550567803265,
100011966595086,
100022030691920,
100004390069049,
100055397101003,
100038740148027,
100026459880989,
100072370486552,
100009534518002,
100013602068127,
61551358824922,
100084390474289,
100074638478860,
100014255135261,
100012737852076,
100025360356653,
100014948501925,
100025309142389,
100001380867168,
100038763249410,
100015191206107,
100019123240834,
61550343191256,
100039595292856,
100001484205090,
100008340344523,
100015782835931,
100082384860432,
100006426846467,
100082089580867,
100033901846410,
100046429710374,
100040253810756,
100090153914475,
100023003207404,
100006789125714,
100070001049475,
100054836438676,
100019357582833,
100008682310203,
100007307447763,
100049060441669,
100016679053877,
100006093724047,
100010101947579,
100043906809585,
100052247114604,
100089781020837,
100092497895881,
100009576864122,
100078879883276,
100041662913463,
100028311003586,
100004695072817,
100081355784664,
61551069362433,
100053882587892,
100054765024383,
100026988001637,
100069016126553,
100033394026899,
100027800093972,
100003104396671,
100007806396631,
100005064370593,
100007849186324,
100025908849472,
100004972089905,
100009563514764,
100011256274756,
100065159160601,
100069562668377,
100008326458109,
100009920074814,
100011240231061,
100043417041333,
100021871995350,
100008572962063,
100056845489281,
100081394135753,
100050509880993,
100017753256886,
100008649547954,
100003241763032,
100073416621703,
100029011606421,
100062854270390,
100006405366802,
100092036716110,
100004702052135,
100007954479247,
100023496883018,
100003305612849,
100034994060935,
100063733083346,
100054655144807,
100025490506046,
100005903829775,
100025988949113,
100039560204402,
100013008407947,
100013037138617,
100062178932624,
100053976705767,
100006533445687,
100010840534544,
100095131055670,
100001660426602,
100087570334101,
100012645167559,
100025016690195,
100004389218864,
100058746534972,
100032982003851,
100039231930068,
100051583176907,
100022999128549,
100039341872569,
100093206440478,
100037843432563,
100006879482357,
100009264087220,
100011688330488,
100044950217548,
100092335836662,
100040852823682,
100003106099233,
100040860883112,
100055448086315,
100049200553502,
100005843803429,
100076321175077,
100002792849233,
100007494607003,
100002217235143,
100084524040087,
100007037736587,
100017553120854,
100094074526850,
100044991492727,
100005939088478,
100003056544147,
100013326157851,
100005384469245,
100067137013454,
100054199496140,
100040428754391,
100004032552736,
100086561036847,
100005031037259,
100031267113883,
100057204173481,
100062342318615,
100032241529667,
100074823941057,
100005518230754,
100004516306060,
100023487998708,
100065241135625,
100062287415083,
100086021436367,
100047232275207,
100001127294325,
100086906706285,
100084597277880,
100006146255958,
100044350606283,
100045185286860,
100034519248142,
100076476877958,
100022431584870,
100006220364425,
100024283751665,
100002091588284,
100003338703410,
100060793887052,
100027782528774,
100050252226074,
100085133749155,
100022862562362,
100052620677150,
100007584165268,
100032940052412,
100067866580868,
100087029466150,
100040604421899,
100011838738638,
100007338823579,
100024646783421,
100005168746598,
100004997317483,
100047438203230,
100039723106159,
100003132681335,
100065306194386,
100001415985214,
100012857418384,
100017294701029,
100040456200622,
100022034654603,
100093306713079,
100014014600627,
100042531823931,
100010425630059,
100005047784612,
100038454613523,
100015139248417,
100004356187015,
100006437592273,
100006035651282,
1755261632,
100011873935317,
100093297240238,
100078311649176,
100010501805109,
100094523053109,
100055805508813,
100004271328511,
100036024997951,
100000001977296,
100092405585127,
100061647485201,
100062953757386,
100047118915772,
100032126647133,
100092877943706,
100004118504686,
100005741191539,
100035671386832,
100060307432184,
100002940711637,
100007538914735,
100006965317603,
100040500733045,
100000092471962,
100071402636654,
100009222132251,
100004036524163,
100004603957094,
100081499624682,
100021881086977,
100014866789002,
100009751027190,
100008385739323,
100010036924715,
100041749489393,
100070003964691,
100081588571046,
61553769323686,
61553267352932,
100001640087947,
100055993004560,
100064485843910,
100011431405671,
100004760710724,
100039583642223,
100004015895388,
100052342399555,
100000939198901,
100010192149162,
100001953890648,
100022123339850,
100002961002250,
100001625011550,
100069630229747,
100090995949746,
100005042916688,
100050939716261,
100003841847778,
100086516048895,
100012541365947,
100007672754394,
100009783549085,
100009459650282,
100007065391856,
100006593115615,
100007315446509,
100028200100432,
100063020508777,
100009232575688,
100001030791848,
100001838365545,
100001348778320,
100006828301441,
100028169119188,
100037342933439,
100034705900824,
100049004842536,
100079293052452,
100014976635761,
100019254097268,
100002943743758,
100040130286136,
100025985212386,
100006276302888,
833949240,
100001807268666,
100001179821043,
1243921749,
100009741457271,
100004637172998,
100063479102707,
100023994094743,
100002948115386,
100001471903241,
100035330794871,
100069550009245,
100004286737692,
100004192231046,
100002253938439,
100005440871393,
100029784495917,
100009548200378,
100002971562611,
100004003400540,
100001826814612,
100009282128436,
100013001823495,
100002648119935,
100003964307048,
100075944067816,
100067126184603,
100004154283883,
100007799318305,
100011343496739,
100000226494787,
100009257563423,
100004404909641,
100057294315935,
100058749758847,
100039558824343,
100009968980428,
100004886767070,
100089225737475,
100014085677365,
100006523961000,
100003277881394,
100071859201996,
100034654882359,
100062897042832,
100005239590074,
100055068276646,
100006335376842,
100000238649082,
100005587602574,
100000953534354,
100011747886824,
100019172831871,
100005214887440,
100032054285749,
100004316551029,
100026932693987,
100005304187641,
100020727510008,
100015332041640,
100009106219124,
100028620110733,
100001809524243,
100079562396324,
100010886592375,
100009971627921,
100010639893742,
100008004135673,
100001441838320,
100008508041034,
100004663576824,
100000344242125,
100003717722858,
100009858228251,
100063296482065,
100009181845920,
100007986404700,
100035831133926,
100003985813105,
100004942183142,
100001885406796,
100004093905428,
100007576683445,
100083731448564,
100000046416389,
100000360570834,
100001617317371,
100001602803076,
100006019713593,
100003342384815,
100014025550991,
100002619606168,
100003774267361,
100010603654815,
100005183178882,
100029100636646,
100004191003932,
100003678147237,
100078085841927,
100003735428221,
100087340039333,
100000100703059,
100038153567911,
100009449211551,
100000329961196,
100086031761436,
100005298483256,
1821634993,
100003806316423,
100087347915535,
100009180537297,
100015982599129,
100058593731969,
100053706360865,
100009384047714,
100010689280744,
100085052251635,
100089981981971,
100004268411603,
100084007664994,
100038078015069,
100006022514121,
100006570493778,
100007976553374,
100020352943390,
100009629144351,
100011736062626,
100014388696866,
100011717677692,
100004547076958,
100062595742928,
100001715925424,
100012101658741,
100003116918202,
100004499850860,
100023729359863,
100002451662492,
100024657409253,
566139493,
100001477291545,
100006106415241,
100016729085225,
100000059982768,
100005835009877,
100009098814079,
100006859930186,
100007823131788,
100065738738695,
100001229037752,
100000242841990,
100023740874102,
61552782097741,
100004226527552,
100010689586869,
100004805081955,
100003113073761,
100004066403425,
100081498725944,
100084394720913,
100035008090268,
100006900660169,
100010006239613,
100006279930517,
100077191477027,
100004616611983,
100072633221121,
100058856032820,
100060632795880,
100028935245805,
100094421786221,
100074297736642,
100006524284789,
100014986357886,
100046691413464,
100065477224131,
100024530620562,
100041685198799,
100008464068585,
100008904338839,
100001088411251,
100030852910166,
100063724503245,
100000574414575,
100000491727324,
100016865287945,
100008812297219,
100008074894126,
1672724134,
100090428286879,
100041990377428,
100015841779285,
100088157407742,
100000647906662,
646902854,
100004699982880,
100012807438481,
100051121657541,
100017607036546,
100000147406632,
100009290453202,
100073756205986,
100014114322099,
100016014574154,
100027695018898,
100042382704263,
100004932216116,
100003466333963,
100012655440594,
100022193525290,
100008479392753,
100007967682352,
100005049635333,
100032753226687,
100000461499684,
61551544349066,
100007995307314,
100038917340296,
100000435264996,
61551112590649,
100005243551030,
100080164210886,
100005174889076,
100084618154238,
100000128284431,
100006510948439,
100065298153382,
100080634343980,
100003779359092,
100085087966513,
100001069375777,
61550917696113,
100084223235475,
100005176475155,
100010887128250,
100033567113281,
100015170496052,
100058123170725,
100015100543100,
100052969102459,
100082525533586,
100080112774640,
100044170232791,
100026795093009,
100004521644018,
100047146282989,
100012427385497,
100009129277037,
100009253347129,
100034924311237,
100034699805785,
100068087522692,
100053839252213,
100007863096531,
100066778487201,
100003147580832,
100004433701812,
100007140873606,
100007716462836,
100076967814590,
100024934879670,
61550934047008,
100004053653159,
100004415023629,
100035494936067,
100007838200303,
100088954410820,
100014730576284,
100057540154729,
100036945739501,
100065315001373,
100001535708517,
100068432784728,
100030474203963,
100006274570231,
100091452788255,
100048683931873,
100001460723006,
100004470517427,
1797912286,
100004233039907,
100041830627203,
100035425411416,
100001368189769,
100057631232551,
100044896390518,
100008941159438,
100059927795050,
100080358646372,
100035770098201,
100045504319583,
100065158471019,
100014335177944,
100053068953680,
100030253181647,
100037712644946,
100041631876218,
100004176548417,
100008012288184,
100057020450277,
100001670598439,
100013423021565,
100029492267438,
100076391090150,
100013920677666,
100060339204599,
100006209718495,
100033684008972,
100011878356529,
100051458527603,
100009948312838,
100009749071302,
100007589326918,
100012174707264,
100045535272869,
100075960611277,
100027857740756,
100002866279296,
100000016051581,
100091279647183,
100033141589450,
100000186701330,
100033421628816,
100059599731032,
100005164593036,
100000140448362,
100009677110542,
100085827076613,
100028488977440,
100002498875581,
100004322264366,
100019034825426,
100034507337928,
100023033950000,
100067245902023,
100006490626128,
100007691146480,
100048398835113,
100063053330717,
61551883866909,
100001652243913,
100087333163588,
100005341185815,
100046567493312,
100090365015285,
100007774473954,
100017043854070,
100003618408893,
100011410720058,
100005898211510,
100001250726591,
100035715045646,
100005086603849,
100000183799188,
100085496793508,
100013612482329,
100003080277724,
100090580608289,
100068665508348,
100089268546694,
100021350813828,
100062963359658,
100005926804189,
100044909021645,
100016738186813,
100017250519536,
100011483238158,
100078844895800,
100027899963640,
100044738386913,
1174779362,
100036721610880,
100053960073136,
100000606070828,
100030122254504,
100065252813557,
100028538237276,
100066666008411,
100001798646648,
100016244385725,
100000202242410,
100009815560460,
100089780949595,
100085623019349,
100002533112784,
100085742348596,
100008816988644,
100004331403175,
100000424686641,
100065572692745,
100027174007809,
100087211776869,
100055580027705,
100003707126173,
100042162667844,
100032411463552,
61551076407130,
100005140151657,
100013427437573,
100020640953953,
100063518297542,
100024383671465,
100017073407485,
100050947760966,
100050533477911,
100003927515594,
100034046771442,
100031310643003,
100040430024967,
100027618859191,
100002762059355,
100023573114502,
100011224802890,
100016439775949,
100003933402225,
100014329038735,
100053754181272,
100009894034656,
100003306054112,
100032350818559,
100013181312344,
100063480413078,
100006626232994,
100056952692225,
100051910820234,
100084690305449,
100078111292227,
100005892964425,
100010538749430,
100004444934146,
100008300018851,
100004042374084,
100004270128879,
100025679673740,
100004079617356,
100087710898064,
100009458559422,
100067401435367,
100021177751741,
100001058918144,
100008275471477,
100003070765413,
100013555902248,
100083006764582,
100030535412907,
100003766189200,
100003244958676,
100025558983076,
100024908112281,
100075273994923,
100011407130541,
100004389071176,
100072997474293,
100068631379250,
100007781316954,
100010679979530,
100086161706117,
100091736470026,
100003149134656,
100008025460441,
100006625062896,
100005920833544,
100011365814226,
100093544853595,
100005057670757,
100000071038544,
100031143125733,
100006451110702,
100011372703160,
100004979612852,
100006614402064,
100005036749456,
100029908650639,
100014948371347,
100013567217605,
100068267263963,
100043258549856,
100012494525684,
1622375569,
100003692280171,
100007810470438,
100073620695906,
100017210133897,
100016717425050,
100006037262135,
100072430577026,
100008429885214,
100004445021188,
100003885869067,
100084968058169,
100005468864712,
100004410243658,
100004365704320,
100067190974867,
100008176574263,
100009976571738,
100013738748485,
100033085786569,
100009906372939,
100010958285935,
100088660347038,
100004632188285,
100004128403835,
100006754234445,
1848739532,
100006980473994,
100093024789218,
100037465443025,
100006134280796,
100003821861248,
100004927544220,
100004498121097,
100027181324856,
100079222430792,
100029636108853,
100007852609492,
100003077928298,
100013517702793,
100014456103853,
100003976073324,
100003299796536,
100048739987793,
100018356141807,
100070781066077,
100002841786071,
100008539320827,
100073902147788,
100002532638654,
100012387364718,
716487151725902,
100079629585390,
100051881552530,
100044629400905,
100028537054541,
100002774941876,
100001880596604,
100061731380364,
100017099920714,
100003646370334,
100002351079670,
100006669154397,
100003887016516,
100000901645859,
100003625289050,
100001626795998,
100008083456303,
100077332953382,
100051896074645,
100014315863683,
100007507261655,
100090995852129,
100003169708174,
100005563936946,
100040521096098,
100023814880265,
100011628557993,
100006605894926,
100000216296052,
100089669604467,
100005505106485,
100001733265237,
100005533201593,
100000317122649,
100001135949499,
100003021019003,
100000548745856,
100005326174625,
100053881538940,
100004200001550,
100004026016057,
100001996551123,
100048188784070,
100080496506891,
100028970443517,
100010696567994,
100004707663390,
100044794301711,
100005015550365,
999931332,
100003898200349,
100001281006159,
100002827158189,
100001752971097,
100003819676186,
100039964432702,
100015001723381,
100059125793976,
100003104871852,
100007517560331,
100043906322095,
100003309435967,
100006600151186,
100004284067590,
100001289388870,
100006576101719,
100001894293428,
100000207336609,
100000708559670,
100008283250551,
100001077541615,
100029098116173,
100003681208057,
100055245935995,
100035855573521,
100012940148515,
100005755476077,
100004919163275,
100003819114754,
100054108335873,
1119798150,
100005580787340,
100070627909814,
100001362769883,
100021955747472,
100003799606519,
100014333760969,
100019301055531,
100010234392814,
100029298193879,
100071547175788,
100019421633282,
100004753293610,
100001746623289,
100085230585846,
100039608881637,
638360767,
100064564670628,
100008939627511,
100003821143769,
100058318638552,
100080158394272,
100003679525489,
100081616835247,
100004940982398,
100004779795980,
100034298294007,
100003278327085,
100092198731689,
100004519662246,
100001497527395,
100006747168577,
100007450117308,
100057153784405,
100008660435828,
100035499374437,
1699584892,
100005921527147,
100003267351253,
100040023200733,
100002806558885,
100082730946542,
100011338071400,
767773229,
100052591503000,
100005972507713,
100075153367974,
100034251023305,
100000576248254,
100003879285473,
100004210663805,
100006300638049,
100007183510013,
100009879734436,
100009582542062,
100003232466925,
100009758773723,
100023249694339,
100060677652489,
100010906069340,
100004602360544,
100081541809006,
100003148268467,
100064878914572,
100008284651721,
100002990510418,
100004334898678,
100004177119752,
1660700474,
100004376162623,
100026567289907,
100011410315714,
100005468220894,
757623889,
100032980942549,
100014676338003,
100003822665069,
100002908630075,
100003873290008,
100023915646807,
100004209543854,
100079930830180,
100004097893035,
100006933582847,
100003282198989,
100004757503785,
100013573120456,
100020591236810,
100000453331244,
100000624001611,
100006373368344,
100045313848821,
100026122116903,
100024631830965,
100046944942209,
100081298761368,
100004952406704,
100006671501222,
100051527388416,
100006438385643,
100082895025163,
100004176251425,
100011346358488,
100005361013055,
100075888375000,
100066509533846,
100001592138030,
100004400880137,
100021743688771,
100005666769403,
100002128253779,
100026552483093,
100010705095146,
100001497161035,
100005149265132,
100004216267434,
100004089937857,
100012755949162,
100013730078490,
100003693953436,
100010004715991,
100012956255147,
100048829759055,
100010987459430,
100010071785422,
100035029329923,
100000218543413,
100003817756940,
100003478245923,
100013488311694,
100004259141514,
100010830309002,
100078792357897,
100004099574874,
100001842943616,
100003049236843,
100035885831014,
100016799291383,
100026523433821,
100033125170730,
100005652819860,
100005560056688,
1729072222,
100001909898671,
100003191472480,
100006532754488,
100041781280657,
100045687287023,
100004113460388,
100004772320190,
100014850375939,
100009990646908,
100000244254929,
100072354265791,
61550741286385,
716543212,
100086518643002,
100005281026342,
100011932249215,
100006204912602,
100034780142378,
100004741830756,
100053663111182,
100001890822787,
100022748811475,
100008675912164,
100068816390259,
100006285102394,
100002692638425,
100006747494580,
100004017439367,
100004359605809,
100057453120822,
100009125566705,
100004366873674,
100003346094949,
100015330250477,
100015659317989,
100010558694954,
100009444537151,
100004059854494,
100003663529610,
100025034953605,
100008433106969,
100036799040994,
100003058873632,
100003586324905,
100002950514063,
100015566854901,
100004174050194,
100002964190640,
100043492757652,
100009945036026,
100006479350273,
100030154772649,
100004252362388,
100013460377253,
100014116121962,
100013836549145,
100014199032304,
100003939445210,
100014957164494,
100029631290311,
100000396528965,
100015617135549,
100004665392796,
100007213654481,
100004362361814,
100034418392430,
100004383549033,
100005097846345,
100007879691000,
100003716640089,
100002869859053,
100003944788891,
100034312279161,
100074411184604,
100047988131615,
100028768320890,
100008099054482,
100034491711834,
100082410289333,
100009578750774,
61550666126604,
100012016383059,
100002037367958,
100003809345876,
100008495792023,
100004195806693,
100086304140854,
100001395066233,
100026417411354,
100037203217575,
100025287423091,
100004477663634,
100005088582690,
100004462953692,
1004831647,
100002206500958,
100000874648681,
100005803832211,
100009095618337,
100000118489530,
100048354018219,
100007159026670,
100025051392647,
100005269711473,
100015392409908,
100023261464420,
100005333831539,
100093798520900,
100004705620311,
100003120507882,
100000239405598,
100085352056560,
100012193925528,
100001691347944,
100005134188746,
100000188614719,
100015263735736,
100003724127538,
100003278533691,
100055614918410,
100003290683426,
100009360876375,
100004030667283,
100016310111882,
100005572806213,
100003692409262,
100011308216504,
100048520862779,
100005909856797,
100015662824510,
100021868313733,
100007138754268,
100001125546309,
100034979102895,
100004467853799,
100003239696897,
100003988618377,
100077212673719,
61550071644050,
100004605092816,
100004107942781,
100003857709189,
100085244414247,
100005439126813,
100017762593587,
100002286990946,
100052097270878,
100041532124815,
100039201612053,
100032576542967,
100000241749744,
100003866689903,
100087631190372,
100090482916401,
100053892439760,
100005763633338,
100082133096305,
100012507914409,
100023556634739,
100004684575727,
100000564905558,
100001635762167,
100006184390352,
100004176093490,
100024319912298,
100011410984041,
100063366903256,
100028050311874,
100009878376378,
100005503260552,
100008222086038,
100040542107139,
100011237531763,
100078765285108,
100018379380330,
100065244319538,
100002307519668,
100000210346714,
522417118,
100077050561757,
100028254492181,
100004459626344,
100005587684601,
100047251757485,
100031808264874,
100091698066060,
100092475606833,
100088943114772,
100031729149275,
100077586832430,
100005034844243,
100005850455203,
100059471006256,
100007913260178,
100003872684966,
100031696240609,
100000551991280,
100071068622343,
100073752507543,
100082400482827,
100008613154471,
100038267600514,
100040262144477,
100012683523916,
100018014374577,
100064125146976,
100017259067276,
100015256923719,
100006387844665,
100003160518997,
100025363417258,
100033704903248,
100023505173986,
100073641157672,
100002133575239,
100005852648455,
100066283034429,
100001577010921,
100070312386669,
100083567302276,
100016217868833,
100069465737982,
100005022313277,
100008044001006,
100001664363473,
100009476326786,
100011495794489,
100010409460848,
100081435981606,
100077015234988,
100026139133749,
100021933293404,
100005106456345,
100007969696482,
100003718267469,
100027150432254,
100016936771099,
100092367087547,
100024363346280,
100004097289982,
100007801634102,
100000447037791,
100006326656745,
100003111199838,
100003352500735,
100079318811145,
100006116471101,
100002574385428,
100006173777147,
100004136737985,
100014166647914,
100006408276252,
100009495637405,
100016186992808,
100000420544172,
100027636923759,
100012991059235,
100017263332918,
100034243323465,
100057273407318,
100003661394255,
100014708767980,
100071259030225,
100009387718247,
100008164441235,
100022232918497,
100089763386738,
100002915112786,
100011851363479,
100016589439834,
100005627615135,
100003698418811,
100003051301420,
100007357090890,
100004080091950,
100004682050096,
100081436634730,
100015880471188,
100049006607296,
100017110212254,
100003695367919,
100054741573236,
100007264036899,
100004165188694,
100002370036002,
100004517854136,
100002709738594,
100004035811179,
100000273226772,
100009556494358,
100008354262989,
100005049040723,
100005832870731,
100005013161883,
100050816357346,
100087849530965,
100004429266038,
100004652947862,
100010430929375,
100004307974222,
100002713219617,
100026754647361,
100041561357358,
100005685464321,
100039649013689,
100000422359219,
100004892530117,
100009598155972,
100005897250059,
100046041891414,
100027748710866,
100042106819859,
100021606072507,
100074484553153,
100003476159098,
100038970498141,
100004704901050,
100095024633279,
100000298270955,
100009240190945,
100008939773034,
100085643274852,
100000675052038,
100003803804522,
100009312547910,
100018567196450,
100006786753711,
100008449723837,
100006695643549,
100055168393784,
100031687771555,
100003687927917,
100006224955465,
100031694723486,
100004274108601,
100011093733429,
100005187545441,
100040464156401,
100003185247275,
100013584604834,
100005237739067,
100009041519062,
100008291287096,
100030885942511,
100040666833439,
100025394617678,
100002601166737,
100007908697142,
100008034522119,
100033843824901,
100006180523310,
100004358617050,
100063646245276,
100008131894628,
100003042581952,
100069653441317,
100043912388726,
100057170550808,
100039751864187,
100011753928949,
100095198085521,
100094123562956,
100090007121598,
100093612772095,
100000231113513,
100085261800369,
100089337094810,
100012266742017,
100007550585986,
100076418592299,
100082354424837,
100072027833262,
100045406601768,
100006552608288,
100009086455754,
100028527369912,
100029192449615,
100024278028033,
100009539862114,
100005092215974,
100047262380892,
100040310251128,
100006469387573,
100018974358919,
100028263434504,
100004332482445,
100005948881161,
100004603742530,
100005598554190,
100014122097424,
100011265152603,
100010664058465,
100004887634418,
100028319117011,
100007347214551,
100003290524863,
100004059864473,
100013320993247,
100005508450658,
100005074351286,
100078191686150,
100090809418525,
100004888273786,
100012875281043,
100006366752081,
100039404796724,
100054519605037,
100034980271925,
100023752373782,
100086203562900,
100017015254735,
100056660862965,
100035152838424,
100025994902580,
100025105091216,
100014039280957,
100000715334311,
100003899277077,
100004083461448,
100008220311176,
100008408400419,
100071123707155,
100000292257669,
100002943220736,
100064596401454,
100014703517542,
100029677021051,
100003962118452,
100004789476485,
100004367405516,
100004852540226,
100035553672538,
100003902562262,
100004227461493,
100006501229798,
100025370769686,
100010413219231,
100051242352965,
100027052300770,
1307065310,
100055457375403,
100004078927704,
100026682195729,
100003032253991,
100003839610415,
100005000173975,
100006263016196,
100008112488721,
100010438634889,
100028971870250,
100010457507577,
100004090898900,
100003868666259,
100001476369723,
100037864991089,
100003910941274,
100010633772044,
100001026393164,
100004100717599,
100009644534449,
100031040316240,
100005280186634,
100002770985686,
100076845024264,
100005984897457,
100037162805455,
100006099992151,
100003966376894,
100010110215723,
100001733778664,
100009703124600,
100006799684009,
100000341532596,
100003875676527,
100003098668764,
100003050915590,
100003807349927,
100030851525409,
100005245267418,
100038156958709,
100035753284022,
100079968258548,
100045605722550,
100018102485296,
100009299921794,
100007201932931,
100004640670928,
100082252996698,
100001845584972,
100015489287630,
100004592082230,
100002593892161,
100001370702791,
100003733026938,
100013688837250,
100007005584931,
100002153199163,
100004278071841,
100020317428007,
100004458403739,
61551199774491,
100006271267377,
100003713787542,
100004082120182,
100003859622365,
100012757808854,
100014839952896,
100046301463522,
100017107906301,
100005862911991,
100004199970154,
100005480526902,
100004219391050,
100009790306470,
100005259783143,
100004414207056,
100008434411313,
100069712080739,
100007140182247,
100014499697088,
100003810218196,
100008061610017,
100003194163637,
100003738037776,
100010523075746,
100006719225100,
100008080208879,
100036872342546,
100009990437845,
100000140296954,
100047695394563,
100001366432097,
100000310104130,
100083809968614,
100005345524058,
100062780897484,
100004026524101,
100007989841328,
100003292749288,
100003282373555,
100004047404904,
100008063012472,
100034304411295,
100084330558032,
100006028938833,
100021337155383,
100012854645580,
100003910044721,
100007095036223,
100012945613398,
100009144341180,
100010138603114,
100003782765387,
100000274673154,
100028052347913,
100005414375157,
100005477703589,
100044628140985,
100003745086723,
100000914899835,
100009722944493,
100082220015597,
100031541983226,
100003900553320,
100081811760824,
100022452369309,
100005718756989,
100077799514491,
100006859842827,
100005545784060,
100002111701929,
100005999682216,
100001105165162,
100003886312594,
100008359697676,
100014588688436,
100004085364862,
100007952041352,
100005074690845,
100049016706091,
100003888856840,
100070828663388,
100041151991776,
100006300271914,
100012570734829,
100026595791465,
100008655910168,
100037543366006,
100009680943775,
100026053043629,
100092533385577,
100009385806317,
100006765942359,
100006827797086,
100012594931722,
100007926813365,
100073087726585,
100035107089523,
100029572943011,
100012353442245,
100024105662697,
100009829696949,
100006540700382,
100009165673079,
100004028957190,
100006762942105,
100008507323745,
100063214515976,
100003862676546,
1802907020,
100055906010118,
100007151225627,
100005723257300,
100011119968597,
100014227921385,
100041541783613,
100005705979774,
100003048206065,
100006685299355,
100001054826561,
100001519908110,
100090634377786,
100011300262319,
100012457573870,
100004756541035,
100010994014365,
100005513385965,
100005864977113,
100031204433142,
100004589052238,
100010098429802,
100006574517747,
100007747099286,
100004008770413,
100002936257600,
100000436826351,
100012473284783,
100059486345360,
100024827946544,
100012788085474,
100052136002065,
100010020286185,
100008220302117,
100006497825745,
100006013782102,
100001385566073,
100001769320072,
100092869729073,
100011346956985,
100080112042635,
699809410,
100031101814123,
100017911782107,
100007202707606,
100005128729162,
100004421439450,
100004052536484,
100009912605909,
100004681544786,
100007221105283,
100004355197199,
100080669304615,
100010981963221,
1838298242,
100015882407591,
100016665014637,
100005369743512,
100005933403115,
100004901254992,
100090241028901,
100071595293339,
100001832655949,
100010339174675,
100008604300674,
100013956043541,
100071740230601,
100009908610827,
100091392773377,
100022121822176,
100011170724884,
100003186398139,
100007869961756,
100001717171462,
100009457524321,
100032032425434,
100003886617757,
100005241706720,
100004194150396,
100028800095189,
100002589383254,
100026685790296,
100045723846846,
100004304412291,
100035756971914,
100035143451662,
100055139604794,
100009075549436,
100004024609033,
100008881032793,
100000107911852,
100011150266229,
100003135294377,
100003860147242,
100004491901119,
100073075027990,
100055204740100,
100008203024494,
100009475632690,
100006059204262,
100011355988966,
100004394253269,
100004900813488,
100007277716354,
100003809483824,
796128115,
100003846205116,
100090279427702,
100027339150344,
100013950763834,
100056167821257,
100055633531622,
100003751737545,
100006748560221,
100005101561490,
100003880187266,
100045242681119,
100004644216247,
100005709074756,
100004860842674,
100023800628626,
100072666969737,
100011283673234,
100004178461488,
100009596961889,
100039788830013,
100004243200198,
100005630892221,
100007423003726,
100004743134550,
100007192418136,
100005315041064,
100003109603992,
100010712891219,
100004944462831,
100009957824400,
100069867103378,
100048600113272,
100006360277640,
100010418438031,
100013153505392,
100001540066324,
100011120505365,
100016750599220,
100054507374507,
100008434843220,
100048185379862,
1252064157,
100024514392255,
100059621527473,
100004971662600,
100005320663466,
100027336340964,
100041020801243,
100024156739091,
100002234174865,
100003303637805,
100009146378738,
100014003566103,
100004088344469,
100017098725007,
100004048617090,
100036555781544,
100004962840973,
100009894978185,
100026352187834,
100064525043424,
100034726802985,
100007502178420,
100025894656005,
100006821767558,
100002820139541,
100005422874007,
100013490376345,
100003774078603,
100004531541499,
100001459711996,
100006572654386,
100004164757690,
100006381874525,
100005773786609,
100003811761222,
100003474566945,
100004367740807,
100057920111069,
100003296267990,
100003763981545,
100023900225694,
100003533541449,
100001671006695,
100065406122386,
100078705115593,
100036827563704,
100005918653866,
100005178333953,
100000344495055,
100052784941522,
100080373081770,
100090090980319,
100025588866922,
100043788461278,
100062800835756,
100003293239047,
100010899514929,
100004509994589,
100080905600416,
100005221149171,
1739791967,
100070338322086,
100076579843465,
100011210148482,
100017291626444,
100000296564588,
100014684134777,
100062531744652,
100005926749417,
100009382884346,
100071711833773,
100080336555133,
100003752972037,
100040464729828,
100054708980069,
100057440316939,
100048191930618,
100076661589694,
100053731274160,
100008106376974,
100003741142822,
100003328593647,
100005758203180,
100007854729243,
100011304786366,
100000208792534,
100033173388205,
100003615093308,
100034378701405,
100025045383530,
100007306843787,
100016358432651,
100031837392450,
100008660280592,
100004909362758,
100055996893425,
100007861567221,
100002603647515,
100082209949795,
100044821330363,
100000258592635,
100035762809455,
100004269540054,
100091531009259,
100053002190294,
100025776643494,
100011765944668,
100015416864137,
100026042718921,
100008040390662,
100030518024754,
100005430279613,
100008642087465,
100004628891661,
100030609010518,
100003258783548,
100007391416513,
100007625086216,
100078216452825,
100005069022026,
100026688284375,
100005161862480,
100003091337505,
100007925915122,
100022439884044,
100007050584034,
100004877016275,
100040167973923,
100000310799091,
100065192251860,
100008287152516,
100023199292865,
100005488009364,
100004593768276,
100040169783151,
100028004950246,
100001367217542,
100010120983779,
100022160401831,
100045553417089,
100027653839597,
100054479688321,
100026468192201,
100004009396919,
100007391562933,
100043708834174,
100055687061120,
100005651958281,
100004780831095,
100013258296269,
100010968605733,
100003101130929,
100004673132836,
100004020342465,
100013056694113,
100007156083073,
100003934530833,
100068247422968,
100042481970638,
100009929506277,
100003812553256,
100091695705246,
100007065728742,
100006332527944,
100012715268979,
100043687339435,
100031365227230,
100031127239811,
100022832556314,
100003704531993,
100005320964143,
100028671379882,
100014915850711,
100004043170958,
100017665179156,
100022950644370,
100003946395261,
100077170508645,
100053488920272,
100030488207558,
100006946891273,
100027222127832,
100079490962937,
100094685812062,
100000013832118,
100024569563135,
100005477617195,
100000900045965,
100006669820343,
100028161976171,
100004940827950,
100004897726284,
100003139435822,
100008417047333,
100008268543928,
100087424994287,
100000528879402,
100004658192507,
100056907805458,
100000159266095,
100021722464222,
100007416390370,
100071466997841,
1704205325,
100081996528888,
100006485724229,
100035690957333,
100008622427508,
100021741947752,
100003135695811,
100002972143606,
100092210833294,
100003113761622,
100035408504139,
100063227087736,
100001386401134,
100025155169803,
100003837457201,
100007408780404,
100000278831784,
100086423362849,
100002914870990,
100027543665018,
100004638816836,
100025899219255,
100004663602183,
100011322758450,
100003207900316,
100000078278119,
100010625259298,
100010539782556,
100090384646199,
100085802988146,
100016327326657,
100005514191536,
100075206296631,
100072155167063,
100037222334726,
100010244826737,
100000261110421,
100011047924763,
100078362180191,
100042099966579,
100029303404919,
100000053006484,
100086575476764,
100057685280555,
100054747025876,
100003945756577,
100045840379948,
100001318560327,
100007490777613,
100010482901540,
100024869058129,
100072378678454,
100085504884143,
100003698637451,
100053103993574,
100017190822006,
100095081142517,
100038870691474,
100073371144962,
100003054420250,
100015705852230,
100006222340099,
100066649880092,
100076878585750,
100004410166462,
100023574012303,
100028338878716,
100005632032773,
100076574653589,
100004685919193,
100027155408245,
100008766544709,
100023862382150,
100007731638152,
100004326611813,
100034628532318,
100013544445158,
100093071539127,
100004013003693,
100004893150837,
100034239587512,
100030709761697,
100019086310407,
100008630494559,
100005709258229,
100004372205589,
100056724729960,
100001906238382,
100003321540874,
100024074948303,
100050271315590,
100006435928091,
100003654413578,
100080697166423,
100004433953767,
100003751482120,
100005030195014,
100080331220029,
100071683736450,
100004211765548,
100087102915119,
100002422916790,
100000367865454,
100007349821160,
100008320748200,
100006437462046,
100074326745109,
100005103065274,
100031201355518,
100068023719609,
100004134091902,
100005265636297,
100016505436592,
100001556561422,
100040443905422,
100039989867122,
100003957796966,
100011313842483,
100008570865962,
100001667513915,
100041037000241,
100010659348719,
100013818316616,
100000576172403,
100075231817188,
100088239621440,
100022336609405,
100030601491667,
100065486052310,
100047610096785,
100001957340160,
100038666957676,
100088602742659,
100051521520987,
100057711621779,
100043374695082,
100081581474857,
100008303585243,
100007477187343,
100003871652188,
100023397497827,
100003717924805,
100000137708779,
100024107979678,
100009802547637,
100055197429508,
100003875883851,
100090910785037,
100035865253228,
100002929932291,
100001877065162,
100006467244883,
100049496531045,
100094553453119,
100009250436614,
100021798066004,
100057116885237,
100088223501586,
100004160942154,
100028324803655,
100040545421837,
100002680276372,
100000263201610,
100003317464819,
100041559936107,
100012352477759,
100014653957405,
100036801352496,
100006805969313,
100012859293384,
100004081053092,
100005781663204,
100022711938407,
100003769044063,
100011504324497,
100023412043122,
100002493259081,
100019872885198,
100005009014578,
100005283010010,
100005741388070,
100088693677403,
100072449013949,
100001186057952,
100003182640212,
]
  const [loctrung, setLoctrung] = useState([]);

  useEffect(() => {
    // Sử dụng Set để lọc ra các số duy nhất
    const uniqueNumbers = [...new Set(tong)];

    setLoctrung(uniqueNumbers);
  }, []);

  return (
    <div>
      <ul>
        {loctrung.map((number, index) => (
          <li key={index}>{number}</li>
        ))}
      </ul>
    </div>
  );
}

export default App;

