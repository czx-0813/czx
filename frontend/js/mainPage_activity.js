 (function() {
      // 获取元素
      const menuToggle = document.getElementById('menuToggle');
      const navMenu = document.getElementById('navMenu');

      // 如果元素不存在则退出
      if (!menuToggle || !navMenu) return;

      // 切换菜单显示/隐藏的函数 (融合AdminPage的汉堡动画和下拉显示)
      function toggleMenu(force) {
        const isExpanded = menuToggle.getAttribute('aria-expanded') === 'true';
        const willShow = force !== undefined ? force : !isExpanded;

        // 切换汉堡按钮的active类 (用于动画X)
        if (willShow) {
          menuToggle.classList.add('active');
          navMenu.classList.add('show');
        } else {
          menuToggle.classList.remove('active');
          navMenu.classList.remove('show');
        }

        // 更新aria-expanded
        menuToggle.setAttribute('aria-expanded', willShow ? 'true' : 'false');
      }

      // 点击汉堡按钮
      menuToggle.addEventListener('click', function(e) {
        e.preventDefault();
        toggleMenu();
      });

      // 键盘支持 (Enter 或 Space 触发)
      menuToggle.addEventListener('keydown', function(e) {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          toggleMenu();
        }
      });

      // 点击导航链接后自动关闭菜单 (移动端体验优化)
      const navLinks = navMenu.querySelectorAll('.menu a');
      navLinks.forEach(link => {
        link.addEventListener('click', function() {
          // 如果当前是移动端显示状态 (navMenu有show类) 则关闭
          if (navMenu.classList.contains('show') && window.innerWidth <= 992) {
            toggleMenu(false);  // 强制关闭
          }
        });
      });

      // 窗口大小改变时，如果大于992px强制移除show类并重置汉堡状态（桌面模式永远显示）
      window.addEventListener('resize', function() {
        if (window.innerWidth > 992) {
          // 桌面端：导航应该一直可见，移除show控制（因为桌面nav默认display:flex）
          navMenu.classList.remove('show');    // 移除show，但桌面nav本身flex显示（见媒体查询）
          menuToggle.classList.remove('active');
          menuToggle.setAttribute('aria-expanded', 'false');
          // 确保navMenu在桌面是可见的（覆盖可能的行内样式）
          navMenu.style.display = '';
        } else {
          // 移动端下，重置显示状态为隐藏 (但保留汉堡点击展开能力)
          // 如果之前是桌面切换过来的，确保导航隐藏
          if (!navMenu.classList.contains('show')) {
            navMenu.style.display = ''; // 由CSS控制
          }
        }
      });

      // 点击空白区域关闭菜单（可选，借鉴AdminPage未实现，但可增加友善度）
      document.addEventListener('click', function(event) {
        const isClickInside = menuToggle.contains(event.target) || navMenu.contains(event.target);
        if (!isClickInside && window.innerWidth <= 992 && navMenu.classList.contains('show')) {
          toggleMenu(false); // 点击外部关闭菜单
        }
      });

      // 防止在移动端初始加载时导航显示（确保默认隐藏）
      if (window.innerWidth <= 992) {
        navMenu.classList.remove('show');
        menuToggle.classList.remove('active');
        menuToggle.setAttribute('aria-expanded', 'false');
      }
    })();