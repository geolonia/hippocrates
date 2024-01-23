import './AboutUs.scss'

const Content = () => {

  return (
    <div className="about-us">
      <div className="container">
        <div className="branding">
          <div className="image"><img src={`${process.env.PUBLIC_URL}/icon-pwamap.svg`} alt=""/></div>
          <div className="logo">Geolonia PWAマップ</div>
        </div>

        <p>Geolonia PWAマップは、Google スプレッドシートを更新するだけでオリジナルの地図アプリを作成することができます。</p>
        <p>プログラムはオープンソースで公開しているため、自由にカスタマイズしてご利用いただけます。</p>

        <h2> Geolonia PWAマップについて</h2>
        <p><a href="https://blog.geolonia.com/2022/05/17/pwamap-beta.html" target='_blank' rel="noreferrer">https://blog.geolonia.com/2022/05/17/pwamap-beta.html</a></p>

        <p>また、独自ドメインでの利用やデザインのカスタマイズや利用に必要な緯度・経度情報の提供も有償で別途承ります。ご希望の方は下記までお問い合わせください。</p>

        <h2>お問い合わせフォーム</h2>
        <p><a href="https://geolonia.com/contact/" target='_blank' rel="noreferrer">https://geolonia.com/contact/</a></p>
        <p>※カスタマイズおよびアプリの作成・利用についてはサポート対象外となります。あらかじめご了承ください。</p>
      </div>
    </div>
  );
};

export default Content;
