'use client';

import { useEffect } from 'react';

const ChatwootWidget = () => {
  useEffect(() => {
    // Chatwoot script'ini sadece tarayıcı tarafında çalıştır
    if (typeof window !== 'undefined') {
      // Eğer script zaten yüklenmişse tekrar yükleme
      if (document.getElementById('chatwoot-script')) return;

      const script = document.createElement('script');
      script.id = 'chatwoot-script';
      script.innerHTML = `
        (function(d,t) {
          var BASE_URL="https://app.chatwoot.com";
          var g=d.createElement(t),s=d.getElementsByTagName(t)[0];
          g.src=BASE_URL+"/packs/js/sdk.js";
          g.defer = true;
          g.async = true;
          s.parentNode.insertBefore(g,s);
          g.onload=function(){
            window.chatwootSDK.run({
              websiteToken: 'T7vqkx1WxNmunySxXN5V6jJv',
              baseUrl: BASE_URL
            })
          }
        })(document,"script");
      `;
      document.body.appendChild(script);
    }
  }, []);

  return null; // Bu bileşen görsel bir öğe render etmez
};

export default ChatwootWidget; 