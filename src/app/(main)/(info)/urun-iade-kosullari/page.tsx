import { Metadata } from "next";

export const metadata: Metadata = {
    title: "İade Koşulları",
};

export default function RefundTerms() {
    return (
        <div className="flex flex-col gap-2 text-[15px] leading-5 text-gray-700">
            <h1 className="text-lg font-extrabold text-gray-900">
                TÜKETİCİ HAKLARI - CAYMA - İPTAL İADE KOŞULLARI
            </h1>
            <h2 className="text-lg font-extrabold text-gray-900">GENEL:</h2>
            <ol className="list-decimal space-y-2">
                <li>
                    <p>
                        Kullanmakta olduğunuz web sitesi üzerinden elektronik
                        ortamda sipariş verdiğiniz takdirde, size sunulan ön
                        bilgilendirme formunu ve mesafeli satış sözleşmesini
                        kabul etmiş sayılırsınız.
                    </p>
                </li>
                <li>
                    <p>
                        Alıcılar, satın aldıkları ürünün satış ve teslimi ile
                        ilgili olarak 6502 sayılı Tüketicinin Korunması Hakkında
                        Kanun ve Mesafeli Sözleşmeler Yönetmeliği
                        (RG:27.11.2014/29188) hükümleri ile yürürlükteki diğer
                        yasalara tabidir.
                    </p>
                </li>
                <li>
                    <p>
                        Ürün sevkiyat masrafı olan kargo ücretleri alıcılar
                        tarafından ödenecektir.
                    </p>
                </li>
                <li>
                    <p>
                        Satın alınan her bir ürün, 30 günlük yasal süreyi
                        aşmamak kaydı ile alıcının gösterdiği adresteki kişi
                        ve/veya kuruluşa teslim edilir. Bu süre içinde ürün
                        teslim edilmez ise, Alıcılar sözleşmeyi sona
                        erdirebilir.
                    </p>
                </li>
                <li>
                    <p>
                        Satın alınan ürün, eksiksiz ve siparişte belirtilen
                        niteliklere uygun ve varsa garanti belgesi, kullanım
                        klavuzu gibi belgelerle teslim edilmek zorundadır.
                    </p>
                </li>
                <li>
                    <p>
                        Satın alınan ürünün satılmasının imkansızlaşması
                        durumunda, satıcı bu durumu öğrendiğinden itibaren 3 gün
                        içinde yazılı olarak alıcıya bu durumu bildirmek
                        zorundadır. 14 gün içinde de toplam bedel Alıcı’ya iade
                        edilmek zorundadır.
                    </p>
                </li>
                <br />
                <h2 className="text-lg font-extrabold text-gray-900">
                    SATIN ALINAN ÜRÜN BEDELİ ÖDENMEZ İSE:
                </h2>
                <li>
                    <p>
                        Alıcı, satın aldığı ürün bedelini ödemez veya banka
                        kayıtlarında iptal ederse, Satıcının ürünü teslim
                        yükümlülüğü sona erer.
                    </p>
                </li>
                <br />
                <h2 className="text-lg font-extrabold text-gray-900">
                    KREDİ KARTININ YETKİSİZ KULLANIMI İLE YAPILAN ALIŞVERİŞLER:
                </h2>
                <li>
                    <p>
                        Ürün teslim edildikten sonra, alıcının ödeme yaptığı
                        kredi kartının yetkisiz kişiler tarafından haksız olarak
                        kullanıldığı tespit edilirse ve satılan ürün bedeli
                        ilgili banka veya finans kuruluşu tarafından
                        Satıcı&apos;ya ödenmez ise, Alıcı, sözleşme konusu ürünü
                        3 gün içerisinde nakliye gideri SATICI’ya ait olacak
                        şekilde SATICI’ya iade etmek zorundadır.
                    </p>
                </li>
                <br />
                <h2 className="text-lg font-extrabold text-gray-900">
                    ÖNGÖRÜLEMEYEN SEBEPLERLE ÜRÜN SÜRESİNDE TESLİM EDİLEMEZ İSE:
                </h2>
                <li>
                    <p>
                        Satıcı’nın öngöremeyeceği mücbir sebepler oluşursa ve
                        ürün süresinde teslim edilemez ise, durum Alıcı’ya
                        bildirilir. Alıcı, siparişin iptalini, ürünün benzeri
                        ile değiştirilmesini veya engel ortadan kalkana dek
                        teslimatın ertelenmesini talep edebilir. Alıcı siparişi
                        iptal ederse; ödemeyi nakit ile yapmış ise iptalinden
                        itibaren 14 gün içinde kendisine nakden bu ücret ödenir.
                        Alıcı, ödemeyi kredi kartı ile yapmış ise ve iptal
                        ederse, bu iptalden itibaren yine 14 gün içinde ürün
                        bedeli bankaya iade edilir, ancak bankanın alıcının
                        hesabına 2-3 hafta içerisinde aktarması olasıdır.
                    </p>
                </li>
                <br />
                <h2 className="text-lg font-extrabold text-gray-900">
                    ALICININ ÜRÜNÜ KONTROL ETME YÜKÜMLÜLÜĞÜ:
                </h2>
                <li>
                    <p>
                        Alıcı, sözleşme konusu mal/hizmeti teslim almadan önce
                        muayene edecek; ezik, kırık, ambalajı yırtılmış vb.
                        hasarlı ve ayıplı mal/hizmeti kargo şirketinden teslim
                        almayacaktır. Teslim alınan mal/hizmetin hasarsız ve
                        sağlam olduğu kabul edilecektir. ALICI , Teslimden sonra
                        mal/hizmeti özenle korunmak zorundadır. Cayma hakkı
                        kullanılacaksa mal/hizmet kullanılmamalıdır. Ürünle
                        birlikte Fatura da iade edilmelidir.
                    </p>
                </li>
                <br />
                <h2 className="text-lg font-extrabold text-gray-900">
                    CAYMA HAKKI:
                </h2>
                <li>
                    <p>
                        ALICI; satın aldığı ürünün kendisine veya gösterdiği
                        adresteki kişi/kuruluşa teslim tarihinden itibaren 14
                        (on dört) gün içerisinde, SATICI’ya aşağıdaki iletişim
                        bilgileri üzerinden bildirmek şartıyla hiçbir hukuki ve
                        cezai sorumluluk üstlenmeksizin ve hiçbir gerekçe
                        göstermeksizin malı reddederek sözleşmeden cayma hakkını
                        kullanabilir.
                    </p>
                </li>
                <br />
                <h2 className="text-lg font-extrabold text-gray-900">
                    SATICININ CAYMA HAKKI BİLDİRİMİ YAPILACAK İLETİŞİM
                    BİLGİLERİ:
                </h2>
                <li>
                    <p>
                        ŞİRKET <br />
                        ADI/UNVANI: <br />
                        ADRES: <br />
                        EPOSTA: <br />
                        TEL: <br />
                        FAKS:
                    </p>
                </li>
                <br />
                <h2 className="text-lg font-extrabold text-gray-900">
                    CAYMA HAKKININ SÜRESİ:
                </h2>
                <li>
                    <p>
                        Alıcı, satın aldığı eğer bir hizmet ise, bu 14 günlük
                        süre sözleşmenin imzalandığı tarihten itibaren başlar.
                        Cayma hakkı süresi sona ermeden önce, tüketicinin onayı
                        ile hizmetin ifasına başlanan hizmet sözleşmelerinde
                        cayma hakkı kullanılamaz.
                    </p>
                </li>
                <li>
                    <p>
                        Cayma hakkının kullanımından kaynaklanan masraflar
                        SATICI’ ya aittir.
                    </p>
                </li>
                <li>
                    <p>
                        Cayma hakkının kullanılması için 14 (ondört) günlük süre
                        içinde SATICI&apos; ya iadeli taahhütlü posta, faks veya
                        eposta ile yazılı bildirimde bulunulması ve ürünün işbu
                        sözleşmede düzenlenen &quot;Cayma Hakkı Kullanılamayacak
                        Ürünler&quot; hükümleri çerçevesinde kullanılmamış
                        olması şarttır.
                    </p>
                </li>
                <br />
                <h2 className="text-lg font-extrabold text-gray-900">
                    CAYMA HAKKININ KULLANIMI:
                </h2>
                <li>
                    <p>
                        3. kişiye veya ALICI’ ya teslim edilen ürünün faturası,
                        (İade edilmek istenen ürünün faturası kurumsal ise, iade
                        ederken kurumun düzenlemiş olduğu iade faturası ile
                        birlikte gönderilmesi gerekmektedir. Faturası kurumlar
                        adına düzenlenen sipariş iadeleri İADE FATURASI
                        kesilmediği takdirde tamamlanamayacaktır.)
                    </p>
                </li>
                <li>
                    <p>
                        İade formu, İade edilecek ürünlerin kutusu, ambalajı,
                        varsa standart aksesuarları ile birlikte eksiksiz ve
                        hasarsız olarak teslim edilmesi gerekmektedir.
                    </p>
                </li>
                <br />
                <h2 className="text-lg font-extrabold text-gray-900">
                    İADE KOŞULLARI:
                </h2>
                <li>
                    <p>
                        SATICI, cayma bildiriminin kendisine ulaşmasından
                        itibaren en geç 10 günlük süre içerisinde toplam bedeli
                        ve ALICI’yı borç altına sokan belgeleri ALICI’ ya iade
                        etmek ve 20 günlük süre içerisinde malı iade almakla
                        yükümlüdür.
                    </p>
                </li>
                <li>
                    <p>
                        ALICI’ nın kusurundan kaynaklanan bir nedenle malın
                        değerinde bir azalma olursa veya iade imkânsızlaşırsa
                        ALICI kusuru oranında SATICI’ nın zararlarını tazmin
                        etmekle yükümlüdür. Ancak cayma hakkı süresi içinde
                        malın veya ürünün usulüne uygun kullanılması sebebiyle
                        meydana gelen değişiklik ve bozulmalardan ALICI sorumlu
                        değildir.
                    </p>
                </li>
                <li>
                    <p>
                        Cayma hakkının kullanılması nedeniyle SATICI tarafından
                        düzenlenen kampanya limit tutarının altına düşülmesi
                        halinde kampanya kapsamında faydalanılan indirim miktarı
                        iptal edilir.
                    </p>
                </li>
                <br />
                <h2 className="text-lg font-extrabold text-gray-900">
                    CAYMA HAKKI KULLANILAMAYACAK ÜRÜNLER:
                </h2>
                <li>
                    <p>
                        ALICI’nın isteği veya açıkça kişisel ihtiyaçları
                        doğrultusunda hazırlanan ve geri gönderilmeye müsait
                        olmayan, iç giyim alt parçaları, mayo ve bikini altları,
                        makyaj malzemeleri, tek kullanımlık ürünler, çabuk
                        bozulma tehlikesi olan veya son kullanma tarihi geçme
                        ihtimali olan mallar, ALICI’ya teslim edilmesinin
                        ardından ALICI tarafından ambalajı açıldığı takdirde
                        iade edilmesi sağlık ve hijyen açısından uygun olmayan
                        ürünler, teslim edildikten sonra başka ürünlerle karışan
                        ve doğası gereği ayrıştırılması mümkün olmayan ürünler,
                        Abonelik sözleşmesi kapsamında sağlananlar dışında,
                        gazete ve dergi gibi süreli yayınlara ilişkin mallar,
                        Elektronik ortamda anında ifa edilen hizmetler veya
                        tüketiciye anında teslim edilen gayrimaddi mallar, ile
                        ses veya görüntü kayıtlarının, kitap, dijital içerik,
                        yazılım programlarının, veri kaydedebilme ve veri
                        depolama cihazlarının, bilgisayar sarf malzemelerinin,
                        ambalajının ALICI tarafından açılmış olması halinde
                        iadesi Yönetmelik gereği mümkün değildir. Ayrıca Cayma
                        hakkı süresi sona ermeden önce, tüketicinin onayı ile
                        ifasına başlanan hizmetlere ilişkin cayma hakkının
                        kullanılması da Yönetmelik gereği mümkün değildir.
                    </p>
                </li>
                <li>
                    <p>
                        Kozmetik ve kişisel bakım ürünleri, iç giyim ürünleri,
                        mayo, bikini, kitap, kopyalanabilir yazılım ve
                        programlar, DVD, VCD, CD ve kasetler ile kırtasiye sarf
                        malzemeleri (toner, kartuş, şerit vb.) iade edilebilmesi
                        için ambalajlarının açılmamış, denenmemiş, bozulmamış ve
                        kullanılmamış olmaları gerekir.
                    </p>
                </li>
                <br />
                <h2 className="text-lg font-extrabold text-gray-900">
                    TEMERRÜT HALİ VE HUKUKİ SONUÇLARI
                </h2>
                <li>
                    <p>
                        ALICI, ödeme işlemlerini kredi kartı ile yaptığı durumda
                        temerrüde düştüğü takdirde, kart sahibi banka ile
                        arasındaki kredi kartı sözleşmesi çerçevesinde faiz
                        ödeyeceğini ve bankaya karşı sorumlu olacağını kabul,
                        beyan ve taahhüt eder. Bu durumda ilgili banka hukuki
                        yollara başvurabilir; doğacak masrafları ve vekâlet
                        ücretini ALICI’dan talep edebilir ve her koşulda
                        ALICI’nın borcundan dolayı temerrüde düşmesi halinde,
                        ALICI, borcun gecikmeli ifasından dolayı SATICI’nın
                        uğradığı zarar ve ziyanını ödeyeceğini kabul eder.
                    </p>
                </li>
                <br />
                <h2 className="text-lg font-extrabold text-gray-900">
                    ÖDEME VE TESLİMAT
                </h2>
                <li>
                    <p>
                        Banka Havalesi veya EFT (Elektronik Fon Transferi)
                        yaparak, ............, ........., bankası
                        hesaplarımızdan (TL) herhangi birine yapabilirsiniz.
                    </p>
                </li>
                <li>
                    <p>
                        Sitemiz üzerinden kredi kartlarınız ile, Her türlü kredi
                        kartınıza online tek ödeme ya da online taksit
                        imkânlarından yararlanabilirsiniz. Online ödemelerinizde
                        siparişiniz sonunda kredi kartınızdan tutar çekim işlemi
                        gerçekleşecektir.
                    </p>
                </li>
            </ol>
        </div>
    );
}
