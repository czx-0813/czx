// 陈卓璇 · 应援色首页 — 光之动态
 /*czx/frontend/js/mainPage_activity.js*/
    document.addEventListener('DOMContentLoaded', function() {
      'use strict';

      // 1. 中央大图光影游移 — 呼应五光十色
      const heroImage = document.querySelector('.image-container');
      if (heroImage) {
        heroImage.addEventListener('mousemove', function(e) {
          const rect = heroImage.getBoundingClientRect();
          const x = ((e.clientX - rect.left) / rect.width) * 100;
          const y = ((e.clientY - rect.top) / rect.height) * 100;
          heroImage.style.backgroundPosition = `${x}% ${y}%`;
          // 迭加一层流动光泽
          heroImage.style.backgroundImage = `url('frontend/resources/image/mainPage.jpg'), 
            radial-gradient(circle at ${x}% ${y}%, rgba(255,235,150,0.4) 0%, transparent 60%)`;
        });
        heroImage.addEventListener('mouseleave', function() {
          heroImage.style.backgroundImage = `url(frontend/resources/image/mainPage.jpg')`;
          heroImage.style.backgroundPosition = 'center 20%';
        });
      }

      // 2. 导航「首页」高亮 — 五光十色光晕
      const navLinks = document.querySelectorAll('.menu li a');
      navLinks.forEach(link => {
        if (link.getAttribute('href') === 'mainpage.html' || link.textContent.includes('首页')) {
          link.style.background = 'linear-gradient(145deg, #ffe5f0, #fff5e6)';
          link.style.color = '#aa4e7a';
          link.style.padding = '0.3rem 0.8rem';
          link.style.borderRadius = '30px';
          link.style.boxShadow = '0 0 20px #ffc1cc';
        }
      });

      // 3. 左侧logo 点击应援 — 闪烁七彩
      const logo = document.querySelector('.logo');
      if (logo) {
        logo.addEventListener('click', function() {
          const colors = ['#FF9AA2', '#FFD6A5', '#FDFFB6', '#CAFFBF', '#9BF6FF', '#E7C6FF'];
          let i = 0;
          const interval = setInterval(() => {
            logo.style.boxShadow = `0 0 40px 8px ${colors[i % colors.length]}`;
            i++;
            if (i > 12) {
              clearInterval(interval);
              logo.style.boxShadow = '0 0 20px 2px #ffb8d2, 0 0 40px 5px #ffe5b4';
            }
          }, 120);
        });
      }

      // 4. 动态生成应援小光点 (满版折射亮粉)
      const sparkleContainer = document.createElement('div');
      sparkleContainer.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        pointer-events: none;
        z-index: 999;
        overflow: hidden;
      `;
      document.body.appendChild(sparkleContainer);

      for (let i = 0; i < 35; i++) {
        const spark = document.createElement('span');
        const size = Math.random() * 12 + 4;
        const posX = Math.random() * 100;
        const posY = Math.random() * 100;
        const delay = Math.random() * 8;
        const colorHue = Math.floor(Math.random() * 360);
        spark.style.cssText = `
          position: absolute;
          left: ${posX}%;
          top: ${posY}%;
          width: ${size}px;
          height: ${size}px;
          background: radial-gradient(circle, hsla(${colorHue}, 85%, 75%, 0.9), transparent 70%);
          border-radius: 50%;
          filter: blur(2px);
          opacity: 0.6;
          animation: twinkle 4s infinite alternate ease-in-out;
          animation-delay: ${delay}s;
          box-shadow: 0 0 20px hsla(${colorHue}, 90%, 80%, 0.8);
        `;
        sparkleContainer.appendChild(spark);
      }

      // 添加 keyframes 动画 (若尚未存在)
      const styleSheet = document.createElement("style");
      styleSheet.textContent = `
        @keyframes twinkle {
          0% { opacity: 0.3; transform: scale(0.8); }
          100% { opacity: 1; transform: scale(1.4); }
        }
      `;
      document.head.appendChild(styleSheet);

      // 5. 页脚版权年份 + 应援小语
      const footer = document.querySelector('footer p');
    //   if (footer) {
    //     const year = new Date().getFullYear();
    //     footer.innerHTML = `版权所有 © ${year}`;
    //   }

      // 6. 如果图片加载失败，改用专属应援底图（文字光谱）
      const imgTest = new Image();
      imgTest.src = 'frontend/resources/image/mainPage.jpg';
      imgTest.onerror = function() {
        if (heroImage) {
          heroImage.style.backgroundImage = 'linear-gradient(125deg, #ffe2ec, #fff7e6, #edfff0, #e1efff, #feeaff)';
          heroImage.style.backgroundSize = '400% 400%';
          heroImage.style.animation = 'gradientShift 12s ease infinite';
          // 也加入文字光谱
        }
      };
    });
