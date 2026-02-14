/**
 * mainPage_activity.js
 * 陈卓璇应援首页交互脚本
 * 功能：汉堡菜单切换、导航链接点击自动收起、响应式监听
 */

(function() {
  // ---------- 严格模式，避免全局变量污染 ----------
  "use strict";

  // ---------- 获取核心DOM元素 ----------
  const menuToggle = document.getElementById('menuToggle');
  const navMenu = document.getElementById('navMenu');
  const menuLinks = navMenu ? navMenu.querySelectorAll('.menu a') : [];

  // ---------- 辅助函数：判断当前导航是否处于打开状态 ----------
  function isNavOpen() {
    return navMenu && navMenu.classList.contains('active');
  }

  // ---------- 打开导航（添加类、设置动画、更改汉堡样式） ----------
  function openNav() {
    if (!navMenu || !menuToggle) return;
    navMenu.classList.add('active');
    menuToggle.classList.add('active');   // 用于可能的三条杠变叉动画（CSS可选）
    // 设置aria-expanded 提升无障碍
    menuToggle.setAttribute('aria-expanded', 'true');
    // 可选：阻止body滚动（视设计风格而定，这里注释掉以免干扰页面）
    // document.body.style.overflow = 'hidden';
  }

  // ---------- 关闭导航 ----------
  function closeNav() {
    if (!navMenu || !menuToggle) return;
    navMenu.classList.remove('active');
    menuToggle.classList.remove('active');
    menuToggle.setAttribute('aria-expanded', 'false');
    // 恢复滚动
    // document.body.style.overflow = '';
  }

  // ---------- 切换导航状态 ----------
  function toggleNav() {
    if (!navMenu || !menuToggle) return;
    if (isNavOpen()) {
      closeNav();
    } else {
      openNav();
    }
  }

  // ---------- 处理窗口大小改变：如果在大屏下意外打开了汉堡菜单，自动复位；同时移除内联样式干扰 ----------
  function handleResize() {
    if (!navMenu || !menuToggle) return;
    // 获取当前视口宽度，使用window.innerWidth更准确
    const width = window.innerWidth;
    // 假设大屏断点为768px (与mainPage_style.css中的媒体查询保持一致)
    if (width > 768) {
      // 在大屏下，强制移除active类（如果有）让导航正常行内显示
      if (navMenu.classList.contains('active')) {
        navMenu.classList.remove('active');
      }
      if (menuToggle.classList.contains('active')) {
        menuToggle.classList.remove('active');
      }
      menuToggle.setAttribute('aria-expanded', 'false');
      // 确保没有内联隐藏遗留（某些极端情况）
      navMenu.style.cssText = '';
    } else {
      // 小屏下，如果因为之前resize导致菜单遗留内联样式，清理掉以免影响动画
      if (navMenu.style.display) {
        navMenu.style.display = '';
      }
    }
  }

  // ---------- 点击导航链接后自动关闭汉堡菜单（增强体验）----------
  function handleLinkClick() {
    if (!navMenu || !menuToggle) return;
    // 只有当当前是小屏并且菜单处于打开状态时才关闭
    if (window.innerWidth <= 768 && isNavOpen()) {
      closeNav();
    }
  }

  // ---------- 点击外部区域关闭菜单（可选，提升用户体验）----------
  function handleOutsideClick(event) {
    // 只有当菜单打开，且点击的不是菜单内部元素，也不是汉堡按钮本身，才关闭
    if (!navMenu || !menuToggle) return;
    if (!isNavOpen()) return;                // 未打开不处理

    // 事件目标是否为汉堡菜单或内部元素？
    const isToggle = menuToggle.contains(event.target);
    const isNav = navMenu.contains(event.target);

    if (!isToggle && !isNav) {
      closeNav();
    }
  }

  // ---------- 阻止点击导航内部事件冒泡（防止与外部监听冲突，但外部监听靠contains足够）----------
  // 无需额外处理，contains自然判断

  // ---------- 初始化事件绑定 ----------
  function init() {
    // 确保元素存在
    if (!menuToggle || !navMenu) {
      console.warn('必要DOM元素缺失，请检查#menuToggle或#navMenu是否存在');
      return;
    }

    // 1. 汉堡菜单点击切换
    menuToggle.addEventListener('click', toggleNav);

    // 2. 导航链接点击关闭
    menuLinks.forEach(link => {
      link.addEventListener('click', handleLinkClick);
    });

    // 3. 监听窗口大小变化，处理大/小屏状态
    window.addEventListener('resize', handleResize);
    // 立即执行一次，确保刷新时如果从小屏拉宽页面，菜单被复位
    handleResize();

    // 4. 点击页面其他区域关闭导航 (只在小屏且打开时有效)
    document.addEventListener('click', handleOutsideClick);

    // 5. 可选：当用户按ESC键时关闭菜单 (体贴细节)
    document.addEventListener('keydown', function(e) {
      if (e.key === 'Escape' || e.key === 'Esc') {
        if (isNavOpen()) closeNav();
      }
    });

    // 6. 为汉堡菜单添加无障碍描述 (如果没有aria-label，可补充)
    if (!menuToggle.hasAttribute('aria-label')) {
      menuToggle.setAttribute('aria-label', '导航菜单');
    }
    menuToggle.setAttribute('aria-expanded', 'false');
  }

  // ---------- 在DOM加载完成后执行初始化 ----------
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    // 如果DOM已经加载完成，直接运行
    init();
  }

})();