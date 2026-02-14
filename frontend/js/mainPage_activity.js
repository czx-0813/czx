 (function() {
      // 汉堡菜单交互: 对应 mainPage_activity.js 功能 (完全内嵌)
      const menuToggle = document.getElementById('menuToggle');
      const navMenu = document.getElementById('navMenu');
      const header = document.querySelector('header'); // 可选，用于body样式

      if (menuToggle && navMenu) {
        function toggleMenu(force) {
          const isActive = navMenu.classList.contains('active');
          if (force === undefined) {
            navMenu.classList.toggle('active');
            menuToggle.classList.toggle('active');
          } else {
            navMenu.classList.toggle('active', force);
            menuToggle.classList.toggle('active', force);
          }
          
          const expanded = navMenu.classList.contains('active');
          menuToggle.setAttribute('aria-expanded', expanded);
          
          // 防止菜单打开时背景滚动 (提升体验)
          if (expanded) {
            document.body.classList.add('menu-open');
          } else {
            document.body.classList.remove('menu-open');
          }
        }

        menuToggle.addEventListener('click', function(e) {
          e.stopPropagation();
          toggleMenu();
        });

        // 点击菜单外部或链接后自动关闭 (可选)
        document.addEventListener('click', function(event) {
          if (!header.contains(event.target) && navMenu.classList.contains('active')) {
            toggleMenu(false); // 强制关闭
          }
        });

        // 点击导航链接后自动收起 (增强移动体验)
        const navLinks = navMenu.querySelectorAll('a');
        navLinks.forEach(link => {
          link.addEventListener('click', function() {
            if (navMenu.classList.contains('active')) {
              toggleMenu(false);
            }
          });
        });

        // ESC键关闭
        document.addEventListener('keydown', function(e) {
          if (e.key === 'Escape' && navMenu.classList.contains('active')) {
            toggleMenu(false);
            menuToggle.focus();
          }
        });

        // 防止点击汉堡内菜单冒泡导致立即关闭 (已经由header包含处理)
      }

      // 背景图片加载失败占位已由 onerror 处理，无需额外动作
    })();
