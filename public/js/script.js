// Tự động ẩn thông báo sau 5 giây
document.addEventListener("DOMContentLoaded", function () {
  setTimeout(function () {
    const alerts = document.querySelectorAll(".alert");
    alerts.forEach(function (alert) {
      const bsAlert = new bootstrap.Alert(alert);
      bsAlert.close();
    });
  }, 5000);
});
