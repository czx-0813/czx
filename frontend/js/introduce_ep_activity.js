   (function() {
      // ---------- 根据 portfolio.html 的数据定义 (JSON + 可扩展) ----------
      const epData = [
        {
          id: "ep1",
          cover: "../resources/image/EP_1.jpg",
          title: "不降落飞行指南",
          meta: "个人EP · 2024 · 4首",
          description: "🌿 以飞行为隐喻，讲述成长中的轻盈与重量。由知名制作人倾力打造，展现陈卓璇嗓音中清澈与力量的双重面向。",
          tracks: [
            { name: "天窗", desc: ["词：某某", "曲：某某某"] },
            { name: "飞行天分", desc: ["词：A", "曲：B"] },
            { name: "无尽之羽", desc: ["词：C", "曲：D"] },
            { name: "INTRO", desc: ["纯音乐", "编曲：E"] }
          ],
          links: [
            { text: "🎵 QQ音乐", url: "https://y.qq.com/n/m/detail/album/index.html?albummid=003FdoPY3qOOhQ" },
            { text: "🎧 网易云音乐", url: "#" },
            { text: "📺 试听片段", url: "#" },
            { text: "📚 返回作品集", url: "portfolio.html" }
          ],
          extra: "⏻ 制作人：XX · 发行公司：YY · 摄影：ZZ"
        },
        {
          id: "ep2",
          cover: "../resources/image/EP_2.jpg",
          title: "转身走向你",
          meta: "个人EP · 2024 · 5首",
          description: "💫 一张关于相遇与温柔的EP，细腻的声线演绎出人与人之间的微妙距离。",
          tracks: [
            { name: "转身走向你", desc: ["词：某某", "曲：某某"] },
            { name: "想哭就笑", desc: ["词：A", "曲：B"] },
            { name: "请你", desc: ["词：C", "曲：D"] },
            { name: "怎么会不幸福", desc: ["词：E", "曲：F"] },
            { name: "我和我", desc: ["词：G", "曲：H"] }
          ],
          links: [
            { text: "🎵 QQ音乐", url: "https://y.qq.com/n/m/detail/album/index.html?albummid=002kQeBi3g2aR8" },
            { text: "🎧 网易云音乐", url: "#" },
            { text: "📺 试听片段", url: "#" },
            { text: "📚 返回作品集", url: "portfolio.html" }
          ],
          extra: "⏻ 制作人：AA · 发行公司：BB · 摄影：CC"
        },
        {
          id: "ep3",
          cover: "../resources/image/EP_3.jpg",
          title: "深海之息",
          meta: "全原创 EP · 2025 · 5首",
          description: "🌊 潜入深海，聆听呼吸。实验性与流行兼备，展现音乐上的探索。",
          tracks: [
            { name: "深海之息", desc: ["词：X", "曲：Y"] },
            { name: "翻篇", desc: ["词：X", "曲：Z"] },
            { name: "海绵", desc: ["词：M", "曲：N"] },
            { name: "拼尽", desc: ["词：P", "曲：Q"] },
            { name: "Intro:C", desc: ["纯音乐", "编曲：R"] }
          ],
          links: [
            { text: "🎵 QQ音乐", url: "https://y.qq.com/n/m/detail/album/index.html?albummid=002A7Vlu3uFXcn" },
            { text: "🎧 网易云音乐", url: "#" },
            { text: "📺 试听片段", url: "#" },
            { text: "📚 返回作品集", url: "portfolio.html" }
          ],
          extra: "⏻ 制作人：SS · 发行公司：TT · 摄影：UU"
        }
      ];

      // ---------- 获取URL参数中的epId (例如 ?id=ep1 或 ?index=0) ----------
      function getEpIdFromUrl() {
        const params = new URLSearchParams(window.location.search);
        // 支持 id=ep1 或 index=0 两种方式
        if (params.has('id')) {
          return params.get('id'); // 返回 'ep1', 'ep2', 'ep3'
        }
        if (params.has('index')) {
          const idx = parseInt(params.get('index'), 10);
          if (!isNaN(idx) && idx >= 0 && idx < epData.length) {
            return epData[idx].id;  // 根据索引返回id
          }
        }
        // 默认返回第一个EP (如不传参)
        return 'ep1';
      }

      const targetId = getEpIdFromUrl();
      // 查找匹配的ep数据 (通过id)
      let epInfo = epData.find(ep => ep.id === targetId);
      // 如果没有找到，默认使用第一个
      if (!epInfo) {
        console.warn('未找到对应EP，显示第一个');
        epInfo = epData[0];
      }

      // ---------- 渲染页面 ----------
      const container = document.getElementById('epContainer');
      if (!container) return;

      // 动态生成HTML (完全基于epInfo)
      let tracksHtml = '';
      epInfo.tracks.forEach(track => {
        const descSpans = track.desc.map(d => `<span>${d}</span>`).join('');
        tracksHtml += `
          <div class="track-item">
            <div class="track-name">${track.name}</div>
            <div class="track-desc">${descSpans}</div>
          </div>
        `;
      });

      let linksHtml = '';
      epInfo.links.forEach(link => {
        linksHtml += `<a href="${link.url}" target="_blank">${link.text}</a>`;
      });

      const epHtml = `
        <div class="ep-detail-card">
          <div class="ep-header">
            <div class="ep-cover">
              <img src="${epInfo.cover}" alt="${epInfo.title}封面" onerror="this.src='data:image/svg+xml,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22280%22%20height%3D%22280%22%3E%3Crect%20width%3D%22280%22%20height%3D%22280%22%20fill%3D%22%23ffd9e8%22%2F%3E%3Ctext%20x%3D%2250%22%20y%3D%22150%22%20font-size%3D%2222%22%20fill%3D%22%23944a79%22%3EEP%E5%B0%81%E9%9D%A2%3C%2Ftext%3E%3C%2Fsvg%3E';">
            </div>
            <div class="ep-info">
              <div class="card-title">${epInfo.title}</div>
              <div class="ep-meta">${epInfo.meta}</div>
              <div class="ep-description">${epInfo.description}</div>
            </div>
          </div>

          <div class="tracklist-title">✦ 收 录 曲 目 ✦</div>
          <div class="track-grid">
            ${tracksHtml}
          </div>

          <div class="ep-links">
            ${linksHtml}
          </div>
        </div>

        <div style="display: flex; justify-content: center; margin: 1.5rem 0;">
          <div style="background: rgba(255,235,240,0.5); backdrop-filter: blur(4px); border-radius: 60px; padding: 0.8rem 2rem; color: #9f5d80; border: 1px solid white;">
            ${epInfo.extra}
          </div>
        </div>
      `;

      container.innerHTML = epHtml;

      // 同时修改页面标题 (可选)
      document.title = `${epInfo.title} · 陈卓璇 EP介绍`;
    })();