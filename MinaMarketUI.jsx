// MinaMarketUI.jsx – 아임포트 결제 연동 포함
import { useEffect, useState } from 'react';

export default function MinaMarketPreview() {
  const [products, setProducts] = useState([]);
  const [bannerIndex, setBannerIndex] = useState(0);
  const [activePage, setActivePage] = useState('home');
  const [user, setUser] = useState(null);
  const [wishlist, setWishlist] = useState([]);
  const [cart, setCart] = useState([]);
  const [showPopup, setShowPopup] = useState(false);
  const [showBot, setShowBot] = useState(false);
  const [phone, setPhone] = useState('');
  const [code, setCode] = useState('');
  const [authSent, setAuthSent] = useState(false);
  const [authConfirmed, setAuthConfirmed] = useState(false);
  const [newPassword, setNewPassword] = useState('');

  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://cdn.iamport.kr/js/iamport.payment-1.2.0.js";
    script.async = true;
    document.body.appendChild(script);
  }, []);

  const handlePayment = () => {
    if (!window.IMP) {
      alert("결제 모듈 로딩 중입니다. 잠시 후 다시 시도해주세요.");
      return;
    }
    const IMP = window.IMP;
    IMP.init("imp10391923"); // 아임포트 테스트 가맹점 코드

    const amount = cart.length > 0 ? cart.length * 39000 : 39000;
    const productName = cart.length > 0 ? "장바구니 상품" : "아기 운동화";

    IMP.request_pay({
      pg: "kakaopay",
      pay_method: "card",
      name: productName,
      amount: amount,
      buyer_email: user?.email || "mina@market.com",
      buyer_name: "미나",
      buyer_tel: "01012345678"
    }, function (rsp) {
      if (rsp.success) {
        alert("✅ 결제 완료! 주문이 접수되었습니다.");
      } else {
        alert("❌ 결제 실패: " + rsp.error_msg);
      }
    });
  };

  return <div>민아마켓 준비 완료</div>;
}
