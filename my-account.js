// my-account.js (REWRITTEN)
document.addEventListener('DOMContentLoaded', function () {
  const initMobileMenu = () => {
    const leftSide = document.querySelector('.leftside-my-account');
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    if (!leftSide || !mobileMenuToggle) return;

    mobileMenuToggle.addEventListener('click', function (e) {
      e.preventDefault();
      e.stopPropagation();
      const isOpen = leftSide.classList.contains('mobile-menu-open');

      if (isOpen) {
        leftSide.classList.remove('mobile-menu-open');
        document.body.classList.remove('mobile-menu-open');
        this.setAttribute('aria-expanded', 'false');
        const overlay = document.querySelector('.mobile-menu-overlay');
        if (overlay) overlay.remove();
      } else {
        leftSide.classList.add('mobile-menu-open');
        document.body.classList.add('mobile-menu-open');
        this.setAttribute('aria-expanded', 'true');
        const overlay = document.createElement('div');
        overlay.className = 'mobile-menu-overlay';
        document.body.appendChild(overlay);
        overlay.addEventListener('click', () => {
          leftSide.classList.remove('mobile-menu-open');
          document.body.classList.remove('mobile-menu-open');
          mobileMenuToggle.setAttribute('aria-expanded', 'false');
          overlay.remove();
        });
      }
    });

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && leftSide.classList.contains('mobile-menu-open')) {
        leftSide.classList.remove('mobile-menu-open');
        document.body.classList.remove('mobile-menu-open');
        mobileMenuToggle.setAttribute('aria-expanded', 'false');
        const overlay = document.querySelector('.mobile-menu-overlay');
        if (overlay) overlay.remove();
      }
    });
  };

  const getRecentOrderData = () => {
    const orderElements = document.querySelectorAll('#real-recent-orders .orderinfo');
    const recentOrders = [];
    orderElements.forEach((el, index) => {
      if (index < 3) {
        recentOrders.push({
          id: el.dataset.orderId,
          product: el.dataset.product,
          date: el.dataset.date,
          status: el.dataset.status,
          image: el.dataset.img
        });
      }
    });
    return recentOrders;
  };

  const fixRightsideMyAccount = () => {
    if (window.innerWidth >= 768) {
      const rightSide = document.querySelector('.rightside-my-account');
      if (rightSide) {
        const currentPath = window.location.pathname;
        const currentHash = window.location.hash;
        const urlParams = new URLSearchParams(window.location.search);
        const isMainDashboard = (currentPath.endsWith('/my-account/') || currentPath.endsWith('/my-account')) &&
          !currentPath.includes('/orders/') &&
          !currentPath.includes('/downloads/') &&
          !currentPath.includes('/addresses/') &&
          !currentPath.includes('/edit-account/') &&
          !currentPath.includes('/payment-methods/') &&
          !currentPath.includes('/view-order/') &&
          !urlParams.has('view-order') &&
          !currentHash.includes('orders') &&
          !currentHash.includes('addresses') &&
          !document.querySelector('.woocommerce-account-content .orderinfomain') &&
          !document.querySelector('.woocommerce-account-content .woocommerce-Address');

        if (isMainDashboard) {
          const duplicateNavs = rightSide.querySelectorAll('.woocommerce-MyAccount-navigation, nav, .myaccounttabs');
          duplicateNavs.forEach(nav => nav.style.display = 'none');

          let contentContainer = rightSide.querySelector('.woocommerce-MyAccount-content') || rightSide;
          if (!contentContainer.querySelector('.dashboard-content-created')) {
            const marker = document.createElement('div');
            marker.className = 'dashboard-content-created';
            marker.style.display = 'none';
            contentContainer.appendChild(marker);

            const recentOrders = getRecentOrderData();
            const recentOrdersHtml = recentOrders.map(order => `
              <div style="display: flex; align-items: center; padding: 15px; border: 1px solid #e0e0e0; border-radius: 6px; margin-bottom: 10px; transition: all 0.3s ease;">
                <img src="${order.image}" alt="Product" style="width: 60px; height: 60px; border-radius: 6px; margin-right: 15px; object-fit: cover;" onerror="this.src='https://via.placeholder.com/60'">
                <div style="flex: 1;">
                  <div style="font-weight: 600; color: #333; margin-bottom: 5px;">${order.product}</div>
                  <div style="font-size: 14px; color: #666;">Order #${order.id} • Ordered on ${order.date}</div>
                </div>
                <span style="padding: 4px 12px; border-radius: 20px; font-size: 12px; font-weight: 500; text-transform: uppercase; background: #fff3cd; color: #856404;">${order.status}</span>
              </div>
            `).join('');

            const dashboardContent = document.createElement('div');
            dashboardContent.className = 'my-account-dashboard';
            dashboardContent.innerHTML = `
              <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 30px; border-radius: 12px; margin-bottom: 30px; text-align: center;">
                <h2 style="margin: 0 0 10px 0; font-size: 24px; font-weight: 600;">Welcome back!</h2>
                <p style="margin: 0; opacity: 0.9; font-size: 16px;">Here's what's happening with your account</p>
              </div>
              <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 20px; margin-bottom: 30px;">
                <div style="background: white; padding: 20px; border-radius: 8px; box-shadow: 0 2px 10px rgba(0,0,0,0.1); text-align: center;">
                  <div style="font-size: 28px; font-weight: bold; color: #7c29d8; margin-bottom: 5px;">12</div>
                  <div style="color: #666; font-size: 14px;">Total Orders</div>
                </div>
                <div style="background: white; padding: 20px; border-radius: 8px; box-shadow: 0 2px 10px rgba(0,0,0,0.1); text-align: center;">
                  <div style="font-size: 28px; font-weight: bold; color: #7c29d8; margin-bottom: 5px;">2</div>
                  <div style="color: #666; font-size: 14px;">Pending Orders</div>
                </div>
                <div style="background: white; padding: 20px; border-radius: 8px; box-shadow: 0 2px 10px rgba(0,0,0,0.1); text-align: center;">
                  <div style="font-size: 28px; font-weight: bold; color: #7c29d8; margin-bottom: 5px;">10</div>
                  <div style="color: #666; font-size: 14px;">Completed Orders</div>
                </div>
              </div>
              <div style="background: #fff; border-radius: 8px; padding: 20px; box-shadow: 0 2px 10px rgba(0,0,0,0.1); margin-bottom: 20px;">
                <h3 style="margin: 0 0 15px 0; color: #333; font-size: 18px; font-weight: 600;">Recent Orders</h3>
                ${recentOrdersHtml}
                <div style="text-align: center; margin-top: 20px;">
                  <a href="/my-account/orders/" style="background: #7c29d8; color: white; padding: 10px 20px; text-decoration: none; border-radius: 6px; display: inline-block; font-weight: 500;">View All Orders</a>
                </div>
              </div>
            `;
            contentContainer.innerHTML = '';
            contentContainer.appendChild(marker);
            contentContainer.appendChild(dashboardContent);
          }
        }
      }
    }
  };

  initMobileMenu();
  fixRightsideMyAccount();

  window.addEventListener('resize', () => {
    if (window.innerWidth >= 768) {
      fixRightsideMyAccount();
    }
  });

  window.addEventListener('hashchange', () => {
    setTimeout(fixRightsideMyAccount, 100);
  });

  window.addEventListener('load', () => {
    setTimeout(fixRightsideMyAccount, 200);
  });
});
